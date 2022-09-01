import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { spotify } from "../../data/auth_parameters";
import { getCurrentSecondsFloor, setSpotifyStorage } from "../../helpers/token";
import { Access, Error } from "../../data/types";

//avoid hook loop by making consistent objects
const codeError: Error = { error: "Awaiting code retrieval..." }
const accessError: Error = { error: "Awaiting access code..." };

export function Login(){

    const [code, setCode] = useState<string | Error>(codeError);
    const [access, setAccess] = useState<Access | Error>(accessError);

    const getCode = (): void => {
        const params: string = window.location.href;
        const stateRE = new RegExp('state=(.+)')
        const codeRE = new RegExp('code=(.+)&');
        const stateArr: RegExpExecArray | null = stateRE.exec(params);
        const codeArr: RegExpExecArray | null = codeRE.exec(params);
        const state: string | null = stateArr === null ? null : stateArr[1];
        const code: string | null = codeArr === null ? null : codeArr[1];
        if(state === null || code === null || state === "" || code === ""){
            codeError.error = "Malformed URI";
            setCode(codeError);
        }else if(state !== spotify.state){
            codeError.error = "Inconsistent state";
            setCode(codeError);
        }else{
            setCode(code);
        }
    }
    
    const buildURL = (): string => {
        const url: string = `${spotify.backend_endpoint}` +
            `${spotify.access_token_endpoint}`+
            `code=${code}&`+
            `redirect_uri=${spotify.redirect_uri}&`+
            `client_id=${spotify.client_id}`;
        console.log(url);
        return url;
    }

    const fetchAccessToken = async () => {
        if(code !== codeError){
            const url: string = buildURL();
            const response = await fetch(url);
            //console.log(response);
            if(!response.ok) { 
                accessError.error = `Tried to fetch ${url}, got code: ${response.status}; response: ${response.text}`;
                setAccess(accessError);
            }else{
                //successfully recieved access and refresh tokens
                const access: Access = await response.json();
                access.expires_in += getCurrentSecondsFloor();
                setAccess(access);
                setSpotifyStorage(access);
            }
        }else{
            accessError.error = `Awaiting access code...`;
            setAccess(accessError);
        }
    }

    useEffect(() => {
        getCode();
        if(access === accessError) fetchAccessToken();
        console.log(access);
    });

    return(
        <Container>
            <h2>Spotify</h2>
            {access === accessError ? 
                <>
                    {code === codeError ? <p>{`Error: ${code.error}`}</p> : <></>}
                    <p>{`Error: ${access.error}`}</p>
                </> 
                : 
                <p>Logged in</p>}
            <Link to="/">{`< Go back`}</Link>
        </Container>
    )
}