var loader = new THREE.OBJMTLLoader();

const PAWN_SCALE = 5;
const offset = -2.15;
var xposition = 0;

var Pawn = function( color, position ) {

    var self = this;

     this.scale.x = this.scale.y = this.scale.z = PAWN_SCALE;
     this.position.x = 0;
     this.position.y = 0;
     this.position.z = 0;

    // Loading pawn model.
    if(color == "white"){

        loader.load( 'models/WhitePawn.obj', 'materials/WhitePawn.mtl', function ( object ) { 
            object.position.x = xposition;
            xposition += offset;
            self.add( object );
        } );
    } else if(color == "black"){

        loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
            object.position.x = xposition;
            xposition += offset;
            self.add( object );
        } );
    }else{
        alert("Error: loading pawn model.");
    }
}

Pawn.prototype = new THREE.Object3D();

Pawn.prototype.animate = function(){

}

