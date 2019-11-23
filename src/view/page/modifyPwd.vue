<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="old">
      <el-col :span='12'>
        <el-input type="password" v-model="ruleForm2.old" auto-complete="off"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="新密码" prop="new">
      <el-col :span='12'>
        <el-input type="password" v-model="ruleForm2.new" auto-complete="off"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="确认密码" prop="check">
      <el-col :span='12'>
        <el-input v-model="ruleForm2.check" auto-complete="off"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import serviceManger from '@/service/index'
  export default {
    data() {
      var validateNew = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入新密码'));
        }else{
          callback()
        }
      };
      var validateOld = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        }else{
          callback()
        }
      };
      var checkNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空'));
        } else if (value !== this.ruleForm2.new) {
          console.log(value,this.ruleForm2.new)
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          old: '',
          check: '',
          new: ''
        },
        rules2: {
          old: [
            { validator: validateOld, trigger: 'blur' }
          ],
          new: [
            { validator: validateNew, trigger: 'blur' }
          ],
          check: [
            { validator: checkNewPwd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              old_password:this.ruleForm2.old,
              new_password:this.ruleForm2.new
            }
            serviceManger.modifyPwd(param).then(res =>{
              this.$message(res.msg)
              this.$refs[formName].resetFields();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>