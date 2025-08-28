import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);

    await signup(email, password);
  };
  return (
    <div className="signup">
      <div className="container">
        <div className="authContainer">
          <h2>Sign-up</h2>
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
              Sign-up
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
