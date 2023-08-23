import Phaser from 'phaser';

function makeEmptyList(s){
    let rectList = [];
    for(let i = 0; i < s.n; i++){
        for(let j = 0; j < s.n; j++){
            rectList.push({
                obj: makeRect(s, i, j, 600 / s.n, "none"),
                x: i,
                y: j,
                state: "none"
            });
        }
    }
    return rectList;
}

function makeRect(game, x, y, size, state){
    let color;
    if(state === "none" || state === "hide") color = 0xd7d7d7;
    if(state === "show") color = 0x528c37;
    if(state === "wrong") color = 0xab1e1e;
    return game.add.rectangle(100 + (x+0.5)*size, 170 + (y+0.5)*size, 0.9*size, 0.9*size, color);
};

function shuffle(list){     // Fisher-Yates shuffle
    let num = list.length;
    for(let i = num-1; i > 0; i--){
        let j = Math.floor(Math.random() * (i+1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
};

function setProblem(list, count){
    let newList = shuffle(list);
    for(let i = 0; i < count; i++){
        newList[i].state = "show";
    }
    for(let i = count; i < list.length; i++){
        newList[i].state = "none"
    }
    return newList;
};

class waitScene extends Phaser.Scene{
    constructor(){
        super({key: "hardSquare_waitScene"});
        
    };
    init(data){
        if(data.state === "timeOver") this.add.rectangle(400, 400, 800, 800, 0x856565);
        else this.add.rectangle(400, 400, 800, 800, 0xeeeeee);
        this.add.rectangle(400, 470, 600, 600, 0xeeeeee);
        this.add.rectangle(400, 80, 600, 80, 0xeeeeee);

        this.n = data.n;
        this.m = data.m;
        this.tick = 0;
        this.data = data;
        if(data.state === "init"){
            this.rectList = makeEmptyList(this);
            this.text = "Click to start";
        }
        if(data.state === "over" || data.state === "timeOver"){
            this.rectList = data.rectList;
            this.rectList.map((rect) => {
                if(rect.state === "hide") rect.state = "show";
                rect.obj = makeRect(this, rect.x, rect.y, 600 / this.n, rect.state);
            });
            this.text = data.state === 'over' ? "Game over!" : "Time over!";
        }
    }
    create(){
        let border = this.add.rectangle(400, 400, 800, 800);
        border.setStrokeStyle(4, 0x000000);

        this.notice = this.add.text(0, 0, this.text, {
            fill: "0x000000",
            fontFamily: "Consolas",
            fontSize: "40px",
            align: "center",
        });
        this.notice.setPosition(400 - this.notice.width/2, 80 - this.notice.height/2);
        let prograssBar1 = this.add.rectangle(400, 160, 600, 4, 0xd7d7d7);
        let prograssBar2 = this.add.rectangle(0, 0, 600 * (this.m - 1)/(this.n - 1), 4, 0xd6615d);
        prograssBar2.setOrigin(0, 0);
        prograssBar2.setPosition(100, 158);

        let back_points = new Phaser.Geom.Polygon([15, -15,  -15, 0,  15, 15]);
        let back_button = this.add.polygon(60, 60, back_points.points, 0x000000);

        this.input.on('pointerdown', (pos) => {
            if(back_points.contains(pos.x - 45, pos.y - 45)){
                this.scene.start("main");
            }
            else if(this.tick > 50 || this.data.state === "init"){
                this.n = 3;
                this.rectList.map((rect) => {
                    rect.obj.destroy();
                });
                let newRectList = setProblem(makeEmptyList(this), 3);
                this.scene.start("hardSquare_playScene", {
                    rectList: newRectList,
                    n: 3,
                    m: 1,
                });
            }
        });
    };
    update(){this.tick++;}
}

class playScene extends Phaser.Scene{
    constructor(){
        super({key: "hardSquare_playScene"});
    };
    init(data){

        this.add.rectangle(400, 470, 600, 600, 0xeeeeee);
        this.add.rectangle(400, 80, 600, 80, 0xeeeeee);

        this.rectList = data.rectList;
        this.n = data.n;
        this.m = data.m;
        this.tick = 0;
        this.tick2 = 40 * 3;
        this.get = 0;
        this.rectList.map((rect) => {
            rect.obj.destroy();
            rect.obj = makeRect(this, rect.x, rect.y, 600/this.n, rect.state);
        });
        this.notice = null;
        this.showRectList = [];
        this.timeRect = this.add.rectangle(400, -400, 800, 800, 0x856565);
        this.clear = false;
    };
    environ(game){
        game.add.rectangle(400, 470, 600, 600, 0xeeeeee);
        game.add.rectangle(400, 80, 600, 80, 0xeeeeee);
        game.m++;
        if(game.n === game.m){
            game.n++;
            game.m = 1;
        }
        game.rectList = setProblem(makeEmptyList(game), game.n + 2*game.m - 2);
        game.rectList.map((rect) => {
            rect.obj.destroy();
            rect.obj = makeRect(game, rect.x, rect.y, 600/game.n, rect.state);
        })
        
        game.notice = game.add.text(0, 0, "Look", {
            fill: "0x000000",
            fontFamily: "Consolas",
            fontSize: "40px",
            align: "center",
        });
        game.notice.setPosition(400 - game.notice.width/2, 80 - game.notice.height/2);
        game.tick = 0;
        game.tick2 = 37 * (game.n + 2*game.m - 2);
        game.get = 0;
        game.timeRect.setPosition(400, -400);

        game.showRectList.map((rect) => {
            rect.destroy();
            rect = makeRect(game, rect.x, rect.y, 600 / game.n, rect.state);
        });
        game.clear = false;
    };
    create(){
        let border = this.add.rectangle(400, 400, 800, 800);
        border.setStrokeStyle(4, 0x000000);

        this.notice = this.add.text(0, 0, "Look", {
            fill: "0x000000",
            fontFamily: "Consolas",
            fontSize: "40px",
            align: "center",
        });
        this.notice.setPosition(400 - this.notice.width/2, 80 - this.notice.height/2);
        this.rectList.map((rect) => {
            this.showRectList.push(makeRect(this, rect.x, rect.y, 600 / this.n, rect.state))
        });

        let back_points = new Phaser.Geom.Polygon([15, -15,  -15, 0,  15, 15]);
        let back_button = this.add.polygon(60, 60, back_points.points, 0x000000);
        this.input.on('pointerdown', (pos) => {
            if(back_points.contains(pos.x - 45, pos.y - 45)){
                this.scene.start("main");
            }
        });
    };
    update(a, b){
        this.tick++;

        let timeFull = 37 * (this.n + 2*this.m - 2)
        this.timeRect.destroy();
        this.timeRect = this.add.rectangle(400, (timeFull - this.tick2) * 800/timeFull - 400, 800, 800, 0x856565);
        this.timeRect.setDepth(-1);

        if(this.tick2 > 0 && this.tick > 30 && !this.clear) this.tick2--;
        if(this.tick === 30){
            this.rectList.map((rect) => {
                rect.obj.setFillStyle(0xd7d7d7);
                if(rect.state === "show") rect.state = "hide";
                rect.obj.setInteractive();
            });
            this.notice.setText("Find green");
            this.notice.setPosition(400 - this.notice.width/2, 80 - this.notice.height/2);
        }

        this.showRectList.map((rect) => {
            rect.destroy();
            rect = makeRect(this, rect.x, rect.y, 600 / this.n, rect.state);
        })

        this.rectList.map((rect) =>{
            rect.obj.on("pointerdown", () => {
                if(rect.state === "hide"){
                    rect.state = "show";
                    rect.obj.fillColor = 0x528c37;
                    rect.obj.disableInteractive();
                    this.get++;
                    if(this.get === this.n + 2*this.m - 2){
                        this.notice.setText("Good!");
                        this.notice.setPosition(400 - this.notice.width/2, 80 - this.notice.height/2);
                        this.rectList.map((rect2) => {rect2.obj.disableInteractive()});
                        this.clear = true;
                        if(this.tick2 === 0) this.tick2 = 1;
                        setTimeout(this.environ, 750, this);
                    }
                }
                if(rect.state === "none"){
                    rect.state = "wrong";
                    this.rectList.map((rect2) => {
                        rect2.obj.destroy();
                    });
                    this.scene.start("hardSquare_waitScene", {
                        state: "over",
                        n: this.n,
                        m: this.m,
                        rectList: this.rectList
                    });
                }
            });
        });

        if(this.tick2 === 0){
            this.rectList.map((rect2) => {
                rect2.obj.destroy();
            });
            this.scene.start("hardSquare_waitScene", {
                state: "timeOver",
                n: this.n,
                m: this.m,
                rectList: this.rectList
            });
        }

        let prograssBar1 = this.add.rectangle(400, 160, 600, 4, 0xd7d7d7);
        let prograssBar2 = this.add.rectangle(0, 0, 600 * (this.m - 1)/(this.n - 1), 4, 0xd6615d);
        prograssBar2.setOrigin(0, 0);
        prograssBar2.setPosition(100, 158);
    }
}

const hardSquare = {
    waitScene: waitScene,
    playScene: playScene,
}

export default hardSquare;