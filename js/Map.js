class Map {
  constructor() {
    this.container = document.getElementById('canvas');

    this.renderer = new THREE.WebGLRenderer( {canvas: this.container, antialias: true} );
    this.renderer.setClearColor(0xffffff);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
    this.camera.position.set(20, 600, 800);
    this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    let controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
  }

  addLights() {
    let light = new THREE.AmbientLight(0xB2EBF2, 0.7);
    this.scene.add(light);

    let light1 = new THREE.DirectionalLight(0x1DE9B6, 0.5);
    light1.position.set(0, 0, 1);
    this.scene.add(light1);

    let light2 = new THREE.DirectionalLight(0xE040FB, 0.4);
    light2.position.set(1, 1, -3);
    this.scene.add(light2);

    let light3 = new THREE.DirectionalLight(0xFF5722, 0.4);
    light3.position.set(3, -1, -2);
    this.scene.add(light3);

    let light4 = new THREE.DirectionalLight(0xE040FB, 0.2);
    light4.position.set(-4, 1, -1);
    this.scene.add(light4);

    let light5 = new THREE.DirectionalLight(0xE040FB, 0.1);
    light5.position.set(-10, -6, -4);
    this.scene.add(light5);
  }

  addRayCasting(countries, callback) {
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    window.addEventListener('mousemove', (e) => {
      mouseVector.x = 2 * (e.clientX / this.container.clientWidth) - 1;
      mouseVector.y = 1 - 2 * ( e.clientY / this.container.clientHeight );
    }, false);

    window.addEventListener('click', (e) => {
      raycaster.setFromCamera( mouseVector.clone(), this.camera );
      const intersects = raycaster.intersectObjects( countries.children );
      if (intersects.length > 0) {
        const closest = intersects[0];
        callback(closest.object.name);
      }
    }, false);
  }
}
