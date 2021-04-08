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
        <div className="container-fluid">
            <BarraDeBusca />

            {status === "loading" ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                series.map((element, index) => (
                    <ListarAno ano={element} key={index} />
                ))
            )}
        </div>
    );
};

export default ListarAluno;
