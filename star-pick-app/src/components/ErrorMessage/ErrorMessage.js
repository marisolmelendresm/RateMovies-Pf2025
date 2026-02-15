import './ErrorMessage.css';
import closeBtn from '../../assets/x_gray_icon.png';

export default function ErrorMessage({ message, position = '', closeMessage }) {

    return (
        <div className={`errorMessage ${position}`}>
            {closeMessage && <img className="closeBtn" src={closeBtn} alt="Close error message" onClick={closeMessage}/>}
            <p className="messageText" aria-live="polite">{message}</p>
        </div>
    )
}