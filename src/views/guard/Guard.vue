<template>
    <div class="guard">
        <div class="guard-title">门禁配置</div>
        <ul class="guard-nav">
            <li class="guard-list" v-for="(item, index) in guardList" :key="item.equipmentId" v-if="guardList.length">
                <p class="guard-list-equip-name">{{item.equipmentName}}</p>
                <div class="guard-list-time">
                    <i class="iconfont icon-shijian1 detail-iconfont"></i>
                    <span class="list-attr-status-detail">更新时间：{{item.updateTime}}</span>
                </div>
                <div class="guard-list-status">
                    <i class="iconfont icon-switch detail-iconfont"></i>
                    <span class="list-attr-status-detail">门禁开关：</span>
                    <el-select clearable v-model="item.routeEquipmentId" :disabled="!item.disabled" placeholder="关">
                        <el-option v-for="value in deviceList" :key="value.equipmentId" :label="value.equipmentName" :value="value.equipmentId"></el-option>
                    </el-select>
                    <span class="list-attr-status-test" v-if="item.disabled && item.routeEquipmentId" @click="testRoute(item)">测试</span>
                </div>
                <div class="guard-list-power">
                    <i class="iconfont icon-shijian1 detail-iconfont"></i>
                    <span class="list-attr-status-detail">门禁权限：<span :class="item.disabled ? 'active' : ''" @click="checkLimit(item, index)">{{item.updateTime}}</span></span>
                </div>
                <i class="iconfont icon-bianji-lan edit-iconfont" @click="editStatus(item, index)" v-if="!item.disabled"></i>
                <span class="status-edit-btn" @click="cancelEdit(item, index)" v-if="item.disabled">取消</span>
                <span class="status-submit-btn" v-if="item.disabled" @click="saveEdit(item, index)">保存</span>
            </li>
        </ul>
        <!-- 权限设置弹出框 -->
        <el-dialog title="访问权限设置" :visible.sync="dialogLimit">
            <LimitCheck :equipmentId="limitId" ref="limit-check" @closeLimit="closeLimit"></LimitCheck>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
            background
            layout="prev, pager, next"
            v-if="count > 9"
            :total="count"
            class="paging"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
            prev-text="上一页"
            next-text="下一页"
        ></el-pagination>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { mapGetters } from 'vuex';
import LimitCheck from '@/views/guard/LimitCheck';
export default {
    data () {
        return {
            guardList: [],
            deviceList: [], // 设备列表
            dialogLimit: false, // 权限设置dialog
            limitId: '',
            dialogRemove: false, // 删除dialog
            removeId: '',
            count: 0,
            currentPage: 1
        };
    },
    computed: {
     ...mapGetters([
       'user'
     ])
   },
   components: {
       LimitCheck
   },
    methods: {
        async responesAPI (data = {}) {
            const response = await api.post(config.guard.list, data);
            if (Number(response.data.code) === 200) {
                this.guardList = [...response.data.data.rows];
                this.count = response.data.data.total;
            }
        },
        // 编辑门禁
        editStatus (item, index) {
            this.$set(this.guardList, index, {...item, disabled: true});
            this.guardList[index].disabled = true;
        },
        // 取消编辑门禁
        cancelEdit (item, index) {
            delete (item.disabled);
            this.$set(this.guardList, index, {...item});
            this.responesAPI({offset: (this.currentPage - 1) * 10});
        },
        // 保存门禁
        async saveEdit (item, index) {
            const response = await api.post(config.guard.updateRoute, {equipmentId: item.equipmentId, routeEquipmentId: item.routeEquipmentId});
            if (Number(response.data.code) === 200) {
                delete (item.disabled);
                this.$set(this.guardList, index, {...item});
                this.$message({message: response.data.msg, type: 'success'});
                this.responesAPI({offset: (this.currentPage - 1) * 10});
            } else {
                this.$message({message: response.data.msg, type: 'error'});
            }
        },
        // 测试门禁
        async testRoute (item) {
            const response = await api.post(config.guard.testRoute, {equipmentId: item.equipmentId, routeEquipmentId: item.routeEquipmentId});
            if (Number(response.data.code) === 200) {
                this.$message({message: response.data.msg, type: 'success'});
            } else {
                this.$message({message: response.data.msg, type: 'error'});
            }
        },
        checkLimit (item, index) {
            if (!item.disabled) return;
            this.limitId = item.equipmentId;
            this.dialogLimit = true;
            this.cancelEdit(item, index);
            this.$refs['limit-check'] && this.$refs['limit-check'].responseAPI({equipmentId: item.equipmentId});
        },
        closeLimit () {
            this.dialogLimit = false;
        },
        handleCurrentChange (val) {
            this.currentPage = val;
            this.responesAPI({offset: (val - 1) * 10});
        }
    },
    mounted () {
        this.user && (this.deviceList = this.user.equipmentList);
        this.responesAPI();
    },
    watch: {
        user: {
            handler (newVal) {
                this.deviceList = newVal.equipmentList;
            },
            deep: true
        }
    }
};
</script>

