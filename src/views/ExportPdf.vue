<template>
  <div class="exportPdf">
    <el-button type="primary" @click="handleExport">导出</el-button>
    <div id="table" ref="table">
      <el-table :data="tableData" border stripe height="200px">
        <template v-for="(column, idx) of columns">
          <el-table-column :key="idx" v-bind="column"></el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import html2Canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default {
  data: () => ({
    tableData: [],
    columns: [
      { type: "index", label: "序号", width: 50 },
      { prop: "key1", label: "key1" },
      { prop: "key2", label: "key2" },
      { prop: "key3", label: "key3" },
    ],
  }),
  mounted() {
    this.tableData = new Array(200).fill({
      key1: Math.floor(Math.random() * 200),
      key2: Math.floor(Math.random() * 200),
      key3: Math.floor(Math.random() * 200),
    });
  },
  methods: {
    handleExport() {
      const dom = document.createElement("div");

      dom.appendChild(this.$refs.table.cloneNode(true));
      dom.querySelector(".el-table").style.height = "auto";
      dom.querySelector(".el-table__body-wrapper").style.height = "auto";

      dom.setAttribute("id", "dom");
      dom.style.position = "fixed";
      dom.style.top = "-9999px";
      document.body.appendChild(dom);

      html2Canvas(document.querySelector("#dom")).then((canvas) => {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        let pageHeight = (contentWidth / 592.28) * 841.89;
        let leftHeight = contentHeight;
        let position = 0;
        let imgWidth = 595.28;
        let imgHeight = (592.28 / contentWidth) * contentHeight;
        let pageData = canvas.toDataURL("image/jpeg", 1.0);
        let PDF = new jsPDF("", "px", "a4");
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        PDF.save("导出" + ".pdf");
        document.body.removeChild(dom);
      });
    },
  },
};
</script>

<style></style>
