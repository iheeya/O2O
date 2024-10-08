import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import AdminNav from "./AdminNav";
import "../../style/Complain.css";
import "../../style/Title.css";
import Pagination from "./Pagination";
import axiosInstance from '../../utils/axiosInstance'
import ButtonComponent from '../../components/ButtonComponent';
import { ScaleLoader } from 'react-spinners'; // 스피너 컴포넌트 임포트

const Request = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const postsPerPage = 10;

  const fetchData = async () => {
    let pageNumber = 1;
    let allPosts = [];
    let hasMoreData = true;

    while (hasMoreData) {
      try {
        const response = await axiosInstance.get(`/products/report?pg_no=${pageNumber}&per_page=${postsPerPage}`);
        const data = response.data;
        const fetchedPosts = data.data.rpts;

        if (fetchedPosts.length === 0) {
          hasMoreData = false;
        } else {
          allPosts = [...allPosts, ...fetchedPosts];
          pageNumber += 1;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        hasMoreData = false;
      }
    }

    // Sort posts to show unprocessed items first
    allPosts.sort((a, b) => a.is_processed - b.is_processed);

    setPosts(allPosts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Current posts:", posts);
  }, [posts]);

  const handleStatusChange = async (status) => {
    const updatedPosts = posts.map((post) =>
      selectedPosts.includes(post.rpt_id)
        ? { ...post, is_processed: status === "처리완료" }
        : post
    );
    setPosts(updatedPosts);

    const postData = selectedPosts.map((id) => ({
      rpt_id: id,
      is_processed: status === "처리완료",
    }));

    console.log("Sending data:", postData);

    try {
      await axiosInstance.put("/products/report/process", postData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("Status updated successfully");

      // Re-sort posts to show unprocessed items first
      updatedPosts.sort((a, b) => a.is_processed - b.is_processed);
      setPosts([...updatedPosts]);
    } catch (error) {
      console.error("Error updating status:", error);
    }

    setSelectedPosts([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedPosts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((postId) => postId !== id)
        : [...prevSelected, id]
    );
  };

  // Compute pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Compute total pages for pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Handle page change
  const handlePageChange = (page) => setCurrentPage(page);

  const formatDate = (dateString) => {
    // 날짜 문자열을 Date 객체로 변환
    const date = new Date(dateString);
  
    // 연도, 월, 일 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    // 시간과 분 추출
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // 원하는 형식으로 변환
    return `${year}.${month}.${day}.${hours}:${minutes}`;
  };

  return (
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <div className="title">
            <h3>파손 분실 신고 관리</h3>
          </div>
          {isLoading ? (
            <div className='request-spinner'>
              <ScaleLoader color='gray' size={50} />
            </div>
          ) : (
            <>
          <Table className="custom-table">
            <thead>
              <tr>
                <th></th>
                <th>No.</th>
                <th>물품명</th>
                <th>신고 사유</th>
                <th>수량</th>
                <th>처리 상태</th>
                <th className="center-align">신고 날짜</th>
                <th>신고자</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={post.rpt_id}>
                  <td>
                    {post.is_processed ? <div style={{ width: "16px" }}></div> : (
                      <Form.Check
                        type="checkbox"
                        onChange={() => handleCheckboxChange(post.rpt_id)}
                        checked={selectedPosts.includes(post.rpt_id)}
                      />
                    )}
                  </td>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{post.product_nm}</td>
                  <td>{post.rpt_content}</td>
                  <td>{post.product_cnt}</td>
                  <td>{post.is_processed ? "처리완료" : "미처리"}</td>
                  <td className="center-align">{formatDate(post.rpt_dt)}</td>
                  <td>{post.user_nm}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="mt-3">
            <ButtonComponent
              onClick={() => handleStatusChange("처리완료")}
              disabled={selectedPosts.length === 0}
            >
              처리완료
            </ButtonComponent>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;
