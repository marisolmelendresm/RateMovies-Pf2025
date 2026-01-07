import './CheckIcon.css';

function CheckIcon({ checked, onClick }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={`checkCircle ${checked ? "checked" : "unchecked"}`}
            aria-hidden="true"
            onClick={onClick}
        >
            {/* Circle */}
            <circle cx="12" cy="12" r="10" />

            {/* Checkmark */}
            <path d="M7 12.5l3 3 7-7" />
        </svg>
    );
}

export default CheckIcon;