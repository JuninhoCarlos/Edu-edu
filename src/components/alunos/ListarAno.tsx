import React from "react";
import Card from "./Card";

interface ListarProps {
  ano: string;
}

const ListarAno = (props: ListarProps): JSX.Element => {
  return (
    <div className="align-self-start w-100 mt-3">
      <p className="h2 m-0">
        {" "}
        <strong>{props.ano} Ano </strong>
      </p>
      <hr className="mt-0 mb-2"></hr>
      <div className="d-flex flew-row">
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default ListarAno;
