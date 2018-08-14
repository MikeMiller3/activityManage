<template>
	<div>
		<div class="clearfix el-border-master border-bottom">
			<p class="scene-title el-c-info m-l-15">模板参数管理</p>
		</div>

		<div class="table-data">
			<el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column
					prop="id"
					label="编号"
					width="180">
				</el-table-column>
				<el-table-column
					prop="name"
					label="参数名称">
				</el-table-column>
				<el-table-column
					prop="type"
					label="参数类型"
					width="230">
				</el-table-column>

			</el-table>
		</div>



	</div>
</template>

<script>

	export default {
		data() {
			return {
				tableData: [{
					id: 1,
					name: '同一手机24小时接收次数',
					type: '信息安全'
				},{
					id: 2,
					name: '24小时发送人数上限',
					type: '信息安全'
				},{
					id: 3,
					name: '同一手机24小时相同内容发送次数',
					type: '信息安全'
				},{
					id: 4,
					name: '同一手机24小时接收次数',
					type: '信息安全'
				},{
					id: 5,
					name: '同一手机发送间隔',
					type: '信息安全'
				}]
			}
		},

		methods: {
			search(cb) {
				this.$http.post('/param/list', {})
					.then(res => cb && cb(res.data))
					.catch(err => console.log(err))
			}
		},
		mounted() {
//			this.search(data => { this.tableData = data.list || [] })
		},
		computed: {},
		components: {},
		created() {

		}
	}
</script>
<style scoped>

	.table-data{
		padding:20px;
	}

	.border-bottom {
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}


</style>
