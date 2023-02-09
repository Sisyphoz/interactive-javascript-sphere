function createSphereRandom() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff,
      wireframe: true
    });
    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 10;
    var render = function() {
      requestAnimationFrame(render);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    render();
  }
  