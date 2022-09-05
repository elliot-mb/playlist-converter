import React, { useEffect, useState } from "react";
import {spotify} from "../../data/auth_parameters";
import { Access, Error } from "../../data/types";
import { getSpotifyStorage, setSpotifyStorage } from "../../helpers/token";

type LoginProps = {
    toYouTube: boolean
    state: string
};

export function SpotifyLogin(props: LoginProps){

    const buildLink = 
        `${spotify.auth_endpoint}`+
        `client_id=${spotify.client_id}&`+
        `response_type=code&`+
        `redirect_uri=${spotify.redirect_uri}&`+
        `state=${props.state}&`+
        `scope=${
            spotify.scopes.reduce((x, y) => {return `${x}%20${y}`;}, "")
            .substring(3)
        }`;

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loaded, setLoaded] = useState(false);
    const getLoggedIn = async () => {
        const access: Access | Error = await getSpotifyStorage();
        if(access.hasOwnProperty("access_token")){
            setLoggedIn(true);
            setSpotifyStorage(access as Access);
        }else{
            const accessError: Error = access as Error;
            console.log(accessError);
            setLoggedIn(false);
        }
        setLoaded(true);
    }


    useEffect(() => {
        getLoggedIn();
    });

    return(
        <>
            {
            loaded
            ?   
                loggedIn 
                ? <p>Logged into Spotify!</p>
                : <a href={buildLink}>Log into Spotify</a>
            : <p>Trying to log you in...</p>
            }
        </>
    )
}

