import React from "react";
import SwipeDishes from "../components/SwipeDishes";
import AddPlate from "../components/AddPlate";

const PlannedPlates: React.FC = () => {
  return (
    <div>
      <h2>Planned Plates</h2>
      <SwipeDishes />
      <AddPlate />
    </div>
  );
};

export default PlannedPlates;
