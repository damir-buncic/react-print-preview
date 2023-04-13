import React, { MouseEventHandler, useReducer, useRef } from "react";
import style from "./index.module.scss";
import classNames from "classnames";
import { useOnClickOutside } from "../../hooks";

type MenuItem = {
  label: string | React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  name: string;
  separator?: boolean;
  disabled?: boolean;
};

type Props = {
  position: { top: string; left: string };
  onCloseMenu: () => void;
  menuItems: MenuItem[];
};

export const Menu: React.FC<Props> = ({ position, onCloseMenu, menuItems }) => {
  const ref = useRef(null);

  useOnClickOutside(ref, onCloseMenu);

  return (
    <div className={style.menu} style={position} ref={ref}>
      {menuItems.map((i) => (
        <div
          className={classNames(style.menuItem, { [style.separator]: i.separator, [style.disabled]: i.disabled })}
          key={i.name}
          data-name={i.name}
          onClick={i.onClick}
        >
          {i.label}
        </div>
      ))}
    </div>
  );
};
