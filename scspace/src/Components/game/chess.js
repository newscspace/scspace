import Phaser from 'phaser';

const addPiece = (game, rank, pile, name) => {
    if(name === 'circle'){
        let color = "0x333333";
        if(rank === 7) color = "0xbb3333" //queen
        return {
            'showbody': game.add.circle(62.5 + pile*75, 657.5 - rank*75, 12, color, 0.3),
            'body': game.add.circle(62.5 + pile*75, 657.5 - rank*75, 30, "0x000000", 0),
            'rank': rank,
            'pile': pile,
            'name': name,
        };
    }
    return {
        'body': game.add.sprite(62.5 + pile*75, 657.5 - rank*75, name),
        'rank': rank,
        'pile': pile,
        'name': name,
    };
}

const setActive = (game, piece) => {
    if(piece.name[0] === 'b') return;
    if(game.activePiece){
        for (let i = 0; i < game.activeTile.length; i++) {
            game.activeTile[i].body.destroy();
            game.activeTile[i].showbody.destroy();
        }
        game.activeTile = [];
    }
    game.activePiece = piece;
    if(piece.name === 'wp'){
        game.activeTile.push(addPiece(game, 3, piece.pile, 'circle'));
        if(piece.pile !== 4) game.activeTile.push(addPiece(game, 4, piece.pile, 'circle'));
    }
    else if(piece.name === 'wn'){
        game.activeTile.push(addPiece(game, 3, piece.pile - 1, 'circle'));
        game.activeTile.push(addPiece(game, 3, piece.pile + 1, 'circle'));
    }
    else if(piece.name === 'wq'){
        game.activeTile.push(addPiece(game, 7, 5, 'circle'));

        piece.body.destroy();
        piece.body = game.add.sprite(62.5 + piece.pile*75, 657.5 - piece.rank*75, piece.name);
        piece.body.setScale(0.5);
        piece.body.setInteractive();
        piece.body.on('pointerdown', () => {setActive(game, game.pieces['wq'])})
    }
    for(let i = 0; i < game.activeTile.length; i++){
        let tile = game.activeTile[i].body;
        tile.setInteractive();
        tile.on('pointerdown', () => {
            Object.keys(game.pieces).forEach((key) => {
                game.pieces[key].body.disableInteractive();
            });
            game.tick = 0;
            game.moveToRank = game.activeTile[i].rank;
            game.moveToPile = game.activeTile[i].pile;
            for (let j = 0; j < game.activeTile.length; j++) {
                game.activeTile[j].body.destroy();
                game.activeTile[j].showbody.destroy();
            }
            game.activeTile = [];
        });
    }
    
}

const easeInOut = (t) => {
    if(t <= 0.5) return 2*t*t;
    else return 1 - easeInOut(1 - t);
}

const movingPos = (game, piece, moveToRank, moveToPile, queen = null) => {
    if(queen){
        let k = easeInOut(game.tick / 80);
        let prank = piece.rank * (1-k) + moveToRank * k;
        let ppile = piece.pile * (1-k) + moveToPile * k;
        let x = 62.5 + ppile*75;
        let y = 657.5 - prank*75;
        piece.body.x = x;
        piece.body.y = y;
        if(game.tick <= 40) piece.body.setScale(0.5 + 5.5 * easeInOut(game.tick/40));
        else piece.body.setScale(6 - 5.5 * easeInOut(game.tick/40 - 1));
    }
    else{
        let k = easeInOut(game.tick / 30);
        let prank = piece.rank * (1-k) + moveToRank * k;
        let ppile = piece.pile * (1-k) + moveToPile * k;
        let x = 62.5 + ppile*75;
        let y = 657.5 - prank*75;
        piece.body.x = x;
        piece.body.y = y;
    }
}

