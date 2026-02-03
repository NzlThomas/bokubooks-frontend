function DeleteModal({ title, onConfirm, onCancel, message }) {
  return (
    <div>
      <p>
        Supprimer{" "}
        <span>
          {title} de {message}
        </span>
        ?
      </p>
      <button onClick={onConfirm}>Oui</button>
      <button onClick={onCancel}>Non</button>
    </div>
  );
}

export default DeleteModal;
