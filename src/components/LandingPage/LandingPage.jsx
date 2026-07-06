import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./LandingPage.module.css";

function LandingPage() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <img
          src="/icons/icon.png"
          className={styles.logo}
          alt="Logo du site représenté par un livre"
        />
      </header>
      <div className={styles.hero}>
        <h1>
          <span>Tous vos livres,</span>
          <span>dans votre poche</span>
        </h1>
        <p className={styles.subtitle}>
          Gérez votre collection, évitez les doublons et suivez l'avancée de vos
          lectures.
        </p>
        <div className={styles.buttons}>
          <button type="button" className={styles.registerBtn}>
            <NavLink to="/register">Créer un Compte</NavLink>
          </button>
          <button type="button" className={styles.loginBtn}>
            <NavLink to="/login">Connexion</NavLink>
          </button>
        </div>
      </div>

      <hr className={styles.line} />

      <div className={styles.showcase}>
        <h2>Fonctionnalités</h2>

        <div className={styles.sectionContainer}>
          <div className={styles.collection}>
            <h3>Consultez votre collection</h3>
            <img
              src="./showcase_images/collection.png"
              alt="Fonctionnalité pour consulter les livres ajoutés."
            />
          </div>

          <hr className={styles.showcaseLine} />

          <div className={styles.wishlist}>
            <h4>Notez les livres qui vous font envie</h4>
            <img
              src="./showcase_images/wishlist.png"
              alt="Fonctionnalité liste d'envies."
            />
          </div>

          <hr className={styles.showcaseLine} />

          <div className={styles.stats}>
            <h5>Votre collection en quelques chiffres</h5>
            <img
              src="./showcase_images/stats.png"
              alt="Fonctionnalité donnant les statistiques de votre collection"
            />
          </div>

          <hr className={styles.line} />
        </div>

        <div className={styles.aboutMe}>
          <h6>À propos</h6>
          <p>
            Salut, moi c'est Thomas 👋🏻 ! Développeur Web Fullstack depuis 2024
            et grand fan de manga, j'allie mes deux passions avec ce site.
          </p>
          <p>
            L'objectif premier de Tracker est d'avoir un outil simple me
            permettant de gérer ma collection, le second est de pouvoir le
            présenter sur mon portfolio. Donc pas de fonctionnalités bloquées
            derrière un paiement, toute l'application est gratuite !
          </p>
          <p>
            Je m'attends donc à être le seul à utiliser ce site, et ce n'est pas
            grave car c'est son objectif premier. Cependant si vous le trouvez,
            j'espère qu'il vous sera utile !
          </p>
        </div>
      </div>
      <footer className={styles.footer}>
        <a title="React" target="_blank" href="https://fr.react.dev/">
          <img
            src="./icons/react.png"
            alt="React Logo"
            className={styles.reactLogo}
          />
        </a>
        <a title="Vite" target="_blank" href="https://vite.dev/">
          <img
            src="./icons/vite.png"
            alt="Vite Logo"
            className={styles.viteLogo}
          />
        </a>
      </footer>
    </div>
  );
}

export default LandingPage;
