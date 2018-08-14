<template>
	<ul class="platformslide mCustomScrollbar" v-show="platformList && platformList.length>0">
		<li v-for="p in platformList" @click="choosed($event,p)"><b class="platformname">{{p.name}}</b><b
			class="platformspell">{{p.shortName}}</b></li>
	</ul>

</template>
<script>

	export default {
		props: {
			platformList: {
				type: Array,
				required: true,
				default: []
			}
		},
		data: function () {
			return {}
		},
		methods: {
			choosed: function (event, p) {
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
	.platformslide {
		width: 200px;
		list-style: none;
		margin: 0;
		padding: 0;
		border: 1px solid #B3CDC0;
		box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
		overflow: auto;
		max-height: 300px;
	}

	.platformslide li {
		list-style: none;
		overflow: hidden;
		height: 30px;
		padding: 0 10px;
		line-height: 30px;
	}

	.platformslide li:hover {
		background: #3a8fc8;
		color: #fff;
		cursor: pointer;
	}

	.platformslide li b {
		font-weight: normal;
	}

	.platformname {
		float: left;
	}

	.platformspell {
		float: right;
	}

</style>
