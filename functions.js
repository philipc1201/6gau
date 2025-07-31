// 功能函數

// 檢查密碼
function checkPassword() {
    const inputPassword = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');
    
    if (inputPassword === CONFIG.PASSWORD) {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
        initializePage();
    } else {
        errorMessage.style.display = 'block';
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').focus();
    }
}

// 處理Enter鍵
function handlePasswordEnter(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
}

// 根據地支判斷五行
function getWuXingFromBranch(branch) {
    return DATA.branchWuXing[branch] || '';
}

// 根據五行生成旺相休囚死
function getWuXingStatus(monthWuXing) {
    return DATA.wuxingStatus[monthWuXing] || '';
}

// 根據第一個選擇的六獸計算其他爻的六獸
function calculateOtherAnimals() {
    // 找到第一個已選擇的六獸
    let firstAnimalIndex = -1;
    let firstYaoIndex = -1;
    
    for (let i = 5; i >= 0; i--) { // 從上爻到初爻查找
        const animalSelect = document.getElementById(`animal-${i}`);
        if (animalSelect && animalSelect.value) {
            firstAnimalIndex = DATA.sixAnimalsOrder.indexOf(animalSelect.value);
            firstYaoIndex = i;
            break;
        }
    }
    
    // 如果找到了第一個六獸，計算其他爻
    if (firstAnimalIndex !== -1) {
        for (let i = 5; i >= 0; i--) {
            if (i !== firstYaoIndex) {
                const animalSelect = document.getElementById(`animal-${i}`);
                if (animalSelect && !animalSelect.value) {
                    // 計算相對位置的六獸
                    const offset = firstYaoIndex - i;
                    const targetIndex = (firstAnimalIndex - offset + 6) % 6;
                    animalSelect.value = DATA.sixAnimalsOrder[targetIndex];
                }
            }
        }
    }
}

