import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export function AggregatedTable() {
  const [rows, setRows] = useState([
    { id: 1, value1: 0, value2: 0 },
    { id: 2, value1: 0, value2: 0 },
    { id: 3, value1: 0, value2: 0 },
  ]);

  const handleChange = (id, field, raw) => {
    const parsed = parseFloat(raw);
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [field]: isNaN(parsed) ? 0 : parsed } : row
      )
    );
  };

  const format = (num) => (num === null ? "–" : num.toFixed(2));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Value 1</TableHead>
          <TableHead>Value 2</TableHead>
          <TableHead>Sum</TableHead>
          <TableHead>Difference</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quotient</TableHead>
          <TableHead>Average</TableHead>
          <TableHead>Pct (v1/v2)</TableHead>
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
              <TableCell>
                <Input
                  type="number"
                  value={value1}
                  onChange={(e) =>
                    handleChange(row.id, "value1", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={value2}
                  onChange={(e) =>
                    handleChange(row.id, "value2", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>{format(sum)}</TableCell>
              <TableCell>{format(diff)}</TableCell>
              <TableCell>{format(prod)}</TableCell>
              <TableCell>{format(quot)}</TableCell>
              <TableCell>{format(avg)}</TableCell>
              <TableCell>{pct === null ? "–" : `${pct.toFixed(2)}%`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
