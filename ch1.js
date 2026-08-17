window.PART1 = [
{
  id: "1-1", ch: "1", no: "1.1", title: "numpy & pandas 有什么用?", dur: "03:26", tag: "认知篇",
  lead: "比赛里数据清洗、特征工程、结果整理全靠这两个库。先搞清楚它们各自管什么，后面学起来才不会混。",
  points: [
    "<b>NumPy</b>：Python 的数值计算核心，提供「<b>数组（ndarray）</b>」和<b>矩阵运算</b>。比 Python 原生 list 快得多，是科学计算的地基。",
    "<b>Pandas</b>：建立在 NumPy 之上，提供「<b>DataFrame（表格）</b>」和「<b>Series（带标签的一列）</b>」，专门做数据读取、清洗、筛选、合并。",
    "分工记法：<b>要算数、要矩阵 ➜ numpy</b>；<b>要处理表格、要读文件 ➜ pandas</b>。两者经常配合用。",
    "比赛里典型的链路：<code>pandas 读数据 → pandas 清洗筛选 → numpy 计算/矩阵变换 → pandas 整理结果 → plot 出图</code>。",
    "约定俗成的导入别名：<code>import numpy as np</code>、<code>import pandas as pd</code>，所有教程和官方文档都这么写。"
  ],
  tip: "比赛读题先说清「给什么」（数据格式）、「要什么」（结果表/图/指标），再决定 pandas 和 numpy 各干哪一段。别上来就写代码。",
  demos: [
    {
      title: "快速看一下两个库的基本形态",
      code: [
        "import numpy as np",
        "import pandas as pd",
        "",
        "# NumPy 数组",
        "a = np.array([[1, 2], [3, 4]])",
        "print('NumPy 数组:'); print(a)",
        "print('形状:', a.shape, '  维度:', a.ndim)",
        "",
        "# Pandas Series（带标签的一列）",
        "s = pd.Series([10, 20, 30], index=['甲', '乙', '丙'])",
        "print('\\nPandas Series:'); print(s)",
        "",
        "# Pandas DataFrame（表格）",
        "df = pd.DataFrame({'姓名': ['张三', '李四'], '得分': [85, 92]})",
        "print('\\nPandas DataFrame:'); print(df)"
      ].join("\n")
    }
  ],
  exercise: {
    task: "自己动手：创建一个 numpy 数组 <code>np.arange(6).reshape(2,3)</code>，打印它的形状、维度、元素个数；再创建一个 3 行 2 列的 DataFrame（列名自定），打印出来看看长什么样。",
    starter: [
      "import numpy as np",
      "import pandas as pd",
      "",
      "# 你的代码写在这里"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "import pandas as pd",
      "",
      "a = np.arange(6).reshape(2, 3)",
      "print('数组:'); print(a)",
      "print('shape:', a.shape, ' ndim:', a.ndim, ' size:', a.size)",
      "",
      "df = pd.DataFrame({'语文': [88, 91], '数学': [95, 87], '英语': [78, 82]}, index=['同学1', '同学2'])",
      "print('\\nDataFrame:'); print(df)"
    ].join("\n")
  }
},
{
  id: "1-2", ch: "1", no: "1.2", title: "numpy & pandas 安装", dur: "06:12", tag: "环境篇",
  lead: "本平台已内置 Python 运行环境，下面代码可以直接跑。你自己电脑上的安装方法也给你列清楚。",
  points: [
    "本平台：无需安装，浏览器里已带完整 numpy / pandas / matplotlib 环境，直接点运行。",
    "自己电脑：<code>pip install numpy pandas matplotlib</code> 一行装完；用 Anaconda 的同学直接就有。",
    "确认装好：<code>import numpy</code> 不报错即可；<code>np.__version__</code> 查看版本号。",
    "装不上常见原因：pip 用的 Python 和运行代码的 Python 不是同一个（用了虚拟环境或多个 Python 版本）。",
    "比赛环境大概率是官方给的机器或云环境，先花两分钟跑通 <code>import numpy, pandas</code>，确认版本，再开始写。"
  ],
  tip: "比赛开场第一件事：打印 <code>pd.__version__</code> 和 <code>np.__version__</code>，确认环境可用，别在装环境上浪费时间。",
  demos: [
    {
      title: "查看已安装版本",
      code: [
        "import numpy as np",
        "import pandas as pd",
        "import matplotlib",
        "",
        "print('numpy 版本:', np.__version__)",
        "print('pandas 版本:', pd.__version__)",
        "print('matplotlib 版本:', matplotlib.__version__)"
      ].join("\n")
    }
  ],
  exercise: {
    task: "你的电脑上如果还没装，打开终端（cmd）执行：<code>pip install numpy pandas matplotlib</code>。装好后在本页运行右侧代码查看版本（本页已经装好，直接运行即可验证链路通）。",
    starter: [
      "import numpy as np",
      "import pandas as pd",
      "print('环境OK，版本:', np.__version__, pd.__version__)"
    ].join("\n"),
    solution: [
      "import numpy as np",
      "import pandas as pd",
      "print('环境OK，本页版本:', np.__version__, pd.__version__)"
    ].join("\n")
  }
}
];