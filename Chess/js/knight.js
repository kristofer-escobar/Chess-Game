var loader = new THREE.OBJMTLLoader();

const SCALE = 5;

var Knight = function(color, position) {

    var self = this;

     this.scale.x = this.scale.y = this.scale.z = SCALE;
     this.position.x = 0;
     this.position.y = 0;
     this.position.z = 0;

    // Load Knight model.
    if(color == "white"){

        loader.load( 'models/WhiteKnight.obj', 'materials/WhiteKnight.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    } else if(color == "black"){

        loader.load( 'models/BlackKnight.obj', 'materials/BlackKnight.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    }else{

        alert("Error: loading Knight model.");
    }
}

Knight.prototype = new THREE.Object3D();

Knight.prototype.animate = function(){

}