import Item from "./Item";

export default function ItemList({food,isLoading}){
    return <div>
         <h2>Ingredients</h2>
        {isLoading ? <p>
            Loading...
        </p> : 
            ( food.extendedIngredients.map((item) => (
                <Item item={item}/>
        
        )))
         
        }
       
    </div>
}