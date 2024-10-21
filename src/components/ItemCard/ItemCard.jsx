import { useState, useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onLikeClick }) {
  const currentUser = useContext(CurrentUserContext); 
  const isAuthorized = !!currentUser; 
  const isItemLikedByUser = item.likes.some(id => id === currentUser?._id); 
  const [isLiked, setIsLiked] = useState(isItemLikedByUser); 

  const handleLikeClick = () => {
    onLikeClick(item._id, isItemLikedByUser)
      .then(() => {
        setIsLiked(!isLiked); 
      })
      .catch(err => console.error("Failed to update like status:", err));
  };

  

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__footer">
        {isAuthorized && ( 
          <button
            className={`card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`}
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
