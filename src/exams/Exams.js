import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Button from '../shared/button';
import PageContainer from '../shared/pageContainer';

export default function Exams() {
    const navigate = useNavigate();
    return (
        <PageContainer>
            <Title>Ver provas</Title>
            <Buttons>
                <Button onClick={() => navigate('/provas/professores')}>
                    Filtrar por professor
                </Button>
                <Button onClick={() => navigate('/provas/disciplinas')}>
                    Filtrar por disciplina
                </Button>
            </Buttons>

            <Button onClick={() => navigate('/')}>Voltar</Button>
        </PageContainer>
    );
}

const Title = styled.span`
    font-size: 40px;
    position: absolute;
    top: 50px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;

    width: 500px;
    button {
        width: 200px;
    }
`;
