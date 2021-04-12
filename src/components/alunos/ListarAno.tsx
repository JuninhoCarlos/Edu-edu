import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { selectAlunosBySerie } from "../../reducers/alunosReducer";
import Card from "../Card";

interface ListarProps {
    ano: number;
}

const ListarAno = (props: ListarProps) => {
    const alunos = useSelector((state: RootState) =>
        selectAlunosBySerie(state, props.ano)
    );

    return (
        <>
            {alunos.length === 0 ? (
                ""
            ) : (
                <div className="container">
                    <p className="h2 m-0">
                        <strong>{props.ano}º Ano </strong>
                    </p>
                    <hr className="mt-0 mb-2"></hr>
                    <div className="row">
                        {alunos.map((element) => (
                            <div className="col-3 px-1">
                                <Card
                                    ano={props.ano}
                                    nome={element.nome}
                                    avatarUrl={element.avatarUrl}
                                    key={element.id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ListarAno;
