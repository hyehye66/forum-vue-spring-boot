<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn color="blue" @click="openCreateDialog">새 글 작성</v-btn>
      </v-col>
    </v-row>

    <!-- <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.total_list_cnt &gt; 0">
      <span class="pg">
      <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-bar-item w3-border">&lt;&lt;</a>
      <a href="javascript:;" v-if="paging.start_page &gt; 10" @click="fnPage(`${paging.start_page-1}`)"
         class="prev w3-button w3-bar-item w3-border">&lt;</a>
      <template v-for=" (n,index) in paginavigation()">
          <template v-if="paging.page==n">
              <strong class="w3-button w3-bar-item w3-border w3-green" :key="index">{{ n }}</strong>
          </template>
          <template v-else>
              <a class="w3-button w3-bar-item w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
          </template>
      </template>
      <a href="javascript:;" v-if="paging.total_page_cnt &gt; paging.end_page"
         @click="fnPage(`${paging.end_page+1}`)" class="next w3-button w3-bar-item w3-border">&gt;</a>
      <a href="javascript:;" @click="fnPage(`${paging.total_page_cnt}`)" class="last w3-button w3-bar-item w3-border">&gt;&gt;</a>
      </span>
    </div> -->

    <v-data-table
      :headers="headers"
      :items="boards"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.title`="{ item }">
        <a @click="viewBoard(item.idx)">{{ item.title }}</a>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editBoard(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteBoard(item.idx)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      circle
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios');
const serverUrl = inject('serverUrl');
const router = useRouter();
const boards = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const headers = [
  { text: '번호', value: 'idx' },
  { text: '제목', value: 'title' },
  { text: '작성자', value: 'author' },
  { text: '등록일시', value: 'createdAt' },
  { text: 'Actions', value: 'actions', sortable: false },
];

const fetchBoards = async (page = 1) => {
  try {
    const response = await axios.get(`${serverUrl}/board/list?page=${page}`);
    // console.log(response.data);/
    boards.value = response.data.boards;
    totalPages.value = response.data.totalPages;
    
  } catch (error) {
    console.error("Error fetching boards: ", error);
  }
};

onMounted(() => {
  fetchBoards(currentPage.value);
});

const openCreateDialog = () => {
  // 새 글 작성 로직
};

const viewBoard = (idx) => {
  // 글 상세보기 로직
};

const editBoard = (board) => {
  // 글 수정 로직
};

const deleteBoard = (idx) => {
  // 글 삭제 로직
};
</script>
