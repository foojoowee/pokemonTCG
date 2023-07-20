import closeIcon from "../assets/close-icon.png"
import { useShoppingCart } from "../context/ShoppingCartContext"
import CartItem from "./CartItem"

export default function ShoppingCart(){
    const {toggleCart, cartOpen, checkoutTotal, updatedCartItems} = useShoppingCart()
    function printCart(){
        console.log(updatedCartItems)
    }
    return(
        <>
            {
                <div className={`shoppingcart-container ${cartOpen ? "slide-in" : "slide-out"}`}>
                <div className="shoppingcart-header">
                    <div className="shoppingcart-title">YOUR CART</div>
                    <div className="shoppingcart-close" onClick={toggleCart}>
                        <img src={closeIcon} alt="" />
                    </div>
                </div>
                <div className="shoppingcart-items">
                    {updatedCartItems.map(item => 
                        <div>
                            <CartItem
                                id = {item.id}
                                quantity = {item.quantity}
                            />
                        </div>
                    )}
                </div>
                <div className="shoppingcart-grand-total">
                    Shopping Total : ${checkoutTotal().toFixed(2)}
                </div>
                <div className="shoppingcart-checkout" onClick={printCart}>
                    <button>Checkout</button>
                </div>
            </div>

            }

        </>
    )
}