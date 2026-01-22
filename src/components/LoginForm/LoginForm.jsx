import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api/api";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { login, user } = useContext(AuthContext);

  const navigate = useNavigate();

  function errorLogin() {
    setError(true);
    setPassword("");
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        username,
        password,
      });

      login(res.data.user);
      navigate("/app");
    } catch (error) {
      console.error("Error:", error);
      errorLogin();
    }
  };

  return (
    <div>
      <div>
        <h1>Se connecter:</h1>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(false);
            }}
            placeholder="Nom d'utilisateur"
            required
            autoComplete="off"
          />
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Votre de passe"
            required
            autoComplete="off"
          />
          {error && (
            <p>Erreur: nom d'utilisateur et/ou mot de passe incorrect.</p>
          )}

          <button type="submit">Se connecter</button>
        </form>
        <Link to="/register">Créer un compte</Link>
      </div>
    </div>
  );
}

export default LoginForm;
