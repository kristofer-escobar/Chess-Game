var loader = new THREE.OBJMTLLoader();

const BOARD_SCALE = 5.15;
const BOARD_X_POSITION = -2.8;
const BOARD_Y_POSITION = 0;
const BOARD_Z_POSITION = 3;
const MOVE_DISTANCE = 2.15;

var models = {};
var modelsLoaded = 31;

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
    this.pieces = ['WhiteRook1',
        'WhiteKnight1',
        'WhiteBishop1',
        'WhiteQueen1',
        'WhiteKing1',
        'WhiteBishop2',
        'WhiteKnight2',
        'WhiteRook2',
        'WhitePawn1',
        'WhitePawn2',
        'WhitePawn3',
        'WhitePawn4',
        'WhitePawn5',
        'WhitePawn6',
        'WhitePawn7',
        'WhitePawn8',
        'BlackPawn1',
        'BlackPawn2',
        'BlackPawn3',
        'BlackPawn4',
        'BlackPawn5',
        'BlackPawn6',
        'BlackPawn7',
        'BlackPawn8',
        'BlackRook1',
        'BlackKnight1',
        'BlackBishop1',
        'BlackQueen1',
        'BlackKing1',
        'BlackBishop2',
        'BlackKnight2',
        'BlackRook2'
    ]


    // Load chess board model.
    loader.load('models/chessboard.obj', 'materials/chessboard.mtl', function(board) {
        board.position.set(-0.3625, 0, 0.5);
        board.scale.set(1.025, 1.025, 1.025);
        self.add(board);
        self.buildGUI();
    });

}

ChessBoard.prototype = new THREE.Object3D();

ChessBoard.prototype.animate = function() {

}

ChessBoard.prototype.init = function(scene) {

    // Initialize the chess board.
    this.initBoard();

    // Load models.
    this.loadPieces(this.initPieces);
}

ChessBoard.prototype.buildGUI = function() {
    var gui = new dat.GUI();
    var chessGameFolder = gui.addFolder('ChessGame');
    //    chessGameFolder.add(this.rearWheel, 'incr', MINTURN / 4, MAXTURN / 4).listen();
    //    chessGameFolder.add(this.handlebar.rotation, 'y', MINTURN, MAXTURN).listen();
    chessGameFolder.open();
}


ChessBoard.prototype.initBoard = function() {

    var xPos, zPos;

    zPos = 0;

    for (var i = 1; i <= 8; i++) {

        xPos = 0;

        for (var j = 65; j <= 72; j++) {

            // Initialize empty chess board positions.
            this.boardPosition[String.fromCharCode(j) + i] = "empty";

            // Map board position to coordinates.
            this.PositionMap[String.fromCharCode(j) + i] = {
                'x': xPos,
                'z': zPos
            };

            xPos -= MOVE_DISTANCE;
        }

        zPos += MOVE_DISTANCE;
    }

}

ChessBoard.prototype.initPieces = function(scene) {

    // Dictionary to hold initial state of board.
    var initialState = {
        'A1': 'WhiteRook1',
        'B1': 'WhiteKnight1',
        'C1': 'WhiteBishop1',
        'D1': 'WhiteQueen1',
        'E1': 'WhiteKing1',
        'F1': 'WhiteBishop2',
        'G1': 'WhiteKnight2',
        'H1': 'WhiteRook2',
        'A2': 'WhitePawn1',
        'B2': 'WhitePawn2',
        'C2': 'WhitePawn3',
        'D2': 'WhitePawn4',
        'E2': 'WhitePawn5',
        'F2': 'WhitePawn6',
        'G2': 'WhitePawn7',
        'H2': 'WhitePawn8',
        'A7': 'BlackPawn1',
        'B7': 'BlackPawn2',
        'C7': 'BlackPawn3',
        'D7': 'BlackPawn4',
        'E7': 'BlackPawn5',
        'F7': 'BlackPawn6',
        'G7': 'BlackPawn7',
        'H7': 'BlackPawn8',
        'A8': 'BlackRook1',
        'B8': 'BlackKnight1',
        'C8': 'BlackBishop1',
        'D8': 'BlackQueen1',
        'E8': 'BlackKing1',
        'F8': 'BlackBishop2',
        'G8': 'BlackKnight2',
        'H8': 'BlackRook2'
    }

    // Create pieces and place into initial state.
    for (position in initialState) {

        // Get color.
        var color = initialState[position].substring(0, 5).toLowerCase();

        // Get Piece name.
        var pieceName = initialState[position];

        // Get Reference to piece.
        var pieceModel = models[pieceName];

        // Scale & Position model on board.
        var pos = board.PositionMap[position];

        if (pieceModel != undefined) {
            pieceModel.position.x = pos.x;
            pieceModel.position.z = pos.z;
        }

        // Place piece on board.
        board.add(pieceModel);

        // Update pieces on board.
        board.boardPosition[position] = pieceModel;

    }
}

// Helper function to create chess pieces. 
function getPiece(name) {
    return models[name];
}

ChessBoard.prototype.loadPieces = function(callback) {

    for (var piece in this.pieces) {
        (function(model) {

            // Piece Material.
            var modelMaterial = model.substring(0, model.length - 1);
            //debugger;
            loader.load('models/' + model + '.obj', 'materials/' + modelMaterial + '.mtl', function(object) {
                models[model] = object;
            });
        })(this.pieces[piece]);

        //debugger;
        var checkInterval = setInterval(function() {
            if (piece == modelsLoaded) {
                //alert("hello");
                clearInterval(checkInterval);
                callback();
            }
        }, 100);

    }

}