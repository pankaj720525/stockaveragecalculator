<template>
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 w-100">
        <div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
            <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Stock Average Calculator</h1>
            <div class="grid grid-cols-2 gap-6">
                <div>
                    <h3 class="text-bold text-2md dark:text-white">First Buying</h3>
                    <div class="mt-3">
                        <label class="block text-gray-800 dark:text-gray-300">Quantity</label>
                        <input v-model.number="quantity1" type="number" placeholder="Enter Quantity"
                            class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
                    </div>
                    <div class="mt-3">
                        <label class="block text-gray-800 dark:text-gray-300">Buying Price Per Share</label>
                        <input v-model.number="price1" type="number" placeholder="Enter Price"
                            class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
                    </div>
                    <div v-if="showResults" class="mt-3 font-bold"><span
                            class="text-sm font-semibold dark:text-white">Invested amount in the 1st Buying:</span>
                        <span class="font-bold text-teal-500 break-words">{{ firstInvestment.toLocaleString() }}</span>
                    </div>
                </div>
                <div>
                    <h3 class="text-bold text-2md dark:text-white">Second Buying</h3>
                    <div class="mt-3">
                        <label class="block text-gray-800 dark:text-gray-300">Quantity</label>
                        <input v-model.number="quantity2" type="number" placeholder="Enter Quantity"
                            class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
                    </div>
                    <div class="mt-3">
                        <label class="block text-gray-800 dark:text-gray-300">Buying Price Per Share</label>
                        <input v-model.number="price2" type="number" placeholder="Enter Price"
                            class="w-full p-2 border border-gray-400 dark:bg-gray-900 rounded-md focus:ring focus:ring-blue-100 dark:text-white" />
                    </div>
                    <div v-if="showResults" class="mt-3"> <span class="text-sm font-semibold dark:text-white">Invested
                            amount in the 2nd Buying:</span> <span class="font-bold text-teal-500 break-words">{{
                                secondInvestment.toLocaleString() }}</span></div>
                </div>
            </div>
            <!-- Result -->
            <div v-if="showResults" class="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded text-center">
                <h3 class="text-lg font-semibold dark:text-white">Investment Summary</h3>
                <p class="text-2xl font-bold dark:text-white">Total Investment: <span
                        class="text-teal-500 break-words">{{ totalInvestment.toLocaleString() }}</span></p>
                <p class="text-2xl font-bold dark:text-white"> Average Price Per Share: <span
                        class="text-teal-500 break-words">{{ averagePrice.toLocaleString() }}</span> </p>
            </div>
            <div class="mt-6 flex justify-between">
                <button @click="clearFields"
                    class="bg-gray-500 font-bold text-white px-4 py-2 rounded hover:bg-gray-600">
                    Clear
                </button>
                <button @click="manualCalculate"
                    class="bg-emerald-600 font-bold text-white px-4 py-2 rounded hover:bg-emerald-800">
                    Calculate Average
                </button>
            </div>
        </div>
        <div class="max-w-2xl dark:bg-gray-800 bg-white p-6 rounded-lg ring shadow-xl ring-gray-900/5 h-[100%]">
        </div>
    </div>
    <div class="mt-4 bg-white dark:bg-gray-800 dark:text-white rounded-lg ring shadow-xl ring-gray-900/5 p-6">
        <h2 class="text-2xl text-emerald-600 dark:text-emerald-400 font-bold mb-4">Stock Average Calculator</h2>
        <p class="mb-4">
            A <strong>Stock Average Calculator</strong> is a tool that helps investors determine the average price
            of their stock holdings.
            This is particularly useful when you have purchased the same stock at different prices and want to know
            the overall average cost per share.
        </p>

        <h2 class="text-2xl text-emerald-600 dark:text-emerald-400 font-semibold mt-6">How It Works</h2>
        <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Input Your Trades</strong>: Enter the number of shares purchased and the price paid for each
                trade.</li>
            <li><strong>Calculate</strong>: The calculator will compute the total cost of all shares and divide it
                by the total number of shares to give you the average price per share.</li>
            <li><strong>Analyze</strong>: Use the average price to compare with the current market price and assess
                your profit or loss.</li>
        </ol>

        <h2 class="text-2xl text-emerald-600 dark:text-emerald-400 font-semibold mt-6">Formula</h2>
        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <p>The average price per share is calculated using the following formula:</p>
            <p class="font-bold">Average Price = Total Cost of All Shares / Total Number of Shares</p>
            <ul class="list-disc pl-6">
                <li><strong>Total Cost of All Shares</strong> = (Shares₁ × Price₁) + (Shares₂ × Price₂) + ... +
                    (Sharesₙ × Priceₙ)</li>
                <li><strong>Total Number of Shares</strong> = Shares₁ + Shares₂ + ... + Sharesₙ</li>
            </ul>
        </div>

        <h2 class="text-2xl text-emerald-600 dark:text-emerald-400 font-semibold mt-6">Example</h2>
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <p>Suppose you bought shares of a company in three separate transactions:</p>
            <ol class="list-decimal pl-6 space-y-2">
                <li><strong>First Purchase</strong>: 100 shares at $50 per share</li>
                <li><strong>Second Purchase</strong>: 150 shares at $45 per share</li>
                <li><strong>Third Purchase</strong>: 200 shares at $55 per share</li>
            </ol>
            <p class="mt-2"><strong>Total Cost</strong> = $22,750</p>
            <p><strong>Total Shares</strong> = 450 shares</p>
            <p><strong>Average Price</strong> = $50.56 per share</p>
        </div>

        <h2 class="text-2xl text-emerald-600 dark:text-emerald-400 font-semibold mt-6">About Us</h2>
        <p class="mb-4">At <strong>Stock Average Calculator</strong>, we aim to provide investors with simple and
            effective tools to manage their investments.</p>

        <h3 class="text-xl font-semibold mt-4">Why Use Our Calculator?</h3>
        <ul class="list-disc pl-6 space-y-2">
            <li><strong>Accuracy</strong>: Get precise calculations to help you make better investment decisions.
            </li>
            <li><strong>Ease of Use</strong>: Simple and intuitive interface for quick calculations.</li>
            <li><strong>Free</strong>: Our tool is completely free to use, with no hidden fees or subscriptions.
            </li>
        </ul>

        <!-- <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-500/30 rounded">
            <h2 class="text-2xl text-emerald-600 dark:text-emerald-400 font-semibold">Contact Us</h2>
            <p>If you have any questions, feedback, or need assistance, feel free to reach out to us at
                <a href="mailto:support@stockaveragecalculator.com"
                    class="text-blue-600 underline">support@stockaveragecalculator.com</a>.
            </p>
        </div> -->

        <div class="mt-6 p-4 border border-sky-500 bg-sky-100 dark:bg-sky-900 dark:border-sky-400 rounded-md">
            <p><strong>Disclaimer</strong>: The Stock Average Calculator is for informational purposes only and
                should not be considered financial advice.
                Always consult with a financial advisor or conduct your own research before making investment
                decisions.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StockAverageCalculator',
    metaInfo: {
        title: 'Stock Average Calculator',
        meta: [
            { name: 'description', content: 'Calculate the average price of your stock investments with our Stock Average Calculator.' },
            { name: 'keywords', content: 'stock average calculator, average stock price calculator, stock calculator' }
        ]
    },
    data() {
        return {
            quantity1: null,
            price1: null,
            quantity2: null,
            price2: null,
            averagePrice: null,
            firstInvestment: null,
            secondInvestment: null,
            totalQuantity: null,
            totalInvestment: 0,
            showResults: false,
        };
    },
    computed: {
        isCalculationValid() {
            return this.quantity1 > 0 && this.price1 > 0 && this.quantity2 > 0 && this.price2 > 0;
        }
    },
    watch: {
        quantity1: "autoCalculate",
        price1: "autoCalculate",
        quantity2: "autoCalculate",
        price2: "autoCalculate",
    },
    methods: {
        autoCalculate() {
            if (this.isCalculationValid) {
                this.calculate();
            }
        },
        manualCalculate() {
            if (this.isCalculationValid) {
                this.calculate();
            } else {
                this.showResults = false;
            }
        },
        calculate() {
            this.firstInvestment = (this.quantity1 || 0) * (this.price1 || 0);
            this.secondInvestment = (this.quantity2 || 0) * (this.price2 || 0);
            this.totalInvestment = this.quantity1 * this.price1 + this.quantity2 * this.price2;
            this.averagePrice = this.totalInvestment / (this.quantity1 + this.quantity2);
            this.showResults = true;
        },
        clearFields() {
            this.quantity1 = null;
            this.price1 = null;
            this.quantity2 = null;
            this.price2 = null;
            this.averagePrice = 0;
            this.firstInvestment = null;
            this.secondInvestment = null;
            this.totalInvestment = 0;
            this.showResults = false;
        }
    }
}
</script>

<style></style>
