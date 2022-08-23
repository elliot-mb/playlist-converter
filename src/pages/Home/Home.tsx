import React, { useState, useEffect } from 'react';
import "./Home.scss";
import {Container} from '../../components/Container/Container';
import {SpotifyLogin} from '../../components/Authenticate/Authenticate';
import {DestinationDropdown} from '../../components/DestinationDropdown/DestinationDropdown';

export class Home extends React.Component<{}, {toYouTube: boolean}>{
    constructor(props: {} | Readonly<{}>){
        super(props);
        this.state = {
            toYouTube: true
        }
        this.changeDirection = this.changeDirection.bind(this);
    }

    changeDirection(d: boolean){
        this.setState({toYouTube: d});
    }

    render(){
        return(
            <Container>
                <p>Writing {`${this.state.toYouTube ? "Spotify" : "YouTube"} -> ${this.state.toYouTube ? "Youtube" : "Spotify"}`}</p>
                <DestinationDropdown toYouTube={this.state.toYouTube} changeDirection={this.changeDirection}/>
                <SpotifyLogin toYouTube={this.state.toYouTube}/>
            </Container>
        )
    }

}