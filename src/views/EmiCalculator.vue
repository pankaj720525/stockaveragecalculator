<template>
  <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-[100%]">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">EMI Calculator</h2>

      <!-- Loan Amount -->
      <div class="mb-4">
        <div class="flex items-center justify-between space-x-2">
          <label class="block text-gray-600 dark:text-gray-300 text-sm">Loan Amount (₹)</label>
          <input type="number" v-model="loanAmount"
            class="w-32 border dark:bg-gray-800 p-2 rounded-md text-center dark:text-white" />
        </div>
        <div class="">
          <input type="range" v-model="loanAmount" minlength="0" min="10000" max="8000000" step="50000"
            class="w-full cursor-pointer custom-slider" @input="updateChart" />
        </div>
      </div>

      <!-- Interest Rate -->
      <div class="mb-4">
        <div class="flex items-center justify-between space-x-2">
          <label class="block text-gray-600 dark:text-gray-300 text-sm">Rate of Interest (p.a %)</label>
          <input type="number" v-model="interestRate"
            class="w-20 border p-2 dark:bg-gray-800 rounded-md text-center dark:text-white" />
        </div>
        <div class="">
          <input type="range" v-model="interestRate" min="1" max="20" step="0.1"
            class="w-full cursor-pointer custom-slider" @input="updateChart" />
        </div>
      </div>

      <!-- Loan Tenure -->
      <div class="mb-4">
        <div class="flex items-center justify-between space-x-2">
          <label class="block text-gray-600 dark:text-gray-300 text-sm">Loan Tenure (Years)</label>
          <input type="number" v-model="loanTenure"
            class="w-16 border p-2 dark:bg-gray-800 rounded-md text-center dark:text-white" />
        </div>
        <div>
          <input type="range" v-model="loanTenure" min="1" max="30" step="1" class="w-full cursor-pointer custom-slider"
            @input="updateChart" />
        </div>
      </div>

      <!-- EMI Results -->
      <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded dark:text-white">
        <h3 class="text-lg font-bold dark:text-slate-300">Loan Summary</h3>
        <p class="text-lg font-bold">Monthly EMI: <span class="text-teal-500">₹{{ monthlyEMI.toLocaleString() }}</span>
        </p>
        <p>Principal Amount: <span class="font-bold dark:text-slate-300">₹{{ loanAmount.toLocaleString() }}</span></p>
        <p>Total Interest: <span class="font-bold">₹{{ totalInterest.toLocaleString() }}</span></p>
        <p>Total Payment: <span class="font-bold">₹{{ totalPayment.toLocaleString() }}</span></p>
      </div>
    </div>
    <!-- Highcharts Pie Chart -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-[100%]">
      <div class="mw-[100%] overflow-hidden justify-self-center">
        <!-- <canvas id="chart"></canvas> -->
        <canvas ref="chartCanvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
// import Highcharts from "highcharts";
// import HighchartsVue from "highcharts-vue";
import Chart from 'chart.js/auto';

export default {
  name: 'EMICalculator',
  metaInfo: {
    title: 'EMI Calculator',
    meta: [
      { name: 'description', content: 'Calculate your Equated Monthly Installments (EMI) for loans using our EMI Calculator.' },
      { name: 'keywords', content: 'EMI calculator, loan EMI calculator, EMI calculator online' }
    ]
  },
  data() {
    return {
      loanAmount: 100000,
      interestRate: 7.5,
      loanTenure: 10,
      chartOptions: {
        chart: { type: "pie" },
        title: { text: "Loan Breakdown" },
        series: [
          {
            name: "Amount",
            colorByPoint: true,
            data: [],
          },
        ],
      },
    };
  },
  computed: {
    monthlyEMI() {
      const P = this.loanAmount;
      const r = this.interestRate / 12 / 100;
      const n = this.loanTenure * 12;
      return Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    },
    totalPayment() {
      return this.monthlyEMI * this.loanTenure * 12;
    },
    totalInterest() {
      return this.totalPayment - this.loanAmount;
    }
  },
  watch: {
    loanAmount: "updateChart",
    interestRate: "updateChart",
    loanTenure: "updateChart",
  },
  mounted() {
    this.updateChart();
  },
  methods: {
    updateChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Principal Amount', 'Interest Amount'],
          datasets: [{
            data: [this.loanAmount, this.totalInterest],
            backgroundColor: ['#4adf93', '#d0e4fe']
          }]
        },
        options: {
          responsive: false, // Disable responsiveness for fixed size
          maintainAspectRatio: false, // Allow custom height and width
          // plugins: {
          //   legend: {
          //     labels: {
          //       color: 'green', // Change legend label color
          //       font: {
          //         size: 14, // Optional: Change font size
          //         weight: 'bold' // Optional: Change font weight
          //       }
          //     }
          //   }
          // }
        }
      });
    }
  },
};
</script>

<style>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: #2f516c;
  border-radius: 5px;
  outline: none;
}
</style>