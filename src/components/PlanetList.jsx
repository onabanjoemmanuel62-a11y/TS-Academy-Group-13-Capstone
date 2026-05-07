import React, { useEffect, useState } from "react";
import "./PlanetList.css"; // optional but recommended if mockup has styling

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await fetch(
          "https://anurella.github.io/json/planets.json"
        );
        const data = await res.json();
        setPlanets(data);
      } catch (err) {
        console.error("Error fetching planets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  if (loading) return <p>Loading planets...</p>;

  return (
    <section className="planet-container">
      {planets.map((planet, index) => (
        <article key={index} className="planet-card">

          <figure className="planet-figure">
            <img src={planet.image} alt={planet.name} />
          </figure>

          <h3>{planet.name}</h3>

          <p>
            Distance from sun: {planet.distance_from_sun || planet.distanceFromSun}
          </p>

        </article>
      ))}
    </section>
  );
};

export default PlanetList;