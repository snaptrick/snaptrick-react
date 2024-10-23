import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card"; // Import TinderCard for swipe functionality

type Dish = {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  cook_time: number;
  servings: number;
  steps: string[]; // Array of steps
  equipment: string[]; // Array of equipment
  tags: string[]; // Array of tags
};

const SwipeDishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);

  // Fetch dishes from the API
  const fetchDishes = async () => {
    try {
      const response = await fetch("/api/plannedplates");
      const data = await response.json();

      // Parse the JSON strings for steps, equipment, and tags
      const parsedDishes = data.map((dish: any) => ({
        ...dish,
        steps: dish.steps || [], // No need for JSON.parse, they are already arrays
        equipment: dish.equipment || [], // No need for JSON.parse
        tags: dish.tags || [], // No need for JSON.parse
      }));

      setDishes(parsedDishes);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  // Fetch initial dishes on component mount
  useEffect(() => {
    fetchDishes();
  }, []);

  // Handle when a card is swiped
  const handleSwipe = (direction: string, dish: Dish) => {
    if (direction === "right") {
      // If user swipes right, select the dish
      setSelectedDishes((prevSelected) => [...prevSelected, dish]);
    }

    // Remove the swiped dish from the array
    setDishes((prevDishes) => prevDishes.filter((d) => d.id !== dish.id));

    // Fetch more dishes if fewer than 3 are left
    if (dishes.length < 3) {
      fetchDishes();
    }
  };

  // Render a message when 3 dishes are selected
  if (selectedDishes.length === 3) {
    return (
      <div>
        <h2>You have selected 3 dishes!</h2>
        <ul>
          {selectedDishes.map((dish) => (
            <li key={dish.id}>{dish.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>Swipe to Choose Your Dishes</h2>
      <div className="cardContainer">
        {dishes.map((dish) => (
          <TinderCard
            key={dish.id}
            onSwipe={(dir) => handleSwipe(dir, dish)}
            className="swipe"
            preventSwipe={["up", "down"]}
          >
            <div className="dishCard">
              {/* Handle missing image URLs with a fallback */}
              <img
                src={dish.image_url || "https://via.placeholder.com/300"}
                alt={dish.name}
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/300"; // Fallback image
                }}
              />
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <p>Cook Time: {dish.cook_time} mins</p>
              <p>Servings: {dish.servings}</p>
              {/* Display tags and equipment */}
              <p>Tags: {dish.tags.join(", ")}</p>
              <p>Equipment: {dish.equipment.join(", ")}</p>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default SwipeDishes;
