import React, { useState, useEffect, useRef } from "react";
import "./modal.scss";

const Modal = ({ children, launcher }) => {
  const [isOpen, setOpen] = useState(false);
  const wrapper = useRef(null);

  useEffect(() => {
    document.getElementById(launcher).addEventListener("click", () => {
      setOpen(true);
    });
    wrapper.current
      .querySelector(".modal__background")
      .addEventListener("click", () => {
        setOpen(false);
      });
  }, []);

  useEffect(() => {
    const modalInner = wrapper.current.querySelector(".modal__inner");
    const modalContent = wrapper.current.querySelector(".modal__content");

    if (modalInner.clientHeight - 70 < modalContent.clientHeight) {
      modalInner.style.overflowY = "auto";
    }
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? "" : "d-none"}`} ref={wrapper}>
      <div className="modal__background" />
      <div className="modal__inner">
        <span className="modal__close" onClick={() => setOpen(false)}>
          x
        </span>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
