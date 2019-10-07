import React from 'react';
import MarkDown from 'markdown-to-jsx';
import Modal from '../../components/Modal';

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
      <h2 className='fz-24 mb-40 font-weight-bold mt-30'>Modal</h2>
      <button id='modal-launcher' className='button'>
        Open modal
      </button>
      <Modal launcher='modal-launcher'>
        <p>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta) desconocido usó una galería de
          textos y los mezcló de tal manera que logró hacer un libro de textos
          especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como
          texto de relleno en documentos electrónicos, quedando esencialmente
          igual al original. Fue popularizado en los 60s con la creación de las
          hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más
          recientemente con software de autoedición, como por ejemplo Aldus
          PageMaker, el cual incluye versiones de Lorem Ipsum. ¿Por qué
        </p>
      </Modal>
      <MarkDown
        className='code-block mt-20'
        children={md}
        options={{
          overrides: {
            Modal: {
              component: Modal,
            },
          },
        }}
      />
      <ul className='prop-list mt-20 mb-40'>
        <li>
          <strong>launcher</strong>{' '}
          <span className='code'>string, required</span>: id of the element
          which will launch the modal when clicked.
        </li>
      </ul>
    </>
  );
};

export default ModalDemo;
