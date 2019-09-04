import React from "react";
import MarkDown from "markdown-to-jsx";
import Modal from "../../components/Modal";

const ModalDemo = () => {
  const md = `
    <button id="modal-launcher" className="button">
      Open modal
    </button>
    <Modal launcher="modal-launcher">
      <p>Hi, Im' a modal!</p>
    </Modal>
  `;
  return (
    <>
      <h2 className="fz-24 mb-40 font-weight-bold mt-30">Modal</h2>
      <button id="modal-launcher" className="button">
        Open modal
      </button>
      <Modal launcher="modal-launcher">
        <p>
          Hi, I'm a modal!
        </p>
      </Modal>
      <MarkDown
        className="code-block mt-20"
        children={md}
        options={{
          overrides: {
            Modal: {
              component: Modal
            }
          }
        }}
      />
      <ul className="prop-list mt-20 mb-40">
        <li>
          <strong>launcher</strong>{" "}
          <span className="code">string, required</span>: id of the element
          which will launch the modal when clicked.
        </li>
      </ul>
    </>
  );
};

export default ModalDemo;
