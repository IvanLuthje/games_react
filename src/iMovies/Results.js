import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const respuesta = await axios.post(
          "http://localhost:3001/api/igdb/games",
          {
            query: `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover.url,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,game_status,game_type,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; where id = ${id};`,
          },
        );

        setGame(respuesta.data[0]);
      } catch (error) {
        console.error("Error al obtener el detalle del game:", error);
      } finally {
        setCargando(false);
      }
    };

    getDetail();
  }, [id]);

  if (cargando) return <p>Cargando detalles...</p>;
  if (!game) return <p>Juego no encontrado.</p>;

  return (
    <div className="info">
      <div className="title">
        <h2>{game.name}</h2>
        <h3>
          {game.first_release_date
            ? new Date(game.first_release_date * 1000).toISOString().split('T')[0]
            : "N/A"}
        </h3>
        <div className="gameplot">
          <strong>Resumen:</strong>{" "}
          {game.summary || "No hay resumen disponible."}
        </div>
      </div>
      <div class="inf">
        <div class="col_inf">
          <img
            src={`https:${game.cover.url.replace("t_thumb", "t_cover_big") || game.cover.url !=="N/A" ? game.cover.url : "img/Image-not-found.png"}`}
            alt={game.name}
          />
        </div>
        <div className="desc">
          <div className="game-details">
            <div className="detail-item">
                <span className="detail-label">Puntuación:</span>{" "}
                <span className="detail-value">
                  {game.rating ? Math.round(game.rating) : "N/A"}/100
                </span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Desarrollador:</span>{" "}
                <span className="detail-value">{game.company}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Genero:</span>{" "}
                <span className="detail-value">{game.game_type}</span>
             </div>
            <div className="detail-item">

                <span className="detail-label">Plataformas:</span>{" "}
                <span className="detail-value">{game.platforms.map(game=><li key={game.id}>{game.name}</li>)}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">País:</span>{" "}
                <span className="detail-value">{game.country}</span>
            </div>
          </div>
        </div>
      </div>

      {/* <button onClick={() => navigate('/')}>Volver a la lista</button> */}
    </div>
  );
}

export default Results;
