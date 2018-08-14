<template>
	<div class="tabs-base-business">
		<div class="com-search-box el-border-master clearfix">
			<div class="art-icon el-bg-primary">
				<i class="fa fa-search"></i>
			</div>
			<div class="search-box-left el-border-master-light">
				<el-form :inline="true" label-width="80px" :model="params">
					<el-form-item label="企业编号:">
						<el-input class="w-180" placeholder="请输入企业编号" v-model="params.spCode"
								  @keyup.13.native="search"></el-input>
					</el-form-item>
					<el-form-item label="省份：">
						<platform :platformList="platformList"   v-model="choosedPlatform" class="w-180"></platform>
					</el-form-item>
					<el-form-item label="企业名称:">
						<el-input class="w-180" placeholder="请输入企业名称" v-model="params.spName"
								  @keyup.13.native="search"></el-input>
					</el-form-item>
					<el-form-item label="审核人员:">
						<el-input class="w-180" placeholder="请输入审核人员" v-model="params.auditorName"
								  @keyup.13.native="search"></el-input>
					</el-form-item>
					<el-form-item label="审核结果:">
						<el-select v-model="params.status" placeholder="请选择审核结果" class="w-180" @change="search">
							<el-option
								v-for="item in auditResultOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="提交时间:">
						<el-date-picker
							class="w-180"
							:editable="false"
							v-model="dateRange"
							type="daterange"
							placeholder="选择日期范围"
							range-separator="/"
							:picker-options="datePickerOptions"
							@change="dateChange"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="模板编号:">
						<el-input class="w-180" placeholder="请输入模板编号" v-model="params.id"
								  @keyup.13.native="search"></el-input>
					</el-form-item>
					<el-form-item label="模板来源:">
						<el-select v-model="params.usage" class="w-180" @change="search">
							<el-option
								v-for="item in modalTypeOptions"
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
			<p class="el-c-primary pull-left font-12 m-b-15 m-l-20">模板审核</p>
		</div>
		<div>
			<div v-for="item in tableData">
				<div class="template-table-title el-bg-master el-c-master border-bottom el-border-master clearfix">
					<div class="template-table-part">
						<p class="m-l-20">模板ID:{{item.id}}</p>
					</div>
					<div class="template-table-part">
						<p>模板名称:{{item.name}}</p>
					</div>
					<div class="template-table-part">
						<p>提交时间:{{item.createTime}}</p>
					</div>
					<div class="template-table-part">
						<p class="text-center"><i class="iconfont icon-jiekoumoban template-table-icon"></i>{{item.useType === 1 ? '平台模版' : '接口模版'}}</p>
					</div>
					<div class="template-table-part ">
						<p>审核人员:{{item.auditor}}</p>
					</div>
				</div>
				<div class="template-table-title border-bottom el-border-master clearfix">
					<div class="table-body-part2 clearfix">
						<textarea class="el-c-master-light m-t-13" readonly="readonly">{{item.text}}</textarea>
					</div>
					<div class="table-body-part2">
						<div class="table-body-content">
							<!--<div class="table-title">-->
							<!--<p class="m-r-30">260003</p><p>上海帜迅信息技术有限公司</p>-->
							<!--</div>-->
							<p><span class="el-c-master-light">{{item.spName}}</span>({{item.spCode}})</p>
							<p>场景用途：<span class="el-c-master-light m-l-10">{{item.usage}}</span></p>
							<p>使用行业：<span class="el-c-master-light m-l-10">{{item.industries}}</span></p>
							<p>申请理由：<span class="el-c-master-light m-l-10">{{item.applyReason}}</span></p>
						</div>
					</div>
					<div class="table-body-part1 ">
						<div class="table-body-right ">
							<p>审核结果：
								<span class="el-c-white el-bg-success table-span m-l-10"
									  :class="{'el-bg-success': item.status==0,'el-bg-danger':item.status!=0}">
                                    {{AUDIT_ARRAY[item.status]}}
                                </span>
							</p>
							<div class="position-ab">
								<p class="position">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注：</p>
								<div class="m-r-20 el-c-master-light">
									{{item.remark}}
								</div>
							</div>

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
	</div>

