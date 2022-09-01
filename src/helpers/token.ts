import { Access, Error } from "../data/types";
import { spotify } from "../data/auth_parameters";

export function getCurrentSecondsFloor(): number{
    return Math.floor(new Date().getTime()/1000);
}

//does not mutate localStorage, will need to be done by the caller after to update the access token
//tries to update token based on refresh token
export async function getSpotifyStorage(): Promise<Access | Error>{
    let access: string | null = localStorage.getItem('access');
    let expires: string | null = localStorage.getItem('expires');
    let refresh: string | null = localStorage.getItem('refresh');
    if(access === null || expires === null || refresh === null){
        return {error: `One or more localStorage properties are missing, please log in`};
    }else if(+expires < getCurrentSecondsFloor()){
        console.log("Attempting access token refresh");
        const url: string = spotify.backend_endpoint + 
            spotify.refresh_token_endpoint +
            `refresh=${refresh}&`+
            `client_id=${spotify.client_id}`;
        const response: Response = await fetch(url);
        if(!response.ok){
            return {error: `Tried to fetch ${url}, got code: ${response.status}; response: ${response.text}`};
        }else{
            const access: Access = await response.json();
            access.expires_in += getCurrentSecondsFloor();
            return access;
        }
    }else{
        console.log(`Access token valid for ${+expires - getCurrentSecondsFloor()}s`)
        return {
            access_token: access,
            expires_in: parseInt(expires),
            refresh_token: refresh
        }
    }
}

export function setSpotifyStorage(data: Access): void{
    localStorage.setItem('access', data.access_token);
    localStorage.setItem('expires', `${data.expires_in}`);
    localStorage.setItem('refresh', data.refresh_token);
}