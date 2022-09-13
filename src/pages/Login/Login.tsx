import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { getState } from "../../helpers/state";
import { getCurrentSecondsFloor, setSpotifyStorage, isValidSpotifyStorage } from "../../helpers/token";
import { Access, ErrorBox } from "../../data/types";

export function Login(){

    const [status, setStatus] = useState<string>("loading");

    const getQueryParams = async () => {
        const queryString: string = window.location.hash.split("#/login?")[1];
        const urlSearchParams = new URLSearchParams(queryString);
        const params = Object.fromEntries(urlSearchParams.entries());
        const state: string | undefined = params["state"];
        const access_token: string | undefined = params["access-token"];
        const expires_in: string | undefined = params["expires-in"];
        const refresh_token: string | undefined = params["refresh-token"];
        console.log(urlSearchParams);
        if(state !== getState()){
            setStatus("error: inconsistent state");
        }else if(
        access_token !== undefined &&
        expires_in    !== undefined &&
        refresh_token !== undefined){
            const access: Access = {
                access_token: access_token,
                expires_in: +expires_in + getCurrentSecondsFloor(),
                refresh_token: refresh_token
            };
            setSpotifyStorage(access);
            setStatus("ok");
        }else{
            setStatus("error: missing one or more query attributes")
        }
    }

    useEffect(() => {
        if(!isValidSpotifyStorage()){
            getQueryParams();
        }
    }, []);

    return(
        <Container>
            <h2>Spotify</h2>
            <p>{status === "ok" ? "Logged in!" : status}</p>
            <Link to="/">{`< Go back`}</Link>
        </Container>
    )
}