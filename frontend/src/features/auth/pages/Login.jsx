import React from 'react'
import {useNavigate,Link} from 'react-router'
import '../auth.form.scss'
import{useAuth} from '../hooks/useAuth'
import {useState} from 'react'

const Login = () => {
  const {loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  const[email,setEmail] = useState('')
  const[password, setPassword] = useState('')
  const handleSubmit = async(e) => {
    e.preventDefault()
    await handleLogin({email,password})
    navigate('/')
    // Handle login logic here
  }
  if(loading){
    return (<main><h1>loading.....</h1></main>)
  }


  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type='email' id='email' name='email' placeholder='Enter your email' />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type='password' id='password' name='password' placeholder='Enter your password' />
          </div>
          <button className='button primary-button' type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link to='/register'>Register here</Link></p>
      </div>
    </main>
  )
}

export default Login
