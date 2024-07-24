import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Inputs from '../Inputs/Inputs';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
     try {
      const response = await axios.post('http://localhost:3333/login',
        JSON.stringify({ "email": email, "senha":senha }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if(response.data.length === 1){
        alert('encontrado')
      }
     } catch (error) {
      if(!error?.response){
        console.log('erro ao acessar o servidor')
      }else if(error.response.status == 401){
        alert('usuario ou senha invalidos')
      }
     }
  };

  return (
    <section className="login">
      <h1>Login</h1>
      <form className='inputs' onSubmit={handleLogin}>
        <Inputs 
          text="username" 
          type="text" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <Inputs 
          text="password" 
          type="password" 
          name="senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)} 
          required 
        />
        <button className='enviar' type='submit'>Login</button>
      </form>
    </section>
  );
}

export default Login;
