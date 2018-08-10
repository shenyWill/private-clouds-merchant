<template>
  <div class="person">
    <Search :searchResult='searchResult'>
      <el-form ref="search-form" :model="searchForm" slot="search-form" label-width="60px" class="search-form-box">

        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.name" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" :offset="3">
            <el-form-item label="库类型">
              <el-select v-model="searchForm.type" size="small">
                <el-option label="类型一" value="one"></el-option>
                <el-option label="类型二" value="two"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label="设备">
              <el-select v-model="searchForm.config" size="small">
                <el-option label="设备一" value="one"></el-option>
                <el-option label="设备二" value="two"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="3">
            <el-form-item label="比对时间">
              <el-date-picker v-model="searchForm.startDate" type="datetime" placeholder="请选择开始时间" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="至" label-width="40px">
              <el-date-picker v-model="searchForm.endDate" type="datetime" placeholder="请选择结束时间" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="相似度">
              <el-slider v-model="searchForm.slider" :min="60" :max="100" class="search-slider"></el-slider>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="21">
            <el-form-item>
              <el-button type="primary" @click="searchSubmit">搜 索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </Search>
    <div class="person-nav">
      <!-- 添加新人员 -->
        <el-card class="person-add person-list">
          <div class="add-content" @click="addPerson">
            <i class="el-icon-plus"></i>
          </div>
          <p class="add-text">添加新人员</p>
          <div class="delete-all-people-card" v-if="deleteAllOperationTag"></div>
        </el-card>
      <!-- 人员列表 -->
        <el-card class="person-list" v-for="item in personList" :key="item.id" @click.native="showPersonDetail(item.id)">
          <el-tooltip placement="bottom-end" popper-class="person-pop">
            <div slot="content">
              <i class="el-icon-edit"></i>　<i class="el-icon-delete" @click.self.stop="movePeople(item.id)"></i>
            </div>
            <i class="el-icon-more"></i>
          </el-tooltip>
          <div class="list-content">
            <img :src="item.image" class="person-image">
            <p class="person-name">{{ item.name }}</p>
            <p class="person-position">{{ item.position }}</p>
            <p class="person-company">{{ item.company }}</p>
          </div>
          <div v-if="deleteAllOperationTag" :class="['delete-all-people-card',deletePeopleList.indexOf(item.id) > -1 ? 'delete-all-people-checked' : '']" @click.stop="checkDeletePeople(item.id)">
            <i class="el-icon-circle-check"></i>
          </div>
        </el-card>
    </div>
    <!-- 分页 -->
    <el-pagination :disabled='deleteAllOperationTag' background layout="prev,pager,next" :total="count" class="paging" @current-change="handleCurrentChange"></el-pagination>
    <!-- 显示详情 -->
    <el-dialog :visible.sync="dialogPersonDetail" width="25%" custom-class="person-detail-show">
      <PersonDetail :personDetail="personDetail"></PersonDetail>
    </el-dialog>
    <!-- 批量删除 -->
    <div class="delete-all">
      <i class="el-icon-arrow-left"></i>
      <p class="delete-all-text" @click="removeAll">批量删除</p>
      <i class="el-icon-arrow-right"></i>
      <div class="delete-all-operation" v-if="deleteAllOperationTag">
        <p :class="['detete-all-select', deletePeopleList.length !== personList.length ? '': 'delete-all-select-sure']">
          <i class="el-icon-circle-check" @click="deleteAllSelect">  选择全部</i>
        </p>
        <p class="delete-all-cancel" @click="deleteAllCancel">取消删除</p>
        <p class="delete-all-sure" @click="deleteAllSure">确定删除</p>
      </div>
    </div>
    <!-- 添加人员 -->
    <el-dialog :visible.sync="dialogPersonAdd" width="25%" custom-class="person-detail-add" title="编辑人员信息" :before-close="removePersonAddForm">
      <PersonAdd @addSumbit="addSumbit" ref="person-add"></PersonAdd>
    </el-dialog>
  </div>
</template>

