import {getState} from '../helpers/state';

export const spotify = {
    auth_endpoint: "https://accounts.spotify.com/authorize?",
    client_id: "6fe01415389c4ad9aa91ba1128aa308b",
    client_secret: "",
    redirect_uri: "http://localhost:3000/playlist-converter/login",
    state: getState(),
    scopes: [
        "playlist-read-private",
        "playlist-modify-private"
    ],
    backend_endpoint: "http://0.0.0.0:8000/",
    access_token_endpoint: "access_token/?",
    refresh_token_endpoint: "refresh_token/?"
};