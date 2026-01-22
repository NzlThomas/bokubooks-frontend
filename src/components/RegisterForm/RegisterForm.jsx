import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  function handlePasswordError() {
    setPasswordError(true);
    setPassword("");
    setConfirmPassword("");
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      handlePasswordError();
      return;
    }
    try {
      await api.post("/register", {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Créer un compte:</h1>
        <form onSubmit={handleRegisterSubmit}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            minLength={3}
            maxLength={20}
            placeholder="Nom d'utilisateur"
          />
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            autoComplete="off"
            placeholder="Mot de passe"
          />
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError(false);
            }}
            autoComplete="off"
            placeholder="Confirmer le mot de passe"
          />
          {passwordError && (
            <p>Erreur: Les mots de passe ne correspondent pas.</p>
          )}
          <button type="submit">Créer un compte</button>
        </form>
        <Link to="/login">Se connecter</Link>
      </div>
    </div>
  );
}

export default RegisterForm;
