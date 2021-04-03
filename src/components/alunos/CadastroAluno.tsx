import React from "react";
import { Form, Field } from "react-final-form";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage";

import { addAluno } from "../../reducers/alunosReducer";
import { useAppDispatch } from "../../app/store";

import "./style.css";
import boneca from "../../assets/boneca.svg";
import userIcon from "../../assets/icons/icon_user.png";
import hatIcon from "../../assets/icons/icon_hat.png";
import required from "../common/validators";
import FileField from "../common/FileField";
import InputField from "../common/InputField";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
//import { unwrapResult } from "@reduxjs/toolkit";

interface Errors {
    autorizacao?: string;
}

interface Cadastro {
    avatar: FileList;
    autorizacao: boolean;
    nome: string;
    serie: number;
    escola: string;
}

const CadastroAluno = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const onSubmit = async (values: Cadastro) => {
        dispatch(
            addAluno({
                nome: values.nome,
                escola: values.escola,
                serie: Number(values.serie),
                avatar: values.avatar ? values.avatar[0] : undefined,
            })
        )
            .then(unwrapResult)
            .then((data) => {
                history.replace("/dashboard");
            })
            .catch((err) => {
                console.log("Error ao cadastrar", err);
            });
    };

    return (
        <div className="d-flex flex-row justify-content-center align-items-center mt-5">
            <div className="flex-container-column cadastro-form box-shadow">
                <Form
                    onSubmit={onSubmit}
                    validate={(values) => {
                        const errors: Errors = {};
                        if (!values.autorizacao) {
                            errors.autorizacao =
                                "Você deve concordar com nossa política para se cadastrar";
                        }
                        return errors;
                    }}
                    render={({ handleSubmit }) => (
                        <form
                            className="form d-flex flex-column align-items-center"
                            onSubmit={handleSubmit}
                        >
                            {/*Avatar */}
                            <div className="avatar d-flex flex-column align-items-center">
                                <FileField
                                    name="avatar"
                                    id="file-upload"
                                    className="d-none"
                                    accept="image/png, image/jpeg"
                                />
                            </div>
                            {/*Form*/}
                            <div className="form-group container-fluid relative ">
                                <InputField
                                    name="nome"
                                    validate={required}
                                    className="form-control my-input input-login padding-left-input"
                                    label="Nome Completo"
                                    type="text"
                                    icon={userIcon}
                                ></InputField>
                            </div>

                            <div className="form-group container-fluid relative">
                                <InputField
                                    name="escola"
                                    validate={required}
                                    type="text"
                                    className="form-control my-input input-login padding-left-input"
                                    label="Escola"
                                    icon={hatIcon}
                                />
                            </div>
                            <p className="ano-escolar-p">Ano Escolar</p>
                            <div className="d-flex container-fluid">
                                <div className="bonequinha">
                                    <img src={boneca} alt="" />
                                </div>

                                <div className="container-fluid">
                                    <div className="series-p d-flex justify-content-between">
                                        <p>Pre</p> <p>1</p> <p>2</p> <p>3</p>
                                    </div>
                                    <Field name="serie" initialValue={1}>
                                        {({ meta, input }) => (
                                            <>
                                                <input
                                                    {...input}
                                                    type="range"
                                                    className="form-range"
                                                    style={{ width: "100%" }}
                                                    min="1"
                                                    max="4"
                                                    id="customRange1"
                                                ></input>
                                            </>
                                        )}
                                    </Field>

                                    <p className="info">
                                        <b>Pré I</b>: Aluno completou 4 anos
                                        antes do dia 31 de março de 2020
                                    </p>
                                    <p className="info">
                                        <strong>Pré II</strong>: Aluno completou
                                        5 anos antes do dia 31 de março de 2020
                                    </p>
                                </div>
                            </div>

                            <div className="container-fluid mt-3 form-group form-check">
                                <Field name="autorizacao" type="checkbox">
                                    {({ meta, input }) => (
                                        <>
                                            <input
                                                {...input}
                                                className="form-check-input"
                                                id="exampleCheck1"
                                            />
                                            <label
                                                className="form-check-label info"
                                                htmlFor="exampleCheck1"
                                            >
                                                Eu autorizo o EduEdu a coletar e
                                                processar os dados do meu
                                                filho(a) conforme a política de
                                                privacidade
                                            </label>
                                            {meta.error && meta.touched && (
                                                <div className="invalid-feedback d-block">
                                                    {meta.error}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Field>
                            </div>

                            <div className="w-50 mx-auto mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary text-white my-btn my-primary "
                                >
                                    Adicionar Aluno
                                </button>
                            </div>
                        </form>
                    )}
                ></Form>
            </div>
        </div>
    );
};

export default CadastroAluno;
