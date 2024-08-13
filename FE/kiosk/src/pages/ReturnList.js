import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css';
import { getCurrentProducts } from '../api/brokenfind.js';
import { formatDateSimple } from '../util/dateUtil.js';
import { getLockerBodyIdFromLocal, getUserFromLocal, saveLockerBodyIdFromLocal } from '../util/localStorageUtil';
import { getUserIdFromSession } from '../util/sessionUtils.js';
import { Loading } from '../components/common/loading.js';

function ReturnList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedRentIndex, setSelectedRentIndex] = useState(null);
  const [selectedRent, setSelectedRent] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lockerBodyId, setLockerBodyId] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const itemsPerPage = 4;

  useEffect(() => {
    const id = getUserIdFromSession();
    if (id) {
      setUserId(id);
    }

    saveLockerBodyIdFromLocal();
    const locker_body_id = getLockerBodyIdFromLocal();
    setLockerBodyId(locker_body_id);

    if (userId) {
      getBrokenValues();
    }
  }, [userId]);

  const getBrokenValues = async () => {
    setLoading(true); // 데이터 로드 시작 시 로딩 상태를 true로 설정
    let allRentsData = [];
    let currentPage = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const data = await getCurrentProducts(userId, currentPage, 1); // Fetch one item per page
      if (data && data.rents.length > 0) {
        for (let rent of data.rents) {
          const productsData = [];
          for (let product of rent.products) {
            const productLockerBodyId = String(product.locker_body_id);
            const localLockerBodyId = String(lockerBodyId);
            if (localLockerBodyId !== '' && productLockerBodyId !== localLockerBodyId) continue;
            if (product.status[1].product_cnt === 0) continue;
            productsData.push({
              locker_body_id: product.locker_body_id,
              id: product.product_id,
              name: product.product_name,
              cnt: product.status[1].product_cnt,
              status: product.status[1].status_id,
              rent_id: rent.rent_id,
              date: rent.rent_dt,
              broken: 0,
              missing: 0,
              icon: "🕶",
              locker_id: product.locker_id,
            });
          }
          if (productsData.length > 0) {
            allRentsData.push(productsData);
          }
        }
        currentPage++;
      } else {
        hasMoreData = false;
      }
    }
    setItems(allRentsData);
    setLoading(false); // 데이터 로드 완료 시 로딩 상태를 false로 설정
  };

  const handleRentClick = (index) => {
    if (selectedRentIndex === index) {
      setSelectedRentIndex(null);
      setSelectedRent(null);
    } else {
      setItems(prevItems =>
        prevItems.map((rent, rInd) =>
          rInd === index
            ? rent
            : rent.map(item => ({ ...item, broken: 0, missing: 0 }))
        )
      );
      setSelectedRentIndex(index);
      setSelectedRent(items[index]);
      const selectedRent = items[index];
      if (selectedRent.length > 0) {
        console.log("선택된 대여 일시:", formatDateSimple(selectedRent[0].date));
      }
    }
  };

  const reportItems = () => {
    if (selectedRent) {
      const reportedItems = selectedRent.map(item => ({ ...item }));
      console.log('reportedItems:', reportedItems);
      navigate('/returnstatus', { state: { reportedItems } });
    } else {
      console.log('선택된 대여가 없습니다.');
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      const newPage = prevPage + direction;
      return Math.max(1, Math.min(newPage, Math.ceil(items.length / itemsPerPage)));
    });
    setSelectedRentIndex(null);
    setSelectedRent(null);
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

  const back = () => {
    navigate('/');
  };

  const renderNoItemsMessage = () => (
    <h4>대여 중인 물품이 없습니다 <span role="img" aria-label="머쓱">😅</span></h4>
  );

  return (
    <div className='frame-container'>
      <button className="btn-main" onClick={back}>HOME</button>
      <div className="cart-container">
        <h2>대여물품조회</h2>
        {loading ? (
          <Loading /> // 로딩 중일 때는 Loading 컴포넌트 렌더링
        ) : (
          <>
            <div className="items">
              {selectedItems.length > 0 ? (
                selectedItems.map((rent, rInd) => (
                  <div key={rInd} className="rent">
                    <div>
                      <p className="item-date small-font">대여 일시: {formatDateSimple(rent[0]?.date)}</p>
                    </div>
                    {rent.map((item, pInd) => (
                      <div
                        key={`${rInd}.${pInd}`}
                        className={`item ${selectedRentIndex === startIndex + rInd ? 'selected-rent' : ''}`}
                        onClick={() => handleRentClick(startIndex + rInd)}
                      >
                        <div className="item-header">
                          <span className="item-icon">{item.icon}</span>
                          <span>
                            <p className="item-name">{item.name}</p>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                renderNoItemsMessage()
              )}
            </div>
            <div>
              {items.length > 0 && renderPagination()}
            </div>
            <button className="report-button" onClick={reportItems}>반납하기</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ReturnList;