class whiteScene extends Phaser.Scene{
    constructor(){
        super({key: "chess_whiteScene"});
    }
    preload(){
        const pieces_name = ['wp', 'wn', 'wb', 'wr', 'wq', 'wk', 'bp', 'bn', 'bb', 'br', 'bq', 'bk'];
        pieces_name.forEach((piece) => {
            this.load.image(piece, 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chess_' + piece + '.png');
        });
        this.load.image('board', 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chess_board.png');
    }
    init(){
        this.activePiece = null;
        this.activeTile = [];
        this.tick = -1;
        this.moveToRank = 0;
        this.moveToPile = 0;
    }
    create(){
        let board = this.add.sprite(400, 320, 'board');
        this.pieces = {
            'wpa': addPiece(this, 2, 1, 'wp'),
            'wpb': addPiece(this, 2, 2, 'wp'),
            'wpc': addPiece(this, 2, 3, 'wp'),
            'wpd': addPiece(this, 2, 4, 'wp'),
            'wpe': addPiece(this, 2, 5, 'wp'),
            'wpf': addPiece(this, 2, 6, 'wp'),
            'wpg': addPiece(this, 2, 7, 'wp'),
            'wph': addPiece(this, 2, 8, 'wp'),
            'wra': addPiece(this, 1, 1, 'wr'),
            'wnb': addPiece(this, 1, 2, 'wn'),
            'wbc': addPiece(this, 1, 3, 'wb'),
            'wq': addPiece(this, 1, 4, 'wq'),
            'wk': addPiece(this, 1, 5, 'wk'),
            'wbf': addPiece(this, 1, 6, 'wb'),
            'wng': addPiece(this, 1, 7, 'wn'),
            'wrh': addPiece(this, 1, 8, 'wr'),
            'bpa': addPiece(this, 7, 1, 'bp'),
            'bpb': addPiece(this, 7, 2, 'bp'),
            'bpc': addPiece(this, 7, 3, 'bp'),
            'bpd': addPiece(this, 7, 4, 'bp'),
            'bpe': addPiece(this, 7, 5, 'bp'),
            'bpf': addPiece(this, 7, 6, 'bp'),
            'bpg': addPiece(this, 7, 7, 'bp'),
            'bph': addPiece(this, 7, 8, 'bp'),
            'bra': addPiece(this, 8, 1, 'br'),
            'bnb': addPiece(this, 8, 2, 'bn'),
            'bbc': addPiece(this, 8, 3, 'bb'),
            'bq': addPiece(this, 8, 4, 'bq'),
            'bk': addPiece(this, 8, 5, 'bk'),
            'bbf': addPiece(this, 8, 6, 'bb'),
            'bng': addPiece(this, 8, 7, 'bn'),
            'brh': addPiece(this, 8, 8, 'br'),
        }
        board.setScale(600 / board.width);
        for(let name in this.pieces){
            this.pieces[name].body.setScale(0.5);
            this.pieces[name].body.setInteractive();
            this.pieces[name].body.on('pointerdown', () => {setActive(this, this.pieces[name])})
        }

        let back_points = new Phaser.Geom.Polygon([15, -15,  -15, 0,  15, 15]);
        let back_button = this.add.polygon(60, 60, back_points.points, 0x000000);
        this.input.on('pointerdown', (pos) => {
            if(back_points.contains(pos.x - 45, pos.y - 45)){
                this.scene.start("main");
            }
        });

    }
    update(){
        if(this.tick === -1) return;
        if(this.activePiece.name === 'wq'){
            if(this.tick <= 80) movingPos(this, this.pieces['wq'], 7, 5, true);
            this.tick++;
            if(this.tick === 80 && this.pieces['wpe'].rank === 2){
                this.pieces['bpe'].body.destroy()
                delete this.pieces['bpe'];
            }
            if(this.tick === 100){
                this.pieces['wq'].rank = 7;
                this.pieces['wq'].pile = 5;
                this.scene.start('chess_gameoverScene', {
                    'pieces': this.pieces,
                    'color': 'white',
                });
            }
        }
        else{
            if(this.tick <= 30) movingPos(this, this.activePiece, this.moveToRank, this.moveToPile);
            this.tick++;
            if(this.tick === 50){
                this.activePiece.rank = this.moveToRank;
                this.activePiece.pile = this.moveToPile;
                this.scene.start('chess_blackScene', this.pieces);
            }
        }
    }
}

class blackScene extends Phaser.Scene{
    constructor(){
        super({key: "chess_blackScene"});
    }
    preload(){
        const pieces = ['wp', 'wn', 'wb', 'wr', 'wq', 'wk', 'bp', 'bn', 'bb', 'br', 'bq', 'bk'];
        pieces.forEach((piece) => {
            this.load.image(piece, 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chess_' + piece + '.png');
        });
        this.load.image('board', 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chess_board.png');
    }
    init(data){
        this.pieces = data;
        this.tick = 0;
    }
    create(){
        let board = this.add.sprite(400, 320, 'board');
        board.setScale(600 / board.width);
        for(let name in this.pieces){
            let piece = this.pieces[name];
            piece.body = this.add.sprite(62.5 + piece.pile*75, 657.5 - piece.rank*75, piece.name);
            piece.body.setScale(0.5);
        }

        let back_points = new Phaser.Geom.Polygon([15, -15,  -15, 0,  15, 15]);
        let back_button = this.add.polygon(60, 60, back_points.points, 0x000000);
        this.input.on('pointerdown', (pos) => {
            if(back_points.contains(pos.x - 45, pos.y - 45)){
                this.scene.start("main");
            }
        });
    }
    update(){
        if(this.tick <= 80) movingPos(this, this.pieces['bq'], 2, 5, true);
        this.tick++;
        if(this.tick === 80 && this.pieces['wpe'].rank === 2){
            this.pieces['wpe'].body.destroy()
            delete this.pieces['wpe'];
        }
        if(this.tick === 100){
            this.pieces['bq'].rank = 2;
            this.pieces['bq'].pile = 5;
            this.scene.start('chess_gameoverScene', {
                'pieces': this.pieces,
                'color': 'black',
            });
        }
    }
}

class gameoverScene extends Phaser.Scene{
    constructor(){
        super({key: "chess_gameoverScene"});
    }
    preload(){
        const pieces = ['wp', 'wn', 'wb', 'wr', 'wq', 'wk', 'bp', 'bn', 'bb', 'br', 'bq', 'bk'];
        pieces.forEach((piece) => {
            this.load.image(piece, 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chess_' + piece + '.png');
        });
        this.load.image('board', 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chess_board.png');
        this.load.image('black_mate', 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chess_black_win.png');
        this.load.image('white_mate', 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/assets/chess_white_win.png');
    }
    init(data){
        this.pieces = data.pieces;
        this.color = data.color;
        this.tick = 0;
    }
    create(){
        let board = this.add.sprite(400, 320, 'board');
        board.setScale(600 / board.width);
        for(let name in this.pieces){
            let piece = this.pieces[name];
            piece.body = this.add.sprite(62.5 + piece.pile*75, 657.5 - piece.rank*75, piece.name);
            piece.body.setScale(0.5);
        }
        if(this.color === 'black') this.image = this.add.sprite(400, 360, 'black_mate');
        else this.image = this.add.sprite(400, 360, 'white_mate');
        this.image.setAlpha(0);
        this.image.setScale(0.7);

        let back_points = new Phaser.Geom.Polygon([15, -15,  -15, 0,  15, 15]);
        let back_button = this.add.polygon(60, 60, back_points.points, 0x000000);
        this.input.on('pointerdown', (pos) => {
            if(back_points.contains(pos.x - 45, pos.y - 45)){
                this.scene.start("main");
            }
        });
    }
    update(){
        this.image.y = 360 - 2 * this.tick;
        this.image.setAlpha(this.tick / 20);
        if(this.tick < 20) this.tick++;
    }
}

const chess = {
    whiteScene: whiteScene,
    blackScene: blackScene,
    gameoverScene: gameoverScene
}

export default chess;