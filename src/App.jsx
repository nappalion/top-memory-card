import { useState, useEffect } from "react";
import "./App.css";
import "./styles/pokemon.css";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);

  const shuffle = (array) => {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const onHandleClick = (name) => {
    setPokemon((prevPokemon) => shuffle([...prevPokemon]));
    if (clickedPokemon.includes(name)) {
      setClickedPokemon([]);
      setScore(0);
    } else {
      setClickedPokemon([...clickedPokemon, name]);
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
    }
  };

  useEffect(() => {
    let temp = new Set();
    while (temp.size < 9) {
      const randomNum = Math.floor(Math.random() * 20 + 1);
      temp.add(randomNum);
    }
    const urls = Array.from(temp).map(
      (randomNum) => `https://pokeapi.co/api/v2/pokemon/${randomNum}`
    );
    const fetchPromises = urls.map((url) => fetch(`${url}`));

    Promise.all(fetchPromises)
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        setPokemon(
          data.map((poke) => {
            return { name: poke.name, sprite: poke.sprites.front_default };
          })
        );
      });
  }, []);

  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <p>
        Get points by clicking on an image but don't click on any more than
        once!
      </p>
      <p>Score: {score}</p>
      <p>Best Score: {highScore}</p>
      <div className="poke-container">
        {pokemon.map((poke, index) => (
          <PokemonCard
            key={index}
            name={poke.name}
            sprite={poke.sprite}
            onClick={() => {
              onHandleClick(poke.name, poke.sprite);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