// 填充選項
function populateSelect(elementId, options, hasEmpty = true) {
    const select = document.getElementById(elementId);
    if (!select) return;
    
    select.innerHTML = '';
    
    if (hasEmpty) {
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = elementId.includes('gua') ? '選擇' + (elementId.includes('original') ? '本卦' : '變卦') : '選擇';
        select.appendChild(emptyOption);
    }
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

// 生成六爻輸入區域
function generateYaoInputs() {
    const container = document.getElementById('yao-container');
    const yaoNames = ['上爻', '五爻', '四爻', '三爻', '二爻', '初爻']; // 從上到下
    
    container.innerHTML = '';
    
    for (let i = 5; i >= 0; i--) { // 從5到0，對應上爻到初爻
        const yaoDiv = document.createElement('div');
        yaoDiv.className = 'yao-item';
        yaoDiv.innerHTML = `
            <h3>${yaoNames[5-i]}</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label>伏神：</label>
                    <select id="fushen-${i}">
                        <option value="">無伏神</option>
                        ${DATA.earthlyBranches.map(branch => `<option value="${branch}">${branch}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>伏神是否空亡：</label>
                    <select id="fushen-kong-${i}">
                        <option value="否">否</option>
                        <option value="是">是</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>伏神六親：</label>
                    <select id="fushen-relative-${i}">
                        <option value="">無</option>
                        ${DATA.sixRelatives.map(rel => `<option value="${rel}">${rel}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>六獸：</label>
                    <select id="animal-${i}" onchange="calculateOtherAnimals()">
                        <option value="">選擇六獸</option>
                        ${DATA.sixAnimals.map(animal => `<option value="${animal}">${animal}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>本卦六親：</label>
                    <select id="original-relative-${i}">
                        <option value="">選擇六親</option>
                        ${DATA.sixRelatives.map(rel => `<option value="${rel}">${rel}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>裝卦(十二地支)：</label>
                    <select id="original-branch-${i}">
                        <option value="">選擇地支</option>
                        ${DATA.earthlyBranches.map(branch => `<option value="${branch}">${branch}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>裝卦是否空亡：</label>
                    <select id="original-kong-${i}">
                        <option value="否">否</option>
                        <option value="是">是</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>變卦(十二地支)：</label>
                    <select id="changed-branch-${i}">
                        <option value="無變卦">無變卦</option>
                        ${DATA.earthlyBranches.map(branch => `<option value="${branch}">${branch}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>變卦是否空亡：</label>
                    <select id="changed-kong-${i}">
                        <option value="否">否</option>
                        <option value="是">是</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>變卦六親：</label>
                    <select id="changed-relative-${i}">
                        <option value="無">無</option>
                        ${DATA.sixRelatives.map(rel => `<option value="${rel}">${rel}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div class="checkbox-group">
                <label><input type="checkbox" id="shi-${i}"> 世爻</label>
                <label><input type="checkbox" id="ying-${i}"> 應爻</label>
                <label><input type="checkbox" id="body-${i}"> 卦身</label>
                <label><input type="radio" name="yinyang-${i}" value="陽爻"> 陽爻</label>
                <label><input type="radio" name="yinyang-${i}" value="陰爻"> 陰爻</label>
            </div>
        `;
        container.appendChild(yaoDiv);
    }
}

// 生成Prompt
function generatePrompt() {
    // 收集六十甲子時間
    const yearJiazi = document.getElementById('year-jiazi').value;
    const monthJiazi = document.getElementById('month-jiazi').value;
    const dayJiazi = document.getElementById('day-jiazi').value;
    const hourJiazi = document.getElementById('hour-jiazi').value;
    
    // 收集問事內容
    const questionContent = document.getElementById('question-content').value;
    
    // 收集本卦變卦信息
    const originalGua = document.getElementById('original-gua').value;
    const originalSpecial = document.getElementById('original-special').value;
    const changedGua = document.getElementById('changed-gua').value;
    const changedSpecial = document.getElementById('changed-special').value;
    
    // 根據月份地支判斷五行旺相休囚死
    let wuxingStatus = '';
    if (monthJiazi && monthJiazi.length >= 2) {
        const monthBranch = monthJiazi.charAt(1); // 取地支部分
        const monthWuXing = getWuXingFromBranch(monthBranch);
        if (monthWuXing) {
            wuxingStatus = getWuXingStatus(monthWuXing);
        }
    }
    
    // 檢查是否有任何爻有變卦（不是「無變卦」）
    let hasAnyChangedYao = false;
    for (let i = 0; i < 6; i++) {
        const changedBranch = document.getElementById(`changed-branch-${i}`).value;
        if (changedBranch && changedBranch !== '無變卦') {
            hasAnyChangedYao = true;
            break;
        }
    }
    
    // 生成Prompt文本
    let prompt = `請幫我解這個六爻卦：\n\n`;
    
    if (questionContent) {
        prompt += `問事內容：${questionContent}\n\n`;
    }
    
    prompt += `起卦時間：年${yearJiazi} 月${monthJiazi} 日${dayJiazi} 時${hourJiazi}\n`;
    
    if (wuxingStatus) {
        prompt += `五行旺相休囚死：${wuxingStatus}\n`;
    }
    
    prompt += `本卦：${originalGua}${originalSpecial ? ' (' + originalSpecial + ')' : ''}\n`;
    prompt += `變卦：${changedGua}${changedSpecial ? ' (' + changedSpecial + ')' : ''}\n\n`;
    
    prompt += `六爻詳細資料：\n`;
    if (hasAnyChangedYao) {
        prompt += `| 爻位 | 伏神 | 伏神空亡 | 伏神六親 | 六獸 | 本卦六親 | 裝卦 | 裝卦空亡 | 特殊 | 陰陽 | 變卦 | 變卦空亡 | 變卦六親 |\n`;
        prompt += `|------|------|----------|----------|------|----------|------|----------|------|------|------|----------|----------|\n`;
    } else {
        prompt += `| 爻位 | 伏神 | 伏神空亡 | 伏神六親 | 六獸 | 本卦六親 | 裝卦 | 裝卦空亡 | 特殊 | 陰陽 |\n`;
        prompt += `|------|------|----------|----------|------|----------|------|----------|------|------|\n`;
    }
    
    const yaoNames = ['上爻', '五爻', '四爻', '三爻', '二爻', '初爻']; // 從上到下
    
    for (let i = 5; i >= 0; i--) { // 從上爻到初爻
        const fushen = document.getElementById(`fushen-${i}`).value || '無';
        const fushenKong = document.getElementById(`fushen-kong-${i}`).value || '否';
        const fushenRelative = document.getElementById(`fushen-relative-${i}`).value || '無';
        const animal = document.getElementById(`animal-${i}`).value || '';
        const originalRelative = document.getElementById(`original-relative-${i}`).value || '';
        const originalBranch = document.getElementById(`original-branch-${i}`).value || '';
        const originalKong = document.getElementById(`original-kong-${i}`).value || '否';
        const changedBranch = document.getElementById(`changed-branch-${i}`).value || '';
        const changedKong = document.getElementById(`changed-kong-${i}`).value || '否';
        const changedRelative = document.getElementById(`changed-relative-${i}`).value || '';
        
        // 收集特殊標記
        const shi = document.getElementById(`shi-${i}`).checked ? '世' : '';
        const ying = document.getElementById(`ying-${i}`).checked ? '應' : '';
        const body = document.getElementById(`body-${i}`).checked ? '身' : '';
        const special = [shi, ying, body].filter(x => x).join('/') || '無';
        
        // 收集陰陽
        const yinyang = document.querySelector(`input[name="yinyang-${i}"]:checked`)?.value || '';
        
        if (hasAnyChangedYao) {
            prompt += `| ${yaoNames[5-i]} | ${fushen} | ${fushenKong} | ${fushenRelative} | ${animal} | ${originalRelative} | ${originalBranch} | ${originalKong} | ${special} | ${yinyang} | ${changedBranch} | ${changedKong} | ${changedRelative} |\n`;
        } else {
            prompt += `| ${yaoNames[5-i]} | ${fushen} | ${fushenKong} | ${fushenRelative} | ${animal} | ${originalRelative} | ${originalBranch} | ${originalKong} | ${special} | ${yinyang} |\n`;
        }
    }
    
    prompt += `\n你是一位精通易經六爻占卜的分析師。請按以下步驟分析六爻卦象：

**基本信息分析：**
1. 確認主卦和變卦（如有）
2. 識別世爻、應爻位置
3. 確定用神（所求測之事對應的六親）
4. 分析卦宮歸屬和五行屬性

**本卦分析：**
1. 本卦卦名、卦象及其象徵意義
2. 本卦卦辭的含義和指導意義
3. 本卦所代表的整體趨勢和環境背景
4. 本卦在所測事項中的基本寓意

**動爻分析：**
1. 動爻位置和陰陽屬性
2. 動爻爻辭的具體內容和釋義
3. 動爻爻辭在當前情境下的指導意義
4. 動爻對整個卦象變化的推動作用

**變卦分析：**
1. 變卦卦名、卦象及其象徵意義
2. 變卦卦辭的含義和預示方向
3. 變卦所代表的發展結果和未來趨勢
4. 變卦在所測事項中的最終指向

**變卦動爻分析：**
1. 變卦中對應動爻位置的爻辭
2. 變卦動爻爻辭的具體釋義
3. 變卦動爻爻辭對結果的補充說明
4. 變卦動爻爻辭的行動指導意義

**卦象結構分析：**
1. 各爻的陰陽屬性和動靜狀態
2. 六親關係（父母、兄弟、子孫、妻財、官鬼）
3. 世應關係和生克制化
4. 動爻的影響和變化趨勢

**時空因素：**
1. 起卦時間的干支和五行
2. 月建、日辰對各爻的生克制化
3. 空亡、暗動等特殊狀態

**吉凶判斷依據：**
1. 用神的旺衰強弱
2. 喜忌神的作用關係
3. 卦象整體的平衡狀態
4. 時間因素的影響

**綜合結論：**
結合卦辭、爻辭的文義指導與六爻技法分析，提供：
- 所測事情的可能結果
- 發展趨勢和時間節點
- 卦爻辭中的重要提示
- 需要注意的要點
- 建議採取的行動

請根據傳統六爻理論和易經原文進行分析，保持客觀理性的態度。`;
    
    // 顯示結果
    document.getElementById('result-textarea').value = prompt;
    document.getElementById('result-container').style.display = 'block';
    
    // 滾動到結果區域
    document.getElementById('result-container').scrollIntoView({ behavior: 'smooth' });
}

// 複製到剪貼板
function copyToClipboard() {
    const textarea = document.getElementById('result-textarea');
    textarea.select();
    document.execCommand('copy');
    alert('已複製到剪貼板！');
}