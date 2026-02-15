import './Star.css';


function Star({ fill = 0, onHover, onClick, disabled, size }) {
  return (
    <div
      className={`star ${disabled ? 'disabled' : ''} ${size}`}
      onMouseMove={onHover}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24">
        <defs>
          <linearGradient id={`grad-${fill}`}>
            <stop offset={`${fill}%`} stopColor="#FFD700" />
            <stop offset={`${fill}%`} stopColor={disabled ? "#363636ff" : "#e5e7eb"} />
          </linearGradient>
        </defs>
        <path
          fill= {`url(#grad-${fill})`}
          d="M12 2.5
            C12.3 2.5 12.6 2.7 12.8 3.1
            L15.5 8.6
            L21.6 9.4
            C22 9.5 22.2 10 21.9 10.3
            L17.4 14.6
            L18.6 20.5
            C18.7 21 18.2 21.4 17.7 21.1
            L12 18
            L6.3 21.1
            C5.8 21.4 5.3 21
            5.4 20.5
            L6.6 14.6
            L2.1 10.3
            C1.8 10 2 9.5 2.4 9.4
            L8.5 8.6
            L11.2 3.1
            C11.4 2.7 11.7 2.5 12 2.5Z"
        />
      </svg>
    </div>
  );
}

export default Star;