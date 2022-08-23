import React, { useState, useEffect } from 'react';
import "./Home.scss";
import {Container} from '../../components/Container/Container';
import {SpotifyLogin} from '../../components/Authenticate/Authenticate';

export function Home(): React.ReactElement{



    return(
        <Container>
            <SpotifyLogin />
        </Container>
    )
}