import React from "react";
import avatar from "../../assets/kids/carmen.png";

const Card = (): JSX.Element => {
  return (
    <div className="card m-2 mb-3 box-shadow" style={{ width: "18rem" }}>
      <img
        src={avatar}
        style={{ width: "", height: "auto" }}
        className="card-img-top card-img mx-auto p-4"
        alt="..."
      />
      <div className="card-body pt-0">
        <p className="card-text">
          <span className="d-block h4 font-weight-bold">Nome</span>
          <span className="d-block">Ano</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
