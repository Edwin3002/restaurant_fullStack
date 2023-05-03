export const formatPrice = (price) => {
  return "$ " + Intl.NumberFormat('de-DE').format(price);
}