/* ============ 手写练习 ============
   第 8 章真题代码挖空补全 + 在线判分。
   判分三级：① 空位是否填完 ② 代码是否含关键片段 ③ 运行输出是否命中期望。
   全部题目源自第 8 章已验证真题，挖空处代码可在线真跑（Pyodide 全量预载）。
*/
window.PRACTICE = {
list: [
  {
    id: "P1", title: "任务一 · 去重与性别清洗",
    desc: "补全 3 处，让数据去重、性别归一、支付方式过滤全部生效。", src: "8-2",
    template: "import pandas as pd\ndf = pd.read_csv('EcommerceUser.csv', encoding='utf-8')\n\n#① 按 用户编号 去重，保留第一条\ndf = ____①____\n\n#② 性别脏值归一到 男/女\nsex_map = {'男1': '男', '男': '男', '男性': '男', '女2': '女', '女': '女', '女性': '女', '女姓': '女'}\ndf['性别'] = ____②____\n\n#③ 仅保留支付方式为 微信或支付宝或银行卡 的行，同时统计异常数量\nbad = df[~df['支付方式'].isin(['微信', '支付宝', '银行卡'])]\ndf = ____③____\n\nprint('去重后行数:', len(df))\nprint('性别取值:', df['性别'].unique())\nprint('异常支付数量:', len(bad))",
    checks: [
      {type: "code", text: "drop_duplicates", hint: "按列去重：drop_duplicates(subset='用户编号', keep='first')"},
      {type: "code", text: "replace", hint: "列.replace(sex_map) 一次性替换"},
      {type: "code", text: "isin", hint: "过滤用 df[df['支付方式'].isin([...])]"},
      {type: "out", text: "['男', '女']", hint: "性别归一后应只剩 男/女 两种，sex_map 要覆盖全部脏值"},
      {type: "out", text: "去重后行数: 62", hint: "期望输出 去重后行数: 62"},
      {type: "out", text: "异常支付数量", hint: "期望输出 异常支付数量 及其数量"}
    ]
  },
  {
    id: "P2", title: "任务一 · 空值补全与消费等级",
    desc: "补全 4 处，完成缺失值统计、填充和消费分箱。", src: "8-3",
    template: "import pandas as pd\ndf = pd.read_csv('EcommerceUser.csv')\n\n#① 打印各列空值数量\nprint(____①____)\n\n#② 年龄空值用中位数填充\ndf['年龄'] = ____②____\n\n#③ 是否复购空值用众数填充\ndf['是否复购'] = ____③____\n\n#④ 按消费金额分等级\nbins = [0, 5000, 20000, float('inf')]\nlabels = ['低消费', '中消费', '高消费']\n____④____\n\nprint('补全后空值总数:', int(df.isna().sum().sum()))\nprint(df['消费等级'].value_counts().to_dict())",
    checks: [
      {type: "code", text: "isna", hint: "df.isna().sum() 列出各列空值数"},
      {type: "code", text: "median", hint: "fillna(df['年龄'].median())"},
      {type: "code", text: "mode", hint: "fillna(df['是否复购'].mode()[0])，众数要取 [0]"},
      {type: "code", text: "pd.cut", hint: "df['消费等级'] = pd.cut(df['消费金额'], bins=bins, labels=labels, right=True)"},
      {type: "out", text: "补全后空值总数: 0", hint: "期望 补全后空值总数: 0"}
    ]
  },
  {
    id: "P3", title: "任务一 · 掩码与哈希脱敏",
    desc: "补全 2 处，完成手机号掩码和用户编号哈希脱敏。", src: "8-4",
    template: "import pandas as pd, hashlib\ndf = pd.read_csv('EcommerceUser.csv')\n\n#① 手机号掩码：前2位 + 6个星号 + 后3位\ndef mask_phone(p):\n    p = str(p)\n    return ____①____\n\ndf['手机号'] = df['手机号'].apply(mask_phone)\n\n#② 用户编号用哈希脱敏（同一编号哈希值恒定，可验证可用性）\ndf['编号哈希'] = df['用户编号'].apply(____②____)\n\nprint(df.head(3)[['手机号', '编号哈希']].to_string())",
    checks: [
      {type: "code", text: "[:2]", hint: "取前2位：p[:2]"},
      {type: "code", text: "hashlib.sha256", hint: "lambda x: hashlib.sha256(str(x).encode()).hexdigest()"},
      {type: "out", text: "******", hint: "输出里应出现 6 个星号的掩码手机号"}

    ]
  },
  {
    id: "P4", title: "任务二 · 文本预处理与 TF-IDF",
    desc: "补全 3 处，清洗文本并抽取 TF-IDF 特征。", src: "8-5", pkg: "scikit-learn",
    template: "import pandas as pd, re\nfrom sklearn.feature_extraction.text import TfidfVectorizer\n\ndf = pd.read_csv('ShortVideo.csv')\n\n#① 合并 title 与 desc，再去掉非中文字符和数字标点\nclean = []\nfor _, r in df.iterrows():\n    t = str(r['title']) + ' ' + str(r['desc'])\n    t = ____①____\n    t = re.sub(r'\\s+', ' ', t).strip()\n    clean.append(t)\ndf['content'] = clean\n\n#② 构建 TF-IDF 特征（取前 1500 个特征）\nvec = ____②____\nX = vec.fit_transform(df['content'])\n\n#③ 打印矩阵形状与特征名数量\nprint('特征矩阵形状:', X.shape)\nprint('特征名数量:', ____③____)",
    checks: [
      {type: "code", text: "re.sub(r'[^", hint: "保留汉字数字标点：re.sub(r'[^\\u4e00-\\u9fa50-9。，！？]', '', t)"},
      {type: "code", text: "TfidfVectorizer(max_features=1500", hint: "TfidfVectorizer(max_features=1500)，可加 stop_words='english'"},
      {type: "code", text: "get_feature_names_out", hint: "len(vec.get_feature_names_out())"},
      {type: "out", text: "特征矩阵形状: (200,", hint: "200 条样本"}
    ]
  },
  {
    id: "P5", title: "任务二 · 随机森林分类与混淆矩阵",
    desc: "补全 3 处，完成分层划分、训练和评估。", src: "8-6", pkg: "scikit-learn",
    template: "import pandas as pd, re\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, confusion_matrix\n\ndf = pd.read_csv('ShortVideo.csv')\nclean = []\nfor _, r in df.iterrows():\n    t = str(r['title']) + ' ' + str(r['desc'])\n    t = re.sub(r'[^\\u4e00-\\u9fa50-9。，！？]', '', t)\n    t = re.sub(r'\\s+', ' ', t).strip()\n    clean.append(t)\ndf['content'] = clean\nvec = TfidfVectorizer(max_features=1500)\nX = vec.fit_transform(df['content'])\ny = df['label'].values\n\n#① 分层划分训练测试集（25% 测试，固定随机种子）\nX_train, X_test, y_train, y_test = ____①____\n\n#② 随机森林建模\nclf = ____②____\nclf.fit(X_train, y_train)\npred = clf.predict(X_test)\n\n#③ 输出准确率（4 位小数）与混淆矩阵\nprint('准确率:', round(accuracy_score(y_test, pred), 4))\nprint('混淆矩阵:', confusion_matrix(y_test, pred).tolist())",
    checks: [
      {type: "code", text: "stratify=y", hint: "train_test_split(X, y, test_size=0.25, random_state=24, stratify=y)"},
      {type: "code", text: "RandomForestClassifier", hint: "RandomForestClassifier(n_estimators=100, random_state=42)"},
      {type: "out", text: "准确率: 1.0", hint: "该数据全部分类正确，期望 准确率: 1.0"}
    ]
  },
  {
    id: "P6", title: "任务二 · KNN 邻近算法",
    desc: "补全 2 处，训练 KNN 并评估。", src: "4-5", pkg: "scikit-learn",
    template: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.metrics import accuracy_score\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)\n\n#① 创建 KNN 分类器（近邻数 5）并训练\nknn = ____①____\nknn.fit(X_train, y_train)\n\n#② 预测测试集\npred = ____②____\nprint('KNN准确率:', round(accuracy_score(y_test, pred), 4))",
    checks: [
      {type: "code", text: "KNeighborsClassifier(n_neighbors=5)", hint: "KNeighborsClassifier(n_neighbors=5)"},
      {type: "code", text: "knn.predict", hint: "knn.predict(X_test)"}
    ]
  },
  {
    id: "P7", title: "任务二 · 逻辑回归与评估",
    desc: "补全 3 处，训练逻辑回归并输出准确率与 F1。", src: "4-9", pkg: "scikit-learn",
    template: "from sklearn.datasets import load_iris\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, f1_score\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\n\n#① 创建逻辑回归模型（迭代上限放大防止不收敛）\nmodel = ____①____\n\n#② 训练模型\n____②____\n\n#③ 预测并输出评估\npred = ____③____\nprint('逻辑回归准确率:', round(accuracy_score(y_test, pred), 4))\nprint('加权F1:', round(f1_score(y_test, pred, average='weighted'), 4))",
    checks: [
      {type: "code", text: "LogisticRegression(max_iter=1000)", hint: "LogisticRegression(max_iter=1000)"},
      {type: "code", text: "model.fit", hint: "model.fit(X_train, y_train)"},
      {type: "code", text: "model.predict", hint: "model.predict(X_test)"}
    ]
  },
  {
    id: "P8", title: "任务二 · XGBoost（规程点名第 6 算法）",
    desc: "补全 3 处，训练 XGBoost 并输出准确率和特征重要性。", src: "4-11", pkg: "xgboost",
    template: "from sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\nfrom xgboost import XGBClassifier\n\nX, y = load_breast_cancer(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\n\n#① 创建 XGBClassifier 并训练\nclf = ____①____\nclf.fit(X_train, y_train)\n\n#② 预测测试集\npred = ____②____\nprint('XGBoost准确率:', round(accuracy_score(y_test, pred), 4))\n\n#③ 输出特征重要性前 3 个\nprint('特征重要性:', clf.feature_importances_[:3])",
    checks: [
      {type: "code", text: "XGBClassifier", hint: "XGBClassifier(n_estimators=100, random_state=42)"},
      {type: "code", text: "clf.predict", hint: "clf.predict(X_test)"},
      {type: "out", text: "XGBoost准确率:", hint: "期望输出 XGBoost准确率: 与数值"}
    ]
  },
  {
    id: "P9", title: "任务三 · 图像增强四件套",
    desc: "补全 4 处，完成旋转、缩放、翻转、裁切。", src: "5-1a", pkg: "opencv-python",
    template: "import cv2\nimport numpy as np\n\nimg = np.zeros((120, 180, 3), dtype=np.uint8)\nimg[:, :, 0] = 255\n\n#① 顺时针旋转 90°\nrotated = ____①____\n\n#② 缩放到 宽90 高60（resize 参数是 宽,高；shape 是 高,宽）\nresized = ____②____\n\n#③ 水平翻转\nflipped = ____③____\n\n#④ 裁切出 高80 宽100 的区域（切片顺序 高,宽）\ncropped = ____④____\n\nprint('旋转:', rotated.shape, '缩放:', resized.shape, '翻转:', flipped.shape, '裁切:', cropped.shape)",
    checks: [
      {type: "code", text: "cv2.rotate", hint: "cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)"},
      {type: "code", text: "cv2.resize(img, (90, 60))", hint: "cv2.resize(img, (90, 60))：第一个是宽、第二个是高，所以 shape 会得到 (60, 90)"},
      {type: "code", text: "cv2.flip", hint: "cv2.flip(img, 1)，1 表水平翻转"},
      {type: "out", text: "旋转: (180, 120, 3)", hint: "90° 旋转后高宽互换，得到 (180, 120, 3)"},
      {type: "out", text: "缩放: (60, 90, 3)", hint: "resize 传 (90,60) 后 shape 是 (60, 90, 3)"},
      {type: "out", text: "裁切: (80, 100, 3)", hint: "切片 img[y1:y2, x1:x2]，y 范围 80、x 范围 100"}
    ]
  },
  {
    id: "P10", title: "任务二 · 数据划分与标准化",
    desc: "补全 4 处，完成划分与标准化（标准化只拟合训练集）。", src: "4-3", pkg: "scikit-learn",
    template: "from sklearn.datasets import load_diabetes\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_diabetes(return_X_y=True)\n\n#① 8:2 划分训练测试集\nX_train, X_test, y_train, y_test = ____①____\n\n#② 创建标准化器\nsc = ____②____\n\n#③ 用训练集拟合，并转换训练集\nX_train = ____③____\n\n#④ 用同一参数转换测试集（不重新拟合）\nX_test = ____④____\n\nprint('训练集形状:', X_train.shape, '测试集形状:', X_test.shape)\nprint('训练集均值约 0:', round(float(X_train.mean()), 6), '标准差约 1:', round(float(X_train.std()), 6))",
    checks: [
      {type: "code", text: "train_test_split(X, y, test_size=0.2", hint: "train_test_split(X, y, test_size=0.2, random_state=42)"},
      {type: "code", text: "StandardScaler()", hint: "StandardScaler()"},
      {type: "code", text: "sc.fit_transform", hint: "sc.fit_transform(X_train)"},
      {type: "code", text: "sc.transform", hint: "sc.transform(X_test)，不能用 fit_transform"}
    ]
  },
  {
    id: "P11", title: "任务三 · YOLO 数据集格式验证",
    desc: "补全 3 处，读取 yaml配置并检查类别、目录、标签格式。", src: "5-10", pkg: "pyyaml",
    template: "import yaml, os\n\n#① 读取yaml配置\nwith open('dataset.yaml', 'r', encoding='utf-8') as f:\n    data = ____①____\n\n#② 取出类别名列表\nnames = ____②____\nprint('类别:', names)\nprint('类别数:', len(names))\n\n#③ 检查训练集目录是否存在\ntrain_dir = data.get('train', '')\nexists = ____③____\nprint('训练集目录存在:', exists)",
    checks: [
      {type: "code", text: "yaml.safe_load", hint: "yaml.safe_load(f)"},
      {type: "code", text: "names", hint: "data['names'] 或 data.get('names')"},
      {type: "code", text: "os.path.exists", hint: "os.path.exists(train_dir)"},
      {type: "out", text: "类别:", hint: "输出应包含类别列表"}
    ]
  },
  {
    id: "P12", title: "任务三 · YOLO 训练命令补全",
    desc: "补全 3 处，写出完整的 YOLO 训练调用（比赛必背）。", src: "5-10", pkg: "",
    template: "try:\n    from ultralytics import YOLO\nexcept ImportError:\n    YOLO = None\n\nif YOLO:\n    #①加载预训练权重\n    model = ____①____\n\n    #②训练：数据yaml、跑50轮、批次8、图像640\n    model.train(\n        data='dataset.yaml',\n        ____②____,\n        ____③____,\n        img_size=640,\n        workers=0,\n        lr0=0.01\n    )\n    print('训练命令已生成')\nelse:\n    print('ultralytics未安装，跳过实际训练')",
    checks: [
      {type: "code", text: "YOLO('yolov8n.pt')", hint: "加载预训练权重：YOLO('yolov8n.pt')"},
      {type: "code", text: "epochs=50", hint: "训练轮数：epochs=50"},
      {type: "code", text: "batch_size=8", hint: "批次大小：batch_size=8"}
    ]
  },
  {
    id: "P13", title: "任务三 · 混淆矩阵与评估指标",
    desc: "补全 3 处，从混淆矩阵计算准确率、召回率、F1。", src: "5-10", pkg: "numpy",
    template: "import numpy as np\n\n# 模拟3类混淆矩阵\ncm = np.array([[45, 3, 2],\n               [5, 38, 2],\n               [1, 2, 42]])\n\n#①总样本数\ntotal = ____①____\n\n#②正确预测数（对角线之和）\ncorrect = ____②____\n\n#③准确率\nacc = ____③____\nprint(f'样本:{total} 正确:{correct} 准确率:{acc:.4f}')",
    checks: [
      {type: "code", text: ".sum()", hint: "total = cm.sum()"},
      {type: "code", text: "trace", hint: "correct = np.trace(cm)"},
      {type: "code", text: "correct / total", hint: "acc = correct / total"},
      {type: "out", text: "准确率:0.8909", hint: "期望输出 准确率:0.8909"}
    ]
  },
  {
    id: "P14", title: "任务三 · 损失曲线保存（比赛要求 300dpi）",
    desc: "补全 3 处，画出损失曲线并按卷面要求保存。", src: "8-7", pkg: "matplotlib",
    template: "import matplotlib.pyplot as plt\nimport numpy as np\n\nepochs = np.arange(1, 51)\nloss = [0.9 * (0.92 ** x) + 0.03 * np.random.random() for x in epochs]\nval_loss = [0.95 * (0.91 ** x) + 0.04 * np.random.random() for x in epochs]\n\n#①创建画布\nfig, ax = ____①____\n\n#②画两条线\nax.plot(epochs, loss, label='train')\nax.plot(____②____)\n\n#③设置标签和图例\nax.set_xlabel('Epoch')\nax.set_ylabel('Loss')\n____③____\n\n#④保存 300dpi PNG\nplt.savefig('loss_curve.png', dpi=300)\nprint('损失曲线已保存')",
    checks: [
      {type: "code", text: "plt.subplots()", hint: "fig, ax = plt.subplots()"},
      {type: "code", text: "val_loss", hint: "ax.plot(epochs, val_loss, label='val')"},
      {type: "code", text: "legend", hint: "ax.legend()"},
      {type: "out", text: "损失曲线已保存", hint: "输出 损失曲线已保存"}
    ]
  },
  {
    id: "P15", title: "任务五 · 业务痛点分析三步（填空写报告）",
    desc: "补全 3 处，写出业务痛点分析的核心三句话。", src: "7-2", pkg: "",
    template: "# 业务痛点分析三步（比赛报告必写段落）\n\n#①第一步：这个场景的核心痛点是什么？\npain = '____①____'\n\n#②第二步：现有的人工方案为什么不行？\nreason = '____②____'\n\n#③第三步：引入AI智能体后能带来什么价值？\nvalue = '____③____'\n\nprint('痛点:', pain)\nprint('原因:', reason)\nprint('价值:', value)",
    checks: [
      {type: "code", text: "____①____", hint: "空位①还没填"},
      {type: "code", text: "____②____", hint: "空位②还没填"},
      {type: "code", text: "____③____", hint: "空位③还没填"},
      {type: "out", text: "痛点:", hint: "输出应包含三句话"},
      {type: "out", text: "价值:", hint: "输出应包含价值句"}
    ]
  },
  {
    id: "P16", title: "任务五 · 技术方案四件套（填空写报告）",
    desc: "补全 4 处，写出大模型方案的四个技术选型及理由。", src: "7-3", pkg: "",
    template: "# 技术方案四件套（比赛报告必写段落）\n\n#①大语言模型选型（名称+选型理由）\nllm = '____①____'\n\n#②向量模型选型（名称+选型理由）\nemb = '____②____'\n\n#③应用开发平台选型\nplat = '____③____'\n\n#④数据库选型（含为什么不用另一个）\ndb = '____④____'\n\nprint(f'大语言模型: {llm}')\nprint(f'向量模型: {emb}')\nprint(f'开发平台: {plat}')\nprint(f'数据库: {db}')",
    checks: [
      {type: "code", text: "____①____", hint: "空位①还没填"},
      {type: "code", text: "____②____", hint: "空位②还没填"},
      {type: "code", text: "____③____", hint: "空位③还没填"},
      {type: "code", text: "____④____", hint: "空位④还没填"},
      {type: "out", text: "大语言模型:", hint: "输出应包含四个选型"}
    ]
  }
],

