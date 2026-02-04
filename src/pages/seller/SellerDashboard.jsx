import { useContext, useState } from "react";
import { PropertyContext } from "../../context/PropertyContext";
import { AuthContext } from "../../context/AuthContext";
import "./SellerDashboard.css";
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

const SellerDashboard = () => {
  const { properties, appointments, addProperty } = useContext(PropertyContext);
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    price: "",
    city: "",
    locality: "",
    state: "",
    config: "2BHK",
    possession: "Ready",
    videoUrl: "",
    isPremium:false
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(form, user.id);
    alert("Property submitted for admin approval");
    setForm({
      title: "",
      price: "",
      city: "",
      locality: "",
      state: "",
      config: "2BHK",
      possession: "Ready",
      videoUrl: "",
      isPremium: false
    });
  };

  const myProperties = properties.filter(
    (p) => p.sellerId === user.id
  );

  const myAppointments = appointments.filter(
    (a) => a.sellerId === user.id
  );

  return (
    <div className="seller-dashboard">
      <h2>Seller Dashboard</h2>

      {/* ADD PROPERTY */}
      <section className="card">
        <h3>Add New Property</h3>
        <form onSubmit={handleSubmit} className="form-grid">
  <input
    name="title"
    value={form.title}
    placeholder="Title"

    onChange={handleChange}
    required
  />

  <input
    name="price"
    value={form.price}
    placeholder="Price"
    onChange={handleChange}
    required
  />

  <input
    name="city"
    value={form.city}
    placeholder="City"
    onChange={handleChange}
    required
  />

  <input
    name="locality"
    value={form.locality}
    placeholder="Locality"
    onChange={handleChange}
    required
  />

  <input
    name="state"
    value={form.state}
    placeholder="State"
    onChange={handleChange}
    required
  />

  <select
    name="config"
    value={form.config}
    onChange={handleChange}
  >
    <option value="1BHK">1BHK</option>
    <option value="2BHK">2BHK</option>
    <option value="3BHK">3BHK</option>
  </select>

  <select
    name="possession"
    value={form.possession}
    onChange={handleChange}
  >
    <option value="Ready">Ready</option>
    <option value="Under Construction">Under Construction</option>
  </select>

  <input
    name="videoUrl"
    value={form.videoUrl}
    placeholder="Video URL (YouTube / Drive)"
    onChange={handleChange}
  />
<label style={{ gridColumn: "1 / -1" }}>
  <input
    type="checkbox"
    checked={form.isPremium}
    onChange={(e) =>
      setForm({ ...form, isPremium: e.target.checked })
    }
  />
  &nbsp; Make this a <strong>Premium Listing</strong> (₹999 – Mock)
</label>

  <button type="submit">Add Property</button>
</form>

      </section>

      {/* MY PROPERTIES */}
      <section className="card">
        <h3>My Properties</h3>
        {myProperties.length === 0 ? (
          <p>No properties added yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myProperties.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>₹ {p.price}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* BUYER APPOINTMENTS */}
      <section className="card">
        <h3>Buyer Appointments</h3>
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
      </section>
    </div>
  );
};

export default SellerDashboard;
