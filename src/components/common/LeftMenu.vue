<template>
	<div class="left-menu el-border-master">
		<!-- <ul >
             <li  class="active">
                 <a href="javascript:void(0)">
                     业务运营
                     <i class="v-icon fa fa-desktop"></i>
                     <span class="submenu-indicator"><i class="fa fa-angle-right"></i></span>
                 </a>
                         <ul class="submenu">
                             <li>
                                 <router-link to="/task-query">企业管理</router-link>
                             </li>
                             <li>
                                 <router-link to="/channel-list">通道管理</router-link>
                             </li>
                             <li>
                                 <router-link to="/detail-query">查询明细</router-link>
                             </li>
                             <li>
                                 <router-link to="/detail-list">明细查询</router-link>
                             </li>
                             <li>
                                 <router-link to="/call-statistics">调用统计</router-link>
                             </li>
                             <li>
                                 <router-link to="/data-analysis">数据分析</router-link>
                             </li>
                         </ul>

             </li>
         </ul>-->

		<ul v-for="item in menuList" :key="item.id">
			<li class="active">
				<template v-if="!item.children || item.children.length<=0">
					<span class="list-style-bar" :class="{'el-bg-primary': isRouterMatch(item.id)}"></span>
					<h3>
						<a href="javascript:;" @click="jump(item.link, item.id)" class="el-c-hover">
							{{item.name}}
							<!-- <i class="v-icon fa fa-desktop"></i>-->
							<!--<span class="submenu-indicator"><i class="fa fa-angle-right"></i></span>-->
						</a>
					</h3>
				</template>
				<template v-else>
					<a href="javascript:;" @click="toggleSubMenu(item.id)">
						{{item.name}}
						<!--<i class="v-icon fa fa-desktop"></i>-->
						<span class="submenu-indicator"><i class="fa "
														   :class="{'fa-angle-right': item.isChildrenHide,'fa-angle-down': !item.isChildrenHide}"></i></span>
					</a>
					<transition name="fade">
						<div v-show="!item.isChildrenHide">
							<ul class="submenu">
								<li @click="jump(sub.link, sub.id)" v-for="sub in item.children" :key="sub.id">
									<!--<span class="" :class="{'el-bg-primary': isRouterMatch(sub.id)}"></span>-->
									<a href="javascript:;" :class="{'a-hover': isRouterMatch(sub.id)}">{{sub.name}}</a>
								</li>
							</ul>
						</div>
					</transition>
				</template>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShow: true
			}
		},
		props: {
			// 菜单列表
			menuList: {
				type: Array,
				required: true
			}
		},
		methods: {
			// 是否匹配当前路由
			isRouterMatch(id) {
				return this.$route.meta.menuId === id
			},
			// 显示/隐藏子菜单
			toggleSubMenu(id) {
				this.$emit('toggle', {id: id})
				this.isShow = !this.isShow
			},
			// 跳转
			jump(link, id) {
				this.$router.push(link)
				this.$emit('initBreadCrumb', id)
			}
		}
	}
</script>

<style scoped>
	.a-hover {
		border-left-color: #42a5f5 !important;
		background-color: #fafcff !important;
	}
</style>
