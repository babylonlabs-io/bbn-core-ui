import { useRef, useMemo, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { twJoin } from "tailwind-merge";
import { useTableScroll } from "@/hooks/useTableScroll";
import { TableContext, TableContextType } from "../../context/Table.context";
import { Column } from "./components/Column";
import type { TableData, TableProps } from "./types";
import "./Table.css";
import { useControlledState } from "@/hooks/useControlledState";
import { useTableSort } from "@/hooks/useTableSort";
import { Row } from "./components/Row";

function TableBase<T extends TableData>(
  {
    data,
    columns,
    className,
    hasMore = false,
    loading = false,
    onLoadMore,
    onRowSelect,
    isRowSelectable,

    selectedRow: selectedRowProp,
    defaultSelectedRow,
    onSelectedRowChange,

    ...restProps
  }: TableProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  const tableRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => tableRef.current!, []);

  const [hoveredColumn, setHoveredColumn] = useState<string | undefined>(undefined);
  const { sortStates, handleColumnSort, sortedData } = useTableSort(data, columns);
  const { isScrolledTop } = useTableScroll(tableRef, { onLoadMore, hasMore, loading });

  const [selectedRow, setSelectedRow] = useControlledState<string | number | null>({
    value: selectedRowProp,
    defaultValue: defaultSelectedRow ?? null,
    onStateChange: onSelectedRowChange,
  });

  const handleRowSelect = useCallback(
    (row: T) => {
      if (!onRowSelect || (isRowSelectable && !isRowSelectable(row))) return;
      const newValue = selectedRow === row.id ? null : row.id;
      setSelectedRow(newValue);
      onRowSelect(newValue === null ? null : row);
    },
    [onRowSelect, isRowSelectable, selectedRow, setSelectedRow],
  );

  const contextValue = useMemo(
    () => ({
      data: sortedData,
      columns,
      sortStates,
      hoveredColumn,
      onColumnHover: setHoveredColumn,
      onColumnSort: handleColumnSort,
      onRowSelect: handleRowSelect,
    }),
    [sortedData, columns, sortStates, hoveredColumn, handleColumnSort, handleRowSelect],
  );

  const ColumnComponent = useMemo(() => {
    return Column;
  }, [columns]);

  return (
    <TableContext.Provider value={contextValue as TableContextType<unknown>}>
      <div ref={tableRef} className="bbn-table-wrapper">
        <table className={twJoin("bbn-table", className)} {...restProps}>
          <thead className={twJoin("bbn-table-header", isScrolledTop && "scrolled-top")}>
            <tr>
              {columns.map((column) => (
                <ColumnComponent key={column.key} name={column.key} sorter={column.sorter}>
                  {column.header}
                </ColumnComponent>
              ))}
            </tr>
          </thead>
          <tbody className="bbn-table-body">
            {sortedData.map((row) => (
              <Row
                key={row.id}
                row={row}
                columns={columns}
                isSelected={selectedRow === row.id}
                isSelectable={isRowSelectable ? isRowSelectable(row) : true}
                onSelect={handleRowSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </TableContext.Provider>
  );
}

export const Table = forwardRef(TableBase) as <T extends TableData>(
  props: TableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;
