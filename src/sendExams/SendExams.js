import styled from 'styled-components';
import Input from '../shared/input';
import PageContainer from '../shared/pageContainer';
import Button from '../shared/button';

export default function SendExams() {
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <PageContainer>
            <Title>Enviar provas</Title>
            <Description>
                Preencha os campos abaixo para enviar uma nova prova
            </Description>
            <Form onSubmit={handleSubmit}>
                <div>
                    <label for="name">Nome da prova</label>
                    <Input id="name" required />
                </div>
                <div>
                    <label for="name">Categoria</label>
                    <Select required></Select>
                </div>
                <div>
                    <label for="name">Semestre</label>
                    <Select required></Select>
                </div>
                <div>
                    <label for="name">Disciplina</label>
                    <Select required></Select>
                </div>
                <div>
                    <label for="name">Professor</label>
                    <Select required></Select>
                </div>
                <div>
                    <label for="name">Link da prova</label>
                    <Input type="url" required />
                </div>

                <Button>Enviar prova</Button>
            </Form>
        </PageContainer>
    );
}

const Title = styled.span`
    font-size: 40px;
`;

const Description = styled.span`
    font-size: 25px;
    display: inline-block;
    margin-top: 30px;
`;

const Form = styled.form`
    margin-top: 20px;
    width: 450px;
    text-align: center;

    input,
    select {
        margin-bottom: 10px;
    }

    input:nth-child(6) {
        margin-bottom: 20px;
    }

    & > div {
        display: flex;
        align-items: center;
    }

    label {
        width: 200px;
        padding-bottom: 10px;
    }
`;

const Select = styled.select`
    width: 100%;
    height: 35px;
    border-radius: 5px;
    border: none;
    background-color: white;
    padding: 10px;

    option {
        background-color: white;
    }
`;
