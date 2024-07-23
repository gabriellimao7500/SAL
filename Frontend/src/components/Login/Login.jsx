import './Login.css';
import Inputs from '../Inputs/Inputs';
import { useState } from 'react';

const tryLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3333/login', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), // Certifique-se de que a chave esteja correta
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    
    if (result.success) { 
      alert('Login bem-sucedido');
    } else {
      alert('Credenciais inválidas');
    }

  } catch (error) {
    console.error('Erro durante a solicitação:', error);
    alert('Erro durante o login');
  }
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      tryLogin(email, password);
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  return (
    <section className="login">
      <h1>Login</h1>
      <section className='inputs'>
        <Inputs
          text="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Inputs
          text="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <button className='enviar' type='button' onClick={handleLogin}>
        Login
      </button>
    </section>
  );
}

export default Login;
