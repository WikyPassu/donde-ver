import { useState } from "react";
import Button from "./Button";
import Selection from "./Selection";

const Searcher = ({states, onSearch}) => {
  const [type, setType] = useState("movie");
  const { text, setText, search } = states;

  const handleOnChangeInput = e => setText(e.target.value);

  const handleOnClickSearchButton = () => onSearch(text, type);

  return (
    <div
      style={search ? { pointerEvents: "none", opacity: "0.4" } : {}} 
      className="searcher"
    >
      <input
        name="text"
        type="text"
        value={text}
        placeholder="Título"
        onChange={handleOnChangeInput}
      />
      <div className="options">
        <Selection type={type} setType={setType} />
        <Button text="Buscar" onClick={handleOnClickSearchButton} />
      </div>
    </div>
  );
};

export default Searcher;