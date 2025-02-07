import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { RandomBoard, TheBoard } from './TilesComponents';
import { isValidHash } from './utils/utilities';

import './css/index.css'
import './css/loading-indicator.css'
import { LoadingIndicator } from './components/LoadingIndicator';
import { PDFButton } from './pdfProvider';

function App() {
    const [hash, setHash] = useState('');
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
    return (
        <>
            <h1>Zone Mortalis - Tile Generator</h1>

            <PDFButton showLoadingIndicator={setShowLoadingIndicator} />
            <RandomBoard boardHash={isValidHash(hash) ? hash : ""}/>
            <TheBoard boardHash={''} fixedCenter={true} avoidToxic={true} avoidDuplicates={true} css="pdf-export"/>
            <TheBoard boardHash={''} fixedCenter={true} avoidToxic={false} avoidDuplicates={true} css="pdf-export" />
            <TheBoard boardHash={''} fixedCenter={false} avoidToxic={false} avoidDuplicates={true} css="pdf-export" />
            {showLoadingIndicator ? <LoadingIndicator /> : undefined}
            <p>Enter a board ID in the input field below to display it</p>
            <input style={{width:"80%"}} type="text" onChange={(e) => {
                setHash(e.currentTarget.value);
            }} />
        </>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
