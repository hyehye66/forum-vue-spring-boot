package com.example.backend.entity;

// JpaRepository는 JPA 엔티티에 대한 CRUD (Create, Read, Update, Delete) 기능을 제공하는 인터페이스
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository를 확장하며, 두 개의 타입 매개변수를 가짐.
// 첫 번째 매개변수인 BoardEntity는 이 Repository가 다루는 엔티티 타입을 나타냄.
// 두 번째 매개변수인 Long은 엔티티의 기본 키 타입을 나타냄.
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
}
