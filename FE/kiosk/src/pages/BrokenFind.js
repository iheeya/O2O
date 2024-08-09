// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/BrokenFind.css';
// import '../styles/common/Common.css';
// import { getCurrentProducts, getTest } from '../api/brokenfind.js';
// import IncreaseDecreaseButton from '../components/common/IncreaseDecreaseButton.js'
// import { formatDateSimple } from '../util/dateUtil.js'
// import { getUserIdFromSession } from '../util/sessionUtils.js'


// function BrokenFind() {
//   const navigate = useNavigate();
//   // const [quantities, setQuantities] = useState(items.reduce((acc, item) => {
//   //   acc[item.id] = { broken: 0, missing: 0 };
//   //   return acc;
//   // }, {}));

//   const [items, setItems] = useState([[]]);
//   const [userId, setUserId] = useState(null);


//   ////////////////////////////////
//   const Test = async () => {
//     if (userId) {
//       try {
//         // 데이터 가져오기
//         const data = await getTest(userId, 1, 5);
//         console.log("Test API data:", data.data.message);
  
//         // message를 문자열로 받는다고 가정하고 객체로 변환
//         const message = data.data.message;
  
//         // JSON 형식으로 변환 가능한 경우
//         // message 문자열이 JSON 형식이라고 가정하고 변환
//         const parsedData = JSON.parse(message);
//         console.log('parsedData',parsedData)
  
//         // 객체에서 키와 값을 추출
//         const keys = Object.keys(parsedData);
//         const values = Object.values(parsedData);
  
//         console.log("Keys:", keys); // ["10", "13", "20"]
//         console.log("Values:", values); // [1, 3, 5]
  
//         // 루프를 사용한 키와 값 출력
//         keys.forEach(key => {
//           console.log(`Key: ${key}, Value: ${parsedData[key]}`);
//         });
  
//       } catch (error) {
//         console.error("Error fetching test data:", error);
//       }
//     }
//   };
  

//   //////////////////////////////////

//   const increaseQuantity = (rentIndex, productIndex, type) => {
//     // setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] + 1 } }));
//     // console.log(items[rentIndex][productIndex]);
//     setItems(prevItems =>
//       prevItems.map((rent, rInd) =>
//         rInd === rentIndex
//           ? rent.map((item, pInd) =>
//             pInd === productIndex
//               ? { ...item, [type]: 
//                     (item.cnt - (item.broken + item.missing)) == 0?
//                        item[type]: item[type] + 1 }
//               : item
//           )
//           : rent
//       )
//     );
//     // console.log(items[rentIndex][productIndex]);
//   };

//   const decreaseQuantity = (rentIndex, productIndex, type) => {
//     // setQuantities(prev => ({ ...prev, [id]: { ...prev[id], [type]: prev[id][type] > 0 ? prev[id][type] - 1 : 0 } }));
//     setItems(prevItems =>
//       prevItems.map((rent, rInd) =>
//         rInd === rentIndex
//           ? rent.map((item, pInd) =>
//             pInd === productIndex
//               ? { ...item, [type]: Math.max(item[type] - 1, 0) }
//               : item
//           )
//           : rent
//       )
//     );
//   };

//   // 페이지가 처음 로딩될 때 userId 설정
//   useEffect(() => {
//     const id = getUserIdFromSession();
//     if (id) {
//       setUserId(id);
//     }
//   }, []);

//   // userId가 설정된 후에 API 호출
//   useEffect(() => {
//     if (userId) {
//       getBrokenValues();
//       Test();
//     }
//   }, [userId])

//   const reportItems = () => {
//     console.log(items);
//     console.log(items);
//     // 분실 목록
//     // filter -> map 순서 
//     const reportedItems = [];
//     items.map(rent => 
//       rent.map(item => {
//         if(item.missing > 0 || item.broken > 0){
//           reportedItems.push(item);
//         }
//       })
//     );
//     // console.log("신고된 아이템:", reportedItems);
//     // console.log(reportedItems[0].name)
//     // post 후 이동 
//     navigate('/registerbroken', { state: { reportedItems } });
//   };

//   // ------------- API 연결
//   const getBrokenValues = async () => {
//     const data = await getCurrentProducts(userId, 1, 5);
//     console.log("data ", data);
//     if (data != null) {
//       const rentsData = [];
//       console.log("data.rents " + data.rents)
//       for (let rent of data.rents) {
//         console.log("Rent" + rent);
//         const productsData = [];
//         for (let product of rent.products) {
//           if (product.status[1].product_cnt == 0) continue;
//           productsData.push({
//             id: product.product_id,
//             name: product.product_name,
//             cnt: product.status[1].product_cnt,
//             date: rent.rent_dt,
//             broken: 0,
//             missing: 0,
//             icon: "🕶",
//             locker_id: product.locker_id,
//           })
//         }
//         rentsData.push(productsData);
//       }
//       console.log(rentsData);
//       setItems(rentsData);
//     }
//   }

