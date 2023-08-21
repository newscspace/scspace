import Phaser from 'phaser';

class main extends Phaser.Scene{
    constructor(){
        super({key: "main"});
    }
    create(){
        this.add.rectangle(400, 400, 800, 800, 0xffffff);

        let game01 = this.add.rectangle(200, 60, 300, 60, 0xead9c8);
        let text01 = this.add.text(0, 0, "네모 게임", {
            fill: "0x000000",
            fontFamily: "Gulim",
            fontSize: "24px",
            align: "center",
        });
        game01.setStrokeStyle(3, 0x000000);
        text01.setPosition(200 - text01.width / 2, 60 - text01.height / 2);
        game01.setInteractive();
        game01.on('pointerdown', () => {
            this.scene.start("square_waitScene", {
                state: "init",
                n: 3,
                m: 1,
            })
        });

        let game02 = this.add.rectangle(200, 160, 300, 60, 0xead9c8);
        let text02 = this.add.text(0, 0, "어려운 네모 게임", {
            fill: "0x000000",
            fontFamily: "Gulim",
            fontSize: "24px",
            align: "center",
        });
        game02.setStrokeStyle(3, 0x000000);
        text02.setPosition(200 - text02.width / 2, 160 - text02.height / 2);
        game02.setInteractive();
        game02.on('pointerdown', () => {
            this.scene.start("hardSquare_waitScene", {
                state: "init",
                n: 3,
                m: 1,
            })
        });
    }
}

export default main;