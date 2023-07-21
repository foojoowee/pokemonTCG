import {useEffect, useState, useContext, createContext, ReactNode} from "react"
import { fetchData } from "../module/api"

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

type ShoppingCartContext = {
    getItemQuantity : (id: string) => number;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    addToCart: (id: string) => void;
    newAddToCart: (id: string, name: string, imgUrl: string, price: number) => void
    toggleCart: () => void;
    cartQuantity: number
    cartOpen: boolean;
    cartItems: CartItem[];
    newCartItem: NewCartItem[];
    checkoutTotal: () => number
    removeFromUpdatedCart: (id: string) => void;
    calledData: any
}

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: string
    quantity: number
}

type NewCartItem = {
    id: string
    name: string
    imgUrl: string
    price: number
    quantity: number
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps){

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [newCartItem, setNewCartItem] = useState<NewCartItem[]>([])
    const [cartOpen, setCartOpen] = useState(false)

    async function selectData(){
        try{
            const data: any = await fetchData("","base1");
            console.log(data)
            data.sort((a: any, b: any) => {
                const idA = parseInt(a.id.split("-")[1]);
                const idB = parseInt(b.id.split("-")[1]);
                return idA - idB;
            });
    
            for (let i = 0; i < data.length; i++) {
                // Your existing logic to render data
            }
            setCalledData(data)
        }catch (error) {
            console.error("Error fetching and rendering data:", error);
            return [];
    }}

    const [calledData, setCalledData] = useState([])

    useEffect(()=>{
        selectData()
    },[])

    // const [cartQuantity, setCartQuantity] = useState(0)

    const cartQuantity = newCartItem.reduce(
        (quantity, item)=> item.quantity + quantity,
        0
    )
        // setCartQuantity(cartQuantity)
    //     setUpdatedCartItems(cartItems)
    // }

    function checkoutTotal(){
        let total = 0
        if (newCartItem.length > 0){
            for (let i = 0; i < newCartItem.length; i++){
                total += newCartItem[i].price * newCartItem[i].quantity
            }
        }
        return total
    }

    
    function toggleCart(){
        setCartOpen((prevState) => !prevState)
        // console.log("Cart is" + cartOpen)
    }

    function addToCart(id: string) {
        setCartItems((currItems) => {
          if (currItems.find((item) => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }];
          } else {
            return [...currItems];
          }
        });
      }

    function newAddToCart(id: string, name: string, imgUrl: string, price: number){
    setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }];
        } else {
            return [...currItems];
        }
        });
    setNewCartItem((prevItems) => {
        if (prevItems.find((item) => item.id === id) == null) {
            return [...prevItems, { id, name, imgUrl, price, quantity: getItemQuantity(id)}];
        }else{
            return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + getItemQuantity(id) } : item
          );
        }
    })
    }

    function getItemQuantity(id: string){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseQuantity(id: string){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else{
                return currItems.map(item =>{
                    if (item.id === id ){
                        return {...item, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function decreaseQuantity(id: string){
        setCartItems(currItems => {
            if (currItems.find(item => item.id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else{
                return currItems.map(item =>{
                    if (item.id === id ){
                        return {...item, quantity: item.quantity - 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: string){
        setCartItems(currItems =>{
            if (currItems.find(item => item.id === id)){
                return currItems.filter(item => item.id !== id)
            } else{
                return [...currItems]
            }
        })
        setNewCartItem(currItems =>{
            if (currItems.find(item => item.id === id)){
                return currItems.filter(item => item.id !== id)
            } else{
                return [...currItems]
            }
        })
    }

    function removeFromUpdatedCart(id: string){
        setNewCartItem(currItems =>{
            if (currItems.find(item => item.id === id)){
                return currItems.filter(item => item.id !== id)
            } else{
                return [...currItems]
            }
        })
    }

    return(
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                addToCart,
                toggleCart,
                cartOpen,
                cartItems,
                cartQuantity,
                checkoutTotal,
                removeFromUpdatedCart,
                newAddToCart,
                newCartItem,
                calledData
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}