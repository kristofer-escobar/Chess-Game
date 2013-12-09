var loader = new THREE.OBJMTLLoader();

const BOARD_SCALE = 5.15;
const BOARD_X_POSITION = -2.8;
const BOARD_Y_POSITION = 0;
const BOARD_Z_POSITION = 3;
const MOVE_DISTANCE = 2.15;



var ChessBoard = function( loader ) {

    // Store reference to this chess board.
    var self = this;

    // Scale.
    this.scale.x = this.scale.y = this.scale.z = BOARD_SCALE;
    
    // Position.
    this.position.x = BOARD_X_POSITION;
    this.position.y = BOARD_Y_POSITION;
    this.position.z = BOARD_Z_POSITION;

    // Board Positions.
    this.boardPosition = {};
    this.boardPositionMap = {};

    // Load chess board model.
    loader.load( 'models/chessboard.obj', 'materials/chessboard.mtl', function ( board ) {        
        self.add( board );
        self.buildGUI();
    } );

}

ChessBoard.prototype = new THREE.Object3D();

ChessBoard.prototype.animate = function(){

}

ChessBoard.prototype.init = function(){

// Initialize the chess board.
this.initBoard();

}

ChessBoard.prototype.buildGUI = function(){
    var gui = new dat.GUI();
    var chessGameFolder = gui.addFolder('ChessGame');
//    chessGameFolder.add(this.rearWheel, 'incr', MINTURN / 4, MAXTURN / 4).listen();
//    chessGameFolder.add(this.handlebar.rotation, 'y', MINTURN, MAXTURN).listen();
    chessGameFolder.open();
}


ChessBoard.prototype.initBoard = function(){
    
    var xPos, zPos;
    
    zPos = 0;

    for(var i = 65; i <= 72; i++){

        xPos = 0;

        for(var j = 1; j <= 8; j++){

            // Initialize empty chess board positions.
            this.boardPosition[String.fromCharCode(i) + j] = "empty";

            // Map board position to coordinates.
            this.boardPositionMap[String.fromCharCode(i) + j] = {'x': xPos, 'z': zPos};

            xPos -= MOVE_DISTANCE;
        }

        zPos += MOVE_DISTANCE;
    }

}
