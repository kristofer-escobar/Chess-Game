const PAWN_SCALE = 5;
const offset = -2.15;
var xposition = 0;

var Pawn = function( loader ) {

    var self = this;

     this.scale.x = this.scale.y = this.scale.z = PAWN_SCALE;
     this.position.x = 0;
     this.position.y = 0;
     this.position.z = 0;

    // Loading each pawn individually, for testing only.
    loader.load( 'models/BlackKnight.obj', 'materials/BlackKnight.mtl', function ( object ) { 
    	object.position.x = -15.05;
    	xposition += offset;

    	object.position.z = 15.05;
        self.add( object );
    } );

    // loader.load( 'models/WhitePawn.obj', 'materials/WhitePawn.mtl', function ( object ) { 
    // 	object.position.x = xposition;
    // 	xposition += offset;
    //     self.add( object );
    // } );

    // loader.load( 'models/WhitePawn.obj', 'materials/WhitePawn.mtl', function ( object ) { 
    // 	object.position.x = xposition;
    // 	xposition += offset;
    //     self.add( object );
    // } );

    // loader.load( 'models/WhitePawn.obj', 'materials/WhitePawn.mtl', function ( object ) { 
    // 	object.position.x = xposition;
    // 	xposition += offset;
    //     self.add( object );
    // } );

    // loader.load( 'models/WhitePawn.obj', 'materials/WhitePawn.mtl', function ( object ) { 
    // 	object.position.x = xposition;
    // 	xposition += offset;
    //     self.add( object );
    // } );

    // loader.load( 'models/WhitePawn.obj', 'materials/WhitePawn.mtl', function ( object ) { 
    // 	object.position.x = xposition;
    // 	xposition += offset;
    //     self.add( object );
    // } );

    // loader.load( 'models/WhitePawn.obj', 'materials/WhitePawn.mtl', function ( object ) { 
    // 	object.position.x = xposition;
    // 	xposition += offset;
    //     self.add( object );
    // } );

    // loader.load( 'models/WhitePawn.obj', 'materials/WhitePawn.mtl', function ( object ) { 
    // 	object.position.x = xposition;
    // 	xposition += offset;
    //     self.add( object );
    // } );

    // //
    // // LOADING BLACK PAWNS
    // //

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.z = 0.5;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.z = 0.5;
    // 	object.position.x = -2.15;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.z = 0.5;
    // 	object.position.x = -4.15;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.z = 0.5;
    // 	object.position.x = -6.2;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.z = 0.5;
    // 	object.position.x = -8.3;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.z = 0.5;
    // 	object.position.x = -10.4;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.z = 0.5;
    // 	object.position.x = -12.5;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.z = 0.5; 
    // 	object.position.x = -14.6;
    //     self.add( object );
    // } );
}

Pawn.prototype = new THREE.Object3D();

Pawn.prototype.animate = function(){

}

