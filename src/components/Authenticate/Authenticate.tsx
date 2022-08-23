import React, { useEffect, useState } from "react";

const SpotifyContext = React.createContext({
    link: "",
    fetchLink: () => {}
})

type SpotifyLink = {
    'url': string
}

type LoginProps = {
    toYouTube: boolean
};

export function SpotifyLogin(props: LoginProps){
    const [link, setLink] = useState("");
    
    const fetchLink = async () => {
        const response = await fetch(`http://localhost:8000/spotify_redirect`);
        //console.log(response);
        const link: SpotifyLink = await response.json();
        setLink(link['url']);
    }

    useEffect(() => {
        fetchLink()
    }, []);

    return(
        <SpotifyContext.Provider value={{link, fetchLink}}>
            <a href={link}>Authenticate with Spotify</a>
        </SpotifyContext.Provider>
    )
}