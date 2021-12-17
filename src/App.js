import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
            </Routes>
        </BrowserRouter>
    );
}
