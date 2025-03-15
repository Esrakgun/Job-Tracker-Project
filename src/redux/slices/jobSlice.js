import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    error: null,
    jobs: [],
}
const jobSlice = createSlice({
    name: "job",
    initialState: initialState,
    reducers: {
        // yüklenme durumu:
        setLoading: (state) => {
            state.isLoading = true;
        },
        // hata durumu:
        setError: (state, action) => {
            // Yükleme state'ini güncelle:
            state.isLoading = false;
            // Gelen hata mesajını state içerisindeki error'a aktar:
            state.error = action.payload.messaage;
        },
        // Api'dan iş verisini al ve reducer'a aktar.
        setJobs: (state, action) => {
            // Yüklenme statet'ini güncelle:
            state.isLoading = false,
                // hata state'ini nulla çek:
                state.error = null;
            // Gelen İş verisini state içerisindeki jobs!a aktar:
            state.jobs = action.payload;
        },
        // Yeni iş ekle:
        createJobs: (state, action) => {
            console.log(action);
            // action içerisinde gelen payload değerini state içerisindeki josbs dizisine aktar:
            state.jobs.push(action.payload);
        },
        // İş sil:
        deleteJobs: (state, action) => {
            // DeleteJob'a gelen id' ile silinecek veriyi state içerisinden bul ve state'den kaldır:


            // Silinecek elemanın sırasını state içerisinden bul:
            const index = state.jobs.findIndex((i) => i.id == action.payload);
            // Sırası bilinen eemanı state'den akaldır:
            state.jobs.splice(index, 1);
            // hem apidan kaldırdı hemde arayuzden:
            // console.log(action);  
        },
    },
});

// Aksiyonlar:
export const { setLoading, setError, setJobs, createJobs, deleteJobs } = jobSlice.actions;

// Reducer:
export default jobSlice.reducer;