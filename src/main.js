// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import Axios from '@/assets/js/Axios'
import {CONSTANT} from '@/assets/js/CONSTANT'
import {
	Dialog, Form, FormItem, RadioGroup, Radio, Button, Popover, Dropdown,
	DropdownMenu, DropdownItem, DatePicker, TimeSelect, Select, Option, Input, Table,
	TableColumn, Pagination, Loading, Collapse, CollapseItem, Message, Checkbox, CheckboxGroup, Tabs, TabPane, Col
} from 'element-ui'

import '@/assets/css/theme/index.css'
import '@/assets/css/common.css'
import '@/assets/css/header.css'
import '@/assets/css/font-awesome.min.css'
import '@/assets/css/iconfont.css'
import Clickoutside from 'element-ui/src/utils/clickoutside'
window.Vue = Vue
Vue.use(Dialog).use(Form).use(FormItem).use(RadioGroup)
	.use(Radio).use(Button).use(Dropdown).use(DropdownMenu)
	.use(DropdownItem).use(DatePicker).use(TimeSelect).use(Popover).use(Select)
	.use(Option).use(Input).use(Table).use(TableColumn).use(Pagination)
	.use(Loading).use(Collapse).use(CollapseItem).use(Checkbox).use(Tabs).use(TabPane).use(CheckboxGroup).use(Col)
Vue.config.productionTip = false

Vue.prototype.$http = Axios

Vue.prototype.$message = Message

Vue.prototype.$constant = CONSTANT
Vue.directive('clickoutside', Clickoutside);
router.beforeEach((to, from, next) => {
	next()
})

/* eslint-disable no-new */
window.App = new Vue({
	el: '#app',
	router,
	store,
	components: {App}
})
