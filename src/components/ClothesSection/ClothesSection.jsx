import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext"; 

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter((item) => item.owner === currentUser?._id);
//todo get the items to render on the profile and make a sign out button and make sure the delete button pops up for the owner
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button
          className="clothes-section__button"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
