import './Question.css';
import CheckIcon from '../CheckIcon/CheckIcon';

function Question({ checked = false, onClick }) {

    return (
        <div className="questionContainer">
            <p className="questionText">Watched it?</p>
            <div className="iconContainer">
                <CheckIcon checked={checked} onClick={onClick} />
            </div>
        </div>
    );
}

export default Question;