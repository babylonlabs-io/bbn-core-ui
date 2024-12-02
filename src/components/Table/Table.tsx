import { useRef, useMemo, useState } from "react";
import { twJoin } from "tailwind-merge";
import { useTableScroll } from "@/hooks/useTableScroll";
import { TableContext, TableContextType } from "../../context/Table.context";
import { Column } from "./components/Column";
import { Cell } from "./components/Cell";
import type { TableProps } from "./types";
import "./Table.css";

export function Table<T>({
  data,
  columns,
  className,
  onLoadMore,
  hasMore = false,
  loading = false,
  ...restProps
}: TableProps<T>) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | undefined>(undefined);
  const [sortStates, setSortStates] = useState<{
    [key: string]: { direction: "asc" | "desc" | null; priority: number };
  }>({});

  const { isScrolledTop } = useTableScroll(tableRef, {
    onLoadMore,
    hasMore,
    loading,
  });

  const handleSort = (columnKey: string, sorter?: (a: T, b: T) => number) => {
    if (!sorter) return;

    setSortStates((prev) => {
      const currentState = prev[columnKey]?.direction ?? null;
      const currentPriority = prev[columnKey]?.priority ?? 0;

      const nextDirection: "asc" | "desc" | null =
        currentState === null ? "asc" : currentState === "asc" ? "desc" : null;

      if (nextDirection === null) {
        const newState = { ...prev };
        delete newState[columnKey];

        for (const key in newState) {
          if (newState[key].priority > currentPriority) {
            newState[key].priority--;
          }
        }
        return newState;
      }

      const highestPriority = Math.max(0, ...Object.values(prev).map((s) => s.priority));
      return {
        ...prev,
        [columnKey]: {
          direction: nextDirection,
          priority: highestPriority + 1,
        },
      };
    });
  };

  const sortedData = useMemo(() => {
    const activeSorters = Object.entries(sortStates)
      .filter(([, state]) => state.direction !== null)
      .sort((a, b) => b[1].priority - a[1].priority)
      .map(([key, state]) => ({
        column: columns.find((col) => col.key === key),
        direction: state.direction,
      }))
      .filter(({ column }) => column?.sorter);

    if (activeSorters.length === 0) return data;

    return [...data].sort((a, b) => {
      for (const { column, direction } of activeSorters) {
        const result = column!.sorter!(a, b);
        if (result !== 0) {
          return direction === "asc" ? result : -result;
        }
      }
      return 0;
    });
  }, [data, columns, sortStates]);

  const contextValue = useMemo(
    () => ({
      data: sortedData,
      columns,
      sortStates,
      hoveredColumn,
      onColumnHover: setHoveredColumn,
      handleSort,
    }),
    [sortedData, columns, sortStates, hoveredColumn],
  );

  return (
    <TableContext.Provider value={contextValue as TableContextType<unknown>}>
      <div ref={tableRef} className="bbn-table-wrapper">
        <table className={twJoin("bbn-table", className)} {...restProps}>
          <thead className={twJoin("bbn-table-header", isScrolledTop && "scrolled-top")}>
            <tr>
              {columns.map((column) => (
                <Column key={column.key} name={column.key} sorter={column.sorter}>
                  {column.header}
                </Column>
              ))}
            </tr>
          </thead>
          <tbody className="bbn-table-body">
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <Cell
                    key={column.key}
                    value={row[column.key as keyof T]}
                    columnName={column.key}
                    render={column.render ? (value) => column.render!(value, row) : undefined}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableContext.Provider>
  );
}
