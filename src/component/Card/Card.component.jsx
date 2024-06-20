import "./Card.css";
import MonitorRecorder from "../../Images/monitor-recorder.svg";
import Wifi from "../../Images/wifi.svg";
import LampCharge from "../../Images/lamp-charge.svg";
import Rectangle from "../../Images/Rectangle.svg";
import Button from "../Button/Button.component";

const Icons = [
    {
        id: 1,
        icon: MonitorRecorder,
        title: "Webcam"
    },
    {
        id: 2,
        icon: Wifi,
        title: "Speed"
    },
    {
        id: 3,
        icon: MonitorRecorder,
        title: "Gadget Mic"
    },
    {
        id: 4,
        icon: LampCharge,
        title: "Lighting"
    },
]

const Card = () => {
    return (
        <div className="card-container">
            <div className="card-inner-container">
            <div className="card-title">
                <h3>System Check</h3>
                <span>
                   We utilize your camera image to ensure fairness for all participants, and we also employ both your camera and
                   microphone for a video questions where you will be prompted to record a response using your camera or webcam,
                   so it's essential to verify that your camera and microphone are functioning correctly and that you have a stable
                   internet connection. To do this, please position yourself in front of your camera, ensuring that your entire face is
                   clearly visible on the screen. This includes your forehead, eyes, ears, nose, and lips. You can initiate a
                   5-second recording of yourself by clicking the button below.
                </span>
            </div>
            <div className="card-camera-container">
                <div className="empty-photo">
                    <img src={Rectangle} alt="" />
                </div>
                <div className="connectivities-icons">
                       {Icons.map((item) => (
                            <div key={item.id} className="icon-container">
                                <div className="icon-image-container">
                                  <img src={item.icon} alt={item.title} className="icon-image" />
                                </div>
                                 <span className="icon-title">{item.title}</span>
                            </div>
                        ))}
                </div>
            </div>
            <div>
                <Button />
            </div>
            </div>
        </div>
    )
}

export default Card;