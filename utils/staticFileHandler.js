// utils/staticFileHandler.js
import fs from 'fs';
import path from 'path';

// 引入先前建立的兩個模組
import { getContentType } from './mimeTypes.js';
import { render404 } from './templateRenderer.js';

/**
 * 建立 handleStaticFile(res, filePath) 函數
 * 負責讀取靜態文件（CSS、JS、圖片等）
 */
export function handleStaticFile(res, filePath) {
    // 取得副檔名
    const extname = path.extname(filePath);
    
    // 根據副檔名設定正確的 Content-Type
    const contentType = getContentType(extname);

    // 讀取靜態文件
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // 若文件不存在，自動呼叫 render404()
            console.error(`無法讀取檔案: ${filePath}`);
            return render404(res);
        }

        // 回傳文件內容
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
}