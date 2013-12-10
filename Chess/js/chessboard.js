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

    for(var i = 1; i <= 8; i++){

        xPos = 0;

        for(var j = 65; j <= 72; j++){

            // Initialize empty chess board positions.
            this.boardPosition[String.fromCharCode(j) + i] = "empty";

            // Map board position to coordinates.
            this.PositionMap[String.fromCharCode(j) + i] = {'x': xPos, 'z': zPos};

            xPos -= MOVE_DISTANCE;
        }

        zPos += MOVE_DISTANCE;
    }

}

ChessBoard.prototype.initPieces = function( scene ){
    
    // Dictionary to hold initial state of board.
    var initialState = {'A1': 'WhiteRook', 
                        'B1': 'WhiteKnight', 
                        'C1': 'WhiteBishop', 
                        'D1': 'WhiteQueen', 
                        'E1': 'WhiteKing', 
                        'F1': 'WhiteBishop', 
                        'G1': 'WhiteKnight', 
                        'H1': 'WhiteRook', 
                        'A2': 'WhitePawn', 
                        'B2': 'WhitePawn', 
                        'C2': 'WhitePawn', 
                        'D2': 'WhitePawn', 
                        'E2': 'WhitePawn', 
                        'F2': 'WhitePawn', 
                        'G2': 'WhitePawn', 
                        'H2': 'WhitePawn', 
                        'A7': 'BlackPawn', 
                        'B7': 'BlackPawn', 
                        'C7': 'BlackPawn', 
                        'D7': 'BlackPawn', 
                        'E7': 'BlackPawn', 
                        'F7': 'BlackPawn', 
                        'G7': 'BlackPawn', 
                        'H7': 'BlackPawn', 
                        'A8': 'BlackRook', 
                        'A8': 'BlackKnight', 
                        'B8': 'BlackBishop', 
                        'C8': 'BlackQueen', 
                        'D8': 'BlackKing', 
                        'F8': 'BlackBishop', 
                        'G8': 'BlackKnight', 
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