//   return (
//     <div className='frame-container'>
//       <button className="btn-main" onClick={() => navigate('/')}>
//           HOME
//       </button>
//       <div className="cart-container">
//         <h2>대여물품조회</h2>
//         <div className="items">
//           {items.map((rent, rInd) => (
//             <div key={rInd} className="rent">
//               <div>
//                 <p className="item-date small-font">대여 일시: {formatDateSimple(rent[0]?.date)}</p>
//               </div>
//               {rent.map((item, pInd) => ( // `rent` 배열을 `map`으로 순회
//                 <div key={rInd + "." + pInd} className="item">
//                   <div className="item-header">
//                     <span className="item-icon">{item.icon}</span>
//                     <span>
//                       <p className="item-name">{item.name}</p>
//                     </span>
//                   </div>
//                   <div className="item-controls">
//                     <div className="control">
//                       <span className="preserve-horizontal-text extreme-small-font">파손</span>
//                       {/* <button className="btn btn-sm mx-1" onClick={() => decreaseQuantity(item.id, 'broken')}>-</button>
//               <span className="mx-1">{quantities[item.id].broken}</span>
//               <button className="btn btn-sm mx-1" onClick={() => increaseQuantity(item.id, 'broken')}>+</button> */}
//                       <IncreaseDecreaseButton
//                         increaseQuantity={increaseQuantity}
//                         decreaseQuantity={decreaseQuantity}
//                         count={item.broken}
//                         rIndex={rInd}
//                         pIndex={pInd}
//                         type='broken'
//                       />
//                     </div>
//                     <div className="control">
//                       <span className="preserve-horizontal-text extreme-small-font">분실</span>
//                       <IncreaseDecreaseButton
//                         increaseQuantity={increaseQuantity}
//                         decreaseQuantity={decreaseQuantity}
//                         count={item.missing}
//                         rIndex={rInd}
//                         pIndex={pInd}
//                         type='missing'
//                       />
//                     </div>
//                   </div>
//                 </div>
//                  ))}
//               </div>
//             ))}
//         </div>
//         <button className="report-button" onClick={reportItems}>신고하기</button>
//       </div>
//     </div>
//   );
// }

// export default BrokenFind;





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BrokenFind.css';
import '../styles/common/Common.css';
import { getCurrentProducts, getTest } from '../api/brokenfind.js';
import IncreaseDecreaseButton from '../components/common/IncreaseDecreaseButton.js';
import { formatDateSimple } from '../util/dateUtil.js';
import { getUserIdFromSession } from '../util/sessionUtils.js';

function BrokenFind() {
  const navigate = useNavigate();
  const [items, setItems] = useState([[]]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [selectedRentIndex, setSelectedRentIndex] = useState(null);

  useEffect(() => {
    const id = getUserIdFromSession();
    if (id) {
      setUserId(id);
    }
  }, []);

    ////////////////////////////////
  const Test = async () => {
    if (userId) {
      try {
        // 데이터 가져오기
        const data = await getTest(userId, 1, 5);
        console.log("Test API data:", data.data.message);
  
        // message를 문자열로 받는다고 가정하고 객체로 변환
        const message = data.data.message;
  
        // JSON 형식으로 변환 가능한 경우
        // message 문자열이 JSON 형식이라고 가정하고 변환
        const parsedData = JSON.parse(message);
        console.log('parsedData',parsedData)
  
        // 객체에서 키와 값을 추출
        const keys = Object.keys(parsedData);
        const values = Object.values(parsedData);
  
        console.log("Keys:", keys); // ["10", "13", "20"]
        console.log("Values:", values); // [1, 3, 5]
  
        // 루프를 사용한 키와 값 출력
        keys.forEach(key => {
          console.log(`Key: ${key}, Value: ${parsedData[key]}`);
        });
  
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    }
  };
  

  //////////////////////////////////

  useEffect(() => {
    if (userId) {
      getBrokenValues();
      Test();
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
    const data = await getCurrentProducts(userId, 1, 5);
    if (data != null) {
      const rentsData = [];
      for (let rent of data.rents) {
        const productsData = [];
        for (let product of rent.products) {
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
        rentsData.push(productsData);
      }
      setItems(rentsData);
    }
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

  return (
    <div className='frame-container'>
      <button className="btn-main" onClick={() => navigate('/')}>
        HOME
      </button>
      <div className="cart-container">
        <h2>대여물품조회</h2>
        <div className="items">
          {selectedItems.map((rent, rInd) => (
            <div key={rInd} className="rent">
              <div>
                <p className="item-date small-font">대여 일시: {formatDateSimple(rent[0]?.date)}</p>
              </div>
              {rent.map((item, pInd) => (
                <div
                  key={`${rInd}.${pInd}`}
                  className={`item ${selectedRentIndex === startIndex + rInd ? 'selected-rent' : ''}`}
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
                        increaseQuantity={(rentIndex, productIndex, type) => {}}
                        decreaseQuantity={(rentIndex, productIndex, type) => {}}
                        count={item.broken}
                        rIndex={rInd}
                        pIndex={pInd}
                        type='broken'
                      />
                    </div>
                    <div className="control">
                      <span className="preserve-horizontal-text extreme-small-font">분실</span>
                      <IncreaseDecreaseButton
                        increaseQuantity={(rentIndex, productIndex, type) => {}}
                        decreaseQuantity={(rentIndex, productIndex, type) => {}}
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
          ))}
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
