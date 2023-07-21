import { useShoppingCart } from "../context/ShoppingCartContext";

type NewCartItemProps = {
    id: string
    name: string
    imgUrl: string
    price: number
    quantity: number
}

export default function NewCartItem({id, name, imgUrl, price, quantity}: NewCartItemProps){
    const {removeFromUpdatedCart} = useShoppingCart()
    return(
        <>
        {quantity > 0 && (
            <div className="cartitem-container">
                <img src={imgUrl}/>
                <div className="cartitem-subcontainer">
                    <div className="cartitem-name">{name} <span>x{quantity}</span></div>
                    <div className="cartitem-subcontainer2">
                        <div className="cartitem-price">${(price*quantity).toFixed(2)}</div>
                        <div className="cartitem-remove" onClick={()=> removeFromUpdatedCart(id)}><i className="fa fa-trash w3 xxlarge"></i></div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}