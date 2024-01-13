import { useState } from "react";
import "./css/app.css";
import { useEffect } from "react";
import ListCharacters from "./components/listCharacters";

function App() {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(res => res.json())
      .then(res => setData(res));
  }, [page]);

  const [searchValue, setSearchValue] = useState("");

  const searchCharacter = () => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchValue}`)
      .then(res => res.json())
      .then(res => setData(res));
    console.log(data);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (searchValue === "") return;
    searchCharacter();
    setSearchValue("");
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
          />
          <button className="button">Buscar</button>
        </form>
      </header>
      {data && <ListCharacters characters={data.results} />}
      <div className="container container__buttons">
        {data && data.info.prev && (
          <button
            className="button"
            onClick={() => {
              setPage(prev => prev - 1);
            }}>
            Pagina Previa
          </button>
        )}
        {data && data.info.next && (
          <button
            className="button"
            onClick={() => {
              setPage(prev => prev + 1);
            }}>
            Siguiente Pagina
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
