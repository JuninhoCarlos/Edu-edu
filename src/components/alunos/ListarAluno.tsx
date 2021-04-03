import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../../app/store";
import { getAlunos, selectSeries } from "../../reducers/alunosReducer";

import BarraDeBusca from "./BarraDeBusca";
import ListarAno from "./ListarAno";

import "./style.css";

const ListarAluno = () => {
    const dispatch = useAppDispatch();
    const series = useSelector(selectSeries);
    const status = useSelector((state: RootState) => state.alunos.status);

    useEffect(() => {
        dispatch(getAlunos());
    }, [dispatch]);

    return (
        <div className="d-flex flex-column align-items-center">
            <BarraDeBusca />
            {status === "loading"
                ? "Carregando"
                : series.map((element, index) => (
                      <ListarAno ano={element} key={index} />
                  ))}
        </div>
    );
};

export default ListarAluno;
