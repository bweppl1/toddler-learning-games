import axois from "axios";

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="loginContainer">
          <h2>Login</h2>
          <div className="loginForm">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
              <button type="submit" className="loginButton">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
