import React from 'react';
import "./Home.scss";
import {Container} from '../../components/Container/Container';
import {SpotifyLogin} from '../../components/Authenticate/Authenticate';
import {DestinationDropdown} from '../../components/DestinationDropdown/DestinationDropdown';
import {spotify} from '../../data/auth_parameters';

type State = {
    toYouTube: boolean,
    spotifyState: string
}

export class Home extends React.Component<{}, State>{
    constructor(props: {} | Readonly<{}>){
        super(props);
        this.state = {
            toYouTube: true,
            spotifyState: spotify.state
        }
        this.changeDirection = this.changeDirection.bind(this);
    }

    changeDirection(d: boolean){
        this.setState({toYouTube: d});
    }

    render(){
        return(
            <Container>
                <div className="write-select">
                    <h3>Writing to</h3>
                    <DestinationDropdown toYouTube={this.state.toYouTube} changeDirection={this.changeDirection}/>
                </div>
                <SpotifyLogin toYouTube={this.state.toYouTube} state={this.state.spotifyState}/>
            </Container>
        )
    }

}