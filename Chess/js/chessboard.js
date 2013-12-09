var loader = new THREE.OBJMTLLoader();

const ONEDEGREE = Math.PI / 180;
const MAXTURN = 80 * ONEDEGREE;
const MINTURN = -MAXTURN;
const BIKESCALE = 2;
const WHEELRAD = 1.25 * BIKESCALE;

var ChessBoard = function( loader ) {

    var self = this;

    this.scale.x = this.scale.y = this.scale.z = BIKESCALE;
    this.position.x = 0;
    this.position.y = 0;
    this.incr = 0;
    
    var steeringAssembly = new THREE.Object3D();
    steeringAssembly.position.x = 3.3;
    steeringAssembly.position.y = 1.35;
    steeringAssembly.rotation.z = 20 * ONEDEGREE;

    loader.load( 'models/chessboard.obj', 'materials/chessboard.mtl', function ( board ) {
        board.position.x = -0.15;
        board.position.y = 0;
        board.position.z = 0.15;
        board.scale.x = 0.5;
        board.scale.y = 0.5;
        board.scale.z = 0.5;
        
        self.add( board );
        
        self.buildGUI();
    } );
    


}

ChessBoard.prototype = new THREE.Object3D();

ChessBoard.prototype.animate = function(){
//    this.incr = -WHEELRAD * this.rearWheel.incr;
//    this.frontWheel.incr = this.rearWheel.incr / Math.cos( this.handlebar.rotation.y );
//    this.frontWheel.rotation.z -= this.frontWheel.incr;
//    this.rearWheel.rotation.z -= this.rearWheel.incr;
//    this.rotation.y += Math.atan(1.25 * this.frontWheel.incr * Math.sin( this.handlebar.rotation.y ) / 3.6);
//    this.position.x -= this.incr * Math.cos( this.rotation.y );
//    this.position.z += this.incr * Math.sin( this.rotation.y );
}

ChessBoard.prototype.init = function(){
    // loader.load( 'models/pawn.obj', 'materials/pawn.mtl', function ( object ) { 
    //     self.add( object );
    // } );
}
//
ChessBoard.prototype.pedalFwd = function(){
//    this.rearWheel.incr += ONEDEGREE;
}
//
ChessBoard.prototype.pedalRev = function(){
//    this.rearWheel.incr -= ONEDEGREE;
}
//
ChessBoard.prototype.turnRight = function(){
//    if (this.handlebar.rotation.y < MAXTURN) {
//        this.handlebar.rotation.y += ONEDEGREE;
//        //this.rotateX(-ONEDEGREE);
//    }
}
//
ChessBoard.prototype.turnLeft = function(){
//    if (this.handlebar.rotation.y > MINTURN) {
//        this.handlebar.rotation.y -= ONEDEGREE;
//        //this.rotateX(ONEDEGREE);
//    }
}

ChessBoard.prototype.buildGUI = function(){
    var gui = new dat.GUI();
    var chessGameFolder = gui.addFolder('ChessGame');
//    chessGameFolder.add(this.rearWheel, 'incr', MINTURN / 4, MAXTURN / 4).listen();
//    chessGameFolder.add(this.handlebar.rotation, 'y', MINTURN, MAXTURN).listen();
    chessGameFolder.open();
}
