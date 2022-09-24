import {getState} from '../helpers/state';

export const deployment = {
    deployed: true,
    local_endpoint: "http://0.0.0.0:8000/",
    deployed_endpoint: "https://playlist-converter-be-elliot-mb.vercel.app/"
};

export const backend = {
    endpoint: deployment.deployed 
        ? deployment.deployed_endpoint 
        : deployment.local_endpoint
};

export const spotify = {
    auth_endpoint: "https://accounts.spotify.com/authorize?",
    client_id: "6fe01415389c4ad9aa91ba1128aa308b",
    client_secret: "",
    redirect_uri: `${backend.endpoint}spotify/callback`,
    state: getState(),
    scopes: [
        "playlist-read-private",
        "playlist-modify-private"
    ],
    backend_refresh_token_endpoint: "spotify/refresh-token?",
    user_info_endpoint: "spotify/user-info"
};