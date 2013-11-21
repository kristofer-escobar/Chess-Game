var loader = new THREE.OBJMTLLoader();

const ONEDEGREE = Math.PI / 180;
const MAXTURN = 80 * ONEDEGREE;
const MINTURN = -MAXTURN;
const BIKESCALE = 10;
const WHEELRAD = 1.25 * BIKESCALE;

var Bicycle = function( loader ) {

    var self = this;

    this.scale.x = this.scale.y = this.scale.z = BIKESCALE;
    this.position.x = -21;
    this.position.y = -10;
    this.incr = 0;
    
    var steeringAssembly = new THREE.Object3D();
    steeringAssembly.position.x = 3.3;
    steeringAssembly.position.y = 1.35;
    steeringAssembly.rotation.z = 20 * ONEDEGREE;

    loader.load( 'models/frame.obj', 'materials/frame.mtl', function ( frame ) {
        frame.position.x = 0;

        loader.load( 'models/handle.obj', 'materials/chrome.mtl', function ( handlebar ) {

            self.handlebar = handlebar;

            loader.load( 'models/fork.obj', 'materials/paint.mtl', function ( fork ) {

                self.rearWheel = new THREE.Object3D();
                self.frontWheel = new THREE.Object3D();
                self.frontWheel.incr = self.rearWheel.incr = 0;
                self.frontWheel.position.x = self.frontWheel.position.y = 0;

                loader.load( 'models/grip.obj', 'materials/rubber.mtl', function ( object ) {

                    var object2 = cloneObjMtl(object);
                    object2.scale.z = -1;
                    self.handlebar.add( object );
                    self.handlebar.add( object2 );
    
                    loader.load( 'models/rim.obj', 'materials/chrome.mtl', function ( rim ) {

                        var rearRim = cloneObjMtl(rim);
                        self.frontWheel.add( rim );
                        self.rearWheel.add( rearRim );

                        loader.load( 'models/tire.obj', 'materials/rubber.mtl', function ( tire ) {
                            var rearTire = cloneObjMtl(tire);
                            rim.add( tire );
                            rearRim.add( rearTire );
    
                            self.buildGUI();
                        } );
                    } );

                } );

                self.frontWheel.position.x = 0.25; 
                self.frontWheel.position.y = -1.55; 

                frame.add(self.rearWheel);
                fork.add(self.frontWheel);
                self.handlebar.add( fork );

            } );

            steeringAssembly.add( self.handlebar );
        } );

        frame.add( steeringAssembly );
        self.add( frame );

    } );

}

Bicycle.prototype = new THREE.Object3D();

Bicycle.prototype.animate = function(){
    this.incr = -WHEELRAD * this.rearWheel.incr;
    this.frontWheel.incr = this.rearWheel.incr / Math.cos( this.handlebar.rotation.y );
    this.frontWheel.rotation.z -= this.frontWheel.incr;
    this.rearWheel.rotation.z -= this.rearWheel.incr;
    this.rotation.y += Math.atan(1.25 * this.frontWheel.incr * Math.sin( this.handlebar.rotation.y ) / 3.6);
    this.position.x -= this.incr * Math.cos( this.rotation.y );
    this.position.z += this.incr * Math.sin( this.rotation.y );
}

Bicycle.prototype.pedalFwd = function(){
    this.rearWheel.incr += ONEDEGREE;
}

Bicycle.prototype.pedalRev = function(){
    this.rearWheel.incr -= ONEDEGREE;
}

Bicycle.prototype.turnRight = function(){
    if (this.handlebar.rotation.y < MAXTURN) {
        this.handlebar.rotation.y += ONEDEGREE;
        //this.rotateX(-ONEDEGREE);
    }
}

Bicycle.prototype.turnLeft = function(){
    if (this.handlebar.rotation.y > MINTURN) {
        this.handlebar.rotation.y -= ONEDEGREE;
        //this.rotateX(ONEDEGREE);
    }
}

Bicycle.prototype.buildGUI = function(){
    var gui = new dat.GUI();
    var bikeFolder = gui.addFolder('Bicycle');
    bikeFolder.add(this.rearWheel, 'incr', MINTURN / 4, MAXTURN / 4).listen();
    bikeFolder.add(this.handlebar.rotation, 'y', MINTURN, MAXTURN).listen();
    bikeFolder.open();
}
