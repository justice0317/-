function handleFileSelection() {
    const fileInput = document.getElementById('videoFile');
    const videoPreview = document.getElementById('videoPreview');
    const uploadText = document.getElementById('uploadText');

    const file = fileInput.files[0];
    if (file) {
        uploadText.textContent = file.name; // 更新顯示的檔名
        const url = URL.createObjectURL(file); // 建立影片預覽的 URL
        videoPreview.src = url; // 設定影片預覽來源
        videoPreview.style.display = 'block'; // 顯示預覽
    }
}

function uploadVideo() {
    const fileInput = document.getElementById('videoFile');
    const file = fileInput.files[0];
    const loadingText = document.getElementById('loadingText');
    const resultContainer = document.getElementById('resultContainer');
    const analysisResult = document.getElementById('analysisResult');

    if (!file) {
        alert('請選擇影片檔案！');
        return;
    }

    const formData = new FormData();
    formData.append('file', file); // 將檔案附加到 FormData

    loadingText.style.display = 'block'; // 顯示加載提示
    resultContainer.style.display = 'none'; // 隱藏結果區域

    // 發送 POST 請求到 API
    fetch('https://loose-shoes-build.loca.lt/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('上傳失敗：' + response.statusText);
        }
        return response.json(); // 解析 JSON 回應
    })
    .then(result => {
        loadingText.style.display = 'none'; // 隱藏加載提示
        resultContainer.style.display = 'block'; // 顯示結果區域
        analysisResult.textContent = `分數：${result.score}\n評論：${result.comment}`; // 顯示分析結果
    })
    .catch(error => {
        loadingText.style.display = 'none'; // 隱藏加載提示
        console.error('錯誤:', error); // 輸出錯誤
        alert('分析過程中發生錯誤，請稍後再試。');
    });
}

function resetFileSelection() {
    const fileInput = document.getElementById('videoFile');
    const uploadText = document.getElementById('uploadText');
    const videoPreview = document.getElementById('videoPreview');
    const resultContainer = document.getElementById('resultContainer');
    const analysisResult = document.getElementById('analysisResult');

    fileInput.value = ''; // 重設檔案選擇
    uploadText.textContent = '請選擇影片檔案'; // 重設顯示的檔名
    videoPreview.style.display = 'none'; // 隱藏影片預覽
    resultContainer.style.display = 'none'; // 隱藏結果區域
    analysisResult.textContent = ''; // 清空結果顯示
}
