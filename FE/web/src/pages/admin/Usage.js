import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/Statistics.css";
import axiosInstance from '../../utils/axiosInstance'
import { ScaleLoader } from 'react-spinners'; // 스피너 컴포넌트 임포트

const UsageStatistics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/usage/analysis/retention-rate") // 우측 하단 데이터 경로
      .then((response) => {
        console.log(response.data.data.products);
        const products = response.data.data.products;
        // 데이터를 사용률로 정렬 (내림차순)
        const data = products
          .sort((a, b) => b.usage_rate - a.usage_rate)
          .slice(0, 5); // 상위 5개 선택

          setData(data);
      })
      .catch((error) => console.error("Failed to load data:", error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className='user-spinner'>
            <ScaleLoader color='gray' size={50} />
          </div>;
  }

  if (!data) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="in-chart">
      <h5>[보유율 통계]</h5>
      <table>
        <thead>
          <tr>
            <th>제품명</th>
            <th>보유율</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_nm}</td>
              <td>{product.retention_rate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsageStatistics;
