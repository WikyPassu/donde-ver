import { useState } from "react";
import { searchByTitle } from "./services/streaming-service";
import Searcher from "./components/Searcher";
import ShowsList from "./components/ShowsList";
import { validateText } from "./utils/Validation";
import ShowInfo from "./components/ShowInfo";

const App = () => {
  const [text, setText] = useState("");
  const [search, setSearch] = useState(false);
  const [showsList, setShowsList] = useState(null);
  const [currentShow, setCurrentShow] = useState(null);

  const states = { text, setText, search, setSearch };

  const searchShows = async (title, show) => {
    if(!validateText(text)) return;
    setCurrentShow(null);
    setShowsList(null);
    setSearch(true);
    setShowsList(await searchByTitle(title, show));
    setSearch(false);
  };

  return (
    <div className="container">
      <h1>Dónde <span>ver</span></h1>
      <Searcher states={states} onSearch={searchShows} />
      <div className="results-content">
        {
          currentShow ? 
          <ShowInfo 
            show={currentShow}
            setCurrentShow = {setCurrentShow}
          /> : null
        }
        <ShowsList 
          search={search} 
          shows={showsList} 
          currentShow={currentShow}
          setCurrentShow={setCurrentShow} 
        />
      </div>
      <footer className="attribution">
        <p>La información de disponibilidad de transmisión la proporciona Streaming Availability API de 
          <a href="https://www.movieofthenight.com/about/api" target="_blank">
            <span> Movie of the Night</span>
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;