import { type PropsWithChildren, type HTMLAttributes, useContext, type ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import { TableContext } from "../../../context/Table.context";

interface CellProps {
  className?: string;
  render?: (value: unknown) => ReactNode;
  columnName?: string;
  value: unknown;
}

export function Cell({
  className,
  render,
  value,
  columnName,
  ...restProps
}: PropsWithChildren<CellProps & HTMLAttributes<HTMLTableCellElement>>) {
  const { hoveredColumn } = useContext(TableContext);

  return (
    <td
      className={twJoin(`bbn-cell-left`, columnName === hoveredColumn && "bbn-table-cell-hover", className)}
      data-column={columnName}
      {...restProps}
    >
      {render ? render(value) : (value as ReactNode)}
    </td>
  );
}
