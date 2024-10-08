import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button, Dropdown, Form } from 'react-bootstrap';
import '../../style/MainPageApp.css'; 
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Changepwd.css'; 
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import ButtonComponent from '../../components/ButtonComponent';


function ChangePwd() {
  const navigate = useNavigate();

  const handlePasswordChange = () => {
      if (window.confirm('비밀번호가 변경되었습니다.')) {
          navigate('/'); 
      }
  };

  return (
    <div>
        <AdminNav/>
      <div className="content-container">
            <Sidebar/>
          <div className="content">
            <h1>비밀 번호 변경</h1>
            <div className="pwd-form">
                <Form.Label htmlFor="inputPassword">기존 비밀번호 입력</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword"
                    placeholder="현재 비밀번호를 입력해 주세요."
                />
                <Form.Label htmlFor="inputNewPassword1">새 비밀번호 입력</Form.Label>
                <Form.Control
                    type="password"
                    id="inputNewPassword1"
                    placeholder="새 비밀번호를 입력해주세요."
                />
                <Form.Label htmlFor="inputNewPassword2">새 비밀번호 확인</Form.Label>
                <Form.Control
                    type="password"
                    id="inputNewPassword2"
                    placeholder="새 비밀번호를 다시 입력해주세요."
                />
                <ButtonComponent
                  onClick={handlePasswordChange}
                >
                  비밀번호 수정
                </ButtonComponent>
            </div>

          </div>
      </div>
    
    </div>
  );
}

export default ChangePwd;
