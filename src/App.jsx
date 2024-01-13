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
      <form action="" onSubmit={onSubmit}>
        <input
          type="search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <button>Buscar</button>
      </form>
      <h1>Rick and Morty</h1>
      {data && data.info.prev && (
        <button
          onClick={() => {
            setPage(prev => prev - 1);
          }}>
          Pagina Previa
        </button>
      )}
      {data && data.info.next && (
        <button
          onClick={() => {
            setPage(prev => prev + 1);
          }}>
          Siguiente Pagina
        </button>
      )}

      {data && <ListCharacters characters={data.results} />}
    </main>
  );
}

export default App;
