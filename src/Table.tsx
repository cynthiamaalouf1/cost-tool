// src/components/AggregatedTable.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface Row {
  id: number;
  value1: number;
  value2: number;
}

const COLUMN_TITLES = {
  value1: "Column 1",
  value2: "Column 2",
  sum: "Sum",
  diff: "Difference",
  prod: "Product",
  quot: "Quotient",
  avg: "Average",
  pct: "Pct (v1/v2)",
} as const;

const getInitialRows = (): Row[] =>
  Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    value1: 0,
    value2: 0,
  }));

export const AggregatedTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>(getInitialRows());

  const handleChange = (
    id: number,
    field: keyof Omit<Row, "id">,
    raw: string
  ) => {
    const parsed = parseFloat(raw);
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [field]: isNaN(parsed) ? 0 : parsed } : r
      )
    );
  };

  const format = (num: number | null): string =>
    num === null ? "-" : num.toFixed(2);

  const addRow = () => {
    const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows((prev) => [...prev, { id: nextId, value1: 0, value2: 0 }]);
  };

  const resetRows = () => setRows(getInitialRows());

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <Button onClick={addRow}>Add Row</Button>
        <Button variant="outline" onClick={resetRows}>
          Reset
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 text-center">
              {COLUMN_TITLES.value1}
            </TableHead>
            <TableHead className="w-24 text-center">
              {COLUMN_TITLES.value2}
            </TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.sum}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.diff}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.prod}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.quot}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.avg}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.pct}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const { value1, value2 } = row;
            const sum = value1 + value2;
            const diff = value1 - value2;
            const prod = value1 * value2;
            const quot = value2 !== 0 ? value1 / value2 : null;
            const avg = (value1 + value2) / 2;
            const pct = value2 !== 0 ? (value1 / value2) * 100 : null;

            return (
              <TableRow key={row.id}>
                <TableCell className="w-24">
                  <Input
                    type="number"
                    className="appearance-none"
                    value={value1}
                    onFocus={(e) => e.currentTarget.select()}
                    onChange={(e) =>
                      handleChange(row.id, "value1", e.currentTarget.value)
                    }
                  />
                </TableCell>
                <TableCell className="w-24">
                  <Input
                    type="number"
                    className="appearance-none"
                    value={value2}
                    onFocus={(e) => e.currentTarget.select()}
                    onChange={(e) =>
                      handleChange(row.id, "value2", e.currentTarget.value)
                    }
                  />
                </TableCell>
                <TableCell>{format(sum)}</TableCell>
                <TableCell>{format(diff)}</TableCell>
                <TableCell>{format(prod)}</TableCell>
                <TableCell>{format(quot)}</TableCell>
                <TableCell>{format(avg)}</TableCell>
                <TableCell>
                  {pct === null ? "–" : `${pct.toFixed(2)}%`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
