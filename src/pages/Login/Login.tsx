import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { spotify } from "../../data/auth_parameters";
import { getCurrentSecondsFloor, setSpotifyStorage, isValidSpotifyStorage } from "../../helpers/token";
import { Access, ErrorBox } from "../../data/types";

const accessError: ErrorBox = {error: "getAccess() has not run"};
const empty: {} = {};

export function Login(){

    const [access, setAccess] = useState<Access | ErrorBox | {}>(empty);
    const [fetched, setFetched] = useState<boolean>(false);

    const getCode = async (): Promise<string | null> => {
        console.log("running getCode");
        const params: string = window.location.href;
        const stateRE = new RegExp('state=(.+)')
        const codeRE = new RegExp('code=(.+)&');
        const stateArr: RegExpExecArray | null = stateRE.exec(params);
        const codeArr: RegExpExecArray | null = codeRE.exec(params);
        const state: string | null = stateArr === null ? null : stateArr[1];
        const codeRead: string | null = codeArr === null ? null : codeArr[1];
        if(state === null || state === "") return Promise.reject(new Error("state is null"));
        if(state !== spotify.state) return Promise.reject(new Error("state is inconsistent"));
        return codeRead;
    }

    const buildURL = (code: string): string => {
        const url: string = `${spotify.backend_endpoint}` +
            `${spotify.access_token_endpoint}`+
            `code=${code}&`+
            `redirect_uri=${spotify.redirect_uri}&`+
            `client_id=${spotify.client_id}`;
        return url;
    }

    const fetchAccessToken = async (c: string) => {
        console.log(`fetching access token...`);
        const url: string = buildURL(c);
        const response = await fetch(url);
        setFetched(true);
        //console.log(response);
        if(!response.ok) { 
            accessError.error = `Tried to fetch ${url}, got code: ${response.status}; response: ${await response.text()}`;
            setAccess(accessError);
            Promise.reject(Error(accessError.error));
        }else{
            //successfully recieved access and refresh tokens
            const access: Access = await response.json();
            access.expires_in += getCurrentSecondsFloor();
            setAccess(access);
            setSpotifyStorage(access);
        }
    }

    const getThenFetch = async () => {
        getCode().then((c: string | null) => {
            if(c !== null && fetched === false && access === empty) { 
                fetchAccessToken(c);
            }else if(fetched === true) {
                return Promise.reject(Error("already fetched"));
            }
            else {
                return Promise.reject(Error("code is null")); 
            }
            return;
        }, (error) => { console.error(error); }).then(
            () => {},
            (error) => { console.error(error); }
        )
    }

    useEffect(() => {
        getThenFetch();
    }, []);

    return(
        <Container>
            <h2>Spotify</h2>
            {!isValidSpotifyStorage()
                ? 'error' in access 
                    ? <p>Error: {access.error}</p>
                    : <p>Erorr: Invalid spotify Storage</p>
                : (access === empty) 
                    ? <p>Error: access is empty</p>
                    : <p>Logged in</p>
            }
            <Link to="/">{`< Go back`}</Link>
        </Container>
    )
}