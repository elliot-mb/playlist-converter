import {getState} from '../helpers/state';

export const deployment = {
    deployed: false,
    backend_endpoint: "https://playlist-converter-be-elliot-mb.vercel.app/",
    redirect: "https://elliotmb.dev/playlist-converter/login"
}

export const spotify = {
    auth_endpoint: "https://accounts.spotify.com/authorize?",
    client_id: "6fe01415389c4ad9aa91ba1128aa308b",
    client_secret: "",
    redirect_uri: deployment.deployed 
        ? deployment.redirect 
        : "http://localhost:3000/playlist-converter/login",
    state: getState(),
    scopes: [
        "playlist-read-private",
        "playlist-modify-private"
    ],
    backend_access_token_endpoint: "access_token/?",
    backend_refresh_token_endpoint: "refresh_token/?"
};

export const backend = {
    endpoint: deployment.deployed 
        ? deployment.backend_endpoint 
        : "http://0.0.0.0:8000/"
}