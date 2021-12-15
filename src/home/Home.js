import styled from 'styled-components';
import Button from '../shared/button';
import PageContainer from '../shared/pageContainer';
import { useNavigate } from 'react-router';

export default function Home() {
    const navigate = useNavigate();
    return (
        <PageContainer>
            <WelcomeAndDescription>
                <Welcome>Bem vindo ao RepoProvas</Welcome>
                <Description>
                    Aqui você pode visualizar provas enviadas por vários alunos
                    do Brasil ou enviar a sua própria prova.
                </Description>
            </WelcomeAndDescription>
            <Buttons>
                <Button onClick={() => navigate('/provas')}>Ver provas</Button>
                <Button onClick={() => navigate('/provas/enviar')}>
                    Enviar provas
                </Button>
            </Buttons>
        </PageContainer>
    );
}

const WelcomeAndDescription = styled.div`
    position: absolute;
    text-align: center;
    top: 60px;
`;

const Welcome = styled.p`
    font-size: 40px;
    margin-bottom: 30px;
`;

const Description = styled.p`
    font-size: 25px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;

    button:first-child {
        margin-right: 30px;
    }
`;
