<template>
  <div class="page">
    <el-row :gutter="10" class="w-full">
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>v-chart 指令</span>
            <el-button type="text" @click="changeChartOption1">修改</el-button>
          </div>
          <div class="chart" v-chart="chartOption1"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>异步数据</span>
            <el-button type="text" @click="loadChartOption2">加载</el-button>
          </div>
          <div class="chart" v-chart="chartOption2" ref="chart2"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>下钻</span>
          </div>
          <div class="chart" v-chart="chartOption3" ref="chart3"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>形变动画</span>
          </div>
          <div class="chart" v-chart.refresh="chartOption4" ref="chart4"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    xAxisArr1: ["星期一", "星期二", "星期三"],
    series1: [
      {
        name: "数量",
        type: "line",
        data: [3, 6, 2],
      },
      {
        name: "其它",
        type: "line",
        data: [3, 6, 2],
      },
    ],

    xAxisArr2: [],
    seriesArr2: [],
    timer2: 0,

    xAxisArr3: ["2020", "2021", "2022"],
    seriesArr3: [300, 400, 500],
    seriesChild: {
      2020: {
        type: ["01", "02", "03", "04", "05"],
        data: [50, 60, 70, 80, 40],
      },
      2021: {
        type: ["一", "二", "三", "四"],
        data: [50, 100, 170, 80],
      },
      2022: {
        type: ["工具", "食品", "图书", "服装"],
        data: [150, 100, 170, 80],
      },
    },
    isToggleChart3: false,
    chartOption3_2: null,

    isRenderBar: true,
    timer4: 0,
  }),
  mounted() {
    this.bindChart3Click();
    this.loopChartOption4();
  },
  beforeDestroy() {
    clearInterval(this.timer2);
    clearInterval(this.timer4);
    this.timer2 = 0;
    this.timer4 = 0;
  },
  computed: {
    chartOption1() {
      return {
        xAxis: {
          data: this.xAxisArr1,
        },
        yAxis: {},
        series: this.series1,
      };
    },
    chartOption2() {
      return {
        xAxis: {
          data:
            this.xAxisArr2.length > 5
              ? this.xAxisArr2.slice(-5)
              : this.xAxisArr2,
        },
        yAxis: {},
        series: [
          {
            type: "line",
            smooth: true,
            data:
              this.seriesArr2.length > 5
                ? this.seriesArr2.slice(-5)
                : this.seriesArr2,
          },
        ],
      };
    },
    chartOption3() {
      return !this.isToggleChart3 ? this.chartOption3_1 : this.chartOption3_2;
    },
    chartOption3_1() {
      return {
        xAxis: {
          data: this.xAxisArr3,
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: this.seriesArr3.map((el, idx) => ({
              value: el,
              groupId: this.xAxisArr3[idx],
            })),
          },
        ],
        graphic: [
          {
            type: "text",
            right: 50,
            top: 20,
            style: {
              text: "",
              fontSize: 10,
              color: "blue",
            },
          },
        ],
      };
    },
    chartOption4_bar() {
      return {
        xAxis: {
          data: this.xAxisArr1,
        },
        yAxis: {},
        series: [
          {
            id: "chart4", // 通过 id 关联需要过渡动画的系列
            type: "bar",
            colorBy: "data",
            data: this.xAxisArr1.map(() => Math.floor(20 + Math.random() * 10)),
            universalTransition: true,
            animationDurationUpdate: 1000,
          },
        ],
      };
    },
    chartOption4_pie() {
      return {
        series: [
          {
            id: "chart4", // 通过 id 关联需要过渡动画的系列
            type: "pie",
            colorBy: "data",
            data: this.xAxisArr1.map((el) => ({
              name: el,
              value: Math.floor(20 + Math.random() * 10),
            })),
            universalTransition: true,
            animationDurationUpdate: 1000,
          },
        ],
      };
    },
    chartOption4() {
      return this.isRenderBar ? this.chartOption4_bar : this.chartOption4_pie;
    },
  },
  methods: {
    changeChartOption1() {
      this.xAxisArr1.push("星期四");
      this.$set(this.series1[0], "data", [...this.series1[0].data, 10]);
      this.$set(this.series1[1], "data", [...this.series1[1].data, 12]);
    },

    loadChartOption2() {
      const chartIns = this.$refs.chart2.chart;
      chartIns.showLoading();
      setTimeout(() => {
        chartIns.hideLoading();
        this.createMockData2();
      }, 2000);
    },
    createMockData2() {
      this.timer2 = setInterval(() => {
        this.xAxisArr2.push(this.$dayjs().format("mm:ss"));
        this.seriesArr2.push(10 + Math.random() * 10);
      }, 1100);
    },

    bindChart3Click() {
      const chartIns = this.$refs.chart3.chart;
      chartIns.on("click", ({ data }) => {
        if (!(data && data.groupId)) return;
        const obj = this.seriesChild[data.groupId];
        if (!obj) return;
        this.chartOption3_2 = {
          xAxis: {
            data: obj.type,
          },
          series: {
            type: "bar",
            dataGroupId: data.groupId,
            data: obj.data,
            universalTransition: {
              enabled: true,
              divideShape: "clone",
            },
          },
          graphic: [
            {
              type: "text",
              right: 50,
              top: 20,
              style: {
                text: "返回",
                fontSize: 14,
                fill: "#409EFF",
              },
              onclick: () => {
                chartIns.setOption(this.chartOption3);
                this.isToggleChart3 = !this.isToggleChart3;
              },
            },
          ],
        };
        this.isToggleChart3 = !this.isToggleChart3;
      });
    },

    loopChartOption4() {
      this.timer4 = setInterval(
        () => (this.isRenderBar = !this.isRenderBar),
        3000
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 300px;
}
</style>
