<template>
	<div>
		<div class="border-bottom temp-title">
			<p @click="this.history.back(-1) " class="p-l-20">新建短信模板</p>
		</div>
		<el-form :model="tplDetail" class="template-form position-r" label-position="right" :rules="rules"
				 ref="tplDetail" label-width="120px">
			<el-form-item label="短信模板类型：" prop="resource">
				<el-radio-group v-model="tplDetail.type" @change="sourceChange">
					<el-radio label="0">平台短信模板</el-radio>
					<el-radio label="1">企业短信模板</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="生效企业编号：" v-show="tplDetail.type==1" prop="spCodes">
				<el-input v-model="tplDetail.spCodes" class="w-435" placeholder="请输入生效企业编号，多个以逗号隔开"></el-input>
			</el-form-item>
			<el-form-item label="模板名称：" prop="name">
				<el-input v-model="tplDetail.name" class="w-435" placeholder="请输入模板名称，不超过30个字符"></el-input>
			</el-form-item>
			<div class="position-rel">
				<el-form-item label="适用行业：" prop="industries">
					<el-select v-model="tplDetail.industries" class="w-435 " placeholder="请选择行业">
						<el-option v-for="item in industryList" :label="item.name" :value="item.id"
								   :key="item.id"></el-option>
					</el-select>

				</el-form-item>
			</div>

			<el-form-item label="适用场景：" prop="categoryId">
				<el-select v-model="tplDetail.categoryId" class="w-435" placeholder="请选择场景" @change="selectCategory">
					<el-option v-for="item in categoryList" :label="item.name" :value="item.id"
							   :key="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="短信模板内容:" prop="text" class="yulan_item">
				<el-input type="textarea" class="w-435 p-t-5" :rows="6" v-model="tplDetail.text"
						  placeholder="例如：尊敬的{姓名}您本次验证码为{验证码}，十分钟内有效。"></el-input>
				<el-button type="primary" class="button-yulan" @click="viewModal">{{viewText}}</el-button>
			</el-form-item>
			<el-form-item label="申请理由：" prop="applyReason">
				<el-input type="textarea" class="w-435 p-t-5" :rows="6" v-model="tplDetail.applyReason"
						  placeholder="例如：为客户提交交易通知，为员工提供重要事项提醒"></el-input>
				<div class="temp-com-box el-c-master-light">
					（20-500字，请认真填写申请理由，将可能作为审核通过依据）
				</div>
			</el-form-item>
			<el-form-item label="">
				<div class="temp-com-box el-c-master-light m-t-10 ">
					<el-button type="default" class="w-150" @click="resetForm('tplDetail')">取消</el-button>
					<el-button type="primary" class="w-150" @click="submitForm('tplDetail')">提交审核</el-button>

				</div>
				<div class="temp-com-box el-c-master-light m-t-10 font-12 ">
					审核时间：周一至周日<span class="span-c">9：00-20：00</span>（法定节日顺延）;预计1-2个工作日内完成
				</div>
			</el-form-item>
			<el-form-item label="内容规范：">
				<div class="temp-com-box el-c-master-light w-435 p-t-5 ">
					1、不能发送<span class="span-c">营销、贷款、借款、中奖、抽奖、党政</span>及<span
					class="span-c">宗教推广类</span>垃圾短信造成骚扰，不支持<span
					class="span-c">金融、理财、房产</span>等内容的通知类短信和推广类短信。（验证码除外）<br>
					2、请严格按照模板要求的场景及配置参数发送短信<br>
					3、变量用<span class="span-c">{字段名称，字段长度}</span>或<span class="span-c">{字段长度}</span>表示，例如{姓名，3}或{3}表示变量字段（姓名）可以最大填写三个字<br>
					4、变量长度根据实际应用设置，不允许提供全部都是变量，或绝大部分都是变量的模板；
				</div>
			</el-form-item>
			<el-form-item label="计费规则：">
				<div class="temp-com-box el-c-master-light w-435 p-t-5 ">
					短信字数<span class="span-c"><=70</span>个字数，按照<span class="span-c">70</span>个字数一条短信计算；短信字数<span
					class="span-c">>70</span>个字数，即为长短信，按照<span class="span-c">67</span>个字数记为一条短信计算
				</div>
			</el-form-item>
			<div class="cj" v-show="paramLists.length>0 &&!viewFlag">
				<div class="cj_title">
					<span>模板参数设置</span>
				</div>
				<div class="cj_content"  v-if="paramLists.length">
					<div v-for=" (item , index) in paramLists " :key="item.key">
						<span>{{item.name}}({{item.min}}-{{item.max}})</span>
						<p class="m-t-5 m-b-5" v-if="item.valueType== 1 ">
							<input type="number" class="customize-input" v-model.number="item.valueMin"
								   @blur="validateScope(item.valueMin,item.min,item.max,item,index)">
							<span>({{item.unit}})</span>
						</p>
						<p class="m-t-5 m-b-5" v-if="item.valueType== 7 ">
							<el-time-select
								:placeholder="item.min"
								v-model="item.valueMin"
								class="w-100 m-r-10"
								:picker-options="{start: '00:00',step: '00:60',end: '23:00'}"
								@change="validateScopeSelect(item.valueMin,item.valueMax,item,index)">
							</el-time-select>
							至
							<el-time-select
								:placeholder="item.max"
								v-model="item.valueMax"
								class="w-100 m-l-10"
								:picker-options="{start: '00:00',step: '00:60',end: '23:00'}"
								@change="validateScopeSelect(item.valueMin,item.valueMax,item,index)">
							</el-time-select>
							<span>({{item.unit}})</span>
						</p>
						<div class="validate-param" v-show="item.showWarning">{{item.prompt}}</div>
					</div>
				</div>
			</div>
			<div class="preview_cc" v-show="viewFlag">
				<div class="phone-can">
					<div class="phone-pop" v-show="tplDetail.text && tplDetail.text.length >= 1">
						<p>
							{{tplDetail.text}}
						</p>
					</div>
				</div>

			</div>
		</el-form>
	</div>
