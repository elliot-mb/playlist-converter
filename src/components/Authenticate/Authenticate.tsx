import React, { useEffect, useState } from "react";

const SpotifyContext = React.createContext({
    link: "",
    fetchLink: () => {}
})

type SpotifyLink = {
    'url': string
}

export function SpotifyLogin(){
    const [link, setLink] = useState("");
    const fetchLink = async () => {
        const response = await fetch("http://localhost:8000/spotify_redirect");
        console.log(response);
        const link: SpotifyLink = await response.json();
        setLink(link['url']);
    }

    useEffect(() => {
        fetchLink()
    }, []);

    return(
        <>
            <a href={link}>Authenticate with Spotify</a>
            <p>{link}</p>
        </>
    )
}