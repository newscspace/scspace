import Phaser from 'phaser';

const num2dir = (n) => {
    return [parseInt(n/9), parseInt(n/3)%3, n%3];
}

const makeface = (game, dir, t) => {
    let fb = dir[0];
    let ud = dir[1];
    let rl = dir[2];
    let x = 280 + rl*120;
    let y = 180 + ud*120;
    let face;
    if(t >= 27){
        if(fb === 0) face = game.add.sprite(x, y, 'chanyeol_crazy_front');
        if(fb === 1) face = game.add.sprite(x, y, 'chanyeol_crazy_middle');
        if(fb === 2) face = game.add.sprite(x, y, 'chanyeol_crazy_back');
    }
    else{
        if(fb === 0) face = game.add.sprite(x, y, 'chanyeol_front');
        if(fb === 1) face = game.add.sprite(x, y, 'chanyeol_middle');
        if(fb === 2) face = game.add.sprite(x, y, 'chanyeol_back');
        face.setSize(1.2);
    }
    return face;
}

const makearrow = (game, n) => {
    let dir = num2dir(n);
    let fb = dir[0];
    let ud = dir[1];
    let rl = dir[2];
    let x = 115 + fb*220 + rl*65;
    let y = 605 + ud*65;
    let border = game.add.rectangle(x, y, 60, 60, "0xeeeeee");
    border.setStrokeStyle(2, "0x000000");
    let arrow = game.add.sprite(x, y, 'arrow_' + n);
    arrow.setScale(0.24);
    return arrow;
}
class waitScene extends Phaser.Scene{
    constructor(){
        super({key: "chamcham_waitScene"});
    }
    preload(){
        this.load.image('chanyeol_front', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chanyeol_front.png");
        this.load.image('chanyeol_middle', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chanyeol_middle.png");
        this.load.image('chanyeol_back', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chanyeol_back.png");
        for(let i = 0; i < 27; i++){
            this.load.image('arrow_' + i, "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/dir_" + i + ".png");
        }
    }
    init(data){
        this.tick = 0;
        this.dir = num2dir(13);
        this.try = data.try + 1;
    }
    create(){
        this.add.rectangle(400, 400, 800, 800, 0xeeeeee);
        this.center = this.add.circle(400, 300, 4, "0x000000");
        this.face = makeface(this, this.dir, this.try);
        this.arrowList = []
        for(let i = 0; i < 27; i++){
            let arrow = makearrow(this, i);
            arrow.setInteractive();
            arrow.on("pointerdown", () => {
                this.scene.start("chamcham_playScene", {
                    predict_num: i,
                    try: this.try,
                });
            })
            this.arrowList.push(arrow);
        }

        let back_points = new Phaser.Geom.Polygon([15, -15,  -15, 0,  15, 15]);
        let back_button = this.add.polygon(60, 60, back_points.points, 0x000000);
        this.input.on('pointerdown', (pos) => {
            if(back_points.contains(pos.x - 45, pos.y - 45)){
                this.scene.start("main");
            }
        });
        
        let try_text = this.add.text(20, 80, this.try + "번째 시도", {
            fill: "0x000000",
            fontFamily: "Gulim",
            fontSize: "24px",
            align: "left",
        });
    }
    
}

class playScene extends Phaser.Scene{
    constructor(){
        super({key: "chamcham_playScene"});
    }
    preload(){
        this.load.image('chanyeol_front', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chanyeol_front.png");
        this.load.image('chanyeol_middle', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chanyeol_middle.png");
        this.load.image('chanyeol_back', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chanyeol_back.png");
        this.load.image('chanyeol_crazy_front', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chanyeol_crazy_front.png");
        this.load.image('chanyeol_crazy_middle', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chanyeol_crazy_middle.png");
        this.load.image('chanyeol_crazy_back', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chanyeol_crazy_back.png");
        for(let i = 0; i < 27; i++){
            this.load.image('arrow_' + i, "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/dir_" + i + ".png");
        }
        this.load.image('cham', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/cham.png");
        this.load.image('redcham', "https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/redcham.png");
    }
    init(data){
        this.predict_num = data.predict_num;
        this.try = data.try;
    }
    create(){
        this.tick = 0;
        this.center = this.add.circle(400, 300, 4, "0x000000");
        this.face = makeface(this, num2dir(13), this.try);
        this.arrowList = []
        for(let i = 0; i < 27; i++){
            let arrow = makearrow(this, i);
            this.arrowList.push(arrow);
        }
        this.cham = this.add.sprite(700, 100, 'cham');

        let back_points = new Phaser.Geom.Polygon([15, -15,  -15, 0,  15, 15]);
        let back_button = this.add.polygon(60, 60, back_points.points, 0x000000);
        this.input.on('pointerdown', (pos) => {
            if(back_points.contains(pos.x - 45, pos.y - 45)){
                this.scene.start("main");
            }
        });

        let try_text = this.add.text(20, 80, this.try + "번째 시도", {
            fill: "0x000000",
            fontFamily: "Gulim",
            fontSize: "24px",
            align: "left",
        });
    }
    update(a, b){
        if(this.tick < 80) this.cham.setScale(1 - (this.tick % 40) / 40);
        this.tick++;

        if(this.tick === 80){
            this.num = Math.floor(Math.random() * 27);
            this.dir = num2dir(this.num);

            this.cham.destroy();
            this.cham = this.add.sprite(700, 100, 'redcham');
            this.face.destroy();
            this.face = makeface(this, this.dir, this.try);
        }
        if(this.tick === 120){
            if(this.predict_num === this.num){
                this.success_text = this.add.text(380, 80, "성공!!", {
                    fill: "0x000000",
                    fontFamily: "Gulim",
                    fontSize: "24px",
                    align: "center",
                });
            }
            else{
                this.scene.start("chamcham_waitScene", {try: this.try});
            }
        }
    }
}

const chamcham = {
    waitScene: waitScene,
    playScene: playScene,
}

export default chamcham;