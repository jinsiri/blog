import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

let text = `# 포스팅으로 1일 1잔디+a

## 최근 게시글 🖋️
`;

const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {
    const feed = await parser.parseURL('https://today-i-played.tistory.com/');

    text += `<ul>`;

    for (let i = 0; i < 10; i++) {
        const {title, link} = feed.items[i];
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;

    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('완료');
})();