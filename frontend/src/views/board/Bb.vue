<template>
  <v-container>
    <!-- 검색 기능 -->
    <v-row class="mb-3">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="keyword"
          label="검색"
          solo-inverted
          hide-details
          dense
          clearable
          @input="fnGetList"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- 게시글 리스트 테이블 -->
    <v-data-table
      :headers="[
        { text: '번호', value: 'idx' },
        { text: '제목', value: 'title' },
        { text: '작성자', value: 'author' },
        { text: '작성일', value: 'createdAt' }
      ]"
      :items="list"
      :items-per-page="size"
      class="elevation-1"
      @click:row="fnView"
    >
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString() }}
      </template>
    </v-data-table>

    <!-- 페이지네이션 -->
    <v-pagination
      v-model="page"
      :length="Math.ceil(paging.total_list_cnt / size)"
      @input="fnPage"
      circle
    ></v-pagination>

    <!-- 글쓰기 버튼 -->
    <v-btn color="primary" @click="fnWrite">글쓰기</v-btn>
  </v-container>
</template>

<script setup>
import { reactive, onMounted, computed, toRefs, inject } from 'vue'
import { useRoute } from 'vue-router'

// useRoute를 사용하여 현재 라우트의 쿼리 파라미터에 접근
const route = useRoute()

// 루트 인스턴스에서 제공된 axios와 serverUrl 주입
const axios = inject('axios')
const serverUrl = inject('serverUrl')

// 반응형 데이터 정의
const state = reactive({
  requestBody: {}, // 리스트 페이지 데이터 전송을 위한 객체
  list: {}, // 리스트 데이터
  no: '', // 게시판 숫자 처리
  paging: {
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
  }, // 페이징 데이터
  page: route.query.page || 1, // 현재 페이지 번호
  size: route.query.size || 10, // 페이지당 게시글 수
  keyword: route.query.keyword, // 검색 키워드
})

// 페이지 번호 계산
const paginavigation = computed(() => {
  const pageNumber = []
  const { start_page, end_page } = state.paging
  for (let i = start_page; i <= end_page; i++) {
    pageNumber.push(i)
  }
  return pageNumber
})

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

    state.list = response.data
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
}

const fnView = (idx) => {
  // 제목 클릭 시 실행될 로직, idx 사용
}

const fnPage = (n) => {
  // 페이지 번호 클릭 시 실행될 로직, 페이지 번호 n 사용
}

// toRefs를 사용하여 reactive 객체의 속성을 분해
const { list, no, paging, page, size, keyword } = toRefs(state)

// export { paginavigation, fnGetList }

</script>