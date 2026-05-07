const API_URL = "https://anurella.github.io/json/planets.json";

export const fetchPlanets = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch planet data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
  }
};