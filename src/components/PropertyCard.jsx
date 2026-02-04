import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";
import "./PropertyCard.css";
const PropertyCard = ({ property }) => {
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    scheduleAppointment,
  } = useContext(PropertyContext);

  const [date, setDate] = useState(""); // for dynamic scheduling

  // Check if this property is already a favorite
  const isFavorite = favorites.some((fav) => fav.id === property.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  const handleSchedule = () => {
    if (!date) {
      alert("Please select a date first!");
      return;
    }

    scheduleAppointment({
  propertyId: property.id,
  propertyTitle: property.title,
  visitDate: date,
  type: "site-visit"
});


    alert(`Appointment scheduled for ${date}`);
    setDate(""); // reset input
  };

  return (
    <div className="property-card">
      <img src={property.image || "/placeholder.png"} alt={property.title} />
{property.isPremium && (
  <span className="premium-badge">Premium</span>
)}

      <div className="card-body">
        <h3>{property.title}</h3>
        <p>{property.location}</p>
        <p>Configuration: {property.config}</p>
        <p>Possession: {property.possession}</p>
        <p>Status: {property.status}</p>

        <Link to={`/property/${property.id}`}>
        <button className="details-btn">View Details</button>
      </Link>

        {/* Heart Icon */}
         <i
          className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"}`}
          style={{ fontSize: "1.5rem", cursor: "pointer", marginLeft: "10px" }}
          onClick={toggleFavorite}
        ></i>

        {/* Dynamic Schedule Appointment */}
        <div className="schedule-visit">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // only future dates
          />
          <button onClick={handleSchedule}> Schedule Visit</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
