import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { setFilter, unsetFilter } from "../../reducers/alunosReducer";
import "../login/login.css";

interface Filtro {
    nome: Boolean;
    ano: Boolean;
}

const BarraDeBusca = () => {
    const { url } = useRouteMatch();
    const dispatch = useAppDispatch();

    const [filtrarPor, setFiltrarPor] = useState<Filtro>({
        nome: true,
        ano: false,
    });

    const [filtervalue, setFilterData] = useState<string>("");

    useEffect(() => {
        if (filtervalue.length >= 3) {
            console.log("filtra");
            dispatch(
                setFilter({
                    type: filtrarPor.nome ? "name" : "grade",
                    value: filtervalue,
                })
            );
            return;
        }
        dispatch(unsetFilter());
    }, [filtervalue, dispatch, filtrarPor.nome]);

    return (
        <div className="py-2 my-3 align-self-center w-100 bg-white my-border my-radius">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="input-group input-group-lg w-25 ml-3 mt-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar"
                        aria-label="Input group example"
                        aria-describedby="basic-addon1"
                        value={filtervalue}
                        onChange={(e) => {
                            setFilterData(e.target.value);
                        }}
                    />
                    <div className="input-group-append ">
                        <span className="input-group-text" id="basic-addon1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="d-flex flex-column ">
                    <p className="m-0 my-font my-primary-text-color">
                        Filtrar por:
                    </p>
                    <div className="btn-group btn-group-toggle">
                        <label
                            className={`border btn my-font ${
                                filtrarPor.nome
                                    ? "my-primary-button"
                                    : "my-primary-text-color"
                            }`}
                        >
                            <input
                                type="radio"
                                name="options"
                                id="option1"
                                autoComplete="off"
                                onClick={() =>
                                    setFiltrarPor({ nome: true, ano: false })
                                }
                            />
                            Nome
                        </label>
                        <label
                            className={`px-4 border btn my-font ${
                                filtrarPor.ano
                                    ? "my-primary-button"
                                    : "my-primary-text-color"
                            }`}
                        >
                            <input
                                type="radio"
                                name="options"
                                id="option2"
                                autoComplete="off"
                                onClick={() =>
                                    setFiltrarPor({ nome: false, ano: true })
                                }
                            />
                            Ano
                        </label>
                    </div>
                </div>

                <div className="mr-3">
                    <Link
                        to={`${url}/cadastro`}
                        type="button"
                        className="py-2 btn btn-primary text-white my-btn my-primary"
                        style={{ height: "auto" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-plus-circle my-font"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <span style={{ position: "relative", top: "2px" }}>
                            Cadastrar Novo Aluno
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BarraDeBusca;
