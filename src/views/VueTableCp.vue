<template>
  <div class="page">
    <h2>封装 el-table 组件，配置式使用，无需写样板代码</h2>
    <el-row :gutter="10" class="w-full">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>vue-table 组件</span>
          </div>
          <vue-table
            :data="tableData"
            :columns="columns"
            :options="options"
            :loading="loading"
          ></vue-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>动态修改</span>
            <el-button type="text" @click="handleAdd2">添加</el-button>
          </div>
          <vue-table
            :data="tableData2"
            :columns="columns2"
            :options="options"
          ></vue-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>使用 slot</span>
          </div>
          <vue-table :data="tableData" :columns="columns" :options="options">
            <template #key1_header="{ column }">
              {{ `表头：${column.label}` }}
            </template>
            <template #key1="{ row }">{{ `值：${row.key1}` }}</template>
          </vue-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>多级表头</span>
          </div>
          <vue-table :data="tableData4" :columns="columns4" :options="options">
          </vue-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    tableData: [
      { key1: 1, key2: 2 },
      { key1: 2, key2: 3 },
    ],
    columns: [
      { type: "index", label: "序号", width: 50 },
      { prop: "key1", label: "key1" },
      { prop: "key2", label: "key2" },
    ],
    options: {
      border: true,
      stripe: true,
      "show-summary": true,
    },
    loading: false,

    tableData2: [
      { key1: 1, key2: 2, key3: 3 },
      { key1: 2, key2: 3, key3: 4 },
    ],
    columns2: [
      { type: "index", label: "序号", width: 50 },
      { prop: "key1", label: "key1" },
      { prop: "key2", label: "key2" },
    ],
    options2: {
      border: true,
      stripe: true,
    },

    tableData4: [
      { key1: 1, key2: 2, key3: 3, key4: 4, key5: 5 },
      { key1: 2, key2: 3, key3: 3, key4: 4, key5: 5 },
    ],
    columns4: [
      { type: "index", label: "序号", width: 50 },
      {
        label: "一级",
        children: [
          {
            prop: "key1",
            label: "key1",
          },
          {
            label: "二级",
            children: [
              {
                prop: "key2",
                label: "key2",
              },
              {
                prop: "key3",
                label: "key3",
              },
            ],
          },

          { prop: "key4", label: "key4" },
        ],
      },
      { prop: "key5", label: "key5" },
    ],
  }),
  mounted() {
    this.setTable1Loading();
  },
  methods: {
    setTable1Loading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },

    handleAdd2() {
      this.columns2.push({ prop: "key3", label: "key3" });
    },
  },
};
</script>
<style scoped></style>
