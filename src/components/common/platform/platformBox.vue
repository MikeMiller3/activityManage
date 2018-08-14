<template>
	<div class="platformTab">
		<dl v-for="c in categoryList">
			<dt>{{c.key}}</dt>
			<dd><a href="javascript:void(0);" v-for="p in c.values" :key="p.id"
				   @click="choosedPlatform(p,$event)">{{p.name}}</a></dd>
		</dl>
	</div>

</template>
<script>
	/**
	 * @event choosedPlatform 选中省份
	 */
	export default {
		props: {
			categoryList: {//省份分类列表
				type: Array,
				required: true,
				default: []
			}
		},
		data: function () {
			return {
				curPlatform: {}
			}
		},
		methods: {
			choosedPlatform: function (p, event) {
				this.curPlatform = p;
				this.$emit('choosedPlatform', p);
			}
		},
		computed: {},
		components: {},
		created: function () {

		}
	}
</script>
<style type="text/css" scope>


	.platformTab {
		width: 380px;
		border: 1px solid #B3CDC0;
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
		font: 12px/1.5 tahoma, arial, \5b8b\4f53;

		text-align: left;
	}

	.platformTab dl {
		margin: 0;
		padding: 0 0 0 10px;
		overflow: hidden;
	}

	.platformTab dl dt {
		float: left;
		padding-left: 3px;
		color: #3a8fc8;
		text-indent: 5px;
		line-height: 25px;
		font-size: 14px;
		width: 20px;
	}

	.platformTab dl dd {
		margin-left: 2px;
		float: left;
		width: 326px;
	}

	.platformTab dl dd a {
		padding-left: 5px;
		min-width: 66px;
		line-height: 25px;
		display: inline-block;
		color: #333;
		text-decoration: none;
	}

</style>
