import React, { useEffect, useState } from "react";
import {spotify} from "../../data/backend_params";
import { Access, ErrorBox } from "../../data/types";
import { refreshSpotifyStorage, setSpotifyStorage } from "../../helpers/token";
import { getState } from "../../helpers/state";
import Button from 'react-bootstrap/Button';

type Props = {
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

    const [status, setStatus] = useState<string>("loading");
    const [error, setError] = useState<string | null>(null);
    const getLoggedIn = async () => {
        const access: Access | ErrorBox = await refreshSpotifyStorage();
        if(access.hasOwnProperty("access_token")){
            setStatus("logged-in");
            setSpotifyStorage(access as Access);
        }else{
            const accessError: ErrorBox = access as ErrorBox;
            console.log(accessError);
            setStatus("error");
            setError(accessError.error);
        }
    }


    useEffect(() => {
        getLoggedIn();
    }, [status, props]);

    return(
        <>
            {
            status === "loading" 
            ? <p>Refreshing your access token...</p>
            : status === "logged-in"
                ? <p>Healthy localStorage.</p>
                : 
                <>
                    <Button type="button" className="btn btn-primary" href={buildLink}>Log into Spotify</Button>
                    <p className="text-muted">Error: {error}</p>
                </>
            }
        </>
    )
}

