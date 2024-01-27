<template>
  <v-container class="board-detail">
    <v-row class="common-buttons">
      <v-btn @click="fnUpdate()">수정</v-btn>&nbsp;
      <v-btn @click="fnDelete()">삭제</v-btn>&nbsp;
      <v-btn @click="fnList()">목록</v-btn>
    </v-row>
    <v-col class="board-contents">
      <h3>{{ state.title }}</h3>
      <div>
        <strong>{{ state.author }}</strong>
        <br>
        <span>{{ state.created_at }}</span>
      </div>
    </v-col>
    <v-col class="board-contents">
      <span>{{ state.contents }}</span>
    </v-col>
    <v-row class="common-buttons">
      <v-btn @click="fnUpdate()">수정</v-btn>&nbsp;
      <v-btn @click="fnDelete()">삭제</v-btn>&nbsp;
      <v-btn @click="fnList()">목록</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const axios = inject('axios')
const serverUrl = inject('serverUrl')

const state = reactive({
  requestBody: route.query,
  idx: route.query.idx,

  title: '',
  author: '', 
  contents: '',
  created_at: ''
})

const fnGetView = async () => {
  try {
    const response = await axios.get(`${serverUrl}/board/${state.idx}`, {
    params: state.requestBody
    })

    console.log(response)

    state.title = response.data.title
    state.author = response.data.author
    state.contents = response.data.contents
    state.created_at = response.data.created_at

    console.log(state.title)
    console.log(state.author)
    console.log(state.contents)
    console.log(state.created_at)

  } catch (err) {
    console.log(err.message)
    if (err.message.indexOf('Network Error') > -1) {
      alert('네트워크가 원활하지 않습니다. \n잠시 후 다시 시도해주십시오.')
    }
  }
}

const fnList = () => {
  delete state.requestBody.idx
  router.push({
    path: './list',
    query: state.requestBody
  })
}

const fnUpdate = () => {
  router.push({
    path: './write',
    query: state.requestBody
  })
}

const fnDelete = () => {
  if (!confirm("삭제하시겠습니까?")) return

  try {
    axios.delete(`${serverUrl}/board/${state.idx}`)
    alert("삭제되었습니다.")
    fnList()

  } catch (err) {
    console.log(err)
  }
}

onMounted(fnGetView)
</script>

<style scoped>

</style>