</template>

<script>
	import {DateUtil} from 'flag-bsutils'
	import platform from 'flag-ui-platform'

	export default {
		data() {
			return {
				choosedPlatform: {p: {}},//省市
				activeName: 'first',
				checked: '',
				settingForm: {
					spCode: '',
					spName: '',
					saleName: ''
				},
				params: {
					auditorName: '', // 审核人员
					startTime: '',
					endTime: '',
					pageInfo: {
						curPage: '1',
						pageLimit: 10
					},
					platform: '', // 省份id
					spCode: '', // 企业编号
					spName: '', // 企业名称
					status: '', // 审核结果
					usage: '', // 模板类型
					id: '' // 模板id
				},
				tableData: [],
				platformList: [],
				dateRange: [],
				datePickerOptions: {
					disabledDate: (date) => {
						// var start = this.curDate.getTime() - (1000 * 60 * 60 * 24 * 30);
						// return date.getTime() < start || date.getTime() > this.curDate.getTime();
					}
				},
				auditResultOptions: [{value: '', label: '全部'}, {value: '0', label: '通过'}, {value: '2', label: '不通过'}],
				modalTypeOptions: [{value: '', label: '全部'}, {value: '1', label: '平台模板'}, {value: '2', label: '接口模板'}],
				AUDIT_ARRAY: {'0': '通过', '2': '未通过'},
				total: 0
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.params.pageInfo.curPage = String(val)
				this.getLists()
			},
			// 获取时间区间
			dateChange() {
				if (this.dateRange[0] == null) {
					this.params.startTime = DateUtil.formatDate(DateUtil.dateAdd('d', -6, new Date()), 'yyyy-MM-dd')
					this.params.endTime = DateUtil.formatDate(new Date(), 'yyyy-MM-dd')
					return
				}
				this.params.startTime = DateUtil.formatDate(this.dateRange[0], 'yyyy-MM-dd')
				this.params.endTime = DateUtil.formatDate(this.dateRange[1], 'yyyy-MM-dd')
			},
			search() {
				this.params.pageInfo.curPage = '1'
				this.getLists()
			},
			getProvinceInfo() {
				this.$http.get('/common/platform/get').then(res => {
					this.platformList = res.data.list
				}).catch(res => {
					console.log(res)
				})
			},
			getLists() {
				let tempData
				this.loading = true
				this.params.pageInfo.curPage = parseInt(this.params.pageInfo.curPage)
				this.$http.post('/template/audit/records', this.params).then(res => {
					this.loading = false
					tempData = res.data.list || []
					this.total = res.data.dataCount
					this.tableData = tempData
				}).catch(res => {
					this.loading = false
					console.log(res)
				})
			}
		},
		watch: {
			//获取省市
			choosedPlatform(newVal,oldVal) {
				this.params.platform = this.choosedPlatform['p']['id'];
			}
		},
		computed: {},
		components: {platform},
		created() {
			this.getProvinceInfo()
		},
		mounted() {
			this.dateRange = [DateUtil.dateAdd('d', -6, new Date()), new Date()]
			this.getLists()
		}
	}
</script>
<style scoped>
	.position-ab p {
		position: absolute;
		top: 0;
		left: 7px;
		margin-top: 0;
	}

	.position-ab {
		position: relative;
		padding-left: 75px;
	}

	.table-span {
		border-radius: 2px;
		padding: 3px 5px;
	}

	.table-title p {
		display: inline-block;
	}

	.template-table-name {
		font-size: 12px;
		margin-bottom: 0;
		margin-left: 20px;
	}

	.table-body-right {
		margin: 45px auto 0;
		/*width: 150px;*/
		font-size: 13px;
		/*margin-left:30px;*/
	}

	.table-body-content p {
		line-height: 20px;
	}

	.table-body-content {
		width: 85%;
		font-size: 13px;
	}

	textarea {
		resize: none;
		width: 83%;
		height: 130px;
		border-radius: 5px;
		margin: 10px 0 15px 10px;
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

	.m-l-30 {
		margin-left: 30px;
	}

	.m-t-13 {
		margin-top: 13px;
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
