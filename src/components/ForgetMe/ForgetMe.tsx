import React from "react";
import Button from 'react-bootstrap/Button';
import { isValidSpotifyStorage } from '../../helpers/token';
import { forget } from '../../helpers/storage';

type Props = { 
    enabled: boolean
    setEnabled: (d: boolean) => void
};

export function ForgetMe(props: Props){

    return(
        isValidSpotifyStorage() 
            ? <Button type="button" className="btn btn-warning" onClick={() => {forget(); props.setEnabled(false);}}>Forget me</Button>
            : <Button type="button" className="btn btn-warning" disabled>Forget me</Button>
    )
}