import { createContext, useState } from "react";
import { propertiesJSON } from "../data/properties.mock";
import { appointmentsJSON } from "../data/appointments.mock";

export const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  // =========================
  // GLOBAL STATE
  // =========================
  const [properties, setProperties] = useState(propertiesJSON);
  const [appointments, setAppointments] = useState(appointmentsJSON);
  const [favorites, setFavorites] = useState([]);

  // =========================
  // SELLER ACTIONS
  // =========================

  // Add new property (Seller)
  const addProperty = (property,sellerId) => {
    const newProperty = {
      ...property,
      id: Date.now(),
      sellerId,
      status: "pending", // Admin approval required
      createdAt: new Date().toISOString()
    };

    setProperties((prev) => [...prev, newProperty]);
  };

  // =========================
  // ADMIN ACTIONS
  // =========================

  // Approve / Reject property
  const updatePropertyStatus = (propertyId, status) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? { ...property, status }
          : property
      )
    );
  };

  // =========================
  // BUYER ACTIONS
  // =========================

  // Save property as favorite
  const addToFavorites = (property) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === property.id);
      return exists ? prev : [...prev, property];
    });
  };

  // Remove favorite
  const removeFromFavorites = (propertyId) => {
    setFavorites((prev) =>
      prev.filter((p) => p.id !== propertyId)
    );
  };

  // Schedule appointment (video call / site visit)
  const scheduleAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      status: "scheduled"
    };

    setAppointments((prev) => [...prev, newAppointment]);
  };

  // =========================
  // CONTEXT VALUE
  // =========================
  return (
    <PropertyContext.Provider
      value={{
        // State
        properties,
        appointments,
        favorites,

        // Actions
        addProperty,
        updatePropertyStatus,
        addToFavorites,
        removeFromFavorites,
        scheduleAppointment
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyProvider;
