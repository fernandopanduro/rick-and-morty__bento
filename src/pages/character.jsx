import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constans";
import { useState } from "react";
import { Link } from "react-router-dom";

const Character = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const [character, setCharacter] = useState({
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    location: {
      name: "Citadel of Ricks",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  });
  useEffect(() => {
    fetch(`${BASE_URL}character/${id}`)
      .then(res => res.json())
      .then(res => {
        setCharacter(res);
      })
      .catch(e => console.log(e));
  }, [id]);
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
