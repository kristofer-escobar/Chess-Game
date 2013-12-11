// Globals
var URL = 'http://www.bencarle.com/chess/cg/';
var GAME_URL = 'https://10.11.18.65/cg/chess/';
var gameStarted = null;
var seconds = 2;
var moveList = [];

var ChessMoves = function() {
    
    // Id used to begin game.
    this.gameId = "340";

    // Start polling the server for chess moves.
    this.startGame = function() {
        gameStarted = setTimeout(start, seconds * 1000);
    }
    
    // Replay game from start.
    this.replay = function(){
        // Replay the entire game.
        if(moveList.length > 0){
            //
        }else{
            alert('Please start a game first.');
        }
    }

    this.reset = function(){
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

var move = function( response ){
    moveList = response.moves;
    console.log(response);
} 