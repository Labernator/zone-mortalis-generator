import { useState } from 'react'
import a8 from './tiles/A8.jpg'
import { getTileInfoFromBoardHash, getRotationInfoFromBoardHash, getRandomRotation, getBoardHash, getTilesArray } from './utils/utilities';

export const Tile = ({ tileName, rotation }: { tileName: string; rotation: number }) => <img src={tileName} alt={`tile_${tileName}`} style={{ width: "200px", height: "200px", transform: `rotate(${rotation}deg)` }} />;

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
}

const CheckboxWithText = ({ mybool, text, callback }: { mybool: boolean; text: string; callback: Function }) => {
    return <div className='checkbox'>
        <input
            checked={mybool}
            onChange={() => callback()}
            type="checkbox"
            aria-label={text}
        />
        <div>{text}</div>
    </div>
};

export const RandomBoard = ({ boardHash }: { boardHash?: string }) => {
    const [avoidToxic, setAvoidToxic] = useState(false);
    const [avoidDuplicates, setAvoidDuplicates] = useState(false);
    const [fixedCenter, setFixedCenter] = useState(false);
    //create your forceUpdate hook
    const forceUpdate = useForceUpdate();
    const tilesArray = boardHash ? getTileInfoFromBoardHash(boardHash) : getTilesArray(fixedCenter, avoidToxic, avoidDuplicates);
    const rotationsArray = boardHash ? getRotationInfoFromBoardHash(boardHash) : Array.from({ length: 9 }, () => getRandomRotation());

    const toggleToxic = () => {
        setAvoidToxic(!avoidToxic);
    };
    const toggleDuplicate = () => {
        setAvoidDuplicates(!avoidDuplicates);
    };
    const toggleFixedCenter = () => {
        setFixedCenter(!fixedCenter);
    };

    return <div>
        <CheckboxWithText mybool={avoidToxic} text="Avoid toxic tiles" callback={toggleToxic} />
        <CheckboxWithText mybool={avoidDuplicates} text="Avoid duplicate tiles" callback={toggleDuplicate} />
        <CheckboxWithText mybool={fixedCenter} text="Fix center section" callback={toggleFixedCenter} />
        <button onClick={() => forceUpdate()} >Refresh</button>
        <TheBoard boardHash={boardHash || getBoardHash(tilesArray, rotationsArray)} fixedCenter={fixedCenter} avoidToxic={avoidToxic} avoidDuplicates={avoidDuplicates} />

    </div>
}

export const TheBoard = ({ boardHash, fixedCenter, avoidToxic, avoidDuplicates, css }: { boardHash: string; fixedCenter: boolean; avoidToxic: boolean; avoidDuplicates: boolean; css?: string }) => {
    const tilesArray = boardHash ? getTileInfoFromBoardHash(boardHash) : getTilesArray(fixedCenter, avoidToxic, avoidDuplicates);
    const rotationsArray = boardHash ? getRotationInfoFromBoardHash(boardHash) : Array.from({ length: 9 }, () => getRandomRotation());
    console.log(tilesArray);
    return <div className={`board ${css}`}>
        <div style={{ width: "600px", height: "600px" }}>
            <div style={{ width: "600px", height: "200px" }}>
                <Tile tileName={tilesArray[0]} rotation={rotationsArray[0]} />
                <Tile tileName={tilesArray[1]} rotation={rotationsArray[1]} />
                <Tile tileName={tilesArray[2]} rotation={rotationsArray[2]} />
            </div>
            <div style={{ width: "600px", height: "200px" }}>
                <Tile tileName={tilesArray[3]} rotation={rotationsArray[3]} />
                {fixedCenter ? <Tile tileName={a8} rotation={0} /> : <Tile tileName={tilesArray[8]} rotation={rotationsArray[8]} />}
                <Tile tileName={tilesArray[4]} rotation={rotationsArray[4]} />
            </div>
            <div style={{ width: "600px", height: "200px" }}>
                <Tile tileName={tilesArray[5]} rotation={rotationsArray[5]} />
                <Tile tileName={tilesArray[6]} rotation={rotationsArray[6]} />
                <Tile tileName={tilesArray[7]} rotation={rotationsArray[7]} />
            </div>
        </div>
        <div>Board ID: {getBoardHash(fixedCenter ?
            [tilesArray[0], tilesArray[1], tilesArray[2], tilesArray[3], "/src/tiles/A8", tilesArray[4], tilesArray[5], tilesArray[6], tilesArray[7]] :
            [...tilesArray.filter((_, idx) => idx < 8)],
            fixedCenter ?
                [rotationsArray[0], rotationsArray[1], rotationsArray[2], rotationsArray[3], 0, rotationsArray[4], rotationsArray[5], rotationsArray[6], rotationsArray[7]]
                : rotationsArray)}
        </div>
    </div>
}