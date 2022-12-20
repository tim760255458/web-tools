<template>
  <div class="home">
    <span>WEB TOOLS</span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  & > span {
    font-size: 32px;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    &:hover {
      font-size: 36px;
      color: cadetblue;
    }
  }
}
</style>
