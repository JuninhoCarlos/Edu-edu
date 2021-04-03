import React from "react";

import avatar from "../../assets/kids/carmen.png";

interface CardProps {
    id?: string;
    nome: string;
    ano: number;
    avatarUrl: string | undefined;
}

const Card = (props: CardProps) => {
    return (
        <div className="card m-2 mb-3 box-shadow" style={{ width: "18rem" }}>
            <img
                src={props.avatarUrl ? props.avatarUrl : avatar}
                style={{ width: "", height: "auto" }}
                className="card-img-top card-img mx-auto p-4"
                alt="..."
            />
            <div className="card-body pt-0">
                <p className="card-text">
                    <span className="d-block h4 font-weight-bold">
                        {props.nome}
                    </span>
                    <span className="d-block"> {props.ano}º Ano </span>
                </p>
            </div>
        </div>
    );
};

export default Card;
