import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLockerBodyIdFromLocal, saveLockerBodyIdFromLocal } from '../util/localStorageUtil';
import '../styles/BrokenLocker.css';
import { axiosSpring } from '../api/axios';
import {register} from '../api/cameraget'

const BrokenLocker = () => {
  const [lockersData, setLockersData] = useState([]);
  const [products, setProducts] = useState([]);
  const [highlightedProductIds, setHighlightedProductIds] = useState([]); // product_id로 하이라이트
  const [lockerBodyId, setLockerBodyId] = useState(null);
  const [selectedLocker, setSelectedLocker] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const {reportedItems} = location.state || {reportedItems: []};
  console.log('사물함으로 넘어온 정보: ', reportedItems)

  // locker_body_id 정보 가져오기
  useEffect(() => {
    saveLockerBodyIdFromLocal();

    const locker_body_id = getLockerBodyIdFromLocal();
    setLockerBodyId(locker_body_id);
  }, []);



  useEffect(() => {
    console.log('Updated lockerBodyId:', lockerBodyId);
    if(lockerBodyId){
    // 사물함 이름 데이터 불러오기
    axiosSpring.get('/lockers/names')
      .then(response => {
        const data = response.data.data;
        setLockersData(data);
        console.log('Lockers data:', data);

        // borrowedItems의 body_id에 해당하는 사물함 설정
        if (lockerBodyId) {
          const defaultLocker = data.find(locker => locker.locker_body_id === lockerBodyId);
          if (defaultLocker) {
            setSelectedLocker({ value: defaultLocker.locker_body_id, label: defaultLocker.locker_body_name });
          }
        }
      })
      .catch(error => {
        console.error('Error fetching lockers data:', error);
      });

    // borrowedItems 상태에 따라 sci와 mou 값 설정
    const newStatus = { reg: 0 };
    reportedItems.forEach(item => {
      if (item.id === 76) {
        newStatus.reg = 1;
      } else if (item.id === 3) {
        newStatus.reg = 1;
      }
    });
    // setBorrowedItemsStatus(newStatus); // 상태 업데이트
    console.log('newStatus: ', newStatus)
    // console.log('borrowedItemsStatus: ', borrowedItemsStatus)

    register(newStatus)
    .then(response => {
      console.log('Response from server:', response);
    })
    .catch(e => {
      console.error('Error:', e)
    })

  }
  }, [lockerBodyId]);

  useEffect(() => {
    if (lockerBodyId) {
      axiosSpring.get(`/lockers?locker_body_id=${lockerBodyId}`)
        .then(response => {
          const data = response.data.data;
          setProducts(data);
          console.log('Product data:', data);

          if (reportedItems) {
            // 하이라이트할 product_id 설정
            const highlightedIds = reportedItems.map(item => item.product_id);
            setHighlightedProductIds(highlightedIds);
            console.log('Highlighted product IDs:', highlightedIds);
          }
        })
        .catch(error => {
          console.error('Error fetching products data:', error);
        });

    
      
    }
  }, [lockerBodyId, reportedItems]);

  const getProductInLocker = (column, row) => {
    return products.find(product => product.locker_column === column && product.locker_row === row);
  };


  // product_id로 하이라이트 여부 결정
  // const isHighlighted = (column, row) => {
  //   const product = getProductInLocker(column, row);
  //   console.log('Product:', product); // 제품 정보 콘솔에 출력
  //   return product && highlightedProductIds.includes(product.product_id);
  // };

  const isHighlighted = (column, row) => {
    const maxRow = Math.max(...products.map(product => product.locker_row), 0);
    const maxColumn = Math.max(...products.map(product => product.locker_column), 0);

    return column === maxColumn && row === maxRow;
  };


  // 로커의 행과 열 수를 결정
  const rows = Math.max(...products.map(product => product.locker_row), 0);
  const columns = Math.max(...products.map(product => product.locker_column), 0);



  const back = () => {
    navigate('/');
  };

  const brokenfinish = () => {
    navigate('/BrokenFinish')
  }

  // useEffect(() => {
  //   // 페이지 접근 시 사물함 열기 요청
  //   axiosSpring.post('http://192.168.100.218:5000/open')  // Flask 서버의 실제 IP 주소 사용
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error opening the locker:', error);
  //     });
  // }, []);

  return (
    <>
    <button className="btn-main" onClick={back}>HOME</button>

    <div className='locker-frame'>
      <div className="locker-container1">
        <div className="locker-title">
          표시된 사물함에<br /> 물건을 넣어주세요.<br /> <br />
        </div>
        <div className='locker-grid'>
          {rows > 0 && columns > 0 &&
            Array.from({ length: rows }).map((_, rowIndex) =>
              <div key={`row-${rowIndex}`} className='locker-row'>
                {Array.from({ length: columns }).map((_, colIndex) => {
                  const product = getProductInLocker(colIndex + 1, rowIndex + 1);
                  const highlight = isHighlighted(colIndex + 1, rowIndex + 1);
                  console.log(`Row: ${rowIndex + 1}, Column: ${colIndex + 1}, isHighlighted: ${highlight}`);
                  return (
                    <div 
                      key={`col-${colIndex}`} 
                      className={`locker-box ${highlight ? 'locker-highlight' : ''}`}
                    >
                      {product ? product.product_nm : ''}
                    </div>
                  );
                })}
              </div>
            )
          }
        </div>
        <button className='button1' onClick={brokenfinish}>확인</button>
      </div>
    </div>
  </>


  );
};

export default BrokenLocker;
