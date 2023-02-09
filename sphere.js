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
  
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var isDragging = false;
  var previousMousePosition = {
    x: 0,
    y: 0
  };

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([sphere]);
    if (intersects.length > 0) {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    }
  }

  function onDocumentMouseUp(event) {
    isDragging = false;
  }

  function onDocumentMouseMove(event) {
    if (isDragging) {
      var deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };
      sphere.rotation.y += deltaMove.x * 100;
      sphere.rotation.x += deltaMove.y * 100;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    }
  }

  var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();
}
