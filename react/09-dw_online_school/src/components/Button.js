import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";
function Button({ variant, ...restProps }) {
  // debugger;
  return (
    <button
      {...restProps}
      //리액트에서 여러가지 프롬이 있으면 ...restProp사용 =>다 들어옴 restProp안에 children이 들어와있음
      className={cn(styles.button, variant && styles[variant])}
    />
  );
}

export default Button;
