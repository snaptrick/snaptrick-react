import React, { useState } from "react";
import "./AddPlate.module.css"; // (optional) Create this CSS file for styling

const AddPlate = () => {
  // State for the form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [cookTime, setCookTime] = useState<number | string>("");
  const [servings, setServings] = useState<number | string>("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const plateData = {
      name,
      category,
      description,
      cook_time: cookTime,
      servings,
    };

    try {
      const response = await fetch("/api/plannedplates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plateData),
      });

      if (response.ok) {
        setMessage("Plate added successfully!");
        setName("");
        setCategory("");
        setDescription("");
        setCookTime("");
        setServings("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server");
    }
  };

  return (
    <div className="add-plate-container">
      <h2>Add a New Plate</h2>
      <form onSubmit={handleSubmit} className="add-plate-form">
        <div>
          <label htmlFor="name">Plate Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="cookTime">Cook Time (in minutes):</label>
          <input
            type="number"
            id="cookTime"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="servings">Servings:</label>
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Plate</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPlate;
