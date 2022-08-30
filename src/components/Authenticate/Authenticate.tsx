import React, { useEffect, useState } from "react";
import {spotify} from "../../data/auth_parameters";

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

    return(
        <a href={buildLink}>Authenticate with Spotify</a>
    )
}

