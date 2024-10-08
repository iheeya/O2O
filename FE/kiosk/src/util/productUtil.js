export function getProductIcon(product_id){
  const iconMap = {
    "0": '💻',
    "99": '⌨️',
    "3": '🖱️',
    "7": '💾',
    "8": '🎧',
    "3": '📷',
    "4": '📷',
    "13": '📐',
    "14": '🖱️',
    "76": '✂️',
  };
  return iconMap[product_id];
}
export function getProductIcon1(name){
  const iconMap = {
    "마우스": '🖱️',
    "가위": '✂️',
  };
  return iconMap[name];
}