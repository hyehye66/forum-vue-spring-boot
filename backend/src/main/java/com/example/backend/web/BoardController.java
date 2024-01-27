// 게시판과 관련된 HTTP 요청을 처리하는 컨트롤러인 BoardController 클래스를 정의

package com.example.backend.web;

import com.example.backend.entity.BoardEntity;
import com.example.backend.services.BoardService;
import com.example.backend.web.dtos.BoardDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin
@RestController
public class BoardController {
    private final BoardService boardService;

/** HTTP GET 요청을 처리하는 메서드
 * /board/list 경로에 대한 요청을 처리
 * boardService.getBoardList()를 호출하여 게시글 목록을 반환
 */
    @GetMapping("/board/list")
    public List<BoardDto> boardList() { return boardService.getBoardList(); }

/** HTTP GET 요청을 처리하는 메서드
 * /board/{id} 경로에 대한 요청을 처리
 * 해당 ID에 해당하는 게시글을 boardService.getBoard(id)를 호출하여 조회하고 반환
 */
    @GetMapping("/board/{id}")
    public BoardDto getBoard(@PathVariable Long id) {
        return boardService.getBoard(id);
    }

/** HTTP POST 요청을 처리하는 메서드
 * /board 경로에 대한 요청을 처리 클라이언트에서 전달된 게시글 데이터를 @RequestBody 어노테이션을 통해 받아와서
 * boardService.create(boardDto)를 호출하여 새로운 게시글을 생성하고 반환
 */
    @PostMapping("/board")
    public BoardEntity create(@RequestBody BoardDto boardDto) {
        return boardService.create(boardDto);
    }

/** HTTP PATCH 요청을 처리하는 메서드
 * /board 경로에 대한 요청을 처리
 * 클라이언트에서 전달된 게시글 데이터를 @RequestBody 어노테이션을 통해 받아와서
 * boardService.update(boardDto)를 호출하여 게시글을 수정하고 반환
 */
    @PatchMapping("/board")
    public BoardEntity update(@RequestBody BoardDto boardDto) {
        return boardService.update(boardDto);
    }

    @DeleteMapping("/board/{id}")
    public void delete(@PathVariable Long id) {
        boardService.delete(id);
    }
}