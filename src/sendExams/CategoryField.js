import styled from 'styled-components';
import { getTeacherInfo } from '../services/api';

export default function CategoryField(props) {
    const { exam, setExam, categoryType, categoryName, info, setInfo } = props;

    const pluralCategoryType =
        categoryType === 'category' ? 'categories' : categoryType + 's';

    function handleChange(e) {
        setExam({
            ...exam,
            [categoryType]: e.target.value,
        });

        if (e.target.id === 'subject') {
            const promise = getTeacherInfo(e.target.value);
            promise.then((res) =>
                setInfo({ ...info, teachers: res.data.map((el) => el.teacher) })
            );
        }
    }

    return (
        <div>
            <label htmlFor={categoryType}>{categoryName}</label>
            <Select
                id={categoryType}
                required
                value={exam.categoryType}
                onChange={handleChange}
            >
                {info
                    ? info[pluralCategoryType].map((el, i) => (
                          <option key={i}>{el.name}</option>
                      ))
                    : ''}
            </Select>
        </div>
    );
}

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
