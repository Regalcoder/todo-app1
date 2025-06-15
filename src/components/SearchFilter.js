const SearchFilter = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search todos"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filter todos by status"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default SearchFilter;