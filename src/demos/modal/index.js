import React from "react";
import MarkDown from "markdown-to-jsx";
import Modal from "../../components/Modal";

const ModalDemo = () => {
  const md = `
    <button id="modal-launcher" className="button">
      Open modal
    </button>
    <Modal launcher="modal-launcher">
      <p>Hi, modal</p>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          eleifend, urna et volutpat accumsan, ipsum erat ornare nunc, at semper
          urna massa at odio. In odio tortor, interdum nec eros non, consequat
          mattis elit. Phasellus sed porttitor risus, id consectetur purus. In
          sit amet tellus elementum mi consectetur cursus a quis justo. Nunc vel
          efficitur nunc, sit amet porta justo. Duis eu sapien eget massa
          molestie dapibus sit amet a quam. Nunc nec consectetur turpis, a
          volutpat justo. Duis eu elit nulla. Phasellus nunc urna, sollicitudin
          in sem nec, sollicitudin scelerisque ipsum. Proin non scelerisque
          libero, ac porttitor mauris. Quisque ac ante nec purus iaculis ornare
          at eget lacus. Morbi ut lectus et purus rhoncus posuere. Ut vitae
          imperdiet nibh. Nam feugiat pharetra ipsum porta tristique. Etiam at
          mauris ligula. Donec at lacinia orci, at rutrum felis. Donec nisl
          nisi, aliquet quis augue a, cursus varius odio. Cras euismod, diam nec
          efficitur cursus, dolor est molestie mauris, eu congue ligula metus
          sit amet sem. Proin suscipit dui eu velit fermentum sagittis. Nunc id
          sapien mattis, tempus purus pharetra, finibus felis. Cras convallis
          dignissim augue, a finibus tortor faucibus in. Etiam eget scelerisque
          mauris. Donec at mattis mauris. Aenean ut lectus nec augue viverra
          varius ut aliquet nibh. Morbi at euismod ipsum. Mauris eu lacus
          maximus, egestas lorem tempus, fermentum sapien. Donec interdum
          interdum dui, ac viverra justo fringilla at. Sed suscipit velit nibh,
          ut rhoncus ligula ultrices quis. Mauris a mi volutpat, eleifend nulla
          et, lacinia purus. Mauris ut velit sit amet ligula faucibus pulvinar.
          Phasellus feugiat accumsan nisi at lobortis. Sed molestie ac lorem a
          congue. Curabitur in aliquam eros. Mauris vitae metus erat. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Ut nec eros cursus, efficitur diam id, lacinia ligula.
          Vivamus commodo malesuada quam, nec tempus turpis tristique a.
          Praesent eget mi ac tortor rhoncus elementum eget vitae neque.
          Vestibulum elementum vehicula justo et molestie. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Donec a dolor bibendum, lobortis
          dui et, fermentum sapien. Aliquam a convallis lectus. Cras bibendum
          leo id porttitor porttitor. Nam porta est eu nunc blandit interdum.
          Phasellus egestas accumsan lobortis. Aenean fermentum ante eu rhoncus
          dapibus. Donec sodales quam id aliquam rhoncus. Fusce sit amet nisl
          aliquam, bibendum mi tincidunt, efficitur massa. Aenean lobortis
          dignissim neque ut faucibus. Nam at finibus elit, ut convallis felis.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Aenean eget imperdiet eros, eget lacinia lacus.
          Duis vehicula vitae lectus id vulputate. Integer mauris libero,
          maximus vitae aliquet vitae, feugiat quis velit. Sed est nulla,
          convallis eget ligula a, condimentum bibendum metus. Suspendisse id
          massa risus.
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
