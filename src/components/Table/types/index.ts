import type { ReactNode } from "react";

export type ColumnConfig<T = unknown> = {
  key: string;
  header: string;
  render?: (value: unknown, row: T) => ReactNode;
  sorter?: (a: T, b: T) => number;
};

export interface TableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  className?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}
