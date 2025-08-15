// 主程式文件

// 初始化頁面
function initializePage() {
    // 填充六十甲子選項
    populateSelect('year-jiazi', DATA.jiazi);
    populateSelect('month-jiazi', DATA.jiazi);
    populateSelect('day-jiazi', DATA.jiazi);
    populateSelect('hour-jiazi', DATA.jiazi);
    
    // 填充卦象選項
    populateSelect('original-gua', DATA.guas);
    populateSelect('changed-gua', DATA.guas);
    
    // 生成六爻輸入區域
    generateYaoInputs();
}

// 頁面載入時聚焦密碼輸入框
window.onload = function() {
    document.getElementById('password-input').focus();
};