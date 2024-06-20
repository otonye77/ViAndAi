import "./Card.css";
import MonitorRecorder from "../../Images/monitor-recorder.svg";
import Wifi from "../../Images/wifi.svg";
import LampCharge from "../../Images/lamp-charge.svg";
import Rectangle from "../../Images/Rectangle.svg";
import TickCircle from "../../Images/tick-circle.svg";
import Button from "../Button/Button.component";
import { useEffect, useState, useRef } from "react";

const initialIcons = [
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
];

const Card = () => {
    const [micAccess, setMicAccess] = useState(null);
    const [cameraAccess, setCameraAccess] = useState(null);
    const [lightingGood, setLightingGood] = useState(null);
    const [online, setOnline] = useState(navigator.onLine);
    const [imageCaptured, setImageCaptured] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const checkMediaDevices = async () => {
            try {
                const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setMicAccess(true);
                micStream.getTracks().forEach(track => track.stop());

                const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setCameraAccess(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = cameraStream;
                }

                setTimeout(checkLightingConditions, 1000);

            } catch (error) {
                setMicAccess(false);
                setCameraAccess(false);
            }
        };

        checkMediaDevices();

        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const requestMicAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMicAccess(true);
            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            console.error("Microphone access denied", error);
        }
    };

    const requestCameraAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraAccess(true);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            
            setTimeout(checkLightingConditions, 1000);

        } catch (error) {
            console.error("Camera access denied", error);
        }
    };

    const checkLightingConditions = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let r, g, b, avg;
            let colorSum = 0;

            for (let x = 0, len = data.length; x < len; x += 4) {
                r = data[x];
                g = data[x + 1];
                b = data[x + 2];
                avg = Math.floor((r + g + b) / 3);
                colorSum += avg;
            }

            const brightness = Math.floor(colorSum / (canvas.width * canvas.height));
            setLightingGood(brightness > 100); 
        }
    };

    const getUpdatedIcons = () => {
        return initialIcons.map(icon => {
            switch (icon.id) {
                case 3:
                    return {
                        ...icon,
                        icon: micAccess ? TickCircle : MonitorRecorder
                    };
                case 1:
                    return {
                        ...icon,
                        icon: cameraAccess ? TickCircle : MonitorRecorder
                    };
                case 4:
                    return {
                        ...icon,
                        icon: lightingGood ? TickCircle : LampCharge
                    };
                case 2:
                    return {
                        ...icon,
                        icon: online ? TickCircle : Wifi
                    };
                default:
                    return icon;
            }
        });
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setImageCaptured(dataUrl);
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
                        {!cameraAccess && !imageCaptured && <img src={Rectangle} alt="" />}
                        {cameraAccess && !imageCaptured && (
                            <video ref={videoRef} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                        <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
                        {imageCaptured && (
                            <img src={imageCaptured} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                    </div>
                    <div className="connectivities-icons">
                        {getUpdatedIcons().map((item) => (
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
                    {(micAccess === false || cameraAccess === false || lightingGood === false || !online) && (
                        <div className="access-warning">
                            <p>
                                {micAccess === false && "Microphone access is required. "}
                                {cameraAccess === false && "Camera access is required. "}
                                {lightingGood === false && "Good lighting is required. "}
                                {!online && "Internet connection is required. "}
                                Please click the button below to enable.
                            </p>
                            <button onClick={micAccess === false ? requestMicAccess : requestCameraAccess}>
                                {micAccess === false ? "Enable Microphone" : "Enable Camera"}
                            </button>
                        </div>
                    )}
                    {(micAccess && cameraAccess && lightingGood && online) && (
                        <Button onClick={captureImage} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;
