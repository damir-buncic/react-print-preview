import React, { useEffect, useMemo, useRef, useState } from "react";
import style from "./index.module.scss";
import { ColumnMenu } from "../ColumnMenu";
import { Alignment } from "../AlignMenu";

type Props = {
  columns: string[];
  data: string[][];
};

type VisibleColumn = {
  name: string;
  visible: boolean;
  index: number;
  alignment: Alignment;
};

function renderColumns(columns: VisibleColumn[], showMenu: React.MouseEventHandler<HTMLButtonElement> | undefined) {
  return columns
    .filter((c) => c.visible)
    .map((c) => (
      <th key={c.name} className={style[c.alignment]}>
        {c.name}{" "}
        {showMenu && (
          <button onClick={showMenu} className={style.MenuButton} data-name={c.name}>
            +
          </button>
        )}
      </th>
    ));
}

function renderData(data: string[][], columns: VisibleColumn[]) {
  return data.map((row, index) => <tr key={index}>{renderRow(row, columns)}</tr>);
}

function renderRow(data: string[], columns: VisibleColumn[]) {
  const tds: JSX.Element[] = [];
  columns.forEach((c, i) => {
    if (c.visible) {
      tds.push(<td key={c.name}  className={style[c.alignment]}>{data[c.index]}</td>);
    }
  });

  return tds;
}

export const Table: React.FC<Props> = ({ columns: inputColumns, data }) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [tableStyle, setTableStyle] = useState<{ "--table-height"?: string }>({});
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumn[]>(
    inputColumns.map((c, i) => ({ name: c, visible: true, index: i, alignment: "left" }))
  );
  const [menu, setMenu] = useState<{ column: string; position: { top: string; left: string } } | null>(null);

  useEffect(() => {
    console.log("Table ref changed");
    if (tableRef.current) {
      console.log("Updating table height");
      setTableStyle({ "--table-height": `${tableRef.current.getBoundingClientRect().height}px` });
    }
  }, [tableRef.current]);

  const columnsToAdd = useMemo(() => {
    const result: string[] = [];
    inputColumns.forEach((c) => {
      const column = visibleColumns.find((cc) => cc.name === c && cc.visible);
      if (!column) {
        result.push(c);
      }
    });
    return result;
  }, [visibleColumns, inputColumns]);

  const showMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const position = e.currentTarget.getBoundingClientRect();
    const column = e.currentTarget.dataset.name as string;
    setMenu({ column, position: { top: `${position.top + 20}px`, left: `${position.left}px` } });
  };

  const addColumn: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const column = e.currentTarget.dataset.name;

    if (column) {
      const columnToAdd = visibleColumns.find((c) => c.name === column);
      const newColumns = visibleColumns.filter((c) => c.name !== column);
      const index = visibleColumns.findIndex((c) => c.name === menu?.column);

      if (index !== -1 && columnToAdd) {
        newColumns.splice(index + 1, 0, { ...columnToAdd, visible: true });
        setVisibleColumns(newColumns);
      }
    }
    setMenu(null);
  };

  const removeColumn: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setVisibleColumns(visibleColumns.map((c) => (c.name === menu?.column ? { ...c, visible: false } : c)));
    setMenu(null);
  };

  const changeColumnAlignment = (alignment: Alignment) => {
    setVisibleColumns(visibleColumns.map((c) => (c.name === menu?.column ? { ...c, alignment } : c)));
  };

  const hasMenu = columnsToAdd.length > 0 || visibleColumns.length > 1;

  return (
    <>
      <table className={style.Table} ref={tableRef} style={tableStyle as React.CSSProperties}>
        <thead>
          <tr>{renderColumns(visibleColumns, hasMenu ? showMenu : undefined)}</tr>
        </thead>
        <tbody>{renderData(data, visibleColumns)}</tbody>
      </table>
      {menu && (
        <ColumnMenu
          position={menu.position}
          column={menu.column}
          onAddColumn={addColumn}
          onRemoveColumn={removeColumn}
          columnsToAdd={columnsToAdd}
          visibleColumns={visibleColumns}
          onCloseMenu={() => setMenu(null)}
          onChangeAlignment={changeColumnAlignment}
        />
      )}
    </>
  );
};
