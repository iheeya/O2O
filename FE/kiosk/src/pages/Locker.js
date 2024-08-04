import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import '../styles/Locker.css';

const Locker = () => {
  const [lockersData, setLockersData] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [products, setProducts] = useState([]);
  const [highlightedLockers, setHighlightedLockers] = useState([]); // 대여한 물품 사물함 강조 상태

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 사물함 이름 데이터 불러오기
    axios.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);
        console.log('Lockers data:', data);

        // 기본 1층 선택
        const defaultLocker = data.find(locker => locker.locker_body_id === 1);
        if (defaultLocker) {
          setSelectedLocker({ value: defaultLocker.locker_body_id, label: defaultLocker.locker_body_name });
        }
      })
      .catch(error => {
        console.error('Error fetching lockers data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedLocker) {
      axios.get(`/lockers?locker_body_id=${selectedLocker.value}`)
        .then(response => {
          const data = response.data.data;
          setProducts(data);
          console.log('Product data:', data);
        })
        .catch(error => {
          console.error('Error fetching products data:', error);
        });
    }
  }, [selectedLocker]);

  useEffect(() => {
    // BorrowFinish에서 전달받은 대여한 물품 정보
    if (location.state && location.state.borrowedItems) {
      // 선택된 층의 대여한 물품만 강조
      const filteredItems = location.state.borrowedItems.filter(
        item => item.body_id === selectedLocker?.value
      );
      setHighlightedLockers(filteredItems);
      console.log('Filtered borrowed items for the selected locker:', filteredItems);
    }
  }, [location.state, selectedLocker]);

  const options = lockersData.map(lockerData => ({
    value: lockerData.locker_body_id,
    label: lockerData.locker_body_name
  }));

  const handleChange = selectedOption => {
    setSelectedLocker(selectedOption);
    console.log('Selected locker:', selectedOption);
  };

  const back = () => {
    navigate('/');
  };

  // 특정 사물함에 물품이 있는지 확인하는 함수
  const getProductInLocker = (column, row) => {
    return products.find(product => product.locker_column === column && product.locker_row === row);
  };

  return (

    <>
      {/* 메이페이지 버튼 */}
      <button className="btn-main" onClick={back}>메인 페이지</button>

      <div className='locker-frame'>
        <div className="locker-container1">
        <div className="locker-title">
          표시된 사물함에서<br /> 물건을 가져가세요<br /> <br />
        </div>
        <div className='locker-dropdown'>
          <Select 
            options={options} 
            value={selectedLocker}
            onChange={handleChange}
            placeholder="사물함을 선택하세요"
          />
        </div>
        <div className='locker-grid'>
          {selectedLocker && lockersData.length > 0 && 
            Array.from({ length: lockersData.find(locker => locker.locker_body_id === selectedLocker.value).row }).map((_, rowIndex) =>
              <div key={`row-${rowIndex}`} className='locker-row'>
                {Array.from({ length: lockersData.find(locker => locker.locker_body_id === selectedLocker.value).column }).map((_, colIndex) => {
                  const product = getProductInLocker(colIndex + 1, rowIndex + 1);
                  const isHighlighted = highlightedLockers.some(item => item.locker_column === colIndex + 1 && item.locker_row === rowIndex + 1);
                  return (
                    <div 
                      key={`col-${colIndex}`} 
                      className={`locker-box ${isHighlighted ? 'locker-highlight' : ''}`}
                    >
                      {product ? product.product_nm : ''}
                    </div>
                  );
                })}
              </div>
            )
          }
        </div>
        </div>
      </div>
    
    </>
    
  );
};

export default Locker;
