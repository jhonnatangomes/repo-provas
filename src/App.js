import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Exams from './exams/Exams';
import ExamsByCategory from './exams/ExamsByCategory';
import ExamsBySubjects from './exams/ExamsBySubjects';
import ExamsByTeacher from './exams/ExamsByTeacher';
import GlobalStyle from './global/globalStyles';
import Home from './home/Home';
import SendExams from './sendExams/SendExams';

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/provas/enviar" element={<SendExams />} />
                <Route path="/provas" element={<Exams />} />
                <Route
                    path="/provas/professores"
                    element={<ExamsByTeacher />}
                />
                <Route
                    path="/provas/professores/:id"
                    element={<ExamsByCategory />}
                />
                <Route
                    path="/provas/disciplinas"
                    element={<ExamsBySubjects />}
                />
                <Route
                    path="/provas/disciplinas/:semesterId/:subjectId"
                    element={<ExamsByCategory />}
                />
            </Routes>
        </BrowserRouter>
    );
}
