import styled from 'styled-components';
import { useNavigate } from 'react-router';
import PageContainer from '../shared/pageContainer';
import { useEffect, useState } from 'react';
import { getTeachers } from '../services/api';

export default function ExamsByType() {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState(null);

    useEffect(() => {
        const promise = getTeachers();
        promise.then((res) => setTeachers(res.data));
    }, []);

    return (
        <PageContainer>
            <Title>Professores</Title>
            <Teachers>
                {teachers &&
                    teachers.map((teacher) => (
                        <Teacher
                            key={teacher.id}
                            onClick={() =>
                                navigate(`/provas/professores/${teacher.id}`)
                            }
                        >
                            <p>Professor: {teacher.name}</p>
                            <p>Quantidade de provas: {teacher.amount}</p>
                        </Teacher>
                    ))}
            </Teachers>
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
