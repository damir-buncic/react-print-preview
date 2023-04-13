import React, { useState } from "react";
import style from "./index.module.scss";
import classNames from "classnames";
import { OrientationToggle, Orientation } from "../OrientationToggle";

type Props = {
  children: React.ReactNode;
};


export const Paper: React.FC<Props> = ({ children }) => {
  const [orientation, setOrientation] = useState<Orientation>("portrait");

  return (
    <div className={style.container}>
      <div className={classNames(style.menu, style[orientation])}>
        <OrientationToggle onChangeOrientation={setOrientation} orientation={orientation} />
      </div>
      <div className={classNames(style.paper, style[orientation])}>{children}</div>
    </div>
  );
};
