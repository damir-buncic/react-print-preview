import React from "react";
import { Button } from "../Button";
import style from "./index.module.scss";
import classNames from "classnames";

export type Alignment = "left" | "right" | "center";

type Props = {
  alignment: Alignment;
  onChange: (alignment: Alignment) => void;
  className?: string;
};

function renderBars() {
  return [<span key="1" />, <span key="2" />, <span key="3" />, <span key="4" />, <span key="5" />];
}

export const AlignMenu: React.FC<Props> = ({ alignment, onChange, className }) => {
  return (
    <div className={classNames(style.container, className)}>
      <Button
        className={classNames(style.button, style.left, { [style.active]: alignment === "left" })}
        active={alignment === "left"}
        title="Align left"
        onClick={() => onChange("left")}
      >
        {renderBars()}
      </Button>
      <Button
        className={classNames(style.button, style.center, { [style.active]: alignment === "center" })}
        active={alignment === "center"}
        title="Align center"
        onClick={() => onChange("center")}
      >
        {renderBars()}
      </Button>
      <Button
        className={classNames(style.button, style.right, { [style.active]: alignment === "right" })}
        active={alignment === "right"}
        title="Align right"
        onClick={() => onChange("right")}
      >
        {renderBars()}
      </Button>
    </div>
  );
};
