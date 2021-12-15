import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './global/globalStyles';
import Home from './home/Home';

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
