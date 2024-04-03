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
        let text02 = this.add.text(0, 0, "27방향 참참참", {
            fill: "0x000000",
            fontFamily: "Gulim",
            fontSize: "24px",
            align: "center",
        });
        game02.setStrokeStyle(3, 0x000000);
        text02.setPosition(200 - text02.width / 2, 160 - text02.height / 2);
        game02.setInteractive();
        game02.on('pointerdown', () => {
            this.scene.start("chamcham_waitScene", {try: 0})
        });

        let game03 = this.add.rectangle(200, 260, 300, 60, 0xead9c8);
        let text03 = this.add.text(0, 0, "체스", {
            fill: "0x000000",
            fontFamily: "Gulim",
            fontSize: "24px",
            align: "center",
        });
        game03.setStrokeStyle(3, 0x000000);
        text03.setPosition(200 - text03.width / 2, 260 - text03.height / 2);
        game03.setInteractive();
        game03.on('pointerdown', () => {
            this.scene.start("chess_whiteScene");
        });

        // let game04 = this.add.rectangle(200, 360, 300, 60, 0xead9c8);
        // let text04 = this.add.text(0, 0, "넙죽이 게임", {
        //     fill: "0x000000",
        //     fontFamily: "Gulim",
        //     fontSize: "24px",
        //     align: "center",
        // });
        // game04.setStrokeStyle(3, 0x000000);
        // text04.setPosition(200 - text04.width / 2, 360 - text04.height / 2);
        // game04.setInteractive();
        // game04.on('pointerdown', () => {
        //     this.scene.start("nubzuk_waitScene");
        // });
    }
}

export default main;