render: function(){
  const cards = this.list.map(p => {
    const badges = '<span class="tag" style="background:#e7f0fb;color:#16324f">' + p.src + ' 改编</span>' +
      '<span class="tag" style="background:#f4f4f5;color:#52525b">' + (p.pkg ? p.pkg : 'pandas') + '</span>';
    return '<div class="card" style="margin:14px 0">' +
      '<h3 style="margin:0 0 6px">' + p.id + ' · ' + p.title + '</h3>' +
      '<p style="font-size:14px;color:#52525B;margin:0 0 10px">' + p.desc + '</p>' +
      '<p style="font-size:13px;color:#a1a1aa;margin:0 0 10px">' + badges + '</p>' +
      '<div class="codeblock" data-pkgs="' + (p.pkg ? p.pkg : "") + '">' +
        '<div class="cb-head">' +
          '<span class="cb-title"><span class="lbl demo">手写填空</span></span>' +
          '<div class="cb-btns">' +
            '<button class="btn reset" onclick="practiceReset(this, \'' + p.id + '\')">↺ 重置</button>' +
            '<button class="btn run" onclick="practiceRun(this, \'' + p.id + '\')">▶ 运行判分</button>' +
          '</div>' +
        '</div>' +
        '<div class="codewrap">' +
          '<pre class="hlayer" aria-hidden="true"></pre>' +
          '<textarea class="codearea" spellcheck="false" oninput="autoGrow(this);refreshHL(this)" onscroll="syncHL(this)">' + esc(p.template) + '</textarea>' +
        '</div>' +
        '<pre class="output"></pre>' +
        '<div class="stat-msg"></div>' +
      '</div>' +
    '</div>';
  }).join("");
  return '<div id="article"><div class="sec-head">' +
    '<div class="sec-ch"><span class="hh" style="background:#8b5cf6"></span>动手练习</div>' +
    '<h1>手写练习</h1>' +
    '<div class="sec-meta"><span class="tag">挖空补全</span><span class="tag">填完点判分</span><span class="tag">全部通过记完成</span></div></div>' +
    '<div class="card tip"><p style="margin:0;font-size:14px;color:#374151"><b>怎么练：</b>每道题来自第 8 章真题改编，把 <code>____①____</code> 占位符替换成代码。填完点「运行判分」，系统会检查空位是否填完、代码关键片段、运行输出三项。先独立思考，卡住再看「判分失败」后给出的提示。</p></div>' +
    cards +
    '</div>';
},

