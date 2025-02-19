---
layout: post
title: data structure
categories: [Reference]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-07-06
---

# 자료구조 (data structure) 

1. 프로그램에서 데이터를 관리하기 위한 수단과 그것을 조작하기 위한 알고리즘을 통칭.
   - 배열
   - 큐, 스택
   - 트리
   - 그래프
   - 해쉬테이블
   - 링크드리스트

## 배열

1. 배열은 데이터에 대한 임의접근이 가능하다. (배열만 가능)
2. 선형 자료 구조
3. 배열을 조작하는 데에 별도의 프로그래밍 인터페이스(API, 함수)가 필요하지 않다.
4. CRUD(크루드) : 데이터를 조작한다는 의미, 아래 4가지 작업을 의미한다
   - Create 배열에 데이터를 추가할때: arr[index] = 값
   -  Read    배열에서 데이터를 접근할때 : arr[index]
   - Update  배열에서 들어있는 데이터를 수정할 때 : arr[index] = 값
   - Delete  배열에서 데이터를 제거할때 : arr.pop(), arr.shift(), arr.splice(index,1)..

## 배열의 탐색 

1. 순차탐색 알고리즘 : 배열의 맨 앞부터 맨 끝까지 순회하면서 내가 원하는 데이터를 찾아나가는 방식
2. 이진탐색 알고리즘 :
   1. **배열이 정렬되어야 있는 상태에서만 쓸 수 있는 알고리즘.**
   2. 범위를 절반씩 줄여나가는 알고리즘. 
   3. 둘씩 나눠가면서 탐색한다고 해서 이진탐색이다.

## 배열의 정렬 

1. 버블정렬 알고리즘 
   1. 바로 가까이에 있는 두 숫자끼리 비교해서 당장 더 작은 숫자를 앞으로 보내주는 것을 반복한다.
   2. n싸이클 자리이동횟수 = 0일때 정렬완료
   3. 실제 수행시간이 가장 느린 좋지 않은 알고리즘이다
   4. 선택정렬과 시간 복잡도는 같지만, 보다 느린 알고리즘이다.
   5. 시간복잡도 : O(N^2)
2. 퀵정렬
   1. arr.sort() 
   2. 엄청 빠르다
   3. 대표적인 ‘분할 정복’ 알고리즘이다.
   4. 배열의 원소를 두 집합으로 나누어 정렬한다.
   5. 기준값이 있다. 이를 피벗(Pivot)이라 한다.
   6. 평균속도는 O(N* logN)

## 퀵정렬 알고리즘의 작동 원리

보통 첫번째 원소를 피벗 값으로 설정하고 사용한다.

      [1 2 3 4 5 6 7 8 9 10]
      
- 선택정렬 : N ^ 2 = 10 * 10 100

- 퀵정렬 :1 2 3 4 5  => 5 * 5 = 25
             6 7 8 9 10 => 5 * 5 = 25