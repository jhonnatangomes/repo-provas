import styled from 'styled-components';
import Input from '../shared/input';
import PageContainer from '../shared/pageContainer';
import Button from '../shared/button';
import { useEffect, useState } from 'react';
import { getInfo, getTeacherInfo, sendExam } from '../services/api';
import { useNavigate } from 'react-router';

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
        (async function () {
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
                console.log(err.response);
                if (err.response.status === 400) {
                    if (err.response.data.includes('link')) {
                        alert('Por favor, digite uma url válida de pdf');
                    }
                }
            });
    }

    function handleChange(e) {
        if (e.target.id === 'name') {
            setExam({
                ...exam,
                name: e.target.value,
            });
        }
        if (e.target.id === 'category') {
            setExam({
                ...exam,
                category: e.target.value,
            });
        }
        if (e.target.id === 'semester') {
            setExam({
                ...exam,
                semester: e.target.value,
            });
        }
        if (e.target.id === 'subject') {
            setExam({
                ...exam,
                subject: e.target.value,
            });

            const promise = getTeacherInfo(e.target.value);
            promise.then((res) =>
                setInfo({ ...info, teachers: res.data.map((el) => el.teacher) })
            );
        }
        if (e.target.id === 'teacher') {
            setExam({
                ...exam,
                teacher: e.target.value,
            });
        }
        if (e.target.id === 'link') {
            setExam({
                ...exam,
                link: e.target.value,
            });
        }
    }

    return (
        <PageContainer>
            <Title>Enviar provas</Title>
            <Description>
                Preencha os campos abaixo para enviar uma nova prova
            </Description>
            <Form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome da prova</label>
                    <Input
                        id="name"
                        required
                        value={exam.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="category">Categoria</label>
                    <Select
                        id="category"
                        required
                        value={exam.category}
                        onChange={handleChange}
                    >
                        {info
                            ? info.categories.map((el, i) => (
                                  <option key={i}>{el.name}</option>
                              ))
                            : ''}
                    </Select>
                </div>
                <div>
                    <label htmlFor="semester">Semestre</label>
                    <Select
                        id="semester"
                        required
                        value={exam.semester}
                        onChange={handleChange}
                    >
                        {info
                            ? info.semesters.map((el, i) => (
                                  <option key={i}>{el.name}</option>
                              ))
                            : ''}
                    </Select>
                </div>
                <div>
                    <label htmlFor="subject">Disciplina</label>
                    <Select
                        id="subject"
                        required
                        value={exam.subject}
                        onChange={handleChange}
                    >
                        {info
                            ? info.subjects.map((el, i) => (
                                  <option key={i}>{el.name}</option>
                              ))
                            : ''}
                    </Select>
                </div>
                <div>
                    <label htmlFor="teacher">Professor</label>
                    <Select id="teacher" required>
                        {info
                            ? info.teachers.map((el, i) => (
                                  <option key={i}>{el.name}</option>
                              ))
                            : ''}
                    </Select>
                </div>
                <div>
                    <label htmlFor="link">Link da prova</label>
                    <Input
                        id="link"
                        type="url"
                        required
                        value={exam.link}
                        onChange={handleChange}
                    />
                </div>

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

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    button {
        width: 200px;
    }
`;
