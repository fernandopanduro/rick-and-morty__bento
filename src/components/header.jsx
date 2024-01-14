import React from "react";
import { useState } from "react";
import { BASE_URL } from "../constans";
import { useDispatch } from "react-redux";
import { setData } from "../store/characters/charactersSlice";
import Button from "./button";
import styles from "../css/header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const searchCharacter = () => {
    window.scrollTo(0, 0);
    fetch(`${BASE_URL}character/?name=${searchValue}`)
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          dispatch(setData(res));
        }
      })
      .catch(e => console.log(e));
  };
  const onSubmit = e => {
    e.preventDefault();
    if (searchValue === "") return;
    searchCharacter();
  };
  return (
    <header className={`container ${styles.header}`}>
      <h1 className={styles.header__title}>Ponte Rikoso</h1>
      <form className={styles.search} onSubmit={onSubmit}>
        <input
          type="search"
          className={styles.search__input}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Rick..."
        />
        <Button text={"Buscar"} />
      </form>
    </header>
  );
};

export default Header;
