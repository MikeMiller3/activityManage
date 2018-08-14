<template>
	<div class="sms-temp-list">
		<div class="com-search-box el-border-master clearfix">
			<div class="art-icon el-bg-primary">
				<i class="fa fa-search"></i>
			</div>
			<div class="search-box-left el-border-master-light">
				<el-form :inline="true" label-width="80px" :model="params">
					<el-form-item label="模板编号">
						<el-input class="w-180" placeholder="请输入模板编号" v-model="params.id"
								  @keyup.native.13="search"></el-input>
					</el-form-item>
					<el-form-item label="模板名称">
						<el-input class="w-180" placeholder="请输入模板名称" v-model="params.name"
								  @keyup.native.13="search"></el-input>
					</el-form-item>
					<el-form-item label="模板类型">
						<el-select v-model="params.source" placeholder="请输入模板类型" class="w-180" @change="search">
							<el-option
								v-for="item in modalSource"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="模板来源">
						<el-select v-model="params.useType" class="w-180" @change="search">
							<el-option
								v-for="item in modalUsage"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="search-box-right">
				<el-button type="primary" @click="search" class="w-100">搜索</el-button>
			</div>
		</div>
		<div class="clearfix border-bottom el-border-master">
			<p class="el-c-primary pull-left font-12 m-b-15 m-l-20">短信模板列表</p>
			<div class="pull-right m-t-5 m-r-30">
				<el-button type="success" icon="plus" class="w-100" @click="createTemplate">新建模板</el-button>
				<el-button type="primary" class="w-100" @click="">导出</el-button>
			</div>
		</div>
		<div>
			<div v-for="item in tableData" :key="item.id">
				<div class="template-table-title el-bg-master el-c-master border-bottom el-border-master clearfix">
					<div class="template-table-part">
						<p class="m-l-20">模板ID:{{item.id}}</p>
					</div>
					<div class="template-table-part">
						<p>模板名称:{{item.name}}</p>
					</div>
					<div class="template-table-part">
						<p>添加时间:{{item.createTime}}</p>
					</div>
					<div class="template-table-part">
						<p><i class="iconfont icon-jiekoumoban template-table-icon"></i>
							{{item.useType == 1 ? '平台模板' : '接口模板'}}</p>
					</div>
					<div class="template-table-part text-center">
						<p>添加人:{{item.creator}}</p>
					</div>
				</div>
				<div class="template-table-title border-bottom el-border-master clearfix">
					<div class="table-body-part2 clearfix">
						<textarea class="el-c-master-light" readonly="readonly">{{item.text}}</textarea>
					</div>
					<div class="table-body-part2">
						<div class="table-body-content">
							<p>模板类型：<span class="el-c-master-light m-l-10">{{item.source == 0 ? '系统短信模板' : '企业短信模板'}}</span>
							</p>
							<p>场景用途：<span class="el-c-master-light m-l-10">{{item.categoryName}}</span></p>
							<p>适用行业：<span class="el-c-master-light m-l-10">{{item.industries}}</span></p>
						</div>
					</div>
					<div class="table-body-part1 text-center">
						<div class="table-body-right text-center">
							<!--<el-button type="primary" class="w-100 m-l-5" @click="updateTpl(item.id)">修改模板</el-button>-->
							<el-button type="primary" class="w-100 m-l-5 m-t-20" @click="deleteTpl(item.id)">删除模板
							</el-button>
						</div>
					</div>
				</div>
			</div>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="Number(params.pageInfo.curPage)"
				layout="prev, pager, next"
				:total="Number(total)"
				class="text-right  m-t-20 m-b-10"
			>
			</el-pagination>
		</div>
		<!-- 删除提示框-->
		<el-dialog
			title="确认"
			:visible.sync="dialogVisible"
			size="tiny">
			<img src="../../../assets/img/tip.png"/>
			<div class="dialog-content">
				<p class="tip">是否确认删除此模板</p>
				<p class="">删除后不影响原已经使用该模板发送的信息</p>
			</div>


			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleDialog()">确 定</el-button>
           </span>
		</el-dialog>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				params: {
					pageInfo: {
						curPage: '1',
						pageLimit: 10
					},
					name: '', // 模板名称
					source: '', // 模板类型 0 运营 1 企业
					useType: '', // 模板用途 1 平台 2 接口
					id: '' // 模板id
				},
				tableData: [],
				total: 0,
				dialogVisible: false,
				currentModalId: '',
				modalSource: [{value: '', label: '全部'}, {value: '0', label: '系统短信模板'}, {value: '1', label: '企业短信模板'}],
				modalUsage: [{value: '', label: '全部'},{value: '1', label: '平台模板'}, {value: '2', label: '接口模板'}]
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.params.pageInfo.curPage = String(val)
				this.getLists()
			},
			createTemplate() {
				this.$router.push({path: '/create/template'})
			},
			export() {
			},
			deleteTpl(param) {
				this.currentModalId = param
				this.dialogVisible = true
			},
			updateTpl(param) {
				this.$router.push({path: '/create/template', query: {paramId: param}})
			},
			handleDialog() {
				this.dialogVisible = false
				this.$http.post('/template/delete', {ids: this.currentModalId}).then(res => {
					this.getLists()
				}).catch(res => {
					this.$message.error('删除模板失败,请重试！')
				})
			},
			search() {
				this.params.pageInfo.curPage = '1'
				this.getLists()
			},
			getLists() {
				let tempData
				this.loading = true
				this.params.pageInfo.curPage = parseInt(this.params.pageInfo.curPage)
				this.$http.post('/template/templates', this.params).then(res => {
					this.loading = false
					tempData = res.data.list || []
					this.total = res.data.dataCount
					this.tableData = tempData
				}).catch(res => {
					this.loading = false
				})
			}
		},
		computed: {},
		components: {},
		created() {
			this.getLists()
		},
		mounted() {
		}
	}
