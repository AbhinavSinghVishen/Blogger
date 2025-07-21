import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth.js'
import { logOut } from '../../store/authSlice.js'

const LogoutBtn = ({className}) => {
  const dispatch = useDispatch()

  function logoutHandler(){
    authService.logOut()
    .then(() => {
      dispatch(logOut())
    })
  }
  return (
    <div onClick={logoutHandler} className={className}>
      LogOut
    </div>
  )
}

export default LogoutBtn
