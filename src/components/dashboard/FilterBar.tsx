import { Search, Filter, Download, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filters?: {
    name: string;
    options: FilterOption[];
    onChange?: (value: string) => void;
  }[];
  showExport?: boolean;
  onExport?: () => void;
  showAdd?: boolean;
  addLabel?: string;
  onAdd?: () => void;
}

export const FilterBar = ({
  searchPlaceholder = "Search...",
  onSearchChange,
  filters = [],
  showExport = false,
  onExport,
  showAdd = false,
  addLabel = "Add New",
  onAdd,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-10 bg-secondary/50 border-border/50"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {filters.map((filter, idx) => (
          <Select key={idx} onValueChange={filter.onChange}>
            <SelectTrigger className="w-40 bg-secondary/50 border-border/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={filter.name} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {/* Export Button */}
        {showExport && (
          <Button variant="outline" onClick={onExport} className="border-border/50">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        )}

        {/* Add Button */}
        {showAdd && (
          <Button onClick={onAdd} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            {addLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
