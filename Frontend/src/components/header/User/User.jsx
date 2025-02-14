import './User.css';
import { useState, useEffect, useRef } from 'react';
import Login from '../../Login/Login';
import Swal from 'sweetalert2';

function User() {
    const [professor, setProfessor] = useState(JSON.parse(sessionStorage.getItem('professor')));
    const [session, setSession] = useState(!!professor);
    const [login, setLogin] = useState(false);
    const [imageSrc, setImageSrc] = useState('generic.jpg');
    const menuRef = useRef(null);
    const sectionRef = useRef(null);

    // Atualizando a imagem do professor
    useEffect(() => {
        if (professor) {
            setImageSrc('out.png')
        }
    }, [professor]);

    function toggleLogin() {
        setLogin(prevLogin => !prevLogin);
    }

    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setLogin(false);
        }
    }

    function handleLogout() {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você realmente deseja sair?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, sair',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('professor');
                setProfessor(null);
                setSession(false);
                setLogin(false);
                Swal.fire(
                    'Desconectado!',
                    'Você foi desconectado com sucesso.',
                    'success'
                );
                window.location.href = '/';
            }
        });
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            
        };
    }, []);

    return (
        <>
            <div onClick={session ? handleLogout : toggleLogin} className='user'>
                <div>{session ? professor.nome : 'Entrar'}</div>
                <img className='userImage' src={imageSrc} alt="User" />
            </div>

            {login && (
                <section ref={sectionRef} className="Login">
                    <div ref={menuRef}>
                        <Login />
                    </div>
                </section>
            )}
        </>
    );
}

export default User;
