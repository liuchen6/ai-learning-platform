/* ============ 竞赛交付地图 ============
   依据《中职组JSZ2026032人工智能技术应用项目规程》(52KB 完整版) 整理：
   - 表3 竞赛时间安排（教师组）
   - 表8/表9 技术平台（硬件 + 软件清单）
   - 表10 评分标准（技能操作部分）
   - 表2 考核操作技能要求
   - 《三小时技能考相关补充说明》（教师组 1 服务器 1 PC、不组网、不发 U 盘）
   用途：开考前的全局地图，全部内容可直接对应到平台课程。
*/
window.MAP = {
render: function(){
  const g = id => 'onclick="goto(\'' + id + '\')"';
  const btn = (id, txt, color) => '<button class="btn" style="background:' + (color || "#2563eb") + ';border-color:' + (color || "#2563eb") + ';color:#fff;margin:2px 6px 2px 0" ' + g(id) + '>' + txt + '</button>';
  return '<div id="article"><div class="sec-head">' +
    '<div class="sec-ch"><span class="hh" style="background:#f87171"></span>赛前总览</div>' +
    '<h1>竞赛交付地图</h1>' +
    '<div class="sec-meta"><span class="tag">官方规程整理</span><span class="tag">开考前 1 小时通读一遍</span></div></div>' +

    '<div class="card tip"><h3><span class="ic orange">⏰</span>教师组赛场行程（官方表3）</h3>' +
    '<table>'
    + '<tr><th>时间</th><th>环节</th><th>你要做什么</th></tr>'
    + '<tr><td>赛前一天 16:00-17:00</td><td>理论考试</td><td>计算机答题，占 10%</td></tr>'
    + '<tr><td>赛前一天 17:30-18:00</td><td>熟悉赛场</td><td>只看不动，记住一台服务器一台 PC 的位置</td></tr>'
    + '<tr><td>第一天 13:30-14:00</td><td>检录抽签</td><td>入赛场</td></tr>'
    + '<tr><td>第一天 14:00-14:30</td><td><b>确认赛位设备环境</b></td><td><b>就是任务四子任务一（环境检查）的得分点</b>，按下方环境确认卡走一遍</td></tr>'
    + '<tr><td>第一天 14:30-17:30</td><td>技能操作</td><td>3 小时，占 90%。发任务书后 10 分钟只能读题分析，不可动手；结束前 15 分钟裁判长会提示一次</td></tr>'
    + '<tr><td>第一天 17:30-17:45</td><td>现场收卷</td><td>成果必须已按试卷命名保存到指定位置（现场不发 U 盘）</td></tr>'
    + '</table>'
    + '<p style="margin-top:10px;font-size:13.5px;color:#374151">赛场规则：教师组 1 台服务器 + 1 台 PC 机，不组网；比赛过程中不得与其他选手交流、不得离开工位；离场前清理工位（职业素养 5 分的一部分）。</p></div>' +

    '<div class="sheet-section"><h3>评分地图（官方表10：技能操作 100 分）</h3>' +
    '<div class="card" style="padding:0;overflow:hidden"><table>'
    + '<tr><th>任务</th><th>分值</th><th>官方子任务</th><th>平台课程</th></tr>'
    + '<tr><td><b>1 数据准备</b></td><td><b>5</b></td><td>数据集载入与拆分 / 清洗缺失异常脱敏 / LabelImg 补充标注</td><td>' + btn('8-1','8-1 清洗') + btn('8-2','8-2 子任务一') + btn('8-3','8-3 空值') + btn('8-4','8-4 脱敏') + btn('8-5','8-5 标注') + '</td></tr>'
    + '<tr><td><b>2 机器学习</b></td><td><b>10</b></td><td>特征工程 / 算法应用与评估</td><td>' + btn('4-1','第4章') + btn('4-11','XGBoost') + '</td></tr>'
    + '<tr><td><b>3 深度学习</b></td><td><b>30</b></td><td>图像分类 DNN / YOLOV8 数据准备 / 训练 / 推理</td><td>' + btn('5-7','5-7 张量') + btn('5-8','5-8 网络') + btn('5-9','5-9 标注') + btn('5-10','5-10 YOLO') + '</td></tr>'
    + '<tr><td><b>4 大模型应用</b></td><td><b>40</b></td><td>环境检查确认 / Dify 知识库与召回测试 / Agent 多分支工作流 / 场景测试</td><td>' + btn('6-4','6-4 Ollama') + btn('6-6','6-6 Dify') + btn('6-7','6-7 工作流') + btn('6-8','6-8 冲刺') + '</td></tr>'
    + '<tr><td><b>5 业务分析</b></td><td><b>10</b></td><td>业务分析 / Dify 工作流开发验证 / 完成报告</td><td>' + btn('7-1','7-1') + btn('7-4','7-4') + btn('7-5','7-5 报告') + '</td></tr>'
    + '<tr><td><b>6 职业素养</b></td><td><b>5</b></td><td>操作规范、文明竞赛</td><td>—</td></tr>'
    + '</table></div></div>' +

    '<div class="sheet-section"><h3>考场软件清单（官方表9：预装好，别装错）</h3>' +
    '<div class="card" style="padding:0;overflow:hidden"><table>'
    + '<tr><th>类别</th><th>软件与版本</th><th>比赛用途</th></tr>'
    + '<tr><td>数据科学</td><td>Anaconda 22.9.0 / Python 3.9+ / numpy 1.24.3 / pandas 2.0.3 / matplotlib 3.7.5 / scikit-learn 1.3.0 / scipy 1.10.1</td><td>任务一、任务二的代码环境</td></tr>'
    + '<tr><td>图像与深度学习</td><td>opencv-python 4.12 / torch 2.0.1+cu117 / torchvision 0.15.2+cu117 / ultralytics 8.3.234 / ultralytics-thop 2.0.18 / LabelImg 1.8.6</td><td>任务三：图像增强、分类网络、YOLO 训练推理、标注</td></tr>'
    + '<tr><td>大模型环境</td><td>Docker 28.5.1 / Dify 1.9.2 / Ollama 0.13.1 / qwen3:14b-q8_0 / deepseek-r1:14b-qwen-distill-q8_0 / bge-m3 / qwen3-embedding:8b / embeddinggemma</td><td>任务四：知识库、Agent 工作流的全部家当</td></tr>'
    + '<tr><td>数据库</td><td>MySQL 5.7 或 PostgreSQL 15（Navicat）</td><td>业务数据存储（报告里选型用）</td></tr>'
    + '<tr><td>工具</td><td>VSCode 1.86.0 / PyCharm 2023 CE / Chrome / WPS / 搜狗输入法</td><td>写代码、写报告</td></tr>'
    + '</table></div></div>' +

    '<div class="sheet-section"><h3>开考 30 分钟环境确认卡（14:00-14:30，就是任务四子任务一）</h3>' +
    '<div class="card"><ul class="points">'
    + '<li><b>第一步 Anaconda</b>。打开 Anaconda Navigator，确认虚拟环境存在；开终端验证 <code>python -c "import torch, sklearn, pandas; print(torch.__version__, sklearn.__version__, pandas.__version__)"</code>，能打出 2.0.1、1.3.0、2.0.3 即正常</li>'
    + '<li><b>第二步 Ollama 模型三查</b>。终端 <code>ollama list</code>，确认 qwen3:14b-q8_0、deepseek-r1:14b-qwen-distill-q8_0、bge-m3 都在列表里</li>'
    + '<li><b>第三步 推理验证</b>。<code>ollama run qwen3:14b-q8_0</code> 随便问一句，能回答即本地推理可用（这一步踩坑概率最大，早发现早报告裁判）</li>'
    + '<li><b>第四步 Dify</b>。浏览器打开 Dify 登录页（或 <code>docker ps</code> 看 dify 容器在跑），确认能登录、能看到工作台</li>'
    + '<li><b>第五步 数据与工具</b>。确认任务书、数据集的存放路径；WPS、VSCode、PyCharm 各打开一次无异常</li>'
    + '</ul>'
    + '<p class="hint" style="font-size:13px;color:var(--dim)">这 30 分钟是官方安排的检查时间，把上面五步走完，环境分已到手，后面 3 小时专心做题。</p></div></div>' +

    '<div class="sheet-section"><h3>成果交付与命名合规（得分 = 交得出）</h3>' +
    '<div class="card"><ul class="points">'
    + '<li>现场<b>不发 U 盘</b>，最终作品严格按试卷要求命名，保存至指定电脑指定位置</li>'
    + '<li>命名逐字核对：大小写、下划线、中文或英文名、序号，跟试卷一字不差</li>'
    + '<li>CSV 保存统一 <code>df.to_csv("文件名.csv", index=False)</code>，不保留索引列</li>'
    + '<li>截图类成果（Dify 知识库页、工作流结构图、测试对话）按试卷要求的截图命名逐张保存</li>'
    + '<li>收卷前 15 分钟提示后，按试卷任务清单逐项核对文件是否齐全、位置是否对、能否打开</li>'
    + '</ul></div></div>' +

    '<div class="sheet-section"><h3>点名必会（官方表2 技能要求）</h3>' +
    '<div class="card" style="padding:0;overflow:hidden"><table>'
    + '<tr><th>模块</th><th>点名内容</th><th>平台入口</th></tr>'
    + '<tr><td>数据准备</td><td>Pandas 清洗缺失重复异常；OpenCV 与 torchvision 做<b>旋转、缩放、翻转、裁切</b>；姓名身份证手机号<b>掩码或哈希脱敏并验证可用性</b>；LabelImg 标注（边界框匹配、风格一致、样本多样平衡）</td><td>' + btn('5-1a','图像增强四件套') + '</td></tr>'
    + '<tr><td>机器学习</td><td>scikit-learn 调用 <b>6 个算法</b>：K近邻、逻辑回归、决策树、随机森林、贝叶斯、XGBoost</td><td>' + btn('4-5','KNN') + btn('4-6','贝叶斯') + btn('4-7','决策树/随机森林') + btn('4-9','逻辑回归') + btn('4-11','XGBoost') + '</td></tr>'
    + '<tr><td>深度学习</td><td>Anaconda 虚拟环境与 Pytorch 可用性检验；YOLOV8 数据格式筛选确认、补充标注、训练、推理评估</td><td>' + btn('5-10','5-10 YOLO') + '</td></tr>'
    + '<tr><td>大模型</td><td>Ollama 部署 qwen3:14b-q8_0 或 deepseek-r1:14b-qwen-distill-q8_0；bge-m3 向量化构建 RAG 知识库；Dify 构建多分支 Agent 工作流</td><td>' + btn('6-5','6-5 进阶') + btn('6-7','6-7 工作流') + '</td></tr>'
    + '<tr><td>业务分析</td><td>场景分析出可行性方案；报告中体现对大模型智能体开发流程的理解；测试评估并写改进方向</td><td>' + btn('7-1','7-1') + btn('7-5','7-5 报告') + '</td></tr>'
    + '</table></div></div>' +

    '<div class="card" style="background:#16a34a0d;border-color:#16a34a33"><p style="color:#374151;font-size:14px">精力分配（按分值排序）：<b>任务四 40 分 &gt; 任务三 30 分 &gt; 任务二、任务五各 10 分 &gt; 任务一 5 分 &gt; 职业素养 5 分</b>。时间不够时，先保大模型和 YOLO 的完整交付，再补数据准备的小分；业务分析报告最后 40 分钟写，模板见第 7 章。</p></div>' +
    '</div>';
}
};