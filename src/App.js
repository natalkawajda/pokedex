import logo from './pokemon.png';
import './App.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import About from './About';
import NavigationBar from './NavigationBar';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <NavigationBar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/:pokemonName" element={<PokeInfo />} />
      </Routes>
    </Router>
  );
}
export function Home(){
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null)
  const [nextUrl, setNextUrl] = useState(null)
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
  
  useEffect(() => {
    fetchData(url);
    setPokemonList([])
  }, [url]);

  function fetchData(url,chuj) {
    setUrl(chuj)
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Response was not OK!");
        return response.json();
      })
      .then((data) => {
        setPokemonList(data.results);
        setPreviousUrl(data.previous);
        setNextUrl(data.next);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.toString());
      });
  }

  function handleNextClick() {
    
    fetchData(url,nextUrl);
  }

  function handlePreviousClick() {
    
    fetchData(url,previousUrl);
  }
  return (
    <div>
    <div><NavigationBar /></div>
    <div id= 'logo'>
      <img  src={logo} alt='pokemon'/></div>
    <div className='pokemon-container'>
      
      <div className='pokemon-list'>
        {pokemonList.map((e, index) => (
          <Card
            key={index}
            pokemonURL={e.url}
            />
        )

        )}
      </div>
      <div className='buttons'>
      {previousUrl && (
        <button onClick={handlePreviousClick}>Previous page</button>
       )}
      {nextUrl && (
      <button onClick={handleNextClick}>Next page</button>
      )
    }
    </div></div></div>
  )
}
function Card({ pokemonURL }){
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonType, setPokemonType] = useState(null);
  const [error, setError] = useState(null);
 
  function fetchData(){
    fetch(pokemonURL)
      .then((response) => {
        if (!response.ok) throw new Error("Response was not OK!");
        return response.json();
    })
  .then((data) => {
    setPokemonData(data);
    setPokemonType(data.types[0].type.name);
  })
  .catch(err => {
    console.log(error)
    setError(error.toString())
  })
  console.log(pokemonData)}
  useEffect(() => {
  fetchData()
  }, [])
  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
  const cardStyle = {
    backgroundColor: typeColors[pokemonType],
  };
  return (
    pokemonData && (
    <Link to={"/" + pokemonData.name} element={<PokeInfo/>}>
      <>
        <div className='poke' style={cardStyle}>
          {error && <p>Error: {error}</p>}
          {pokemonData ? (
          <div className='card'>
           <h2>{pokemonData.name}</h2>
           <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </>
    </Link>
    )
  )
}

export function PokeInfo(){
  const { pokemonName } = useParams()
  const [abilities, setAbilities] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  console.log(pokemonName)
  useEffect(() => {
    const fetchData = () => {
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
      .then((response) => {
        if (!response.ok) throw new Error("Response was not OK!");
        return response.json();
      })
      .then((data) => {
        setPokemon(data);
        fetchAbilities(data)
      })
      .catch(err => {
        console.log(error)
        setError(error.toString())
      })
    }
    fetchData();
  }, [])

  function fetchAbilities(pokemon) {
    if (pokemon === null) return;
    else {
    setAbilities([])
    pokemon.abilities.forEach(e => {
      fetch(e.ability.url)
      .then((response) => {
        if (!response.ok) throw new Error("Response was not OK!");
        return response.json();
      })
      .then((data) => {
        let enAbilities = data.effect_entries.filter(e => e.language.name === "en");
        const ability = {
          name: e.ability.name,
          effect: enAbilities[0].effect,
          shortEffect: enAbilities[0].short_effect
        }
        setAbilities((abilities) => [...abilities, ability])
      })
      .catch(err => {
        console.log(error)
        setError(error.toString())
      })
    })
  }
  }
  return (
    <div><NavigationBar />
    <div className='info'>
       {pokemon ? (
        <div>
      <h1>{pokemon.name}</h1>
      <div id='maininfo'>
      <img id= 'bigfoto' src={pokemon.sprites.front_default} alt={pokemon.name}></img>
      <div id='infotext'>
      <h3>Type: {pokemon.types[0].type.name}</h3>
      <h3>Height: {pokemon.height}</h3>
      <h3>Weight: {pokemon.weight}</h3></div>
      <table className="stats-table">
            <thead>
              <tr>
                <th>Stat</th>
                <th>Base Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pokemon.stats[0].stat.name}</td>
                <td>{pokemon.stats[0].base_stat}</td>
              </tr>
              <tr>
                <td>{pokemon.stats[1].stat.name}</td>
                <td>{pokemon.stats[1].base_stat}</td>
              </tr>
              <tr>
                <td>{pokemon.stats[2].stat.name}</td>
                <td>{pokemon.stats[2].base_stat}</td>
              </tr>
              <tr>
                <td>{pokemon.stats[3].stat.name}</td>
                <td>{pokemon.stats[3].base_stat}</td>
              </tr>
              <tr>
                <td>{pokemon.stats[4].stat.name}</td>
                <td>{pokemon.stats[4].base_stat}</td>
              </tr>
              <tr>
                <td>{pokemon.stats[5].stat.name}</td>
                <td>{pokemon.stats[5].base_stat}</td>
              </tr>
            </tbody>
          </table>
      </div>
      <h1>Abilities:</h1>
      {abilities.map((e, index) => {
        return (
            <p id='abilities' key={index}>Name: {e.name}. <p>Effect: {e.effect}. </p>Short effect: {e.shortEffect}</p>
        );
      })}
      
    
    
          </div>
        ) : (
          <p>Loading...</p>
        )}
        </div></div>
      )
}


export default App;