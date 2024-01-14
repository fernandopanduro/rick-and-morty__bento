import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constans";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/character.module.css";

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
    <div className={styles.characterPage}>
      <Link to={"/"} className={styles.bentoCharacter__link}>
        Volver
      </Link>
      <section className={`container ${styles.bentoCharacter}`}>
        <div className={`${styles.div1} ${styles.bentoCharacter__item}`}>
          <img
            src={character.image}
            alt={character.name}
            title={character.name}
            className={styles.bentoCharacter__image}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={`${styles.div2} ${styles.bentoCharacter__item}`}>
          <h1 className={`${styles.bentoCharacter__name}`}>{character.name}</h1>
        </div>
        <div className={`${styles.div3} ${styles.bentoCharacter__item}`}>
          <p
            className={`${styles.bentoCharacter__status} bentoItem__status bentoItem__status-${character.status}`}>
            {character.status}
          </p>
        </div>
        <div className={`${styles.div4} ${styles.bentoCharacter__item}`}>
          <p
            className={`${styles.bentoCharacter__name} ${styles.bentoItem__id}`}>
            #{character.id}
          </p>
        </div>
        <div className={`${styles.div5} ${styles.bentoCharacter__item}`}>
          <h2 className={styles.bentoCharacter__location}>
            {character.location.name}
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Character;
