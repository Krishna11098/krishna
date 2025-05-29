import { useState } from "react";

export default function RateTester() {
  const [formData, setFormData] = useState({
    origin: "JAKARTA",
    destination: "BANDUNG",
    weight: 1,
    width: 10,
    height: 10,
    length: 10,
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResults(data.rates);
    } catch (err) {
      console.error("Error fetching rates", err);
      alert("Error fetching rates. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>📦 Shipping Rate Tester</h1>
      <form onSubmit={handleSubmit}>
        <label>Origin:</label>
        <input name="origin" value={formData.origin} onChange={handleChange} required />

        <label>Destination:</label>
        <input name="destination" value={formData.destination} onChange={handleChange} required />

        <label>Weight (kg):</label>
        <input name="weight" type="number" value={formData.weight} onChange={handleChange} required />

        <label>Width (cm):</label>
        <input name="width" type="number" value={formData.width} onChange={handleChange} required />

        <label>Height (cm):</label>
        <input name="height" type="number" value={formData.height} onChange={handleChange} required />

        <label>Length (cm):</label>
        <input name="length" type="number" value={formData.length} onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? "Getting Rates..." : "Fetch Shipping Rates"}
        </button>
      </form>

      {results.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Available Shipping Rates:</h3>
          <ul>
            {results.map((rate, index) => (
              <li key={index}>
                <strong>{rate.service_name}</strong> - {rate.total_price} {rate.currency}{" "}
                {rate.cod ? "(COD available)" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
