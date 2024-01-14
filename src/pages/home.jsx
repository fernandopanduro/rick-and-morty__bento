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

  const fetchData = (url, callback) => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          callback(res);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchData(`${BASE_URL}character/`, data => dispatch(setData(data)));
  }, []);

  const handlePage = url => {
    window.scrollTo(0, 0);
    fetchData(url, data => dispatch(setData(data)));
  };

  return (
    <div className="home">
      <Header />
      {data.results && <ListCharacters characters={data.results} />}
      <div className="container container__buttons">
        {data.results && data.info.prev && (
          <button className="button" onClick={() => handlePage(data.info.prev)}>
            Pagina Previa
          </button>
        )}
        {data.results && data.info.next && (
          <button className="button" onClick={() => handlePage(data.info.next)}>
            Siguiente Pagina
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
