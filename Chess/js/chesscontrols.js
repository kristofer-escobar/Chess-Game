var gameId = 340;

var ChessControls = function() {

    // Change camera views. Currently instant, will animate soon.
    this.WhiteView = function() {

        var position = { x : camera.position.x, y: camera.position.y, z: camera.position.z };
        var target = { x : 0, y: 100, z: -90 };
        var tweenCamera = new TWEEN.Tween(position).to(target, 2000);

        tweenCamera.onUpdate(function(){

            camera.position.x = position.x;
            camera.position.y = position.y;
            camera.position.z = position.z;
        });

        tweenCamera.start();
    }

    this.BlackView = function() {

        var position = { x : camera.position.x, y: camera.position.y, z: camera.position.z };
        var target = { x : 0, y: 100, z: 120 };
        var tweenCamera = new TWEEN.Tween(position).to(target, 2000);

        tweenCamera.onUpdate(function(){

            camera.position.x = position.x;
            camera.position.y = position.y;
            camera.position.z = position.z;
        });

        tweenCamera.start();
    }

    this.TopView = function() {

        var position = { x : camera.position.x, y: camera.position.y, z: camera.position.z };
        var target = { x : 0, y: 150, z: 0 };
        var tweenCamera = new TWEEN.Tween(position).to(target, 2000);

        tweenCamera.onUpdate(function(){

            camera.position.x = position.x;
            camera.position.y = position.y;
            camera.position.z = position.z;
        });

        tweenCamera.start();
    }
}