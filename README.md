# pokemonTCG

Overview:

This project resembles a simple online store with a responsive cart - with pokemon TCG cards as the main product. There is a also a search bar which allows you to search cards based on their name.

The data is called from the pokemon TCG API and card prices are referenced from TCG Player API (some prices would not be able to be fetched from this API, and is priced $0.00)

Usage/Development:

The project is made using React and Typescript, and using UseContext hook instead of Redux for some state/prop management. Routing to different paths is done using react-router dependency.

The project can be ran locally using "npm run start" and built for deployment using "npm run build" "npm run preview".

Currently the website only calls cards from 5 different card sets - could look to add in all card sets (I chose not to because it is not practical, adding a few lines of codes will easily solve this ). There is also some slow load time that could be optimized when fetching data from the pokemon API (rendering 100+ store items components in the store when fetching the full set of cards from an expansion)


Contact:

You can contact me at foo.joowee@gmail.com.
