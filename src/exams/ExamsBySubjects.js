import styled from 'styled-components';
import { useNavigate } from 'react-router';
import PageContainer from '../shared/pageContainer';
import { useEffect, useState } from 'react';
import { getSubjects } from '../services/api';

export default function ExamsBySubjects() {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState(null);

    console.log(subjects);

    useEffect(() => {
        const promise = getSubjects();
        promise.then((res) => setSubjects(res.data));
    }, []);

    return (
        <PageContainer>
            <Title>Disciplinas</Title>
            <Groups>
                {subjects &&
                    subjects.map((subject) => (
                        <div key={subject.id}>
                            <Category>
                                {subject.semester.includes('º')
                                    ? subject.semester + ' período'
                                    : subject.semester}
                            </Category>
                            <Exams>
                                {subject.exams.map((el) => (
                                    <Exam
                                        key={el.id}
                                        onClick={() =>
                                            navigate(
                                                `/provas/disciplinas/${subject.id}/${el.id}`
                                            )
                                        }
                                    >
                                        <p>Disciplina: {el.subject}</p>
                                        <p>Quantidade de provas: {el.amount}</p>
                                    </Exam>
                                ))}
                            </Exams>
                        </div>
                    ))}
            </Groups>
        </PageContainer>
    );
}

const Title = styled.span`
    font-size: 40px;
    position: absolute;
    top: 50px;
`;

const Teachers = styled.div`
    display: flex;

    div {
        margin-right: 20px;
        margin-bottom: 20px;
    }
`;

const Teacher = styled.div`
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
