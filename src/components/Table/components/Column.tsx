import { type PropsWithChildren, type HTMLAttributes, useContext } from "react";
import { twJoin } from "tailwind-merge";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import { TableContext } from "../../../context/Table.context";

interface ColumnProps<T = unknown> {
  name?: string;
  sorter?: (a: T, b: T) => number;
  className?: string;
}

export function Column<T>({
  name,
  className,
  children,
  sorter,
  ...restProps
}: PropsWithChildren<ColumnProps<T> & HTMLAttributes<HTMLTableCellElement>>) {
  const { columns, sortStates, handleSort, onColumnHover } = useContext(TableContext);
  const sortState = sortStates[name ?? ""];
  const sortDirection = sortState?.direction;

  return (
    <th
      className={twJoin(`bbn-cell-left`, sorter && "bbn-table-sortable", className)}
      onClick={() => {
        if (sorter && name) {
          const column = columns.find((col) => col.key === name);
          handleSort?.(name, column?.sorter);
        }
      }}
      onMouseEnter={() => name && onColumnHover?.(name)}
      onMouseLeave={() => onColumnHover?.(undefined)}
      data-column={name}
      {...restProps}
    >
      <div className="flex items-center justify-between gap-1">
        <span>{children}</span>
        {sorter && (
          <span className="bbn-table-sort-icons">
            <RiArrowUpSFill
              className={twJoin(
                "bbn-sort-icon bbn-sort-icon-up",
                sortDirection === "asc" ? "bbn-sort-icon-active" : "bbn-sort-icon-inactive",
              )}
            />
            <RiArrowDownSFill
              className={twJoin(
                "bbn-sort-icon bbn-sort-icon-down",
                sortDirection === "desc" ? "bbn-sort-icon-active" : "bbn-sort-icon-inactive",
              )}
            />
          </span>
        )}
      </div>
    </th>
  );
}
