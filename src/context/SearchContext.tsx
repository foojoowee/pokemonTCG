// import { createContext } from "react"

// const SearchContext = createContext({})

// export function useSearchContext(){
//     return useContext(SearchContext)
// }

// export function SearchContextProvider({children}){
//     async function fetchData(){
//         const searchItem = document.querySelector('.search-box input').value;
//         const apiUrl = `https://api.pokemontcg.io/v2/cards?q=set.id:base1 ${}`
//         // Fetch data from API
//         try{
//             const response = await fetch(apiUrl)
//             const jsonData = await response.json();
//             const data = jsonData.data;
//             return data;
//         } catch (error){
//             console.error("Error fetching data:", error)
//             return [];
//         }
//     }
// }