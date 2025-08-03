
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function RegisterForm(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clearInputs = ()=> {
            setUserName('');
            setPassword('');
        }
        const credentials = {userName, password};
        const user = await fetch('https://silent-auction-api.vercel.app/user/register', {
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
        clearInputs();
        alert(`"${userJson.userName}" is successfully registered.`);
        await props.runCheck();
        return navigate('/items');
    }

    return (
        <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Register</h2>
          <div className="formGroup">
            <label className="label" htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input"
              placeholder="Enter a new username"
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
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="button" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>
    )
}

export default RegisterForm;