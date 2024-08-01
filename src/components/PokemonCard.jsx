function PokemonCard({ name, sprite, onClick }) {
  return (
    <div className="poke-card" onClick={onClick}>
      <h2>{name}</h2>
      <img src={sprite} alt={`Pokemon ${name}`} />
    </div>
  );
}

export default PokemonCard;
