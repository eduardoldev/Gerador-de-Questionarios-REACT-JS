import { BrowserRouter, Route, Routes, Navigate, redirect } from "react-router-dom";
import NovoQuestionarioPage from "./pages/NovoQuestionarioPage/NovoQuestionarioPage";
import MostrarQuestionarioPage from "./pages/NovoQuestionarioPage/MostrarQuestionarioPage/MostrarQuestionarioPage";


export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MostrarQuestionarioPage />} path="/mostrarQuestionario" exact />
                <Route element={<NovoQuestionarioPage />} path="/novoQuestionario" exact />
                <Route element={<NovoQuestionarioPage />} path="*" exact />
            </Routes>
        </BrowserRouter>
    );
}