<style lang="scss" scoped>
.guard {
    margin: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    .guard-title {
        height: 60px;
        line-height: 60px;
        text-indent: 30px;
        font-size: 18px;
        color: #333;
        font-weight: bold;
        text-align: left;
        border-bottom: 1px solid #dcdcdc;
    }
    .guard-nav {
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    .guard-list {
        margin: 0 0 0 50px;
        list-style: none;
        height: 126px;
        overflow: hidden;
        border-bottom: 1px solid #dcdcdc;
        position: relative;
    }
    .guard-list-equip-name {
        font-size: 18px;
        margin: 33px 50px 15px 0;
        text-align: left;
        font-weight: bold;
    }
    .guard-list-status,.guard-list-time,.guard-list-power {
        width: 400px;
        height: 30px;
        line-height: 30px;
        float: left;
        font-size: 14px;
        color: #666;
        text-align: left;
        position: relative;
        box-sizing: border-box;
        padding-left: 30px;
        overflow: hidden;
    }
    .list-attr-status-detail {
        .active {
            background-color: #ededed;
            padding: 5px;
            cursor: pointer;
            border: 1px solid #dcdcdc;
            border-radius: 5px;
        }
    }
    .guard-list-time {
        width: 300px;
        .icon-shijian1 {
            position: absolute;
            font-size: 16px;
            top: 0;
            left: 8px;
        }
    }
    .detail-iconfont {
        font-size: 28px;
        position: absolute;
        left: 0;
        top: 2px;
    }
    .list-attr-status-test {
        color: #008aff;
        cursor: pointer;
    }
    .edit-iconfont {
        font-size: 30px;
        color: #008aff;
        position: absolute;
        right: 50px;
        top: 50px;
        cursor: pointer;
    }
    .status-edit-btn,.status-submit-btn {
        display: inline-block;
        width: 90px;
        height: 40px;
        line-height: 45px;
        text-align: center;
        border: 1px solid #008aff;
        position: absolute;
        top: 45px;
        font-size: 16px;
        border-radius: 10px;
        cursor: pointer;
    }
    .status-submit-btn {
        right: 70px;
        background-color: #008aff;
        color: #fff;
    }
    .status-edit-btn {
        right: 200px;
        background-color: #fff;
        color: #008aff
    }
}
</style>

<style lang="scss">
.guard-list-status {
    .el-input__inner {
        height: 30px !important;
        line-height: 30px !important;
        background-color: #ededed;
        border: 1px solid #dcdcdc;
        width: 150px;
    }
    .el-select__caret {
        margin-top: 3px !important;
        &.is-reverse {
            margin-top: -5px !important;
        }
    }
    .is-disabled {
        .el-input__inner {
            border: 0;
            background-color: #fff;
            color: #000;
            width: 250px;
        }
        .el-input__suffix {
            display: none;
        }
    }
}
.guard {
    .el-dialog {
        border-radius: 10px;
        text-align: left;
    }
    .el-dialog__header {
        height: 60px;
        line-height: 60px;
        margin:0;
        padding:0 20px;
        border-bottom: 1px solid #dcdcdc;
        color: #333;
        font-weight: bold;
    }
    .el-dialog__body {
        padding-top: 10px;
        padding-left: 35px;
    }
}

.guard {
    .paging {
        margin: 40px auto;
    }
    .paging .number,.paging .btn-next,.paging .btn-prev,.paging .more {
        box-shadow: 3px 3px 2px 0 rgba(0, 0, 0, 0.2);
        height: 40px;
        border-radius: 4px;
        background-color: #fff;
    }
    .paging .number,.paging .more {
        width: 40px;
        line-height: 40px;
    }
    .btn-next,.btn-prev {
        width: 80px;
        font-weight: bold;
    }
}
</style>
