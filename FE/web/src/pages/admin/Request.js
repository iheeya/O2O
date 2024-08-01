import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Pagination } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AdminNav from './AdminNav';
import '../../style/Request.css';  
import axios from 'axios';



const Request = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const postsPerPage = 10;

  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://i11d101.p.ssafy.io:8000/products/request');
        const data = response.data;
        console.log(data);
        setPosts(data.data.reqs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleStatusChange = (status) => {
    const updatedPosts = posts.map((post) =>
      selectedPosts.includes(post.req_id) ? { ...post, status } : post
    );
    setPosts(updatedPosts);
    setSelectedPosts([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedPosts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((postId) => postId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePrevChunk = () => setCurrentPage(Math.max(currentPage - 5, 1));
  const handleNextChunk = () => setCurrentPage(Math.min(currentPage + 5, totalPages));
  return (
    
    <div>
      <AdminNav />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <h3>물건 요청 리스트</h3>

          <Table>
            <thead>
              <tr>
                <th></th>
                <th>No.</th>
                <th>물품 명</th>
                <th>물품 개수</th>
                <th>처리 상태</th>
                <th>신청 날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={post.req_id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      onChange={() => handleCheckboxChange(post.req_id)}
                      checked={selectedPosts.includes(post.req_id)} 
                    />
                  </td>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{post.product_nm}</td> 
                  <td>{post.product_cnt}</td>
                  <td>{post.is_approved ? '승인됨' : post.is_rejected ? '거절됨' : '대기중'}</td>
                  <td>{post.req_dt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <div className="mt-3">
            <Button
              className='success-button'
              onClick={() => handleStatusChange('처리됨')}
              disabled={selectedPosts.length === 0}
              style={{ marginRight: '10px' }}
            >
              수락
            </Button>
            <Button
              className='reject-button'
              onClick={() => handleStatusChange('거절됨')}
              disabled={selectedPosts.length === 0}
            >
              거절
            </Button>
          </div>
          
          <div className="pagination-container">
            <Pagination className='justify-content-center'>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev onClick={handlePrevChunk} />
              <Pagination.Item onClick={() => handlePageChange(1)}>{1}</Pagination.Item>
              {currentPage > 3 && <Pagination.Ellipsis />}
              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(Math.max(currentPage - 3, 1), Math.min(currentPage + 2, totalPages - 1))
                .map(pageNumber => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}
              {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
              {totalPages > 1 && (
                <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </Pagination.Item>
              )}
              <Pagination.Next onClick={handleNextChunk} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Request;
