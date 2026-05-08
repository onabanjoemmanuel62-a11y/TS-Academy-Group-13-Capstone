import React, { useEffect, useState } from "react";
import "./PlanetList.css";

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
          throw new Error("Failed to fetch planet data");
        }

        const data = await res.json();
        setPlanets(data);
      } catch (err) {
        console.error("Error fetching planets:", err);
        setError("Unable to load planet data at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  if (loading) {
    return <p>Loading planets...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* Planet Cards */}
      <section id="planets" className="planet-container">
        {planets.map((planet) => (
          <article
            key={planet.planet}
            className="planet-card"
          >
            <figure className="planet-figure">
              <img
                src={`https://anurella.github.io/json/${planet.image.replace(
                  "../",
                  ""
                )}`}
                alt={planet.planet || "Planet image"}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/150";
                }}
              />
            </figure>

            <h3>{planet.planet}</h3>

            <p>
              Distance from sun:{" "}
              {planet.distance_from_sun ||
                planet.distanceFromSun ||
                "N/A"}
            </p>
          </article>
        ))}
      </section>

      {/* Planetary Facts Table */}
      <section className="planet-table-section">
        <h2 className="planet-table-title">
          Planetary Facts at a Glance
        </h2>

        <p className="planet-table-subtitle">
          Below is a comparative table of major planets in our
          solar system. The data highlights key physical
          properties used by astronomers and researchers
          worldwide.
        </p>

        <table className="planet-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mass</th>
              <th>Diameter</th>
              <th>Density</th>
              <th>Gravity</th>
            </tr>
          </thead>

          <tbody>
            {planets.map((planet) => (
              <tr key={`${planet.planet}-table`}>
                <td>{planet.planet}</td>

                <td>{planet.mass || "N/A"}</td>

                <td>{planet.diameter || "N/A"}</td>

                <td>{planet.density || "N/A"}</td>

                <td>{planet.gravity || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default PlanetList;