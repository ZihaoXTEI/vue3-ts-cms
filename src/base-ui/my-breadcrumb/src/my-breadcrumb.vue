<template>
  <div class="my-breadcrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">
        <el-breadcrumb-item :to="{ path: breadcrumb.path }">
          {{ breadcrumb.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import type { IBreadcrumb } from '../types'

export default defineComponent({
  name: 'my-breadcrumb',
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>
