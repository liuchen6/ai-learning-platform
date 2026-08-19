/* ============ 操作速查手册 ============
   开考后的「照抄手册」：五任务操作流（做什么→命令/代码→保存什么→检查点）。
   事实来源：官方规程（表2/表3/表10）＋ 第 4-8 章已验证课程与真题代码。
   时间节奏为策略建议（估算），非官方数据。
*/
window.HBOOK = {
render: function(){
  const g = id => 'onclick="goto(\'' + id + '\')"';
  const btn = (id, txt, color) => '<button class="btn" style="background:' + (color || "#2563eb") + ';border-color:' + (color || "#2563eb") + ';color:#fff;margin:2px 6px 2px 0" ' + g(id) + '>' + txt + '</button>';
  const stepTable = (rows) => '<div class="card" style="padding:0;overflow:hidden"><table>' +
    '<tr><th style="width:150px">步骤</th><th>做什么</th><th>命令或代码（照抄）</th><th>检查点</th></tr>' +
    rows + '</table></div>';
  const step = (n, what, cmd, chk) => '<tr><td><b>' + n + '</b></td><td>' + what + '</td><td><code>' + cmd + '</code></td><td>' + chk + '</td></tr>';

  return '<div id="article"><div class="sec-head">' +
    '<div class="sec-ch"><span class="hh" style="background:#f59e0b"></span>考场照抄手册</div>' +
    '<h1>操作速查手册</h1>' +
    '<div class="sec-meta"><span class="tag">开考后用</span><span class="tag">五个任务的操作流</span><span class="tag">每步给命令和检查点</span></div></div>' +

    '<div class="card tip"><h3><span class="ic orange">⏱</span>三小时节奏（策略建议，估算）</h3>' +
    '<table>'
    + '<tr><th>时段</th><th>做什么</th><th>依据</th></tr>'
    + '<tr><td>0-10 分钟</td><td>只读题不动手（官方规则）。圈出每个任务的：输入文件、输出文件、命名要求、要打印的内容</td><td>官方：发卷后 10 分钟只能读题分析</td></tr>'
    + '<tr><td>约 15 分钟</td><td>任务一 数据准备（5 分）</td><td>最快拿分，代码现成</td></tr>'
    + '<tr><td>约 30 分钟</td><td>任务二 机器学习（10 分）</td><td>6 算法模板直接抄</td></tr>'
    + '<tr><td>约 45 分钟</td><td>任务三 深度学习（30 分）</td><td>先让 YOLO 训练跑起来，等训练时做任务四</td></tr>'
    + '<tr><td>约 60 分钟</td><td>任务四 大模型（40 分）</td><td>分值最大，界面操作多，留足整块时间</td></tr>'
    + '<tr><td>约 30 分钟</td><td>任务五 业务分析（10 分）</td><td>报告可边写边对照第 7 章模板</td></tr>'
    + '<tr><td>最后 15 分钟前</td><td>全局检查：命名、位置、文件能打开、任务清单打勾</td><td>官方：结束前 15 分钟会提示一次</td></tr>'
    + '</table></div>' +

    '<div class="sheet-section"><h3>任务一 数据准备（5 分）：清洗 → 补全 → 脱敏 → 保存</h3>' +
    stepTable(
      step("1", "读数据", "pd.read_csv('文件.csv', encoding='utf-8')", "打印行数和列名，乱码换 gbk") +
      step("2", "清洗三查", "去重 df.drop_duplicates(subset='主键', keep='first')；缺失 df.isnull().sum()；异常 df['列'].value_counts() 找非标准值", "去重后行数、缺口清单记下来") +
      step("3", "空值补全", "数值用 df['列'].fillna(df['列'].median())；分类用 mode()[0] 或 ffill", "补全后 isnull().sum() 全为 0") +
      step("4", "脱敏", "掩码：姓名按字数星号、手机号前2后3、城市留省；哈希：hashlib.sha256 转 64 位 hex", "输出前 N 条对照卷面样例格式") +
      step("5", "保存", "df.to_csv('卷面命名.csv', index=False)", "文件能打开、无索引列、命名逐字核对")
    )
    + '<p style="margin-top:8px;font-size:13.5px;color:#374151">完整可跑代码：' + btn('8-2','8-2 清洗') + btn('8-3','8-3 补全') + btn('8-4','8-4 脱敏') + '</p></div>' +

    '<div class="sheet-section"><h3>任务二 机器学习（10 分）：预处理 → 划分 → 建模 → 评估</h3>' +
    stepTable(
      step("1", "文本预处理", "合并字段 → re.sub 去非中文数字标点 → 合并空格", "content 列生成，样例打印一致") +
      step("2", "特征提取", "from sklearn.feature_extraction.text import TfidfVectorizer；vec = TfidfVectorizer(max_features=卷面值, stop_words='english')", "矩阵形状打印，特征名存 txt") +
      step("3", "划分", "train_test_split(X, y, test_size=卷面值, random_state=卷面值, stratify=y)", "stratify 必须带（官方点名分层）") +
      step("4", "建模", "点名 6 算法任选：KNN(4-5) / 逻辑回归(4-9) / 决策树、随机森林(4-7) / 贝叶斯(4-6) / XGBoost(4-11)", "fit 后 predict，参数按卷面") +
      step("5", "评估输出", "accuracy_score + f1_score(average='weighted') + confusion_matrix，全部 round(值, 4)", "混淆矩阵解读两句（哪类误判哪类）")
    )
    + '<p style="margin-top:8px;font-size:13.5px;color:#374151">完整可跑代码：' + btn('8-5','8-5 预处理') + btn('8-6','8-6 随机森林') + btn('4-11','XGBoost') + '</p></div>' +

    '<div class="sheet-section"><h3>任务三 深度学习（30 分）：环境 → 标注 → 训练 → 推理</h3>' +
    stepTable(
      step("1", "环境确认", "import torch; print(torch.cuda.is_available(), torch.__version__)", "GPU True、版本 2.0.1+cu117") +
      step("2", "LabelImg 补标", "检查已有边框是否贴合目标；类别与 yaml 一致；不精准的重画框，保存 YOLO 格式", "标签 txt 与图片同名，class 编号和 yaml 对应") +
      step("3", "数据格式", "train/val 分目录 + yaml（类别名列一）、每张图同名 txt 在 labels 下", "yolo 数据校验通过") +
      step("4", "训练", "from ultralytics import YOLO; YOLO('yolov8n.pt').train(data=卷面yaml, epochs=卷面值, batch_size=卷面值, img_size=卷面值, workers=0, lr0=卷面值)", "参数全部按卷面抄，训练完成保存模型") +
      step("5", "评估推理", "加载 best.pt，predict 测试图，结果保存到卷面指定位置", "推理结果能打开、类别正确") +
      step("6", "损失曲线", "results 训练结果里 loss 曲线导出，plt.savefig(..., dpi=300)", "300dpi 是卷面明文要求")
    )
    + '<p style="margin-top:8px;font-size:13.5px;color:#374151">完整可跑代码（比赛机 deepLearn 环境）：' + btn('8-7','8-7 训练推理') + btn('5-10','5-10 YOLO') + '</p></div>' +

    '<div class="sheet-section"><h3>任务四 大模型（40 分）：环境 → 知识库 → 工作流 → 测试</h3>' +
    stepTable(
      step("1", "环境检查", "Anaconda 验证 → ollama list 三模型在列 → ollama run qwen3:14b-q8_0 问一句 → Dify 能登录 → 数据工具就位", "开考 30 分钟环境确认卡已走一遍，这里快速复核") +
      step("2", "知识库", "Dify 建知识库 → 上传文档 → 解析分段 → Embedding 模型选 bge-m3", "分段生效，文档状态已处理") +
      step("3", "召回测试", "知识库内检索测试：问文档里的事实问题，看命中片段对不对", "能命中正确片段，多试两种问法") +
      step("4", "Agent 工作流", "多分支：意图识别 → 知识库检索 → 生成回答 → 人工介入 → 反馈沉淀", "低代码配节点，可视化连线") +
      step("5", "场景测试", "对话测试若干轮，覆盖卷面场景；截图按卷面命名保存", "截图命名逐字核对（Dify 页、工作流、测试对话）")
    )
    + '<p style="margin-top:8px;font-size:13.5px;color:#374151">配套：' + btn('6-4','6-4 Ollama') + btn('6-6','6-6 Dify') + btn('6-7','6-7 工作流') + btn('6-8','6-8 冲刺') + '</p></div>' +

    '<div class="sheet-section"><h3>任务五 业务分析（10 分）：痛点 → 方案 → 报告</h3>' +
    stepTable(
      step("1", "痛点三步", "业务痛点 → 现有方案失效原因 → 背景价值（这方案为什么值钱）", "每步 2-3 句，具体不空泛") +
      step("2", "方案四件套", "大语言模型（qwen3:14b-q8_0 或 deepseek-r1:14b）+ 向量模型（bge-m3）+ 平台框架（Dify）+ 数据库（MySQL 或 PostgreSQL）", "每个选型写理由，还要写「为什么不选」") +
      step("3", "工作流五环节", "意图识别 → 知识库检索 → 生成回答 → 人工介入 → 反馈沉淀，附结构图", "与控制层、数据层对应上") +
      step("4", "报告检查", "体现对智能体开发流程理解 + 测试评估 + 改进方向（官方表2点名）", "对照 7-5 检查清单逐项过")
    )
    + '<p style="margin-top:8px;font-size:13.5px;color:#374151">模板与范例：' + btn('7-2','7-2 三步') + btn('7-3','7-3 方案') + btn('7-5','7-5 报告清单') + btn('8-9','8-9 真题范例') + '</p></div>' +

    '<div class="sheet-section"><h3>收卷前 15 分钟检查卡</h3>' +
    '<div class="card"><ul class="points">'
    + '<li>命名逐字核对：大小写、下划线、中文或英文名、序号，跟试卷一字不差</li>'
    + '<li>位置核对：试卷指定电脑、指定目录，逐项找到文件</li>'
    + '<li>能打开核对：每个 csv 双击能开、截图能看、模型文件在</li>'
    + '<li>按试卷任务清单逐项打勾，漏一项补一项</li>'
    + '<li>清理工位、离场（职业素养 5 分的一部分）</li>'
    + '</ul></div></div>' +

    '<div class="card" style="background:#16a34a0d;border-color:#16a34a33"><p style="color:#374151;font-size:14px">一句话原则：<b>先跑通再优化</b>。每个任务先按手册照抄跑出最小结果、把输出文件和打印内容保住，有余力再调参、再优化效果。任务书要求打印什么就打印什么，格式按卷面。</p></div>' +
    '</div>';
}
};