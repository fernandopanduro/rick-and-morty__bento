import React from "react";
import Header from "../components/header";
import ListCharacters from "../components/listCharacters";
import Button from "../components/button";
import styles from "../css/home.module.css";
import { useEffect } from "react";
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
    <div className={styles.home}>
      <Header />
      {data.results && <ListCharacters characters={data.results} />}
      <div className={`container ${styles.container__buttons}`}>
        {data.results && data.info.prev && (
          <Button
            text={"Pagina Previa"}
            onClick={() => handlePage(data.info.prev)}
          />
        )}
        {data.results && data.info.next && (
          <Button
            text={"Siguiente Pagina"}
            onClick={() => handlePage(data.info.next)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
