<template>
    <div class="limit-check">
        <p class="limit-check-pre">
            <span class="limit-check-pre-explain">允许员工访问：</span>
            <el-checkbox>全部员工</el-checkbox>
            <el-checkbox>部分员工</el-checkbox>
        </p>
        <div class="limit-check-upload">
            <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="uploadSectionFile"
                :on-change="handleChange">
                <span class="add-btn">批量导入配置权限名单</span>
                <span class="add-info">{{addInfo}}</span>
            </el-upload>
            <span class="limit-check-down">下载模板</span>
        </div>
        <p class="limit-check-filter">
            <span class="limit-check-filter-explain">已允许的员工才可以访问，请在下方选择可以访问的员工</span>
            <input type="text" class="limit-check-filter-input">
        </p>
        <div class="limit-check-list-title">
            <span class="limit-check-list-choosed-explain">已选择人员（2人）</span>
            <span class="limit-check-list-free-explain">未选择人员（122人）</span>
        </div>
        <div class="limit-check-list">
            <div class="limit-check-list-choosed">
                <div class="limit-check-list-choosed-library" v-for="(item, index) in choosedList" :key="index" v-if="item.personnel.length">
                    <p class="library-title">
                        <span class="library-explain">{{item.libraryName}}</span>
                        <span class="library-check" @click="uncheckLibrary(item, index)">全选 <i :class="['iconfont', item.active ? 'icon-fuxuankuang' : 'icon-checked']"></i> </span>
                    </p>
                    <div class="library-list" v-for="(childItem, childIndex) in item.personnel" :key="childIndex" v-if="childItem">
                        <span class="library-list-name">{{childItem.personnelName}} |</span>
                        <span class="library-list-desc">{{childItem.personnelDesc}}</span>
                        <i @click="unchildCheckLibrary(item, index, childItem, childIndex)" :class="['iconfont', childItem.active ? 'icon-fuxuankuang' : 'icon-checked']"></i>
                    </div>
                </div>
            </div>
            <div class="limit-check-list-free">
                <div class="limit-check-list-choosed-library" v-for="(item, index) in freeChooseList" :key="index" v-if="item.personnel.length">
                    <p class="library-title">
                        <span class="library-explain">{{item.libraryName}}</span>
                        <span class="library-check" @click="unfreeLibrary(item, index)">全选 <i :class="['iconfont', item.active ? 'icon-fuxuankuang' : 'icon-checked']"></i> </span>
                    </p>
                    <div class="library-list" v-for="(childItem, childIndex) in item.personnel" :key="childIndex">
                        <span class="library-list-name">{{childItem.personnelName}} |</span>
                        <span class="library-list-desc">{{childItem.personnelDesc}}</span>
                        <i @click="unchildFreeLibrary(item, index, childItem, childIndex)" :class="['iconfont', childItem.active ? 'icon-fuxuankuang' : 'icon-checked']"></i>
                    </div>
                </div>
            </div>
            <i class="iconfont icon-jiantoul operate-iconfont" @click="addCheck"></i>
            <i class="iconfont icon-jiantou-copy operate-iconfont" @click="removeCheck"></i>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { deepClone } from '@/utils';
