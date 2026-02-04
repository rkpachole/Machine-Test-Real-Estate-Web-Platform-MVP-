import { useContext } from "react";
import { PropertyContext } from "../../context/PropertyContext";
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

const BuyerDashboard = () => {
  const { favorites, appointments } = useContext(PropertyContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Buyer Dashboard</h2>

      {/* ================= SAVED PROPERTIES TABLE ================= */}
      <h3>Saved Properties</h3>

      {favorites.length === 0 ? (
        <p>No saved properties</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>#</th>
              <th>Property Name</th>
              <th>Location</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((property, index) => (
              <tr key={property.id}>
                <td>{index + 1}</td>
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>{property.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />

      {/* ================= APPOINTMENTS TABLE ================= */}
      <h3>Scheduled Appointments</h3>

      {appointments.length === 0 ? (
        <p>No appointments scheduled</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>#</th>
              <th>Property</th>
              <th>Visit Date</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>{appointment.propertyTitle}</td>
                
                <td>{formatDate(appointment.visitDate)}</td>

                <td>{appointment.type || "Site Visit"}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BuyerDashboard;
