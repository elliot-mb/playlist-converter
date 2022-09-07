import { Access, ErrorBox } from "../data/types";
import { spotify } from "../data/auth_parameters";

export function getCurrentSecondsFloor(): number{
    return Math.floor(new Date().getTime()/1000);
}

export function getSpotifyStorage(): (string | null)[]{
    let access: string | null = localStorage.getItem('access');
    let expires: string | null = localStorage.getItem('expires');
    let refresh: string | null = localStorage.getItem('refresh');
    return [access, expires, refresh];
}

//does not mutate localStorage, is done by the caller after to update the access token
//tries to update access token based on refresh token
export async function refreshSpotifyStorage(): Promise<Access | ErrorBox>{
    let [access, expires, refresh]:  (string | null)[] = getSpotifyStorage();
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

export function isValidSpotifyStorage(): boolean{
    let store = getSpotifyStorage();
    return store.reduce((x: boolean, y: string | null) => { return x && (y !== null) }, true);
}

export function setSpotifyStorage(data: Access): void{
    localStorage.setItem('access', data.access_token);
    localStorage.setItem('expires', `${data.expires_in}`);
    localStorage.setItem('refresh', data.refresh_token);
}