import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import Inputs from '../Inputs/Inputs'


function Login(){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('')
  const handleLogin = async(e)=>{
    e.preventDefault();
    console.log('fffffff')


    
    const response = await axios.post('http://localhost:3333/login', {
      email: email,
      senha: senha
    });

    if (response.data) {
      console.log('Login bem-sucedido', response.data);
      // Aqui você pode adicionar lógica para o caso de sucesso
    } else {
      console.log('Erro no login');
      setError('Erro no login. Verifique suas credenciais.');
    }
    
    
    
  }
 return(
    <section className="login">
        <h1>Login</h1>
        <form className='inputs'>
          <Inputs text="username" type="text" required onChange={(e) => setEmail(e.target.value)}></Inputs>
          <Inputs text="password" type="password" required onChange={(e) => setSenha(e.target.value)}></Inputs>
        </form>
        <button className='enviar' type='submit' onClick={(e) => handleLogin(e)}>Login</button>
        <p>{error}</p>
     </section>
 )
}

export default Login