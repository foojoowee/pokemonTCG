import home1 from "/imgs/home-1.jpg"
import home2 from "/imgs/home-2.jpg"
import home3 from "/imgs/home-3.jpg"
import {useState, useEffect} from 'react'

const images = [home1, home2, home3]

export default function Home(){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [displayPage, setDisplayPage] = useState(0)

    useEffect(() =>{
        const interval = setInterval(() => {
            setCurrentImageIndex((prevImageIndex) => (prevImageIndex + 1) % images.length)
            setDisplayPage((prevPage) => (prevPage + 1)%3)
        }, 5000);
        //Cleaning up
        return () => clearInterval(interval)
    }, [])

    const currentImage = images[currentImageIndex]

    return(
        <div className="home-container">
            <div className="home-hero">
                <div className="home-title">
                    {displayPage === 0 &&
                    <div>
                        <h2>Original Pokemon TCG Cards</h2>
                        <div className="home-title-text">
                            Get your original pokemon cards here at this One-Stop shop! 100% original cards or money back guaranteed! Enjoy free shippping for this month until the 10th of August!
                        </div>
                        <a href="/store">
                            <button className="home-button">BUY NOW</button>
                        </a>
                    </div>
                    }
                    {displayPage === 1 &&
                    <div>
                        <h2>August/September Promotion!</h2>
                        <div className="home-title-text">
                            Enjoy free shipping with all your orders for a limited time only! Valid for purchases above $1000.
                        </div>
                        <br></br>
                        <div>
                            Terms and conditions apply.
                        </div>
                        <a href="/store">
                            <button className="home-button">BUY NOW</button>
                        </a>
                    </div>
                    }
                    {displayPage === 2 &&
                    <div>
                        <h2>New Set Coming! Scarlet & Violet</h2>
                        <div className="home-title-text">
                            Get ready for the launch of the latest expansion - Scarlet & Violet! With brand new powerful EX cards and Paradox Pokemon, expand your collection today with us.
                        </div>
                        <a href="/store">
                            <button className="home-button">BUY NOW</button>
                        </a>
                    </div>
                    }

                </div>
                <div className="home-image">
                    <img src={currentImage}  alt="" />
                </div>
            </div>
            <div className="home-top-item">
                <div className="home-popular">
                    <h2>POPULAR ITEMS</h2>
                    <div className="home-popular-container">
                        <div className="home-storeitem-container">
                            <a href="/store">
                                <div className="home-storeitem-pic"><img src="https://images.pokemontcg.io/base1/4.png"></img></div>
                            </a>
                            <div className="home-storeitem-name">Charizard - Base Set</div>
                            <div className="home-storeitem-price">$499.99</div>
                        </div>
                        <div className="home-storeitem-container">
                            <a href="/store">
                                <div className="home-storeitem-pic"><img src="https://images.pokemontcg.io/ex15/97.png"></img></div>
                            </a>
                            <div className="home-storeitem-name">Rayquaza ex δ</div>
                            <div className="home-storeitem-price">$49.99</div>
                        </div>
                        <div className="home-storeitem-container">
                            <a href="/store">
                                <div className="home-storeitem-pic"><img src="https://images.pokemontcg.io/xy4/121.png"></img></div>
                            </a>
                            <div className="home-storeitem-name">MGengar-EX</div>
                            <div className="home-storeitem-price">$19.99</div>
                        </div>
                    </div>
                </div>
                <div className="home-latest">
                    <h2>RECENTLY PURCHASED</h2>
                    <div className="home-latest-container">
                        <div className="home-storeitem-container">
                            <a href="/store">
                                <div className="home-storeitem-pic"><img src="https://images.pokemontcg.io/xy4/122.png"></img></div>
                            </a>
                            <div className="home-storeitem-name">Dialga-EX (HA)</div>
                            <div className="home-storeitem-price">$29.99</div>
                        </div>
                        <div className="home-storeitem-container">
                            <a href="/store">
                                <div className="home-storeitem-pic"><img src="https://images.pokemontcg.io/bw7/137.png"></img></div>
                            </a>
                            <div className="home-storeitem-name">Computer Search</div>
                            <div className="home-storeitem-price">$49.99</div>
                        </div>
                        <div className="home-storeitem-container">
                            <a href="/store">
                                <div className="home-storeitem-pic"><img src="https://images.pokemontcg.io/bw7/143.png"></img></div>
                            </a>
                            <div className="home-storeitem-name">Cresselia-EX</div>
                            <div className="home-storeitem-price">$13.99</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}