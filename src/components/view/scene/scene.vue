<template>
	<div>
		<div class="clearfix">
			<p class="scene-title el-c-info m-l-15">场景分类</p>
			<!-- <el-button type="primary" class="pull-right m-t-10 m-r-15">添加一级场景分类</el-button>-->
		</div>
		<div class="scene-table el-bg-master">
			<div class="scene-table-left m-t-5">
				<span>场景分类名称</span>
			</div>
			<div class="scene-table-right m-t-5">
				<span>操作</span>
			</div>
		</div>
		<el-collapse v-if="tableData.length > 0">
			<el-collapse-item class="list-con" v-for="item in tableData" :key="item.id">
				<template slot="title">
					<div class="table-title pull-right">
						<div class="scene-tables-left">
							<span class="table-title-left">{{item.name}}</span>
						</div>
						<div class="scene-tables-right" @click.stop>
							<!--<span class="el-c-primary" @click="dialogVisible = true">添加</span>-->
							<span class="el-c-primary" @click="updateName(item.id,item.name)">修改名称</span>
							<!--<span class="el-c-primary"  @click="del">删除</span>-->
							<span class="el-c-primary" @click="edit(item.id,item.name)">参数配置</span>
						</div>
					</div>
				</template>
				<div class="clearfix border-b" v-for="childrenItem in item.childrenList">
					<div class="table-title pull-right clearfix m-b-5 m-t-5">
						<div class="scene-tables-left">
							<span class="table-title-left m-l-60">{{childrenItem.name}}</span>
						</div>
						<div class="scene-tables-right">
							<span class="el-c-primary m-l-85" @click="updateName(childrenItem.id,childrenItem.name)">修改名称</span>
							<!--<span class="el-c-primary">删除</span>-->
							<span class="el-c-primary" @click="edit(childrenItem.id,childrenItem.name)">参数配置</span>
						</div>
					</div>
				</div>
			</el-collapse-item>
		</el-collapse>
		<div class="no-data el-border-master el-c-master-light" v-else>
			暂无数据
		</div>
		<el-dialog
			:visible.sync="dialogVisible"
			size="tiny">
			<template slot="title">
				<div class="text-center el-c-primary dialog-title">修改分类名称</div>
			</template>
			<div class="text-center">
				<el-input v-model="sceneData.name" placeholder="请输入场景分类"></el-input>
				<span :class="{'dialog-span':showTip,'el-c-danger': true}">场景分类已存在</span>
			</div>
			<div class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="update">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {MessageBox} from 'element-ui'

	export default {
		data() {
			return {
				dialogVisible: false, // 弹出框控制
				loading: false, // 请求loading
				tableData: {}, // 列表返回数据
				sceneData: {
					id: '',
					name: ''
				},
				showTip: true
			}
		},
		methods: {
			update() {
				this.$http.post('/scene/update-name', this.sceneData).then(res => {
					this.dialogVisible = false
					this.search()
				}).catch(res => {
					this.showTip = false
				})
			},
			updateName(id, name) {
				console.log(id + name)
				this.sceneData = {id: id, name: name}
				this.showTip = true
				this.dialogVisible = true
			},
			search() {
				this.loading = true
				this.$http.post('/scene/tree', this.params).then(res => {
					this.loading = false
					this.tableData = res.data.list
					this.tableData = this.tableData.concat([{id: "10003",name: "系统提醒",parentId: "0",sort: "3",status: "1"},
						{id: "10003",name: "公众服务",parentId: "0",sort: "3",status: "1"},
						{id: "10003",name: "公众告之",parentId: "0",sort: "3",status: "1"},
						{id: "10003",name: "会员服务",parentId: "0",sort: "3",status: "1"}])
				}).catch(res => {
				})
			},
			// 配置参数
			edit(id, name) {
				this.$router.push({path: '/params/config', query: {categoryId: id, name: name}})
			},
			del() {
				MessageBox.confirm('是否确认删除XXX分类？(删除此分类后，其所有模板将自动归到“其他”分类下)', '确认', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			}
		},
		computed: {},
		components: {},
		created() {
			this.search()
		}
	}
</script>
<style scoped>
	.no-data {
		text-align: center;
		padding-top: 50px;
		padding-bottom: 50px;
		border-width: 1px;
		border-style: solid;
	}

	.m-l-60 {
		margin-left: 60px;
	}

	.el-collapse-item__content div:nth-last-child(1) {
		border: none !important;
	}

	.dialog-span {
		display: none;
	}

	.dialog-footer {
		padding: 10px 20px 0;
		margin-bottom: -15px;
		text-align: center;
		box-sizing: border-box;
	}

	.dialog-title {
		font-weight: bold;
		width: 94%;
		display: inline-block;
	}

	.m-l-85 {
		margin-left: 85px;
	}

	.border-b {
		border-bottom: 1px solid #dcdcdc;
	}

	.table-title-left {

	}

	.scene-tables-right span {
		margin-right: 30px;
		cursor: pointer;
	}

	.table-title {
		width: 97%;
		display: flex;
		text-align: center;
	}

	.scene-tables-left {
		flex: 1;
		text-align: left;
		font-weight: bold;
	}

	.scene-tables-right {
		flex: 1;
	}

	.scene-table-left {
		flex: 1;
	}

	.scene-table-right {
		flex: 1;
	}

	.scene-table {
		display: flex;
		text-align: center;
		height: 30px;
		font-size: 12px;
	}

	.scene-title {
		float: left;
	}
</style>
