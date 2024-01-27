// 게시글 데이터를 전달하기 위한 데이터 전송 객체(DTO)인 BoardDto 클래스를 정의
// 클라이언트와 서버 간 데이터 전달 및 변환을 쉽게 처리
package com.example.backend.web.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// 객체를 직렬화하여 네트워크를 통해 전송하거나 파일로 저장할 때 필요한 인터페이스
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDto implements Serializable {
    private Long idx;
    private String title;
    private String contents;
    private String author;
    private String createdAt;
}
