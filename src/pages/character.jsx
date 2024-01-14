import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constans";
import { useState } from "react";
import { Link } from "react-router-dom";

const Character = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}character/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Error de red");
        }
        return res.json();
      })
      .then(res => {
        setCharacter(res);
        setIsLoading(false);
      })
      .catch(e => {
        console.error(e);
        setError("Error al cargar los datos");
        setIsLoading(false);
      });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="characterPage">
      <Link to={"/"} className="bentoCharacter__link">
        Volver
      </Link>
      <section className="container bentoCharacter">
        <div className="div1 bentoCharacter__item">
          <img
            src={character.image}
            alt={character.name}
            title={character.name}
            className="bentoCharacter__image"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="div2  bentoCharacter__item">
          <h1 className="bentoCharacter__name">{character.name}</h1>
        </div>
        <div className="div3 bentoCharacter__item">
          <p
            className={`bentoCharacter__status bentoItem__status bentoItem__status-${character.status}`}>
            {character.status}
          </p>
        </div>
        <div className="div4 bentoCharacter__item">
          <p className="bentoCharacter__name bentoItem__id">#{character.id}</p>
        </div>
        <div className="div5 bentoCharacter__item">
          <h2 className="bentoCharacter__location">
            {character.location.name}
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Character;
