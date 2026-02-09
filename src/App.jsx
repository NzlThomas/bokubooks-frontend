import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Link to="/collection">Collection</Link>
        <br />
        <Link to="/add-collection">Ajouter à la collection</Link>
        <br />
        <Link to="/wishlist">Wishlist</Link>
        <br />
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </>
  );
}

export default App;
