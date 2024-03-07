import Phaser from 'phaser';

class mainScene extends Phaser.Scene{
    constructor(){
        super({key: "chamcham_mainScene"});
    }
    preload(){
        this.load.image('bocchi', './assets/bocchi_11.png')
    }
    create(){
        this.add.rectangle(400, 400, 800, 800, 0xeeeeee);
        let bocchi = this.add.sprite(400, 400, 'bocchi');
    }
}

const chamcham = {
    mainScene: mainScene,
}

export default chamcham;