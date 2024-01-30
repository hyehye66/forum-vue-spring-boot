<template>
  <v-container class="board-list">
    <!-- <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field> -->
    <v-row class="common-buttons">
      <v-btn rounded color="blue-grey" @click="fnWrite">글쓰기</v-btn>
    </v-row>

    <!-- 게시판 리스트 테이블 -->
    <v-data-table :headers="tableHeaders" :items="list" class="elevation-1" fixed-header>
      <!-- :search="search" hide-actions v-model:pagination="pagination" -->
      <!-- <template v-slot:header>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일시</th>
        </tr>
      </template> -->
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.idx }}</td>
          <td><a @click="fnView(item.idx)">{{ item.title }}</a></td>
          <td>{{ item.author }}</td>
          <td>{{ item.created_at }}</td>
        </tr>
      </template>
    </v-data-table>

    <!-- 페이지네이션 -->
    <!-- <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div> -->
    <!-- <: &lt; >: &gt; -->
    <!-- 페이지에 표시할 내용이 있을 때만 페이징 컴포넌트를 표시 -->    
    <!-- <v-pagination 
      v-if="paging.total_list_cnt &gt; 0" 
      v-model="paging.page" 
      :length="paging.total_page_cnt" 
      :total-visible="5"
      @input="fnPage"
    ></v-pagination> -->
    
  </v-container>

</template>

<script setup>
import { ref, reactive, onMounted, computed, toRefs, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// useRoute를 사용하여 현재 라우트의 쿼리 파라미터에 접근
const route = useRoute()
const router = useRouter()

// 루트 인스턴스에서 제공된 axios와 serverUrl 주입
const axios = inject('axios')
const serverUrl = inject('serverUrl')

// const search = ref('')
// const pagination = ref({})
// const selected = ref([])

// 반응형 데이터 정의
const state = reactive({
  requestBody: {}, // 리스트 페이지 데이터 전송을 위한 객체
  list: [], // 리스트 데이터
  no: '', // 게시판 숫자 처리
  paging: {
    // block: 0,
    // end_page: 0,
    // next_block: 0,
    page: 0,
    // page_size: 0,
    // prev_block: 0,
    // start_index: 0,
    // start_page: 0,
    // total_block_cnt: 0,
    total_list_cnt: 0,
    total_page_cnt: 0,
  }, // 페이징 데이터
  page: route.query.page || 1, // 현재 페이지 번호
  size: route.query.size || 10, // 페이지당 게시글 수
  keyword: route.query.keyword, // 검색 키워드
})

// 테이블 헤더 정의
const tableHeaders = [
  { text: 'No', value: 'idx' },
  { text: 'Title', value: 'title' },
  { text: 'Author', value: 'author' },
  { text: 'Created at', value: 'created_at' }
]

// 페이지 번호 계산
// const paginavigation = computed(() => {
//   const pageNumber = []
//   const { start_page, end_page } = state.paging
//   for (let i = start_page; i <= end_page; i++) {
//     pageNumber.push(i)
//   }
//   return pageNumber
// })

// 리스트 데이터를 가져오는 함수
const fnGetList = async () => {
  try {
    state.requestBody = {
      keyword: state.keyword,
      page: state.page,
      size: state.size
    }

    const response = await axios.get(`${serverUrl}/board/list`, {
      params: state.requestBody
    })

    // console.log(response.data)
    state.list = response.data
    // state.list = response.data.list
    // state.paging = response.data.paging
    // console.log("Total List Count:", state.paging.total_list_cnt);

  } catch (err) {
    if (err.message.indexOf('Network Error') > -1) {
      alert('네트워크가 원활하지 않습니다. \n잠시 후 다시 시도해주십시오.')
    }
  }
}

// 컴포넌트가 마운트될 때 리스트 데이터 로드
onMounted(fnGetList)

// 게시글 등록 함수
const fnWrite = () => {
  // 등록 버튼 클릭 시 실행될 로직
  router.push({
    path: './write'
  })

}

const fnView = (idx) => {
  // 제목 클릭 시 실행될 로직, idx 사용
  state.requestBody.idx = idx
  router.push({
    path: './detail',
    query: state.requestBody
  })
}

// const pages = () => {
//   if (pagination.rowsPerPage == null || pagination.totalItems == null) {
//     return 0
//   }
//   return Math.ceil(pagination.totalItems/pagination.rowsPerPage)
// }

// const fnPage = (n) => {
//   // 페이지 번호 클릭 시 실행될 로직, 페이지 번호 n 사용
//   if (state.page !== n) {
//     state.page = n;
//     fnGetList();
//   }
// }

// toRefs를 사용하여 reactive 객체의 속성을 분해
const { list, no, paging, page, size, keyword } = toRefs(state)

// export { paginavigation, fnGetList }

</script>

<style scoped>
.common-buttons {
  display: flex;
  justify-content: right;
  padding: 1.3rem;
  
}

.v-pagination__list {
  border: solid;
}


</style>