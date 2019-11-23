<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加交易所</el-button>
    <el-row class="pt-16">
      <el-col :span="24">
        <el-table
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="交易所名称">
          </el-table-column>
          <el-table-column
            prop="api_uri"
            label="文档地址">
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="添加时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="180">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.status === 1"
                type='primary' 
                close-transition>已对接</el-tag>
              <el-tag v-else
                type='danger'
                close-transition>未对接</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="添加交易所" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="交易所名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="API文档地址" :label-width="formLabelWidth">
          <el-input v-model="form.api" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addExchange('cancel')">取 消</el-button>
        <el-button type="primary" @click="addExchange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import serviceManger from '@/service/index'
  export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form:{
          name:'',
          api:''
        }
      }
    },
    created(){
      this.getExchangeList()
    },
    methods:{
      getExchangeList(){
        serviceManger.getExchange().then(res => {
          if(res.code == 0){
            this.tableData = res.data
            let validExchange = res.data.filter(item =>{
              return item.status == 1
            })
            console.log(validExchange)
          }else{
            this.$message(res.msg)
          }
        })
      },
      addExchange(type=null){
        if(type =='cancel'){
          this.dataDefault()
        }else{
          if(!this.form.name||!this.form.api){
            this.$message('交易所名称或API文档地址不能为空！')
            return
          }
          let param = {
            exchange_name:this.form.name,
            api_uri:this.form.api
          }
          serviceManger.addExchange(param).then(res => {
            this.$message(res.msg)
            if(res.code ==0){
              this.dataDefault()
              this.getExchangeList()
            }
          })
        }
      },
      dataDefault(){
        this.form.name = ''
        this.form.api = ''
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped>
  .pt-16{
    padding-top: 16px;
  }
</style>