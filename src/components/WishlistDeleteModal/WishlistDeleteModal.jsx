function WishlistDeleteModal({ title, onConfirm, onCancel }) {
  return (
    <div>
      <p>
        Supprimer <span>{title}</span> de votre liste de souhaits?
      </p>
      <button onClick={onConfirm}>Oui</button>
      <button onClick={onCancel}>Non</button>
    </div>
  );
}

export default WishlistDeleteModal;
