---
layout: post
title: dangerouslySetInnerHTML
categories: [TIL]
excerpt: " "
comments: true
share: true
tags: [React]
date: 2022-04-06
---

# dangerouslySetInnerHTML

## 문제 코드

받아온 데이터에 이상하게 문자열로 된 태그가 껴있었다.
예를 들면,

```json
안녕하세요<br/>반갑습니다<br/><b>어서오세요<b>
```

## 해결

그래서 저 태그들을 지우려고 함수를 만들었다.

```typescript
const sliceText = (reviewText: string) => {
  let text = reviewText;
  let newText = text
    .replace(/br|<|>|b|/g, "")
    .split("/")
    .join(" ");
  return (text = newText);
};
```

replace메서드를 써서, 저 태그들을 공백으로 치환하려고 했는데,
`/` (빗금)은 허용이 안되었다. 그래서 저 슬래시를 지우느라고 애를 많이 먹었는데, 결국 split 함수를 써서 `/` (빗금) 중심으로 글자들을 나누고, (나누면서 배열로 바뀜) 그 다음 다시 join을 써서 문자열로 바꿔주었다.

## 더 좋은 방법

알고보니 string 형태를 html로 렌더링 하는 방법이 있었다.

### dangerouslySetInnerHTML

dangerouslySetInnerHTML은 브라우저 DOM에서 **innerHTML을 사용하기 위한 React의 대체 방법입니다.** 일반적으로 코드에서 HTML을 설정하는 것은 사이트 간 스크립팅 공격에 쉽게 노출될 수 있기 때문에 위험합니다. 따라서 React에서 직접 HTML을 설정할 수는 있지만, 위험하다는 것을 상기시키기 위해 dangerouslySetInnerHTML을 작성하고 **\_\_html 키로 객체를 전달해야 합니다.** 아래는 예시입니다.

```javascript
function createMarkup() {
  return { __html: "First &middot; Second" };
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

[출처: 리액트 공식문서]

## 수정 후 코드

그래서 수정 후 나의 코드는

```javascript
dangerouslySetInnerHTML={{ __html: review.content }}
```

딱 한줄이면 끝난다!!!!!!!!!!
