import React from "react";
import style from "./index.module.scss";
import classNames from "classnames";

export type Orientation = "portrait" | "landscape";

type Props = {
  onChangeOrientation: (orientation: Orientation) => void;
  orientation: Orientation;
};

export const OrientationToggle: React.FC<Props> = ({ onChangeOrientation, orientation }) => {
  return (
    <div className={style.container}>
      <button
        title="Portrait orientation"
        onClick={() => onChangeOrientation("portrait")}
        className={classNames(style.button, { [style.active]: orientation === "portrait" })}
      >
        <span className={classNames(style.icon, style.portrait)}></span>
      </button>
      <button
        title="Landscape orientation"
        onClick={() => onChangeOrientation("landscape")}
        className={classNames(style.button, { [style.active]: orientation === "landscape" })}
      >
        <span className={classNames(style.icon, style.landscape)}></span>
      </button>
    </div>
  );
};
