import React from "react";
import { Link } from "react-router-dom";

const ItemCharacter = ({ character, index }) => {
  return (
    <li key={character.id} className={`div${index} bentoItem`}>
      <Link className="bentoItem__link" to={`/character/${character.id}`}>
        <img
          src={character.image}
          alt={character.name}
          title={character.name}
          loading="lazy"
          decoding="async"
          width="100%"
          height="auto"
        />
        <div className="bentoItem__overlay"></div>
        <div className="bentoItem__description">
          <div>
            <h3 className="bentoItem__name">{character.name}</h3>
            <p
              className={`bentoItem__status bentoItem__status-${character.status}`}>
              {character.status}
            </p>
          </div>
          <strong className="bentoItem__id">#{character.id}</strong>
        </div>
      </Link>
    </li>
  );
};

export default ItemCharacter;
