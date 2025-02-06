export const getRandomTile = (options: string[]) => {
    return options[Math.floor(Math.random() * options.length)];
};

export const getRandomRotation = () => {
    const rotation = [0, 90, 180, 270];
    return rotation[Math.floor(Math.random() * rotation.length)];
};

export const getBoardHash = (tilesArray: string[], rotationArray: number[]) => {
    return tilesArray.map((entry, index) => `${entry.substring(11, 13)}` + 'x' + rotationArray[index]).join('|');
}

export const getTileInfoFromBoardHash = (hash: string) => {
    return hash.split('|').map((entry) => {
        return `/src/tiles/${entry.split('x')[0]}.jpg`;
    });
}

export const getRotationInfoFromBoardHash = (hash: string) => {
    return hash.split('|').map((entry) => {
        return parseInt(entry.split('x')[1], 10);
    });
}