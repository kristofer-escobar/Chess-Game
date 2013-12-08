//var loader = new THREE.OBJMTLLoader();

const ONEDEGREE = Math.PI / 180;
const MAXTURN = 80 * ONEDEGREE;
const MINTURN = -MAXTURN;
const BIKESCALE = 0.003;
const WHEELRAD = 1.25 * BIKESCALE;

var Pawn = function( loader ) {

    var self = this;

    this.scale.x = this.scale.y = this.scale.z = BIKESCALE;
    this.position.x = -21;
    this.position.y = -10;
    this.incr = 0;
    
    var steeringAssembly = new THREE.Object3D();
    steeringAssembly.position.x = 3.3;
    steeringAssembly.position.y = 1.35;
    steeringAssembly.rotation.z = 20 * ONEDEGREE;

    loader.load( 'models/pawn.obj', 'materials/pawn.mtl', function ( board ) {
        // Set Position.
        board.position.x = 0;    
        board.position.z = 0; 
        board.position.y = 5.8; 

        // Set scale.
        board.scale.x = 1.5;     
        board.scale.y = 1.5;    
        board.scale.z = 1.5;    
        self.add( board );
    } );
    


}

Pawn.prototype = new THREE.Object3D();

Pawn.prototype.animate = function(){
//    this.incr = -WHEELRAD * this.rearWheel.incr;
//    this.frontWheel.incr = this.rearWheel.incr / Math.cos( this.handlebar.rotation.y );
//    this.frontWheel.rotation.z -= this.frontWheel.incr;
//    this.rearWheel.rotation.z -= this.rearWheel.incr;
//    this.rotation.y += Math.atan(1.25 * this.frontWheel.incr * Math.sin( this.handlebar.rotation.y ) / 3.6);
//    this.position.x -= this.incr * Math.cos( this.rotation.y );
//    this.position.z += this.incr * Math.sin( this.rotation.y );
}
//
Pawn.prototype.pedalFwd = function(){
//    this.rearWheel.incr += ONEDEGREE;
}
//
Pawn.prototype.pedalRev = function(){
//    this.rearWheel.incr -= ONEDEGREE;
}
//
Pawn.prototype.turnRight = function(){
//    if (this.handlebar.rotation.y < MAXTURN) {
//        this.handlebar.rotation.y += ONEDEGREE;
//        //this.rotateX(-ONEDEGREE);
//    }
}
//
Pawn.prototype.turnLeft = function(){
//    if (this.handlebar.rotation.y > MINTURN) {
//        this.handlebar.rotation.y -= ONEDEGREE;
//        //this.rotateX(ONEDEGREE);
//    }
}

Pawn.prototype.buildGUI = function(){
    var gui = new dat.GUI();
    var PawnFolder = gui.addFolder('Pawn');
//    PawnFolder.add(this.rearWheel, 'incr', MINTURN / 4, MAXTURN / 4).listen();
//    PawnFolder.add(this.handlebar.rotation, 'y', MINTURN, MAXTURN).listen();
    PawnFolder.open();
}
