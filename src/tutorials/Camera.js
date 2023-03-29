import Header from "@/Components/Header";
import * as React from "react";
import * as THREE from "three";

export function ThreeCanvasCamera() {
  const ref = React.useRef();
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!loaded && ref.current) {
      const scene = new THREE.Scene();
      // Camera
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      camera.position.set(2, 2, 2);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      // #########################################################################
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: "cyan",
        wireframe: true,
      });
      const CUBE = new THREE.Mesh(cubeGeometry, cubeMaterial);

      scene.add(CUBE);
      // #########################################################################
      // Light
      const light = new THREE.PointLight(0xffffff);
      light.position.set(20, 20, 20);
      scene.add(light);

      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      };
      const clock = new THREE.Clock();
      const tick = () => {
        // Clock
        const elapsedTime = clock.getElapsedTime();
        console.log(elapsedTime);
        // update object
        CUBE.rotation.y = elapsedTime * Math.PI * 0.5; // on revolution per second
        // CUBE.position.y = Math.sin(elapsedTime); // wave just like sine wave
        // CUBE.position.x = Math.cos(elapsedTime); // wave just like Cos wave
        // camera.position.y = Math.sin(elapsedTime); // wave just like sine wave
        // camera.position.x = Math.cos(elapsedTime); // wave just like sine wave
        camera.lookAt(CUBE.position);
        // Render
        renderer.render(scene, camera);

        // Request Animation Frame

        window.requestAnimationFrame(tick);
      };
      tick();
      // renderer.render(scene, camera);

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

export default ThreeCanvasCamera;
