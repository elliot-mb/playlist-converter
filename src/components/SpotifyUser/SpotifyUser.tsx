import React, {useEffect, useState} from 'react';
import { ProfileInfo, getUserInfo } from '../../helpers/spotify_user';
import {SpotifyLogin} from '../../components/Authenticate/Authenticate';
import "./SpotifyUser.scss";

type Props = {
    enabled: boolean
};

const emptyProfile: ProfileInfo = {display_name: "", image_url: ""};
const errorProfile: ProfileInfo = {display_name: "error", image_url: "error"};

export function SpotifyUser(props: Props){

    const [info, setInfo] = useState<ProfileInfo>(emptyProfile);

    useEffect(() => {
        getUserInfo().then(
            (response) => {
                console.log("OK");
                setInfo(response);
            },
            (error) => {
                console.log(error);
                setInfo(errorProfile);
            }
        )
    }
    , [setInfo, props]);

    return <div className="user-card">
        {
            info.image_url === ""
            ? <p>Getting user information...</p>
            : info.image_url === "error"
                ? 
                <div className="user-login">
                    <p>Failed to load user.</p>
                    <SpotifyLogin enabled={props.enabled}/>
                </div>
                : 
                <div className="user-card-grid">
                    <h3 className="user-card-name">Logged in as <strong>{info.display_name}</strong></h3>
                    <img className="user-card-img" src={info.image_url as string} alt="profile-picture"/>
                </div>
        }
    </div>;
}