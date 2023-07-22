import Platform from "./Platform";

const ShowInfo = ({show, setCurrentShow}) => {
  const {
    type, title, originalTitle, overview,
    streamingInfo, backdropURL, genres, posterURL,
    runtime, year, firstAirYear, lastAirYear,
    seasonCount, episodeCount 
  } = show;

  return (
    <div className="show-info">
      <div className="round-btn">
        <i className="bx bxs-x-circle" onClick={() => setCurrentShow(null)} />
      </div>
      {
        backdropURL ?
        <div className="backdrop">
          <img
            src={backdropURL}
            alt="" 
          />
          <div className="backdrop-shadow"></div>
        </div> : null
      }
      <div 
        className="content" 
        style={backdropURL ? {marginTop: "-15vw"} : {}}
      >
        <div className="first-info">
          <img 
            className="poster"
            src={posterURL ? posterURL : "assets/poster404.png"} 
            alt="" 
          />
        </div>
        <div className="second-info">
          <div className="heading">
            <h3>{title}</h3>
            {
              title !== originalTitle ?
              <p>Título original:{` ${originalTitle}`}</p> : null
            }
          </div>
          <div className="overview">
              {
                streamingInfo ? 
                <>
                  <h5>DÓNDE VER</h5>
                  <div className="streaming-platforms">
                    {
                      streamingInfo.map((platform, index) => <Platform key={index} platform={platform} />)
                    }
                  </div>    
                </> : null
              }
            {
              overview ?
              <>
                <h5>SINOPSIS</h5>
                <p>{overview}</p>
              </> : null
            }
            {
              type === "series" ?
              <>
                <h5>TEMPORADAS Y EPISODIOS</h5>
                <p>{`${seasonCount} temporada/s y ${episodeCount} episodio/s en total`}</p>
              </> : null
            }
            {
            year ?
            <>
              <h5>AÑO DE ESTRENO</h5>
              <p>{year}</p>
            </> :
            <>
              <h5>PRIMER Y ÚLTIMO AÑO AL AIRE</h5>
              <p>{`${firstAirYear} - ${lastAirYear}`}</p>
            </>
          }
          <h5>GÉNEROS</h5>
          <p>{genres}</p>
          {
            runtime ?
            <>
              <h5>DURACIÓN</h5>
              <p>{`${runtime} minutos`}</p>
            </> : null
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInfo;