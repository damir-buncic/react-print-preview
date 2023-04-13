import React, { MouseEventHandler, useState } from "react";
import style from "./index.module.scss";
import { AlignMenu, Alignment } from "../AlignMenu";
import { Button } from "../Button";

export const TextElement: React.FC<{ id: number; onRemove: MouseEventHandler<HTMLButtonElement> }> = ({ id, onRemove }) => {
  const [elementStyle, setElementStyle] = useState<{ fontSize: number; textAlign: Alignment }>({
    fontSize: 12,
    textAlign: "center",
  });

  return (
    <div className={style.container}>
      <div className={style.menu}>
        <Button
          title="Decrease font size"
          className={style.decreaseFont}
          onClick={() => setElementStyle({ ...elementStyle, fontSize: elementStyle.fontSize - 2 })}
        >
          <span>A</span>
          <span>A</span>
        </Button>
        <Button
          title="Increase font size"
          className={style.increaseFont}
          onClick={() => setElementStyle({ ...elementStyle, fontSize: elementStyle.fontSize + 2 })}
        >
          <span>A</span>
          <span>A</span>
        </Button>
        <AlignMenu
          alignment={elementStyle.textAlign}
          onChange={(alignment) => setElementStyle({ ...elementStyle, textAlign: alignment })}
        />
        <Button className={style.remove} title="Remove text" data-id={id} onClick={onRemove}></Button>
      </div>
      <div className={style.text} style={elementStyle} contentEditable="true"></div>
    </div>
  );
};
