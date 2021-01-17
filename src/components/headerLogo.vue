<template>
	<div class="header-logo-container">
		<img
			src="../assets/icons/logo.png"
			@click="$router.push({ path: '/home/page' })"
			style="cursor: pointer"
			alt="errorIcon"
			slot="reference"
		/>
	</div>
</template>

<script>
	export default {
		name: "headerLogo",
		data() {
			return {};
		},
		methods: {},
	};
</script>

<style lang="less" scoped>
	.header-logo-container {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		justify-content: center;
	}
</style>