import Header from "@/Components/Header";
import * as React from "react";
import * as THREE from "three";

export function ThreeCanvasPosition() {
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
      camera.position.set(1, 1, 5);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Light
      const light = new THREE.PointLight(0xffffff);
      light.position.set(20, 20, 20);
      scene.add(light);

      // Object
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: "#00FF95",
      });

      const Figure = new THREE.Mesh(geometry, material);
      // Figure.position.x = 0.7;
      // Figure.position.y = -0.6;
      // Figure.position.z = 3;

      // TO update all position at once we use set
      Figure.position.set(1, -1, 1);

      // Scale
      Figure.scale.set(1, 1, 3);
      // Figure.position.normalize(); // Make the position of Object to a point where lenght in 1

      // To Avoid Gimble Lock, we reorder xyz to yxz;
      // rotation x become y and vise-versa

      Figure.rotation.reorder("YXZ");
      // Rotation
      Figure.rotation.y = Math.PI * 0.25;
      Figure.rotation.x = Math.PI * 0.5;

      // LookAT
      // Object3D instances have a lookAt( . .. ) method which rotates the object so that its -z faces the target you provided The target must be a Vector3
      camera.lookAt(Figure.position);

      console.log("Length", Figure.position.length()); // Length from origin to center of Object
      console.log("Distance", Figure.position.distanceTo(camera.position)); // Distance from center of Object to camera origin
      scene.add(Figure);

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

export default ThreeCanvasPosition;
