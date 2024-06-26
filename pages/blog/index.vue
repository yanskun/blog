<template lang="pug">
div(class="container mx-auto px-4 py-5")
  div(class="mx-auto")
    card.my-5(
      v-for="d in currentArticles"
      :to="d._path"
      :key="d._path"
      :icon="d.icon"
      :title="d.title"
      :tags="d.tags"
      :date="d.date"
    )
    .flex.justify-center
      .btn-group
        button.btn(
          v-for="i in Math.ceil(articles.length / PER_PAGE)"
          :key="i"
          @click="onClick(i)"
          :class="{ 'btn-active': current === i - 1}"
        ) {{ i }}

</template>

<script setup lang="ts">
useHead({
  title: 'Blog'
})

const { data: contents } = await useAsyncData('blog', () => queryContent('/blog').sort({ date: -1 }).find())

const qiita = await useFetch('/api/qiita').then((res) => {
  const qiitaData = res.data.value as any[]
  return qiitaData.map((d) => {
    return {
      _path: d.url,
      title: d.title,
      date: d.created_at,
      tags: d.tags.map((t) => t.name),
      icon: '💚',
    }
  })
})

const zenn = await useFetch('/api/zenn').then((res) => {
  const { articles: zennData } = res.data.value as { articles: any[] }
  return zennData.map((d) => {
    return {
      _path: `https://zenn.dev${d.path}`,
      title: d.title,
      date: d.published_at,
      tags: [d.article_type],
      icon: d.emoji,
    }
  })
})

const articles = computed(() => {
  if (!contents.value) {
    return []
  }
  const data = [...contents.value, ...qiita, ...zenn]
  return data.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})

const PER_PAGE = 5
const current = ref(0)
const currentArticles = computed(() => {
  const start = current.value === 0 ? 0 : current.value * PER_PAGE
  const end = current.value * PER_PAGE + PER_PAGE
  return articles.value.slice(start, end)
})

const onClick = (i: number) => {
  current.value = i - 1
}

onMounted(() => {
  if (contents.value && !contents.value.length) {
    location.reload()
  }
})
</script>
