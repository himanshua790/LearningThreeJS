import Image from "next/image";

const { default: Link } = require("next/link");

const Header = () => {
  return (
    <nav style={{ margin: "3rem 1rem" }}>
      <Link href="/">
        <Image
          src="/Three.js_Logo.png"
          alt="Three.js Home"
          width={50}
          height={50}
          priority
        />
      </Link>
    </nav>
  );
};

export default Header;
