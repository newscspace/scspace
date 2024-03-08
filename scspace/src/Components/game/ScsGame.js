import Phaser from 'phaser';
import React, {useEffect, useRef} from 'react';
import main from './main';
import square from './square';
import hardSquare from './hardSquare';
import chamcham from './chamcham'

const PhaserComponent = () => {
    const gameContainer = useRef(null);
    let game;

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 800,
            scene: [main, square.waitScene, square.playScene, chamcham.waitScene, chamcham.playScene],
            parent: 'gamediv',
            backgroundColor: '#eeeeee',
            autoDestroy: true
        };
        game = new Phaser.Game(config);
        game.scene.start("main");

    }, []);

    return (<div ref={gameContainer} id="gamediv" class="top-margin3 mid-align"/>)
}

const ScsGame = () => {

    return (<PhaserComponent />);
};

export default ScsGame;