var loader = new THREE.OBJMTLLoader();

const SCALE = 5;

var Rook = function(color, position) {

    var self = this;

     this.scale.x = this.scale.y = this.scale.z = SCALE;
     this.position.x = 0;
     this.position.y = 0;
     this.position.z = 0;

    // Load rook model.
    if(color == "white"){

        loader.load( 'models/WhiteRook.obj', 'materials/WhiteRook.mtl', function ( object ) { 
            object.position.x = position.x - 0.25; // -0.25 subtracted to correct weird bug causing white rook to veer to the left.
            object.position.z = position.z;
            self.add( object );
        } );
    } else if(color == "black"){

        loader.load( 'models/BlackRook.obj', 'materials/BlackRook.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    }else{

        alert("Error: loading rook model.");
    }
}

Rook.prototype = new THREE.Object3D();

Rook.prototype.animate = function(){

}