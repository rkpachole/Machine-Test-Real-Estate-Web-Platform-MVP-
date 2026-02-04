import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SellerRegister = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    paid: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.paid) {
      alert("Please complete the seller registration payment");
      return;
    }

    // Update logged-in seller as registered
    const updatedUser = {
      ...user,
      role: "seller",
      isRegisteredSeller: true,
      sellerProfile: {
        companyName: form.companyName,
        contactPerson: form.contactPerson,
        phone: form.phone
      }
    };

    login(updatedUser);
    alert("Seller registration successful!");
    navigate("/seller");
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2>Seller Registration</h2>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Complete registration to list properties
        </p>

        <input
          name="companyName"
          placeholder="Builder / Company Name"
          value={form.companyName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="contactPerson"
          placeholder="Contact Person Name"
          value={form.contactPerson}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="paid"
            checked={form.paid}
            onChange={handleChange}
          />
          &nbsp; Pay ₹1999 Seller Registration Fee (Mock)
        </label>

        <button
          type="submit"
          style={{
            ...styles.button,
            opacity: form.paid ? 1 : 0.6
          }}
          disabled={!form.paid}
        >
          Complete Registration
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f8"
  },
  card: {
    width: "360px",
    padding: "30px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px"
  },
  checkbox: {
    fontSize: "14px",
    marginBottom: "20px",
    display: "block"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default SellerRegister;
