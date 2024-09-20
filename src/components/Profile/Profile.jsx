import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({weatherData, onCardClick, clothingItems}) {
    return(
        <div className="profile">
            <section className="profile__sidebar">
                <Sidebar />
            </section>
            <section className="profile__clothes-section">
                <ClothesSection 
                weatherData={weatherData} 
                onCardClick={onCardClick} 
                clothingItems={clothingItems} />
            </section>
        </div>
    );
}

export default Profile;