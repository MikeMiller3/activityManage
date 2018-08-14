<template>
	<div>
		<div class="clearfix el-border-master border-bottom">
			<p class="scene-title el-c-info m-l-15">参数配置</p>
			<p class="scene-title scene-tip m-l-20 el-c-master-light">为不同场景下短信模板使用配置参数设置</p>
		</div>
		<div class="clearfix el-border-master border-bottom">
			<p class="scene-title el-c-info m-l-45">场景分类</p>
			<p class="scene-title scene-tip m-l-20 el-c-master blod">{{name}}</p>
		</div>
		<div class="clearfix el-border-master border-bottom">
			<p class="scene-title el-c-info m-l-45">参数配置
				<el-button class="m-l-10" type="primary" @click="paramsDialogVisible = true">选择参数</el-button>
			</p>
		</div>
		<div class="table-title el-bg-master text-center el-c-master-light  el-border-master border-bottom">
			<div class="table-title-part-title">参数项</div>
			<div class="table-title-part">默认值</div>
			<div class="table-title-part">允许范围</div>
			<div class="table-title-part">是否前台用户可见</div>
			<div class="table-title-part">是否前台用户可配</div>
		</div>
		<div class="table-body  el-border-master border-bottom" v-for="item in returnData">
			<div class="table-body-part-title">
				<p>{{item.name}}&nbsp;&nbsp;（{{item.unit}}）</p>
			</div>
			<div class="table-body-part" v-if="item.valueType == 1">
				<el-input class="w-80 m-t-6" v-model="item.valueMin"></el-input>
			</div>
			<div class="table-body-part" v-if="item.valueType == 2">
				<el-input class="w-80 m-t-6" v-model="item.valueMin"></el-input>
				-
				<el-input class="w-80 m-t-6" v-model="item.valueMax"></el-input>
			</div>
			<div class="table-body-part" v-if="item.valueType == 3">
				<el-date-picker
					v-model="item.valueMin"
					type="date"
					class="m-t-6 w-200"
					placeholder="选择日期时间">
				</el-date-picker>
			</div>
			<div class="table-body-part" v-if="item.valueType == 4">
				<el-date-picker
					v-model="item.time"
					type="daterange"
					class="m-t-6 w-200"
					placeholder="选择日期区间">
				</el-date-picker>
			</div>
			<div class="table-body-part" v-if="item.valueType == 5">
				<el-checkbox class="m-t-10" value="item.valueMin" v-model="item.valueMin"></el-checkbox>
			</div>
			<div class="table-body-part" v-if="item.valueType == 6">
				<el-time-select
					class="w-80 m-t-5"
					placeholder="起始时间"
					v-model="item.valueMin"
					:picker-options="{
                      start: '00:00',
                      step: '01:00',
                      end: '23:00'
                    }">
				</el-time-select>
			</div>
			<div class="table-body-part" v-if="item.valueType == 7">
				<div class="m-t-5">
					<el-time-select
						class="w-80"
						placeholder="起始时间"
						v-model="item.valueMin"
						:picker-options="{
                      start: '00:00',
                      step: '01:00',
                      end: '23:00'
                    }">
					</el-time-select>
					-
					<el-time-select
						class="w-80"
						placeholder="结束时间"
						v-model="item.valueMax"
						:picker-options="{
                      start: '00:00',
                      step: '01:00',
                      end: '23:00',
                      minTime: item.valueMin
                    }">
					</el-time-select>
				</div>
			</div>
			<div class="table-body-part">
				<div>
					<el-input class="w-60 m-t-6" v-model="item.min"></el-input>
					-
					<el-input class="w-60 m-t-6" v-model="item.max"></el-input>
				</div>
			</div>
			<div class="table-body-part">
				<div>
					<el-checkbox class="m-t-10" v-model="item.config"></el-checkbox>
				</div>
			</div>
			<div class="table-body-part">
				<div>
					<el-checkbox class="m-t-10" v-model="item.config"></el-checkbox>
				</div>
			</div>
		</div>
		<div class="table-foot">
			<el-button type="primary" @click="save">保存</el-button>
			<el-button @click="this.history.back(-1)">取消</el-button>
		</div>

		<el-dialog title="添加参数" :visible.sync="paramsDialogVisible">
			<el-table :data="paramsDataList">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column property="name" label="参数名称" width="200"></el-table-column>
				<el-table-column property="desc" label="参数描述"></el-table-column>
			</el-table>
			<div style="text-align: right;" class="m-t-10">
				<el-pagination
					layout="prev, pager, next"
					:total="1000">
				</el-pagination>
			</div>

			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button @click="paramsDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="paramsDialogVisible = false">确 定</el-button>
			</div>

		</el-dialog>

	</div>
