const Platform = ({platform}) => {
  const { src, name } = platform;

  return (
    <div className="platform">
      <img src={src} alt="" />
      <p>{name}</p>
    </div>
  );
};

export default Platform;