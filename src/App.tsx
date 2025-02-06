import { useState } from 'react';
import { RandomBoard } from './TilesComponents'
const isValidHash = (hash: string) => {
    return hash.split('|').length === 9 && hash.split('x').length === 10;
}
function App() {
    const [hash, setHash] = useState('');
    return (
        <>
            <h1>Zone Mortalis - Tile Generator</h1>
            <input type="text" onChange={(e) => {
                setHash(e.currentTarget.value);
            }} />
            <RandomBoard boardHash={isValidHash(hash) ? hash : ""}/>
        </>
    )
}

export default App
