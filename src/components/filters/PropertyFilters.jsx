import { useState } from "react";

const PropertyFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: "",
    config: "",
    minPrice: "",
    maxPrice: "",
    possession: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value)
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    onFilterChange?.({
      ...filters,
      [name]: value,
    });
  };

  return (
    <section className="filters">
      {/* Location Search */}
      <input
        type="text"
        name="location"
        placeholder="City / Locality / State"
        value={filters.location}
        onChange={handleChange}
      />

      {/* Configuration */}
      <select
        name="config"
        value={filters.config}
        onChange={handleChange}
      >
        <option value="">All Configurations</option>
        <option value="1BHK">1 BHK</option>
        <option value="2BHK">2 BHK</option>
        <option value="3BHK">3 BHK</option>
      </select>

      {/* Budget */}
      <input
        type="number"
        name="minPrice"
        placeholder="Min Budget"
        value={filters.minPrice}
        onChange={handleChange}
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max Budget"
        value={filters.maxPrice}
        onChange={handleChange}
      />

      {/* Possession */}
      <select
        name="possession"
        value={filters.possession}
        onChange={handleChange}
      >
        <option value="">Any Possession</option>
        <option value="Ready">Ready</option>
        <option value="6 Months">6 Months</option>
        <option value="1 Year">1 Year</option>
      </select>
    </section>
  );
};

export default PropertyFilters;
