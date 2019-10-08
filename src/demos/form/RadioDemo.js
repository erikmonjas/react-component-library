import React from 'react'
import MarkDown from 'markdown-to-jsx'
import Form from '../../components/Form'
import RadioGroup from '../../components/Form/Radio/RadioGroup'

const RadioDemo = () => {
  const radioList = [
    { text: 'Option 0', value: '0' },
    { text: 'Option 1', value: '1' },
    { text: 'Option 2', value: '2' },
  ]

  const md = `
    <RadioGroup
      radioList={[
        { text: "Option 0", value: "0" },
        { text: "Option 1", value: "1" },
        { text: "Option 2", value: "2" }
      ]}
      name="radioGroup"
      defaultRadio="2"
    />
  `

  return (
    <section id='radio-demo'>
      <h2 className='mt-30 font-weight-bold fz-20'>Radio</h2>
      <Form>
        <RadioGroup radioList={radioList} name='radioShow' defaultRadio='2' />
      </Form>
      <MarkDown
        className='code-block mt-20'
        children={md}
        options={{
          overrides: {
            RadioGroup: {
              component: RadioGroup,
            },
          },
        }}
      />
      <ul className='prop-list mt-20'>
        <li>
          <strong>name</strong> <span className='code'>string, required</span>:
          identifier for the radio group. It can't be the same for two different
          elements in a form. It should be written in camelcase, without spaces,
          dots, etc.
        </li>
        <li>
          <strong>radioList</strong>{' '}
          <span className='code'>array of objects, not required</span>: list of
          options that will be available as radio buttons. Each of them must be
          an object in which <span className='code'>text</span> will determine
          which text will be shown for that radio, while{' '}
          <span className='code'>value</span> sets which value will receive the
          radio when that option is chosen.
        </li>
        <li>
          <strong>defaultRadio</strong>{' '}
          <span className='code'>string, not required</span>: initial radio
          selected. This value must be equal to one of the values provided in
          the <span className='code'>radioList</span>.
        </li>
        <li>
          <strong>groupClassName</strong>{' '}
          <span className='code'>string, not required</span>: class that the
          group will receive.
        </li>
        <li>
          <strong>radioClassName</strong>{' '}
          <span className='code'>string, not required</span>: class that each
          radio will receive.
        </li>
      </ul>
    </section>
  )
}

export default RadioDemo
