import "./Button.css";

const Button = ({ onClick, title }) => {
    return (
        <div className="button-component">
            <button className="button" onClick={onClick}>{title}</button>
        </div>
    )
}

export default Button;
