import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Index() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/igdb/games",
          {
            query: `fields name, id, cover.url, rating, genres.name;
                    sort rating desc;
                    limit 15;`,
          },
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error al traer juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="game-info">
      {games.map((game) => (
        <GameCard game={game} />
      ))}
    </div>
  );
}

function GameCard({ game }) {

  return (
    <div className="game-card">
      <img
        src={`https:${game.cover.url.replace("t_thumb", "t_cover_big")}`}
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

export default Index;
