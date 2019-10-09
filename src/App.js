import React from 'react'
import Routes from './routes'
import { NavLink, BrowserRouter, Link } from 'react-router-dom'
import Logo from './logo.svg'

const App = () => {
  return (
    <BrowserRouter>
      <div className='row mr-0'>
        <div className='col-3'>
          <ul className='menu'>
            <Link to='/' className='atom-link d-flex'>
              <img src={Logo} alt='logo' className='home-logo' />
            </Link>
            <h1>
              React Component Library{' '}
              <span className='d-block'>by Érik Monjas</span>
            </h1>
            <li>
              <NavLink
                to='/form'
                className='menu__item'
                activeClassName='menu__item--active'
              >
                Form
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/tabs'
                className='menu__item'
                activeClassName='menu__item--active'
              >
                Tabs
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/modal'
                className='menu__item'
                activeClassName='menu__item--active'
              >
                Modal
              </NavLink>
            </li>
            <li className='github-link'>
              <a href='https://github.com/erikmonjas/react-component-library/tree/master'>
                <img src='https://image.flaticon.com/icons/svg/25/25231.svg' />
                <span>GitHub Project</span>
              </a>
            </li>
          </ul>
        </div>
        <div className='col-9'>
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
