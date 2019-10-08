import React from 'react'

const HomeContainer = () => {
  return (
    <div className='mt-30'>
      <p className='default-paragraph'>
        This is a React component library, made by{' '}
        <a
          href='http://erikmonjas.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='default-link'
        >
          Érik Monjas
        </a>
        , built using Hooks and Context. Its main purpose is to provide
        transversal, reusable components to any React user.
      </p>
      <p className='default-paragraph'>
        In most occasions, the user will have to adapt the logic here
        implemented to his own needs, as each project has its own requirements.
        Nevertheless, here is a basis upon which creating your own components
        which be much easier.
      </p>
      <p className='default-paragraph'>
        The component's styles are included in its same folder with the idea
        that the user can pick these small pieces quickly and carry them to
        wherever needed without spending much time in searching for the JS in
        one place and the SASS in another.
      </p>
      <p className='default-paragraph'>
        Everything was developed taking into account the W3 accesibility
        criteria, so that all components are perfectly keyboard-usable.
      </p>
    </div>
  )
}

export default HomeContainer
