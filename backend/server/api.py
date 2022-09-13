from typing import List

from urllib import parse
from requests import post
from base64 import b64encode
from json import loads

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

#constants
# client_id: str = "6fe01415389c4ad9aa91ba1128aa308b"
client_secret: str = "6f5b1159450c45a5a801d9b37ebc980d"
grant_type_request: str = "authorization_code"
grant_type_refresh: str = "refresh_token"

# states: List[str] = []
base: str = "https://api.spotify.com/"
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

@app.get("/")
async def root() -> dict:
    return { "message": "Thank you for using Playlist Converter!" }

@app.get("/secret")
async def secret() -> dict:
    return { "client_secret": client_secret }

# makes a post request to spotify api to retrieve our token
@app.get("/access_token/")
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
    id_and_secret: str = f"{client_id}:{client_secret}"
    headers = {
        #"Authorization": f"Basic {b64encode(bytes(id_and_secret, 'utf-8'))}",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*" 
    }
    response = loads(post(url, data=body, headers=headers).text)
    if "access_token" not in response:
        raise HTTPException(status_code=400, detail=response)
    return {
        "access_token": response["access_token"],
        "expires_in": response["expires_in"],
        "refresh_token": response["refresh_token"]
    }

@app.get("/refresh_token/")
async def refresh_token(refresh: str, client_id: str) -> dict:
    url: str = auth_base + "api/token"
    body = {
        "grant_type": grant_type_refresh,
        "refresh_token": refresh,
        "client_id": client_id,
        "client_secret": client_secret
    }
    id_and_secret: str = f"{client_id}:{client_secret}"
    headers = {
        #"Authorization": f"Basic {b64encode(bytes(id_and_secret, 'utf-8'))}",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*" 
    }
    response = loads(post(url, data=body, headers=headers).text)
    if "access_token" not in response:
        raise HTTPException(status_code=400, detail=response)
    return {
        "access_token": response["access_token"],
        "expires_in": response["expires_in"],
        "refresh_token": refresh
    }