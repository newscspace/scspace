import Phaser from 'phaser';

const GROUNDY = 564
class waitScene extends Phaser.Scene{
    constructor(){
        super({key: "nubzuk_waitScene"});
    }
    preload(){
        this.load.image('nubzuk', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/Nubzuk.png");
    }
    create(){
        this.ground = this.add.rectangle(400, 700, 800, 200, 0x996633);
        this.player = this.physics.add.sprite(200, GROUNDY, 'nubzuk');
        this.physics.add.existing(this.ground);
        this.player.setScale(0.07);

        this.arrow = this.input.keyboard.createCursorKeys();
        this.enemyList = [];
        this.score = 0;
    }
    update(){
        if(this.physics.overlap(this.player, this.ground)){
            this.player.setVelocityY(0);
            this.player.setAccelerationY(0);
            this.player.setY(GROUNDY);
        }
        if(this.arrow.up.isDown && this.physics.overlap(this.player, this.ground)){
            this.player.setVelocityY(-1050);
            this.player.setAccelerationY(2400);
        }
        if(this.score % 600 == 0){
            this.enemyList.append(this.physics.add.sprite(1000, 400, 'enemy1')) // 장애물1
        }

        this.score += 5;
    }
}

class playScene extends Phaser.Scene{
    constructor(){
        super({key: "nubzuk_playScene"});
    }
}

const nubzuk = {
    waitScene: waitScene,
    playScene: playScene,
}

export default nubzuk;