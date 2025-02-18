<template>
	<div class="grid grid-cols-1 gap-2 lg:grid-cols-2 w-100">
		<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
			<h1 class="text-2xl font-bold mb-4 dark:text-white">HRA Calculator - Calculate Your House Rent Allowance
				Online</h1>
			<div class="space-y-4">
				<div>
					<label class="block font-semibold dark:text-gray-300">Basic salary received</label>
					<input type="number" v-model.number="basicSalary" class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
				</div>
				<div>
					<label class="block font-semibold dark:text-gray-300">Dearness Allowance (DA) received</label>
					<input type="number" v-model.number="daReceived" class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
				</div>
				<div>
					<label class="block font-semibold dark:text-gray-300">HRA received</label>
					<input type="number" v-model.number="hraReceived" class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
				</div>
				<div>
					<label class="block font-semibold dark:text-gray-300">Total Rent paid</label>
					<input type="number" v-model.number="totalRent" class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
				</div>
				<div>
					<label class="block font-semibold dark:text-gray-300">Do you live in Delhi, Mumbai, Kolkata, or
						Chennai?</label>
					<div class="flex gap-4">
						<label class="flex items-center dark:text-white">
							<input type="radio" v-model="metroCity" :value="true" class="mr-2" /> Yes
						</label>
						<label class="flex items-center dark:text-white">
							<input type="radio" v-model="metroCity" :value="false" class="mr-2" /> No
						</label>
					</div>
				</div>
				<div class="flex gap-4 mt-4">
					<button @click="calculate"
						class="bg-emerald-600 font-bold text-white px-4 py-2 rounded hover:bg-emerald-800">Calculate</button>
					<button @click="reset"
						class="bg-gray-500 font-bold text-white px-4 py-2 rounded hover:bg-gray-600">Reset</button>
				</div>
			</div>
		</div>
		<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
			<div class="mt-6 justify-self-center">
				<canvas ref="chartCanvas" height="300"></canvas>
			</div>
			<div class="mt-6 p-4">
				<h3 class="text-lg font-bold dark:text-white">Calculation Result</h3>
				<p class="mt-2 dark:text-white">Actual HRA received: ₹{{ hraReceived.toLocaleString() }}</p>
				<p class="dark:text-gray-100">50% of basic salary: ₹{{ halfBasicSalary.toLocaleString() }}</p>
				<p class="dark:text-gray-100">Rent Paid in excess of 10% of salary: ₹{{ rentExcess.toLocaleString() }}
				</p>
				<p class="font-bold dark:text-white">Amount of exempted HRA: ₹{{ exemptedHRA.toLocaleString() }}</p>
				<p class="font-bold dark:text-white">HRA chargeable to Tax: ₹{{ taxableHRA.toLocaleString() }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
	data() {
		return {
			basicSalary: 600000,
			daReceived: 0,
			hraReceived: 240000,
			totalRent: 180001,
			metroCity: true,
			chart: null,
		};
	},
	computed: {
		halfBasicSalary() {
			return this.metroCity ? this.basicSalary * 0.5 : this.basicSalary * 0.4;
		},
		rentExcess() {
			return Math.max(0, this.totalRent - (this.basicSalary * 0.1));
		},
		exemptedHRA() {
			return Math.min(this.hraReceived, this.halfBasicSalary, this.rentExcess);
		},
		taxableHRA() {
			return this.hraReceived - this.exemptedHRA;
		}
	},
	methods: {
		calculate() {
			this.updateChart();
		},
		reset() {
			this.basicSalary = 0;
			this.daReceived = 0;
			this.hraReceived = 0;
			this.totalRent = 0;
			this.metroCity = true;
			this.updateChart();
		},
		updateChart() {
			if (this.chart) {
				this.chart.destroy();
			}
			const ctx = this.$refs.chartCanvas.getContext('2d');
			this.chart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: ['Exempted HRA', 'Taxable HRA'],
					datasets: [{
						data: [this.exemptedHRA, this.taxableHRA],
						backgroundColor: ['#4adf93', '#d0e4fe']
					}]
				},
				options: {
					responsive: false,
					maintainAspectRatio: false,
				}
			});
		}
	},
	mounted() {
		this.updateChart();
	}
};
</script>