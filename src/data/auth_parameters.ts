import {getState} from '../helpers/state';

export const spotify = {
    auth_endpoint: "https://accounts.spotify.com/authorize?",
    client_id: "6fe01415389c4ad9aa91ba1128aa308b",
    client_secret: "6f5b1159450c45a5a801d9b37ebc980d",
    redirect_uri: "http://localhost:3000/login",
    state: getState(),
    scopes: [
        "playlist-read-private",
        "playlist-modify-private"
    ],
    access_token_endpoint: "http://0.0.0.0:8000/access_token/?"
};