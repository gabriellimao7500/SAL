import './User.css'
import Login from '../../Login/Login'

function User(){
    return(
        <>
            <div className='user'>
                <div>your account</div>
                <div className='userImage'></div>
            </div>

            <section className='Login'>
                <Login></Login>
            </section>
        </>
    )
}

export default User