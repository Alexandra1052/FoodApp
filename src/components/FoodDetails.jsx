import styles from "./fooddetails.module.css";
import { useEffect } from "react";
import { useState } from "react";
import ItemList from "./ItemList";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "589f7d655b0d4490b8f454949401655f";

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>

        <img className={styles.recipeImage} src={food.image}></img>

        <div className={styles.recipeDetails}>
            <li>
            <span>
            <strong>{food.readyInMinutes} Minutes </strong>
          </span> </li> 
          <li>
          <span>
            <strong>{food.vegetarian ? "Vegetarian" : "Non_Vegetarian"}</strong>
          </span>
          </li>
         <li>
         <span>
            <strong> Serves {food.servings} </strong>
          </span>
         </li>
         <li>
         <span>
            <strong>{food.vegan ? "Vegan" : "Non_Vegan"}</strong>
          </span>
         </li>
         
            
         
        </div>
        <div>
          <span> $ {food.pricePerServing / 100} per serving</span>
        </div>
      </div>

      <div>
        <ItemList food={food} isLoading={isLoading}/>
        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
