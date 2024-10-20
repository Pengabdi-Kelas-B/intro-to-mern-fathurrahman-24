let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
    try {
        const response = await fetch("http://localhost:3000/pokemon");
        if (!response.ok) {
            throw new Error("HTTP call failed");
        }
        const data = await response.json();
        pokemonData = data;
        renderApp();
    } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
        renderApp();
    }
}

// Card component with Tailwind styling
function PokemonCard({ name, image, types,url }) {
    return React.createElement(
        "div",
        {
            className: "bg-white rounded-lg shadow-lg p-4 m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105",
        },
        React.createElement("img", { src: image, alt: name, className: "mx-auto h-36 w-36" }),
        React.createElement("h2", { className: "text-xl font-bold text-center text-blue-700 mt-3" }, name),
        React.createElement("p", { className: "text-gray-500 text-center text-lg" }, `Type: ${types}`)
    );
}

// List component to render all Pokemon cards
function PokemonList() {
    if (pokemonData.length === 0) {
        return React.createElement(
            "p",
            { className: "text-center text-lg font-semibold" },
            "Loading Pokemon data..."
        );
    }

    return React.createElement(
        "div",
        { className: "flex flex-wrap justify-center" },
        pokemonData.map((pokemon) =>
            React.createElement(PokemonCard, {
                key: pokemon.id,
                name: pokemon.name,
                types: pokemon.types ? pokemon.types.join(" / ") : "Unknown",
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            })
        )
    );
}

// App component to wrap header and list
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
