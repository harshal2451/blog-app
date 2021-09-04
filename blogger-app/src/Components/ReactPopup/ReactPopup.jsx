import React, { Component } from "react";
import "./ReactPopup.scss";
import ReactModal from "react-modal";
import { Button } from "@material-ui/core";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
function ReactPopup(props) {
  return (
    <ReactModal
      isOpen={props.open}
      appElement={document.getElementById("root")}
      className="react-popup-modal"
      overlayClassName="react-modal-overlay"
    >
      <div className="react-model-container">
        <div className="react-model-body">
        <h4 className="mb-3">{props.modelText}</h4>
          <div className="react-model-header">
            
            <div className={props.iconDivClass}>
                <PriorityHighIcon fontSize="large"/>
            </div>
          </div>

          <div className="react-model-content">
            <h3>{props.modelHeaderText}</h3>
            
          </div>

          <div className="react-model-footer mt-3">
            <div className="react-model-buttons">
              

              <Button
              
                modelBtnId="modelButton"
                className={props.modalPositiveBtn}
                onClick={props.onDelete}
              >
                {props.modelBtnName}
              </Button>

              <Button
                className="react-model-btn-cancel"
                onClick={props.onCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default ReactPopup;
