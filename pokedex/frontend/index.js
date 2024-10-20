// Inisialisasi daftar Pokémon dan query pencarian
let pokemonList = [];
let searchQuery = "";

// Mengambil data Pokémon dari server lokal
async function loadPokemonData() {
    try {
        const response = await fetch("http://localhost:3000/pokemon");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        const data = await response.json();
        // Mengurutkan data Pokémon berdasarkan nama
        pokemonList = data.sort((a, b) => a.name.localeCompare(b.name));
        renderApp();
    } catch (error) {
        console.error("Gagal mengambil data Pokémon:", error);
        alert("Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.");
        renderApp();
    }
}

// Mendapatkan kelas latar belakang berdasarkan tipe Pokémon
function getTypeBackground(type) {
    const typeClassMap = {
        grass: 'bg-gradient-to-r from-green-200 to-green-400',
        fire: 'bg-gradient-to-r from-red-200 to-red-400',
        water: 'bg-gradient-to-r from-blue-200 to-blue-400',
        electric: 'bg-gradient-to-r from-yellow-200 to-yellow-400',
        psychic: 'bg-gradient-to-r from-purple-200 to-purple-400',
        rock: 'bg-gradient-to-r from-gray-300 to-gray-500',
        ground: 'bg-gradient-to-r from-yellow-300 to-yellow-500',
        fairy: 'bg-gradient-to-r from-pink-200 to-pink-400',
        fighting: 'bg-gradient-to-r from-red-300 to-red-500',
        poison: 'bg-gradient-to-r from-purple-300 to-purple-500',
        bug: 'bg-gradient-to-r from-green-300 to-green-500',
        ghost: 'bg-gradient-to-r from-indigo-200 to-indigo-400',
        steel: 'bg-gradient-to-r from-gray-400 to-gray-600',
        dragon: 'bg-gradient-to-r from-indigo-300 to-indigo-500',
        dark: 'bg-gradient-to-r from-gray-700 to-gray-900 text-white',
    };

    return typeClassMap[type.toLowerCase()] || 'bg-gradient-to-r from-gray-200 to-gray-300';
}

// Kartu Pokémon yang menampilkan gambar dan tipe
function PokemonCard({ name, image, types }) {
    const backgroundColor = getTypeBackground(types.split(" / ")[0]);

    return React.createElement(
        "div",
        { className: `${backgroundColor} rounded-lg shadow-lg p-4 m-2 w-48 transform hover:scale-105 transition-transform` },
        React.createElement("img", {
            src: image,
            alt: name,
            className: "mx-auto h-32 w-32 rounded-full border-4 border-white shadow-md"
        }),
        React.createElement("h2", {
            className: "text-lg font-bold text-center text-blue-900 mt-2"
        }, name),
        React.createElement("p", {
            className: "text-gray-800 text-center text-md"
        }, `Type: ${types}`)
    );
}

// Komponen untuk input pencarian Pokémon
function SearchBar() {
    return React.createElement(
        "div",
        { className: "flex flex-col items-center mb-6" },
        React.createElement(
            "div",
            { className: "flex justify-between items-center w-full fixed top-0 left-0 right-0 z-10 p-4 bg-gradient-to-r from-blue-600 to-purple-600" },
            React.createElement(
                "h1",
                { className: "text-5xl font-bold text-white" },
                "Pokedex"
            ),
            React.createElement(
                "div",
                { className: "flex items-center" }, // Flexbox untuk mengatur input dan button
                React.createElement(
                    "input",
                    {
                        type: "text",
                        placeholder: "Cari Pokémon...",
                        value: searchQuery,
                        onChange: (e) => {
                            searchQuery = e.target.value.trim();
                            renderApp();
                        },
                        className: "w-64 h-12 border rounded-l-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg overflow-hidden"
                    }
                ),
                React.createElement(
                    "button",
                    {
                        onClick: () => {
                            // Logika untuk menangani pencarian bisa ditambahkan di sini
                        },
                        className: "bg-blue-500 text-white rounded-r-lg h-12 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200"
                    },
                    "Search"
                )
            )
        )
    );
}

// Komponen untuk menampilkan daftar Pokémon berdasarkan pencarian
function PokemonList() {
    const filteredPokemon = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredPokemon.length === 0) {
        return React.createElement(
            "p",
            { className: "text-center text-lg font-semibold" },
            "Tidak ada Pokémon yang ditemukan."
        );
    }

    return React.createElement(
        "div",
        { className: "flex flex-wrap justify-center" },
        filteredPokemon.map(pokemon =>
            React.createElement(PokemonCard, {
                key: pokemon.id,
                name: pokemon.name,
                types: pokemon.types ? pokemon.types.join(" / ") : "Unknown",
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
            })
        )
    );
}

// Komponen utama aplikasi
function App() {
    return React.createElement(
        "div",
        { className: "max-w-screen-lg mx-auto p-4 pt-24" },
        React.createElement(SearchBar),
        React.createElement(PokemonList)
    );
}

// Merender aplikasi ke dalam DOM
function renderApp() {
    ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Memulai aplikasi dan mengambil data
renderApp();
loadPokemonData();
