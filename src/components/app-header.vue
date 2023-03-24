<template>
  <div class="header">
    <a-dropdown>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1"> 1st menu item </a-menu-item>
          <a-menu-item key="2"> 2nd menu item </a-menu-item>
          <a-menu-item key="3"> 3rd item </a-menu-item>
        </a-menu>
      </template>
      <a-button><EllipsisOutlined /></a-button>
    </a-dropdown>
    <span class="header__text">Текущий проект: Проект 1</span>
    <a-button><SettingOutlined /></a-button>
    <a-button><UserDeleteOutlined /></a-button>
  </div>
</template>

<script setup>
import { EllipsisOutlined, SettingOutlined, UserDeleteOutlined } from '@ant-design/icons-vue'
const handleMenuClick = (e) => {
  console.log('click', e)
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.header__text {
  display: inline-block;
}
</style>