</script>
<style scoped>
	.table-body-right {
		margin: 45px auto 0;
		width: 150px;
	}

	.table-body-content p {
		line-height: 20px;
	}

	.table-body-content {
		width: 85%;
		margin-top: 50px;
		font-size: 13px;
	}

	textarea {
		resize: none;
		width: 83%;
		height: 150px;
		border-radius: 5px;
		margin: 20px 0 15px 10px;
		font-size: 13px;
		line-height: 20px;
		padding: 5px 5px;
		margin-left: 20px;
	}

	.table-body-part2 {
		flex: 2;
	}

	.table-body-part1 {
		flex: 1;
	}

	.template-table-icon {
		font-size: 14px;
		vertical-align: middle;
	}

	.template-table-part p {
		font-size: 12px;
	}

	.template-table-part {
		flex: 1;
	}

	.template-table-title {
		display: flex;
	}

	.m-r-30 {
		margin-right: 30px;
	}

	.border-bottom {
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.tabs-title p {
		font-size: 12px;
		font-weight: bold;
		margin: 20px 0;
	}

	.el-form-item {
		margin-bottom: 10px;
	}


</style>
<style>
	.sms-temp-list .el-dialog__header {
		text-align: center;
		border-bottom: 1px solid #EFF1F1;
		padding-bottom: 20px;
	}

	.sms-temp-list .el-dialog__header span {
		color: #42a5f5;
	}

	.sms-temp-list img {
		margin-left: 10px;
		vertical-align: middle;
		margin-right: 15px;
	}

	.sms-temp-list .dialog-content p {
		margin: 0px;
		margin-bottom: 5px;
	}

	.sms-temp-list .dialog-content .tip {
		color: #006fbb;
	}

	.sms-temp-list .dialog-content {
		display: inline-block;
		vertical-align: middle;
	}

	.sms-temp-list .el-dialog__body {
		padding-bottom: 58px;
		border-bottom: 1px solid #EFF1F1;
	}

	.sms-temp-list .el-dialog__footer {
		text-align: center;
	}
</style>
