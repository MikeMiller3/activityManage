import Vue from 'vue'
import Router from 'vue-router'

// 组件懒加载，组件会被webpack打包多个js，当路由被访问的时候只加载相应组件js

// App
const App = resolve => require(['@/App'], resolve)

// 短信模板审核
const smsAuditsTemplate = resolve => require(['../components/view/smsAuditsTemplate/smsAuditsTemplate.vue'], resolve)
const groupFissionList = resolve => require(['../components/view/groupFissionList/groupFissionList.vue'], resolve)

// 模板审核记录
const auditsTemplateRecord = resolve => require(['../components/view/auditsTemplateRecord/auditsTemplateRecord.vue'], resolve)

// 短信模板列表
const smsTemplateList = resolve => require(['../components/view/smsTemplateList/smsTemplateList.vue'], resolve)

// 新建模板
const createTemplate = resolve => require(['../components/view/createTemplate/createTemplate.vue'], resolve)

// 行业分类
const industryCategory = resolve => require(['../components/view/industryCategory/industryCategory.vue'], resolve)

// 场景分类
const scene = resolve => require(['../components/view/scene/scene.vue'], resolve)

// 参数配置
const paramsConfig = resolve => require(['../components/view/paramsConfig/paramsConfig.vue'], resolve)

// 基础业务配置
const baseBusiness = resolve => require(['../components/view/baseBusiness/baseBusiness.vue'], resolve)

// 企业个性化配置
const individualizationSetting = resolve => require(['../components/view/individualizationSetting/individualizationSetting.vue'], resolve)
const paramsManage = resolve => require(['../components/view/paramsManage/paramsManage.vue'], resolve)

// 404
const notFound = resolve => require(['@/components/common/notFound.vue'], resolve)
Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: App,
			children: [
				{
					path: 'group-fission/list',
					component: groupFissionList,
					meta: {keepAlive: false, menuId: '011'}
				}
				// {
				// 	path: 'sms/audits/template',
				// 	component: smsAuditsTemplate,
				// 	meta: {keepAlive: false, menuId: '011'}
				// }, // 短信模板审核
				// {
				// 	path: 'audits/template/record',
				// 	component: auditsTemplateRecord,
				// 	meta: {keepAlive: false, menuId: '012'}
				// }, // 模板审核记录
				// {
				// 	path: 'sms/template/list',
				// 	component: smsTemplateList,
				// 	meta: {keepAlive: false, menuId: '013'}
				// }, // 短信模板列表
				// {
				// 	path: 'create/template',
				// 	component: createTemplate,
				// 	meta: {keepAlive: false}
				// }, // 新建模板
				// {
				// 	path: 'industry/category',
				// 	component: industryCategory,
				// 	meta: {keepAlive: false, menuId: '017'}
				// }, // 行业分类
				// {
				// 	path: 'scene',
				// 	component: scene,
				// 	meta: {keepAlive: false, menuId: '014'}
				// }, // 场景分类
				// {
				// 	path: 'params/config',
				// 	component: paramsConfig,
				// 	meta: {keepAlive: false}
				// }, // 参数配置
				// {
				// 	path: 'base/business',
				// 	component: baseBusiness,
				// 	meta: {keepAlive: false, menuId: '021'}
				// }, // 参数配置
				// {
				// 	path: 'individualization/setting',
				// 	component: individualizationSetting,
				// 	meta: {keepAlive: false, menuId: '021'}
				// }, // 基础业务参数配置
				// {
				// 	path: '/params-manage',
				// 	component: paramsManage,
				// 	meta: {keepAlive: false, menuId: '015'}
				// }
			]
		},
		{   // 404
			path: '*',
			component: notFound
		}
	]
})
