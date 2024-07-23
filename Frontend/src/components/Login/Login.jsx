import './Login.css';
import Inputs from '../Inputs/Inputs';
import { useState } from 'react';

const tryLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: password }), // JSON com chave 'email' e 'senha'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.length === 1) { // Ajuste conforme a estrutura da resposta esperada
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
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    tryLogin(email, senha);
  };

  return (
    <section className="login">
      <h1>Login</h1>
      <section className='inputs'>
        <Inputs
          text="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado de email
        />
        <Inputs
          text="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)} // Atualiza o estado de senha
        />
      </section>
      <button className='enviar' type='button' onClick={handleLogin}>
        Login
      </button>
    </section>
  );
}

export default Login;
