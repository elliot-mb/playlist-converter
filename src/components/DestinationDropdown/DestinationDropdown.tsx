import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

type Props = {
    toYouTube: boolean, 
    changeDirection: (d: boolean) => void
}

export class DestinationDropdown extends React.Component<Props, {}>{
    render(){
        return(
            <>
                <DropdownButton id="destination-dropdown-button" title="Write playlists to" >
                    <Dropdown.Item href="#" onClick={() => {this.props.changeDirection(true)}}>Youtube</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => {this.props.changeDirection(false)}}>Spotify</Dropdown.Item>
                </DropdownButton>
            </>
        )
    }
}