import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage";

import { RootState } from "../app/store";

interface Aluno {
    id?: string;
    nome: string;
    escola: string;
    avatar?: File | undefined;
    avatarUrl?: string | undefined;
    serie: number;
}

interface Avatar {
    fileName: string;
    file?: File;
    url?: string;
}

interface AlunosState {
    alunos: Array<Aluno>;
    status: "loading" | "completed";
}

const uploadAvatar = createAsyncThunk(
    "alunos/uploadAvatar",
    async (avatar: Avatar) => {
        const srcRef = firebase.storage().ref().child("avatars");
        const spaceRef = srcRef.child(avatar.fileName);
        return await spaceRef.put(avatar.file!);
    }
);

export const getAlunos = createAsyncThunk("alunos/getAlunos", async () => {
    const snapshot = await firebase
        .firestore()
        .collection("alunos")
        .orderBy("serie")
        .get();

    return snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    }) as Array<Aluno>;
});

export const addAluno = createAsyncThunk(
    "alunos/addAluno",
    async (aluno: Aluno, { dispatch }) => {
        const db = firebase.firestore();

        const promiseInsertAluno = db.collection("alunos").add({
            nome: aluno.nome,
            serie: aluno.serie,
            escola: aluno.escola,
        });
        //Espera a inserção no banco
        const data = await promiseInsertAluno;
        console.log("Dado da promessa eh:", data);
        //Faz o upload do avatar se diferente do default
        let uploadPromise;
        if (aluno.avatar) {
            uploadPromise = dispatch(
                uploadAvatar({
                    fileName: data.id,
                    file: aluno.avatar,
                })
            );

            await uploadPromise;

            //pega a url para a imagem e atualiza em aluno
            const avatarRef = firebase
                .storage()
                .ref()
                .child("avatars")
                .child(data.id);

            const url = await avatarRef.getDownloadURL();
            const updateUrlAvatar = db.collection("alunos").doc(data.id).set(
                {
                    avatarUrl: url,
                },
                { merge: true }
            );
            return await updateUrlAvatar;
        }
    }
);

const initialState: AlunosState = {
    alunos: [],
    status: "completed",
};
const alunosReducer = createSlice({
    name: "alunos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAluno.fulfilled, (state, action) => {});
        builder.addCase(addAluno.pending, (state, action) => {});
        builder.addCase(addAluno.rejected, (state, action) => {});
        builder.addCase(getAlunos.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(getAlunos.fulfilled, (state, action) => {
            state.alunos = action.payload;
            state.status = "completed";
        });
        builder.addCase(getAlunos.rejected, (state, action) => {
            console.log(action.error);
        });
    },
});

//selectors
export const selectSeries = (state: RootState) => {
    const series: Array<number> = [];
    state.alunos.alunos.forEach((aluno) => {
        if (!series.find((serie) => serie === aluno.serie))
            series.push(aluno.serie);
    });
    return series;
};

export const selectAlunosBySerie = (state: RootState, serie: Number) =>
    state.alunos.alunos.filter((aluno) => aluno.serie === serie);

//const selectTodoById = (state, todoId) => {
//        return state.todos.find(todo => todo.id === todoId)
//   }
//const todo = useSelector(state => selectTodoById(state, id))

export default alunosReducer.reducer;