export default {
    props: ['equipmentId'],
    mounted () {
        this.responseAPI({equipmentId: this.equipmentId});
    },
    data () {
        return {
            addInfo: '',
            file: '',
            choosedList: {},
            freeChooseList: {},
            transList: [],
            untransList: []
        };
    },
    methods: {
        async responseAPI (data = {}) {
            const response = await api.post(config.guard.checkList, data);
            if (Number(response.data.code) === 200) {
                this.choosedList = response.data.data.choosedList.libraryPersonnel;
                this.freeChooseList = response.data.data.freeChooseList.libraryPersonnel;
            }
        },
        handleChange (file, fileList) {
            this.addInfo = file.name;
        },
        uploadSectionFile (param) {
            this.file = param.file;
        },
        // 全选库已选择人员
        uncheckLibrary (item, index) {
            item.active = !item.active;
            item.personnel.forEach(value => {
                value.active = item.active;
            });
            var tranindexTag = -1;
            this.transList.forEach((tranitem, tranindex) => {
                if (tranitem.libraryId === item.libraryId) {
                   tranindexTag = tranindex;
                }
            });
            tranindexTag > -1 && this.transList.splice(tranindexTag, 1);
            this.$set(this.choosedList, index, {...item});
            if (item.active) {
                this.transList.push(item);
            }
        },
        // 单选库已选择人员
        unchildCheckLibrary (item, index, childItem, childIndex) {
            childItem.active = !childItem.active;
            item.active = item.personnel.every(value => value.active === true);
            var tranindexTag = -1;
            this.transList.forEach((tranitem, tranindex) => {
                if (tranitem.libraryId === item.libraryId) {
                   tranindexTag = tranindex;
                }
            });
            tranindexTag > -1 && this.transList.splice(tranindexTag, 1);
            let itemObj = {...item};
            itemObj.personnel = itemObj.personnel.map(item => {
                return (item.active && item);
            });
            this.transList.push(itemObj);
            this.$set(this.choosedList, index, {...item});
        },
        // 全选库已选择自由人员
        unfreeLibrary (item, index) {
            item.active = !item.active;
            item.personnel.forEach(value => {
                value.active = item.active;
            });
            var tranindexTag = -1;
            this.untransList.forEach((tranitem, tranindex) => {
                if (tranitem.libraryId === item.libraryId) {
                   tranindexTag = tranindex;
                }
            });
            tranindexTag > -1 && this.untransList.splice(tranindexTag, 1);
            this.$set(this.freeChooseList, index, {...item});
            if (item.active) {
                this.untransList.push(item);
            }
        },
        // 单选库已选择自由人员
        unchildFreeLibrary (item, index, childItem, childIndex) {
            childItem.active = !childItem.active;
            item.active = item.personnel.every(value => value.active === true);
            var tranindexTag = -1;
            this.untransList.forEach((tranitem, tranindex) => {
                if (tranitem.libraryId === item.libraryId) {
                   tranindexTag = tranindex;
                }
            });
            tranindexTag > -1 && this.untransList.splice(tranindexTag, 1);
            let itemObj = {...item};
            itemObj.personnel = itemObj.personnel.map(item => {
                return (item.active && item);
            });
            this.untransList.push(itemObj);
            this.$set(this.freeChooseList, index, {...item});
        },
        // 增加已选择人员
        addCheck () {
            this.untransList.forEach(item => {
                // 往选择人员添加
                this.choosedList.forEach((checkitem, checkindex) => {
                    if (item.libraryId === checkitem.libraryId) {
                        const arr = deepClone(item.personnel);
                        arr.forEach(item => {
                            if (item) {
                                item.active = false;
                                this.choosedList[checkindex].personnel.push(item);
                            }
                        });
                        this.$set(this.choosedList[checkindex], 'active', false);
                    }
                });
                this.freeChooseList.forEach((checkitem, checkindex) => {
                    if (item.libraryId === checkitem.libraryId) {
                        const arr = deepClone(item.personnel);
                        arr.forEach(item => {
                            if (item) {
                                this.freeChooseList[checkindex].personnel.forEach((freeitem, freeindex) => {
                                    if (item.personnelId === freeitem.personnelId) {
                                        this.freeChooseList[checkindex].personnel.splice(freeindex, 1);
                                    }
                                });
                            }
                        });
                    }
                });
            });
            this.untransList = [];
        },
        removeCheck () {
            this.transList.forEach(item => {
                // 往选择人员添加
                this.freeChooseList.forEach((checkitem, checkindex) => {
                    if (item.libraryId === checkitem.libraryId) {
                        const arr = deepClone(item.personnel);
                        arr.forEach(item => {
                            if (item) {
                                item.active = false;
                                this.freeChooseList[checkindex].personnel.push(item);
                            }
                        });
                        this.$set(this.freeChooseList[checkindex], 'active', false);
                    }
                });
                this.choosedList.forEach((checkitem, checkindex) => {
                    if (item.libraryId === checkitem.libraryId) {
                        const arr = deepClone(item.personnel);
                        arr.forEach(item => {
                            if (item) {
                                this.choosedList[checkindex].personnel.forEach((freeitem, freeindex) => {
                                    if (item.personnelId === freeitem.personnelId) {
                                        this.choosedList[checkindex].personnel.splice(freeindex, 1);
                                    }
                                });
                            }
                        });
                    }
                });
            });
            this.transList = [];
        }
    }
};
</script>

<style lang="scss" scoped>
.limit-check {
    overflow: hidden;
    .limit-check-upload {
        position: relative;
        overflow: hidden;
        margin-bottom: 30px;
    }
    .limit-check-pre {
        margin-bottom: 40px;
    }
    .limit-check-pre-explain {
        font-weight: bold;
    }
    .add-btn {
        display: block;
        background-color: #008aff;
        height: 35px;
        line-height: 35px;
        width: 180px;
        text-align: center;
        color: #fff;
        border-radius: 5px;
    }
    .add-info {
        display: block;
        width: 430px;
        margin: 10px auto;
        height: 35px;
        line-height: 35px;
        background-color: #eee;
        border-radius: 5px;
    }
    .limit-check-down{
        position: absolute;
        left: 200px;
        top: 0px;
        display: block;
        height: 35px;
        line-height: 35px;
        border: 1px solid #008aff;
        border-radius: 5px;
        width: 90px;
        text-align: center;
        cursor: pointer;
        color: #008aff;
    }
    .limit-check-filter-input {
        display: block;
        margin-top: 10px;
        width: 90%;
        border-radius: 5px;
        background-color: #eee;
        border: 1px solid #dcdcdc;
        height: 30px;
        line-height: 30px;
        text-indent: 10px;
    }
    .limit-check-list-title{
        height: 30px;
        font-weight: bold;
        line-height: 30px;
        font-size: 14px;
        color: #333;
        span {
            display: inline-block;
            width: 49%;
        }
    }
    .limit-check-list {
        height: 300px;
        border: 1px solid #dcdcdc;
        background-color: #eeeeee;
        margin-top: 5px;
        overflow: hidden;
        position: relative;
    }
    .operate-iconfont {
        position: absolute;
        left: 410px;
        color: #304156;
        font-size: 55px;
        top: 100px;
        cursor: pointer;
    }
    .icon-jiantou-copy {
        top: 150px;
    }
    .limit-check-list-choosed,.limit-check-list-free {
        width: 49%;
        float: left;
        height: 100%;
        box-sizing: border-box;
        border-right: 1px solid #dcdcdc;
        overflow: auto;
        padding-right: 10px;
    }
    .library-title {
        height: 30px;
        line-height: 30px;
        margin-left: 5px;
        color: #333;
        font-weight: bold;
        font-size: 14px;
        overflow: hidden;
    }
    .library-check {
        float: right;
        cursor: pointer;
    }
    .limit-check-list-choosed-library {
        border-bottom: 1px solid #dcdcdc;
    }
    .library-list {
        margin: 15px 15px;
        height: 30px;
        .iconfont {
            float: right;
        }
    }
    .library-list-name {
        display: inline-block;
    }
}
</style>
