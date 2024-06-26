"use client";

import React from "react";
import styles from "./Chart.module.scss";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Props } from "./types";
import useChart from "./Chart.controller";
import Filters from "../Filters/Filters";

function Chart(props: Props) {
  const { usages, types, models, windowSize, resetHandler, chartSize } =
    useChart(props);

  return (
    <div
      className={styles["wrapper"]}
      style={{
        width: windowSize.width,
        height: windowSize.height - 120,
      }}
    >
      <Filters types={types} models={models} />
      {usages && usages.length > 0 ? (
        <div className={styles["chart"]}>
          <BarChart
            key="chart-BarChart"
            data={usages}
            width={chartSize.width}
            height={chartSize.height}
          >
            <CartesianGrid strokeDasharray="3 3" key={"chart-grid"} />
            <XAxis dataKey="created_at" key={"chart-XAxis"} />
            <YAxis key={"chart-YAxis"} />
            <Tooltip key="chart-Tooltip" />
            <Bar key={"chart-Bar"} dataKey="cost_of_usages" fill="#ecb939" />
          </BarChart>
        </div>
      ) : (
        <div className={styles["error"]}>
          <h2>По указаной Вами комбинации фильтров ничего не найдено.</h2>
          <button onClick={resetHandler}>сбросить фильтры</button>
        </div>
      )}
    </div>
  );
}

export default Chart;
