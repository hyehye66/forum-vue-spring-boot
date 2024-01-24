<template>
  <div class="board-list">
    <v-btn class="ma-2" color="blue-grey" @click="fnWrite">등록</v-btn>
    
    <v-simple-table>
      <thead>
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>작성자</th>
        <th>등록일시</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, idx) in list" :key="idx">
        <td>{{ row.idx }}</td>
        <td><a @click="fnView(`${row.idx}`)">{{ row.title }}</a></td>
        <td>{{ row.author }}</td>
        <td>{{ row.created_at }}</td>
      </tr>
      </tbody>
    </v-simple-table>

    <v-pagination v-if="paging.total_list_cnt &gt; 0" v-model="page" :length="paging.total_page_cnt" @input="fnPage"></v-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';

const axios = inject('axios');
const serverUrl = inject('serverUrl');
const route = useRoute();
const list = ref([]);
const page = ref(route.query.page ? parseInt(route.query.page) : 1);
const size = ref(route.query.size ? parseInt(route.query.size) : 10);
const keyword = ref(route.query.keyword);
const paging = ref({
  // 초기 페이징 상태 설정
  block: 0,
  end_page: 0,
  next_block: 0,
  page: 0,
  page_size: 0,
  prev_block: 0,
  start_index: 0,
  start_page: 0,
  total_block_cnt: 0,
  total_list_cnt: 0,
  total_page_cnt: 0,
});

onMounted(() => {
  fnGetList();
});

const fnGetList = async () => {
  try {
    const response = await axios.get(`${serverUrl}/board/list`, {
      params: { keyword: keyword.value, page: page.value, size: size.value },
      headers: {}
    });
    list.value = response.data;
  } catch (error) {
    if (error.message.includes('Network Error')) {
      alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
    }
  }
};

const fnPage = (newPage) => {
  page.value = newPage;
  fnGetList();
};

const fnWrite = () => {
  // 등록 버튼 동작 정의
};

const fnView = (idx) => {
  // 게시물 보기 동작 정의
};
</script>

<style>
/* 여기에 CSS 스타일 추가 */
</style>
