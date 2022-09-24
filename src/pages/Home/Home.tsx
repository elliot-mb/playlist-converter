import React, {useEffect, useState} from 'react';
import "./Home.scss";
import {Container} from '../../components/Container/Container';
import {DestinationDropdown} from '../../components/DestinationDropdown/DestinationDropdown';
import Button from 'react-bootstrap/Button';
import { isValidSpotifyStorage } from '../../helpers/token';
import { ForgetMe } from '../../components/ForgetMe/ForgetMe';
import { forget } from '../../helpers/storage';
import { SpotifyUser } from "../../components/SpotifyUser/SpotifyUser";

type State = {
    toYouTube: boolean,
    enabled: boolean
}

export function Home(){
    // constructor(props: {} | Readonly<{}>){
    //     super(props);
    //     this.state = {
    //         toYouTube: true,
    //         enabled: isValidSpotifyStorage()
    //     }
    //     this.setToYouTube = this.setToYouTube.bind(this);
    // }

    // setToYouTube(d: boolean){
    //     this.setState({toYouTube: d, enabled: this.state.enabled});
    // }

    // forgetSet(){
    //     forget();
    //     this.setState({toYouTube: this.state.toYouTube, enabled: false});
    // }

    const [dest, setDest] = useState<string>('youtube');
    const [enabled, setEnabled] = useState<boolean>(isValidSpotifyStorage());

    useEffect(
        () => {
            setEnabled(isValidSpotifyStorage());
        },
        [setDest, setEnabled]
    );

    return(
        <Container>
            <div className="write-select">
                <h3>Writing to</h3>
                <DestinationDropdown dest={dest} setDest={setDest}/>
            </div>
            <SpotifyUser enabled={enabled}/>
            <ForgetMe enabled={enabled} setEnabled={setEnabled}/>
        </Container>
    )

}