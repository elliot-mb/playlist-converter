import React, { useEffect, useState } from "react";
import {spotify} from "../../data/auth_parameters";
import { Access, ErrorBox } from "../../data/types";
import { refreshSpotifyStorage, setSpotifyStorage } from "../../helpers/token";
import { getState } from "../../helpers/state";

type Props = {
    toYouTube: boolean, 
    enabled: boolean
};

export function SpotifyLogin(props: Props){

    const buildLink = 
        `${spotify.auth_endpoint}`+
        `client_id=${spotify.client_id}&`+
        `response_type=code&`+
        `redirect_uri=${spotify.redirect_uri}&`+
        `state=${getState()}&`+
        `scope=${
            spotify.scopes.reduce((x, y) => {return `${x}%20${y}`;}, "")
            .substring(3)
        }`;

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loaded, setLoaded] = useState(false);
    const getLoggedIn = async () => {
        const access: Access | ErrorBox = await refreshSpotifyStorage();
        if(access.hasOwnProperty("access_token")){
            setLoggedIn(true);
            setSpotifyStorage(access as Access);
        }else{
            const accessError: ErrorBox = access as ErrorBox;
            console.log(accessError);
            setLoggedIn(false);
        }
        setLoaded(true);
    }


    useEffect(() => {
        getLoggedIn();
    }, [loggedIn, loaded, props]);

    return(
        <>
            {
            loaded
            ?   
                loggedIn 
                ? <p>Logged into Spotify!</p>
                : <p><a href={buildLink}>Log into Spotify</a></p>
            : <p>Trying to log you in...</p>
            }
        </>
    )
}

