import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Inputs from '../Inputs/Inputs';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      const response = await axios.post('http://localhost:3333/login',
        JSON.stringify({ "email": email, "senha": senha }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (Array.isArray(response.data) && response.data.length === 1) {
        sessionStorage.setItem('professor', JSON.stringify(response.data[0]));
        console.log(JSON.parse(sessionStorage.getItem('professor')));
        
        // Remove parâmetros da URL sem recarregar a página
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        
        // Redireciona para a página Labs
        navigate('/SelectLab');
        navigate(-1)
      } else {
        setIncorrect(true);
        setTimeout(() => setIncorrect(false), 2000);
      }
    } catch (error) {
      if (!error?.response) {
        console.log('erro ao acessar o servidor');
      } else if (error.response.status === 401) {
        setIncorrect(true);
        setTimeout(() => setIncorrect(false), 2000);
      }
    }
  };

  return (
    <>
      <div className={incorrect ? "incorrect error" : "incorrect"}>usuário ou senha inválidos</div>
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
    </>
  );
}

export default Login;
