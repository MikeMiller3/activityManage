<template>


	<div class="page-header el-border-master">
		<div class="sys-process-bar el-bg-primary"></div>

		<div class="logo-box el-border-master">
			<img src="http://res.t.ums86.com/6admin/img/com/ibss-log.png" alt="" class="logo-image">
			<h1>运营服务平台</h1>
		</div>

		<div class="header-right-wrap">
			<div class="pull-left">
				<h2></h2>
			</div>
			<div class="pull-right">
				<el-dropdown class="user-info-box" trigger="click">
                      <span class="el-dropdown-link">
                        volcano <i class="el-icon-caret-bottom el-icon-setting m-l-10"></i>
                      </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'comHeader',
		components: {},
		data() {
			return {}
		}
	}
</script>

<style>

</style>
