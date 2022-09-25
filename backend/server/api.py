from typing import List

from urllib import parse
from requests import post, get, Response
from base64 import b64encode
from json import loads

from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

# class Request:
#     def __init__(self, method, url: str, body: dict | None, headers: dict | None):
#         self.method = method
#         self.url = url
#         self.body = body
#         self.headers = headers

#     def execute(self) -> dict:
#         return loads(self.method(self.url, data=self.body, headers=self.headers).text)

settings: dict = {
    "deployed": True,
    "localOrigin": "http://0.0.0.0:8000/",
    "localRedirect": "http://localhost:3000/",
    "deployOrigin": "https://playlist-converter-be-elliot-mb.vercel.app/",
    "deployRedirect": "https://elliotmb.dev/"
}

#constants
client_id: str = "6fe01415389c4ad9aa91ba1128aa308b"
client_secret: str = "6f5b1159450c45a5a801d9b37ebc980d"
grant_type_request: str = "authorization_code"
grant_type_refresh: str = "refresh_token"

# states: List[str] = []
base: str = "https://api.spotify.com/v1/"
auth_base: str = "https://accounts.spotify.com/"

app = FastAPI(
    title = "playlist-converter"
)

origins: List[str] = [
    "http://localhost:3000/playlist-converter",
    "http://localhost:3000/*",
    "https://elliotmb.dev/playlist-converter",
    "http://localhost:3000/login",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

## internal functions

def response_to_json(response: Response):
    return loads(response.text)

def get_authorized_header(access_token: str):
    return {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

##

@app.get("/")
async def root() -> dict:
    return { "message": "Thank you for using Playlist Converter, visit /docs for info!" }

# @app.get("/secret")
# async def secret() -> dict:
#     return { "client_secret": client_secret }

@app.get("/redirect-test")
async def redirect_test() -> RedirectResponse:
    return RedirectResponse("https://elliotmb.dev/#/projects")

# makes a post request to spotify api to retrieve our token
@app.get("/access-token")
# "code" may either be an auth code OR refresh token
async def access_token(code: str, redirect_uri: str, client_id: str) -> dict:
    url: str = auth_base + "api/token"
    body = {
        "code": code,
        "redirect_uri": redirect_uri,
        "grant_type": grant_type_request,
        "client_id": client_id,
        "client_secret": client_secret
    }
    headers = {
        #"Authorization": f"Basic {b64encode(bytes(id_and_secret, 'utf-8'))}",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*" 
    }
    response = response_to_json(post(url, data=body, headers=headers))
    if "access_token" not in response:
        raise HTTPException(status_code=400, detail=response)
    return {
        "access_token": response["access_token"],
        "expires_in": response["expires_in"],
        "refresh_token": response["refresh_token"]
    }

@app.get("/spotify/callback")
# looks like http://0.0.0.0:8000/access_token/?code=AQAP2l...sdfg&state=2861381566736540
async def spotify_callback(code: str, state: str) -> RedirectResponse:
    redirectBase: str = ""
    originBase: str = ""
    if(not settings["deployed"]): 
        redirectBase = settings["localRedirect"]
        originBase = settings["localOrigin"]
    else: 
        redirectBase = settings["deployRedirect"]
        originBase = settings["deployOrigin"]
    access: dict = await access_token(code, f"{originBase}spotify/callback", client_id)
    token: str = access["access_token"]
    expires_in: str = access["expires_in"]
    refresh_token: str = access["refresh_token"]
    return RedirectResponse(f"{redirectBase}playlist-converter/#/login?state={state}&access-token={token}&expires-in={expires_in}&refresh-token={refresh_token}")

@app.get("/spotify/refresh-token")
async def refresh_token(refresh: str, client_id: str) -> dict:
    url: str = auth_base + "api/token"
    body = {
        "grant_type": grant_type_refresh,
        "refresh_token": refresh,
        "client_id": client_id,
        "client_secret": client_secret
    }
    headers = {
        #"Authorization": f"Basic {b64encode(bytes(id_and_secret, 'utf-8'))}",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*" 
    }
    response = response_to_json(post(url, data=body, headers=headers))
    if "access_token" not in response:
        raise HTTPException(status_code=400, detail=response)
    return {
        "access_token": response["access_token"],
        "expires_in": response["expires_in"],
        "refresh_token": refresh
    }

@app.get("/spotify/user-info")
# ----------------
# | name   | pfp||
# |        |    ||
# ----------------
async def profile_card(access_token: str):
    url: str = f"{base}me"
    response = response_to_json(get(url, data={}, headers=get_authorized_header(access_token)))
    if "error" in response:
        raise HTTPException(status_code=response["error"]["status"], detail=response)
    else:
        return {
            "display_name": response["display_name"],
            "image_url": response["images"][0]["url"]
        }