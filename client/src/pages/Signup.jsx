const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
              id="email"
              name="email"
              placeholder="Email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit" className="authButton">
              Sign-up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
