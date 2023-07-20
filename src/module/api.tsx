type SearchItem = {
    searchItem: string
} | "";

async function fetchData(searchItem: SearchItem = "", selectSet: string){
    const searchQuery = typeof searchItem === "string" ? searchItem : searchItem.searchItem;
    const apiUrl = `https://api.pokemontcg.io/v2/cards?q=${searchQuery ? `name:${encodeURIComponent(searchQuery)}* ` : ""}set.id:${selectSet}`;
    // Fetch data from API
    try{
        const response = await fetch(apiUrl)
        const jsonData = await response.json();
        const data = jsonData.data;
        return data;
    } catch (error){
        console.error("Error fetching data:", error)
        return [];
    }
}
export {fetchData};