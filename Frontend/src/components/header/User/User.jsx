import './User.css';
import { useState, useEffect, useRef } from 'react';
import Login from '../../Login/Login';

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
            const { imagem } = professor;
            if (imagem) {
                setImageSrc(imagem);
            } else {
                setImageSrc('generic.jpg');
            }
        } else {
            setImageSrc('generic.jpg');
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
        sessionStorage.removeItem('professor');
        setProfessor(null);
        setSession(false);
        setLogin(false);
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
                <div>{session ? 'Logout' : 'Login'}</div>
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
