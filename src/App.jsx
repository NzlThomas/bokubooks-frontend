import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Link to="/add-collection">Ajouter à la collection</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>
    </>
  );
}

export default App;
