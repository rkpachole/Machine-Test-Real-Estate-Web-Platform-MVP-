import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const {
    id,
    name,
    price,
    city,
    locality,
    config,
    premium,
  } = property;

  return (
    <article className="property-card">
      {premium && <span className="badge">Premium</span>}

      <h3 className="title">{name}</h3>

      <p className="location">
        {locality}, {city}
      </p>

      <p className="config">{config}</p>

      <p className="price">₹ {price.toLocaleString()}</p>

      <Link to={`/property/${id}`} className="btn">
        View Details
      </Link>
    </article>
  );
};

export default PropertyCard;
