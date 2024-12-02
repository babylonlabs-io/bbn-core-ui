import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Table } from "./";
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
    status: "Active",
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

export const Default: Story = {
  render: () => {
    const [tableData, setTableData] = useState(data.slice(0, 3));
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const nextItems = data.slice(tableData.length, tableData.length + 3);
      setTableData((prev) => [...prev, ...nextItems]);
      setHasMore(tableData.length + nextItems.length < data.length);
      setLoading(false);
    };

    return (
      <div className="h-[150px]">
        <Table
          data={tableData}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          loading={loading}
          columns={[
            {
              key: "name",
              header: "Finality Provider",
              render: (_, row) => (
                <div className="flex items-center gap-2">
                  <Avatar size="small" url={row.icon} alt={row.name} />
                  <span className="text-primary-light">{row.name}</span>
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
              render: (value) => `${value} sBTC`,
              sorter: (a, b) => a.totalDelegation - b.totalDelegation,
            },
            {
              key: "commission",
              header: "Commission",
              render: (value) => `${value}%`,
              sorter: (a, b) => a.commission - b.commission,
            },
          ]}
        />
      </div>
    );
  },
};
