import { useState } from "react";

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  year: string;
  rating: string;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    year: "",
    rating: "",
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-panel bg-dark-100 p-4 rounded-lg mb-6">
      <h3 className="text-white font-bold mb-3">フィルター</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">公開年</label>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            className="w-full bg-gray-800 text-white rounded px-3 py-2"
          >
            <option value="">全て</option>
            <option value="2025">2025年</option>
            <option value="2024">2024年</option>
            <option value="2023">2023年</option>
            <option value="2022">2022年</option>
            <option value="2021">2021年</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">評価</label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
            className="w-full bg-gray-800 text-white rounded px-3 py-2"
          >
            <option value="">全て</option>
            <option value="8">8.0以上</option>
            <option value="7">7.0以上</option>
            <option value="6">6.0以上</option>
          </select>
        </div>
      </div>
    </div>
  );
}
