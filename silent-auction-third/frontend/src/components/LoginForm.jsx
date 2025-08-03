
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function LoginForm(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = ()=>{
        navigate('/register');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clearInputs = ()=> {
            setUserName('');
            setPassword('');
        }
        const credentials = {userName, password};
        const user = await fetch('https://silent-auction-api.vercel.app/user/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // important for receiving cookie fur to cors issues...
        })
        const userJson = await user.json();
        if (!user.ok) {
            clearInputs();
            return alert(userJson.error);
        };
        await props.runCheck();
        return navigate('/items');
    }

    return (
        <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="formGroup">
            <label className="label" htmlFor="userName">Username:</label>
            <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="input"
                placeholder="Enter Your Username"
            />
        </div>
        <div className="formGroup">
            <label className="label" htmlFor="password">Password:</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter Your Password"
            />
        </div>
        <button type="submit" className="button">
            Login
        </button>
        <button type="button" className="button" onClick={handleRegisterClick}>
            Register
        </button>
        </form>
        </div>
    )
}

export default LoginForm;