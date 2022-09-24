import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

type Props = {
    dest: string, 
    setDest: (d: string) => void
};

type State = {
    text: string
};

export class DestinationDropdown extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            text: this.props.dest
        };
        this.select = this.select.bind(this);
    }

    select(dest: string): void{
        this.props.setDest(dest);
        this.setState({text: dest});
    }

    getText(toYouTube: boolean): string{
        return toYouTube ? "YouTube" : "Spotify";
    }

    render(){
        return(
            <>
                <DropdownButton id="destination-dropdown-button" title={this.state.text} disabled>
                    <Dropdown.Item href="#" onClick={() => {this.select("youtube")}}>youtube</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => {this.select("spotify")}}>spotify</Dropdown.Item>
                </DropdownButton>
            </>
        )
    }
}