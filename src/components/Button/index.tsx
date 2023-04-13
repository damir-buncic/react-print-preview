import classNames from "classnames";
import React from "react";
import style from "./index.module.scss";

export const Button: React.FC<{ active?: boolean } & React.ComponentProps<"button">> = ({
  children,
  className,
  active,
  ...props
}) => {
  return (
    <button className={classNames(style.button, { [style.active]: active }, className)} {...props}>
      {children}
    </button>
  );
};
