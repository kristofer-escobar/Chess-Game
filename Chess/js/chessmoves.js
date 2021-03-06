// Globals
var URL = 'http://www.bencarle.com/chess/cg/';
var GAME_URL = 'https://10.11.18.65/cg/chess/';
var TEST_URL = document.URL.substring(0,document.URL.indexOf('index.html')) + 'test.txt';
var TEST  = false;
var gameStarted = null;
var seconds = 2;
var moveList = [];
var gameover = false;
var captured = [];
var animateQueue = [];
var timeoutId;
var whiteTurn;
var firstEntered = true;

var ChessMoves = function() {

    // Id used to begin game.
    this.gameId = "340";

    // Start polling the server for chess moves.
    this.startGame = function() {
        TEST = false;
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
            board.loadPieces(board.initPieces, true);

            // setTimeout(function() {
            //     loadState(moveList, true);
            // }, 5000);

            //loadState(moveList, true);
        } else {
            alert('Please start a game first, or load test game.');
        }
    }

    this.reset = function() {
        // Refresh the page.
        location.reload();
    }

    this.loadTest = function(){
        TEST = true;
        gameStarted = setTimeout(start, seconds * 1000);
    }

    this.replayTest = function(){
        TEST = true;
        gameStarted = setTimeout(start, seconds * 1000);
    }

}

    function start() {
        $.ajax({
            method: 'GET',
            url: TEST ? TEST_URL : GAME_URL + gameID,
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

    console.log(response);

    gameover = response.gameover;

    whiteTurn = response.whitesturn;

    if(firstEntered && !gameover){

        moveList = response.moves;

        // If the game has already started then load its current state.
        if(moveList.length > 0){
            loadState(moveList,false);
        }

        firstEntered = false;
    }

    if ((!gameover) && (moveList)) {

        // Game is still going, get the following move and animate.
        for (var i = moveList.length; i < response.moves.length; i++) {
            // Get difference in moves.
            var difference = [];

            for (var i = moveList.length; i < response.moves.length; i++) {
                difference.push(response.moves[i]);
            }

            loadState(difference, true);
        }

        // Update list of moves.
        moveList = response.moves;

        // Poll
        timeoutId = setTimeout(start, seconds * 1000);
    } else if (gameover && !timeoutId) {
        loadState(moveList, false);
    }else{
        console.log("Error occurred. Move array may be missing.");
    }

    if (gameover) {
        moveList = response.moves;
        loadState(moveList, false);
        alert("Game over. Press replay to view game.");
    }

}

    function loadState(list, animate) {

        var startPosition;
        var targetPosition;
        var pieceName;
        var currentPiece;
        var promotion = false;
        var promotePiece = null;

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

            // Get the current piece being moved.
            currentPiece = board.boardPosition[startPosition];

            // Check for promotions.
            if (pieceName == 'P' && promotion) {
                console.log('Promoted to' + promotePiece);
            }

            // Checking for white castling.
            if (pieceName == 'K' && startPosition == 'E1' && (targetPosition == 'C1' || targetPosition == 'G1')) {

                // Move right rook.
                if (targetPosition == 'C1') {

                    if (animate) {
                        animateQueue.push({
                            func: movePiece,
                            param1: 'A1',
                            param2: 'D1'
                        });
                    } else {

                        var rook = board.boardPosition['A1'];

                        // Update the piece's position on the board.
                        board.boardPosition['D1'] = rook;

                        // Move the model.
                        rook.position.set(board.PositionMap['D1'].x, 0, board.PositionMap['D1'].z);

                        // Clear out previous position.
                        board.boardPosition['A1'] = "empty";
                    }

                }
                // Move left rook.
                if (targetPosition == 'G1') {

                    if (animate) {
                        animateQueue.push({
                            func: movePiece,
                            param1: 'H1',
                            param2: 'F1'
                        });
                    } else {
                        var rook = board.boardPosition['H1'];

                        // Update the piece's position on the board.
                        board.boardPosition['F1'] = rook;

                        // Move the model.
                        rook.position.set(board.PositionMap['F1'].x, 0, board.PositionMap['F1'].z);

                        // Clear out previous position.
                        board.boardPosition['H1'] = "empty";
                    }

                }
            }

            // Checking for black castling.
            if (pieceName == 'K' && startPosition == 'E8' && (targetPosition == 'C8' || targetPosition == 'G8')) {

                // Move right rook.
                if (targetPosition == 'C8') {

                    if (animate) {
                        animateQueue.push({
                            func: movePiece,
                            param1: 'A8',
                            param2: 'D8'
                        });
                    } else {
                        var rook = board.boardPosition['A8'];

                        // Update the piece's position on the board.
                        board.boardPosition['D8'] = rook;

                        // Move the model.
                        rook.position.set(board.PositionMap['D8'].x, 0, board.PositionMap['D8'].z);

                        // Clear out previous position.
                        board.boardPosition['A8'] = "empty";
                    }

                }

                // Move left rook.
                if (targetPosition == 'G8') {

                    if (animate) {
                        animateQueue.push({
                            func: movePiece,
                            param1: 'H8',
                            param2: 'F8'
                        });
                    } else {
                        var rook = board.boardPosition['H8'];

                        // Update the piece's position on the board.
                        board.boardPosition['F8'] = rook;

                        // Move the model.
                        rook.position.set(board.PositionMap['F8'].x, 0, board.PositionMap['F8'].z);

                        // Clear out previous position.
                        board.boardPosition['H8'] = "empty";
                    }

                }
            }

            // Check for captures.
            if (board.boardPosition[targetPosition] != 'empty') {
                // Stored captured pieces to animate capture.
                captured.push(board.boardPosition[targetPosition]);

                if (animate) {
                    // animateQueue.push({
                    //     func: capture,
                    //     param1: targetPosition,
                    //     param2: 0.01
                    // });
                } else {
                    // Shrink captured pieces.
                    board.boardPosition[targetPosition].scale.set(0.001, 0.001, 0.001);
                }

            }

            if (animate) {
                animateQueue.push({
                    func: movePiece,
                    param1: startPosition,
                    param2: targetPosition
                });
            } else {

                // Update the piece's position on the board.
                board.boardPosition[targetPosition] = currentPiece;

                // Move the model.
                currentPiece.position.set(board.PositionMap[targetPosition].x, 0, board.PositionMap[targetPosition].z);

                // Clear out previous position.
                board.boardPosition[startPosition] = "empty";
            }

            promotion = false;
        }

        // Check for animations.
        if (animateQueue.length > 0) {
            // There are animations to handle.
            handleAnimations(animateQueue);
        }
    }

    // Helper function to "clear" out chess board.
    function clearBoard() {
        for (var position in board.boardPosition) {
            if (board.boardPosition[position] != 'empty') {
                board.boardPosition[position].scale.set(0.001, 0.001, 0.001);
            }

        }
    }

    // Animate capturing of pieces.
    function capture(animation) {
        //debugger;
        var currentPiece = board.boardPosition[animation.param2];

        var scale = {
            x: currentPiece.scale.x,
            y: currentPiece.scale.y,
            z: currentPiece.scale.z
        };
        var target = {
            x: 1,
            y: 0.001,
            z: 1
        };

        //currentPiece.scale.set(target);

        var tweenCapture = new TWEEN.Tween(scale).to(target, 500);

        tweenCapture.onUpdate(function() {
            //console.log('In tween, scale is:' + scale.x + ' ' + scale.y + ' ' + scale.z);
            //  Shrink capture piece. 
            currentPiece.scale.set(scale.x, scale.y, scale.z);
        });

        tweenCapture.onComplete(function() {
            currentPiece.scale.x = 0.001;
            currentPiece.scale.z = 0.001;
        });

        console.log('Finished caling, callback called.');
        animation.func(animation.param1, animation.param2, handleAnimations);

        //tweenCapture.easing(TWEEN.Easing.Exponential.Out);

        tweenCapture.delay(100);
        tweenCapture.start();

        console.log('piece(s) capture');
    }

    // Function to handle queued up animations.
    function handleAnimations(queue) {

        //debugger;
        if (queue.length > 0) {
            var animation = queue.shift();

            // Check for capture.
            if (board.boardPosition[animation.param2] != 'empty') {
                capture(animation);
            } else {
                // Run animation.
                animation.func(animation.param1, animation.param2, handleAnimations);
            }

        } else {
            console.log("Done animating.");
        }
    }

    // Function used for testing.
    function readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    alert(allText);
                }
            }
        }
        rawFile.send(null);
    }