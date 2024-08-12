import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css';
import '../styles/common/Common.css';
import { getCurrentProducts, getTest } from '../api/brokenfind.js';
import IncreaseDecreaseButton from '../components/common/IncreaseDecreaseButton.js';
import { formatDateSimple } from '../util/dateUtil.js';
import { getUserIdFromSession } from '../util/sessionUtils.js';
import { getLockerBodyIdFromLocal, saveLockerBodyIdFromLocal } from '../util/localStorageUtil';

function BrokenFind() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lockerBodyId, setLockerBodyId] = useState(null);
  const itemsPerPage = 4;
  const [selectedRentIndex, setSelectedRentIndex] = useState(null);

  useEffect(() => {
    const id = getUserIdFromSession();
    if (id) {
      setUserId(id);
    }

    saveLockerBodyIdFromLocal();
    const locker_body_id = getLockerBodyIdFromLocal();
    setLockerBodyId(locker_body_id);
  }, []);

  useEffect(() => {
    if (userId) {
      getBrokenValues();
    }
  }, [userId]);

  const reportItems = () => {
    if (selectedRentIndex !== null) {
      const reportedItems = items[selectedRentIndex].filter(item => item.missing > 0 || item.broken > 0);
      navigate('/registerbroken', { state: { reportedItems } });
    } else {
      console.log('선택된 대여가 없습니다.');
    }
  };

  const getBrokenValues = async () => {
    const data = await getCurrentProducts(userId, 1, 10);
    if (data != null) {
      const rentsData = [];
      for (let rent of data.rents) {
        const productsData = [];
        for (let product of rent.products) {
          const productLockerBodyId = String(product.locker_body_id);
          const localLockerBodyId = String(lockerBodyId);
          if (localLockerBodyId !== '' && productLockerBodyId !== localLockerBodyId) continue;
          if (product.status[1].product_cnt === 0) continue;
          productsData.push({
            id: product.product_id,
            name: product.product_name,
            cnt: product.status[1].product_cnt,
            date: rent.rent_dt,
            broken: 0,
            missing: 0,
            icon: "🕶",
            locker_id: product.locker_id,
          });
        }
        if (productsData.length > 0) {
          rentsData.push(productsData);
        }
      }
      setItems(rentsData);
    } else {
      setItems([]);
    }
  };

  const increaseQuantity = (rentIndex, productIndex, type) => {
    setItems(prevItems =>
      prevItems.map((rent, rInd) =>
        rInd === rentIndex
          ? rent.map((item, pInd) =>
              pInd === productIndex
                ? {
                    ...item,
                    [type]:
                      item.cnt - (item.broken + item.missing) === 0
                        ? item[type]
                        : item[type] + 1,
                  }
                : item
            )
          : rent
      )
    );
  };

  const decreaseQuantity = (rentIndex, productIndex, type) => {
    setItems(prevItems =>
      prevItems.map((rent, rInd) =>
        rInd === rentIndex
          ? rent.map((item, pInd) =>
              pInd === productIndex
                ? { ...item, [type]: Math.max(item[type] - 1, 0) }
                : item
            )
          : rent
      )
    );
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      const newPage = prevPage + direction;
      return Math.max(1, Math.min(newPage, Math.ceil(items.length / itemsPerPage)));
    });
    setSelectedRentIndex(null); // 페이지 전환 시 선택된 렌트 초기화
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(-1)}
          className="pagination-button"
          disabled={currentPage === 1}
        >
          <svg height="20" width="20">
            <polygon points="10,0 0,10 10,20" fill="#0093ed" />
          </svg>
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(1)}
          className="pagination-button"
          disabled={currentPage === totalPages}
        >
          <svg height="20" width="20">
            <polygon points="0,0 10,10 0,20" fill="#0093ed" />
          </svg>
        </button>
      </div>
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const renderNoItemsMessage = () => (
    <h4>대여 중인 물품이 없습니다 <span role="img" aria-label="머쓱">😅</span></h4>
  );

  return (
    <div className='frame-container'>
      <button className="btn-main" onClick={() => navigate('/')}>
        HOME
      </button>
      <div className="cart-container">
        <h2>대여물품조회</h2>
        <div className="broken-items">
          {items.length === 0 ? (
            renderNoItemsMessage()
          ) : (
            selectedItems.map((rent, rInd) => (
              <div key={rInd} className="rent">
                <div>
                  <p className="item-date small-font">대여 일시: {formatDateSimple(rent[0]?.date)}</p>
                </div>
                {rent.map((item, pInd) => (
                  <div
                    key={`${rInd}.${pInd}`}
                    className='item'
                    onClick={() => setSelectedRentIndex(startIndex + rInd)}
                  >
                    <div className="item-header">
                      <span className="item-icon">{item.icon}</span>
                      <span>
                        <p className="item-name">{item.name}</p>
                      </span>
                    </div>
                    <div className="item-controls">
                      <div className="control">
                        <span className="preserve-horizontal-text extreme-small-font">파손</span>
                        <IncreaseDecreaseButton
                           increaseQuantity={increaseQuantity}
                           decreaseQuantity={decreaseQuantity}
                           count={item.broken}
                           rIndex={rInd}
                           pIndex={pInd}
                           type='broken'
                        />
                      </div>
                      <div className="control">
                        <span className="preserve-horizontal-text extreme-small-font">분실</span>
                        <IncreaseDecreaseButton
                           increaseQuantity={increaseQuantity}
                           decreaseQuantity={decreaseQuantity}
                           count={item.missing}
                           rIndex={rInd}
                           pIndex={pInd}
                           type='missing'
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        <div>
          {renderPagination()}
        </div>
        <button className="report-button" onClick={reportItems}>신고하기</button>
      </div>
    </div>
  );
}

export default BrokenFind;
