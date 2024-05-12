import React, { useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useUser } from "../userContext";

export const TransactionCharts = () => {
  const { chartData, getUserTransactions, setChartData, calcChartData } = useUser();

  useEffect(() => {
    getUserTransactions();
    setChartData(calcChartData());
  }, []);

  //   console.log(chartData);
  return (
    <Row>
      <Col>
        <Bar data={chartData} height={150} />
      </Col>
      <Col>
        <Doughnut data={chartData} width={150} />
      </Col>
      <Col>
        <Line data={chartData} height={150} width={150} />
      </Col>
    </Row>
  );
};
