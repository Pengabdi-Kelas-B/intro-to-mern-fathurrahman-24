let pokemonData = [];
let searchQuery = "";

// Fetch data from mock server and sort by name
async function fetchPokemon() {
    try {
        const response = await fetch("http://localhost:3000/pokemon");
        if (!response.ok) {
            throw new Error("HTTP call failed");
        }
        const data = await response.json();
        // Sort the Pokemon by name alphabetically
        pokemonData = data.sort((a, b) => a.name.localeCompare(b.name));
        renderApp();
    } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
        renderApp();
    }
}

// Function to determine background gradient class for card types
function getTypeBackground(type) {
    switch (type.toLowerCase()) {
        case 'grass':
            return 'bg-gradient-to-r from-green-200 to-green-400';
        case 'fire':
            return 'bg-gradient-to-r from-red-200 to-red-400';
        case 'water':
            return 'bg-gradient-to-r from-blue-200 to-blue-400';
        case 'electric':
            return 'bg-gradient-to-r from-yellow-200 to-yellow-400';
        case 'psychic':
            return 'bg-gradient-to-r from-purple-200 to-purple-400';
        case 'rock':
            return 'bg-gradient-to-r from-gray-300 to-gray-500';
        case 'ground':
            return 'bg-gradient-to-r from-yellow-300 to-yellow-500';
        case 'fairy':
            return 'bg-gradient-to-r from-pink-200 to-pink-400';
        case 'fighting':
            return 'bg-gradient-to-r from-red-300 to-red-500';
        case 'poison':
            return 'bg-gradient-to-r from-purple-300 to-purple-500';
        case 'bug':
            return 'bg-gradient-to-r from-green-300 to-green-500';
        case 'ghost':
            return 'bg-gradient-to-r from-indigo-200 to-indigo-400';
        case 'steel':
            return 'bg-gradient-to-r from-gray-400 to-gray-600';
        case 'dragon':
            return 'bg-gradient-to-r from-indigo-300 to-indigo-500';
        case 'dark':
            return 'bg-gradient-to-r from-gray-700 to-gray-900 text-white';
        default:
            return 'bg-gradient-to-r from-gray-200 to-gray-300';
    }
}

// Card component with background color based on Pokémon type
function PokemonCard({ name, image, types }) {
    const backgroundColor = getTypeBackground(types.split(" / ")[0]);

    return React.createElement(
        "div",
        {
            className: `${backgroundColor} rounded-lg shadow-lg p-4 m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105`,
        },
        React.createElement("img", { src: image, alt: name, className: "mx-auto h-36 w-36 rounded-full border-2 border-white shadow-md" }),
        React.createElement("h2", { className: "text-xl font-bold text-center text-blue-900 mt-3" }, name),
        React.createElement("p", { className: "text-gray-800 text-center text-lg" }, `Type: ${types}`)
    );
}

// Input component for searching Pokémon by name, centered
function SearchBar() {
    return React.createElement(
        "div",
        { className: "flex justify-center mb-6" },
        React.createElement(
            "input",
            {
                type: "text",
                placeholder: "Search Pokémon...",
                value: searchQuery,
                onChange: (e) => {
                    searchQuery = e.target.value;
                    renderApp();
                },
                className: "w-full sm:w-1/2 md:w-1/3 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
        )
    );
}

// List component to render all Pokemon cards
function PokemonList() {
    const filteredPokemon = pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredPokemon.length === 0) {
        return React.createElement(
            "p",
            { className: "text-center text-lg font-semibold" },
            "No Pokémon found."
        );
    }

    return React.createElement(
        "div",
        { className: "flex flex-wrap justify-center" },
        filteredPokemon.map((pokemon) =>
            React.createElement(PokemonCard, {
                key: pokemon.id,
                name: pokemon.name,
                types: pokemon.types ? pokemon.types.join(" / ") : "Unknown",
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            })
        )
    );
}

// App component to wrap header, search bar, and list
function App() {
    return React.createElement(
        "div",
        { className: "max-w-screen-lg mx-auto p-4" },
        React.createElement(
            "header",
            {
                className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg text-center",
            },
            React.createElement("h1", { className: "text-4xl font-extrabold" }, "Pokedex")
        ),
        React.createElement(SearchBar, null),
        React.createElement(PokemonList, null)
    );
}

// Function to render the app
function renderApp() {
    ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render and data fetch
renderApp();
fetchPokemon();
