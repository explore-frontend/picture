import { test, expect } from '@playwright/test';

test('basic test', async ({ page, browserName }) => {
    page.on('request', (request) => {
        console.log('>>', request.method(), request.url());
        const url = request.url();
        if (url.includes('Garden')) {
            if (browserName === 'chromium') {
                expect(url.endsWith('avif')).toBeTruthy();
                // 这里以后有自动升级系统的话结果可能就会变了，不知道应该怎么限制一下
            } else if (browserName === 'webkit') {
                // 判断所有请求都是 webp 应该也没问题
                expect(url.endsWith('webp')).toBeTruthy();
            }
        }
    });
    await page.goto('http://localhost:4173', {
        waitUntil: 'networkidle',
    });
});