reset: function(btn, id){
  const p = this.list.find(x => x.id === id);
  const block = btn.closest(".codeblock");
  const ta = block.querySelector("textarea");
  ta.value = p.template;
  autoGrow(ta); refreshHL(ta);
  const out = block.querySelector(".output");
  out.textContent = ""; out.className = "output";
  const stat = block.querySelector(".stat-msg");
  stat.textContent = ""; stat.className = "stat-msg";
},

async run(btn, id){
  const p = this.list.find(x => x.id === id);
  const block = btn.closest(".codeblock");
  const ta = block.querySelector("textarea");
  const out = block.querySelector(".output");
  const stat = block.querySelector(".stat-msg");
  const code = ta.value;
  out.textContent = ""; out.className = "output show";
  stat.textContent = ""; stat.className = "stat-msg";

  const blanks = code.match(/____[^_\s]+____/g) || [];
  if(blanks.length){
    out.textContent = "✗ 还有 " + blanks.length + " 处空位没填，先补上再判分";
    out.className = "output show err";
    return;
  }
  btn.disabled = true; btn.textContent = "判分中…";
  try {
    await ensurePyodide(p.pkg ? [p.pkg] : []);
    await pyodide.runPythonAsync("import io, sys; _buf = io.StringIO(); _old = (sys.stdout, sys.stderr); sys.stdout = _buf; sys.stderr = _buf");
    await pyodide.runPythonAsync(code);
    const txt = await pyodide.runPythonAsync("_buf.getvalue()");
    await pyodide.runPythonAsync("sys.stdout, sys.stderr = _old");
    const fail = [];
    p.checks.forEach(c => {
      if(c.type === "code" && !code.includes(c.text)) fail.push({ c: c, msg: "代码应包含「" + c.text + "」" });
      if(c.type === "out" && !txt.includes(c.text)) fail.push({ c: c, msg: "输出缺少「" + c.text + "」" });
    });
    if(fail.length){
      out.textContent = "✗ 未通过 " + fail.length + " 项检查：\n" + fail.map(f => "· " + f.msg).join("\n");
      out.className = "output show err";
      stat.textContent = "提示：" + firstHint(fail[0].c.hint);
      stat.className = "stat-msg show";
      return;
    }
    out.textContent = txt.slice(0, 1500);
    out.className = "output show ok";
    stat.textContent = "✔ 全部通过，代码正确且输出符合预期";
    stat.className = "stat-msg show ok";
    try {
      let a = []; try { a = JSON.parse(localStorage.getItem("np_practice") || "[]"); } catch(e){}
      if(!a.includes(p.id)){ a.push(p.id); localStorage.setItem("np_practice", JSON.stringify(a)); }
      markPracticeBtns(a);
    } catch(e){}
  } catch(e){
    await pyodide.runPythonAsync("sys.stdout, sys.stderr = _old").catch(() => {});
    out.textContent = "✗ 运行报错：\n" + String((e && e.message) || e).slice(0, 800);
    out.className = "output show err";
    const msg = String((e && e.message) || e).split("\n").pop().slice(0, 120);
    stat.textContent = "✖ " + msg;
    stat.className = "stat-msg show";
  } finally {
    btn.disabled = false; btn.textContent = "▶ 运行判分";
  }
}
};

function practiceRun(btn, id){ return PRACTICE.run(btn, id); }
function practiceReset(btn, id){ return PRACTICE.reset(btn, id); }
function firstHint(h){ return h || "看题目描述和注释"; }
function markPracticeBtns(list){
  document.querySelectorAll("#article .card").forEach((card, i) => {
    const b = card.querySelector(".cb-title .lbl");
    if(b && list.includes("P" + (i + 1))) b.textContent = "✔ 已通过";
  });
}