import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/itemCharacter.module.css";

const ItemCharacter = ({ character, index }) => {
  return (
    <li
      key={character.id}
      className={`${styles[`div${index}`]} ${styles.bentoItem}`}>
      <Link
        className={styles.bentoItem__link}
        to={`/character/${character.id}`}>
        <img
          src={character.image}
          alt={character.name}
          title={character.name}
          loading="lazy"
          decoding="async"
          width="100%"
          height="auto"
        />
        <div className={styles.bentoItem__overlay}></div>
        <div className={styles.bentoItem__description}>
          <div>
            <h3 className={styles.bentoItem__name}>{character.name}</h3>
            <p
              className={`bentoItem__status bentoItem__status-${character.status}`}>
              {character.status}
            </p>
          </div>
          <strong className={styles.bentoItem__id}>#{character.id}</strong>
        </div>
      </Link>
    </li>
  );
};

export default ItemCharacter;