</template>

<script>
	export default {
		data: function () {
			return {
				rules: {
					spCodes: [
						{required: false, message: '请输入生效企业编号', trigger: 'blur'}
					],
					name: [
						{required: true, message: '请输入模板名称', trigger: 'blur'},
						{max: 30, message: '长度超过30个字符', trigger: 'blur'}
					],
					categoryId: [
						{required: true, message: '请选择场景', trigger: 'change'}
					],
					industries: [
						{required: true, message: '请选择行业', trigger: 'change'}
					],
					text: [
						{required: true, message: '请输入短信内容', trigger: 'blur'}
					],
					applyReason: [
						{required: true, message: '请填写申请理由', trigger: 'blur'},
						{min: 20, max: 500, message: '字数长度不满足要求', trigger: 'blur'}
					]
				},
				viewFlag: false, // 标志位，显示手机，还是场景对应的模板参数
				viewText: '模板预览',
				industryList: [], // select 中的行业列表
				categoryList: [], // select 中的场景列表
				tplDetail: {
					industries: '',
					categoryId: '',
					source: '0',
					type: '0',
					text: '',
					name: '',
					applyReason: '',
					useType: '1'
				}, // 如果是修改，存储原数据
				tplId: 0, // 如果是修改的，会由上个页面传入模板id.
				flag: 0, // 用于场景ajax请求的标志位
				paramLists: []
			}
		},
		methods: {
			sourceChange() {
				if (this.tplDetail.type === '0') {
					this.rules.spCodes[0].required = false
				} else {
					this.rules.spCodes[0].required = true
				}
			},
			submitForm(formName) {
				let url
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.tplDetail.params = JSON.stringify(this.paramLists)
						this.loading = true
						url = this.tplId ? '/template/update' : '/template/add'
						this.$http.post(url, this.tplDetail).then(res => {
							this.loading = false
							if (res.data.returnCode === '499') {
								this.$message.error('添加失败，请检查模版内容格式是否正确');
							} else {
								this.$router.push({'path': '/sms/template/list'})
							}

						}).catch(res => {
							this.loading = false
							console.log(res)
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
				this.paramLists.length = 0
				this.flag = 0
				this.tplDetail.params = []
			},
			viewModal() {
				this.viewText = this.viewFlag ? '模板预览' : '取消预览'
				this.viewFlag = !this.viewFlag
			},
			validateScope(currentValue, minValue, maxValue, item, index) {
				currentValue = Number(currentValue)
				console.log(currentValue)
				if (window.isNaN(currentValue)) {
					item.showWarning = true
					item.prompt = '您的输入含有非法字符'
					this.paramLists.splice(index, 1, item) // 必须删掉再加上才能起作用
					return
				}
				if (!window.isNaN(currentValue) && currentValue % 1 !== 0) {
					item.showWarning = true
					item.prompt = '您的输入非整数'
					this.paramLists.splice(index, 1, item) // 必须删掉再加上才能起作用
					return
				}
				if (currentValue >= minValue && currentValue <= maxValue) {
					item.showWarning = false
				} else {
					item.showWarning = true
					item.prompt = '您的输入不在' + minValue + '-' + maxValue + '之间'
				}
				this.paramLists.splice(index, 1, item) // 必须删掉再加上才能起作用
			},
			validateScopeSelect(minValue, maxValue, item, index) {
				if (!minValue || !maxValue) {
					item.showWarning = true;
					item.prompt = '时间不能为空';
				} else if (maxValue >= minValue) {
					item.showWarning = false;
				} else {
					item.showWarning = true;
					item.prompt = '结束时间大于开始时间';
				}
				this.paramLists.splice(index, 1, item); //必须删掉再加上才能起作用
			},
			validateSceneParamResult() {
				let i = 0
				for (; i < this.paramLists.length; i++) {
					if (this.paramLists[i].showWarning === true) {
						return false
					}
				}
				return true
			},
			getIndustry() {
				this.loading = true
				this.$http.post('/template/industry/list', {}).then(res => {
					this.loading = false
					this.industryList = res.data.list || []
				}).catch(res => {
					this.loading = false
					console.log(res)
				})
			},
			getCategory() {
				this.loading = true
				this.$http.get('/template/category/list').then(res => {
					this.loading = false
					this.categoryList = res.data.list || []
				}).catch(res => {
					this.loading = false
					console.log(res)
				})
			},
			selectCategory() {
				// 如果是修改操作，给select列表赋值时候，会触发次方法，此时会修改flag值。
				// 如果是新增操作，232行进行了flag值的修改。
				if (this.flag === 0) {
					this.flag++
					return
				}
				this.paramLists = [];
				this.loading = true
				this.$http.post('/scene/params', {categoryId: this.tplDetail.categoryId}).then(res => {
					this.loading = false
					this.paramLists = res.data.list
				}).catch(res => {
					this.loading = false
					console.log(res)
				})
			}
		},
		mounted() {
			if (this.tplId) {
				// 上一步执行了模板修改操作
				this.$http.post('/template/get', {id: this.tplId}).then(res => {
					this.loading = false
					this.tplDetail = res.data
					this.paramLists = res.data.params // 场景对应的模板参数
				}).catch(res => {
					this.loading = false
					console.log(res)
				})
			} else {
				this.flag++
			}
		},
		created() {
			this.tplId = this.$route.query.paramId
			this.getIndustry()
			this.getCategory()
		}
	}
</script>
<style scoped>
	.temp-title {
		color: #006fbb;
	}

	.border-bottom {
		border-bottom: 1px solid #ededed;
	}

	.w-400 {
		width: 400px;
	}

	.position-rel {
		position: relative;
	}

	.m-l-140 {
		margin-left: 140px;
	}

	textarea {
		display: block;
		resize: none;
		width: 368px;
		height: 150px;
		/* border-radius: 5px;*/
		font-size: 13px;
		line-height: 20px;
		padding: 5px 5px;
	}

	.w-435 {
		width: 435px;
	}
	.customize-input {
		width: 200px;
		height: 32px;
		border: 1px solid #dcdcdc;
		box-sizing: border-box;
		padding-left: 10px;
		font-size:12px;
	}
	.w-425 {
		width: 425px;
	}

	.template-form {
		margin-left: 50px;
		margin-top: 20px;
	}

	.yulan_item {
		position: relative;
	}

	.button-yulan {
		position: absolute;
		left: 345px;
		bottom: 4px;
	}

	.temp-com-box {
		font-size: 14px;
		line-height: 24px;
	}

	.cj {
		width: 337px;
		position: absolute;
		top: 0px;
		right: 25px;
		border: 1px solid #DCDCDC;
		/*border-top: 38px solid #F5F5F5;*/
	}

	.cj_title {
		height: 28px;
		background-color: #F5F5F5;
		overflow: hidden;
		padding-left: 12px;
		padding-top: 10px;
		font-size: 14px;
		/*border-left:3px solid #F67A17;*/
	}

	.cj_title span {
		border-left: 3px solid #42a5f5;
		padding-left: 10px;

	}

	.cj_content {
		padding-left: 32px;
		padding-top: 20px;
		font-size: 14px;
		min-height: 375px;
	}

	.preview_cc {
		position: absolute;
		top: 0px;
		right: 25px;
		display: inline-block;
		width: 312px;
		height: 617px;
		background: url("../../../assets/img/phone.png") no-repeat;
	}

	.phone-pop {
		width: 235px;
		margin-left: 5px;
		margin-top: 10px;
		background: url("../../../assets/img/iphonePop.png") no-repeat;
		background-size: 100% 100%;
	}

	.phone-pop p {
		padding: 8px 5px 8px 17px;
		line-height: 1.5;
		font-size: 14px;
		min-height: 40px;
		word-break: break-all;
	}

	.phone-can {
		width: 255px;
		height: 440px;
		margin-top: 73px;
		margin-left: 29px;
		padding-top: 10px;
		/*overflow-y: auto;*/
	}

	.position-r {
		position: relative;
	}

	.validate-param {
		color: #42a5f5;
		font-size: 12px;
	}
</style>
