import './User.css';
import { useState, useEffect, useRef } from 'react';
import Login from '../../Login/Login';

function User() {
    const [login, setLogin] = useState(false);
    const menuRef = useRef(null);
    const sectionRef = useRef(null);

    function toggleLogin() {
        setLogin(prevLogin => !prevLogin);
    }

    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setLogin(false);
        }
    }

    function handleSectionClick(event) {
        // Verifica se o clique ocorreu fora do menu <Login>
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
                <div className='userImage'></div>
            </div>

            {login && (
                <section ref={sectionRef} className="Login" onClick={handleSectionClick}>
                    <div ref={menuRef}>
                        <Login />
                    </div>
                </section>
            )}
        </>
    );
}

export default User;
