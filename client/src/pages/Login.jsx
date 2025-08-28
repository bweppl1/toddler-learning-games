import { useState } from "react";
import { useLogin } from "../hooks/useLogin.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <div className="login">
      <div className="container">
        <div className="authContainer">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              placeholder="Email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <button disabled={isLoading} type="submit" className="authButton">
              Login
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
