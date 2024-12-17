import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";

import { ColumnProps, Table } from "./";
import { Avatar } from "../Avatar";

const meta: Meta<typeof Table> = {
  component: Table,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

interface FinalityProvider {
  id: string;
  name: string;
  icon: string;
  status: string;
  btcPk: string;
  totalDelegation: number;
  commission: number;
}

const data: FinalityProvider[] = [
  {
    id: "1",
    name: "Lombard",
    icon: "/images/fps/lombard.jpeg",
    status: "Active",
    btcPk: "1234...4321",
    totalDelegation: 10,
    commission: 1,
  },
  {
    id: "2",
    name: "Solv Protocol",
    icon: "/images/fps/solv.jpeg",
    status: "Inactive",
    btcPk: "1234...4321",
    totalDelegation: 20,
    commission: 3,
  },
  {
    id: "3",
    name: "PumpBTC",
    icon: "/images/fps/pumpbtc.jpeg",
    status: "Active",
    btcPk: "1234...4321",
    totalDelegation: 30,
    commission: 5,
  },
];

const columns: ColumnProps<FinalityProvider>[] = [
  {
    key: "name",
    header: "Finality Provider",
    render: (_: unknown, row: FinalityProvider) => (
      <div className="flex items-center gap-2">
        <Avatar size="small" url={row.icon} alt={row.name} />
        <span>{row.name}</span>
      </div>
    ),
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    key: "status",
    header: "Status",
  },
  {
    key: "btcPk",
    header: "BTC PK",
  },
  {
    key: "totalDelegation",
    header: "Total Delegation",
    render: (_: unknown, row: FinalityProvider) => `${row.totalDelegation} sBTC`,
    sorter: (a, b) => a.totalDelegation - b.totalDelegation,
  },
  {
    key: "commission",
    header: "Commission",
    render: (_: unknown, row: FinalityProvider) => `${row.commission}%`,
    sorter: (a, b) => a.commission - b.commission,
  },
];

export const Default: Story = {
  render: () => {
    const [tableData, setTableData] = useState(data.slice(0, 3));
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [selectedProvider, setSelectedProvider] = useState<FinalityProvider | null>(null);

    const handleLoadMore = useCallback(async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const nextItems = data.slice(tableData.length, tableData.length + 3);
      setTableData((prev) => [...prev, ...nextItems]);
      setHasMore(tableData.length + nextItems.length < data.length);
      setLoading(false);
    }, [tableData]);

    const handleRowSelect = useCallback((row: FinalityProvider | null) => {
      setSelectedProvider(row);
    }, []);

    const isRowSelectable = useCallback((row: FinalityProvider) => {
      return row.status === "Active";
    }, []);

    return (
      <div className="space-y-4">
        <div className="h-[150px]">
          <Table
            data={tableData}
            hasMore={hasMore}
            loading={loading}
            onLoadMore={handleLoadMore}
            columns={columns}
            onRowSelect={handleRowSelect}
            isRowSelectable={isRowSelectable}
          />
        </div>
        {selectedProvider && (
          <div className="rounded bg-primary-contrast p-4">
            Selected Provider: {selectedProvider.name} (Commission: {selectedProvider.commission}%)
          </div>
        )}
      </div>
    );
  },
};
