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

      camera.position.set(0, 0, 5);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      // #########################################################################

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

export default ThreeCanvasBoilerPlate;
