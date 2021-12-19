import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import { getExamsBySubjects, getExamsByTeachers } from '../services/api';

export default function ExamsByCategory() {
    const location = useLocation();
    const params = useParams();
    const [exams, setExams] = useState(null);

    useEffect(() => {
        if (location.pathname.includes('/professores')) {
            const { id: teacherId } = params;
            const promise = getExamsByTeachers(teacherId);
            promise.then((res) => setExams(res.data));
        }
        if (location.pathname.includes('/disciplinas')) {
            const { semesterId, subjectId } = params;
            const promise = getExamsBySubjects(semesterId, subjectId);
            promise.then((res) => setExams(res.data));
        }
    }, []);

    return (
        <Container>
            <Title>
                {location.pathname.includes('/professores')
                    ? `Professor: ${exams ? exams.teacher : ''}`
                    : `Disciplina: ${exams ? exams.subject : ''}`}
            </Title>
            <Groups>
                {exams &&
                    exams.info.map((el, i) => (
                        <div key={i}>
                            <Category>{el.category}</Category>
                            <Exams>
                                {el.exams.map((innerEl, j) => (
                                    <a
                                        href={innerEl.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        key={j}
                                    >
                                        <Exam>
                                            <p>Nome: {innerEl.name}</p>
                                            {location.pathname.includes(
                                                '/professores'
                                            ) ? (
                                                <p>
                                                    Disciplina:{' '}
                                                    {innerEl.subject}
                                                </p>
                                            ) : (
                                                <p>
                                                    Professor: {innerEl.teacher}
                                                </p>
                                            )}
                                        </Exam>
                                    </a>
                                ))}
                            </Exams>
                        </div>
                    ))}
            </Groups>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.span`
    font-size: 40px;
    margin: 50px 0;
`;

const Groups = styled.div`
    width: 90vw;
    & > div:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const Exams = styled.div`
    display: flex;
    flex-wrap: wrap;

    div {
        margin-right: 20px;
        margin-bottom: 20px;
    }
`;

const Category = styled.p`
    font-size: 20px;
    margin-bottom: 20px;
`;

const Exam = styled.div`
    border-radius: 5px;
    width: 200px;
    height: 200px;
    background-color: white;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
`;
