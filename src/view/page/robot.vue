<template>
  <div class="robot-list">
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        prop="api_key"
        label="APIkey">
      </el-table-column>
      <el-table-column
        prop="symbol"
        label="交易对"
        width="80">
      </el-table-column>
      <el-table-column
        prop="up_unit"
        label="每次涨价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="down_unit"
        label="每次跌价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="min_amount"
        label="随机最小数量"
        width="110">
      </el-table-column>
      <el-table-column
        prop="max_amount"
        label="随机最大数量"
        width="110">
      </el-table-column>
      <el-table-column
        prop="min_interval"
        label="最小频率（秒）"
        width="120">
      </el-table-column>
      <el-table-column
        prop="max_interval"
        label="最大频率（秒）"
        width="120">
      </el-table-column>
      <el-table-column
        prop="ctime"
        label="添加时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="expire_at"
        label="到期时间"
        width="160">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="是否开启"
        width="80">
        <template slot-scope="scope">
          <el-switch
            @change="changeStatus(scope.row)"
            v-model="scope.row.status"
            :width='46'
            :active-value="1"
            :inactive-value="0"
            active-text="开"
            inactive-text="关">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type='primary' size="mini" @click="showDialog(scope.row)">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑机器人" :visible.sync="dialogEditVisible" width="80%">
      <buy-nav :editData='editData' :showFlag='showFlag' @changeDialog='changeDialog'></buy-nav>
    </el-dialog>
  </div>
</template>

<script>
import serviceManger from '@/service/index'
import BuyNav from './buy'
export default {
  data(){
    return{
      tableData: [],
      dialogEditVisible:false,
      editData:[],
      showFlag:false
    }
  },
  components:{
    BuyNav
  },
  methods:{
    getrobotlist(){
      serviceManger.getRobot().then(res => {
        if(res.code === 0){
          this.tableData = res.data
        }else{
          this.$message(res.msg)
        }
      })
    },
    handleClick(row){
      this.$confirm('此操作将永久删除机器人，是否继续？','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning',
      }).then(() =>{
        let param = {
          bot_id:row.id
        }
        serviceManger.robotOperator(param,'del').then(res =>{
          if(res.code == 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getrobotlist()
          }else{
            this.$message(res.msg)
          }
        })
      }).catch(() =>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
      })
    },
    changeStatus(row){
      let param = {
        bot_id:row.id
        // bot_id:0
      }
      serviceManger.robotOperator(param,'toggle').then(res =>{
        if(res.code == 0){
          this.$message.success(res.msg);
        }
      })
    },
    showDialog(row){
      this.dialogEditVisible = true
      this.editData = row
    },
    changeDialog(val){
      this.dialogEditVisible = val
      this.getrobotlist()
    }
  },
  created(){
    this.getrobotlist()
  }
}
</script>

<style>
.el-switch__core{
  left: -20px;
}
.el-switch__label--left{
  position: relative;
  left: 30px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right{
  position: relative;
  right: 70px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label.is-active{
  z-index: 1111;
  color: #fff;
}

.el-switch__label--left{
  position: relative;
  left: 30px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right{
  position: relative;
  right: 70px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right.is-active{
  z-index: 1111;
  color: #fff !important;
}
.el-switch__label--left.is-active{
  z-index: 1111;
  color: #9c9c9c !important;
}
</style>