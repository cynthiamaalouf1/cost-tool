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
  x: number; // العرض
  y: number; // العلو
}

const COLUMN_TITLES = {
  x: "العرض",
  y: "العلو",
  sekeh: "٣٫٢ - سيكه",
  ka3eb: "٢ / ٠٫٦ + كعب",
  janeb: "٥ + جانب",
  changalMaskeh: "١٠٫٩ - شنجل + ماسكه",
  adapter: "٢٫٥ + أدابتر",
  menkhoulArd: "٢ + منخول عرض",
  menkhoul3low: "١٫٨ + منخول علو",
  zoujajArd: "٧٫٥ - زجاج عرض",
  zoujaj3low: "٨٫٥ - زجاج علو",
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
            <TableHead className="text-center">{COLUMN_TITLES.adapter}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.menkhoulArd}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.menkhoul3low}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.zoujajArd}</TableHead>
            <TableHead className="text-center">{COLUMN_TITLES.zoujaj3low}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const { x, y } = row;

            const sekeh = x - 3.2;
            const ka3eb = ((x + 0.6) / 2);
            const janeb = y + 5;
            const changalMaskeh = janeb - 10.9;
            const adapter = changalMaskeh + 2.5;
            const menkhoulArd = ka3eb + 2;
            const menkhoul3low = changalMaskeh + 1.8;
            const zoujajArd = ka3eb - 7.5;
            const zoujaj3low = changalMaskeh - 8.5;

            const showValues = x !== 0 || y !== 0;

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
                <TableCell>{showValues ? format(sekeh) : ""}</TableCell>
                <TableCell>{showValues ? format(ka3eb) : ""}</TableCell>
                <TableCell>{showValues ? format(janeb) : ""}</TableCell>
                <TableCell>{showValues ? format(changalMaskeh) : ""}</TableCell>
                <TableCell>{showValues ? format(adapter) : ""}</TableCell>
                <TableCell>{showValues ? format(menkhoulArd) : ""}</TableCell>
                <TableCell>{showValues ? format(menkhoul3low) : ""}</TableCell>
                <TableCell>{showValues ? format(zoujajArd) : ""}</TableCell>
                <TableCell>{showValues ? format(zoujaj3low) : ""}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
