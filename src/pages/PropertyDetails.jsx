import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { PropertyContext } from "../context/PropertyContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
const [appointmentType, setAppointmentType] = useState("site");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const {
    properties,
    favorites,
    addToFavorites,
    removeFromFavorites,
    scheduleAppointment
  } = useContext(PropertyContext);

  

  const property = properties.find(p => p.id === Number(id));

  if (!property) return <h2>Property not found</h2>;

  const isFavorite = favorites.some(p => p.id === property.id);

  // ==========================
  // APPOINTMENT HANDLER
  // ==========================
  const handleSchedule = () => {
    if (!date || !time) {
      alert("Please select date & time");
      return;
    }

    scheduleAppointment({
      propertyId: property.id,
      propertyTitle: property.title,
      type: appointmentType,
      date,
      time
    });

    alert("Appointment scheduled successfully");
    setShowConfirmation(true);
    setDate("");
    setTime("");
  };

  return (
    <div className="property-details">
      
      <h1>{property.title}</h1>

      <h2>₹ {property.price.toLocaleString()}</h2>

      <p>
        <strong>Location:</strong>{" "}
        {property.locality}, {property.city}, {property.state}
      </p>

      <p><strong>Configuration:</strong> {property.config}</p>
      <p><strong>Possession:</strong> {property.possession}</p>
      

      {/* ================= AMENITIES ================= */}
      <h3>Amenities</h3>
      <ul>
        {property.amenities.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>

      {/* ================= VIDEOS ================= */}
      <h3>Sample Flat Video</h3>
      <div className="video-box">Video Placeholder</div>

      <h3>Building & Locality Video</h3>
      <div className="video-box">Video Placeholder</div>

      {/* ================= FAVORITE ================= */}
      <button
        className="favorite-btn"
        onClick={() =>
          isFavorite
            ? removeFromFavorites(property.id)
            : addToFavorites(property)
        }
      >
        <i
          className={`bi ${
            isFavorite ? "bi-heart-fill text-danger" : "bi-heart"
          }`}
        ></i>
        {isFavorite ? " Saved" : " Save"}
      </button>

      {/* ================= APPOINTMENT ================= */}
      <h3>Schedule Appointment</h3>

      <select
        value={appointmentType}
        onChange={(e) => setAppointmentType(e.target.value)}
      >
        <option value="site">Site Visit</option>
        <option value="video">Video Call</option>
      </select>

      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSchedule}>
       Confirm Appointment
      </button>

      <br /><br />

      {/* ================= PHONE ================= */}
      <a href="tel:9876543210" className="call-link">
  <i className="bi bi-telephone-fill"></i> Call Seller
</a>

    </div>
  );
};

export default PropertyDetails;
