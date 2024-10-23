import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card"; // Import TinderCard for swipe functionality
import styles from "./SwipeDishes.module.css"; // We will add custom styles

type Dish = {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  cook_time: number;
  servings: number;
  steps: string[];
  equipment: string[];
  tags: string[];
};

const SwipeDishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);

  // Fetch dishes from the API
  const fetchDishes = async () => {
    try {
      const response = await fetch("/api/plannedplates");
      const data = await response.json();

      console.log("Fetched dishes data:", data); // <-- Add this log

      const parsedDishes = data.map((dish: any) => ({
        ...dish,
        steps: JSON.parse(dish.steps),
        equipment: JSON.parse(dish.equipment),
        tags: JSON.parse(dish.tags),
      }));

      console.log("Parsed dishes:", parsedDishes); // <-- Add this log

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
      <div className={styles.selectedDishesContainer}>
        <h2>You have selected 3 dishes!</h2>
        <ul className={styles.selectedDishesList}>
          {selectedDishes.map((dish) => (
            <li key={dish.id}>{dish.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.title}>Swipe to Choose Your Dishes</h2>
      <div className={styles.cardContainer}>
        {dishes.map((dish) => (
          <TinderCard
            key={dish.id}
            onSwipe={(dir) => handleSwipe(dir, dish)}
            className={styles.swipe}
            preventSwipe={["up", "down"]}
          >
            <div className={styles.dishCard}>
              <img
                src={dish.image_url || "https://via.placeholder.com/300"}
                alt={dish.name}
                className={styles.dishImage}
              />
              <h3 className={styles.dishTitle}>{dish.name}</h3>
              <p className={styles.dishDescription}>{dish.description}</p>
              <p className={styles.cookTime}>
                Cook Time: {dish.cook_time} mins
              </p>
              <p className={styles.servings}>Servings: {dish.servings}</p>
              <p className={styles.tags}>Tags: {dish.tags.join(", ")}</p>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default SwipeDishes;
