function cloneObj ( obj ) {
    var i, cpy = new THREE.Object3D();
    for (var i in obj.children) {
        cpy.add(
            new THREE.Mesh(obj.children[i].geometry)
        );
    }
    return cpy;
}

function cloneObjMtl ( objmtl ) {
    var i, cpy = new THREE.Object3D();
    for (var i in objmtl.children) {
        cpy.add(
            new THREE.Mesh(objmtl.children[i].geometry,
            objmtl.children[i].material)
        );
    }
    return cpy;
}
