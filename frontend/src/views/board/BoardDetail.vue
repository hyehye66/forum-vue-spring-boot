<template>
  <v-container class="board-detail">
    <v-row class="common-buttons">
      <v-btn @click="fnUpdate()">수정</v-btn>&nbsp;
      <v-btn @click="fnDelete()">삭제</v-btn>&nbsp;
      <v-btn @click="fnList()">목록</v-btn>
    </v-row>
    <v-col class="board-contents">
      <h3>{{ title }}</h3>
      <p>
        <strong>{{ author }}</strong>
        <br>
        <span>{{ created_at }}</span>
      </p>
    </v-col>
    <v-col class="board-contents">
      <span>{{ contents }}</span>
    </v-col>
    <v-row class="common-buttons">
      <v-btn @click="fnUpdate()">수정</v-btn>&nbsp;
      <v-btn @click="fnDelete()">삭제</v-btn>&nbsp;
      <v-btn @click="fnList()">목록</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const axios = inject('axios')
const serveUrl = inject('serverUrl')

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
    const response = await axios.get(`${serverUrl}` + '/board/' + state.idx, {
    params: state.requestBody
    })
    state.title = response.data.title
    state.author = response.data.author
    state.contents = response.data.contents
    state.created_at = response.data.created_at

  } catch (err) {
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
  try {
    if (!confirm("삭제하시겠습니까?")) return

    axios.delete(serverUrl + '/board/' + state.idx, {})
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