// superceded Code

import { useShoppingCart } from "../context/ShoppingCartContext";

type CartItemProps = {
    id: string
    quantity: number
}

export default function CartItem({id, quantity}: CartItemProps){
    const {removeFromUpdatedCart, calledData} = useShoppingCart()
    const item = calledData.find((i: any) => i.id === id)
    if (item == null) return null
    return(
        <>
        {quantity > 0 && (
            <div className="cartitem-container">
                <img src={item.images.small}/>
                <div className="cartitem-subcontainer">
                    <div className="cartitem-name">{item.name} <span>x{quantity}</span></div>
                    <div className="cartitem-subcontainer2">
                        <div className="cartitem-price">${(item.hp*quantity).toFixed(2)}</div>
                        <div className="cartitem-remove" onClick={()=> removeFromUpdatedCart(id)}><i className="fa fa-trash w3 xxlarge"></i></div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}