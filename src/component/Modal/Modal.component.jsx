import Button from "../Button/Button.component";
import "./Modal.css";

const Modal = () => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
               <div className="modal-header-container">
                   <div className="modal-header">
                      <span className="modal-start">Start Assessment</span>
                      <span className="modal-close">close</span>
                   </div>
               </div>
               <div className="modal-modal-content">
                   <div className="modal-items">
                      <span className="modal-proceed">Proceed to start assessment</span>
                      <span className="modal-continue">Kindly keep to the rules of the assessment and 
                            sit up, stay in front of your camera/webcam and start
                            your assessment.
                    </span>
                   </div>
                   <div className="btn-container">
                 <button  className="modal-button">Proceed</button>
                   </div>
                  
               </div>
            </div>
        </div>
    )
}

export default Modal;