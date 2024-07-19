import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css';

// 아이템 배열을 정의합니다.
const items = [
  { id: 1, name: '가위', icon: '✂️' },
  { id: 2, name: '잉크', icon: '🖋️' },
  { id: 4, name: '카메라', icon: '📷' },
];

function BrokenFind() {
  const [quantities, setQuantities] = useState(items.reduce((acc, item) => {
    acc[item.id] = { broken: 0, missing: 0 };
    return acc;
  }, {}));

  const increaseQuantity = (id, type) => {
    setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] + 1 } }));
  };

  const decreaseQuantity = (id, type) => {
    setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] > 0 ? prev[id][type] - 1 : 0 } }));
  };

  return (
    <div className="cart-container">
      <h2>대여물품조회</h2>
      <div className="items">
        {items.map(item => (
          <div key={item.id} className="item">
            <div className="item-header">
              <span className="item-icon">{item.icon}</span>
              <span className="item-name">{item.name}</span>
            </div>
            <div className="item-controls">
              <div className="control">
                <span>파손</span>
                <button onClick={() => decreaseQuantity(item.id, 'broken')}>-</button>
                <span>{quantities[item.id].broken}</span>
                <button onClick={() => increaseQuantity(item.id, 'broken')}>+</button>
              </div>
              <div className="control">
                <span>분실</span>
                <button onClick={() => decreaseQuantity(item.id, 'missing')}>-</button>
                <span>{quantities[item.id].missing}</span>
                <button onClick={() => increaseQuantity(item.id, 'missing')}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="report-button">신고하기</button>
    </div>
  );
}

export default BrokenFind;
