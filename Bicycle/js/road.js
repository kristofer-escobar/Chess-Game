var Road = function( x, z ){
    THREE.Mesh.call( this, this.geometry, this.material );
    this.position.x = x;
    this.position.y = -24;
    this.position.z = z;
};

Road.prototype = Object.create(THREE.Mesh.prototype);
Road.prototype.geometry = new THREE.CubeGeometry( 1000, 0.1, 1000, 1, 1, 1 );
Road.prototype.texture = new THREE.ImageUtils.loadTexture( 'textures/rough_asphalt_tile.jpg' );
Road.prototype.texture.wrapS = Road.prototype.texture.wrapT = THREE.RepeatWrapping;
Road.prototype.texture.repeat.set( 1, 1 );
Road.prototype.texture.minFilter = THREE.LinearFilter;
Road.prototype.texture.magFilter = THREE.LinearFilter;
Road.prototype.material = new THREE.MeshLambertMaterial( { color: 0x666666, map: Road.prototype.texture } ); 
