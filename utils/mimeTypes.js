// 第一部分：建立 MIME 類型模組

// 1. 將 2b.js 中的 contentTypes 物件抽取出來
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.ejs': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

/**
 * 2. 建立 getContentType(extname) 函數
 * 根據副檔名回傳對應的 MIME 類型
 */
export function getContentType(extname) {
  // 如果找不到副檔名，預設回傳 'text/plain'
  return contentTypes[extname] || 'text/plain';
}

