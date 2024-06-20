import "./Card.css";
import MonitorRecorder from "../../Images/monitor-recorder.svg";
import Wifi from "../../Images/wifi.svg";
import LampCharge from "../../Images/lamp-charge.svg";
import Rectangle from "../../Images/Rectangle.svg";
import TickCircle from "../../Images/tick-circle.svg";
import Button from "../Button/Button.component";
import { useEffect, useState } from "react";


const Card = () => {
    const [micAccess, setMicAccess] = useState(null);

    useEffect(() => {
        const checkMicrophone = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setMicAccess(true);
                stream.getTracks().forEach(track => track.stop());
            } catch (error) {
                setMicAccess(false);
            }
        };

        checkMicrophone();
    }, []);

    console.log("mic access ", micAccess);

    const requestMicAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMicAccess(true);
            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            console.error("Microphone access denied", error);
        }
    };

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
                            <div  className="icon-container">
                                <div className="icon-image-container">
                                    <img src={MonitorRecorder} alt="" className="icon-image" />
                                </div>
                                <span className="icon-title">Webcam</span>
                            </div>
                            <div  className="icon-container">
                                <div className="icon-image-container">
                                    <img src={Wifi} alt="" className="icon-image" />
                                </div>
                                <span className="icon-title">Speed</span>
                            </div>
                            <div  className="icon-container">
                                <div className="icon-image-container">
                                    {micAccess ?  <img src={TickCircle} alt="" className="icon-image" /> : <img src={MonitorRecorder} alt="" className="icon-image" />}
                                </div>
                                <span className="icon-title">Gadget Mic</span>
                            </div>
                            <div  className="icon-container">
                                <div className="icon-image-container">
                                    <img src={LampCharge} alt="" className="icon-image" />
                                </div>
                                <span className="icon-title">Lighting</span>
                            </div>
                    </div>
                </div>
                <div>
                    {/* {micAccess === false && (
                        <div className="mic-access-warning">
                            <p>Microphone access is required. Please click the button below to enable your microphone.</p>
                            <button onClick={requestMicAccess}>Enable Microphone</button>
                        </div>
                    )} */}
                    <Button />
                </div>
            </div>
        </div>
    );
}

export default Card;
