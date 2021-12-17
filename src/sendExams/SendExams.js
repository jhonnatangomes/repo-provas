import styled from 'styled-components';
import PageContainer from '../shared/pageContainer';
import Button from '../shared/button';
import InputField from './InputField';
import { useEffect, useState } from 'react';
import { getInfo, getTeacherInfo, sendExam } from '../services/api';
import { useNavigate } from 'react-router';
import CategoryField from './CategoryField';

export default function SendExams() {
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const [exam, setExam] = useState({
        name: '',
        category: '',
        semester: '',
        subject: '',
        teacher: '',
        link: '',
    });

    useEffect(() => {
        (async function getInfoFromServer() {
            const infoFromServer = await getInfo();
            const teacherFromServer = await getTeacherInfo(
                infoFromServer.data.subjects[0].name
            );

            setInfo({
                ...infoFromServer.data,
                teachers: teacherFromServer.data.map((el) => el.teacher),
            });
            setExam({
                ...exam,
                category: infoFromServer.data.categories[0].name,
                semester: infoFromServer.data.semesters[0].name,
                subject: infoFromServer.data.subjects[0].name,
                teacher: teacherFromServer.data[0].teacher.name,
            });
        })();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const promise = sendExam(exam);
        promise
            .then(() => {
                alert('Prova enviada com sucesso');
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    if (err.response.data.includes('link')) {
                        alert('Por favor, digite uma url válida de pdf');
                    }
                }
            });
    }

    return (
        <PageContainer>
            <Title>Enviar provas</Title>
            <Description>
                Preencha os campos abaixo para enviar uma nova prova
            </Description>
            <Form onSubmit={handleSubmit}>
                <InputField
                    exam={exam}
                    setExam={setExam}
                    inputType={'name'}
                    inputName={'Nome da prova'}
                />
                <CategoryField
                    exam={exam}
                    setExam={setExam}
                    categoryType={'category'}
                    categoryName={'Categoria'}
                    info={info}
                />
                <CategoryField
                    exam={exam}
                    setExam={setExam}
                    categoryType={'semester'}
                    categoryName={'Semestre'}
                    info={info}
                />
                <CategoryField
                    exam={exam}
                    setExam={setExam}
                    categoryType={'subject'}
                    categoryName={'Disciplina'}
                    info={info}
                    setInfo={setInfo}
                />
                <CategoryField
                    exam={exam}
                    setExam={setExam}
                    categoryType={'teacher'}
                    categoryName={'Professor'}
                    info={info}
                />
                <InputField
                    exam={exam}
                    setExam={setExam}
                    inputType={'link'}
                    inputName={'Link da prova'}
                />

                <Buttons>
                    <Button onClick={() => navigate('/')}>Voltar</Button>
                    <Button>Enviar prova</Button>
                </Buttons>
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

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    button {
        width: 200px;
    }
`;
