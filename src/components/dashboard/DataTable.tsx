import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id?: string | number }>({ 
  columns, 
  data, 
  onRowClick,
  emptyMessage = "No data available"
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="glass rounded-xl border border-border/50 p-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            {columns.map((column) => (
              <TableHead 
                key={String(column.key)} 
                className={cn("text-muted-foreground font-medium", column.className)}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow 
              key={item.id ?? idx}
              className={cn(
                "border-border/50",
                onRowClick && "cursor-pointer hover:bg-secondary/50"
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <TableCell key={String(column.key)} className={column.className}>
                  {column.render 
                    ? column.render(item) 
                    : String(item[column.key as keyof T] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Status badge helper
export const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, "emerald" | "amber" | "rose" | "cyan" | "violet" | "glass"> = {
    active: "emerald",
    pending: "amber",
    inactive: "rose",
    completed: "cyan",
    draft: "glass",
  };

  return (
    <Badge variant={variants[status.toLowerCase()] || "glass"}>
      {status}
    </Badge>
  );
};
