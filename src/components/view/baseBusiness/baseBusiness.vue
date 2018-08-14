<template>
	<div class="tabs-base-business">
		<el-tabs v-model="activeName" class="m-l-10">
			<el-tab-pane label="短信" name="first">
				<div class="tabs-title el-border-master">
					<p>发送属性</p>
					<el-button type="primary" class="pull-right m-t-10 m-r-20" @click="goSetting">企业个性话配置</el-button>
				</div>
				<div class="tabs-body">
					<el-checkbox class="m-t-10 m-l-4" v-model="checked">开启长短信</el-checkbox>
					<span class="tabs-span el-c-master-lighter">开启长短信后，短信发送字数高达1000字</span>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				checked: ''
			}
		},
		methods: {
			goSetting() {
				this.$router.push({path: '/individualization/setting'})
			}
		},
		computed: {},
		components: {},
		created() {

		}
	}
</script>
<style scoped>
	.tabs-span {
		font-size: 12px;
		margin-left: 20px;
	}

	.tabs-body {
		margin-left: 70px;
	}

	.tabs-title p {
		display: inline-block;
		margin-left: 50px;
	}

	.tabs-title {
		height: 55px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}
</style>
