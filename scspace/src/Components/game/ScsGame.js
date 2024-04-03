import Phaser from 'phaser'
import React, {useEffect, useRef} from 'react'
import main from './main'
import square from './square'
import chamcham from './chamcham'
import chess from './chess'
import nubzuk from './nubzuk'

const PhaserComponent = () => {
    const gameContainer = useRef(null);
    let game;

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 800,
            scene: [main,
                    square.waitScene, square.playScene,
                    chamcham.waitScene, chamcham.playScene,
                    chess.whiteScene, chess.blackScene, chess.gameoverScene,
                    nubzuk.waitScene],
            physics: {
                default: 'arcade',
            },
            fps: {
                target: 60,
                forceSetTimeOut: true
            },
            parent: 'gamediv',
            backgroundColor: '#eeeeee',
            autoDestroy: true,
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