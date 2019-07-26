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

  return (
    <div className={`modal ${isOpen ? "" : "d-none"}`} ref={wrapper}>
      <div className="modal__background" />
      <div className="modal__inner">
        <span className="modal__close" onClick={() => setOpen(false)}>
          x
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
