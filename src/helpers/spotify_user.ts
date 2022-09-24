import { backend, spotify } from "../data/backend_params";
import { getSpotifyStorage } from "./token";

export type ProfileInfo = {
    display_name: string,
    image_url: string
};

export const getUserInfo = async (): Promise<ProfileInfo> => {

    const access_token: string | null = getSpotifyStorage()[0];
    if(access_token === null) return Promise.reject(new Error("No access token."));

    const url: string = `${backend.endpoint}${spotify.user_info_endpoint}?access_token=${access_token}`;
    return fetch(url).then(
        async (response) => {
            return await response.json();
        },
        (error) => {
            //console.log(error);
            return Promise.reject(Error(`Tried to fetch ${url}, got ${error}`));
        }
    )
};