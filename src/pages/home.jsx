import React from "react";
import Header from "../components/header";
import { useEffect } from "react";
import ListCharacters from "../components/listCharacters";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../store/characters/charactersSlice";

import { BASE_URL } from "../constans";
const Home = () => {
  const data = useSelector(state => state.characters.data);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${BASE_URL}character/`)
      .then(res => res.json())
      .then(res => dispatch(setData(res)))
      .catch(e => console.log(e));
  }, []);

  const nextPage = () => {
    window.scrollTo(0, 0);
    fetch(`${data.info.next}`)
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          dispatch(setData(res));
        }
      })
      .catch(e => console.log(e));
  };
  const prevPage = () => {
    window.scrollTo(0, 0);
    fetch(`${data.info.prev}`)
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          dispatch(setData(res));
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="home">
      <Header />
      {data.results && <ListCharacters characters={data.results} />}
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
    </div>
  );
};

export default Home;
