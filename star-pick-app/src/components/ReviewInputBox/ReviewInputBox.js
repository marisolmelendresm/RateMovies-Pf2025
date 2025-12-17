import './ReviewInputBox.css';

function ReviewInputBox() {
    return (
        <div className="reviewInputForm">
            <textarea
                className="inputBox"
                placeholder="Write your take"
            ></textarea>
            <button>Save</button>
        </div>
    );
}

export default ReviewInputBox;