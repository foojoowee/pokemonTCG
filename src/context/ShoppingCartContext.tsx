import {useEffect, useState, useContext, createContext, ReactNode} from "react"
import { fetchData } from "../module/api"

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

type ShoppingCartContext = {
    getItemQuantity : (id: number) => number;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    addToCart: (id: number) => void;
    toggleCart: () => void;
    cartQuantity: number
    cartOpen: boolean;
    cartItems: CartItem[];
    updatedCartItems: CartItem[];
    checkoutTotal: () => number
    removeFromUpdatedCart: (id: number) => void;
    calledData: any
}

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps){

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [updatedCartItems, setUpdatedCartItems] = useState<CartItem[]>([])
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

    const cartQuantity = updatedCartItems.reduce(
        (quantity, item)=> item.quantity + quantity,
        0
    )
        // setCartQuantity(cartQuantity)
    //     setUpdatedCartItems(cartItems)
    // }

    function checkoutTotal(){
        let total = 0
        if (calledData.length > 0){
            for (let i = 0; i < updatedCartItems.length; i++){
                let checkitem: any = calledData.find((item: any) => item.id === updatedCartItems[i].id);
                if (checkitem){
                    total += getUpdatedItemQuantity(updatedCartItems[i].id)*checkitem.hp
                }
        }
        }
        return total
    }
    
    function toggleCart(){
        setCartOpen((prevState) => !prevState)
        // console.log("Cart is" + cartOpen)
    }

    function addToCart(id: number) {
        setCartItems((currItems) => {
          if (currItems.find((item) => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }];
          } else {
            return [...currItems];
          }
        });
        setUpdatedCartItems((prevItems) => {
            if (prevItems.find((item) => item.id === id) == null) {
              return [...prevItems, { id, quantity: getItemQuantity(id)}];
            } else{
                return prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + getItemQuantity(id) } : item
              );
            }
        });
      }

        // function addToCart(id: number){
    //     setCartItems(currItems => {
    //         if (currItems.find(item => item.id === id) == null) {
    //             return [...currItems, {id, quantity: 1}]
    //         } else{
    //             setUpdatedCartItems((prevItem)=> [...updatedCartItems, {id, quantity: getItemQuantity(id)}])
    //             return [...currItems]
    //         }
    //     })
    // }



    function getUpdatedItemQuantity(id: number){
        return updatedCartItems.find(item => item.id === id)?.quantity || 0
    }

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseQuantity(id: number){
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

    function decreaseQuantity(id: number){
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

    function removeFromCart(id: number){
        setCartItems(currItems =>{
            if (currItems.find(item => item.id === id)){
                return currItems.filter(item => item.id !== id)
            } else{
                return [...currItems]
            }
        })
        setUpdatedCartItems(currItems =>{
            if (currItems.find(item => item.id === id)){
                return currItems.filter(item => item.id !== id)
            } else{
                return [...currItems]
            }
        })
    }

    function removeFromUpdatedCart(id: number){
        setUpdatedCartItems(currItems =>{
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
                updatedCartItems,
                checkoutTotal,
                removeFromUpdatedCart,
                calledData
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}