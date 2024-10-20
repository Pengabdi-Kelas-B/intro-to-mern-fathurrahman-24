// Data untuk menampung daftar Pokémon dan pencarian pengguna
let pokemonList = [];
let searchQuery = "";

// Fungsi untuk mengambil data Pokémon dari server lokal
async function loadPokemonData() {
    try {
        const response = await fetch("http://localhost:3000/pokemon");
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        // Mengurutkan data Pokémon berdasarkan nama secara alfabetis
        pokemonList = data.sort((a, b) => a.name.localeCompare(b.name));
        renderApp();
    } catch (error) {
        console.error("Gagal mengambil data Pokémon:", error);
        alert("Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.");
        renderApp();
    }
}

// Fungsi untuk menentukan kelas background berdasarkan tipe Pokémon
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

// Komponen kartu Pokémon yang menampilkan gambar dan tipe
function PokemonCard({ name, image, types }) {
    const backgroundColor = getTypeBackground(types.split(" / ")[0]);

    return React.createElement(
        "div",
        {
            className: `${backgroundColor} rounded-lg shadow-lg p-4 m-2 w-full sm:w-1/2 md:w-1/4 transform hover:scale-105 transition-transform`
        },
        React.createElement("img", {
            src: image,
            alt: name,
            className: "mx-auto h-36 w-36 rounded-full border-2 border-white shadow-md"
        }),
        React.createElement("h2", {
            className: "text-xl font-bold text-center text-blue-900 mt-3"
        }, name),
        React.createElement("p", {
            className: "text-gray-800 text-center text-lg"
        }, `Type: ${types}`)
    );
}

// Komponen untuk input pencarian Pokémon
function SearchBar() {
    return React.createElement(
        "div",
        { className: "flex flex-col items-center sm:flex-row sm:justify-between mb-6" },
        React.createElement(
            "h1",
            { className: "text-4xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg mb-4 sm:mb-0" },
            "Pokedex"
        ),
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
                className: "w-full sm:w-1/3 p-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
        )
    );
}

// Komponen untuk menampilkan daftar Pokémon berdasarkan pencarian
function PokemonList() {
    const visiblePokemon = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (visiblePokemon.length === 0) {
        return React.createElement(
            "p",
            { className: "text-center text-lg font-semibold" },
            "Tidak ada Pokémon yang ditemukan."
        );
    }

    return React.createElement(
        "div",
        { className: "flex flex-wrap justify-center" },
        visiblePokemon.map((pokemon) =>
            React.createElement(PokemonCard, {
                key: pokemon.id,
                name: pokemon.name,
                types: pokemon.types ? pokemon.types.join(" / ") : "Unknown",
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
            })
        )
    );
}

// Komponen utama yang mencakup judul, input pencarian, dan daftar Pokémon
function App() {
    return React.createElement(
        "div",
        { className: "max-w-screen-lg mx-auto p-4" },
        React.createElement(SearchBar),
        React.createElement(PokemonList)
    );
}

// Fungsi untuk merender aplikasi
function renderApp() {
    ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Memulai aplikasi dengan melakukan render dan mengambil data
renderApp();
loadPokemonData();
