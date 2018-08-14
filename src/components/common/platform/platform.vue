<template>
	<div class="platformSelector" v-clickoutside="handleClose">
		<div class="inputcontro">
			<el-input
				type="text"
				class="platformInput w-180"
				v-model="platformName"
				ref="platform"
				placeholder="请选择"
				@focus="platformFocus"
				@blur="platformBlur"
				@input="platformChange"
			></el-input>
			<div class="platformBox">
				<platformBox
					v-show="boxShow"
					:categoryList="platformCategoryList"
					@choosedPlatform="choosedPlatform"></platformBox>

				<platformSlide
					v-show="slideShow"
					:platformList="matchedList"
					@choosedPlatform="choosedPlatform"></platformSlide>
			</div>
		</div>
	</div>
</template>
<script>
	/**
	 * 组件参数如下：
	 * props:请看code
	 *
	 */
	import platformBox from './platformBox'
	import platformSlide from './platformSlide'

	export default {
		props: {
			value: {
				type: Object,
				default: {'p': {}, 'c': {}}
			},
			platformList: {
				type: Array,
				required: true,
				default: []
			},
			hasCity: {
				type: Boolean,
				default: true
			},
			hasCountry: {
				type: Boolean,
				default: true
			}
		},
		data: function () {
			return {
				countryData: {
					"id": "",
					"status": "1",
					"name": "全国",
					"shortName": "#qg",
					"regionId": "7",
					"code": "",
					"pinyin": "quanguo",
					"type": "1",
					"parentId": ""
				},
				boxShow: false,
				slideShow: false,
				platform: {},//选中的省份
				platformName: this.value.p.name,
				city: this.value.c,
				matchedList: [],
				matching: false
			}
		},
		methods: {
			//省份获取焦点
			platformFocus: function (event) {
				this.toggleBox(true);
				this.$emit('focus', event);
			},
			//省份失去焦点
			platformBlur: function (event) {
				this.$emit('blur', event);
			},
			//点击非box区域
			handleClose: function () {
				this.boxShow = false;
				this.slideShow = false;
			},
			//省份搜索
			platformChange: function () {
				if (this.matching) {
					return;
				}
				this.matching = true;
				setTimeout(() => {
					this.toggleBox();
					this.matching = false;
				}, 400);

			},
			//设置显示层
			toggleBox: function (showPop) {
				if (this.platformName && !showPop) {
					var list = this.platformList.filter((p) => {
						return p.shortName.indexOf(this.platformName) !== -1 || p.name.indexOf(this.platformName) !== -1;
					});
					this.$set(this, 'matchedList', list);
					this.slideShow = true;
					this.boxShow = false;
				} else {
					this.slideShow = false;
					this.boxShow = true;
					this.$set(this, 'matchedList', []);
				}

			},
			choosedPlatform: function (p) {
				this.boxShow = false;
				this.slideShow = false;
				this.platform = p;
				this.platformName = p.name;
				this.city = {};
				this.$emit('input', {'p': this.platform, 'c': this.city});
			},
			choosedCity: function (cid) {
				this.city = this.getCityById(cid);
				this.$emit('input', {'p': this.platform, 'c': this.city});
			},
			getCityById: function (id) {
				for (var i = 0; i < this.filtedCity.length; i++) {
					var c = this.filtedCity[i];
					if (c.id === id) {
						return c;
					}
				}
			}

		},
		computed: {
			platformCategoryList: function () {
				var list = [];
				var keyMap = {};
				var platform = {};

				this.platformList.forEach(function (p, i) {
					var pinyin = p['pinyin'] || p['shortName'];
					var key = pinyin.substring(0, 1).toUpperCase();
					if (typeof keyMap[key] !== 'undefined') {
						var index = keyMap[key];
						platform = list[index];
						platform.values.push(p);
					} else {
						platform = {key: key, values: [p]};
						keyMap[key] = list.push(platform) - 1;
					}
				});
				var resList = list.sort(function (first, second) {
					var f = first.key.charCodeAt();
					var s = second.key.charCodeAt();
					return f < s ? -1 : (f === s ? 0 : 1);
				});
				if (this.hasCountry) {
					if (resList.length > 0) {
						resList.splice(0, 0, {key: '#', values: [this.countryData]});
					} else {
						resList.push({key: '#', values: [this.countryData]});
					}
				}
				return resList;
			},
			filtedCity: function () {
				var cityList = this.cityList.filter((c) => {
					return this.platform.id === c.platform;
				});
				//cityList.push({code:'',id:'',name:'全部',pinyin:'',platform:''});
				return cityList;
			}
		},
		components: {
			platformBox, platformSlide
		},
		created: function () {

		}
	}
</script>
<style type="text/css" scope>

	.inputcontro {
		position: relative;
	}

	.platformInput {
		width: 80px;
	}

	.citysel {
		width: 80px;
	}

	.platformBox {
		position: absolute;
		z-index: 99999;
		top: 36px;
		background: #fff;
	}

</style>
