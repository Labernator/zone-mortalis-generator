import a1 from '../tiles/A1.jpg'
import a2 from '../tiles/A2.jpg';
import a3 from '../tiles/A3.jpg'
import a4 from '../tiles/A4.jpg'
import a5 from '../tiles/A5.jpg'
import a6 from '../tiles/A6.jpg'
import a7 from '../tiles/A7.jpg'
import a8 from '../tiles/A8.jpg'
import a9 from '../tiles/A9.jpg'
import b1 from '../tiles/B1.jpg'
import b2 from '../tiles/B2.jpg'
import b3 from '../tiles/B3.jpg'
import b4 from '../tiles/B4.jpg'
import b5 from '../tiles/B5.jpg'
import b6 from '../tiles/B6.jpg'
import b7 from '../tiles/B7.jpg'
import b9 from '../tiles/B9.jpg'

const tiles = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3, b4, b5, b6, b7, b9];
const nonToxicTiles = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b4, b5];

export const getRandomTile = (options: string[]) => {
    return options[Math.floor(Math.random() * options.length)];
};

export const getRandomRotation = () => {
    const rotation = [0, 90, 180, 270];
    return rotation[Math.floor(Math.random() * rotation.length)];
};

export const getBoardHash = (tilesArray: string[], rotationArray: number[]) => {
    return tilesArray.map((entry, index) => `${entry.substring(entry.lastIndexOf("/") + 1, entry.lastIndexOf("-"))}` + 'x' + rotationArray[index]).join('|');
}

export const isValidHash = (hash: string) => {
    return hash.split('|').length === 9 && hash.split('x').length === 10;
}

export const getTileInfoFromBoardHash = (hash: string) => {
    const tileNames = hash.split('|').map((entry) => `${entry.split('x')[0]}`);
    const mappedNames = tileNames.map((tile) => {
        switch (tile) {
            case 'A1':
                return a1;
            case 'A2':
                return a2;
            case 'A3':
                return a3;
            case 'A4':
                return a4;
            case 'A5':
                return a5;
            case 'A6':
                return a6;
            case 'A7':
                return a7;
            case 'A8':
                return a8;
            case 'A9':
                return a9;
            case 'B1':
                return b1;
            case 'B2':
                return b2;
            case 'B3':
                return b3;
            case 'B4':
                return b4;
            case 'B5':
                return b5;
            case 'B6':
                return b6;
            case 'B7':
                return b7;
            case 'B9':
                return b9;
            default:
                ""
        }
    });

    return mappedNames;
}

export const getRotationInfoFromBoardHash = (hash: string) => {
    return hash.split('|').map((entry) => {
        return parseInt(entry.split('x')[1], 10);
    });
}

const getOptions = (fixedCenter: boolean, avoidToxic: boolean) => {
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

export const getTilesArray = (fixedCenter: boolean, avoidToxic: boolean, avoidDuplicates: boolean) => {

    const tilesArray = Array.from({ length: 9 }, () => getRandomTile(getOptions(fixedCenter, avoidToxic)));
    if (!avoidDuplicates) {
        return tilesArray;
    }
    const uniqArray = [...new Set(tilesArray)];
    if (uniqArray.length === 9) {
        return uniqArray;
    }
    return [...uniqArray, ...Array.from({ length: uniqArray.length }, () => getRandomTile(getOptions(fixedCenter, avoidToxic).filter(value => !uniqArray.includes(value))))];
}