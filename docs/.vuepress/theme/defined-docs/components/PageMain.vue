<template>
  <main
    class="page"
    style="
      padding-top: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      padding-right: 0px;
    "
  >
    <div class="theme-default-content page-main">
      <Content />
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Page",
});
</script>

<style scoped>
.page-main {
  max-width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
}
</style>
