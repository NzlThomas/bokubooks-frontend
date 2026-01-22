import { useState, useEffect } from "react";
import api from "../../api/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const res = await api.get("/wishlist");
        setWishlist(res.data.wishlist);
      } catch (error) {
        console.error(error);
      }
    };
    getWishlist();
  }, []);

  return (
    <div>
      {wishlist.length ? (
        wishlist.map((book) => <p key={book.id}>{book.title}</p>)
      ) : (
        <p>Votre liste de souhaits est vide !</p>
      )}
    </div>
  );
}

export default Wishlist;
