import Logo from "../../Images/Logo.svg";
import Time from "../../Images/timer-start.svg";
import Eye from "../../Images/eye.svg";
import "./Header.css";

const Header = () => {
    return (
        <div className="header-comp">
            <div className="header-container">
                <div className="logo-container">
                    <img src={Logo} alt="image" />
                    <div className="logo-title">
                        <span className="logo-span-title">Frontend Developer</span>
                        <span>Skill assessment test</span>
                    </div>
                </div>
                <div className="time-container">
                    <div className="time-card">
                        <img src={Time} alt="time" />
                        <span className="time-span">29:10 time left</span>
                    </div>
                    <div className="eye-container">
                        <img src={Eye} alt="time" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;