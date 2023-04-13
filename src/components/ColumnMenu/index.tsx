import React, { MouseEventHandler, useRef } from "react";
import { useOnClickOutside } from "../../hooks";
import { Menu } from "../Menu";
import { AlignMenu, Alignment } from "../AlignMenu";
import style from "./index.module.scss";

type Props = {
  column: string;
  position: { top: string; left: string };
  onRemoveColumn: MouseEventHandler<HTMLDivElement>;
  onAddColumn: MouseEventHandler<HTMLDivElement>;
  onChangeAlignment: (alignment: Alignment) => void;
  onCloseMenu: () => void;
  columnsToAdd: string[];
  visibleColumns: { name: string; alignment: Alignment }[];
};

export const ColumnMenu: React.FC<Props> = ({
  position,
  onRemoveColumn,
  onAddColumn,
  columnsToAdd,
  visibleColumns,
  onCloseMenu,
  column,
  onChangeAlignment,
}) => {
  const ref = useRef(null);

  useOnClickOutside(ref, onCloseMenu);

  const items = [];

  const currentColumn = visibleColumns.find((c) => c.name === column);

  if (currentColumn) {
    items.push({
      label: <AlignMenu className={style.alignMenu} alignment={currentColumn.alignment} onChange={onChangeAlignment} />,
      name: "alignment",
      separator: true,
      disabled: true,
    });
  }

  if (visibleColumns.length > 1) {
    items.push({ label: "Delete Column", onClick: onRemoveColumn, name: "remove-column", separator: true });
  }

  columnsToAdd.forEach((c) => {
    items.push({ label: `Insert ${c}`, onClick: onAddColumn, name: c });
  });

  return <Menu position={position} onCloseMenu={onCloseMenu} menuItems={items} />;
};
