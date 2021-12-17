import Input from '../shared/input';

export default function InputField({ exam, setExam, inputType, inputName }) {
    function handleChange(e) {
        setExam({
            ...exam,
            [inputType]: e.target.value,
        });
    }

    return (
        <div>
            <label htmlFor={inputType}>{inputName}</label>
            <Input
                id={inputType}
                required
                value={exam.inputType}
                onChange={handleChange}
            />
        </div>
    );
}
