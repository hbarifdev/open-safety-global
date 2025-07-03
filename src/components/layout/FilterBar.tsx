interface FilterBarProps {
  total: number;
  viewLimit: number;
  sortBy: string;
  onChange: (newLimit: number, newSort: string) => void;
}

export default function FilterBar({
  total,
  viewLimit,
  sortBy,
  onChange,
}: FilterBarProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b text-sm">
      <p className="basis-[60%] sm:basis-auto">
        Showing {Math.min(viewLimit, total)} of {total} results
      </p>
      <div className="flex gap-4">
        <div>
          View:
          <select
            className="ml-1 border rounded px-2 py-1 text-xs"
            value={viewLimit}
            onChange={(e) => onChange(Number(e.target.value), sortBy)}
          >
            <option value={16}>16</option>
            <option value={32}>32</option>
            <option value={64}>64</option>
          </select>
        </div>
        <div>
          Sort by:
          <select
            className="ml-1 border rounded px-2 py-1 text-xs"
            value={sortBy}
            onChange={(e) => onChange(viewLimit, e.target.value)}
          >
            <option value="Name">Name</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
