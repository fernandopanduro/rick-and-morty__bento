import React from "react";
import ItemCharacter from "./itemCharacter";

const ListCharacters = ({ characters }) => {
  return (
    <ul className={"bento container"}>
      {characters.map((character, index) => (
        <ItemCharacter
          key={character.id}
          character={character}
          index={index + 1}
        />
      ))}
    </ul>
  );
};

export default ListCharacters;
