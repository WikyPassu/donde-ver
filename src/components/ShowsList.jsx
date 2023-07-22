import { useEffect, useState } from "react";
import ShowPoster from "./ShowPoster";
import useWindowSize from "../utils/useWindowSize";

const ShowsList = ({search, shows, currentShow, setCurrentShow}) => {
  const [animationClass, setAnimationClass] = useState("");
  const [text, setText] = useState("Inicia una búsqueda para ver coincidencias");
  const [gridStyle, setGridStyle] = useState({ gridTemplateColumns: "repeat(5, 1fr)" });
  const { width } = useWindowSize();

  useEffect(() => {
    if(search) {
      setAnimationClass("pre-animation");
      setText("Buscando...");

      const timeoutId = setTimeout(() => {
        setAnimationClass("animation");
      }, 800);
  
      return () => clearTimeout(timeoutId);
    }
    else if(!search && shows !== null && !shows.length) {
      setAnimationClass("");
      setText("No se encontraron resultados");
    }
  }, [search]);

  useEffect(() => {
    if(currentShow) {
      setGridStyle({ gridTemplateColumns: "repeat(4, 1fr)" });
      if(width < 1441) {
        setGridStyle({ gridTemplateColumns: "repeat(3, 1fr)" });
      }
      if(width < 1025) {
        setGridStyle({ marginTop: "2rem", gridTemplateColumns: "repeat(4, 1fr)" });
      }
      if(width < 769) {
        setGridStyle({ marginTop: "2rem", gridTemplateColumns: "repeat(3, 1fr)" });
      }
      if(width < 326) {
        setGridStyle({ marginTop: "2rem", gridTemplateColumns: "repeat(2, 1fr)" });
      }
    }
    else {
      setGridStyle({ gridTemplateColumns: "repeat(5, 1fr)" });
      if(width < 769) {
        setGridStyle({ gridTemplateColumns: "repeat(4, 1fr)" });
      }
      if(width < 551) {
        setGridStyle({ gridTemplateColumns: "repeat(3, 1fr)" });
      }
      if(width < 326) {
        setGridStyle({ gridTemplateColumns: "repeat(2, 1fr)" });
      }
    }
  }, [currentShow, width]);

  return (
    <div className="shows-list">
      {
        shows === null || !shows.length ?
        <div className="loupe-container">
          <img 
            className={`loupe ${animationClass}`}
            src="assets/loupe.png" 
            alt="" 
          />
          <p>{text}</p>
        </div> :
        <div className="shows-grid" style={gridStyle}>
          {
            shows.map((show, index) => (
              <ShowPoster key={index} show={show} setCurrentShow={setCurrentShow} />
            ))  
          }
        </div>
      }
    </div>
  );
};

export default ShowsList;