import './User.css';
import { useState, useEffect, useRef } from 'react';
import Login from '../../Login/Login';

function User() {
    const [login, setLogin] = useState(false);
    const [imageSrc, setImageSrc] = useState('generic.jpg');
    const menuRef = useRef(null);
    const sectionRef = useRef(null);

    // Definindo a imagem
    useEffect(() => {
        const professor = sessionStorage.getItem('professor');
        if (professor) {
            const { imagem } = JSON.parse(professor);
            if (imagem) {
                setImageSrc(imagem);
            } else {
                setImageSrc('generic.jpg');
            }
        } else {
            setImageSrc('generic.jpg');
        }
    }, []);

    function toggleLogin() {
        setLogin(prevLogin => !prevLogin);
    }

    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setLogin(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div onClick={toggleLogin} className='user'>
                <div>Login</div>
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
