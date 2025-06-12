<script setup lang="ts">
import { reactive } from 'vue'
import { ideas } from '../../data/ideas'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// 扩展 dayjs 插件
dayjs.extend(relativeTime)

// 将 ideas 转换为响应式数据
const state = reactive({
  ideas: ideas.map(idea => ({
    ...idea,
    comments: [] // 为每个想法添加评论数组
  })),
})

// 格式化日期方法
function formatDate(date: string): string {
  const now = dayjs()
  const ideaDate = dayjs(date)

  if (ideaDate.isSame(now, 'day')) {
    return `今天 ${ideaDate.format('HH:mm')}`
  }

  if (ideaDate.isSame(now.subtract(1, 'day'), 'day')) {
    return '昨天'
  }

  if (ideaDate.isSame(now.subtract(2, 'day'), 'day')) {
    return '前天'
  }

  const diffDays = now.diff(ideaDate, 'day')

  // 如果距今超过 15 天，显示完整日期，否则显示相对时间
  return diffDays > 15 ? ideaDate.format('YYYY-MM-DD') : ideaDate.fromNow()
}
</script>

<template>
  <ul>
    <li
      v-for="(idea, idx) in state.ideas"
      :key="idx"
      class="group mb-8 mt-[50px] flex flex-col gap-2"
      style="opacity: 1; transform: none;"
    >
  
      <div class="flex gap-4">
        <div class="flex flex-row items-center gap-2 text-base">
          <span class="font-semibold whitespace-nowrap">{{ idea.author }}</span>
          <span class="text-sm text-zinc-500 whitespace-nowrap">{{ formatDate(idea.date) }}</span>
        </div>
      </div>
      <div class="min-w-0 max-w-full mt-0 pl-4 md:pl-14">
        <div class="relative w-full min-w-0">
          <div
            class="relative inline-block rounded-xl p-3 py-0 text-zinc-800 dark:text-zinc-200 rounded-tl-sm bg-zinc-600/5 dark:bg-zinc-500/20 max-w-full overflow-auto"
            style="margin-top: 15px; margin-left: -40px;"
            >
            <div class="markdown_md__SEzck text-base">
              <p>{{ idea.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
/* Add any additional styles here */
</style>