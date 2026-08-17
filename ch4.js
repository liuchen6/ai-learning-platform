/* 第4章 机器学习 (10分)
   来源视频：BV1nt411r7tj 黑马程序员3天快速入门python机器学习（49集）
   覆盖：数据集划分/特征抽取/归一化标准化/降维PCA/KNN/朴素贝叶斯/决策树/随机森林/
         线性回归/岭回归/逻辑回归/模型评估/模型保存/KMeans
   全部示例可浏览器在线运行（scikit-learn 包） */
window.PART4 = [
{
  id:"4-1", ch:"4", no:"1", title:"机器学习入门与数据集",
  dur:"第1-9集", tag:"sklearn",
  lead:"机器学习 = 让程序从数据里自己学规律。比赛里 80% 的题都是：给数据 → 划分训练集测试集 → 训练模型 → 评估。",
  points:[
    "<b>什么是机器学习</b>。传统编程是人写规则；机器学习是人给数据和答案，程序自己总结规律。",
    "<b>两大分类</b>。监督学习（数据带答案：分类、回归）和非监督学习（无答案：聚类）。",
    "<b>sklearn 自带数据集</b>。load_iris 鸢尾花分类、load_boston（已被替代）、fetch 系列。比赛最常用 load_iris、load_digits、make_blobs 造假数据。",
    "<b>数据划分</b>。train_test_split 分成训练集（学规律）和测试集（考效果），默认 test_size=0.25。",
    "<b>为什么划分</b>。用训练集学出来的模型，必须在没见过的测试集上验证，否则是自欺欺人。",
    "<b>特征矩阵与目标</b>。X = 特征（二维数组），y = 目标（一维数组）。sklearn 全家桶都吃这个格式。"
  ],
  demos:[
    {
      title:"数据集加载与划分",
      code:"from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\ndata = load_iris()\nX, y = data.data, data.target\nprint(\"特征矩阵形状:\", X.shape, \"(样本数, 特征数)\")\nprint(\"目标数组形状:\", y.shape)\nprint(\"类别:\", data.target_names)\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, random_state=42)\n\nprint(\"\\n训练集:\", X_train.shape, \" 测试集:\", X_test.shape)\nprint(\"测试集是模型没见过的数据，用来检验真实效果\")",
      pkgs:"scikit-learn"
    }
  ],
  tip:"random_state 固定随机种子，比赛里保证结果可复现，评分时也不容易出岔子。"
},
{
  id:"4-2", ch:"4", no:"2", title:"特征工程：特征抽取",
  dur:"第10-13集", tag:"特征工程",
  lead:"模型只能吃数字。文本、类别这些非数字数据，要先用「特征抽取」变成数字，才能喂给模型。",
  points:[
    "<b>字典特征抽取</b>。DictVectorizer 把 {key: value} 字典转成矩阵，类别列变成 0/1 独热列。",
    "<b>文本特征抽取</b>。CountVectorizer 统计每个词在每篇文档出现次数，形成词频矩阵（词袋模型）。",
    "<b>中文分词前置</b>。中文文本要先分词（jieba）再抽取，否则一个整句只算一个特征。",
    "<b>TF-IDF</b>。TfidfVectorizer 在词频基础上，降低「每篇都有的常见词」权重（的、是、了），突出关键词。文本分类常用。",
    "<b>比赛应用</b>。「评论情感分类」「文本归类」题基本都是 分词 → TF-IDF → 朴素贝叶斯/逻辑回归 这条线。"
  ],
  demos:[
    {
      title:"文本特征抽取 CountVectorizer 与 TfidfVectorizer",
      code:"from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer\n\ndocs = [\n    \"人工智能 机器学习 神经网络\",\n    \"机器学习 数据集 训练 预测\",\n    \"神经网络 深度学习 训练\"\n]\n\ncv = CountVectorizer()\nX_cv = cv.fit_transform(docs).toarray()\nif hasattr(cv, \"get_feature_names_out\"):\n    feat = cv.get_feature_names_out()\nelse:\n    feat = cv.get_feature_names()\nprint(\"词表:\", feat)\nprint(\"词频矩阵:\")\nprint(X_cv)\n\ntfidf = TfidfVectorizer()\nX_tf = tfidf.fit_transform(docs).toarray()\nprint(\"\\nTF-IDF 矩阵（常见词权重被压低）:\")\nprint(X_tf.round(3))",
      pkgs:"scikit-learn"
    }
  ],
  tip:"TF-IDF 是文本题的默认选择。记住 fit_transform 用于训练集、transform 用于测试集（测试集只能用训练集学到的词表）。"
},
{
  id:"4-3", ch:"4", no:"3", title:"特征预处理：归一化与标准化",
  dur:"第14-16集", tag:"特征预处理",
  lead:"特征量纲不同（年龄 0-100、工资 0-5万）会带偏模型。预处理把特征拉到同一尺度，模型才能公平对待每个特征。",
  points:[
    "<b>为什么预处理</b>。KNN 算距离、梯度下降找最优，都会偏向数值大的特征，必须统一尺度。",
    "<b>归一化</b>。MinMaxScaler 把数据缩放到 [0,1]，公式 (x-min)/(max-min)。对极端值敏感。",
    "<b>标准化</b>。StandardScaler 减均值除标准差，数据变成均值0方差1。对极端值更稳，比赛首选。",
    "<b>区别记忆</b>。归一化看极值，标准化看分布。数据没明显离群点时两者皆可，有离群点用标准化。",
    "<b>关键细节</b>。训练集 fit 后，测试集只用 transform（沿用训练集的均值方差），绝不能再 fit。"
  ],
  demos:[
    {
      title:"MinMaxScaler 与 StandardScaler 对比",
      code:"from sklearn.preprocessing import MinMaxScaler, StandardScaler\nimport numpy as np\n\n# 模拟：年龄(0-80) 和 收入(0-50000)，量纲差 600 倍\nX = np.array([[25, 30000], [40, 50000], [30, 15000], [60, 40000]], dtype=float)\nprint(\"原始数据:\")\nprint(X)\n\nmm = MinMaxScaler()\nX_mm = mm.fit_transform(X)\nprint(\"\\n归一化 [0,1]：\")\nprint(X_mm.round(3))\n\nss = StandardScaler()\nX_ss = ss.fit_transform(X)\nprint(\"\\n标准化 (均值0方差1)：\")\nprint(X_ss.round(3))\nprint(\"两列尺度相同，后续模型不再被量纲带偏\")",
      pkgs:"scikit-learn"
    }
  ],
  tip:"无脑先用 StandardScaler。预处理放在 pipeline 里和模型一起训练，测试时不会漏。"
},
{
  id:"4-4", ch:"4", no:"4", title:"降维：主成分分析 PCA",
  dur:"第17-18集", tag:"降维",
  lead:"特征太多（几十上百个）时，训练慢、还容易过拟合。PCA 把多个特征压缩成少数几个综合特征，保住大部分信息。",
  points:[
    "<b>为什么降维</b>。特征多 → 计算量大 + 冗余（很多特征高度相关）。降维后模型更快更稳。",
    "<b>PCA 原理</b>。找数据方差最大的方向做主成分，把数据投影上去。第一主成分保留信息最多，依次递减。",
    "<b>保留多少</b>。n_components 可以写个数，也可以写 0.95 表示保留 95% 的信息（按方差占比）。",
    "<b>explained_variance_ratio_</b>。查看每个主成分保留了多少信息比例，用于决定降维到几维。",
    "<b>使用注意</b>。PCA 前通常先标准化。降维后特征失去可解释性，只看效果不看含义。"
  ],
  demos:[
    {
      title:"PCA 降维与信息保留比例",
      code:"from sklearn.datasets import load_iris\nfrom sklearn.decomposition import PCA\nfrom sklearn.preprocessing import StandardScaler\n\nX = load_iris().data\nXs = StandardScaler().fit_transform(X)\n\npca = PCA(n_components=2)\nX_pca = pca.fit_transform(Xs)\nprint(\"原始特征数:\", X.shape[1], \"-> 降维后:\", X_pca.shape[1])\nprint(\"每个主成分保留信息比例:\", pca.explained_variance_ratio_.round(3))\nprint(\"前2个主成分共保留:\", pca.explained_variance_ratio_.sum().round(3))\n\n# 自动保留 95% 信息\npca2 = PCA(n_components=0.95)\nprint(\"\\n保留95%信息需要几维:\", pca2.fit_transform(Xs).shape[1])",
      pkgs:"scikit-learn"
    }
  ],
  tip:"题目说「特征太多，先压缩再训练」，答案就是 PCA。0.95 是稳妥默认值。"
},
{
  id:"4-5", ch:"4", no:"5", title:"KNN 邻近算法",
  dur:"第19-24集", tag:"分类",
  lead:"KNN：离我最近的 K 个邻居投票决定我是谁。原理最简单、比赛出现率最高的算法之一。",
  points:[
    "<b>原理</b>。新样本和训练集里所有样本算距离，取最近的 K 个，多数投票定类别。",
    "<b>距离度量</b>。默认欧氏距离；特征量纲不同必须预处理。",
    "<b>K 值选择</b>。K 太小易受噪声影响，太大分类粗糙。常用 K=5，用网格搜索 GridSearchCV 找最优。",
    "<b>优点缺点</b>。优点：简单、无需训练过程。缺点：预测要算全部距离，样本多时慢；对不平衡数据不友好。",
    "<b>交叉验证</b>。GridSearchCV 把训练集再拆小份轮流验证，自动试参数组合，比赛调参的标准姿势。"
  ],
  demos:[
    {
      title:"KNN 分类 + GridSearchCV 调 K",
      code:"from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split, GridSearchCV\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, random_state=42)\n\nss = StandardScaler()\nX_train = ss.fit_transform(X_train)\nX_test = ss.transform(X_test)\n\n# 网格搜索：自动试 K=3,5,7 的交叉验证效果\nknn = KNeighborsClassifier()\ngrid = GridSearchCV(knn, {\"n_neighbors\": [3, 5, 7]}, cv=5)\ngrid.fit(X_train, y_train)\nprint(\"最优 K:\", grid.best_params_)\nprint(\"交叉验证最优得分:\", grid.best_score_.round(3))\n\nprint(\"测试集准确率:\", grid.score(X_test, y_test).round(3))\nprint(\"预测前3个样本的类别:\", grid.predict(X_test[:3]))",
      pkgs:"scikit-learn"
    }
  ],
  tip:"KNN 题的关键词：距离、K值、交叉验证、预处理。三步连招（标准化→网格搜索→评估）拿满步骤分。"
},
{
  id:"4-6", ch:"4", no:"6", title:"朴素贝叶斯",
  dur:"第25-28集", tag:"分类",
  lead:"朴素贝叶斯：用条件概率做分类，文本分类（垃圾邮件、情感分析）的经典算法。",
  points:[
    "<b>原理</b>。贝叶斯公式算「在特征下属于每类的概率」，选概率最大的类。朴素 = 假设特征相互独立。",
    "<b>拉普拉斯平滑</b>。alpha 参数：防止某个词从未出现导致概率算成 0，默认 alpha=1.0。",
    "<b>适合场景</b>。高维稀疏数据（文本词频矩阵）效果好、速度快，训练只要统计一遍概率表。",
    "<b>sklearn 实现</b>。MultinomialNB 多项式朴素贝叶斯，文本分类专用。",
    "<b>文本分类流程</b>。分词 → TF-IDF/词频 → MultinomialNB → 评估。和特征抽取那课串起来就是完整项目。"
  ],
  demos:[
    {
      title:"朴素贝叶斯文本分类",
      code:"from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\ndocs = [\n    \"算法 模型 训练 数据集 准确率\",\n    \"神经网络 深度学习 卷积 层\",\n    \"数据库 表 查询 索引 存储\",\n    \"算法 优化 收敛 梯度下降\",\n    \"数据库 事务 备份 恢复\",\n    \"深度学习 图像 识别 卷积神经网络\",\n]\nlabels = [\"机器学习\", \"深度学习\", \"数据库\",\n          \"机器学习\", \"数据库\", \"深度学习\"]\n\nX_train, X_test, y_train, y_test = train_test_split(\n    docs, labels, test_size=0.3, random_state=42)\n\ntf = TfidfVectorizer()\nXtr = tf.fit_transform(X_train)\nXte = tf.transform(X_test)\n\nnb = MultinomialNB()\nnb.fit(Xtr, y_train)\npred = nb.predict(Xte)\nprint(\"预测:\", pred)\nprint(\"真实:\", y_test)\nprint(\"准确率:\", accuracy_score(y_test, pred).round(3))",
      pkgs:"scikit-learn"
    }
  ],
  tip:"比赛里「文档分类/垃圾邮件/情感分析」题直接用 MultinomialNB，训练快、代码短、效果达标。"
},
{
  id:"4-7", ch:"4", no:"7", title:"决策树与随机森林",
  dur:"第29-35集", tag:"分类",
  lead:"决策树靠「问问题」分类，随机森林把很多棵决策树投票合起来，又稳又强，是比赛性价比最高的算法。",
  points:[
    "<b>决策树原理</b>。每个节点按某特征问一个问题，把数据分两支，直到叶子节点基本是同一类。",
    "<b>划分依据</b>。分类树用信息增益（ID3）或基尼系数（CART，默认）；回归树用 MSE。",
    "<b>决策树缺点</b>。容易过拟合：树长太深，把训练集背下来。需要剪枝或限制 max_depth。",
    "<b>随机森林</b>。随机抽样本 + 随机抽特征，训练很多棵树，投票定结果。树多防过拟合，效果显著提升。",
    "<b>参数</b>。n_estimators 树的数量（默认100）、max_depth 深度限制、random_state。",
    "<b>特征重要性</b>。feature_importances_ 直接输出每个特征的重要度，能告诉比赛评委「模型看什么」。"
  ],
  demos:[
    {
      title:"决策树 vs 随机森林对比 + 特征重要性",
      code:"from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42)\n\ndt = DecisionTreeClassifier(max_depth=3, random_state=42)\ndt.fit(X_train, y_train)\nprint(\"决策树准确率:\", dt.score(X_test, y_test).round(3))\n\nrf = RandomForestClassifier(n_estimators=100, random_state=42)\nrf.fit(X_train, y_train)\nprint(\"随机森林准确率:\", rf.score(X_test, y_test).round(3))\nprint(\"\\n随机森林特征重要性:\", rf.feature_importances_.round(3))\n\n# 不加深度限制的决策树容易过拟合（训练满分、测试一般）\ndt2 = DecisionTreeClassifier(random_state=42)\ndt2.fit(X_train, y_train)\nprint(\"\\n不限制深度的决策树 - 训练集:\", dt2.score(X_train, y_train).round(3),\n      \"测试集:\", dt2.score(X_test, y_test).round(3), \"<- 过拟合迹象\")",
      pkgs:"scikit-learn"
    }
  ],
  tip:"随机森林是默认选择：不用太调参、抗过拟合、还能给特征重要性做解释。比赛里「哪个特征最影响结果」就用 feature_importances_ 回答。"
},
{
  id:"4-8", ch:"4", no:"8", title:"线性回归与岭回归",
  dur:"第36-40集", tag:"回归",
  lead:"预测「数值」（房价、销量、温度）用回归。线性回归是最基础模型，岭回归是它的防过拟合版。",
  points:[
    "<b>线性回归原理</b>。找一条线/一个超平面 y = w·x + b，让预测值和真实值误差最小。",
    "<b>求解方法</b>。正规方程（一次性算出最优解，sklearn 的 LinearRegression 默认）和梯度下降（一步步迭代逼近）。",
    "<b>损失函数</b>。均方误差 MSE = 误差平方的平均。梯度下降就是不断让 MSE 变小。",
    "<b>欠拟合与过拟合</b>。特征太少模型学不到规律（欠拟合）；特征太多或模型太复杂把噪声也学了（过拟合）。",
    "<b>岭回归</b>。在线性回归损失里加 L2 惩罚项（系数平方和），把系数往小压，牺牲一点训练精度换泛化能力。",
    "<b>回归评估</b>。r2_score（R²，越接近1越好）和 MSE 是回归题的标准指标。"
  ],
  demos:[
    {
      title:"线性回归 vs 岭回归：高噪声数据对比",
      code:"from sklearn.linear_model import LinearRegression, Ridge\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import mean_squared_error, r2_score\nimport numpy as np\n\nrng = np.random.default_rng(42)\n# 造数据：y = 3x + 5 + 噪声，再加两个纯噪声特征\nX = rng.uniform(-10, 10, (200, 1))\ny = 3 * X[:, 0] + 5 + rng.normal(0, 5, 200)\nX_noise = rng.normal(0, 1, (200, 6))   # 6 个无关特征\nX_all = np.hstack([X, X_noise])\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X_all, y, test_size=0.3, random_state=42)\n\nlr = LinearRegression()\nlr.fit(X_train, y_train)\nprint(\"线性回归 测试集 MSE:\", mean_squared_error(y_test, lr.predict(X_test)).round(2))\n\n# 岭回归：加 L2 正则压制噪声特征\nridge = Ridge(alpha=10)\nridge.fit(X_train, y_train)\nprint(\"岭回归   测试集 MSE:\", mean_squared_error(y_test, ridge.predict(X_test)).round(2))\n\nprint(\"\\nR² 对比 - 线性:\", r2_score(y_test, lr.predict(X_test)).round(3),\n      \"岭:\", r2_score(y_test, ridge.predict(X_test)).round(3))",
      pkgs:"scikit-learn"
    }
  ],
  tip:"特征多、噪声大、怕过拟合 → 岭回归（L2）。题目出现「正则化」「防止过拟合」关键词，答案基本就是它。"
},
{
  id:"4-9", ch:"4", no:"9", title:"逻辑回归与模型评估",
  dur:"第41-45集", tag:"分类评估",
  lead:"逻辑回归做「是/否」分类（预测的是概率），评估指标有精确率、召回率、F1、ROC。分类题的标准收尾动作。",
  points:[
    "<b>逻辑回归原理</b>。线性输出过 sigmoid 函数变成 0-1 概率，概率 ≥0.5 判正类。名字带回归，干的是分类。",
    "<b>精确率 vs 召回率</b>。精确率 = 预测为正的里面有多少真的（少误报）；召回率 = 真正的里面找到多少（少漏报）。",
    "<b>F1 值</b>。精确率和召回率的调和平均，两者平衡的指标，比赛常用。",
    "<b>ROC 与 AUC</b>。ROC 曲线画「误报率 vs 召回率」的权衡，AUC 是曲线下面积（越接近1越好）。",
    "<b>sklearn 工具</b>。classification_report 一张表输出全部指标；roc_auc_score 算 AUC。",
    "<b>比赛要点</b>。评估题一般问：哪个指标、怎么算、模型好不好。AUC>0.9 就是好模型。"
  ],
  demos:[
    {
      title:"逻辑回归 + 完整评估指标",
      code:"from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import (classification_report, roc_auc_score,\n                             confusion_matrix)\n\n# 只取前两类做二分类，方便看指标\nX, y = load_iris(return_X_y=True)\nmask = y < 2\nX, y = X[mask], y[mask]\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42)\n\nlr = LogisticRegression(max_iter=500)\nlr.fit(X_train, y_train)\npred = lr.predict(X_test)\n\nprint(classification_report(y_test, pred, target_names=[\"类0\", \"类1\"]))\n\nprint(\"混淆矩阵:\\n\", confusion_matrix(y_test, pred))\nprint(\"AUC:\", roc_auc_score(y_test, lr.predict_proba(X_test)[:, 1]).round(3))\nprint(\"AUC 越接近 1 越好，>0.9 属于优秀模型\")",
      pkgs:"scikit-learn"
    }
  ],
  tip:"评估题三件套：classification_report、混淆矩阵、AUC。正负类怎么定会影响指标，看清题目再写。"
},
{
  id:"4-10", ch:"4", no:"10", title:"模型保存与 KMeans 聚类",
  dur:"第46-49集", tag:"保存+聚类",
  lead:"最后两件事：模型训练完要能存下来带走（joblib），以及无监督聚类 KMeans 找数据的分组规律。",
  points:[
    "<b>模型保存</b>。joblib.dump(model, \"model.pkl\") 存，joblib.load 读回。比赛里「训练完保存模型，预测时加载」是标准流程。",
    "<b>为什么保存</b>。训练几分钟、预测几毫秒。保存后预测时不用重训，评分环节只加载推理即可。",
    "<b>KMeans 原理</b>。随机放 K 个中心 → 每样本归到最近中心 → 中心移到簇均值 → 重复直到收敛。",
    "<b>K 值怎么定</b>。肘部法：画「簇内误差平方和 SSE vs K」，曲线拐弯处就是合适的 K。",
    "<b>比赛应用</b>。「客户分群」「数据分组」题：KMeans + 分析每簇特征。无标签数据就只能走这条路。"
  ],
  demos:[
    {
      title:"KMeans 聚类 + 肘部法选 K",
      code:"from sklearn.datasets import make_blobs\nfrom sklearn.cluster import KMeans\nfrom joblib import dump, load\nimport numpy as np\n\n# 造 3 团数据（模拟无标签的业务数据）\nX, _ = make_blobs(n_samples=300, centers=3, random_state=42)\n\n# 肘部法：试 K=1..6，看 SSE 拐点\nsse = []\nfor k in range(1, 7):\n    km = KMeans(n_clusters=k, n_init=10, random_state=42)\n    km.fit(X)\n    sse.append(km.inertia_)\nprint(\"K=1..6 的簇内误差平方和:\", [round(s, 1) for s in sse])\nprint(\"从 K=3 开始下降变缓（拐点）=> 选 K=3\")\n\n# 正式聚类\nkm = KMeans(n_clusters=3, n_init=10, random_state=42)\nkm.fit(X)\nprint(\"\\n每簇样本数:\", np.bincount(km.labels_))\n\n# 保存与加载\ndump(km, \"kmeans.pkl\")\nkm2 = load(\"kmeans.pkl\")\nprint(\"保存并重新加载后，对新样本预测分组:\", km2.predict(X[:3]))",
      pkgs:"scikit-learn"
    }
  ],
  tip:"joblib 保存模型是比赛送分细节，别忘了。肘部法讲出「拐点」两个字，说明你真懂 K 值怎么选。"
}
];
