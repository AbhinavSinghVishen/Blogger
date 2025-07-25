import React from 'react'
import {Container, Logo, LogoutBtn} from '../index.js'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { logOut } from '../../store/authSlice'
import useTheme from '../../context/context.js'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const {theme, toggleTheme} = useTheme()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    },
  ]
  return (
    <div>
      <header className='py-3 shadow bg-gray-800 dark:bg-gray-900'>
        <Container>
          <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo mode='dark'/>
              </Link>
            </div>
            <ul className='flex ml-auto'>
              {navItems.map((item) => (
                item.active && <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}
                  className='inline-block px-6 py-2 duration-200 text-gray-200 text-lg
                  hover:bg-blue-100 rounded-full hover:text-black'
                  >{item.name}
                  </button>
                </li>
                //here we can use link instead of navigate just like in logo
              ))}
              {authStatus && (
                <li>
                  <LogoutBtn className='inline-block px-6 py-2 duration-200 text-gray-200 text-lg
                  hover:bg-blue-100 rounded-full hover:text-black'/>
                </li>
              )}
              <li>
                <button className='inline-block px-6 py-2 duration-200 text-gray-200 text-lg' onClick={toggleTheme}>
                  <img src={`/${theme}.png`} alt="mode" className='h-8' title={`${theme} Mode`} />
                </button>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Header
