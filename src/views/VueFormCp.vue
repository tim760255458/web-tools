<template>
  <div class="page">
    <h2>封装 el-form 组件，配置式使用，无需写样板代码</h2>
    <h3>组件一（不支持嵌套）</h3>
    <el-row :gutter="10" class="w-full">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>vue-form 组件</span>
          </div>
          <vue-form :items="items1" :options="options1">
            <template #key3>
              <el-button type="primary">查询</el-button>
            </template>
          </vue-form>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>vue-select / vue-radio / vue-checkbox</span>
            <el-button type="primary" @click="handleForm2LoadData"
              >设置字典</el-button
            >
          </div>
          <vue-form ref="form2" :items="items2" :options="options1">
            <template #btns>
              <el-button type="primary">查询</el-button>
            </template>
          </vue-form>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>可折叠</span>
            <el-button type="primary" @click="handleForm3Toggle"
              >切换</el-button
            >
          </div>
          <vue-form ref="form3" :items="items3" :options="options1">
            <template #btns>
              <el-button type="primary">查询</el-button>
            </template>
          </vue-form>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>级联</span>
          </div>
          <vue-form ref="form4" :items="items4" :options="options1">
            <template #btns>
              <el-button type="primary">查询</el-button>
            </template>
          </vue-form>
        </el-card>
      </el-col>
    </el-row>
    <h3>组件二（支持嵌套）</h3>
    <el-row :gutter="10" class="w-full">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>vue-form-two 组件</span>
          </div>
          <vue-form-two ref="form5" :options="options2" />
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleCancel">重置</el-button>
          <el-button type="primary" @click="handleMore">更多</el-button>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>无限嵌套</span>
          </div>
          <vue-form-two ref="form6" :options="options3" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>vue-select / vue-radio / vue-checkbox</span>
            <el-button type="primary" @click="handleForm7LoadData"
              >设置字典</el-button
            >
          </div>
          <vue-form-two ref="form7" :options="options4" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>vue-upload(需要配置上传接口)</span>
          </div>
          <vue-form-two ref="form8" :options="options5" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    options1: {
      inline: true,
    },
    options2: {
      attrs: {
        size: "mini",
        inline: true,
      },
      items: [
        {
          key: 1,
          attrs: {
            prop: "name",
            label: "名称",
            default: "1",
            toggle: true,
            rules: [{ required: true, message: "必填项" }],
          },
          render: { is: "el-input", placeholder: "请输入" },
        },
        {
          key: 2,
          attrs: { prop: "type", label: "类型" },
          render: { is: "el-input", placeholder: "请输入" },
        },
        {
          key: 3,
          attrs: { label: "日期" },
          children: [
            {
              key: 4,
              attrs: { prop: "timeStart" },
              render: {
                is: "el-date-picker",
                type: "date",
                placeholder: "请选择",
              },
            },
            {
              key: 5,
              attrs: { prop: "timeEnd", label: "-" },
              render: {
                is: "el-date-picker",
                type: "date",
                placeholder: "请选择",
              },
            },
          ],
        },
      ],
    },
    options3: {
      attrs: {
        size: "mini",
        inline: true,
        labelWidth: "70px",
      },
      items: [
        {
          key: 3,
          attrs: { label: "日期" },
          children: [
            {
              key: 4,
              attrs: { prop: "timeStart", label: "开始" },
              render: {
                is: "el-date-picker",
                type: "date",
                placeholder: "请选择",
              },
            },
            {
              key: 5,
              attrs: { prop: "timeEnd", label: "结束" },
              render: {
                is: "el-date-picker",
                type: "date",
                placeholder: "请选择",
              },
              children: [
                {
                  key: 6,
                  attrs: { prop: "timeEnd_1", label: "结束-1" },
                  render: {
                    is: "el-date-picker",
                    type: "date",
                    placeholder: "请选择",
                  },
                  children: [
                    {
                      key: 7,
                      attrs: { prop: "timeEnd_1_1", label: "结束-1-1" },
                      render: {
                        is: "el-date-picker",
                        type: "date",
                        placeholder: "请选择",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    options4: {
      attrs: {
        size: "mini",
        inline: true,
      },
      items: [
        {
          key: 1,
          attrs: {
            prop: "key1",
            label: "select 示例",
          },
          render: {
            is: "vue-select",
            placeholder: "请选择",
            dictionaryKey: "key1",
          },
        },
        {
          key: 2,
          attrs: { prop: "key2", label: "radio 示例" },
          render: { is: "vue-radio", dictionaryKey: "key1" },
        },
        {
          key: 3,
          attrs: { prop: "key3", label: "radio 示例2" },
          render: {
            is: "vue-radio",
            dictionaryKey: "key1",
            childName: "el-radio-button",
          },
        },
        {
          key: 4,
          attrs: {
            prop: "key4",
            default: [],
            label: "checkbox 示例(必须有默认值)",
          },
          render: {
            is: "vue-checkbox",
            dictionaryKey: "key1",
          },
        },
      ],
    },
    options5: {
      attrs: {
        size: "mini",
        inline: true,
      },
      items: [
        {
          key: 1,
          attrs: {
            prop: "image",
            label: "相关照片",
          },
          render: {
            is: "vue-upload",
            placeholder: "上传图片",
            multiple: true,
          },
        },
      ],
    },
  }),
  computed: {
    items1() {
      return [
        {
          itemOptions: { prop: "key1", label: "姓名" },
          inputOptions: { is: "el-input", props: { placeholder: "请输入" } },
        },
        {
          itemOptions: { prop: "key2", label: "年龄" },
          inputOptions: {
            is: "el-input",
            props: { placeholder: "请输入", type: "number" },
          },
        },
        {
          itemOptions: { prop: "key3" },
          inputOptions: {},
        },
      ];
    },
    items2() {
      return [
        {
          itemOptions: { prop: "key1", label: "select 示例" },
          inputOptions: {
            is: "vue-select",
            props: { placeholder: "请选择", dictionaryKey: "key1" },
          },
        },
        {
          itemOptions: { prop: "key2", label: "radio 示例" },
          inputOptions: {
            is: "vue-radio",
            props: { dictionaryKey: "key1" },
          },
        },
        {
          itemOptions: { prop: "key3", label: "radio 示例2" },
          inputOptions: {
            is: "vue-radio",
            props: { dictionaryKey: "key1", childName: "el-radio-button" },
          },
        },
        {
          itemOptions: { prop: "key4", label: "checkbox 示例(必须有默认值)" },
          inputOptions: {
            is: "vue-checkbox",
            defaultValue: [],
            props: { dictionaryKey: "key1" },
          },
        },
        {
          itemOptions: { prop: "btns" },
          inputOptions: {},
        },
      ];
    },
    items3() {
      return [
        {
          itemOptions: { prop: "key1", label: "姓名" },
          inputOptions: { is: "el-input", props: { placeholder: "请输入" } },
        },
        {
          toggle: true,
          itemOptions: { prop: "key2", label: "年龄" },
          inputOptions: {
            is: "el-input",
            props: { placeholder: "请输入", type: "number" },
          },
        },
        {
          itemOptions: { prop: "btns" },
          inputOptions: {},
        },
      ];
    },
    items4() {
      return [
        {
          itemOptions: { prop: "key1", label: "级联" },
          inputOptions: {
            is: "vue-cascader",
            props: { placeholder: "请选择", dictionaryKey: "key1" },
          },
        },
        {
          itemOptions: { prop: "btns" },
          inputOptions: {},
        },
      ];
    },
  },
  mounted() {
    this.setForm4Data();
  },
  methods: {
    handleForm2LoadData() {
      const formIns = this.$refs.form2;
      formIns.setDictionary("key1", [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ]);
    },

    handleForm3Toggle() {
      this.$refs.form3.handlerToggle();
    },

    setForm4Data() {
      this.$refs.form4.setDictionary("key1", [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
      ]);
    },

    async handleSearch() {
      const formIns = this.$refs.form5;
      try {
        const validateVal = await formIns.command("validate");
        if (validateVal) {
          const obj = formIns.getFormModel();
          console.log(obj);
        }
      } catch (error) {
        // 表单校验不通过
        console.log(error);
      }
    },
    handleCancel() {
      this.$refs.form5.command("resetFields");
    },
    handleMore() {
      this.$refs.form5.toggleItem();
    },

    handleForm7LoadData() {
      const formIns = this.$refs.form7;
      formIns.setDictionary("key1", [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ]);
    },
  },
};
</script>
<style lang="scss" scoped></style>
