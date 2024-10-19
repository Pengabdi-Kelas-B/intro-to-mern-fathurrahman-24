let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
    try {
        const response = await fetch("http://localhost:3000/pokemon");
        if (!response.ok) {
            throw new Error("http call failed");
        }
        const data = await response.json();
        pokemonData = data;
        renderApp();
    } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
        renderApp();
    }
}

// Card component
function PokemonCard(props) {
    return React.createElement(
        "div",
        {
            className: "bg-white rounded-lg shadow-2xl p-6 m-4 w-72 transition-transform transform hover:scale-105", // Kartu Pokemon
        },
        React.createElement("img", { src: props.image, alt: props.name, className: "mx-auto h-36 w-36" }), // Gambar Pokemon
        React.createElement("h2", { className: "text-2xl font-bold text-center text-blue-700 mt-3" }, props.name), // Nama Pokemon
        React.createElement("p", { className: "text-gray-500 text-center text-lg" }, `Type: ${props.types}`) // Tipe Pokemon
    );
}

// List component
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
                types: pokemon.types.join("/"),
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            })
        )
    );
}

// App component wrap header and list
function App() {
    return React.createElement(
        "div",
        { className: "max-w-screen-lg mx-auto p-4" }, // Center the content
        React.createElement(
            "header",
            { className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg" },
            React.createElement(
                "h1",
                { className: "text-4xl text-center font-extrabold" },
                "Pokedex"
            )
        ),
        React.createElement(PokemonList, null)
    );
}

// Function to render the app
function renderApp() {
    ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
