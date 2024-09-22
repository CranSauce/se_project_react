import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({onCardClick, clothingItems, handleAddClick}) {
  return (
    <div className="clothes-section">
     <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__button" type="button" onClick={handleAddClick}>+ Add New</button>
     </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
