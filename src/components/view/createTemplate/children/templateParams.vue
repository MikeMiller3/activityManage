<template>
    <div>
        <div class="template-div el-border-master">
            <div class="template-title el-border-master">
                <span>模板参数设置</span>
            </div>
            <div class="template-body text-center">
                <p class="el-c-master-lighter">手机通知类，默认限制10次，可自行修改，修改范围0-99</p>
                <p>同一手机号接收次数
                    <el-input class="w-100"></el-input>
                    次
                </p>
                <p>
                    发送时间区域
                    <el-select v-model="value" class="w-100 m-t-6">
                        <el-option label="gaga" value="1"></el-option>
                    </el-select>
                    <span> 至 </span>
                    <el-select v-model="value" class="w-100 m-t-6">
                        <el-option label="haha" value="1"></el-option>
                    </el-select>
                    (每日)
                </p>
                <p>24小时发送总人次上限
                    <el-input class="w-100"></el-input>
                    (每日)
                </p>
            </div>
            <div class="template-arrows el-border-master"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                value: ''
            }
        },
        methods: {},
        computed: {},
        components: {},
        created () {

        }
    }
</script>
<style scoped>
    .template-arrows {
        width: 10px;
        height: 10px;
        border-left-style: solid;
        border-left-width: 1px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        transform: rotate(45deg);
        background-color: #fff;
        position: absolute;
        top: 130px;
        left: -7px;
    }

    .template-body p:nth-child(2) {
        margin-right: 110px;
    }

    .template-body p:nth-child(3) {
        margin-left: 65px;
    }

    .template-body p:nth-child(4) {
        margin-right: 105px;
    }

    .template-body p {
        margin: 10px 0;
        font-size: 12px;
    }

    .template-title span {
        display: block;
        margin-top: 10px;
    }

    .template-title {
        height: 35px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        text-align: center;
        font-size: 18px;
    }

    .template-div {
        width: 450px;
        height: 240px;
        border-radius: 3px;
        border-width: 1px;
        border-style: solid;
        position: absolute;
        top: -120px;
        left: 540px;
    }
</style>
