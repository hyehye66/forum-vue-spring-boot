<template>
  <v-container class="board-detail">
    <v-row class="common-buttons">
      <v-btn color="blue-grey" class="mx-1" @click="fnSave">저장</v-btn>&nbsp;
      <v-btn color="grey" class="mx-1" @click="fnList">목록</v-btn>
    </v-row>
    <v-row class="board-contents">
      <v-text-field v-model="title" label="제목을 입력해주세요." outlined dense></v-text-field>
      <v-text-field v-model="author" label="작성자를 입력해주세요." outlined dense v-if="idx === undefined"></v-text-field>
    </v-row>
    <v-row class="board-contents">
      <v-textarea v-model="contents" label="내용" outlined dense rows="10" no-resize></v-textarea>
    </v-row>
    <v-row class="common-buttons">
      <v-btn color="blue-grey" class="mx-1" @click="fnSave">저장</v-btn>
      <v-btn color="grey" class="mx-1" @click="fnList">목록</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const axios = inject('axios');
const serverUrl = inject('serverUrl');

const requestBody = ref(route.query);
const idx = ref(route.query.idx);
const title = ref('')
const author = ref('')
const contents = ref('')
const created_at = ref('')

const fnGetView = () => {
  if (idx.value !== undefined) {
    axios.get(`${serverUrl}/board/${idx.value}`, {
      params: requestBody.value
    }).then((res) => {
      title.value = res.data.title;
      author.value = res.data.author;
      contents.value = res.data.contents;
      created_at.value = res.data.created_at;
    }).catch((err) => {
      console.log(err);
    });
  }
};

onMounted(fnGetView);

const fnList = () => {
  delete requestBody.value.idx;
  router.push({
    path: './list',
    query: requestBody.value
  });
};

const fnView = (idx) => {
  requestBody.value.idx = idx;
  router.push({
    path: './detail',
    query: requestBody.value
  });
};

const fnSave = () => {
  let apiUrl = `${serverUrl}/board`;
  let form = {
    'idx': idx.value,
    'title': title.value,
    'contents': contents.value,
    'author': author.value
  };
  // console.log(idx.value);

  if (idx.value === undefined) {
    // INSERT
    axios.post(apiUrl, form).then((res) => {
      alert('글이 저장되었습니다.');
      fnView(res.data.idx);
    }).catch((err) => {
      if (err.message.indexOf('Network Error') > -1) {
        alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
      }
    });
  } else {
    // UPDATE
    axios.patch(apiUrl, form).then((res) => {
      alert('글이 저장되었습니다.');
      fnView(res.data.idx);
    }).catch((err) => {
      if (err.message.indexOf('Network Error') > -1) {
        alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
      }
    });
  }
};

</script>

<style scoped>

</style>