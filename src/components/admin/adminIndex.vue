<template>
	<el-container>
		<el-header style="padding: 0">
			<div class="header-container">
				<div class="header-logo-box">
					<header-logo></header-logo>
				</div>
				<div class="header-login-box">
					<header-user-info></header-user-info>
				</div>
			</div>
		</el-header>
		<el-container style="height: 600px;">
			<el-aside width="200px">
        <admin-menu></admin-menu>
      </el-aside>
			<el-main>
        <router-view/>
      </el-main>
		</el-container>
	</el-container>
</template>

<script>
	import adminMenu from "./adminMenu.vue";
	import headerLogo from "../headerLogo.vue";
	import headerUserInfo from "../headerUserInfo.vue";

	export default {
		name: "adminIndex",
		components: { adminMenu, headerLogo, headerUserInfo },
	};
</script>

<style>
	.header-container {
		height: 60px;
		width: 100%;
		background-color: #f8f8f8;
		position: fixed;
		/* opacity: 0.85; */
		z-index: 2;
	}

	.header-logo-box {
		float: left;
		width: 200px;
		height: 60px;
		background: #fff;
		z-index: 2;
	}

	.header-login-box {
		float: right;
		margin-right: 40px;
		height: 60px;
		z-index: 2;
	}
</style>