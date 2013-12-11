// Globals
var URL = 'http://www.bencarle.com/chess/cg/';
var GAME_URL = 'https://10.11.18.65/cg/chess/';
var gameStarted = null;
var seconds = 2;
var moveList = [];
var gameover = false;
var captured = [];

var ChessMoves = function() {

    // Id used to begin game.
    this.gameId = "340";

    // Start polling the server for chess moves.
    this.startGame = function() {
        gameStarted = setTimeout(start, seconds * 1000);
    }

    // Replay game from start.
    this.replay = function() {
        // Replay the entire game.
        if (moveList.length > 0) {

            clearBoard();

            // Initialize the chess board.
            board.initBoard();

            // Load models.
            board.loadPieces(board.initPieces);

            setTimeout(function() {
                loadState(moveList, true);
            }, 5000);

            //loadState(moveList, true);
        } else {
            alert('Please start a game first.');
        }
    }

    this.reset = function() {
        // Refresh the page.
        location.reload();
    }

}

    function start() {
        $.ajax({
            method: 'GET',
            url: URL + gameID,
            crossDomain: true,
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: move,
            error: function() {
                alert("An error occured while starting the game.");
                gameStarted = null;
            }
        });
    }

var move = function(response) {

    gameover = response.gameover;

    moveList = response.moves;


    if (!gameover) { // using false for testing.
        // The game is over, show the final state of the board.
        loadState(moveList, false);

    } else {
        // Game is still going, get the first move and animate.

    }

    console.log(response);
}

// Function to replay an animated game.
    function replay(moves) {
        for (var i = 0; i < moves.length; i++) {

        }

    }

    function loadState(list, animate) {

        var startPosition;
        var targetPosition;
        var pieceName;
        var currentPiece;
        var promotion = false;
        var promotePiece = null;
        var animateQueue = [];

        // Loop through each move.
        for (var i = 0; i < list.length; i++) {

            pieceName = list[i].substring(0, 1).toUpperCase();

            startPosition = list[i].substring(1, 3).toUpperCase();

            targetPosition = list[i].substring(3).toUpperCase();

            // If there is an extra charcter, then its a promotion.
            if (targetPosition.length > 2) {

                // Set promotion flag.
                promotion = true;
                promotePiece = targetPosition.substring(targetPosition.length - 1);

                // Get target position without promotion character.
                targetPosition = targetPosition.substring(3, 5);
            }

            // Checking for white castling.
            if (pieceName == 'K' && startPosition == 'E1' && (targetPosition == 'C1' || targetPosition == 'G1')) {

                // Move right rook.
                if (targetPosition == 'C1') {
                    var rook = board.boardPosition['A1'];

                    // Update the piece's position on the board.
                    board.boardPosition['D1'] = rook;

                    if (animate) {
                        movePiece(startPosition, targetPosition);
                    } else {
                        // Move the model.
                        rook.position.set(board.PositionMap['D1'].x, 0, board.PositionMap['D1'].z);
                    }

                    // Clear out previous position.
                    board.boardPosition['A1'] = "empty";
                }

                // Move left rook.
                if (targetPosition == 'G1') {
                    var rook = board.boardPosition['H1'];

                    // Update the piece's position on the board.
                    board.boardPosition['F1'] = rook;

                    if (animate) {
                        movePiece(startPosition, targetPosition);
                    } else {
                        // Move the model.
                        rook.position.set(board.PositionMap['F1'].x, 0, board.PositionMap['F1'].z);
                    }

                    // Clear out previous position.
                    board.boardPosition['H1'] = "empty";
                }
            }

            // Checking for black castling.
            if (pieceName == 'K' && startPosition == 'E8' && (targetPosition == 'C8' || targetPosition == 'G8')) {

                // Move right rook.
                if (targetPosition == 'C8') {
                    var rook = board.boardPosition['A8'];

                    // Update the piece's position on the board.
                    board.boardPosition['D8'] = rook;

                    if (animate) {
                        movePiece(startPosition, targetPosition);
                    } else {
                        // Move the model.
                        rook.position.set(board.PositionMap['D8'].x, 0, board.PositionMap['D8'].z);
                    }

                    // Clear out previous position.
                    board.boardPosition['A8'] = "empty";
                }

                // Move left rook.
                if (targetPosition == 'G8') {
                    var rook = board.boardPosition['H8'];

                    // Update the piece's position on the board.
                    board.boardPosition['F8'] = rook;

                    if (animate) {
                        movePiece(startPosition, targetPosition);
                    } else {
                        // Move the model.
                        rook.position.set(board.PositionMap['F8'].x, 0, board.PositionMap['F8'].z);
                    }

                    // Clear out previous position.
                    board.boardPosition['H8'] = "empty";
                }
            }

            // Get the current piece being moved.
            currentPiece = board.boardPosition[startPosition];

            if (board.boardPosition[targetPosition] != 'empty') {
                // Stored captured pieces to animate capture.
                captured.push(board.boardPosition[targetPosition]);

                // Shrink captured pieces.
                board.boardPosition[targetPosition].scale.set(0.01, 0.01, 0.01);
            }

            // Update the piece's position on the board.
            board.boardPosition[targetPosition] = currentPiece;

            if (animate) {
                movePiece(startPosition, targetPosition);
            } else {
                // Move the model.
                currentPiece.position.set(board.PositionMap[targetPosition].x, 0, board.PositionMap[targetPosition].z);
            }

            // Clear out previous position.
            board.boardPosition[startPosition] = "empty";
        }
    }

    function clearBoard() {
        for (var position in board.boardPosition) {
            if(board.boardPosition[position] != 'empty'){
                board.boardPosition[position].scale.set(0.01, 0.01, 0.01);
            }
            
        }
    }