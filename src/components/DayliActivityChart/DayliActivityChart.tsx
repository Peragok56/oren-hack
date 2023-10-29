// React
import React, { FC, memo } from "react";
// styles
import styles from './DayliActivityChart.module.css'
// Types
import { IDayliActivityChart } from "./DayliActivityChart.type";
// ApexChart
import ReactApexChart from "react-apexcharts";

const DayliActivityChart: FC<IDayliActivityChart> = ({
    data
}) => {

    const chartOptions = {
        chart: {
          type: "area" as const,
        },
        xaxis: {
          categories: data.map((item: any)=> item.date),
        },
        yaxis: {
          title: {
            text: "",
          },
        },
        colors: ['#5B43DA'],
        toolbar: {
            show: false
        },
      };
    
      const chartSeries = [
        {
          name: "Activity",
          data: data.map((item: any)=> item.activity),
        },
      ];

    return(
        <div className={styles[`container`]}>
             <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={325}
            />
        </div>
    )
}

export default memo(DayliActivityChart)