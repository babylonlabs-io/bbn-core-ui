import { createContext } from "react";
import type { ColumnConfig } from "../components/Table/types";

export interface TableContextType<T = unknown> {
  data: T[];
  columns: ColumnConfig<T>[];
  sortStates: {
    [key: string]: {
      direction: "asc" | "desc" | null;
      priority: number;
    };
  };
  hoveredColumn?: string;
  onColumnHover?: (column: string | undefined) => void;
  handleSort?: (columnKey: string, sorter?: (a: T, b: T) => number) => void;
}

export const TableContext = createContext<TableContextType<unknown>>({
  data: [],
  columns: [],
  sortStates: {},
  hoveredColumn: undefined,
  onColumnHover: undefined,
  handleSort: undefined,
});
