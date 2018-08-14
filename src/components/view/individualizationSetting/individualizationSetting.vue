<template>
	<div class="tabs-base-business">
		<div class="com-search-box el-border-master clearfix">
			<div class="art-icon el-bg-primary">
				<i class="fa fa-search"></i>
			</div>
			<div class="search-box-left el-border-master-light">
				<el-form :inline="true" label-width="80px" :model="settingForm" onsubmit="return false;">
					<el-form-item label="企业编号">
						<el-input class="w-180" placeholder="请输入企业编号" @keyup.native.13="search"
								  v-model="settingForm.spCode"></el-input>
						<span :class="{valid: true,show: show}">必填</span>
					</el-form-item>
				</el-form>
			</div>
			<div class="search-box-right">
				<el-button type="primary" @click="search" class="w-100">搜索</el-button>
			</div>
		</div>
		<div class="setting-title el-c-master-light el-border-master" v-if="returnData != null">
			<p>企业编号：{{returnData.spInfo.spCode || '----'}}</p>
			<p>企业名称：{{returnData.spInfo.spName || '----'}}</p>
			<p>计费类型：{{returnData.spInfo.spFeeType || '----'}}</p>
			<p>账户状态：{{returnData.spInfo.spStatus || '----'}}</p>
		</div>
		<div>
			<el-tabs v-model="activeName">
				<el-tab-pane label="短信" name="first">
					<div class="tabs-title el-border-master">
						<p>发送属性</p>
					</div>
					<div class="tabs-body">
						<div v-for="item in configs">
							<el-checkbox class="m-t-10 m-l-4" v-model="item.flag">{{item.name}}</el-checkbox>
							<span class="tabs-span el-c-master-lighter">{{item.remark}}</span>
						</div>
					</div>
					<div class="text-center" v-if="returnData != null">
						<el-button type="primary" class="m-r-15" @click="save">保存</el-button>
						<el-button>取消</el-button>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				show: false,
				activeName: 'first',
				checked: '',
				settingForm: {
					spCode: ''
				},
				configs: [],
				returnData: null
			}
		},
		methods: {
			search() {
				if (this.settingForm.spCode === '') {
					this.show = true
					return false
				} else {
					this.show = false
				}
				this.$http.post('/switch/on', this.settingForm).then(res => {
					if (res.data.returnCode !== '200') {
						this.$message({
							type: 'error',
							message: res.data.returnMsg
						});
					}
					this.returnData = res.data
					res.data.opens.forEach((item) => {
						this.configs.forEach((itemObj) => {
							itemObj.flag = false
							if (item.switchId === itemObj.id) {
								itemObj.flag = true
							}
						})
					})
				}).catch(res => {
					this.returnData = {
						spInfo: {}
					}
					this.$message({
						type: 'error',
						message: res.data.returnMsg
					});
				})
			},
			save() {
				let ids = []
				let spId
				this.configs.forEach((item) => {
					if (item.flag) {
						ids.push(item.id)
					}
				})
				spId = this.returnData.spId
				this.$http.post('/switch/config', {ids: ids, spId: spId}).then(res => {

				}).catch(res => {

				})
			}
		},
		computed: {

		},
		components: {},
		created() {
			this.$http.post('/switchs', {bizType: '1'}).then(res => {
				res.data.list.forEach((item) => {
					item.flag = false
				})
				this.configs = res.data.list
			}).catch(res => {
				this.showTip = false
			})
		}
	}
</script>
<style scoped>
	.show {
		display: block!important;
	}
	.valid {
		color: red;
		position: absolute;
		top: 0;
		right: 10px;
		display: none;
	}
	.tabs-span {
		font-size: 12px;
		margin-left: 20px;
	}

	.tabs-body {
		margin-left: 70px;
		margin-bottom: 95px;
	}

	.tabs-title p {
		font-size: 12px;
		font-weight: bold;
		margin: 20px 0;
	}

	.tabs-title {
		border-bottom-width: 1px;
		border-bottom-style: solid;
		padding-left: 70px;
	}

	.setting-title p {
		display: inline-block;
		font-size: 12px;
		margin: 20px 55px 20px 0;
	}

	.setting-title {
		border-bottom-width: 1px;
		border-bottom-style: solid;
		padding-left: 30px;
	}
</style>
