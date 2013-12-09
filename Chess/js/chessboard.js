var loader = new THREE.OBJMTLLoader();

const BOARD_SCALE = 5.15;
const BOARD_X_POSITION = -2.8;
const BOARD_Y_POSITION = 0;
const BOARD_Z_POSITION = 3;
const MOVE_DISTANCE = 2.15;

var ChessBoard = function() {

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
    this.PositionMap = {};

    // Load chess board model.
    loader.load( 'models/chessboard.obj', 'materials/chessboard.mtl', function ( board ) {        
        self.add( board );
        self.buildGUI();
    } );

}

ChessBoard.prototype = new THREE.Object3D();

ChessBoard.prototype.animate = function(){

}

ChessBoard.prototype.init = function( scene ){

// Initialize the chess board.
this.initBoard();

// Initialize chess pieces.
this.initPieces(scene);

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
            this.PositionMap[String.fromCharCode(i) + j] = {'x': xPos, 'z': zPos};

            xPos -= MOVE_DISTANCE;
        }

        zPos += MOVE_DISTANCE;
    }

}

ChessBoard.prototype.initPieces = function( scene ){
    
    // Dictionary to hold initial state of board.
    var initialState = {'A1': 'WhiteRook', 
                        'A2': 'WhiteKnight', 
                        'A3': 'WhiteBishop', 
                        'A4': 'WhiteQueen', 
                        'A5': 'WhiteKing', 
                        'A6': 'WhiteBishop', 
                        'A7': 'WhiteKnight', 
                        'A8': 'WhiteRook', 
                        'B1': 'WhitePawn', 
                        'B2': 'WhitePawn', 
                        'B3': 'WhitePawn', 
                        'B4': 'WhitePawn', 
                        'B5': 'WhitePawn', 
                        'B6': 'WhitePawn', 
                        'B7': 'WhitePawn', 
                        'B8': 'WhitePawn', 
                        'G1': 'BlackPawn', 
                        'G2': 'BlackPawn', 
                        'G3': 'BlackPawn', 
                        'G4': 'BlackPawn', 
                        'G5': 'BlackPawn', 
                        'G6': 'BlackPawn', 
                        'G7': 'BlackPawn', 
                        'G8': 'BlackPawn', 
                        'H1': 'BlackRook', 
                        'H2': 'BlackKnight', 
                        'H3': 'BlackBishop', 
                        'H4': 'BlackQueen', 
                        'H5': 'BlackKing', 
                        'H6': 'BlackBishop', 
                        'H7': 'BlackKnight', 
                        'H8': 'BlackRook'
}

    // Create pieces and place into initial state.
    for(position in initialState){

        // Get color.
        var color = initialState[position].substring(0,5).toLowerCase();
        
        // Get Piece name.
        var pieceName = initialState[position].substring(5);

        // Get Reference to piece.
        var pieceObject = getPiece( pieceName, color, this.PositionMap[position] );

        // Place piece on board.
        scene.add( pieceObject );

        // Update pieces on board.
        this.boardPosition[position] = pieceObject;

    }
}

// Helper function to create chess pieces. 
function getPiece(name, color, position){
  return ( typeof window[name] === 'function' ) ? new window[name](color, position) : {};
}
