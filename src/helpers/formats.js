export const formatPrice = (price) => {
  return Intl.NumberFormat('es-CO', {
    style: "currency",
    currency: "COP"
  }).format(price);
}