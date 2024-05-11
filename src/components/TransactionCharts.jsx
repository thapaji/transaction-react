import React from "react";
import { Col, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useUser } from "../userContext";

export const TransactionCharts = () => {
  const { chartData } = useUser();
  console.log(chartData);
  return (
    <Row>
      <Col>
        <Bar data={chartData} />
      </Col>
      <Col></Col>
    </Row>
  );
};
