import dayjs from "dayjs";

import { navIcons, navLinks } from "#constants";

const Navbar: React.FC = () => {
  return (
    <nav>
      {/* LEFT SIDE */}
      <div>
        <img src="/icons/logo.svg" alt="logo" />
        <p className="font-bold">Zach's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={img} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};
export default Navbar;
