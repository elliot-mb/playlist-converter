import React, { useState, useEffect } from 'react';
import "./Home.scss";
import {Container} from '../../components/Container/Container';
import {SpotifyLogin} from '../../components/Authenticate/Authenticate';
import {SpotifyScopes} from '../../components/ScopeDropdown/ScopeDropdown';


export function Home(): React.ReactElement{



    return(
        <Container>
            <SpotifyScopes />
            <SpotifyLogin/>
        </Container>
    )
}