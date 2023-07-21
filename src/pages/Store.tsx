import StoreItem from "../components/StoreItem"
import { fetchData } from "../module/api"
import {useState, useEffect} from "react"

export default function Store(){
    const [calledData, setCalledData] = useState([])
    const [searchItem, setSearchItem] = useState("")
    const [cardSet, setCardSet] = useState("base1")

    async function selectData(){
        try{
            const data: any = await fetchData(searchItem as any, cardSet);
            console.log(data)
            data.sort((a: any, b: any) => {
                const idA = parseInt(a.id.split("-")[1]);
                const idB = parseInt(b.id.split("-")[1]);
                return idA - idB;
            });
            setCalledData(data)
        }catch (error) {
            console.error("Error fetching and rendering data:", error);
            return [];
    }}

    useEffect(()=>{
        selectData();
    },[cardSet])

    function handleSubmit(event: any){
        event.preventDefault();
        selectData()
    }

    function consoleLog(){
        console.log(calledData[0])
    }

    return(
        <div className="store-container">
            <h1 className="store-container-title" onClick={consoleLog}>Store</h1>
            <div className="store-search">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        id="search-name" 
                        placeholder="Search Card Name"
                        className="search-box-input"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <div className="store-search-set">
                    <label>Card Set:</label>
                    <select 
                    id="set-select" 
                    onChange={(e) => setCardSet(e.target.value)}>
                        <option value="base1">Base Set</option>
                        <option value="ex1">Ruby & Sapphire</option>
                        <option value="ex15">Dragon Frontiers</option>
                        <option value="bw7">Boundaries Crossed</option>
                        <option value="xy4">Phantom Forces</option>
                    </select>
                </div>
            </div>
            {calledData.length > 0 && (
                <div className="store-container-empty">
                    <p>Search Results: {calledData.length} items</p>
                </div>
            )}
            <div className="store-container-content">
                {calledData.map((item: any) =>
                    <StoreItem 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.tcgplayer.prices}
                        rarity={item.rarity}
                        imgUrl={item.images.small}
                    />
                )}
            </div>
            {calledData.length === 0 && (
                <div className="store-container-empty">
                    <p>No Cards Found.</p>
                    <br></br>
                    <p>Please try another search or wait awhile for page to load</p>
                </div>
            )}
        </div>
    )
}