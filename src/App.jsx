import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [maleActors, setMaleActors] = useState([])
  const [femaleActors, setFemaleActors] = useState([])
  const [seeFilms, setSeeFilms] = useState(false)

  const actressesUrl = "https://lanciweb.github.io/demo/api/actresses/"
  const actorsUrl = "https://lanciweb.github.io/demo/api/actors/"

  function maleActorBtn() {
    axios.get(actorsUrl).then(res => {
      setMaleActors(res.data);
    });
    setFemaleActors([]);
  }

  function femaleActorBtn() {
    axios.get(actressesUrl).then(res => {
      setFemaleActors(res.data);
    });
    setMaleActors([]);
  }


  function showAll() {
    axios.get(actorsUrl).then(res => {
      setMaleActors(res.data);
    });
    axios.get(actressesUrl).then(res => {
      setFemaleActors(res.data);
    });
  }

  function bestFilms() {
    setSeeFilms(prev => !prev);
  };

  function clearData() {
    setMaleActors([]);
    setFemaleActors([]);
  }

  return (
    <>

      <button className='btn' onClick={maleActorBtn}>Actors</button>
      <button className='btn' onClick={femaleActorBtn}>Actress</button>
      <button className='btn' onClick={showAll}>Show All</button>
      <button className='btn' onClick={clearData}>Clear</button>
      <button className='btn' onClick={bestFilms}>Best Film</button>

      <div>

        <div className='container-flex wrap'>


          {maleActors.map(actor => {
            return <div className='card'>
              <div className='first'>
                <img className='actor-img' src={actor.image} onError={(e) => {
                  e.target.src = "https://sites.duke.edu/dek23/wp-content/themes/koji/assets/images/default-fallback-image.png";
                }} />

              </div>
              <div className='second'>
                <h2>{actor.name}</h2>
                <p className='birth-year'>{actor["birth_year"]}</p>
                <p>{actor.nationality}</p>
                <p className='actor-bio'>{actor.biography}</p>
                <p><strong>Awards:</strong> {actor.awards.join(", ")}</p>
                {seeFilms && (
                  <p className='actor-films'><strong>Known for: </strong>{actor["known_for"].join(", ")}</p>
                )}
              </div>
            </div>

          })}
        </div>
      </div>

      <div>
        <div className='container-flex wrap'>


          {femaleActors.map(actor => {
            return <div className='card'>
              <div className='first'>
                <img className='actor-img' src={actor.image} onError={(e) => {
                  e.target.src = "https://sites.duke.edu/dek23/wp-content/themes/koji/assets/images/default-fallback-image.png";
                }} />

              </div>
              <div className='second'>
                <h2>{actor.name}</h2>
                <p className='birth-year'>{actor["birth_year"]}</p>
                <p>{actor.nationality}</p>
                <p className='actor-bio'>{actor.biography}</p>
                <p><strong>Awards:</strong> {actor.awards}</p>
                {seeFilms && (
                  <p className='actor-films'><strong>Known for: </strong>{actor["most_famous_movies"].join(", ")}</p>
                )}
              </div>
            </div>

          })}
        </div>
      </div>

    </>
  )
}

export default App