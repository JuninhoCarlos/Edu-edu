import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage";

import { RootState } from "../app/store";

/* Definições de tipos de dados */
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

interface FilterType {
    type: "name" | "grade";
    value: string;
}

interface AlunosState {
    alunos: Array<Aluno>;
    filter: boolean;
    filterObj: FilterType;
    status: "loading" | "completed";
}

/* Ações assíncronas (THUNKs) */
const uploadAvatar = createAsyncThunk(
    "alunos/uploadAvatar",
    async (avatar: Avatar) => {
        const srcRef = firebase.storage().ref().child("avatars");
        const spaceRef = srcRef.child(avatar.fileName);
        await spaceRef.put(avatar.file!);
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
            await updateUrlAvatar;
            return data.id;
        }
    }
);

/* Estado inicial */
const initialState: AlunosState = {
    alunos: [],
    status: "completed",
    filter: false,
    filterObj: { type: "name", value: "" },
};

/* Definição do Slice */
const alunosReducer = createSlice({
    name: "alunos",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = true;
            state.filterObj = action.payload;
        },
        unsetFilter: (state) => {
            state.filter = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addAluno.fulfilled, () => {});
        builder.addCase(addAluno.pending, () => {});
        builder.addCase(addAluno.rejected, () => {});
        builder.addCase(getAlunos.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getAlunos.fulfilled, (state, action) => {
            state.alunos = action.payload;
            state.status = "completed";
        });
        builder.addCase(getAlunos.rejected, () => {});
    },
});

//Seletores
export const selectSeries = (state: RootState) => {
    const series: Array<number> = [];
    /*
    if (state.alunos.filter && state.alunos.filterObj.type === "grade") {
        return series;
    }*/
    state.alunos.alunos.forEach((aluno) => {
        if (!series.find((serie) => serie === aluno.serie))
            series.push(aluno.serie);
    });
    return series;
};

export const selectAlunosBySerie = (state: RootState, serie: Number) => {
    const regex = new RegExp(`^${state.alunos.filterObj.value.toLowerCase()}`);
    if (state.alunos.filter && state.alunos.filterObj.type === "name") {
        return state.alunos.alunos.filter(
            (aluno) =>
                aluno.serie === serie && regex.test(aluno.nome.toLowerCase())
        );
    }
    //Retorna tudo caso não tenha filtro aplicado
    return state.alunos.alunos.filter((aluno) => aluno.serie === serie);
};

export const { setFilter, unsetFilter } = alunosReducer.actions;

export default alunosReducer.reducer;