</template>

<script>
	import Vue from 'vue'
	import {MessageBox, DatePicker} from 'element-ui'
	import {DateUtil} from 'flag-bsutils'
	import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";

	Vue.use(DatePicker)
	export default {
		data() {
			return {
				value: '1',
				checked1: false,
				input: '',
				returnData: [],
				categoryId: '',
				name: '',

				paramsDialogVisible: false,
				paramsDataList: [
					{id: 0, name: '同一手机24小时送条数', desc: '同一手机24小时送条数同一手机24小时送条数同一手机24小时送条数'},
					{id: 1, name: '24小时发送人数上限', desc: '24小时发送人数上限'},
					{id: 2, name: '同一手机24小时相同内容发送次数', desc: '同一手机24小时同一内容发送次数'},
					{id: 3, name: '同一手机发送间隔', desc: '同一手机多次发送的时间间隔'}
				]
			}
		},
		beforeRouteEnter(to, from, next) {
			if (to.query.categoryId) {
				next(vm => {
					vm.categoryId = to.query.categoryId
					vm.name = to.query.name
				})
			}
			next()
		},
		methods: {
			save() {
				MessageBox.confirm('是否确认保存此配置?', '确认', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					var paramsData = this.returnData
					paramsData.forEach((item) => {
						if (item.valueType === 5) {
							item.valueMin = item.valueMin === false ? '0' : '1'
						}
						if (item.valueType === 4) {
							item.valueMin = item.time[0]
							item.valueMax = item.time[1]
						}
						item.config = item.config === false ? '0' : '1'
					})
					this.$http.post('/scene/params/update', {
						categoryId: this.categoryId,
						list: paramsData
					}).then(res => { // time
						this.$message({
							type: 'success',
							message: '保存成功'
						})
						this.$router.push({path: '/scene'})
					}).catch(res => {
						this.$message({
							type: 'error',
							message: '保存失败'
						})
						this.$router.push({path: '/scene'})
					})
				}).catch(() => {

				})
			}
		},
		mounted() {
			this.categoryId = this.$route.query.categoryId
			this.$http.post('/scene/params', {categoryId: this.categoryId}).then(res => { // time
				res.data.list.forEach((item) => {
					if (item.valueType === 5) {
						item.valueMin = item.valueMin !== 0
					}
					if (item.valueType === 4) {
						item.time = [DateUtil.formatDate(new Date(item.valueMin), 'yyyy-MM-dd'),
							DateUtil.formatDate(new Date(item.valueMax), 'yyyy-MM-dd')]
					}
					item.config = item.config !== '0'
				})
				this.returnData = res.data.list
			}).catch(res => {
			})
		},
		computed: {},
		components: {ElButton},
		created() {

		}
	}
</script>
<style scoped>
	.m-l-4 {
		margin-left: 3px;
	}

	.m-l-6 {
		margin-left: 6px;
	}

	.table-body-part-title p {
		margin: 13px 0;
	}

	.table-body-part-title {
		flex: 2;
	}

	.table-foot {
		height: 100px;
		text-align: center;
		padding-top: 40px;
	}

	.m-r-45 {
		margin-right: 45px !important;
	}

	.m-r-25 {
		margin-right: 25px !important;
	}

	.m-l-25 {
		margin-left: 25px !important;
	}

	.m-l-50 {
		margin-left: 50px !important;
	}

	.m-t-6 {
		margin-top: 6px;
	}

	.w-60 {
		width: 60px;
	}

	.table-body-part p {
		margin: 6px 0;
	}

	.table-body-part {
		flex: 1;
	}

	.table-body {
		display: flex;
		text-align: center;
		height: 45px;
		font-size: 12px;
	}

	.table-title-part-title {
		flex: 2;
		margin-top: 5px;
	}

	.table-title-part {
		flex: 1;
		margin-top: 5px;
	}

	.table-title {
		display: flex;
		height: 30px;
		font-size: 13px;
	}

	.blod {
		font-weight: bold;
	}

	.m-l-45 {
		margin-left: 45px;
	}

	.border-bottom {
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.scene-tip {
		font-size: 14px;
		margin-top: 18px;
	}

	.scene-title {
		float: left;

	}
</style>
