<template>
	<div class="grid grid-cols-1 gap-2 lg:grid-cols-2 w-100">
		<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
			<h1 class="text-2xl font-bold mb-4 dark:text-white">HRA Calculator - Calculate Your House Rent Allowance
				Online</h1>
			<div class="space-y-4">
				<div>
					<label class="block text-gray-600 dark:text-gray-300 text-sm">Basic salary received</label>
					<input type="number" v-model.number="basicSalary"
						class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
				</div>
				<div>
					<div>
						<label class="text-gray-600 dark:text-gray-300 text-sm">Dearness Allowance (DA) received</label>
					</div>
					<input type="number" v-model.number="daReceived"
						class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
				</div>
				<div>
					<label class="block text-gray-600 dark:text-gray-300 text-sm">HRA received</label>
					<input type="number" v-model.number="hraReceived"
						class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
				</div>
				<div>
					<label class="block text-gray-600 dark:text-gray-300 text-sm">Total Rent paid</label>
					<input type="number" v-model.number="totalRent"
						class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
				</div>
				<div>
					<label class="block text-gray-600 dark:text-gray-300 text-sm">Do you live in Delhi, Mumbai, Kolkata, or Chennai?</label>
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
				<div class="p-12 bg-white relative w-full sm:p-6 xs:p-2 rounded-tr-md rounded-br-none rounded-bl-none dark:bg-gray-900 dark:text-slate-200" style="box-shadow:0px 0px 30px 0px #1369EB1A">
					<div>
						<div class="  border-b  border-none">
							<div class="flex justify-between items-center gap-2 p-3">
								<div class="font-medium">Actual HRA received</div>
								<div class="font-medium whitespace-nowrap dark:text-teal-400">
									<span>₹</span><span class="">{{ hraReceived.toLocaleString() }}</span>
								</div>
							</div>
						</div>
					</div>
					<div v-if="metroCity === true">
						<div class="border-b  border-none">
							<div class="flex justify-between items-center gap-2 p-3">
								<div class="font-medium">50% of basic salary</div>
								<div class="font-medium whitespace-nowrap dark:text-teal-400">
									<span>₹</span><span class="">{{ halfBasicSalary.toLocaleString() }}</span>
								</div>
							</div>
						</div>
					</div>
					<div v-if="metroCity === false">
						<div class="border-b border-none">
							<div class="flex justify-between items-center gap-2 p-3">
								<div class="font-medium">40% of basic salary</div>
								<div class="font-medium whitespace-nowrap dark:text-teal-400">
									<span>₹</span><span class="">{{ halfBasicSalary.toLocaleString() }}</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div class="  border-b  undefined">
							<div class="flex justify-between items-center gap-2 p-3">
								<div class="font-medium">Rent Paid in excess of 10% of salary</div>
								<div class="font-medium whitespace-nowrap dark:text-teal-400">
									<span>₹</span><span class="">{{ rentExcess.toLocaleString() }}</span>
								</div>
							</div>
							<div class="text-s-14 font-medium text-[#9092A3] dark:text-gray-400 pl-3 pb-4">The least of the above three is
								exempt from HRA</div>
						</div>
					</div>
					<div>
						<div class="border-b border-none font-bold">
							<div class="flex justify-between items-center gap-2 p-3">
								<div class="font-bold">Amount of exempted HRA</div>
								<div class="font-bold whitespace-nowrap dark:text-teal-400">
									<span>₹</span><span class="">{{ exemptedHRA.toLocaleString() }}</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div class="border-b  border-none font-bold">
							<div class="flex justify-between items-center gap-2 p-3">
								<div class="font-bold">HRA chargeable to Tax</div>
								<div class="font-bold whitespace-nowrap dark:text-teal-400">
									<span>₹</span><span class="">{{ taxableHRA.toLocaleString() }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
	data() {
		return {
			basicSalary: 500000,
			daReceived: 0,
			hraReceived: 220000,
			totalRent: 140000,
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
			this.basicSalary = 500000;
			this.daReceived = 0;
			this.hraReceived = 220000;
			this.totalRent = 140000;
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