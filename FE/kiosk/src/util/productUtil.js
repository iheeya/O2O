export function getProductIcon(product_id){
  const iconMap = {
    "1": '💻',
    "2": '⌨️',
    "3": '🖱️',
    "7": '💾',
    "8": '🎧',
    "9": '📷',
    "13": '📐',
    "14": '🖱️',
    "76": '✂️',
  };
  return iconMap[product_id];
}