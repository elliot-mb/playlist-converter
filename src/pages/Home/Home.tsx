import React from 'react';
import "./Home.scss";
import {Container} from '../../components/Container/Container';
import {SpotifyLogin} from '../../components/Authenticate/Authenticate';
import {DestinationDropdown} from '../../components/DestinationDropdown/DestinationDropdown';
import Button from 'react-bootstrap/Button';
import { isValidSpotifyStorage } from '../../helpers/token';
import { forget } from '../../helpers/storage';

type State = {
    toYouTube: boolean,
    enabled: boolean
}

export class Home extends React.Component<{}, State>{
    constructor(props: {} | Readonly<{}>){
        super(props);
        this.state = {
            toYouTube: true,
            enabled: isValidSpotifyStorage()
        }
        this.setToYouTube = this.setToYouTube.bind(this);
        this.setEnabled = this.setEnabled.bind(this);
    }

    setToYouTube(d: boolean){
        this.setState({toYouTube: d, enabled: this.state.enabled});
    }

    forgetSet(){
        forget();
        this.setEnabled(isValidSpotifyStorage());
    }

    setEnabled(d: boolean){
        this.setState({toYouTube: this.state.toYouTube, enabled: d});
    }

    render(){
        return(
            <Container>
                <div className="write-select">
                    <h3>Writing to</h3>
                    <DestinationDropdown toYouTube={this.state.toYouTube} setToYouTube={this.setToYouTube}/>
                </div>
                <SpotifyLogin toYouTube={this.state.toYouTube} enabled={this.state.enabled}/>
                {   
                    isValidSpotifyStorage() 
                    ? <Button type="button" className="btn btn-warning" onClick={() => {this.forgetSet();}}>Forget me</Button>
                    : <Button type="button" className="btn btn-warning" disabled>Forget me</Button>
                }
            </Container>
        )
    }

}