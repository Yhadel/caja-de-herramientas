import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Wrench,
  User,
  UserCheck,
  GraduationCap,
  CloudSun,
  Flame,
  Newspaper,
  Info,
  ExternalLink,
  Volume2,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");

  // --- ESTADOS DE LAS VISTAS ---
  // Vista 2: Genero
  const [inputName, setInputName] = useState("");
  const [genderData, setGenderData] = useState(null);

  // Vista 3: Persona Aleatoria
  const [randomUser, setRandomUser] = useState(null);

  // Vista 4: Universidades
  const [country, setCountry] = useState("Dominican Republic");
  const [universities, setUniversities] = useState([]);

  // Vista 5: Clima RD
  const [weather, setWeather] = useState(null);

  // Vista 6: Pokemon
  const [pokeName, setPokeName] = useState("pikachu");
  const [pokemon, setPokemon] = useState(null);

  // Vista 7: WordPress (TechCrunch)
  const [posts, setPosts] = useState([]);

  // --- FUNCIONES API ---

  // 2. Predecir Género
  const fetchGender = async () => {
    if (!inputName) return;
    try {
      const res = await axios.get(`https://api.genderize.io/?name=${inputName}`);
      setGenderData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // 3. Cargar Persona Aleatoria
  const fetchRandomUser = async () => {
    try {
      const res = await axios.get("https://randomuser.me/api/?results=1");
      setRandomUser(res.data.results[0]);
    } catch (e) {
      console.error(e);
    }
  };

  // 4. Cargar Universidades
  const fetchUniversities = async () => {
    if (!country) return;
    try {
      const res = await axios.get(
        `https://adamix.net/proxy.php?country=${encodeURIComponent(country)}`
      );
      setUniversities(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  // 5. Clima en RD (Santo Domingo como referencia)
  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=18.4714&longitude=-69.8908&current_weather=true"
      );
      setWeather(res.data.current_weather);
    } catch (e) {
      console.error(e);
    }
  };

  // 6. Cargar Pokémon
  const fetchPokemon = async () => {
    if (!pokeName) return;
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`
      );
      setPokemon(res.data);
    } catch (e) {
      setPokemon(null);
    }
  };

  // 7. Cargar Posts WordPress (TechCrunch)
  const fetchWPPosts = async () => {
    try {
      const res = await axios.get(
        "https://techcrunch.com/wp-json/wp/v2/posts?per_page=3"
      );
      setPosts(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // Cargas iniciales al cambiar de pestaña
  useEffect(() => {
    if (activeTab === "user") fetchRandomUser();
    if (activeTab === "weather") fetchWeather();
    if (activeTab === "pokemon") fetchPokemon();
    if (activeTab === "wordpress") fetchWPPosts();
    if (activeTab === "unis") fetchUniversities();
  }, [activeTab]);

  // Función para reproducir el sonido de Pokémon
  const playPokemonCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      {/* NAVBAR / HEADER */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Wrench className="text-blue-400" size={28} />
            <h1 className="text-xl font-bold">Caja de Herramientas</h1>
          </div>

          <nav className="flex flex-wrap gap-2 text-xs md:text-sm">
            {[
              { id: "inicio", label: "Inicio", icon: Wrench },
              { id: "genero", label: "Género", icon: UserCheck },
              { id: "user", label: "Persona", icon: User },
              { id: "unis", label: "Universidades", icon: GraduationCap },
              { id: "weather", label: "Clima RD", icon: CloudSun },
              { id: "pokemon", label: "Pokémon", icon: Flame },
              { id: "wordpress", label: "Noticias", icon: Newspaper },
              { id: "about", label: "Acerca de", icon: Info },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6">
        {/* VISTA 1: INICIO (CAJA DE HERRAMIENTAS) */}
        {activeTab === "inicio" && (
          <div className="text-center space-y-6 py-8">
            <h2 className="text-3xl font-extrabold text-blue-400">
              Bienvenido a la Caja de Herramientas
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Esta aplicación contiene múltiples utilidades conectadas a varias APIs
              públicas para consulta de datos en tiempo real.
            </p>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=500&auto=format&fit=crop"
                alt="Caja de Herramientas"
                className="w-80 h-52 object-cover rounded-2xl shadow-2xl border-2 border-slate-700"
              />
            </div>
          </div>
        )}

        {/* VISTA 2: PREDECIR GÉNERO */}
        {activeTab === "genero" && (
          <div className="space-y-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center">
              Predecir Género por Nombre
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe un nombre (ej: irma, john)"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={fetchGender}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold"
              >
                Buscar
              </button>
            </div>

            {genderData && genderData.gender && (
              <div
                className={`p-6 rounded-2xl text-center space-y-2 border ${
                  genderData.gender === "male"
                    ? "bg-blue-950/80 border-blue-500 text-blue-200"
                    : "bg-pink-950/80 border-pink-500 text-pink-200"
                }`}
              >
                <p className="text-lg uppercase tracking-wider font-semibold">
                  Resultado:
                </p>
                <h3 className="text-3xl font-black capitalize">
                  {genderData.name}
                </h3>
                <p className="text-2xl font-bold">
                  Género:{" "}
                  {genderData.gender === "male" ? "Masculino ♂" : "Femenino ♀"}
                </p>
                <p className="text-xs opacity-75">
                  Probabilidad: {(genderData.probability * 100).toFixed(0)}%
                </p>
              </div>
            )}
          </div>
        )}

        {/* VISTA 3: PERSONA ALEATORIA */}
        {activeTab === "user" && (
          <div className="space-y-6 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold">Persona Aleatoria</h2>
            <button
              onClick={fetchRandomUser}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Generar Otra Persona
            </button>

            {randomUser && (
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4 shadow-xl">
                <img
                  src={randomUser.picture.large}
                  alt="Perfil"
                  className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold">
                    {randomUser.name.first} {randomUser.name.last}
                  </h3>
                  <p className="text-slate-400 text-sm">{randomUser.email}</p>
                </div>
                <div className="text-sm bg-slate-900 p-3 rounded-lg flex justify-around border border-slate-700">
                  <div>
                    <span className="text-slate-400 block text-xs">
                      Nacimiento
                    </span>
                    <span>
                      {new Date(randomUser.dob.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Edad</span>
                    <span className="font-bold text-blue-400">
                      {randomUser.dob.age} años
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VISTA 4: UNIVERSIDADES POR PAÍS */}
        {activeTab === "unis" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Universidades por País
            </h2>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="text"
                placeholder="Nombre del país en inglés (ej: Dominican Republic)"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={fetchUniversities}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold"
              >
                Buscar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {universities.map((uni, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2"
                >
                  <h4 className="font-bold text-blue-300">{uni.name}</h4>
                  <p className="text-xs text-slate-400">
                    Dominio: {uni.domains?.[0] || "N/A"}
                  </p>
                  {uni.web_pages?.[0] && (
                    <a
                      href={uni.web_pages[0]}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-blue-400 hover:underline"
                    >
                      <span>Visitar sitio web</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 5: CLIMA EN RD */}
        {activeTab === "weather" && (
          <div className="max-w-md mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">Clima en República Dominicana</h2>
            <p className="text-xs text-slate-400">Santo Domingo (Hoy)</p>

            {weather ? (
              <div className="bg-gradient-to-b from-blue-900 to-slate-800 p-8 rounded-2xl border border-blue-500/30 space-y-4 shadow-2xl">
                <CloudSun
                  size={64}
                  className="mx-auto text-amber-400 animate-pulse"
                />
                <h3 className="text-5xl font-black">{weather.temperature} °C</h3>
                <p className="text-slate-300">
                  Velocidad del viento: {weather.windspeed} km/h
                </p>
              </div>
            ) : (
              <p className="text-slate-400">Cargando clima...</p>
            )}
          </div>
        )}

        {/* VISTA 6: POKÉMON */}
        {activeTab === "pokemon" && (
          <div className="max-w-md mx-auto space-y-6 text-center">
            <h2 className="text-2xl font-bold">Buscador Pokémon</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nombre del Pokémon (ej: pikachu, ditto)"
                value={pokeName}
                onChange={(e) => setPokeName(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={fetchPokemon}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold"
              >
                Buscar
              </button>
            </div>

            {pokemon ? (
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
                <img
                  src={
                    pokemon.sprites?.other?.["official-artwork"]
                      ?.front_default || pokemon.sprites?.front_default
                  }
                  alt={pokemon.name}
                  className="w-40 h-40 mx-auto"
                />
                <h3 className="text-2xl font-black capitalize text-amber-400">
                  {pokemon.name}
                </h3>
                <p className="text-sm text-slate-300">
                  Experiencia Base: {pokemon.base_experience}
                </p>

                <div className="flex justify-center gap-2 flex-wrap">
                  {pokemon.abilities?.map((a, i) => (
                    <span
                      key={i}
                      className="bg-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                    >
                      {a.ability.name}
                    </span>
                  ))}
                </div>

                {pokemon.cries?.latest && (
                  <button
                    onClick={playPokemonCry}
                    className="mt-2 bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 mx-auto"
                  >
                    <Volume2 size={18} />
                    Escuchar Sonido
                  </button>
                )}
              </div>
            ) : (
              <p className="text-slate-400">No se encontró el Pokémon.</p>
            )}
          </div>
        )}

        {/* VISTA 7: WORDPRESS REST API (TechCrunch) */}
        {activeTab === "wordpress" && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <img
                src="https://media.licdn.com/dms/image/v2/C560BAQEeAGfIE7wntw/company-logo_200_200/company-logo_200_200/0/1631309596840?e=2147483647&v=beta&t=549HBhZQZKWCShYGG4XNk7htNKw4Ksp3lOk32_NPk7c"
                alt="TechCrunch Logo"
                className="h-16 mx-auto rounded-xl shadow-md"
              />
              <h2 className="text-2xl font-bold">Últimas Noticias de TechCrunch</h2>
              <p className="text-xs text-slate-400">
                Sitio de noticias construido sobre WordPress
              </p>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3"
                >
                  <h3
                    className="text-lg font-bold text-blue-300"
                    dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
                  />
                  <div
                    className="text-xs text-slate-300 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
                  />
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-400 hover:underline"
                  >
                    <span>Visitar noticia original</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 8: ACERCA DE MÍ */}
        {activeTab === "about" && (
          <div className="max-w-md mx-auto text-center space-y-6 bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <img
              src="Foto de perfil.jpeg"
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 object-cover shadow-lg"
            />
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">Yhadel López</h3>
              <p className="text-blue-400 text-sm font-semibold">
                Matrícula: 20242493
              </p>
              <p className="text-slate-400 text-xs">Desarrollador de Software</p>
            </div>

            <div className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-700">
              <p>Email: 20242493@itla.edu.do</p>
              <p>Teléfono: +1 (809) 348-6873</p>
              <p className="text-slate-400">
                Disponible para oportunidades laborales.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}