import React from "react";

const ItemCharacter = ({ character, index }) => {
  return (
    <li key={character.id} className={`div${index} bentoItem`}>
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
    </li>
  );
};

export default ItemCharacter;
