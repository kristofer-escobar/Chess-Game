var gameId = 340;

var ChessControls = function() {

    // Change camera views. Currently instant, will animate soon.
    this.WhiteView = function() {
        camera.position.x = 0;
        camera.position.y = 100;
        camera.position.z = -70;
    }

    this.BlackView = function() {
        camera.position.x = 0;
        camera.position.y = 100;
        camera.position.z = 100;
    }

    this.TopView = function() {
        camera.position.x = 0;
        camera.position.y = 150;
        camera.position.z = 0;
    }
}