// 2b-refactored.js

// 1. 引入 Node.js 內建模組
import http from 'http';

// 2. 引入剛剛寫好的自定義模組
import { renderTemplate, render404 } from './utils/templateRenderer.js';
import { handleStaticFile } from './utils/staticFileHandler.js';

// ==========================================
// 創建伺服器並專注於路由邏輯
// ==========================================
http.createServer((req, res) => {
    // 獲取當前請求的 URL
    const url = req.url;

    // 3. 保留使用 switch 語句處理路由
    switch (url) {
        // 路由規則： / → 渲染 index.ejs
        case '/':
        case '/index':
            renderTemplate(res, './index.ejs', { title: '首頁' });
            break;

        // 路由規則： /calculator → 渲染 index2.ejs
        case '/calculator':
            renderTemplate(res, './index2.ejs', { title: '計算機', result: 0 });
            break;

        // 其他路徑 → 嘗試作為靜態文件處理
        default:
            // 呼叫靜態文件模組，傳入回應物件與檔案路徑
            // 注意：路徑前加上 '.' 代表從當前目錄找起
            handleStaticFile(res, '.' + url);
            break;
    }

}).listen(3000, () => {
    // 伺服器啟動後的提示訊息
    console.log('伺服器已啟動！請訪問 http://localhost:3000');
    console.log('模組化重構完成：');
    console.log(' - MIME 模組已就緒');
    console.log(' - 渲染模組已就緒');
    console.log(' - 靜態文件模組已就緒');
});