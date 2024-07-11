import { Link, Outlet } from "react-router-dom";
import Nesting from "./02/Nesting";

function App() {
  return (
    <>
      <h1>Hello, Styled components!</h1>
      <ul>
        <Link to="01">
          <li>1. Styled components Basic</li>
        </Link>
        <Link to="02">
          <li>2. Nesting 문법 </li>
        </Link>
        <Link to="03">
          <li>3. 연습1 </li>
        </Link>
      </ul>
      <Outlet />
    </>
  );
}

export default App;
