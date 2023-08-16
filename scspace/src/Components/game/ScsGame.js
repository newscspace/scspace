import Phaser from 'phaser';
import React, {useEffect, useRef} from 'react';
import square from './square'

const PhaserComponent = () => {
    const gameContainer = useRef(null);
    let game;

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 800,
            scene: [square],
            parent: 'gamediv',
            backgroundColor: '#eeeeee'
        };
        game = new Phaser.Game(config);

    }, []);

    return (<div ref={gameContainer} id="gamediv" class="top-margin3 mid-align"/>)
}

const ScsGame = () => {

    return (<PhaserComponent />);
};

export default ScsGame;