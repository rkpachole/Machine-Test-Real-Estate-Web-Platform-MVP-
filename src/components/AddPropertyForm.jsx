import { useState, useContext } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { AuthContext } from "../context/AuthContext";

const AddPropertyForm = () => {
  const { addProperty } = useContext(PropertyContext);
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    price: "",
    city: "",
    locality: "",
    state: "",
    config: "2BHK",
    possession: "Ready",
    amenities: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAmenities = (e) => {
    const value = e.target.value;
    setForm((prev) =>
      prev.amenities.includes(value)
        ? { ...prev, amenities: prev.amenities.filter(a => a !== value) }
        : { ...prev, amenities: [...prev.amenities, value] }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(form, user.id);
    alert("Property added (Pending approval)");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Property</h3>

      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="price" placeholder="Price" onChange={handleChange} required />
      <input name="city" placeholder="City" onChange={handleChange} required />
      <input name="locality" placeholder="Locality" onChange={handleChange} required />
      <input name="state" placeholder="State" onChange={handleChange} required />

      <select name="config" onChange={handleChange}>
        <option>1BHK</option>
        <option>2BHK</option>
        <option>3BHK</option>
      </select>

      <select name="possession" onChange={handleChange}>
        <option>Ready</option>
        <option>Under Construction</option>
      </select>

      <label>
        <input type="checkbox" value="Lift" onChange={handleAmenities} /> Lift
      </label>
      <label>
        <input type="checkbox" value="Parking" onChange={handleAmenities} /> Parking
      </label>

      <br /><br />
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddPropertyForm;
