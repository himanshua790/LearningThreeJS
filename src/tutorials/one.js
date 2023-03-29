import Header from "@/Components/Header";
import * as React from "react";
import * as THREE from "three";

export function ThreeCanvasOne() {
  const ref = React.useRef();
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!loaded && ref.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // const geometry = new THREE.DodecahedronBufferGeometry(1.7, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: "#00FF95",
      });

      const Stars = () => {
        const starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
        const starMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
        });
        const star = new THREE.Mesh(starGeometry, starMaterial);

        const [x, y, z] = Array(3)
          .fill(1)
          .map(() => THREE.MathUtils.randFloatSpread(70));
        star.position.set(x, y, z);

        scene.add(star);
      };

      Array(200).fill(100).forEach(Stars);

      const light = new THREE.PointLight(0xffffff);
      light.position.set(20, 20, 20);
      scene.add(light);

      camera.position.z = 5;
      camera.position.x = 1.5;

      const Figure = new THREE.Mesh(geometry, material);

      scene.add(Figure);

      const animate = () => {
        requestAnimationFrame(animate);
        Figure.rotation.x += 0.01;
        Figure.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

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

export default ThreeCanvasOne;
