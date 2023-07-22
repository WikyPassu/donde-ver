import RadioButton from "./RadioButton";

const Selection = ({type, setType}) => {
  const handleOnClickRadioButton = selectedType => setType(selectedType);

  return (
    <div className="selection">
      <RadioButton type="movie" activeType={type} desc="Película" onClick={handleOnClickRadioButton} />
      <RadioButton type="series" activeType={type} desc="Serie" onClick={handleOnClickRadioButton} />
    </div>
  );
};

export default Selection;