import React, { MouseEvent, useState } from "react";
import style from "./index.module.scss";
import { TextElement } from "../TextElement";

type Props = {};

export const Text: React.FC<Props> = ({}) => {
  const [data, setData] = useState<number[]>([]);

  function addElement() {
    setData([...data, Date.now()]);
  }

  function removeElement(e: MouseEvent<HTMLButtonElement>) {
    const id = e.currentTarget.dataset.id;
    if (id) {
      setData(data.filter((i) => i !== +id));
    }
  }

  return (
    <div className={style.container}>
      {data.map((e) => (
        <TextElement key={e} id={e} onRemove={removeElement} />
      ))}
      <div className={style.add} onClick={addElement}>
        Add Text
      </div>
    </div>
  );
};
