import picture from "/imgs/pokemon-cards.png"

export default function About(){
    return(
        <div className="about-container">
            <div className="about-title">
                <h1>ABOUT</h1>
            </div>
            <div className="about-content">
                <div className="about-image">
                    <img src={picture} alt="" />
                </div>
                <div className="about-text">
                    <p>Hi, this website/pseudo store is just a personal project. This store does not actually sell any Pokemon Cards, it is just a project built on React, a little bit of styling using CSS and utilizing the pokemon trading card API provided by The Pokemon Company <a href="https://pokemontcg.io/" target="_blank">here</a>.</p>
                    <br></br>
                    <p>All rights go to the The Pokmon Company. I do not benefit financially whatsoever from this project. </p>
                    <br></br>
                    <p>Have fun going through the <a href="/store">Store</a> to look some of your favourite pokemon cards from your childhood days! The prices are based on the TCG Player API, some cards which are not sold or have no rela identifiable pricing currenlty will just be priced at $0.00</p>
                </div>
            </div>
        </div>
    )
}