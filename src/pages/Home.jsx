import { useState } from "react";
import {useNavigate} from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/filters/PropertyFilters";
import MapView from "../components/map/MapView";
import { propertiesJSON as mockProperties } from "../data/properties.mock";
import './Home.css';

const Home = () => {
  const [view, setView] = useState("list");
  const [filtered, setFiltered] = useState(mockProperties.filter(p => p.status === "approved")) // only approved initially);
const navigate = useNavigate();
  const handleFilterChange = (filters) => {
    const result = mockProperties.filter((p) => {
      const matchLocation =
        !filters.location ||
        `${p.city} ${p.locality} ${p.state}`
          .toLowerCase()
          .includes(filters.location.toLowerCase());

      const matchConfig =
        !filters.config || p.config === filters.config;

      const matchMin =
        !filters.minPrice || p.price >= Number(filters.minPrice);

      const matchMax =
        !filters.maxPrice || p.price <= Number(filters.maxPrice);

      const matchPossession =
        !filters.possession || p.possession === filters.possession;
const matchStatus = p.status === "approved";
      return (
        matchLocation &&
        matchConfig &&
        matchMin &&
        matchMax &&
        matchPossession &&
        matchStatus
      );
    });

    setFiltered(result);
  };

  return (
    <div className="home-container">
    <button onClick={() => navigate(-1)}>Back</button>
         <h1>Find Your Dream Property</h1>
      <p>Search and explore properties across India</p>
      <PropertyFilters onFilterChange={handleFilterChange} />

      <button onClick={() => setView(v => (v === "list" ? "map" : "list"))}>
        Toggle {view === "list" ? "Map" : "List"} View
      </button>

      {view === "map" ? (
        <MapView />
      ) : (
        <div className="grid">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
