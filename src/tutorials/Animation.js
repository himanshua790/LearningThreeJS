import Header from "@/Components/Header";
import GSAP from "gsap";
import * as React from "react";
import * as THREE from "three";
export function ThreeCanvasAnimation() {
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
      // OBJECT
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

      const CUBE = new THREE.Mesh(cubeGeometry, cubeMaterial);
      scene.add(CUBE);

      // Clock
      // const clock = new THREE.Clock();

      GSAP.to(CUBE.position, { duration: 1, delay: 1, x: 2 });
      GSAP.to(CUBE.position, { duration: 1, delay: 2, x: 0 });
      //  Animation
      //  Frames can vary due to performance of Device.
      // To fix it we use time delta
      const tick = () => {
        // Clock
        // const elapsedTime = clock.getElapsedTime();
        // console.log(elapsedTime);
        // // update object
        // // CUBE.rotation.y = elapsedTime * Math.PI * 2; // on revolution per second
        // // CUBE.position.y = Math.sin(elapsedTime); // wave just like sine wave
        // // CUBE.position.x = Math.cos(elapsedTime); // wave just like Cos wave
        // camera.position.y = Math.sin(elapsedTime); // wave just like sine wave
        // camera.position.x = Math.cos(elapsedTime); // wave just like sine wave
        // camera.lookAt(CUBE.position);
        // Render
        renderer.render(scene, camera);

        // Request Animation Frame

        window.requestAnimationFrame(tick);
      };
      tick();
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

export default ThreeCanvasAnimation;
