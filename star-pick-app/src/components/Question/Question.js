import './Question.css';
import grayCheckmark from '../../assets/checkmark-gray.png';
import greenCheckmark from '../../assets/checkmark-green.png';
import { useState } from 'react';

function Question() {
    const [checked, setChecked] = useState(false);

    const toggleChecked = () => {
        setChecked(!checked);
    };

    return (
        <div className="questionContainer">
            <p className="questionText">Watched it?</p>
            <div className="iconContainer">
                <img className="icon" src={checked ? greenCheckmark : grayCheckmark} onClick={toggleChecked}></img>
            </div>
        </div>
    );
}

export default Question;