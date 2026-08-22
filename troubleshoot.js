/* ============ 故障排除手册 ============
   比赛现场最常踩的坑 + 一行解决命令。
   来源：教师组赛场常见问题、PyTorch/CUDA/Dify 环境踩坑经验。
*/
window.TROUBLE = {
render: function(){
  const g = id => 'onclick="goto(\'' + id + '\')"';
  const btn = (id, txt) => '<button class="btn" style="background:#2563eb;border-color:#2563eb;color:#fff;margin:2px 6px 2px 0" ' + g(id) + '>' + txt + '</button>';

  const issue = (title, symptom, cause, fix) =>
    '<div class="card" style="margin:14px 0;border-left:3px solid #f59e0b">' +
    '<h3 style="margin:0 0 6px;color:#92400e">' + title + '</h3>' +
    '<p style="margin:0 0 4px;font-size:13.5px;color:#6b7280"><b>症状：</b>' + symptom + '</p>' +
    '<p style="margin:0 0 4px;font-size:13.5px;color:#6b7280"><b>原因：</b>' + cause + '</p>' +
    '<p style="margin:0"><b>解决：</b><code style="background:#f8f9fa;padding:2px 6px;border-radius:3px;font-size:13px">' + fix + '</code></p>' +
    '</div>';

  return '<div id="article"><div class="sec-head">' +
    '<div class="sec-ch"><span class="hh" style="background:#ef4444"></span>应急手册</div>' +
    '<h1>故障排除手册</h1>' +
    '<div class="sec-meta"><span class="tag">比赛现场踩坑急救</span><span class="tag">按症状找解法</span></div></div>' +

    '<div class="card tip"><h3>⏱ 遇到问题先做这一步</h3>' +
    '<p style="margin:0;font-size:14px;color:#374151"><b>第一步：先报告裁判。</b>环境问题不是你的错，报告后裁判会安排处理或调整工位。报告完再继续做能做的部分。</p></div>' +

    '<div class="sheet-section"><h3>PyTorch / CUDA 环境</h3>' +
    issue('CUDA 不可用（torch.cuda.is_available() 返回 False）',
      'import torch 后 torch.cuda.is_available() 返回 False',
      'CUDA 驱动版本与 PyTorch 不匹配；或 NVIDIA 驱动未安装',
      'python -c "import torch;print(torch.__version__,torch.cuda.is_available())"') +
    issue('torch 版本不对',
      '需要 torch 2.0.1+cu117 但装了其他版本',
      'Anaconda 环境激活错误，或环境变量冲突',
      'conda activate deepLearn && python -c "import torch;print(torch.__version__)"') +
    issue('显存不足（CUDA out of memory）',
      '训练 YOLO 时报 CUDA out of memory',
      'batch_size 太大或图片分辨率太高',
      '减小 batch_size（如 16→8）或 img_size（如 640→320）')
    + '</div>' +

    '<div class="sheet-section"><h3>Ollama 模型</h3>' +
    issue('ollama list 看不到模型',
      'ollama list 输出为空或缺少目标模型',
      '模型未下载完成；或 ollama 数据目录被清',
      'ollama pull qwen3:14b-q8_0') +
    issue('ollama run 报错或卡住',
      'ollama run qwen3:14b-q8_0 后无响应或报连接错误',
      'ollama 服务未启动；或显存被其他进程占用',
      '先 ollama serve（新终端），再 ollama run') +
    issue('模型回答乱码或英文',
      'qwen3 输出全是英文或乱码',
      '模型加载了错误的权重文件',
      'ollama stop && ollama run qwen3:14b-q8_0 重新加载')
    + '</div>' +

    '<div class="sheet-section"><h3>Dify 平台</h3>' +
    issue('Dify 登录页打不开',
      '浏览器无法访问 Dify 登录地址',
      'Docker 容器未启动；或端口被占用',
      'docker ps 看 dify 容器是否在跑；docker start dify-web') +
    issue('知识库上传失败',
      '上传文档后状态一直「处理中」或「失败」',
      'Embedding 模型 bge-m3 未加载；或文件格式不支持',
      '检查 bge-m3 是否在 ollama list 里；换 PDF/TXT 格式重传') +
    issue('工作流连线报错',
      '拖入节点后连线失败或节点显示红色',
      '节点类型未正确配置；或缺少前置节点',
      '检查每个节点的输入输出是否匹配；从左到右逐个连线')
    + '</div>' +

    '<div class="sheet-section"><h3>LabelImg 标注</h3>' +
    issue('LabelImg 打不开',
      '双击 LabelImg 无反应或闪退',
      'Python 环境缺少 lxml 依赖',
      'pip install lxml && labelImg') +
    issue('标注保存后标签文件为空',
      '保存 YOLO 格式后 txt 文件是空的',
      '画框时没有框住目标；或类别未选择',
      '重新画框，确保框完全包围目标并选择类别')
    + '</div>' +

    '<div class="sheet-section"><h3>通用急救</h3>' +
    issue('Python 内存不足',
      '大文件处理时报 MemoryError',
      '数据集太大，内存不够',
      '用 chunksize 分块读取：pd.read_csv("file.csv", chunksize=1000)') +
    issue('编码报错（UnicodeDecodeError）',
      '读 CSV 时报 UnicodeDecodeError',
      '文件编码不是 utf-8',
      '加 encoding="gbk" 或 encoding="latin1" 重试') +
    issue('matplotlib 中文乱码',
      '画图时中文显示为方块',
      'matplotlib 默认字体不支持中文',
      'plt.rcParams["font.sans-serif"]=["SimHei"]')
    + '</div>' +

    '<div class="card" style="background:#16a34a0d;border-color:#16a34a33"><p style="color:#374151;font-size:14px"><b>记住：</b>遇到问题先报告裁判，再做能做的部分。不要在一个问题上死磕超过 5 分钟，跳过先做其他任务，最后回来处理。</p></div>' +
    '</div>';
}
};
