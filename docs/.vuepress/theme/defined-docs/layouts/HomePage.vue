<template>
  <div align="center" class="home-front">
    <div class="home-content" style="height: calc(100vh - 120px); padding-top: 100px; padding-bottom: 20px">
      <div class="home-card" style="height: 100%">
        <div style="height: 100%; display: flex; align-items: center">
          <el-empty description="官网布置中" style="width: 100%;"></el-empty>
        </div>
        <div align="right" class="home-card-1-roadmap-btn" style="position: relative; width: 100%">
          <el-link class="defined-link-small" href="/java-server/roadmap/" type="primary">了解项目进度</el-link>
        </div>
      </div>   
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomePage",
};
</script>

<style scoped>
@media (max-width: 1080px) {
  h1 {
    font-size: 30px;
  }
  h2 {
    font-size: 17px;
    border: 0px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .home-text-field {
    text-align: left;
  }
  .home-card-1-title {
    margin-bottom: 35px;
  }
  .home-card-1-btn {
    margin-bottom: 45px;
  }
  .home-card-1-roadmap-btn {
    right: 4px;
    bottom: 40px;
  }
}
@media (min-width: 1081px) {
  h1 {
    font-size: 52px;
  }
  h2 {
    font-size: 28px;
    border: 0px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .home-text-field {
    text-align: center;
  }
  .home-card-1-title {
    margin-bottom: 40px;
  }
  .home-card-1-btn {
    margin-bottom: 30px;
  }
  .home-card-1-roadmap-btn {
    right: 20px;
    bottom: 50px;
  }
}
</style>

<style scoped>
.home-front {
  width: 100%;
  height: 100vh;
  margin-top: -80px;
}
.home-content {
  max-width: 1240px;
  padding-left: 20px;
  padding-right: 20px;
}
.home-card {
  background-color: #fbfcfd;
  border-radius: 26px;
  border: 0.2px solid #eaecef;
  padding-left: 20px;
  padding-right: 20px;
}
</style>

<!-- 在当前页面的桌面状态下隐藏侧栏 -->
<style>
@media screen and (min-width: 1081px) {
  .docs-sidebar-on-homepage{
    transform: translateX(-100%) !important;
  }
}
</style>