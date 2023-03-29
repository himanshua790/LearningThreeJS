import Header from "@/Components/Header";
import * as React from "react";
import * as THREE from "three";

export function ThreeCanvasGroups() {
  const ref = React.useRef();
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!loaded && ref.current) {
      const scene = new THREE.Scene();
      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // camera.position.z = 5;
      // camera.position.x = 1.5;
      camera.position.set(0, 0, 5);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Light
      const light = new THREE.PointLight(0xffffff);
      light.position.set(20, 20, 20);
      scene.add(light);

      //  Object
      const group = new THREE.Group();
      // Group Operation
      group.position.set(0, 1, 0);
      group.scale.set(1, 2, 1);

      group.rotation.y = Math.PI * 0.25;
      scene.add(group);
      const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        -new THREE.MeshBasicMaterial({ color: 0xff0000 })
      );
      group.add(cube1);
      const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      );
      cube2.position.set(-2, 0, 0);
      group.add(cube2);
      const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
      );
      cube3.position.set(2, 0, 0);
      group.add(cube3);

      // Axis Helper
      //  Positioning things in space can be hard, One good solution is to use the AxesHelper to display a colored line for each axis
      const axisHelper = new THREE.AxesHelper(1);
      scene.add(axisHelper);

      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      };

      renderer.render(scene, camera);

      // **********************************
      ref.current.innerHTML = "";
      ref.current.appendChild(renderer.domElement);
      window.addEventListener("resize", resize);
      setLoaded(true);

      return () => {
        window.removeEventListener("resize", resize);
        ref.current = null;
      };
      // **********************************
    }
  }, [ref, loaded]);

  return (
    <>
      <Header />
      <div ref={ref} />
    </>
  );
}

export default ThreeCanvasGroups;
