import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './CirclChart.module.css'

interface ColumnChartProps {
    data: number[];
    categories: string[];
  }

const CircleChart: React.FC<ColumnChartProps> = ({ data, categories }) => {
    const options: any = {
        chart: {
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            colors: {
              ranges: [{
                color: '#5B43DA',
              }],
            },
          },
        },
        xaxis: {
          categories: categories,
        },
      };
    
      const series = [{
        name: 'Series 1',
        data: data,
      }];

  return (
    <div className={styles[`container`]}>
        <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        />
    </div>
  );
};

export default CircleChart;