<template>
  <div class="payDetail">
    <el-steps :active="2">
      <el-step title="报价" icon="el-icon-edit"></el-step>
      <el-step title="完善信息" icon="el-icon-upload"></el-step>
      <el-step title="确认订单" icon="el-icon-s-order"></el-step>
      <el-step title="付款" icon="el-icon-shopping-cart-2"></el-step>
    </el-steps>
    <div class="process">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="文档类型：">
          <el-select v-model="form.docType" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Order",
  props: {
    ifcontent: String,
    default: null,
  },
  data() {
    return {
      form: {
        docType: "",
      },
    };
  },
  methods: {},
};
</script>