import React, { useEffect, useState } from "react";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SpotifyScopeContext = React.createContext({
    scope: 0,
    putScope: (i: number) => {}
});

export function SpotifyScopes(){
    const [scope, setScope] = useState(0);

    const putScope = (i: number) => {
        setScope(i);
    }

    return(
        <SpotifyScopeContext.Provider value={{scope, putScope}}>
            <p></p>
        </SpotifyScopeContext.Provider>
    )
}