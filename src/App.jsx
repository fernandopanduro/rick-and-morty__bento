import { useState } from "react";
import "./css/app.css";
import { useEffect } from "react";
import ListCharacters from "./components/listCharacters";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Character from "./pages/character";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "./store/characters/charactersSlice";

function App() {
  const data = useSelector(state => state.characters.data);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(res => res.json())
      .then(res => dispatch(setData(res)));
  }, []);

  const searchCharacter = () => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchValue}`)
      .then(res => res.json())
      .then(res => dispatch(setData(res)));
  };
  const nextPage = () => {
    window.scrollTo(0, 0);
    fetch(`${data.info.next}`)
      .then(res => res.json())
      .then(res => dispatch(setData(res)));
  };
  const prevPage = () => {
    window.scrollTo(0, 0);
    fetch(`${data.info.prev}`)
      .then(res => res.json())
      .then(res => dispatch(setData(res)));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (searchValue === "") return;
    searchCharacter();
  };

  return (
    <main>
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
      <Routes>
        <Route
          index
          element={data.results && <ListCharacters characters={data.results} />}
        />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
      <div className="container container__buttons">
        {data.results && data.info.prev && (
          <button
            className="button"
            onClick={() => {
              prevPage();
            }}>
            Pagina Previa
          </button>
        )}
        {data.results && data.info.next && (
          <button
            className="button"
            onClick={() => {
              nextPage();
            }}>
            Siguiente Pagina
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
