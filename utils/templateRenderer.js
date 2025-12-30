// utils/templateRenderer.js
import fs from 'fs';
import ejs from 'ejs';

/**
 * 建立 renderTemplate 函數
 * @param {object} res - HTTP 回應物件
 * @param {string} filePath - EJS 檔案路徑
 * @param {object} data - 傳遞給模板的資料（預設為空物件 {}）
 */
export function renderTemplate(res, filePath, data = {}) {
    // 讀取檔案
    fs.readFile(filePath, 'utf8', (err, template) => {
        // 包含錯誤處理：檔案讀取失敗時回傳 500 錯誤
        if (err) {
            console.error('模板讀取失敗:', err);
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end('500 - 伺服器內部錯誤：無法讀取模板');
        }

        try {
            // 使用 EJS 渲染
            const html = ejs.render(template, data);
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        } catch (renderErr) {
            console.error('EJS 渲染失敗:', renderErr);
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('500 - 伺服器內部錯誤：模板渲染失敗');
        }
    });
}

/**
 * 建立 render404 函數
 * 專門處理 404 錯誤頁面
 */
export function render404(res) {
    const filePath = './index3.ejs'; // 假設 404 使用 index3.ejs
    
    fs.readFile(filePath, 'utf8', (err, template) => {
        if (err) {
            // 404 檔案也讀不到時，回傳 500
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end('500 - 無法載入 404 頁面');
        }
        
        const html = ejs.render(template);
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    });
}