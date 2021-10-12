const quote = [
  {
    content: "강력한 이유는 강력한 행동을 낳는다.",
    author: "-윌리엄 셰익스피어",
  },
  {
    content: "편견에 기반한 의견은 항상 최대의 폭력으로 지탱된다.",
    author: "-프란시스 제프리",
  },
  {
    content:
      "모두에게 전성기가 있지만 어떤 이들의 전성기는 다른 이들보다 더 길다.",
    author: "-윈스터 처칠",
  },
  {
    content: "모든 논쟁의 뒤에는 누군가의 무지함이 있다.",
    author: "-루이스 D. 브랜다이스",
  },
  {
    content: "시련을 겪어야만 한다면 차라리 극한의 시련을 겪자.",
    author: "-사디",
  },
];

const quoteContent = document.querySelector(".quote .content");
const quoteAuthor = document.querySelector(".quote .author");

function outputQuote() {
  const randomQuote = quote[Math.floor(Math.random() * quote.length)];
  quoteContent.innerText = randomQuote.content;
  quoteAuthor.innerText = randomQuote.author;
}

outputQuote();
