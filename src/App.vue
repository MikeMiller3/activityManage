<template>
	<div class="page">

		<com-header></com-header>

		<left-menu :menuList="menuList" @toggle="toggleSubMenu"
		></left-menu>

		<div class="container">
			<div class="main el-border-master">
				<keep-alive v-if="$route.meta.keepAlive">
					<router-view></router-view>
				</keep-alive>
				<router-view v-else></router-view>
			</div>
		</div>

	</div>
</template>

<script>
	import ComHeader from './components/common/ComHeader'
	import LeftMenu from './components/common/LeftMenu'
	import {MENU_LIST} from '@/assets/js/menu.js'

	export default {
		name: 'app',
		created() {
			// 初始化头部
//             window._initHeader()
			// 初始化面包屑
//             this.initBreadCrumb(this.$route.meta.menuId)
		},
		data() {
			return {
				menuList: MENU_LIST
			}
		},
		components: {
			ComHeader,
			LeftMenu
		},
		methods: {
			// 更新菜单列表，显示/隐藏子菜单
			toggleSubMenu(payload) {
				let mList = this.menuList
				for (let item of mList) {
					if (item.id === payload.id) {
						item.isChildrenHide = !item.isChildrenHide || false
					}
				}
				this.menuList = [...mList]
			}
		}
	}
</script>

<style>
</style>
