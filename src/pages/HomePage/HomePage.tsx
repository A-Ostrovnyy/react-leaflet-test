import { Link } from "react-router-dom";

import { URLS } from "./constants";

// TODO: convert to the page header with HOC
const HomePage = () => {
  return (
    <nav>
      <ul>
        {URLS.map((route) => (
          <li key={route.id}>
            <Link to={route.path}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HomePage;
