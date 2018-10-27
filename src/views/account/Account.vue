<template>
    <div class="page-account">
        <div class="account">
            <div class="account-title">
                <span class="account-title-text">账号管理</span>
                <span class="account-add-btn" @click="accountAdd">添加账号</span>
            </div>
            <div class="account-list" v-for="item in userList" :key="item.userId">
                <img class="account-list-image" :src="userImg" alt="">
                <p class="account-list-name">{{item.name}}</p>
                <p class="account-list-info">
                    <span class="account-list-info-number">账号: {{item.username}}</span>
                    <span class="account-list-info-organization">组织: {{item.deptName}}</span>
                </p>
                <i class="iconfont icon-bianji-lan" @click="accountEdit(item)"></i>
                <i class="iconfont icon-qingkongsousuolanicon-lan" @click="accountRemove(item.userId)"></i>
            </div>
            <div class="account-empty"  v-if="!userList.length">
                <img :src="emptyImage">
                <div>暂无数据</div>
            </div>
        </div>
        <!-- 分页 -->
        <el-pagination :page-size="10" v-if="count > 10" :current-page.sync="currentPage" background layout="prev,pager,next" :total="count" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 账号增加和编辑 -->
        <el-dialog :visible.sync="accountVisible" class="account-dialog" :title=" Object.keys(accountObj).length > 1 ? '账号编辑':'添加新账号'">
            <AccountAdd @accountOperate="accountOperate" :accountObj="accountObj" ref="account-operate"></AccountAdd>
        </el-dialog>
        <!-- 账号删除 -->
        <el-dialog :visible.sync="removeAccountVisible" class="account-remove-dialog" title="提示">
            <p class="account-remove-info">你确定要删除该账号么</p>
            <span class="cancel-remove" @click="accountRemoveCancel">取消删除</span>
            <span class="sure-remove" @click="accountRemoveSure">确认删除</span>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import AccountAdd from '@/views/account/AccountAdd';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      userList: [],
      userImg: require('@/assets/image/avatar.png'),
      emptyImage: require('@/assets/image/empty.png'),
      count: 0,
      currentPage: 1,
      accountVisible: false, // 是否打开账号弹出窗
      removeAccountVisible: false, // 账号删除弹窗
      accountObj: {},
      removeUserId: null // 删除的userId
    };
  },
  methods: {
    // 显示
    async responseAPI (data = {}) {
      const response = await api.post(config.account.list, data);
      if (Number(response.data.code) === 200) {
        this.userList = [...response.data.data.rows];
        this.count = response.data.data.total;
      } else {
          this.$message({
              type: 'error',
              message: response.data.msg
          });
      }
    },
    // 分页
    handleCurrentChange (val) {
        this.currentPage = val;
        let data = {};
        data.offset = (val - 1) * 10;
        this.responseAPI(data);
    },
    // 账号编辑
    async accountEdit (item) {
        const response = await api.post(config.account.getEquipmentRole, {userId: item.userId});
        if (Number(response.data.code) === 200) {
            const data = response.data.data;
            this.accountObj = {
                userId: item.userId,
                name: item.name,
                realPassword: item.realPassword,
                username: item.username,
                mobile: item.mobile,
                equipmentId: []
            };
            data.forEach(element => {
                this.accountObj.equipmentId.push(element.equipmentId);
            });
            this.$nextTick(() => {
                this.$refs['account-operate'] && this.$refs['account-operate'].passwordClearValidate('operate-account-form');
            });
            this.accountVisible = true;
        } else {
            this.$message({
                type: 'error',
                message: response.data.msg
            });
        }
    },
    // 账号增加
    accountAdd () {
        this.accountObj = {equipmentId: []};
        this.$nextTick(() => {
            this.$refs['account-operate'] && this.$refs['account-operate'].passwordClearValidate('operate-account-form');
        });
        this.accountVisible = true;
    },
    // 保存
    async accountOperate (val) {
        let dataObj = {...val};
        dataObj.equipmentId = dataObj.equipmentId.join(',');
        const response = await api.post(config.account.save, dataObj);
        if (Number(response.data.code) === 200) {
            this.accountVisible = false;
            this.$message({
                type: 'success',
                message: response.data.msg
            });
            this.currentPage = 1;
            this.responseAPI();
        } else {
            this.$message({
                type: 'error',
                message: response.data.msg
            });
        }
    },
    // 删除弹出层
    accountRemove (val) {
        this.removeAccountVisible = true;
        this.removeUserId = val;
    },
    // 确定删除
    async accountRemoveSure () {
        const response = await api.post(config.account.remove, {userId: this.removeUserId});
        if (Number(response.data.code) === 200) {
            this.$message({
                type: 'success',
                message: response.data.msg
            });
            this.removeAccountVisible = false;
            this.responseAPI({offset: (this.currentPage - 1) * 10});
        } else {
            this.$message({
                type: 'error',
                message: response.data.msg
            });
        }
    },
    // 取消删除
    accountRemoveCancel () {
        this.removeAccountVisible = false;
    }
  },
  async mounted () {
    this.responseAPI();
  },
  components: {
      AccountAdd
  },
  computed: {
      ...mapGetters([
          'user'
      ])
  }
};
</script>

<style lang="scss" scoped>
$bgcolor: #008aff;
$ftcolor: #fff;
.account {
  margin: 30px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  .account-title {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding-left: 30px;
    padding-right: 40px;
    text-align: left;
    border-bottom: 1px solid #e5e5e5;
  }
  .account-title-text {
    font-weight: bold;
  }
  .account-add-btn {
    float: right;
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: $bgcolor;
    border-radius: 10px;
    color: $ftcolor;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      background-color: #0066ff;
    }
  }
  .account-list {
    height: 130px;
    box-sizing: border-box;
    padding: 18px 30px;
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
    position: relative;
    overflow: hidden;
    p {
      margin: 10px 10px 20px 100px;
    }
    i {
      position: absolute;
      top: 50px;
      color: $bgcolor;
      font-size: 30px;
      cursor: pointer;
      &:hover {
          color: #0066ff;
      }
    }
    .icon-bianji-lan {
      right: 114px;
    }
    .icon-qingkongsousuolanicon-lan {
      right: 40px;
    }
  }
  .account-list-image {
    width: 90px;
    height: 90px;
    border-radius: 10px;
    position: absolute;
  }
  .account-list-name {
    font-size: 22px;
    font-weight: bold;
  }
  .account-list-info {
    font-size: 18px;
    color: #666;
  }
  .account-list-info-number {
    display: inline-block;
    width: 300px;
  }
  .account-empty {
      padding: 50px;
  }
}
.page-account {
    .account-remove-info {
        font-size: 16px;
        font-weight: bold;
        margin: 35px auto;
    }
    .cancel-remove,.sure-remove {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #008aff;
        color: #fff;
        border-radius: 10px;
        margin-left: 10px;
        cursor: pointer;
        border: 1px solid #008aff;
    }
    .sure-remove {
        background-color: #fff;
        color: #999;
        border-color: #999;
    }
}

</style>
<style lang="css">
.page-account .el-dialog__header {
    text-align: left;
    padding: 10px 40px;
    margin: 0;
    border-bottom: 1px solid #e5e5e5;
    font-weight: bold;
}
.page-account .el-dialog {
    width: 500px;
    border-radius: 10px;
}
</style>
