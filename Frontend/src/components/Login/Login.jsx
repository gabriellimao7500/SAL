import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Inputs from '../Inputs/Inputs';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import Swal from 'sweetalert2'; // Importando o SweetAlert2

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${config.apiUrl}/login`,
        JSON.stringify({ "email": email, "senha": senha }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (Array.isArray(response.data) && response.data.length === 1) {

        sessionStorage.setItem('professor', JSON.stringify(response.data[0]));


        // Remove parâmetros da URL sem recarregar a página
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        var profNome = JSON.parse(sessionStorage.getItem('professor')).nome;
        var primeiroNome = profNome.split(" ")[0];

        // Exibe o SweetAlert de sucesso
        Swal.fire({
          title: 'Login realizado com sucesso!',
          text: `Bem vindo professor(a) ${primeiroNome}`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Após o alerta ser fechado, redireciona para a página Labs
          navigate('/SelectLab');
        });

      } else {
        setIncorrect(true);
        setTimeout(() => setIncorrect(false), 2000);
      }
    } catch (error) {
      if (!error?.response) {
        console.log('erro ao acessar o servidor');
        Swal.fire({
          title: 'Erro de conexão',
          text: 'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        })
      } else if (error.response.status === 401) {

        Swal.fire({
          title: 'Erro de autenticação',
          text: 'Usuário ou senha inválidos. Tente novamente.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          setIncorrect(true);
          setTimeout(() => setIncorrect(false), 2000);
        });

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
            text="email"
            type="email"
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
