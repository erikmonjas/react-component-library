import React from "react";
import Modal from "../components/Modal";

const ModalContainer = () => {
  return (
    <div>
      <button id="modal-launcher">Open modal</button>
      <Modal launcher="modal-launcher">
        <p>Hi, modal</p>
      </Modal>
    </div>
  );
};

export default ModalContainer;
