import { useState } from "react";
import { login, getMe } from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      alert("Login success!");
    } else {
      alert("Login failed!");
    }
  };

  const handleGetMe = async () => {
    const data = await getMe(token);
    setUser(data.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>JWT Auth Demo</h2>

      {!token && (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br/>
          <button type="submit">Login</button>
        </form>
      )}

      {token && (
        <>
          <p>✅ Logged in with token</p>
          <button onClick={handleGetMe}>Get My Profile</button>
          {user && (
            <pre>{JSON.stringify(user, null, 2)}</pre>
          )}
        </>
      )}
    </div>
  );
}

export default App;
