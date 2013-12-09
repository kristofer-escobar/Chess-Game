var loader = new THREE.OBJMTLLoader();

const SCALE = 5;

var King = function(color, position) {

    var self = this;

     this.scale.x = this.scale.y = this.scale.z = SCALE;
     this.position.x = 0;
     this.position.y = 0;
     this.position.z = 0;

    // Load King model.
    if(color == "white"){

        loader.load( 'models/WhiteKing.obj', 'materials/WhiteKing.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    } else if(color == "black"){

        loader.load( 'models/BlackKing.obj', 'materials/BlackKing.mtl', function ( object ) { 
            object.position.x = position.x;
            object.position.z = position.z;
            self.add( object );
        } );
    }else{

        alert("Error: loading King model.");
    }
}

King.prototype = new THREE.Object3D();

King.prototype.animate = function(){

}