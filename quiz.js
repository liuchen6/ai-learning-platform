window.QUIZ = [
  {q: "NumPy 数组的 shape 返回 (2,3,4)，则 ndim 是多少？", opts: ["2", "3", "24", "12"], ans: 1, exp: "ndim 是维度个数，shape 元组有几个数就几维。shape (2,3,4) → 3 维。"},
  {q: "np.arange(2, 10, 3) 的结果是？", opts: ["[2,5,8]", "[2,5,8,11]", "[3,6,9]", "[2,4,6,8]"], ans: 0, exp: "arange(起点, 终点(不含), 步长)，2 → 5 → 8，到 11 已超 10 不含。"},
  {q: "np.linspace(0, 1, 5) 生成几个数？最后一个是多少？", opts: ["5 个，最后一个 0.75", "5 个，最后一个 1", "4 个，最后一个 1", "5 个，最后一个 0.8"], ans: 1, exp: "linspace 含终点且个数参数即总数，5 个数 = [0, 0.25, 0.5, 0.75, 1]。"},
  {q: "二维数组 a 形状 (4,3)，a.sum(axis=0) 的形状是？", opts: ["(4,)", "(3,)", "(4,3)", "标量"], ans: 1, exp: "axis=0 压缩第 0 维（行方向求和），每列出一个数 → 形状 (3,)。"},
  {q: "a 和 b 是两个 2×2 数组。a @ b 表示？", opts: ["逐元素相乘", "矩阵乘法（行×列 内积）", "逐元素相加", "拼接"], ans: 1, exp: "@ 和 .dot() 是矩阵乘法；逐元素乘用 *。"},
  {q: "np.array([1,2,3]) 与 np.array([[4],[5],[6]]) 做 a + b，结果形状是？", opts: ["广播成 3×3", "报错", "形状 (1,)", "(3,)"], ans: 0, exp: "广播机制：A 形状 (3,)，B 形状 (3,1)，对齐后变成 (3,3)，每列都是 a+对应的 b 行。"},
  {q: "a = np.arange(9).reshape(3,3)，取出第 2 列（所有行）的写法是？", opts: ["a[2]", "a[2, :]", "a[:, 2]", "a[:, 1]"], ans: 3, exp: "冒号在前取所有行，列索引 1 是第 2 列（从 0 数）。"},
  {q: "把 array([1,1,1]) 和 array([2,2,2]) 拼成两行三列的数组，用？", opts: ["np.hstack", "np.vstack", "np.concat", "a + b"], ans: 1, exp: "加行（上下拼）用 vstack，结果是 (2,3)；hstack 是水平拼 (6,)。"},
  {q: "data 形状 (1000, 10)，要切成前 800 行训练、后 200 行测试，最合适的是？", opts: ["np.split(data, 2)", "np.array_split(data, [800], axis=0)", "data.reshape(2,500)", "data.copy()"], ans: 1, exp: "带切点列表的 array_split/split：np.split(data, [800], axis=0) 也行；np.split(data,2) 是等分 2 块各 500 行，不对。"},
  {q: "numpy 里改 b = a 后改了 b 的值，a 也会变。要独立副本用？", opts: ["b = a.view()", "b = a.copy()", "b = a[:]", "b = np.shares_memory(a)"], ans: 1, exp: "copy() 才产生独立数据；其他都是视图/别名，改一处全变。"},
  {q: "DataFrame 中按标签（行名）取数据用？", opts: ["df.iloc", "df.loc", "df.iat", "df.at"], ans: 1, exp: "loc 按标签，iloc 按位置（index 数字）。"},
  {q: "df 行数很多，想看每列缺失值个数，正确写法是？", opts: ["df.isnull()", "df.dropna()", "df.isnull().sum()", "df.describe()"], ans: 2, exp: "isnull() 是布尔表，.sum() 按列把 True 计数 → 每列缺失数，清洗前必查。"},
  {q: "df['成绩'] 含缺失，用该列均值填充的正确写法？", opts: ["df['成绩'].fillna(0)", "df['成绩'] = df['成绩'].interpolate()", "df['成绩'] = df['成绩'].fillna(df['成绩'].mean())", "df.fillna(method='ffill')"], ans: 2, exp: "必须用 df['成绩'].mean() 作为填充值，且要赋值回原列。"},
  {q: "导出 CSV 时哪句话对比赛最安全？", opts: ["df.to_csv('out.csv')", "df.to_csv('out.csv', index=False)", "df.to_csv('out.csv', index=True)", "df.to_string()"], ans: 1, exp: "index=False 不写入行号列，是提交文件的规范姿势。"},
  {q: "student 表和 score 表都有「学号」列，按学号对接（学生表为准）用？", opts: ["pd.concat([student, score])", "score.merge(student)", "student.merge(score, on='学号', how='left')", "student.append(score)"], ans: 2, exp: "merge 按键、concat 按形状。how='left' 以左表（student）行为准。"},
  {q: "df.plot.scatter(x='A', y='B') 默认 title 没有，报告里图该有？", opts: ["标题、坐标轴标签、图例", "底部注释", "数据量", "缩放"], ans: 0, exp: "比赛评分看重图表规范性：必带标题和轴标签；多序列时图例也要有。"}
];