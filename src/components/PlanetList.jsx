import React, { useEffect, useState } from "react";
import "./PlanetList.css";
import PlanetBackground from './Planetbackground';
const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await fetch(
          "https://anurella.github.io/json/planets.json"
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setPlanets(data);
      } catch (err) {
        console.error("Error fetching planets:", err);
        setError("Failed to load planets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  if (loading) return <p>Loading planets...</p>;

  if (error) return <p className="error">{error}</p>;

  return (
    <section id="planets" className="planet-section">
      <PlanetBackground />
  <div className="planet-container">
      {planets.map((planet) => (
        <article key={planet.name} className="planet-card">
          <figure className="planet-figure">
            <img
              src={planet.image}
              alt={planet.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </figure>

          <h3>{planet.name}</h3>

          <p>
            Distance from sun:{" "}
            {planet.distance_from_sun || planet.distanceFromSun}
          </p>
        </article>
      ))}
    </div>
    </section>
  );
};

export default PlanetList;