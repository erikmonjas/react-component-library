import React from 'react'
import MarkDown from 'markdown-to-jsx'
import Modal from '../../components/Modal'

const ModalDemo = () => {
  const md = `
    <button id="modal-launcher" className="button">
      Open modal
    </button>
    <Modal launcher="modal-launcher">
      <p>Hi, Im' a modal!</p>
    </Modal>
  `
  return (
    <>
      <h2 className='fz-24 mb-40 font-weight-bold mt-30'>Modal</h2>
      <button id='modal-launcher' className='button'>
        Open modal
      </button>
      <Modal launcher='modal-launcher'>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </Modal>

      <button id='scroll-modal-launcher' className='button ml-30'>
        Open modal with scroll.
      </button>
      <Modal launcher='scroll-modal-launcher'>
        <h2 className='fz-36 mb-30 font-weight-bold text-dodgerblue'>
          The History of Lorem Ipsum
        </h2>

        <p className='mb-10'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <p className='mb-10'>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>

        <p className='mb-10'>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </p>

        <p className='mb-10'>
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced
          below for those interested. Sections 1.10.32 and 1.10.33 from "de
          Finibus Bonorum et Malorum" by Cicero are also reproduced in their
          exact original form, accompanied by English versions from the 1914
          translation by H. Rackham.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ultrices ante massa, eget mattis turpis mollis in. Praesent vel
          ultrices dolor, ut auctor purus. Fusce pharetra urna a enim interdum,
          eget vestibulum nunc sagittis. Duis aliquam convallis leo, ut suscipit
          elit molestie sit amet. Praesent id interdum dui. Aliquam porttitor,
          mauris ac lacinia dapibus, leo mi mattis libero, vel pretium nulla
          erat in elit. Vestibulum ut tortor semper, porta lectus sit amet,
          commodo massa. Aliquam consequat nulla sed lobortis tincidunt. Aliquam
          consequat risus sed ipsum dignissim, id scelerisque felis ullamcorper.
          Phasellus porttitor ac quam a feugiat. Nam facilisis felis sed
          pharetra scelerisque. Sed pellentesque mi nec dui tempor efficitur.
          Aenean dapibus aliquet tempor. Vestibulum molestie nunc vitae elit
          gravida consectetur. Nulla facilisi. Maecenas ullamcorper mauris urna,
          id facilisis neque viverra a. Integer lobortis tincidunt neque, ac
          blandit lectus rutrum eu. Phasellus dapibus tellus mauris, elementum
          euismod justo ultricies id. Quisque posuere tristique libero. Fusce
          vitae dui arcu. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia Curae; Curabitur sit amet arcu ac ipsum
          congue porta a non urna. Nam sagittis, leo at pharetra vulputate, urna
          nulla molestie magna, pretium pharetra lorem nulla ut ex. Curabitur id
          dolor venenatis, tempus nisl vel, ullamcorper sem. Sed tempor, justo
          et blandit semper, sem lorem posuere nibh, eu finibus tellus augue non
          massa.
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
  )
}

export default ModalDemo
