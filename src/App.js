import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Exams from './exams/Exams';
import ExamsByType from './exams/ExamsByType';
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
                <Route path="/provas/professores" element={<ExamsByType />} />
            </Routes>
        </BrowserRouter>
    );
}
