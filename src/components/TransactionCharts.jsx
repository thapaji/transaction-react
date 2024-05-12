import React, { useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useUser } from "../userContext";

export const TransactionCharts = () => {
  const { chartData } = useUser();
  console.log(chartData.mainData);

  return (
    <Row className="border shadow rounded p-3 mt-3">
      <Col>
        <Bar data={chartData.mainData} height={150} />
      </Col>
      <Col>
        <Doughnut data={chartData.mainData} width={150} />
      </Col>
      {/* <Col>
        <Line data={chartData.lineData} height={150} width={150} />
      </Col> */}
    </Row>
  );
};
