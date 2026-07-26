export function validateBook(title, totalVolumes, totalRead, tag) {
  if (title.trim().length === 0) {
    return "Titre obligatoire";
  }

  if (totalVolumes < 1) {
    return "Vous devez posséder au minimum 1 volume.";
  }

  if (totalRead > totalVolumes) {
    return "Les volumes lus ne peuvent pas excéder les volumes possédés.";
  }

  if (tag === "READ" && totalRead !== totalVolumes) {
    return 'Une série ne peut être marquée comme "Lu" que si tous les volumes sont lus.';
  }

  if (tag === "TO_READ" && totalRead > 0) {
    return 'Une série commencée ne peut pas être marquée comme "À lire".';
  }

  if (tag === "READING" && totalRead === totalVolumes) {
    return 'Une série terminée ne peut pas être marquée comme "En cours".';
  }

  return null;
}
