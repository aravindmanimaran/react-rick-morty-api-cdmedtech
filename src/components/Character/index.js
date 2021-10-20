import React from "react";
import { useHistory } from "react-router-dom";

const Character = (props) => {
  let { id, name, image } = props.character;
  let history = useHistory();
  const ComponentToAdd = props.componentToAdd;

  return (
    <div className="card black character">
      <div
        className="image-and-content"
        onClick={() => history.push(`/character/${id}`)}
      >
        <div className="image-container">
          <img alt={name} src={image} />
        </div>
        <div className="card-content">
          <strong className="green-text">{name}</strong>
        </div>
      </div>
      <div onClick={() => props.handlePreferredClick()} className="overlay">
        <ComponentToAdd />
      </div>
    </div>
  );
};

export default Character;
