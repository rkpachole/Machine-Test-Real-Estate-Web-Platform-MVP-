import { useContext } from "react";
import { PropertyContext } from "../../context/PropertyContext";
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};
const AdminPanel = () => {
  const {
    properties,
    appointments,
    updatePropertyStatus
  } = useContext(PropertyContext);
console.log("appointments",appointments)
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>

      {/* =======================
          PROPERTY LISTINGS
      ======================= */}
      <section>
        <h2>Property Listings</h2>

        {properties.length === 0 && <p>No properties found.</p>}

        {properties.map((property) => (
          <div key={property.id} style={styles.card}>
            <h3>{property.title}</h3>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Price:</strong> ₹{property.price}</p>
            <p><strong>Status:</strong> {property.status}</p>
            <p><strong>Premium:</strong> {property.isPremium ? "Yes" : "No"}</p>

            {property.status === "pending" && (
              <div>
                <button
                  style={styles.approve}
                  onClick={() =>
                    updatePropertyStatus(property.id, "approved")
                  }
                >
                  Approve
                </button>

                <button
                  style={styles.reject}
                  onClick={() =>
                    updatePropertyStatus(property.id, "rejected")
                  }
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* =======================
          APPOINTMENTS
      ======================= */}
      <section>
        <h2>Scheduled Appointments</h2>

        {appointments.length === 0 && (
          <p>No appointments scheduled.</p>
        )}

        {appointments.map((a) => (
          <div key={a.id} style={styles.card}>
            <p><strong>Property:</strong> {a.propertyTitle}</p>
            <p><strong>Type:</strong> {a.type}</p>
            <p><strong>Date:</strong> {a.visitDate}</p>
            <p><strong>Status:</strong> {a.status}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "6px"
  },
  approve: {
    background: "green",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    marginRight: "10px",
    cursor: "pointer"
  },
  reject: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer"
  }
};

export default AdminPanel;
