import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [maleActors, setMaleActors] = useState([])

  const actressesUrl = "https://lanciweb.github.io/demo/api/actresses/"
  const actorsUrl = "https://lanciweb.github.io/demo/api/actors/"

  useEffect(() => {

    axios.get(actorsUrl).then(res => {
      setMaleActors(res.data);
    });
  }, [])


  return (
    <>

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
              </div>
            </div>

          })}
        </div>
      </div>

    </>
  )
}

export default App