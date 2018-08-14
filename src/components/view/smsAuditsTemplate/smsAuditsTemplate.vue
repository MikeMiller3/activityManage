<template>
	<div class="smsAuditsTemplate-cmp">
		<!--<div class="template-title-box el-border-master-light">
            <div class="template-com-title el-border-master m-l-30 clearfix el-c-master-lighter">
                <i class="iconfont icon-daishenhemoban template-icon-title"></i>
                <div class="template-title-right">
                    <span class="el-c-primary">12</span>
                    <p class="">待审核模板</p>
                </div>
            </div>
            <div class="template-com-title el-border-master m-l-30 clearfix el-c-master-lighter">
                <i class="iconfont icon-jiekoumoban template-icon-title"></i>
                <div class="template-title-right">
                    <span class="el-c-primary">25</span>
                    <p class="">接口模板</p>
                </div>
            </div>
            <div class="template-com-title el-border-master m-l-30 clearfix el-c-master-lighter">
                <i class="iconfont icon-pingtaimoban template-icon-title"></i>
                <div class="template-title-right">
                    <span class="el-c-primary">36</span>
                    <p class="">平台模板</p>
                </div>
            </div>
        </div>-->
		<!--操作-->
		<div class="clearfix border-bottom el-border-master-light">
			<p class="el-c-info m-l-15 font-14 pull-left">模板审核</p>
			<div class="pull-right m-t-10 m-r-20 m-b-7">
				<label class="font-12 el-form-item__label">模版来源</label>
				<el-select v-model="category" placeholder="请选择模版来源" class="m-r-10" @change="doSearch(1)">
					<el-option value="" label="全部"></el-option>
					<el-option :value="t.value" :label="t.label" v-for="t in $constant.TEMPLATE_CATEGORY"
							   :key="t.value"></el-option>
				</el-select>
				<div class="w-180 m-r-10 el-input">
					<input type="primary" class="el-input__inner" v-model="keyword"
						   @keyup.enter="doSearch(1)"
						   placeholder="请输入企业编号或模版ID"/>
				</div>
				<el-button type="primary" @click="doSearch(1)" :loading="loading" class="w-100">搜索</el-button>
			</div>
		</div>
		<div v-loading="loading">
			<!--列表-->
			<div class="template-table" v-for="el in templates" :key="el.id">
				<div>
					<div
						class="template-table-title el-bg-master el-c-master border-bottom el-border-master-light clearfix">
						<div class="template-table-part">
							<p class="m-l-20"><span class="el-c-master-light">模板ID：</span>{{el.id}}</p>
						</div>
						<div class="template-table-part">
							<p><span class="el-c-master-light">模板名称：</span>{{el.name}}</p>
						</div>
						<div class="template-table-part">
							<p><span class="el-c-master-light">企业编号：</span>{{el.spCode}}</p>
						</div>
						<div class="template-table-part">
							<p><span class="el-c-master-light">提交时间：</span>{{el.createTime}}</p>
						</div>
						<div class="template-table-part">
							<p><span class="el-c-master-light">来源：</span>{{$constant.TEMPLATE_USE_TYPE[el.useType]}}</p>
						</div>
						<div class="template-table-part">
							<p>
								<i class="iconfont icon-daishenhemoban template-table-icon el-c-warning font-18"></i>
								<span class="el-c-warning">待审核</span>
							</p>
						</div>
					</div>
					<div class="template-table-title border-bottom el-border-master-light clearfix">
						<div class="table-body-part2 clearfix">
                            <textarea readonly
									  class="el-border-master el-bg-master el-c-master-light">{{el.text}}</textarea>
						</div>
						<div class="table-body-part2">
							<div class="table-body-content">
								<span class="el-c-master-light font-15 el-c-primary">{{el.spName}}</span>
								<p>
									<span class="el-c-master-light">场景用途：</span>
									<span class="el-c-master m-l-10">{{el.categoryName}}</span>
								</p>
								<p>
									<span class="el-c-master-light">适用行业：</span>
									<span class="el-c-master m-l-10">{{el.industries}}</span>
								</p>
								<p>
									<span class="el-c-master-light">申请理由：</span>
									<span class="el-c-master m-l-10">
                                    {{el.applyReason}}
                                </span>
								</p>
							</div>
						</div>
						<div class="table-body-part1">
							<div class="table-body-right text-center">
								<el-button type="primary" size="small" class="w-80 m-l-5"
										   @click="toPass(el)">审核通过
								</el-button>
								<el-button type="default" size="small" class="w-80 m-l-5 m-t-10"
										   @click="toFail(el)">审核不通过
								</el-button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--分页-->
			<el-pagination
				class="pull-right"
				layout="prev, pager, next"
				:current-page.sync="curPage"
				@current-change="handlePageChange"
				:total="dataCount">
			</el-pagination>
		</div>
		<!--弹框-->
		<el-dialog title="模版审核" :visible.sync="dialogFormVisible">
			<div class="template-table-title">
				<div class="pop-left">
					模版内容：
				</div>
				<div class="pop-right">
					<el-input type="textarea" :rows="5" v-model="activeTpl.text"></el-input>
				</div>
			</div>
			<div class="template-table-title m-t-10">
				<div class="pop-left">
					企业编号：
				</div>
				<div class="pop-right">
					{{activeTpl.spCode}}
				</div>
			</div>
			<div class="template-table-title">
				<div class="pop-left">
					企业名称：
				</div>
				<div class="pop-right">
					{{activeTpl.spName}}
				</div>
			</div>
			<div class="template-table-title">
				<div class="pop-left">
					递交时间：
				</div>
				<div class="pop-right">
					{{activeTpl.createTime}}
				</div>
			</div>
			<div class="template-table-title">
				<div class="pop-left">
					场景用途：
				</div>
				<div class="pop-right">
					{{activeTpl.categoryName}}
				</div>
			</div>
			<div class="template-table-title">
				<div class="pop-left">
					适用行业：
				</div>
				<div class="pop-right">
					{{activeTpl.industries}}
				</div>
			</div>
			<div class="template-table-title">
				<div class="pop-left">
					申请理由：
				</div>
				<div class="pop-right">
					{{activeTpl.applyReason}}
				</div>
			</div>
			<div class="template-table-title" v-if="activeTpl.isFailOpt">
				<div class="pop-left">
					审核意见：
				</div>
				<div class="pop-right">
					<div class="el-textarea">
						<textarea
							style="margin: 0;width: 100%"
							type="textarea" rows="3" validateevent="true" class="el-textarea__inner"
							:value="activeTpl.remark"
							@input="changeRemark"
						>
						</textarea>
						<div style="color: #f56c6c" v-show="showErrorTip">请填写审核意见</div>
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="doAudit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {Button, Select, Option, Input} from 'element-ui'

	Vue.use(Button).use(Select).use(Option).use(Input)
	import {API_SERVER} from '../../../../config/selfConfig'

	export default {
		created() {
			this.doSearch(1)
		},
		data() {
			return {
				// 模版查询结果列表
				templates: [],
				// 总个数
				dataCount: 0,
				// 当前页
				curPage: 1,
				// 搜索条件-模版来源/类型:1平台2接口
				category: '',
				// 搜索条件-关键字
				keyword: '',
				// 是否加载
				loading: false,
				// 弹框可见
				dialogFormVisible: false,
				// 当前操作模版审核对象
				activeTpl: {isFailOpt: false},
				//
				showErrorTip: false
			}
		},
		computed: {
			// 搜索条件-企业编号
			// 关键字为6位
			spCode() {
				return this.keyword.length === 6 ? this.keyword.trim() : ''
			},
			// 搜索条件-模版ID
			// 关键字不是6位
			templateId() {
				return this.keyword.length !== 6 ? this.keyword.trim() : ''
			},
			// 查询参数
			params() {
				return {
					id: this.templateId,
					spCode: this.spCode,
					// 来源
					useType: this.category,
					pageInfo: {curPage: this.curPage, pageLimit: 10}
				}
			}
		},
		methods: {
			doSearch(page) {
				if (page && this.curPage !== page) {
					this.curPage = page
					return;
				}
				this.search()
			},
			// 查询
			search() {
				this.loading = true
				this.$http.post(API_SERVER + '/template/unaudited', this.params)
					.then((res) => {
						this.loading = false
						this.templates = res.data.list || []
						this.dataCount = res.data.dataCount || 0
					})
					.catch((err) => {
						console.log('短信模版查询：' + err)
						this.loading = false
					})
			},
			// 页面变化
			handlePageChange(curPage) {
				this.doSearch(curPage)
			},
			// 统计
			/* stat() {
                this.$http.post(API_SERVER + '/template/unaudited/summary', {})
                    .then((res)=> {

                    })
                    .catch((err)=> {

                    })
            }, */
			// 审核
			audit() {
				this.$http.post(API_SERVER + '/template/audit', {
					id: this.activeTpl.id,
					remark: this.activeTpl.remark || '',
					status: this.activeTpl.isFailOpt ? this.$constant.AUDIT_STATUS.FAIL : this.$constant.AUDIT_STATUS.PASS
				})
					.then((res) => {
						this.dialogFormVisible = false
						this.$message({
							type: 'success',
							message: res.data.returnMsg || '操作成功'
						})
						this.doSearch(1)
					})
					.catch((err) => {
						this.dialogFormVisible = false
						console.log('审核短信模版：' + err)
					})
			},
			// 通过模版
			toPass(obj) {
				this.dialogFormVisible = true
				obj.isFailOpt = false// 是否为'不通过'操作
				this.activeTpl = Object.assign({}, obj)
			},
			// 不通过模版
			toFail(obj) {
				this.dialogFormVisible = true
				obj.isFailOpt = true
				this.activeTpl = Object.assign({}, obj)
			},
			// 修改模版内容
			modify(cb) {
				this.$http.post(API_SERVER + '/template/text/update', {
					id: this.activeTpl.id,
					text: this.activeTpl.text
				}).then((res) => {
					cb && cb(res)
				}).catch((err) => {
					console.log('短信模版内容修改：' + err.returnMsg)
				})
			},
			// 审核（先修改）
			doAudit() {
				if (this.showErrorTip) {
					return;
				}
				this.modify(function () {
					this.audit()
				}.bind(this))
			},
			changeRemark(e) {
				this.activeTpl = {...this.activeTpl, remark: e.target.value}
			}
		},
		watch: {
			activeTpl: {
				deep: true,
				handler(val) {
					this.showErrorTip = val.isFailOpt && !val.remark
				}
			}
		}
	}
</script>
<style scoped>
	.table-body-right {
		margin: 45px auto 0;
		width: 150px;
	}

	.table-body-content p {
		line-height: 19px;
	}

	.table-body-content {
		width: 80%;
		margin-top: 20px;
		font-size: 12px;
	}

	textarea {
		resize: none;
		width: 80%;
		min-height: 100px;
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
		margin: 0 5px;
	}

	.template-table-title {
		display: flex;
	}

	.border-bottom {
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.m-b-7 {
		margin-bottom: 7px;
	}

	.pop-left {
		color: #888;
		font-size: 12px;
		margin-left: 100px;
		margin-bottom: 20px;
		flex: 1
	}

	.pop-right {
		margin-right: 50px;
		font-size: 12px;
		flex: 5
	}
</style>
