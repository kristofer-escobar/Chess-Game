var loader = new THREE.OBJMTLLoader();

const SCALE = 5;

var Bishop = function(color, position) {

    var self = this;

     this.scale.x = this.scale.y = this.scale.z = SCALE;
     this.position.x = 0;
     this.position.y = 0;
     this.position.z = 0;

    // Load Bishop model.
    if(color == "white"){

        loader.load( 'models/WhiteBishop.obj', 'materials/WhiteBishop.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    } else if(color == "black"){

        loader.load( 'models/BlackBishop.obj', 'materials/BlackBishop.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    }else{

        alert("Error: loading Bishop model.");
    }
}

Bishop.prototype = new THREE.Object3D();

Bishop.prototype.animate = function(){

}