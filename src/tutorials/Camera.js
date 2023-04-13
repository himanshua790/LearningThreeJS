import Header from "@/Components/Header";
import * as React from "react";
import * as THREE from "three";
// import OrbitControls from "three-orbit-controls";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function ThreeCanvasCamera() {
  const ref = React.useRef();
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!loaded && ref.current) {
      const scene = new THREE.Scene();
      const cursor = {
        x: 0,
        y: 0,
      };

      const handleEvent = (event) => {
        cursor.x = event.clientX / window.innerWidth - 0.5;
        cursor.y = event.clientY / window.innerHeight - 0.5;
        console.log(cursor.y);
      };
      window.addEventListener("mousemove", handleEvent);
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      camera.position.set(cursor.x, cursor.y, 3);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      // #########################################################################
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: "cyan",
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
      const tick = () => {
        renderer.render(scene, camera);

        // Request Animation Frame

        window.requestAnimationFrame(tick);
      };
      tick();

      // **********************************
      // Control
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = true;
      // **********************************
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
