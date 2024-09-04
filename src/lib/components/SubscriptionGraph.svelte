<script>
  // @ts-nocheck

  import { Line } from "svelte-chartjs";
  import { data } from "$lib/data/investmentData";
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from "chart.js";
</script>

<Line
  {data}
  width={140}
  height={150}
  options={{
    plugins: {
      legend: false,
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
    responsive: true,
  }}
/>
