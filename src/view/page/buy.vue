<template>
  <el-form ref="buyForm" :model="buyForm" class="add-product"
    :rules="buyRules" label-width="180px">
    <el-form-item prop="robotIP" label="机器人IP" v-show="showFlag">
      <el-col :span='span.col1'>
        <el-input v-model="buyForm.robotIP" readonly ></el-input>
      </el-col>
      <el-col :span='span.col2'>
        在某一交易所绑定此平台IP（只读）
      </el-col>
    </el-form-item>
    <el-form-item prop="exchange" label="选择交易所" v-show="showFlag">
      <el-col :span="span.col1">
        <el-select v-model="buyForm.exchange" placeholder="请选择交易所">
          <el-option
            v-for="item in validExchange"
            :key="item.id"
            :label="item.name" 
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span='span.col2'>
        在此平台已绑定的交易所
      </el-col>
    </el-form-item>
    <el-form-item prop="apiKey" label="APIkey">
      <el-col :span='span.col1'>
        <el-input v-model="buyForm.apiKey"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item prop="secretKey" label="私钥">
      <el-col :span='span.col1'>
        <el-input v-model="buyForm.secretKey"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item prop="coin" label="交易对" v-show="showFlag">
      <el-col :span='span.col1'>
        <el-input v-model="buyForm.coin"></el-input>
      </el-col>
      <el-col :span='span.col2'>
        交易对：（如BTC/USDT中的BTC为交易币；USDT为法币）
      </el-col>
    </el-form-item>
    <el-form-item prop="upRate" label="涨幅权重">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.upRate"></el-input>
      </el-col>
      <el-col :span='span.col2' class="lh-1">
        和跌幅权重的总值不得大于10，目的是设定机器人的涨跌趋势，当其设定为8时，及下次价格的计算有80%的概率的涨。
        <br><span class="red">注：涨幅权重是客观存在。</span>
      </el-col>
    </el-form-item>
    <el-form-item prop="downRate" label="跌幅权重">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.downRate"></el-input>
      </el-col>
      <el-col :span='span.col2' class="lh-1">
        和涨幅权重的总值不得大于10，目的是设定机器人的涨跌趋势，当其设定为8时，及下次价格的计算有80%的概率的跌。
        <br><span class="red">注：跌幅权重是客观存在。</span>
      </el-col>
    </el-form-item>
    <el-form-item prop="upPrice" label="每次涨价格">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.upPrice"></el-input>
      </el-col>
      <el-col :span='span.col2'>
        根据涨幅权重计算所得，每次下单涨的价格。
      </el-col>
    </el-form-item>
    <el-form-item prop="downPrice" label="每次跌价格">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.downPrice"></el-input>
      </el-col>
      <el-col :span='span.col2'>
        根据跌幅权重计算所得，每次下单跌的价格。
      </el-col>
    </el-form-item>
    <el-form-item prop="maxPrice" label="最大价格">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.maxPrice"></el-input>
      </el-col>
      <el-col :span='span.col2' class="lh-1">
        该机器人下单的最大价格，如果超过该价格则触发反转（根据设置），若无反转则按该最大价格一直下单。
      </el-col>
    </el-form-item>
    <el-form-item prop="minPrice" label="最小价格">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.minPrice"></el-input>
      </el-col>
      <el-col :span='span.col2' class="lh-1">
        该机器人下单的最小价格，如果低于该价格则触发反转（根据设置），若无反转则按该最小价格一直下单。
      </el-col>
    </el-form-item>
    <el-form-item prop="maxRandom" label="数量随机上限">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.maxRandom"></el-input>
      </el-col>
      <el-col :span='span.col2'>
        每次订单随机的交易币枚数上限。
      </el-col>
    </el-form-item>
    <el-form-item prop="minRandom" label="数量随机下限">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.minRandom"></el-input>
      </el-col>
      <el-col :span='span.col2'>
        每次订单随机的交易币枚数下限。
      </el-col>
    </el-form-item>
    <el-form-item prop="maxRate" label="最大下单频率">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.maxRate"></el-input>
      </el-col>
      <el-col :span='span.col2'>
        机器人每两次下单最大间隔秒数(不得小于最小下单频率)。
      </el-col>
    </el-form-item>
    <el-form-item prop="minRate" label="最小下单频率">
      <el-col :span='span.col1'>
        <el-input v-model.number="buyForm.minRate"></el-input>
      </el-col>
      <el-col :span='span.col2' class="lh-1">
        机器人每两次下单最少间隔秒数(不得大于最大下单频率;最小频率为10)。
      </el-col>
    </el-form-item>
    <el-form-item label="选择购买期长：" v-show="showFlag">
      <el-col :span='24'>
        <el-radio-group v-model="num" @change="changePro">
          <el-radio-button 
            v-for="item in prodList"
            :key="item.id"
            :label="item.id" 
          >{{item.name}}</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span='24' class="lh-1 pt-24">
        需支付： {{price}} USDT
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">{{btnTxt}}</el-button>
      <el-button @click="cancelForm">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import serviceManger from '@/service/index'
  export default {
    props:{
      showFlag:{
        type:Boolean,
        default:true
      },
      editData:{
        type:Object
      }
    },
    data() {
      const validateCoin = (rule,value,callback) => {
        if(value.indexOf('/') == -1){
          callback(new Error('交易对的格式以斜杠分开，例如（BTC/USDT）'))
        }else{
          callback()
        }
      }
      const testSize = (rule,value,callback) => {
        if(value <0 || value>10){
          callback(new Error('涨/跌幅权重必须在 0 -- 10 之间'))
        }else{
          callback()
        }
      }
      const isNumber = (rule,value,callback) => {
        let req = /^\d+(\.\d+)?$/
        if(!req.test(value)){
          callback(new Error('输入值必须是数字且大于等于 0'))
        }else{
          callback()
        }
      }
      const checkMinRate = (rule,value,callback) => {
        if(value > this.buyForm.maxRate){
          callback(new Error('最小下单频率不能大于最大下单频率'))
        }else if(value < 10){
          callback(new Error('最小下单频率不能小于 10'))
        }else{
          callback()
        }
      }
      const checkMaxRate = (rule,value,callback) => {
        if(value < this.buyForm.minRate){
          callback(new Error('最大下单频率不能小于最小下单频率'))
        }else{
          callback()
        }
      }
      let buyRules = {
        apiKey:[{required:true,message:'请输入APIkey',trigger:'blur'}],
        secretKey:[{required:true,message:'请输入私钥',trigger:'blur'}],
        upRate:[
          {required:true,message:'请输入涨幅权重',trigger:'blur'},
          {required:true,trigger:'blur',validator:testSize},
          {required:true,trigger:'blur',validator:isNumber},
        ],
        downRate:[
          {required:true,message:'请输入跌幅权重',trigger:'blur'},
          {required:true,trigger:'blur',validator:testSize},
          {required:true,trigger:'blur',validator:isNumber},
        ],
        upPrice:[
          {required:true,message:'请输入每次涨价格',trigger:'blur'},
          {required:true,trigger:'blur',validator:isNumber},
        ],
        downPrice:[
          {required:true,message:'请输入每次跌价格',trigger:'blur'},
          {required:true,trigger:'blur',validator:isNumber},
        ],
        maxPrice:[
          {required:true,message:'请输入最大价格',trigger:'blur'},
          {required:true,trigger:'blur',validator:isNumber},
        ],
        minPrice:[
          {required:true,message:'请输入最小价格',trigger:'blur'},
          {required:true,trigger:'blur',validator:isNumber},
        ],
        maxRandom:[
          {required:true,message:'请输入数量随机上限',trigger:'blur'},
          {required:true,trigger:'blur',validator:isNumber},
        ],
        minRandom:[
          {required:true,message:'请输入数量随机下限',trigger:'blur'},
          {required:true,trigger:'blur',validator:isNumber},
        ],
        maxRate:[
          {required:true,message:'请输入最大下单频率',trigger:'blur'},
          {required:true,trigger:'blur',validator:isNumber},
          {required:true,trigger:'blur',validator:checkMaxRate},
        ],
        minRate:[
          {required:true,message:'请输入最小下单频率',trigger:'blur'},
          {required:true,trigger:'blur',validator:isNumber},
          {required:true,trigger:'blur',validator:checkMinRate},
        ],
      }
      let buyForm = {
        robotIP: '',
        exchange: '',
        apiKey: '',
        secretKey: '',
        coin: '',
        upRate: '',
        downRate: '',
        upPrice: '',
        downPrice:'',
        maxPrice: '',
        minPrice: '',
        maxRandom: '',
        minRandom: '',
        maxRate: '',
        minRate: 10,
      }
      let prodId = null
      let btnTxt = '立即购买'
      if(this.showFlag){
        buyRules.robotIP=[{required:true,message:'请输入机器人IP',trigger:'blur'}]
        buyRules.exchange=[{required:true,message:'请选择交易所',trigger:'change'}]
        buyRules.coin=[
          {required:true,message:'请输入交易对',trigger:'blur'},
          {required:true,trigger:'blur',validator:validateCoin}
        ]
      }else{
        btnTxt = '修改机器人'
        prodId = this.editData.product_id
        buyForm.exchange = this.editData.exchange_id
        buyForm.apiKey = this.editData.api_key
        buyForm.secretKey = ''
        buyForm.coin = this.editData.symbol
        buyForm.upRate = this.editData.up_percent
        buyForm.downRate = this.editData.down_percent
        buyForm.upPrice = this.editData.up_unit
        buyForm.downPrice = this.editData.down_unit
        buyForm.maxPrice = this.editData.max_price
        buyForm.minPrice = this.editData.min_price
        buyForm.maxRandom = this.editData.max_amount
        buyForm.minRandom = this.editData.min_amount
        buyForm.maxRate = this.editData.max_interval
        buyForm.minRate = this.editData.min_interval
      }

      return {
        btnTxt:btnTxt,
        buyForm:buyForm,
        buyRules:buyRules,
        span:{
          col1:8,
          col2:16
        },
        num:null,
        id:prodId,
        price:null,
        prodList:[],
        validExchange:null
      }
    },
    methods: {
      submitForm() {
        this.$refs.buyForm.validate(valid => {
          if(valid){
            let param = {
              product_id:this.id,
              exchange_id:this.buyForm.exchange,
              api_key:this.buyForm.apiKey,
              api_secret:this.buyForm.secretKey,
              symbol:this.buyForm.coin,
              max_interval:this.buyForm.maxRate,
              min_interval:this.buyForm.minRate,
              max_amount:this.buyForm.maxRandom,
              min_amount:this.buyForm.minRandom,
              up_percent:this.buyForm.upRate,
              down_percent:this.buyForm.downRate,
              up_unit:this.buyForm.upPrice,
              down_unit:this.buyForm.downPrice,
              max_price:this.buyForm.maxPrice,
              min_price:this.buyForm.minPrice
            }
            let type = 'add'
            if(!this.showFlag){
              param.bot_id = this.editData.id
              type = 'revise'
            }
            serviceManger.robotOperator(param,type).then(res => {
              if(res.code==0){
                this.cancelForm()
                this.$message(res.msg)
              }
            })
          }else{
            this.$message.error('输入有误，请从新输入')
            return false
          }
        })
      },
      
      cancelForm(){
        if(this.showFlag){
          this.$refs.buyForm.resetFields();
        }else{
          this.$emit('changeDialog',false)
        }
      },
      changePro(val){
        let splitArr = val.split('/')
        this.price = splitArr[1]
        this.id = splitArr[0]
      }
    },
    created(){
      serviceManger.getProduct().then(res => {
        if(res.code == 0){
          res.data.forEach(item => {
            let obj = {
              id:item.id + "/"+ item.amount,
              name:item.name
            }
            this.prodList.push(obj)
            this.num = res.data[0].id +"/"+res.data[0].amount
            this.price = res.data[0].amount
            this.id = res.data[0].id
          })
        }else{
          this.$message(res.msg)
        }
      })
      if(this.showFlag){
        serviceManger.getExchange().then(res => {
          if(res.code == 0){
            this.validExchange = res.data.filter(item =>{
              return item.status == 1
            })
            
          }else{
            this.$message(res.msg)
          }
        })

        serviceManger.getRobotIP().then(res =>{
          if(res.code == 0){
            this.buyForm.robotIP = res.ip
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.add-product{
  width: 90%;
  margin-left: 4%;
  margin-right: 6%;
  margin-top: 30px;
  text-align: left;
  .el-col-2{
    text-align: center;
  }
  .lh-1{
    line-height: 1.2;
  }
  .red{
    color:red;
  }
  .pt-24{
    padding-top: 24px;
    font-weight: 700;
  }
}
.el-select{
  width: 100%;
}
.el-col-16{
  padding-left: 16px;
  color:#909399
}
</style>

