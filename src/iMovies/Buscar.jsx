import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Buscadorgames() {
  const [busqueda, setBusqueda] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const manejarBusqueda = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) return;

    setLoading(true);
    try {
      // Llamada a tu servidor proxy local
      const response = await axios.post(
        "http://localhost:3001/api/igdb/games",
        {
          query: `search "${busqueda}"; fields name, cover.url, first_release_date, rating; limit 250;`,
        },
      );

      setGames(response.data);
    } catch (error) {
      console.error("Error buscando games:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="buscador">
        <form onSubmit={manejarBusqueda}>
          <input
            type="text"
            placeholder="Ej: Zelda, Mario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
      <div className="game-info">
        {games.map((game) => (
          <GameCard game={game} />
        ))}
      </div>
    </>
  );

  function GameCard({ game }) {
    return (
      <div className="game-card">
        <img
          src={`https:${game.cover?.url.replace("t_thumb", "t_cover_big")}`}
          alt={game.name}
        />

        <div className="desc_title">
          <h4>{game.name}</h4>
          <h5>
            <i className="fa fa-star" aria-hidden="true"></i>{" "}
            {game.rating?.toFixed(1)}
          </h5>
        </div>

        <div className="descripcion_buttons">
          <Link to={`/game/${game.id}`}>
            <button className="descripcion_button">
              <i className="fa fa-binoculars" aria-hidden="true"></i>
            </button>
          </Link>
 
        </div>
      </div>
    );
  }
}

export default Buscadorgames;
