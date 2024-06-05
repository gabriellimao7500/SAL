import './Login.css'
import Inputs from '../Inputs/Inputs'

function Login(){
 return(
    <section className="login">
        <h1>Login</h1>
        <section className='inputs'>
          <Inputs text="username" type="text"></Inputs>
          <Inputs text="password" type="password"></Inputs>
        </section>
        <button className='enviar' type='submit'>Login</button>
     </section>
 )
}

export default Login