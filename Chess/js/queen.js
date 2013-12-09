var loader = new THREE.OBJMTLLoader();

const SCALE = 5;

var Queen = function(color, position) {

    var self = this;

     this.scale.x = this.scale.y = this.scale.z = SCALE;
     this.position.x = 0;
     this.position.y = 0;
     this.position.z = 0;

    // Load Queen model.
    if(color == "white"){

        loader.load( 'models/WhiteQueen.obj', 'materials/WhiteQueen.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    } else if(color == "black"){

        loader.load( 'models/BlackQueen.obj', 'materials/BlackQueen.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    }else{

        alert("Error: loading Queen model.");
    }
}

Queen.prototype = new THREE.Object3D();

Queen.prototype.animate = function(){

}