<script>
import Search from '@/views/search/Search';
import PersonDetail from '@/views/person/PersonDetail';
import PersonAdd from '@/views/person/PersonAdd';
import api from '@/api';
import config from '@/config';
import { scollTop } from '@/utils';
export default {
  name: 'Person',
  data () {
    return {
      searchForm: {},
      searchResult: {},
      personList: [], // 人员列表
      count: 0, // 人员数量
      personDetail: {}, // 个人详情
      dialogPersonDetail: false, // 详情框是否显示
      deleteAllOperationTag: false, // 进入删除全部标识
      deletePeopleList: [], //  删除人员集合
      dialogPersonAdd: false // 添加人员框是否显示
    };
  },
  components: {
    Search,
    PersonDetail,
    PersonAdd
  },
  methods: {
    // 点击搜索
    searchSubmit () {
      this.searchResult = { ...this.searchForm };
    },
    // 请求
    async responseAPI (data = {}) {
      const response = await api.post(config.person.list, data);
      if (Number(response.data.resCode) === 200) {
        this.count = response.data.size;
        this.personList = response.data.data;
      }
    },
    // 点击分页
    async handleCurrentChange (val) {
      this.responseAPI({pageSize: 19, page: val});
      scollTop(80);
    },
    // 查看详情
    async showPersonDetail (id) {
      const response = await api.post(config.person.detail, {id: id});
      if (Number(response.data.resCode) === 200) {
        this.personDetail = response.data.data[0];
        this.dialogPersonDetail = true;
      }
    },
    // 删除单个人员
    async movePeople (id) {
      this.$confirm('你确认要把该人员从库中删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await api.post(config.person.delete, {id: id});
        this.responseAPI();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    },
    // 删除全部
    removeAll () {
      this.deleteAllOperationTag = true;
    },
    // 选择删除人员
    checkDeletePeople (id) {
      if (this.deletePeopleList.indexOf(id) > -1) {
        this.deletePeopleList.splice(this.deletePeopleList.indexOf(id), 1);
      } else {
        this.deletePeopleList.push(id);
      }
    },
    // 选择删除全部人员
    deleteAllSelect () {
      if (this.deletePeopleList.length !== this.personList.length) {
        this.deletePeopleList = [];
        this.personList.forEach(item => this.deletePeopleList.push(item.id));
      } else {
        this.deletePeopleList = [];
      }
    },
    // 取消删除全部
    deleteAllCancel () {
      this.deletePeopleList = [];
      this.deleteAllOperationTag = false;
    },
    // 确认删除全部
    async deleteAllSure () {
      await api.post(config.person.deleteAll, this.deletePeopleList);
      await this.responseAPI();
      this.deletePeopleList = [];
      this.deleteAllOperationTag = false;
    },
    // 关闭添加人员前情况添加人员列表
    removePersonAddForm (done) {
      this.$refs['person-add'] && this.$refs['person-add'].removePersonAddForm();
      done();
    },
    // 添加人员
    addPerson () {
      this.$refs['person-add'] && this.$refs['person-add'].personClearValidate('add-person-form');
      this.dialogPersonAdd = true;
    },
    // 提交添加人员
    async addSumbit (val) {
      let addObj = {...val};
      addObj.status !== true && (addObj.status = false);
      await api.post(config.person.add, addObj);
      await this.responseAPI({pageSize: 19, page: 1});
      this.$refs['person-add'] && this.$refs['person-add'].removePersonAddForm();
      this.dialogPersonAdd = false;
    }
  },
  async mounted () {
    this.responseAPI({pageSize: 19});
  },
  watch: {
    searchResult: {
      handler (newVal, oldVal) {
        this.searchForm = { ...newVal };
        this.responseAPI(this.searchForm);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.search-form-box {
  margin: 30px 40px;
}
.person-nav {
  margin: 35px 0 5px 35px;
  overflow: hidden;
}
.person-list {
  width: 260px;
  height: 360px;
  border-radius: 10px;
  margin-right: 70px;
  margin-bottom: 65px;
  float: left;
  position: relative;
  overflow: hidden;
  &:nth-child(5n) {
    margin-right: 0;
  }
  .el-icon-more {
    position: absolute;
    color: #666666;
    right: 15px;
    top: 5px;
    cursor: pointer;
  }
  .list-content {
    margin: 30px 20px;
    width: 180px;
    overflow: hidden;
    text-align: center;
  }
  .person-image {
    width: 150px;
    height: 150px;
  }
  .person-name {
    font-size: 22px;
    margin-top: 5px;
    margin-bottom: 20px;
    color: #444;
    font-weight: bold;
  }
  .person-position {
    margin-top: 0;
    font-size: 14px;
    color: #666;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .person-company {
    margin-top: 0;
    font-size: 14px;
    color: #666;
  }
}
.person-add {
  border: 1px dashed #999;
}
.add-content {
  margin: 0 auto;
  height: 120px;
  width: 120px;
  border: 1px dashed #999;
  border-radius: 15px;
  margin-top: 80px;
  line-height: 120px;
  font-size: 60px;
  color: #999;
  cursor: pointer;
}
.add-text {
  font-size: 18px;
  color: #666;
  font-weight: bold;
  cursor: pointer;
  margin-top: 25px;
}
.paging {
  display: block;
  margin-bottom: 40px;
}
// 删除全部
.delete-all {
  height: 70px;
  width: 70px;
  background-color: #fff;
  color: #666;
  font-size: 12px;
  border-radius: 50%;
  padding: 15px;
  z-index: 999;
  box-sizing: border-box;
  font-weight: bold;
  position: fixed;
  right: 0;
  bottom: 20px;
  margin-right: -35px;
  transition: all 1s;
  .el-icon-arrow-left,.el-icon-arrow-right {
    position: absolute;
    color: #008aff;
    top: 30px;
    font-size: 20px;
    font-weight: bold;
  }
  .el-icon-arrow-left {
    left: 0;
  }
  .el-icon-arrow-right {
    right: 0;
    display: none;
  }
  .delete-all-text {
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-size: 12px;
  }
  .delete-all-operation {
    width: 300px;
    height: 210px;
    position: absolute;
    background-color: #fff;
    border-radius: 15px;
    left: -300px;
    top: -140px;
    text-align: center;
    overflow: hidden;
    padding: 30px 0;
    box-sizing: border-box;
    .el-icon-circle-check {
      font-size: 18px;
      color: #666;
      font-weight: bold;
      cursor: pointer;
    }
    .delete-all-cancel,.delete-all-sure {
      width: 200px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin: 0 auto;
      cursor: pointer;
      margin-top: 20px;
    }
    .delete-all-cancel {
      background-color: #008aff;
    }
    .delete-all-sure {
      background-color: #ff0000;
    }
  }
  &:hover {
    margin-right: 0px;
    .el-icon-arrow-left {
      display: none;
    }
    .el-icon-arrow-right {
      display: inline;
    }
  }
}
.delete-all-people-card {
  position: absolute;
  z-index: 888;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  line-height: 360px;
  font-size: 80px;
  color: #fff;
}
.delete-all-people-checked {
  color: #008aff;
}
.delete-all-select-sure {
  .el-icon-circle-check {
    color: #008aff !important;
  }
}
</style>

<style lang="scss">
.person-detail-show,.person-detail-add {
  border-radius: 15px;
}
.person-detail-add {
  text-align: left;
}
.person-pop {
  padding: 5px 10px;
  i {
    font-size: 22px;
    padding: 10px;
    cursor: pointer;
  }
}
</style>
