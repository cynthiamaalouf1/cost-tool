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
  x: number; // العرض
  y: number; // العلو
}

const COLUMN_TITLES = {
  x: "العرض (X)",
  y: "العلو (Y)",
  sekeh: "سيكه (X - 3.2)",
  ka3eb: "كعب ((X + 0.6) ÷ 2)",
  janeb: "جانب (Y + 5)",
  changalMaskeh: "شنجل + ماسكه ((جانب - 11) + 2.5)",
  menkhoulArd: "منخول عرض (((X - 3.2 + 0.6) ÷ 2) + 2)",
  menkhoul3low: "منخول علو (شنجل + ماسكه + 1.8)",
  zoujajArd: "زجاج عرض (كعب - 7.5)",
  zoujaj3low: "زجاج علو (شنجل + ماسكه - 8.5)",
} as const;

const getInitialRows = (): Row[] =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    x: 0,
    y: 0,
  }));

export const ArabicExcelTable: React.FC = () => {
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
    num === null ? "–" : num.toFixed(2);

  const addRow = () => {
    const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows((prev) => [...prev, { id: nextId, x: 0, y: 0 }]);
  };

  const resetRows = () => setRows(getInitialRows());

  return (
    <div dir="rtl" className="p-4">
      <div className="flex space-x-2 mb-4 justify-end">
        <Button onClick={addRow}>➕ إضافة صف</Button>
        <Button variant="outline" onClick={resetRows}>
          🔄 إعادة تعيين
        </Button>
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">{COLUMN_TITLES.x}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.y}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.sekeh}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.ka3eb}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.janeb}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.changalMaskeh}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.menkhoulArd}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.menkhoul3low}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.zoujajArd}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.zoujaj3low}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const { x, y } = row;

            // ✅ الحسابات
            const sekeh = x - 3.2;
            const ka3eb = (x + 0.6) / 2;
            const janeb = y + 5;
            const changalMaskeh = (janeb - 11) + 2.5;
            const menkhoulArd = ((x - 3.2 + 0.6) / 2) + 2;
            const menkhoul3low = changalMaskeh + 1.8;
            const zoujajArd = ka3eb - 7.5;
            const zoujaj3low = changalMaskeh - 8.5;

            return (
              <TableRow key={row.id}>
                <TableCell className="w-20">
                  <Input
                    type="number"
                    value={x}
                    onFocus={(e) => e.currentTarget.select()}
                    onChange={(e) => handleChange(row.id, "x", e.currentTarget.value)}
                  />
                </TableCell>
                <TableCell className="w-20">
                  <Input
                    type="number"
                    value={y}
                    onFocus={(e) => e.currentTarget.select()}
                    onChange={(e) => handleChange(row.id, "y", e.currentTarget.value)}
                  />
                </TableCell>
                <TableCell>{format(sekeh)}</TableCell>
                <TableCell>{format(ka3eb)}</TableCell>
                <TableCell>{format(janeb)}</TableCell>
                <TableCell>{format(changalMaskeh)}</TableCell>
                <TableCell>{format(menkhoulArd)}</TableCell>
                <TableCell>{format(menkhoul3low)}</TableCell>
                <TableCell>{format(zoujajArd)}</TableCell>
                <TableCell>{format(zoujaj3low)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
