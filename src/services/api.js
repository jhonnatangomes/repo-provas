import axios from 'axios';

const axiosBase = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const getInfo = () => axiosBase.get('/info');

const getTeacherInfo = (subject) =>
    axiosBase.get(`/info/professores?disciplina=${subject}`);

const sendExam = (body) => axiosBase.post('/provas', body);

const getTeachers = () => axiosBase.get('/provas/professores');

const getExamsByTeachers = (teacherId) =>
    axiosBase.get(`/provas/professores/${teacherId}`);

const getSubjects = () => axiosBase.get('/provas/disciplinas');

const getExamsBySubjects = (semesterId, subjectId) =>
    axiosBase.get(`/provas/disciplinas/${semesterId}/${subjectId}`);

export {
    getInfo,
    getTeacherInfo,
    sendExam,
    getTeachers,
    getExamsByTeachers,
    getSubjects,
    getExamsBySubjects,
};
