window.PART3 = [
{
  id: "3-1", ch: "3", no: "3.1", title: "pandas 基本介绍", dur: "17:47", tag: "Pandas 入门",
  lead: "Pandas 的核心是 DataFrame（表格）和 Series（带标签的一列）。这一节把这两个东西的形状和基本操作打通。",
  points: [
    "<b>Series</b>：一列数据，自带索引。可以指定 index（行名），不指定就用 0,1,2…",
    "<b>DataFrame</b>：一张表，由多个 Series 组成：每个列是一个 Series，行也有 index。",
    "创建：<code>pd.Series(数据, index=行名)</code>、<code>pd.DataFrame({'列名': 列表, ...})</code>，字典的键自动成为列名。",
    "查看：<code>df.head(n)</code> 看前 n 行（默认5）、<code>df.tail(n)</code> 看尾部、<code>df.info()</code> 一览列名/类型/缺失、<code>df.describe()</code> 出数值列的统计摘要。",
    "比赛拿到数据集第一步永远三连：<code>df.head()</code> + <code>df.info()</code> + <code>df.describe()</code>，先摸清数据再写逻辑。"
  ],
  tip: "一拿到数据就 print head + info + describe 是职业习惯。花 1 分钟看全貌，能少走 10 分钟弯路。",
  demos: [
    {
      title: "Series 与 DataFrame 的基本形态",
      code: [
        "import pandas as pd",
        "import numpy as np",
        "",
        "# Series",
        "s = pd.Series([85, 90, 78], index=['张三', '李四', '王五'])",
        "print('Series:'); print(s)",
        "",
        "# DataFrame",
        "df = pd.DataFrame({",
        "    '姓名': ['张三', '李四', '王五', '赵六'],",
        "    '年龄': [20, 21, 19, 22],",
        "    '成绩': [85, 90, 78, 88]",
        "})",
        "print('\\nDataFrame:'); print(df)",
        "",
        "print('\\ndf.head(2):'); print(df.head(2))",
        "print('\\ndf.info():'); print(df.info())",
        "print('\\ndf.describe():'); print(df.describe())"
      ].join("\n")
    }
  ],
  exercise: {
    task: "创建 DataFrame：三列分别为 城市(北京/上海/广州)、气温(28/31/26)、湿度(60/72/55)，加自定义行名 a,b,c；打印 head(2) 和 describe()。",
    starter: [
      "import pandas as pd",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import pandas as pd",
      "",
      "df = pd.DataFrame({",
      "    '城市': ['北京', '上海', '广州'],",
      "    '气温': [28, 31, 26],",
      "    '湿度': [60, 72, 55]",
      "}, index=['a', 'b', 'c'])",
      "print(df)",
      "print('\\n前2行:'); print(df.head(2))",
      "print('\\n统计摘要:'); print(df.describe())"
    ].join("\n")
  }
},
{
  id: "3-2", ch: "3", no: "3.2", title: "pandas 选择数据", dur: "11:43", tag: "Pandas 操作",
  lead: "取列、取行、按条件筛：三件事，三种写法。这一节的技能是数据处理的日常。",
  points: [
    "<b>取列</b>：<code>df['列名']</code> 得到 Series；<code>df[['a','b']]</code> 取多列得到 DataFrame。",
    "<b>loc（按标签/行名）</b>：<code>df.loc['行名']</code>、<code>df.loc['行1':'行2']</code>（含终点）、<code>df.loc[['行1','行3'], ['列1','列2']]</code> 行列同时选。",
    "<b>iloc（按位置）</b>：<code>df.iloc[0]</code> 第 1 行、<code>df.iloc[1:3, 0:2]</code> 第 2~3 行×第 1~2 列（不含终点）。",
    "<b>布尔筛选</b>：<code>df[df['成绩'] > 80]</code> 筛出成绩大于 80 的行；多个条件用 <code>&amp;</code>（且）、<code>|</code>（或），条件必须整体加括号：<code>df[(df.a>1) &amp; (df.b<3)]</code>。",
    "记法：<b>loc 用名字，iloc 用数字</b>（i 开头就想 index 数字）。比赛里无脑用 iloc 更稳（不怕行名乱）。"
  ],
  tip: "取「某些行某些列」时 <code>df.loc[行名列表, 列名列表]</code> 一次搞定；只按位置就 iloc。先想清楚按名还是按位。",
  demos: [
    {
      title: "取列、loc、iloc、布尔筛选",
      code: [
        "import pandas as pd",
        "",
        "df = pd.DataFrame({",
        "    '姓名': ['张三', '李四', '王五', '赵六'],",
        "    '年龄': [20, 21, 19, 22],",
        "    '成绩': [85, 90, 78, 88]",
        "}, index=['r1', 'r2', 'r3', 'r4'])",
        "",
        "print('取一列:'); print(df['成绩'])",
        "print('取多列:'); print(df[['姓名', '成绩']])",
        "",
        "print('loc 按行名:', df.loc['r2'])",
        "print('loc 选行和列:'); print(df.loc[['r2','r4'], ['姓名','成绩']])",
        "",
        "print('iloc 按位置:'); print(df.iloc[1:3, 0:2])",
        "",
        "print('成绩>80 的人:'); print(df[df['成绩'] > 80])",
        "print('年龄<21 且成绩>85:'); print(df[(df['年龄'] < 21) & (df['成绩'] > 85)])"
      ].join("\n")
    }
  ],
  exercise: {
    task: "用上题的天气 DataFrame（城市/气温/湿度），分别用 loc 与 iloc 取出第 2 行；筛出气温>27 的城市；取出 湿度 这一列。",
    starter: [
      "import pandas as pd",
      "",
      "df = pd.DataFrame({",
      "    '城市': ['北京', '上海', '广州'],",
      "    '气温': [28, 31, 26],",
      "    '湿度': [60, 72, 55]",
      "}, index=['a', 'b', 'c'])",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import pandas as pd",
      "",
      "df = pd.DataFrame({",
      "    '城市': ['北京', '上海', '广州'],",
      "    '气温': [28, 31, 26],",
      "    '湿度': [60, 72, 55]",
      "}, index=['a', 'b', 'c'])",
      "print('loc 第2行:'); print(df.loc['b'])",
      "print('iloc 第2行:'); print(df.iloc[1])",
      "print('气温>27:'); print(df[df['气温'] > 27])",
      "print('湿度列:', df['湿度'].tolist())"
    ].join("\n")
  }
},
{
  id: "3-3", ch: "3", no: "3.3", title: "pandas 设置值", dur: "06:49", tag: "Pandas 操作",
  lead: "改单元格、加新列、按条件批量改值。特征工程里的「造特征列」「修正异常值」全靠这一节。",
  points: [
    "<b>改单个值</b>：<code>df.loc['行名', '列名'] = 新值</code>；按位置改用 <code>df.iloc[行, 列] = 新值</code>。",
    "<b>新增列</b>：<code>df['新列名'] = 列表或Series</code>，直接挂在表右边；也可以 <code>df['新列'] = df['a'] + df['b']</code> 算新特征。",
    "<b>按条件设置</b>：<code>df.loc[条件, '列名'] = 值</code>，例如 <code>df.loc[df['成绩'] < 60, '评级'] = '不及格'</code>。",
    "<b>批量替换</b>：<code>df['列'].replace(旧值, 新值)</code>；或 <code>df['列'] = df['列'].apply(函数)</code> 对每个元素应用函数。",
    "注意 <code>df['列'].apply(func)</code> 不传 axis，对每个元素跑；要按行跑函数用 <code>df.apply(func, axis=1)</code>。"
  ],
  tip: "比赛做特征工程的两件套：<code>df['新特征'] = 计算式</code> 造新列、<code>df.loc[条件, '列'] = 值</code> 按规则修正。背熟这两个。",
  demos: [
    {
      title: "改值、加列、条件设置",
      code: [
        "import pandas as pd",
        "",
        "df = pd.DataFrame({'成绩': [85, 90, 42, 88], '性别': ['男', '女', '男', '女']})",
        "print('原始:'); print(df)",
        "",
        "df.loc[0, '成绩'] = 95   # 改第1行成绩",
        "df['是否及格'] = df['成绩'] >= 60  # 新增布尔列",
        "df.loc[df['成绩'] < 60, '评级'] = '不及格'  # 条件设置",
        "df.loc[df['成绩'] >= 60, '评级'] = '及格'",
        "print('\\n处理后:'); print(df)",
        "",
        "df['成绩加5'] = df['成绩'].apply(lambda x: x + 5)",
        "print('\\napply 应用:'); print(df)"
      ].join("\n")
    }
  ],
  exercise: {
    task: "给天气表加一列「体感温度」= 气温 + 湿度*0.05；把湿度大于 70 的城市体感温度改为 35；最后用 apply 把城市名都加上『市』字。",
    starter: [
      "import pandas as pd",
      "",
      "df = pd.DataFrame({",
      "    '城市': ['北京', '上海', '广州'],",
      "    '气温': [28, 31, 26],",
      "    '湿度': [60, 72, 55]",
      "})",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import pandas as pd",
      "",
      "df = pd.DataFrame({",
      "    '城市': ['北京', '上海', '广州'],",
      "    '气温': [28, 31, 26],",
      "    '湿度': [60, 72, 55]",
      "})",
      "df['体感温度'] = df['气温'] + df['湿度'] * 0.05",
      "df.loc[df['湿度'] > 70, '体感温度'] = 35",
      "df['城市'] = df['城市'].apply(lambda x: x + '市')",
      "print(df)"
    ].join("\n")
  }
},
{
  id: "3-4", ch: "3", no: "3.4", title: "pandas 处理丢失数据", dur: "07:24", tag: "Pandas 清洗",
  lead: "真实数据必有缺失值（NaN）。比赛里缺值的处理策略直接影响结果：删掉、填 0、填均值、向前填充，各有用处。",
  points: [
    "<b>检测</b>：<code>df.isnull()</code> 返回布尔表；<code>df.isnull().sum()</code> 每列缺失个数，是干活前必查的第一件事。",
    "<b>删除</b>：<code>df.dropna()</code> 删掉含缺失的行；<code>df.dropna(axis=1)</code> 删缺失的列；<code>df.dropna(how='all')</code> 只删整行全空的。",
    "<b>填充固定值</b>：<code>df.fillna(0)</code>；填统计量：<code>df.fillna(df.mean())</code>（各列填各自均值）。",
    "<b>前后填充</b>：<code>df.fillna(method='ffill')</code> 用上行值填（时间序列常用）；'bfill' 用下行值填。",
    "<b>插值</b>：<code>df.interpolate()</code> 线性插值，比赛处理连续数值列时效果通常好于填 0。",
    "原则：缺失少 ➜ 丢行/丢列；缺失多且是数值列 ➜ 填均值或插值；类别列 ➜ 填众数（mode）。"
  ],
  tip: "先看 <code>df.isnull().sum()</code> 摸清缺失分布再定策略，别上来就 fillna(0)。不同列缺失比例差别大，可能要分别处理。",
  demos: [
    {
      title: "检测、删除、填充、插值",
      code: [
        "import pandas as pd",
        "import numpy as np",
        "",
        "df = pd.DataFrame({",
        "    'A': [1, 2, np.nan, 4],",
        "    'B': [5, np.nan, np.nan, 8],",
        "    'C': ['x', 'y', 'x', np.nan]",
        "})",
        "print('原始:'); print(df)",
        "print('\\n每列缺失数:'); print(df.isnull().sum())",
        "",
        "print('\\n删除含缺失的行:'); print(df.dropna())",
        "print('\\n填0:'); print(df.fillna(0))",
        "print('\\n填各列均值:'); print(df.fillna(df[['A','B']].mean()))",
        "print('\\n前向填充 ffill:'); print(df.ffill())",
        "print('\\n线性插值:'); print(df[['A','B']].interpolate())"
      ].join("\n")
    }
  ],
  exercise: {
    task: "造一列含 3 个 NaN 的 Series [1, NaN, 3, NaN, 5, NaN, 7]，对比：填 0、填均值、ffill、interpolate 四种结果，看看哪种更像原序列的走势。",
    starter: [
      "import pandas as pd",
      "import numpy as np",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import pandas as pd",
      "import numpy as np",
      "",
      "s = pd.Series([1, np.nan, 3, np.nan, 5, np.nan, 7])",
      "print('填0   :', s.fillna(0).tolist())",
      "print('填均值:', s.fillna(s.mean()).tolist())",
      "print('ffill :', s.fillna(method='ffill').tolist())",
      "print('插值  :', s.interpolate().tolist())"
    ].join("\n")
  }
},
{
  id: "3-5", ch: "3", no: "3.5", title: "pandas 导入导出", dur: "07:22", tag: "Pandas 数据IO",
  lead: "比赛的数据入口和出口：读文件、写文件。掌握读入参数（编码、分隔符、表头）比会写文件更关键。",
  points: [
    "<b>读 CSV</b>：<code>pd.read_csv('文件.csv')</code>；编码报错时加 <code>encoding='gbk'</code> 或 <code>encoding='utf-8'</code>（GBK 乱码是中文数据第一坑）。",
    "常用参数：<code>sep</code> 分隔符（默认逗号）、<code>header=None</code> 无表头、<code>nrows</code> 只读前几行（大文件试读）、<code>usecols</code> 只读指定列。",
    "<b>读 Excel</b>：<code>pd.read_excel('文件.xlsx', sheet_name='表名')</code>；读 JSON：<code>pd.read_json</code>。",
    "<b>导出</b>：<code>df.to_csv('输出.csv', index=False)</code> 重点记 <code>index=False</code>——不加会把行号写进文件，交卷大忌。",
    "其他：<code>df.to_excel('a.xlsx')</code>、<code>df.to_json</code>、<code>df.to_html</code>（结果转网页表格，汇报展示神器）。",
    "注意：本平台浏览器环境里读本地文件需要文件上传控件，比赛电脑上则直接给路径即可（示例代码你先在本地跑）。"
  ],
  tip: "交卷前检查：导出的文件有没有 <code>index=False</code>？CSV 用 Excel 打开是否乱码（编码）？这两个是比赛里最常见的低级失分点。",
  demos: [
    {
      title: "导出与导入（浏览器环境演示）",
      code: [
        "import pandas as pd",
        "import io",
        "",
        "# 造数据",
        "df = pd.DataFrame({'编号': [1, 2, 3], '得分': [88, 76, 93]})",
        "",
        "# 导出为 CSV 字符串（比赛里等价于写文件）",
        "csv_str = df.to_csv(index=False)",
        "print('导出的 CSV 内容:'); print(csv_str)",
        "",
        "# 再读回来",
        "df2 = pd.read_csv(io.StringIO(csv_str))",
        "print('读回的 DataFrame:'); print(df2)"
      ].join("\n")
    }
  ],
  exercise: {
    task: "把天气表导出成 CSV（不留行号），再读回来打印；读回来的 DF 和原来数据是否一致？把 CSV 字符串打印出来检查第一行是什么（应是表头）。",
    starter: [
      "import pandas as pd",
      "",
      "df = pd.DataFrame({'城市': ['北京', '上海'], '气温': [28, 31]})",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import pandas as pd",
      "import io",
      "",
      "df = pd.DataFrame({'城市': ['北京', '上海'], '气温': [28, 31]})",
      "csv_str = df.to_csv(index=False)",
      "print(csv_str)",
      "df2 = pd.read_csv(io.StringIO(csv_str))",
      "print(df2)",
      "print('一致:', df.equals(df2))"
    ].join("\n")
  }
},
{
  id: "3-6", ch: "3", no: "3.6", title: "pandas 合并 concat", dur: "17:30", tag: "Pandas 合并",
  lead: "把多个表上下拼（追加行）或左右拼（加列）。concat 是按「形状」拼，不关心键，和 merge 有本质区别。",
  points: [
    "<b>纵向拼接（加行）</b>：<code>pd.concat([df1, df2])</code>，默认 axis=0，两个表的列要对上（列不相同也能拼，缺失处填 NaN）。",
    "纵向拼接后行号会重复，加 <code>ignore_index=True</code> 重新编号，几乎总是要加。",
    "<b>横向拼接（加列）</b>：<code>pd.concat([df1, df2], axis=1)</code>，行数对齐，行名相同的对齐（行名不同会产生超级多的 NaN）。",
    "横向拼接前先确认行名一致：<code>df.reset_index(drop=True)</code> 把两边行名统一成 0..n-1 再拼。",
    "比赛场景：多个批次的数据文件读进来 → 全部 <code>pd.concat(..., ignore_index=True)</code> 合成一张大表，这是标准操作。"
  ],
  tip: "批量读多个 CSV 再 concat：<code>all_df = pd.concat([pd.read_csv(f) for f in 文件列表], ignore_index=True)</code>，一行完成数据合并。",
  demos: [
    {
      title: "纵向拼、横向拼",
      code: [
        "import pandas as pd",
        "",
        "df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})",
        "df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})",
        "",
        "print('纵向拼接（加行）:');",
        "print(pd.concat([df1, df2], ignore_index=True))",
        "",
        "df3 = pd.DataFrame({'C': [10, 20]})",
        "print('\\n横向拼接（加列）:');",
        "print(pd.concat([df1, df3], axis=1))",
        "",
        "# 批量合并的写法",
        "frames = [df1, df2]",
        "all_df = pd.concat(frames, ignore_index=True)",
        "print('\\n批量 concat:'); print(all_df)"
      ].join("\n")
    }
  ],
  exercise: {
    task: "建三张表：1月/2月/3月 的销量（列：月份、销量），用一行代码 concat 成全年表并重新编号；另外把成绩表加一列『排名』（用 concat axis=1）。",
    starter: [
      "import pandas as pd",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import pandas as pd",
      "",
      "m1 = pd.DataFrame({'月份': ['1月'], '销量': [100]})",
      "m2 = pd.DataFrame({'月份': ['2月'], '销量': [120]})",
      "m3 = pd.DataFrame({'月份': ['3月'], '销量': [90]})",
      "year = pd.concat([m1, m2, m3], ignore_index=True)",
      "print('全年:'); print(year)",
      "",
      "score = pd.DataFrame({'成绩': [85, 90, 78]})",
      "rank = pd.DataFrame({'排名': [2, 1, 3]})",
      "print(pd.concat([score, rank], axis=1))"
    ].join("\n")
  }
},
{
  id: "3-7", ch: "3", no: "3.7", title: "pandas 合并 merge", dur: "18:19", tag: "Pandas 合并",
  lead: "按「关键字段」把两张表对接，像 SQL 的 JOIN。concat 按形状拼，merge 按键拼——这是 pandas 最容易混的一对。",
  points: [
    "<b>基本用法</b>：<code>df1.merge(df2, on='编号')</code> 两张表都有「编号」列，按它对接；<code>pd.merge(df1, df2, on='编号')</code> 等价。",
    "<b>四种联接</b>（how 参数）：<code>how='inner'</code> 只留两边都有的键（默认）；<code>'left'</code> 以左边表为准；<code>'right'</code> 以右边表为准；<code>'outer'</code> 全保留，缺的填 NaN。",
    "<b>键名不同</b>：<code>left_on='键1', right_on='键2'</code> 指定各自的键列。",
    "<b>重名列</b>：两表都有「成绩」列时自动加后缀，可用 <code>suffixes=('_左', '_右')</code> 自定义。",
    "比赛场景：学生表 + 成绩表按学号 merge、订单表 + 商品表按商品ID merge，两张表合成一张宽表再做分析。"
  ],
  tip: "merge 前先确认键列没有重复、类型一致（比如一个是字符串一个是数字，merge 出来全是 NaN 就是类型没对上）。用 <code>df['键'].dtype</code> 查。",
  demos: [
    {
      title: "merge 按键合并四种 how",
      code: [
        "import pandas as pd",
        "",
        "left = pd.DataFrame({'编号': [1, 2, 3], '姓名': ['张', '李', '王']})",
        "right = pd.DataFrame({'编号': [2, 3, 4], '成绩': [88, 76, 95]})",
        "",
        "print('left:'); print(left)",
        "print('\\nright:'); print(right)",
        "",
        "print('\\ninner（默认，两边都有）:'); print(left.merge(right, on='编号'))",
        "print('\\nleft（以左表为准）:'); print(left.merge(right, on='编号', how='left'))",
        "print('\\nouter（全保留）:'); print(left.merge(right, on='编号', how='outer'))",
        "",
        "# 键名不同 + 后缀",
        "r2 = right.rename(columns={'编号': '学生号'})",
        "print('\\n键名不同 left_on/right_on:');",
        "print(left.merge(r2, left_on='编号', right_on='学生号'))"
      ].join("\n")
    }
  ],
  exercise: {
    task: "学生表（学号/姓名，3人）和 选课表（学号/课程/分数，5条），用 merge 把两张表按学号对接，分别用 inner 和 left；观察行数差异并解释原因。",
    starter: [
      "import pandas as pd",
      "",
      "stu = pd.DataFrame({'学号': ['s1', 's2', 's3'], '姓名': ['张三', '李四', '王五']})",
      "course = pd.DataFrame({",
      "    '学号': ['s1', 's2', 's1', 's2', 's3'],",
      "    '课程': ['数学', '数学', '英语', '英语', '数学'],",
      "    '分数': [85, 90, 78, 88, 92]",
      "})",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import pandas as pd",
      "",
      "stu = pd.DataFrame({'学号': ['s1', 's2', 's3'], '姓名': ['张三', '李四', '王五']})",
      "course = pd.DataFrame({",
      "    '学号': ['s1', 's2', 's1', 's2', 's3'],",
      "    '课程': ['数学', '数学', '英语', '英语', '数学'],",
      "    '分数': [85, 90, 78, 88, 92]",
      "})",
      "print('inner:'); print(stu.merge(course, on='学号'))",
      "print('\\nleft:'); print(stu.merge(course, on='学号', how='left'))",
      "print('\\n行数不同原因：left 保留学生表中没有选课记录的行（右表键缺失填 NaN）')"
    ].join("\n")
  }
},
{
  id: "3-8", ch: "3", no: "3.8", title: "pandas plot 画图", dur: "11:53", tag: "Pandas 绘图",
  lead: "数据分析比赛的产出经常要求「图」。pandas 的 plot 直接画在 DataFrame 上，一行出图，配合 matplotlib 微调。",
  points: [
    "<b>一行画图</b>：<code>df.plot()</code> 默认折线，每一列一条线，列名自动进图例。",
    "<b>指定类型</b>（kind）：<code>kind='bar'</code> 柱状图、<code>'barh'</code> 横向柱状、<code>'hist'</code> 直方图、<code>'scatter'</code> 散点图、<code>'pie'</code> 饼图、<code>'kde'</code> 密度图。",
    "散点图要指定轴：<code>df.plot.scatter(x='列1', y='列2')</code>；饼图通常只给一个 Series：<code>s.plot(kind='pie')</code>。",
    "美化参数：<code>title='标题'</code>、<code>figsize=(宽,高)</code>、<code>xlabel / ylabel</code>、<code>legend=False</code> 关图例。",
    "matplotlib 补充：<code>plt.show()</code> 出图、<code>plt.title()</code>、<code>plt.xlabel()</code>、<code>plt.xlim()</code> 设轴范围。本平台运行后图片直接显示在下方。",
    "中文显示：matplotlib 默认字体不支持中文会出方块，比赛环境先 <code>plt.rcParams['font.sans-serif']=['SimHei']</code> 加 <code>plt.rcParams['axes.unicode_minus']=False</code>。"
  ],
  tip: "比赛出图三件套：标题、坐标轴标签、保存 <code>plt.savefig('图.png')</code>（本平台已自动截图显示）。没标题没坐标轴的图 = 白画。",
  demos: [
    {
      title: "折线图 + 柱状图 + 散点图",
      code: [
        "import pandas as pd",
        "import matplotlib.pyplot as plt",
        "",
        "# 造数据",
        "df = pd.DataFrame({",
        "    '月份': ['1月', '2月', '3月', '4月', '5月', '6月'],",
        "    '销量A': [10, 15, 12, 20, 18, 25],",
        "    '销量B': [8, 9, 14, 13, 16, 20]",
        "})",
        "df.set_index('月份').plot(title='月度销量趋势', figsize=(7, 4))",
        "plt.show()",
        "",
        "# 柱状图",
        "df.set_index('月份').plot(kind='bar', title='月度销量对比', figsize=(7, 4))",
        "plt.show()",
        "",
        "# 散点图",
        "df.plot.scatter(x='销量A', y='销量B', title='销量关系')",
        "plt.show()"
      ].join("\n")
    }
  ],
  exercise: {
    task: "造两个月度温度表（月份/最高温/最低温），画一张折线图（两列两个 color 线）并设置标题与坐标轴名；再画一张最高温的柱状图。",
    starter: [
      "import pandas as pd",
      "import matplotlib.pyplot as plt",
      "",
      "df = pd.DataFrame({",
      "    '月份': ['3月', '4月', '5月', '6月'],",
      "    '最高温': [15, 22, 28, 33],",
      "    '最低温': [5, 10, 16, 22]",
      "})",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import pandas as pd",
      "import matplotlib.pyplot as plt",
      "",
      "df = pd.DataFrame({",
      "    '月份': ['3月', '4月', '5月', '6月'],",
      "    '最高温': [15, 22, 28, 33],",
      "    '最低温': [5, 10, 16, 22]",
      "})",
      "ax = df.set_index('月份').plot(title='季节温度变化', figsize=(7, 4))",
      "ax.set_xlabel('月份'); ax.set_ylabel('温度(℃)')",
      "plt.show()",
      "df.set_index('月份')['最高温'].plot(kind='bar', title='最高温柱状图')",
      "plt.show()"
    ].join("\n")
  }
}
];