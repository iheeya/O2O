import React, { useState, useEffect } from 'react';
import '../../style/AdminMainpage.css'; 
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import { getProfile } from '../../api/userget'; 
import { updateProfile } from '../../api/userpost'; 
import '../../style/Profile.css';
import Image from '../../images/profile.png';
import ButtonComponent from '../../components/ButtonComponent';
import Swal from 'sweetalert2';

function Profile() {
  const [profileData, setProfileData] = useState({
    user_nm: "",
    user_tel: "",
    user_img: "",
    user_pw: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const data = await getProfile(userId);
        setProfileData(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        user_img: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (editMode && name !== 'user_pw') {
      setPasswordRequired(true);
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return false;
    }

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterRegex.test(password);
  };

  const handleSave = async () => {
    if (passwordRequired) {
      if (!formData.user_pw) {
        Swal.fire({
          title: '비밀번호 입력 오류',
          text: '비밀번호를 입력하세요.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: '확인'
        });
        return;
      }

      if (!validatePassword(formData.user_pw)) {
        Swal.fire({
          title: '비밀번호 형식 오류',
          text: '비밀번호는 6자 이상, 특수문자를 포함해야 합니다.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: '확인'
        });
        return;
      }
    }

    try {
      const userId = localStorage.getItem('userId');
      await updateProfile(userId, formData);
      setProfileData(formData);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setPasswordRequired(true);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_pw: ''
    }));
  };

  return (
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h2>회원정보</h2>
          <div className="profile-card">
            <div className="profile-image">
              <img
                src={Image}
                alt="프로필 이미지"
              />
              {editMode && (
                <input
                  type="file"
                  name="user_img"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              )}
            </div>
            <div className="profile-details">
              {editMode ? (
                <div className='profile-edit'>
                  <table className="profile-table">
                    <tbody>
                      <tr>
                        <td className="detail-label"><strong>이름</strong></td>
                        <td className="detail-value">
                          <input
                            type="text"
                            name="user_nm"
                            value={isLoading ? "" : formData.user_nm}  // 로딩 중일 때 빈칸 표시
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="detail-label"><strong>전화번호</strong></td>
                        <td className="detail-value">
                          <input
                            type="text"
                            name="user_tel"
                            value={isLoading ? "" : formData.user_tel}  // 로딩 중일 때 빈칸 표시
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="detail-label"><strong>비밀번호</strong></td>
                        <td className="detail-value">
                          <input
                            type="password"
                            name="user_pw"
                            value={isLoading ? "" : formData.user_pw}  // 로딩 중일 때 빈칸 표시
                            onChange={handleInputChange}
                            placeholder="비밀번호는 6자 이상, 특수문자를 포함해야 합니다."
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span>
                    <ButtonComponent onClick={handleSave} style={{ margin: '20px 10px' }}>저장</ButtonComponent>
                    <ButtonComponent onClick={() => setEditMode(false)} style={{ margin: '20px 10px' }}>취소</ButtonComponent>
                  </span>
                </div>
              ) : (
                <div className='profile-content'>
                  <table className="profile-table">
                    <tbody>
                      <tr>
                        <td className="detail-label"><strong>이름</strong></td>
                        <td className="detail-value">{isLoading ? "" : profileData.user_nm}</td> {/* 로딩 중일 때 빈칸 표시 */}
                      </tr>
                      <tr>
                        <td className="detail-label"><strong>전화번호</strong></td>
                        <td className="detail-value">{isLoading ? "" : profileData.user_tel}</td> {/* 로딩 중일 때 빈칸 표시 */}
                      </tr>
                      <tr>
                        <td className="detail-label"><strong>비밀번호</strong></td>
                        <td className="detail-value">{isLoading ? "" : '********'}</td> {/* 로딩 중일 때 빈칸 표시 */}
                      </tr>
                    </tbody>
                  </table>
                  <ButtonComponent onClick={handleEdit} style={{ margin: '30px 0px' }}>수정</ButtonComponent>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

