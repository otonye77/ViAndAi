import "./Button.css";

const Button = ({ onClick }) => {
    return (
        <div className="button-component">
            <button className="button" onClick={onClick}>Take Picture and Continue</button>
        </div>
    )
}

export default Button;
