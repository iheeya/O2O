import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RegisterBroken.css';
import { Button } from 'react-bootstrap';
import { FaCut, FaTint, FaPencilAlt, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { postProductsBrokenAndMissing } from '../api/brokenfind.js';
const iconMap = {
  '가위': <FaCut className="icon" />,
  '잉크': <FaTint className="icon" />,
  '연필': <FaPencilAlt className="icon" />,
  '카메라': <FaCamera className="icon" />,
};

// 보통 이런 상수 데이터는 Data.js 만들어서 따로 빼기도 함
const product_status = {
  "4": "분실",
  "7": "파손"
}

// 임시 유저 아이디
const userId = 4;

function RegisterBroken() {
  const location = useLocation();
  const { reportedItems } = location.state || { reportedItems: [] };
  const navigate = useNavigate();
  
  const brokenlocker = async () => {
    const response = await postReported();
    // 요청 보낸 후 이동 

    navigate('/BrokenLocker');
  };

  const postReported = async () => {
    const params = reportedItems.map(item => ({
      "user_id" : userId,
      "locker_id" : item.locker_id==null?9:item.locker_id,
      "status_id" : item.missing > 0? 4: 7,
      "product_id" : item.id,
      "product_cnt" : item.cnt,
      "rpt_content" : "세부 사항",
      "rpt_img" : "물품 이미지"
    }))
    const response = await postProductsBrokenAndMissing(params)
  }


  return (
    <div className='frame-container'>
      <div className="report-container">
        {reportedItems.map((item, index) => (
          <div key={index} className="item">
            {iconMap[item.name]}
            <div className="item-description">{item.name}</div>
            <div className="item-status-container">
              {item.broken > 0 && (
                <div className="item-status">
                  <span className="status-label">파손 :</span>
                  <span className="item-count">{item.broken}</span>
                </div>
              )}
              {item.missing > 0 && (
                <div className="item-status">
                  <span className="status-label">분실 :</span>
                  <span className="item-count">{item.missing}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="register-button-container">
          <Button variant="primary" className="register-button" onClick={brokenlocker}>등록</Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterBroken;
