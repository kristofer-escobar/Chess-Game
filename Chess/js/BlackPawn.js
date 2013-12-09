const PAWN_SCALE = 5;

var Pawn = function( loader ) {

    var self = this;

     this.scale.x = this.scale.y = this.scale.z = PAWN_SCALE;
     this.position.x = 0;
     this.position.y = 0;
     this.position.z = 0;

     // Keep track of pawn initial positions, maybe?
    var initialPawnPositions = [0,-2.15,-4.15, -6.2, -8.3, -10.4, -12.5, -14.6];

    // Loading each pawn individually, for testing only.
    loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
        object.position.z = -14.6;
        self.add( object );
    } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.x = -2.15;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.x = -4.15;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.x = -6.2;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.x = -8.3;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.x = -10.4;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.x = -12.5;
    //     self.add( object );
    // } );

    // loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
    // 	object.position.x = -14.6;
    //     self.add( object );
    // } );
}

Pawn.prototype = new THREE.Object3D();

Pawn.prototype.animate = function(){

}

