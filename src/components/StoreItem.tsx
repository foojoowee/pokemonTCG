
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProps = {
    id: number
    name: string
    price: number
    rarity: string
    imgUrl: string
}


export default function StoreItem({id, name, price, rarity, imgUrl}: StoreItemProps){
    const {
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        addToCart
    } = useShoppingCart()

    function getMidValue(pricesObject: any) {
        if (pricesObject && typeof pricesObject === "object") {
          for (const key in pricesObject) {
            if (pricesObject.hasOwnProperty(key) && pricesObject[key]["mid"]) {
              return pricesObject[key]["mid"];
            }
          }
        }
        return 0; 
      }

    const quantity = getItemQuantity(id);
    
    return(
        <div className="storeitem-container">
            <div className="storeitem-pic"><img src={imgUrl}></img></div>
            <div className="storeitem-name">{name}</div>
            <div className="storeitem-price-container">
            <div className="storeitem-price">{rarity}</div>
                    <div className="storeitem-price">${parseFloat(getMidValue(price)).toFixed(2)}</div>
                    <div className="storeitem-addcart-container">
                        <button className="addtocart-button" onClick={()=> addToCart(id)}>Add to Cart</button>
                        {quantity > 0 && (
                            <div className="storeitem-quantity">
                                <button onClick={() => decreaseQuantity(id)}> - </button>
                                <div>{quantity}</div>
                                <button onClick={() => increaseQuantity(id)}> + </button>
                                <div onClick={()=> removeFromCart(id)}>
                                    <i className="fa fa-trash w3 large"></i>
                                </div>
                            </div>
                        )
                        }
                    </div>
            </div>
        </div>
    )
}

