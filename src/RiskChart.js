import React, { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

const RiskChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  
  useEffect(() => {
    Chart.register(
      LineController,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      Filler
    );

    const createChart = () => {
      const myChart = chartRef.current;
      if (!myChart) return;

      // Destroy the existing chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = myChart.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, myChart.height);
      
      gradient.addColorStop(0.25, 'red'); // Start with red
      gradient.addColorStop(0.45, 'orange'); // Begin transition to orange
      gradient.addColorStop(0.65, 'yellow'); // Transition to yellow
      gradient.addColorStop(0.85, 'lime'); // Lime to introduce a smoother transition to green
      gradient.addColorStop(0.95, 'green'); // End with green

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.slice(-10).map(item => item ? new Date(item.time).toLocaleTimeString() : ''),
          datasets: [
            {
              label: 'Risk Probability',
              data: data.slice(-10).map(item => item ? item.value : null),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Fill',
              data: data.slice(-10).map(() => 100),
              fill: {
                target: 'origin',
                above: gradient,
              },
              borderColor: 'transparent',
            }
          ]
        },
        options: {
          plugins: {
            filler: {
              propagate: true
            },
            legend: {
              labels: {
                filter: function(item, chart) {
                  return item.text !== 'Fill';
                }
              }
            }
          },
          animation: false,
          scales: {
            y: {
              min: 0,
              max: 100,
            }
          }
        }
      });      
    };

    // Ensure the chart is created after the component mounts and after every update
    requestAnimationFrame(createChart);

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]); // Re-run effect if data changes

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ width: '85%', height: '70%' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default RiskChart;
