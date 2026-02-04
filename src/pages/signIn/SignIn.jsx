import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    if (!role) {
      alert("Please select a role");
      return;
    }

    const mockUser = {
      name: `${role} User`,
      email: `${role}@gmail.com`,
      role,
      isAuthenticated: true,
     isRegisteredSeller: role === "seller" ? false : true
    };

    login(mockUser);

    if (role === "buyer") navigate("/buyer");
    if (role === "seller") navigate("/seller");
    if (role === "admin") navigate("/admin");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <select
          style={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

        <button style={styles.button} onClick={handleGoogleLogin}>
          Login with Google (Mock)
        </button>
      </div>
    </div>
  );
};

/* ADD THIS */
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5"
  },
  card: {
    padding: "30px",
    background: "#fff",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4285F4",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default SignIn;
