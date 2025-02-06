import { useState } from 'react'
import a1 from './tiles/A1.jpg'
import a2 from './tiles/A2.jpg';
import a3 from './tiles/A3.jpg'
import a4 from './tiles/A4.jpg'
import a5 from './tiles/A5.jpg'
import a6 from './tiles/A6.jpg'
import a7 from './tiles/A7.jpg'
import a8 from './tiles/A8.jpg'
import a9 from './tiles/A9.jpg'
import b1 from './tiles/B1.jpg'
import b2 from './tiles/B2.jpg'
import b3 from './tiles/B3.jpg'
import b4 from './tiles/B4.jpg'
import b5 from './tiles/B5.jpg'
import b6 from './tiles/B6.jpg'
import b7 from './tiles/B7.jpg'
import b9 from './tiles/B9.jpg'
import { getRandomTile, getTileInfoFromBoardHash, getRotationInfoFromBoardHash, getRandomRotation, getBoardHash } from './utils/utilities';

export const Tile = ({ tileName, rotation }: { tileName: string; rotation: number }) => <img src={tileName} alt="React logo" style={{ width: "200px", height: "200px", transform: `rotate(${rotation}deg)` }} />;
const tiles = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3, b4, b5, b6, b7, b9];
const nonToxicTiles = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b4, b5];


function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
}

export const RandomBoard = ({ boardHash }: { boardHash?: string }) => {
    const [avoidToxic, setAvoidToxic] = useState(false);
    const [avoidDuplicates, setAvoidDuplicates] = useState(false);
    const [fixedCenter, setFixedCenter] = useState(false);
    const getOptions = () => {
        if (fixedCenter) {
            if (avoidToxic) {
                return nonToxicTiles.filter((tile) => tile !== a8);
            }
            return tiles.filter((tile) => tile !== a8);
        }
        if (avoidToxic) {
            return nonToxicTiles;
        }
        return tiles;
    }
    const getTilesArray = () => {

        const tilesArray = Array.from({ length: 9 }, () => getRandomTile(getOptions()));
        if (!avoidDuplicates) {
            return tilesArray;
        }
        const uniqArray = [...new Set(tilesArray)];
        if (uniqArray.length === 9) {
            return uniqArray;
        }
        return [...uniqArray, ...Array.from({ length: uniqArray.length }, () => getRandomTile(getOptions().filter(value => !uniqArray.includes(value))))];
    }
    //create your forceUpdate hook
    const forceUpdate = useForceUpdate();
    const tilesArray = boardHash ? getTileInfoFromBoardHash(boardHash) : getTilesArray();
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
        <div style={{ display: "flex" }}>
            <input
                checked={avoidToxic}
                onChange={() => toggleToxic()}
                type="checkbox"
                aria-label='Avoid toxic tiles'
            />
            <div>Avoid toxic tiles</div>
        </div>
        <div style={{ display: "flex" }}>
            <input
                checked={avoidDuplicates}
                onChange={() => toggleDuplicate()}
                type="checkbox"
                aria-label='Avoid duplicate tiles'
            />
            <div>Avoid duplicate tiles</div>
        </div>
        <div style={{ display: "flex" }}>
            <input
                checked={fixedCenter}
                onChange={() => toggleFixedCenter()}
                type="checkbox"
                aria-label='Fix middle section'
            />
            <div>Fix middle section</div>
        </div>
        <div onClick={() => forceUpdate()} style={{ border: "1px solid" }}>Refresh</div>
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
        <div>Board Hash: {getBoardHash(fixedCenter ?
            [tilesArray[0], tilesArray[1], tilesArray[2], tilesArray[3], "/src/tiles/A8", tilesArray[4], tilesArray[5], tilesArray[6], tilesArray[7]] :
            tilesArray,
            fixedCenter ?
                [rotationsArray[0], rotationsArray[1], rotationsArray[2], rotationsArray[3], 0, rotationsArray[4], rotationsArray[5], rotationsArray[6], rotationsArray[7]]
                : rotationsArray)}</div>
    </div>
}