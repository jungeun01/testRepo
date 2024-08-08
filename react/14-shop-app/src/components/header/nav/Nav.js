import React from "react";
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogIn } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";

function Nav(props) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div>
            <Link>
              <FiShoppingCart />
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Link>
              <FiUser />
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Link>
              <FiLogIn />
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
