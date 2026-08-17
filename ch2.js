window.PART2 = [
{
  id: "2-1", ch: "2", no: "2.1", title: "numpy 属性", dur: "06:28", tag: "NumPy 基础",
  lead: "拿到一个数组，先看它是什么形状、几维、多大、什么类型。这四件事贯穿整个比赛的数据处理。",
  points: [
    "<b>ndim</b>：维度个数（几维数组）。一维是向量，二维是矩阵，三维起是张量。",
    "<b>shape</b>：形状，一个元组。二维 (行, 列)；三维 (深, 行, 列)。这是最常用的属性。",
    "<b>size</b>：元素总个数，等于 shape 各分量相乘。",
    "<b>dtype</b>：元素类型，常见 <code>int32</code>、<code>float64</code>、<code>bool</code>。运算结果类型可能升级，注意别踩坑。",
    "记法：shape 描述形状，size 描述数量，dtype 描述类型，ndim 描述维度。比赛里要 reshape 之前必看 shape。"
  ],
  tip: "写 <code>print(a.shape)</code> 确认形状再动手，是比赛里最常见的防错动作。shape 不匹配是 numppy 报错第一来源。",
  demos: [
    {
      title: "查看数组的四大属性",
      code: [
        "import numpy as np",
        "",
        "a = np.array([[1, 2, 3], [4, 5, 6]])",
        "print('数组:'); print(a)",
        "print('ndim  维度:', a.ndim)",
        "print('shape 形状:', a.shape)",
        "print('size  元素数:', a.size)",
        "print('dtype 类型:', a.dtype)"
      ].join("\n")
    }
  ],
  exercise: {
    task: "创建数组 <code>np.arange(24).reshape(2, 3, 4)</code>（3维），打印它的 ndim、shape、size，并解释 shape 里的三个数各代表什么。",
    starter: [
      "import numpy as np",
      "",
      "a = np.arange(24).reshape(2, 3, 4)",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "",
      "a = np.arange(24).reshape(2, 3, 4)",
      "print('ndim:', a.ndim)",
      "print('shape:', a.shape, ' (深, 行, 列)')",
      "print('size:', a.size, ' = 2*3*4')"
    ].join("\n")
  }
},
{
  id: "2-2", ch: "2", no: "2.2", title: "numpy 的创建 array", dur: "11:54", tag: "NumPy 基础",
  lead: "创建数组的五种常用方式，比赛里每天都会用到。重点记住 arange、zeros、ones、linspace、reshape。",
  points: [
    "<code>np.array(列表)</code>：从列表直接建数组，最直白。",
    "<code>np.arange(n)</code>：生成 0 到 n-1 的整数序列（左闭右开）；<code>np.arange(1,10,2)</code> 指定起点终点步长。",
    "<code>np.zeros((r,c))</code> / <code>np.ones((r,c))</code>：全 0 / 全 1 数组；<code>np.full((r,c), 值)</code> 填任意值。",
    "<code>np.linspace(起, 止, 个数)</code>：等差数列，注意它包含终点（与 arange 不同）。",
    "<code>a.reshape(r,c)</code>：改形状，元素总数必须不变；reshape(-1) 自动算维度，很常用（比如一列转一维）。",
    "<code>np.eye(n)</code>：单位矩阵；<code>np.random.randn(r,c)</code> 标准正态随机数，比赛造数据常用。"
  ],
  tip: "比赛建特征矩阵常用组合拳：<code>np.linspace</code> 造自变量，<code>np.random.randn</code> 造噪声，一起算目标值做演示数据。",
  demos: [
    {
      title: "五种创建方式一次看全",
      code: [
        "import numpy as np",
        "",
        "a = np.array([1, 2, 3])",
        "print('array   :', a)",
        "print('arange  :', np.arange(5))",
        "print('arange  :', np.arange(1, 10, 2))",
        "print('zeros   :'); print(np.zeros((2, 3)))",
        "print('ones    :'); print(np.ones((2, 2)))",
        "print('full    :'); print(np.full((2, 2), 7))",
        "print('linspace:', np.linspace(0, 1, 5))",
        "print('eye     :'); print(np.eye(3))",
        "print('reshape :', np.arange(6).reshape(2, 3))",
        "print('reshape-1:', np.arange(6).reshape(3, 2).reshape(-1))"
      ].join("\n")
    }
  ],
  exercise: {
    task: "创建 0 到 10 之间（含 10）均匀分布的 11 个数；再造一个 3×3 全 7 的矩阵；最后造一个 4×2 的随机矩阵并打印。",
    starter: [
      "import numpy as np",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "",
      "print('均匀 11 个数:', np.linspace(0, 10, 11))",
      "print('全7矩阵:'); print(np.full((3, 3), 7))",
      "print('随机矩阵:'); print(np.random.randn(4, 2))"
    ].join("\n")
  }
},
{
  id: "2-3", ch: "2", no: "2.3", title: "numpy 的基础运算", dur: "13:27", tag: "NumPy 运算",
  lead: "NumPy 的运算都是「逐元素」运算：加、减、乘、除、乘方，每个位置自己算自己的，不用写循环。",
  points: [
    "逐元素运算：<code>a + b</code>、<code>a - b</code>、<code>a * b</code>、<code>a / b</code>，形状相同的两个数组对应位置算。",
    "数组和标量运算：<code>a + 1</code>、<code>a * 2</code>，每个元素都参与（这就是广播，广播会在后面细说）。",
    "<code>a ** 2</code>：逐元素平方；<code>np.sqrt(a)</code> 开方、<code>np.exp(a)</code>、<code>np.log(a)</code>、<code>np.sin(a)</code> 等通用函数。",
    "<code>a < 3</code>：逐元素比较，返回布尔数组（True/False），这是后面布尔索引的基础。",
    "注意：<code>*</code> 是逐元素乘，<b>不是矩阵乘法</b>。矩阵乘法是 <code>a.dot(b)</code> 或 <code>a @ b</code>（下一节）。"
  ],
  tip: "比赛算距离、标准化、归一化全是逐元素运算。比如归一化：<code>(x - x.min()) / (x.max() - x.min())</code>，一步到位。",
  demos: [
    {
      title: "逐元素运算演示",
      code: [
        "import numpy as np",
        "",
        "a = np.array([10, 20, 30, 40])",
        "b = np.array([1, 2, 3, 4])",
        "",
        "print('a + b :', a + b)",
        "print('a - b :', a - b)",
        "print('a * b :', a * b)",
        "print('a / b :', a / b)",
        "print('a ** 2 :', a ** 2)",
        "print('a + 1 :', a + 1)",
        "print('sqrt  :', np.sqrt(a))",
        "print('a < 25:', a < 25)"
      ].join("\n")
    }
  ],
  exercise: {
    task: "对数组 [1, 4, 9, 16] 分别打印：开方、自然对数、所有元素乘 3、与 [0,1,2,3] 逐元素相加的结果。",
    starter: [
      "import numpy as np",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "",
      "a = np.array([1, 4, 9, 16])",
      "print('开方 :', np.sqrt(a))",
      "print('log  :', np.log(a))",
      "print('乘3  :', a * 3)",
      "print('加  :', a + np.array([0, 1, 2, 3]))"
    ].join("\n")
  }
},
{
  id: "2-4", ch: "2", no: "2.4", title: "numpy 的基础运算2", dur: "13:58", tag: "NumPy 运算",
  lead: "上一节是逐元素运算，这一节解决「按行/按列求结果」和「矩阵乘法」两件大事。",
  points: [
    "<b>聚合函数</b>：<code>a.sum()</code>、<code>a.mean()</code>、<code>a.min()</code>、<code>a.max()</code>、<code>a.std()</code>（标准差）、<code>a.var()</code>（方差）——不写 axis 是对全体元素算一个数。",
    "<b>axis 参数</b>：二维数组里 <code>axis=0</code> 按列算（每列出一个数），<code>axis=1</code> 按行算。记法：axis 为几，就把那个维度压掉。",
    "<b>argmax / argmin</b>：返回最大/最小值的<i>位置</i>，比赛找「最优」很常用；<code>a.argmax(axis=1)</code> 每行最大的列位置。",
    "<b>矩阵乘法</b>：<code>a.dot(b)</code> 或 <code>a @ b</code>，要求 a 的列数 = b 的行数。",
    "也有 <code>np.sum(a, axis=0)</code> 这种等价的函数式写法，两种都行。"
  ],
  tip: "「权重和」「距离矩阵」「每类样本的均值向量」这类比赛高频计算，就是 <code>a @ b</code> 加 <code>mean(axis=0)</code> 的组合。",
  demos: [
    {
      title: "聚合、axis、矩阵乘法",
      code: [
        "import numpy as np",
        "",
        "a = np.array([[1, 2, 3],",
        "              [4, 5, 6]])",
        "print('数组 a:'); print(a)",
        "",
        "print('全体求和 :', a.sum())",
        "print('每列求和 axis=0 :', a.sum(axis=0))",
        "print('每行求和 axis=1 :', a.sum(axis=1))",
        "print('每列均值 axis=0 :', a.mean(axis=0))",
        "print('全体标准差 :', a.std())",
        "print('每行最大位置 argmax(axis=1):', a.argmax(axis=1))",
        "",
        "# 矩阵乘法",
        "m1 = np.array([[1, 2], [3, 4]])",
        "m2 = np.array([[5, 6], [7, 8]])",
        "print('\\n矩阵乘法 m1 @ m2:'); print(m1 @ m2)"
      ].join("\n")
    }
  ],
  exercise: {
    task: "造一个 4×3 随机矩阵，分别打印：每列均值、每行最大值、全体最小值的位置（argmin）、每行的标准差；再做一次 3×1 的矩阵乘法演示。",
    starter: [
      "import numpy as np",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "",
      "a = np.random.randn(4, 3)",
      "print('每列均值:', a.mean(axis=0))",
      "print('每行最大值:', a.max(axis=1))",
      "print('全体最小位置:', a.argmin())",
      "print('每行标准差:', a.std(axis=1))",
      "w = np.array([[1], [2], [3]])",
      "print('加权和 a @ w 形状:', (a @ w).shape)"
    ].join("\n")
  }
},
{
  id: "2-5", ch: "2", no: "2.5", title: "numpy 的索引", dur: "09:29", tag: "NumPy 操作",
  lead: "取元素、切片、布尔索引、条件替换，是比赛里筛选数据和造特征的核心手段。",
  points: [
    "<b>二维索引</b>：<code>a[行, 列]</code>。如 <code>a[1, 2]</code> 取第 2 行第 3 列；<code>a[0]</code> 取第 1 行整行。",
    "<b>切片</b>：<code>a[1:3, :]</code> 取第 2~3 行所有列；<code>a[:, 1]</code> 取所有行的第 2 列（一维）；<code>a[:, -1]</code> 最后一列。",
    "<b>布尔索引</b>：<code>a[a > 5]</code> 筛出大于 5 的所有元素（结果是一维的）；<code>a[a % 2 == 0]</code> 筛偶数。",
    "<code>np.where(条件, 满足值, 不满足值)</code>：按条件生成新数组，比赛里做「二分类标签」极好用。",
    "注意：切片得到的还是原数组的<b>视图</b>，改切片会改原数组；要么想清楚用途，要么用 <code>.copy()</code>。"
  ],
  tip: "布尔索引加 <code>np.where</code> 是构造标签列/替换异常值的两大主力，务必练熟。",
  demos: [
    {
      title: "索引、切片、布尔过滤",
      code: [
        "import numpy as np",
        "",
        "a = np.arange(9).reshape(3, 3)",
        "print('数组 a:'); print(a)",
        "",
        "print('取第 2 行第 3 列  a[1,2]:', a[1, 2])",
        "print('取第 1 行  a[0]:', a[0])",
        "print('取第 2~3 行所有列:'); print(a[1:3, :])",
        "print('取所有行第 2 列  a[:, 1]:', a[:, 1])",
        "print('最后一列 a[:, -1]:', a[:, -1])",
        "",
        "print('布尔索引 a[a>4]:', a[a > 4])",
        "print('where a>4 置10:', np.where(a > 4, 10, a))"
      ].join("\n")
    }
  ],
  exercise: {
    task: "用 <code>np.arange(20)</code> 造一维数组，筛出所有大于 5 小于 15 的元素；再把它 reshape 成 4×5，取第 2 列和第 4 行（用切片或索引两种写法都试）。",
    starter: [
      "import numpy as np",
      "",
      "a = np.arange(20)",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "",
      "a = np.arange(20)",
      "print('5<x<15:', a[(a > 5) & (a < 15)])",
      "m = a.reshape(4, 5)",
      "print('第2列:', m[:, 1])",
      "print('第4行:', m[3, :])"
    ].join("\n")
  }
},
{
  id: "2-6", ch: "2", no: "2.6", title: "numpy 的 array 合并", dur: "11:13", tag: "NumPy 操作",
  lead: "把多个数组拼成一个大数组：上下拼（加行）用 vstack，左右拼（加列）用 hstack。",
  points: [
    "<code>np.vstack((a, b))</code>：<b>垂直</b>拼接（按行拼），要求两数组列数一致。列数必须相同。",
    "<code>np.hstack((a, b))</code>：<b>水平</b>拼接（按列拼），要求两数组行数一致。",
    "<code>np.concatenate((a, b), axis=0)</code>：通用拼接，axis=0 类似 vstack（加行），axis=1 类似 hstack（加列）。",
    "一维数组也可以用 vstack/hstack：vstack 把两个一维数组拼成两行二维数组。",
    "比赛实际场景：把多个特征向量拼成特征矩阵（vstack），把新特征列并到矩阵右边（hstack）。"
  ],
  tip: "比赛里最常见的错：两个表的列数/行数不一致就拼接。拼之前先各打一个 <code>print</code> 确认 shape。",
  demos: [
    {
      title: "vstack 和 hstack 拼接",
      code: [
        "import numpy as np",
        "",
        "a = np.array([[1, 2], [3, 4]])",
        "b = np.array([[5, 6]])",
        "",
        "print('vstack 垂直(加行):'); print(np.vstack((a, b)))",
        "",
        "c = np.array([[7, 8], [9, 10]])",
        "print('\\nhstack 水平(加列):'); print(np.hstack((a, c)))",
        "",
        "x = np.array([1, 2, 3])",
        "y = np.array([4, 5, 6])",
        "print('\\n一维 vstack:'); print(np.vstack((x, y)))",
        "print('一维 hstack:', np.hstack((x, y)))"
      ].join("\n")
    }
  ],
  exercise: {
    task: "把 [1,2,3] 和 [4,5,6]：1）垂直拼成 2 行 3 列；2）水平拼成 6 个元素；3）把 3×2 和 3×1 的两个矩阵用 concatenate 沿 axis=1 拼成 3×3。",
    starter: [
      "import numpy as np",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "",
      "x = np.array([1, 2, 3])",
      "y = np.array([4, 5, 6])",
      "print('垂直:'); print(np.vstack((x, y)))",
      "print('水平:', np.hstack((x, y)))",
      "m1 = np.arange(6).reshape(3, 2)",
      "m2 = np.array([[9], [9], [9]])",
      "print('加一列:'); print(np.concatenate((m1, m2), axis=1))"
    ].join("\n")
  }
},
{
  id: "2-7", ch: "2", no: "2.7", title: "numpy 的 array 分割", dur: "06:57", tag: "NumPy 操作",
  lead: "和合并相反：把一个大数组按行或按列切成几块。切训练集/测试集、切交叉验证折，全靠它。",
  points: [
    "<code>np.split(a, n, axis=0)</code>：沿第 1 维切 n 块（必须能整除）；<code>np.split(a, n, axis=1)</code> 沿列切。",
    "<code>np.vsplit(a, n)</code>：垂直切（按行，等价 axis=0）；<code>np.hsplit(a, n)</code>：水平切（按列，等价 axis=1）。",
    "<code>np.array_split(a, n, axis)</code>：切不整除也能切，快慢不一，比赛更稳的选择。",
    "返回的是「块的列表」，用下标取第几块：<code>np.split(a,3)[0]</code> 取第一块。",
    "典型应用：<code>np.split(data, [train_num], axis=0)</code> 传入「切点列表」手动切出前 train_num 行做训练集，剩下做测试集。"
  ],
  tip: "手切训练测试集最常用的是带切点的写法：<code>np.split(data, [2000])</code>，一次得到两个数组，不用数整除。",
  demos: [
    {
      title: "split / vsplit / hsplit 分割",
      code: [
        "import numpy as np",
        "",
        "a = np.arange(12).reshape(4, 3)",
        "print('原数组:'); print(a)",
        "",
        "r1, r2 = np.split(a, [2], axis=0)",
        "print('\\n按第2行切 (前2行 / 后2行):');",
        "print('前:'); print(r1)",
        "print('后:'); print(r2)",
        "",
        "print('\\nvsplit 垂直切2块:');",
        "for part in np.vsplit(a, 2):",
        "    print(part)",
        "",
        "print('\\nhsplit 水平切3块:');",
        "for part in np.hsplit(a, 3):",
        "    print(part)"
      ].join("\n")
    }
  ],
  exercise: {
    task: "造一个 10×5 的矩阵，用带切点的方式切成前三行和后七行；再把一维的 0~9 用 array_split 切成 3 块（不整除也没关系），打印每块。",
    starter: [
      "import numpy as np",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "",
      "data = np.random.randn(10, 5)",
      "train, test = np.split(data, [3], axis=0)",
      "print('train 形状:', train.shape, ' test 形状:', test.shape)",
      "",
      "x = np.arange(10)",
      "parts = np.array_split(x, 3)",
      "for i, p in enumerate(parts):",
      "    print('第', i + 1, '块:', p)"
    ].join("\n")
  }
},
{
  id: "2-8", ch: "2", no: "2.8", title: "numpy 的 copy & deep copy", dur: "06:46", tag: "NumPy 基础",
  lead: "这一节坑最多：赋值不复制，切片是视图，只有 copy() 才是真正独立复制。比赛里数据被悄悄改掉，九成是这个原因。",
  points: [
    "<code>b = a</code>：只是给同一块内存起别名，改 b 就是改 a。",
    "<code>b = a.view() 或 a[:]切片</code>：也是视图，改 b 会同步改 a（新版本切片行为趋近拷贝，但不值得赌，一律当视图对待）。",
    "<code>b = a.copy()</code>：深拷贝，改 b 不影响 a。比赛里「修改前先备份」就靠它。",
    "典型事故：先切了一部分数据做处理，回头发现原表也被改了 → 用空 <code>.copy()</code> 隔离。",
    "判断标准一句话：<b>「要改新数组又不想动原数组，先 copy」</b>。"
  ],
  tip: "处理数据前先备份原始数据: <code>raw = df.copy()</code> 或 <code>a.copy()</code>。改坏了可以直接对比还原，比赛心态完全不同。",
  demos: [
    {
      title: "赋值、视图、拷贝的区别",
      code: [
        "import numpy as np",
        "",
        "a = np.arange(4)",
        "",
        "# 情况1：直接赋值（别名）",
        "b = a",
        "b[0] = 99",
        "print('直接赋值后 a:', a, '← 被 b 改了')",
        "",
        "# 情况2：copy 深拷贝",
        "c = np.arange(4)",
        "d = c.copy()",
        "d[0] = 99",
        "print('copy 后 c:', c, '← 不受影响')",
        "",
        "# 情况3：切片默认是视图",
        "e = np.arange(6)",
        "f = e[0:3]",
        "f[0] = 99",
        "print('切片后 e:', e, '← 也被改了（视图）')"
      ].join("\n")
    }
  ],
  exercise: {
    task: "造数组 a = [1,2,3,4]，用 copy 得到 b，改 b 的第二个元素为 100，验证 a 不变；再试一次用「直接赋值」的方式改，观察差异，把结论写在注释里。",
    starter: [
      "import numpy as np",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "",
      "a = np.array([1, 2, 3, 4])",
      "b = a.copy()",
      "b[1] = 100",
      "print('a:', a, '（没变）  b:', b)",
      "",
      "c = a  # 别名",
      "c[1] = 100",
      "print('直接赋值后 a 也变了:', a, '（同一块内存）')"
    ].join("\n")
  }
}
];