var loader = new THREE.OBJMTLLoader();

const SCALE = 5;

var Pawn = function(color, position) {

    var self = this;

     this.scale.x = this.scale.y = this.scale.z = SCALE;
     this.position.x = 0;
     this.position.y = 0;
     this.position.z = 0;

    // Load pawn model.
    if(color == "white"){

        loader.load( 'models/WhitePawn.obj', 'materials/WhitePawn.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    } else if(color == "black"){

        loader.load( 'models/BlackPawn.obj', 'materials/BlackPawn.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    }else{

        alert("Error: loading Pawn model.");
    }
}

Pawn.prototype = new THREE.Object3D();

Pawn.prototype.move = function(targetPosition){

}

