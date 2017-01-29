class Earth {
  constructor(geoData) {
    this.scale = 200;
    this.defaultColour = new THREE.Color(0xA7FFEB);

    this.globeMesh = new THREE.Object3D();
    this.globeMesh.name = 'globe';
    this.globeMesh.rotation.x = -0.3;
    this.globeMesh.rotation.y = -1.6;

    for (let country in geoData) {
      let geometry = new Map3DGeometry(geoData[country], 0.8);
      let material = new THREE.MeshPhongMaterial({
        color: this.defaultColour,
        side: THREE.DoubleSide,
        shininess: 100
      });
      let countryMesh = new THREE.Mesh(geometry, material);
      countryMesh.name = country;
      countryMesh.scale.set(this.scale, this.scale, this.scale);
      this.globeMesh.add(countryMesh);
    }

    this.points = new THREE.Object3D();
    this.points.name = 'Points';
    this.globeMesh.add(this.points);
  }

  addPoint(lat, lon) {
    let depth = 50;
    let geometry = new THREE.BoxGeometry(1, 1, depth * 2.5);
    let material= new THREE.MeshPhongMaterial({color: 0xC6FF00});
    let mesh = new THREE.Mesh(geometry, material);

    // colatitude: difference between latitude and 90 deg
    let phi = (90 - lat) * Math.PI / 180;
    // azimuthal: angle (x to z)
    let the = (180 - lon) * Math.PI / 180;

    // translate phi & the into XYZ coordinates
    let x = Math.sin(the) * Math.sin(phi) * -1;
    let y = Math.cos(phi);
    let z = Math.cos(the) * Math.sin(phi);

    let pointScale = this.scale + (depth / 2);

    mesh.position.set(x * pointScale, y * pointScale, z * pointScale);
    mesh.lookAt(new THREE.Vector3(0, 0, 0));
    this.points.add(mesh);
  }

  colourCountry(name) {
    this.globeMesh.children.forEach((countryMesh) => {
      if (countryMesh.material) {
        countryMesh.material.color = this.defaultColour;
      }
    });

    const countryMesh = this.globeMesh.getObjectByName(name);
    countryMesh.material.color = new THREE.Color(0xF8BBD0);
  }
}
