const ShowPoster = ({show, currentShow, setCurrentShow}) => {
  const { imdbId, title, posterURL } = show;

  const handleOnClickShowPoster = () => {
    setCurrentShow(show);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div 
      className={`show-poster ${imdbId === currentShow?.imdbId ? "current" : ""}`} 
      onClick={handleOnClickShowPoster}
    >
      <img 
        src={posterURL ? posterURL : "assets/poster404.png"} 
        alt="" 
      />
      <div className="layer-poster">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default ShowPoster;