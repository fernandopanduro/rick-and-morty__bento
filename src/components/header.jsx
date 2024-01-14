import React from "react";
import { useState } from "react";
import { BASE_URL } from "../constans";
import { useDispatch } from "react-redux";
import { setData } from "../store/characters/charactersSlice";

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
    <header className="container header">
      <h1 className="header__title">Ponte Rikoso</h1>
      <form action="" className="search" onSubmit={onSubmit}>
        <input
          type="search"
          className="search__input"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Rick..."
        />
        <button className="button">Buscar</button>
      </form>
    </header>
  );
};

export default Header;
