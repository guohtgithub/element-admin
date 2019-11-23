<template>
  <div class="invest">
    <el-col :span="24" class="fonts">我的余额：{{getavatar}} USDT</el-col>
    <el-row>
      <el-col :span="10">
        <div class="center">
          <img src="./Tether-icon.png" alt="" class="icon-img">
        </div>
        <div class="pt-16">
          <p>充值说明：</p>
          <p>1.转入是自动的，转账需要整个网络进行确认，达到。</p>
          <p>2.此地址是您的唯一且独自使用的转入地址，您可以同时进行多次充值</p>
        </div>
        <div class="pt-16">
          <p>注意：</p>
          <p>禁止充USDT以外的资产，发送其他币种到此地址将不可找回</p>
        </div>
      </el-col>
      <el-col :span="14">
        <p class="font-w">充值地址：</p>
        <div class="center pt-48">
          <div id="qrcode" class="ewm-img"></div>
          <div class="url-copy">
            <textarea class="url-link" ref="link" v-model="url" readonly></textarea>
            <span @click="copy">复制链接</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import serviceManger from '@/service/index'
import QRCode from 'qrcodejs2'
export default {
  data(){
    return{
      url:''
    }
  },
  computed:{
    ...mapGetters(['getavatar'])
  },
  created(){
    serviceManger.walletBalance().then(res => {
      if(res.code == 0){
        this.url = res.data.addr
        let qrcode = new QRCode('qrcode', {
          width: 170,
          height: 170,
          text: res.data.addr, 
          textAlign: 'center',
        })
        let img = document.querySelector('#qrcode img')
        img.style.backgroundColor = '#f0f0f0'
        img.style.paddingTop = '10px'
        img.style.paddingLeft = '10px'
        img.style.paddingBottom = '10px'
        img.style.paddingRight = '10px'
        img.style.position = 'relative'
        img.style.left = '50%'
        img.style.transform = 'translate(-50%)'
      }else{
        this.$message(res.msg)
      }
    })
  },
  methods:{
    copy(){
      var text = document.querySelector(".url-link");
      text.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令

      this.$message('复制成功！')
    }
  }
}
</script>

<style scoped>
  .invest{
    background:#f5f7fa;
    padding:20px 30px;
  }
  .fonts{
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 24px;
  }
  .font-w{
    font-weight: 700;
  }
  .icon-img{
    width: 200px;
  }
  .center{
    text-align: center;
  }
  .pt-48{
    padding-top: 48px;
  }
  .pt-16{
    padding-top:16px; 
  }
  .pt-16 p {
    line-height: 2;
  }
  .url-link{
    border: none;
    width: 300px;
    resize:none;
    background:#f5f7fa;
  }
  .url-copy{
    padding-top:24px; 
  }
  .url-copy span{
    color:blue;
    vertical-align: top;
    padding-left: 10px;
  }
</style>