import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage";

interface Aluno {
    nome: string;
    escola: string;
    avatar: File;
    serie: number;
}

interface Avatar {
    fileName: string;
    file: File;
}

interface AlunosState {
    alunos: Array<Aluno>;
    status: "loading" | "done";
}

export const uploadAvatar = createAsyncThunk(
    "alunos/uploadAvatar",
    async (avatar: Avatar) => {
        const srcRef = firebase.storage().ref().child("avatars");
        const spaceRef = srcRef.child(avatar.fileName);
        await spaceRef
            .put(avatar.file)
            .then((snapshot) => {
                return snapshot;
            })
            .catch((e) => {
                return Promise.reject("Erro ao fazer upload do avatar");
            });
    }
);

export const addAluno = createAsyncThunk(
    "alunos/addAluno",
    async (aluno: Aluno, { dispatch }) => {
        const db = firebase.firestore();

        console.log("sending add to firebase");
        await db
            .collection("alunos")
            .add({
                nome: aluno.nome,
                serie: aluno.serie,
                escola: aluno.escola,
            })
            .then((docRef) => {
                dispatch(
                    uploadAvatar({ fileName: docRef.id, file: aluno.avatar })
                );
                return docRef.id;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
        console.log("saindo do thunk");
    }
);

const initialState: AlunosState = {
    alunos: [],
    status: "done",
};
const alunosReducer = createSlice({
    name: "alunos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAluno.fulfilled, (state, action) => {
            //state.alunos.push(action)
        });
        builder.addCase(addAluno.pending, (state, action) => {
            console.log("pending addAluno");
        });
        builder.addCase(addAluno.rejected, (state, action) => {
            console.log("rejected addAluno");
            console.log(action.error);
        });
    },
});

export default alunosReducer.reducer;
