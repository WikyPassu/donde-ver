const RadioButton = ({type, activeType, desc, onClick}) => {
  return (
    <div 
      className="radio-button-container"
      onClick={() => onClick(type)}
    >
      <div className="radio-button">
        {
          type === activeType ? <span className="circle" /> : null
        }
      </div>
      <p>{desc}</p>
    </div>
  );
};

export default RadioButton;