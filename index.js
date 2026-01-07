import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

let text = `# 포스팅으로 1일 1잔디+a

## 최근 게시글 🖋️
`;

const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Accept': 'application/rss+xml, application/xml;q=0.9, */*;q=0.8',
    }});

(async () => {
    const feed = await parser.parseURL('https://today-i-played.tistory.com/');

    text += `<ul>`;

    const maxPosts = Math.min(feed.items.length, 10);
    for (let i = 0; i < maxPosts; i++) {
        const {title, link} = feed.items[i];
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;

    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('완료');
})();