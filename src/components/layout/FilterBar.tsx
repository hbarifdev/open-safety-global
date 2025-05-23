export default function FilterBar() {
  return (
    <div className="flex justify-between items-center p-4 border-b text-sm">
      <p>Showing 1 - 16 of 3 results</p>
      <div className="flex gap-4">
        <div>
          View: 
          <select className="ml-1 border rounded px-2 py-1 text-xs">
            <option>16</option>
            <option>32</option>
            <option>64</option>
          </select>
        </div>
        <div>
          Sort by: 
          <select className="ml-1 border rounded px-2 py-1 text-xs">
            <option>Name</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
