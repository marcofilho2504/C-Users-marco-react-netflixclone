import React, { useEffect, useState } from 'react';
import './App.css'
import tmdb from './tmdb'
import Movierow from './componentes/Movierow';
import Featuremovie from './componentes/Featuremovie';
import Header from './componentes/Header';

export default () => {

const [movielist, setmovielist] = useState([]);
const [featuredata, setFuturedata] = useState(null);
const [blackHeader, setBlackHeader] = useState(false);

useEffect(()=>{
  const loadall = async () => {
    // pegando a lista TOTAL
    let list = await tmdb.gethomelist();
    setmovielist(list);

    // pegando o feature
    let originals = list.filter(i => i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
    setFuturedata(chosenInfo);


  }
  

  loadall();
}, []);

useEffect(() => {
  const scrollListener = () => {
    if(window.scrollY > 10) {
      setBlackHeader(true);
    }else {
      setBlackHeader(false);
    }
  }

  window.addEventListener('scroll', scrollListener);
  return () => {
    window.removeEventListener('scroll', scrollListener);
  }
}, [])

  return (
    <div className = "page">

        <Header black = {blackHeader} />

      {featuredata &&
        <Featuremovie item = {featuredata} />

      }

        <section className = "lists">
          {movielist.map((item, key) => (
            <Movierow key={key} title = {item.title} items = {item.items}/>
          ))}
        </section>

        <footer>
           feito com <span role = "img" arial-label = "coração">❤️</span> por Marco Aurélio <br/> 
          Direitos de imagem para Netflix<br/>
          Dados pegos do site Themoviedb.org
        </footer>


        
        {movielist.length <= 0 && 
          <div className = "loading">
            <img src = "https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt = "Carregando..." /> 
          </div>
        }
    </div> 
  )
}