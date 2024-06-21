import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import { createDetector, SupportedModels } from "@tensorflow-models/face-landmarks-detection";
import Button from "../Button/Button.component";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Rectangle from "../../Images/Rectangle.svg";
import MonitorRecorder from "../../Images/monitor-recorder.svg";
import Wifi from "../../Images/wifi.svg";
import LampCharge from "../../Images/lamp-charge.svg";
import Microphone from "../../Images/microphone.svg";
import Recorder from "../../Images/recorder.svg";
import Lamp from "../../Images/lamp.svg";
import WifiWhite from "../../Images/wifiwhite.svg";
import Modal from "../Modal/Modal.component";
import { ClipLoader } from "react-spinners";
import "./Card.css";

const Card = () => {
  const [micAccess, setMicAccess] = useState(null);
  const [cameraAccess, setCameraAccess] = useState(null);
  const [lightingGood, setLightingGood] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);
  const [imageCaptured, setImageCaptured] = useState(null);
  const [landmarksDetected, setLandmarksDetected] = useState(false);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const checkMediaDevices = async () => {
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicAccess(true);
        micStream.getTracks().forEach((track) => track.stop());

        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
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

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const checkLightingConditions = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
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

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setImageCaptured(dataUrl);
      detectFacialLandmarks(dataUrl);
    }
  };

  const detectFacialLandmarks = async (imageUrl) => {
    setLoading(true);
    try {
      await tf.setBackend("webgl");
      await tf.ready();

      const detector = await createDetector(SupportedModels.MediaPipeFaceMesh, {
        runtime: 'tfjs',
      });

      const img = new Image();
      img.onload = async () => {
        const predictions = await detector.estimateFaces(img);

        if (predictions.length > 0) {
          setLandmarksDetected(true);
          console.log("Facial landmarks detected:", predictions);
        } else {
          setLandmarksDetected(false);
          console.log("No facial landmarks detected.");
          alert("No facial landmarks detected. Please take the picture again.");
        }
        setLoading(false);
      };

      img.src = imageUrl;
    } catch (error) {
      console.error("Error detecting facial landmarks:", error);
      setLoading(false);
    }
  };

  return (
    <div className="card-container">
      <div className="card-inner-container">
        <div className="card-title">
          <h3>System Check</h3>
          <span>
            We utilize your camera image to ensure fairness for all
            participants, and we also employ both your camera and
            microphone for a video questions where you will be prompted to
            record a response using your camera or webcam, so it's essential
            to verify that your camera and microphone are functioning
            correctly and that you have a stable internet connection. To do
            this, please position yourself in front of your camera, ensuring
            that your entire face is clearly visible on the screen. This
            includes your forehead, eyes, ears, nose, and lips. You can
            initiate a 5-second recording of yourself by clicking the button
            below.
          </span>
        </div>
        <div className="card-camera-container">
          <div className="empty-photo">
            {!cameraAccess && !imageCaptured && (
              <img src={Rectangle} alt="" />
            )}
            {cameraAccess && !imageCaptured && (
              <video
                ref={videoRef}
                autoPlay
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
              width="640"
              height="480"
            ></canvas>
            {imageCaptured && (
              <img
                src={imageCaptured}
                alt="Captured"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            <div className={`overlay ${loading ? 'active' : ''}`}></div>
            <div className={`loading-spinner ${loading ? 'active' : ''}`}>
              <ClipLoader color={"#123abc"} loading={loading} size={50} />
              <p>Processing image...</p>
            </div>
          </div>
          <div className="connectivities-icons">
            <div className="icon-container">
              {cameraAccess ? (
                <img src={Recorder} alt="" className="purple-wifi" />
              ) : (
                <div className="purple-circle"></div>
              )}
              <div className="icon-image-container">
                {cameraAccess ? (
                  <CheckCircle />
                ) : (
                  <img
                    src={MonitorRecorder}
                    alt=""
                    className="icon-image"
                  />
                )}
              </div>
              <span className="icon-title">Webcam</span>
            </div>

            <div className="icon-container">
              {online ? (
                <img src={WifiWhite} alt="" className="purple-wifi" />
              ) : (
                <div className="purple-circle"></div>
              )}
              <div className="icon-image-container">
                {online ? (
                  <CheckCircle />
                ) : (
                  <img src={Wifi} alt="" className="icon-image" />
                )}
              </div>
              <span className="icon-title">Wifi</span>
            </div>

            <div className="icon-container">
              {micAccess ? (
                <img src={Microphone} alt="" className="purple-wifi" />
              ) : (
                <div className="purple-circle"></div>
              )}
              <div className="icon-image-container">
                {micAccess ? (
                  <CheckCircle />
                ) : (
                  <img
                    src={MonitorRecorder}
                    alt=""
                    className="icon-image"
                  />
                )}
              </div>
              <span className="icon-title">Gadget Mic</span>
            </div>

            <div className="icon-container">
              {lightingGood ? (
                <img src={Lamp} alt="" className="purple-wifi" />
              ) : (
                <div className="purple-circle"></div>
              )}
              <div className="icon-image-container">
                {lightingGood ? (
                  <CheckCircle />
                ) : (
                  <img
                    src={LampCharge}
                    alt=""
                    className="icon-image"
                  />
                )}
              </div>
              <span className="icon-title">Lighting</span>
            </div>
          </div>
        </div>
        <div>
          {micAccess && cameraAccess && lightingGood && online && (
            <Button
              title="Take picture and continue"
              onClick={captureImage}
            />
          )}
        </div>
        {landmarksDetected && <Modal />}
      </div>
    </div>
  );
};

export default Card;
