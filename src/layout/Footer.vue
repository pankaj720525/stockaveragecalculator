
<script>
const appName = import.meta.env.VITE_APP_NAME;  // ✅ CORRECT
const currentYear = new Date().getFullYear();

export default {
    data() {
        return {
            appName,
            currentYear
        };
    }
}
</script>

<template lang="">
    <div class="w-full h-[50px] bg-gray-200 dark:bg-gray-900 flex justify-center items-center border-t">
        <span class="text-gray-600 dark:text-gray-400 text-sm">© {{ currentYear }} {{ appName }} - All Rights Reserved</span>
    </div>
</template>

<style lang="">
    
</style>