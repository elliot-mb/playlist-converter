import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

type Props = {
    toYouTube: boolean, 
    changeDirection: (d: boolean) => void
};

type State = {
    text: string
};

export class DestinationDropdown extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            text: this.getText(this.props.toYouTube)
        };
        this.select = this.select.bind(this);
    }

    select(toYouTube: boolean): void{
        this.props.changeDirection(toYouTube);
        this.setState({text: toYouTube ? "YouTube" : "Spotify"});
    }

    getText(toYouTube: boolean): string{
        return toYouTube ? "YouTube" : "Spotify";
    }

    render(){
        return(
            <>
                <DropdownButton id="destination-dropdown-button" title={this.state.text} >
                    <Dropdown.Item href="#" onClick={() => {this.select(true)}}>Youtube</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => {this.select(false)}}>Spotify</Dropdown.Item>
                </DropdownButton>
            </>
        )
    }
}