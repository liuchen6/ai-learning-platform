window.SHEET = [
  {
    title: "NumPy 创建与查看",
    head: ["用途", "写法"],
    rows: [
      ["从列表创建", "<code>np.array([1,2,3])</code>&nbsp; <code>np.array([[1,2],[3,4]])</code>"],
      ["整数序列", "<code>np.arange(n)</code>&nbsp; <code>np.arange(1,10,2)</code> 起点终点步长"],
      ["等差数列", "<code>np.linspace(0,1,5)</code> 含终点共5个"],
      ["全0/全1/定值", "<code>np.zeros((2,3))</code>&nbsp; <code>np.ones((2,3))</code>&nbsp; <code>np.full((2,3),7)</code>"],
      ["单位阵/随机", "<code>np.eye(n)</code>&nbsp; <code>np.random.randn(2,3)</code>&nbsp; <code>np.random.randint(0,10,(2,3))</code>"],
      ["改形状", "<code>a.reshape(2,3)</code>&nbsp; <code>a.reshape(-1)</code> 自动算维度"],
      ["查看属性", "<code>a.shape / a.ndim / a.size / a.dtype</code>"]
    ]
  },
  {
    title: "NumPy 运算与聚合",
    head: ["用途", "写法"],
    rows: [
      ["逐元素运算", "<code>a+b&nbsp; a-b&nbsp; a*b&nbsp; a/b&nbsp; a**2</code>&nbsp; 标量自动广播（<code>a+1</code>）"],
      ["常用函数", "<code>np.sqrt&nbsp; np.exp&nbsp; np.log&nbsp; np.sin&nbsp; np.abs</code>"],
      ["矩阵乘法", "<code>a.dot(b)</code>&nbsp; <code>a @ b</code>（不是 *）"],
      ["聚合", "<code>a.sum()</code>&nbsp; <code>a.mean()</code>&nbsp; <code>a.min()</code>&nbsp; <code>a.max()</code>&nbsp; <code>a.std()</code>&nbsp; <code>a.var()</code>"],
      ["按轴聚合", "<code>a.sum(axis=0)</code> 每列&nbsp; <code>a.mean(axis=1)</code> 每行&nbsp; <code>a.argmax(axis=1)</code> 每行最大位置"],
      ["比较", "<code>a &gt; 5</code> 得布尔数组&nbsp; <code>np.where(a&gt;5, 1, 0)</code> 替换值"],
      ["归一化", "<code>(x - x.min()) / (x.max() - x.min())</code>"]
    ]
  },
  {
    title: "NumPy 索引与结构",
    head: ["用途", "写法"],
    rows: [
      ["取元素", "<code>a[1,2]</code>&nbsp; <code>a[0]</code> 第一行&nbsp; <code>a[:,1]</code> 第二列&nbsp; <code>a[:,-1]</code> 最后一列"],
      ["切片", "<code>a[1:3, :]</code>&nbsp; <code>a[:, 0:2]</code>&nbsp; <code>a[-2:]</code> 最后两行"],
      ["布尔筛选", "<code>a[a &gt; 5]</code>&nbsp; <code>a[(a&gt;1) &amp; (a&lt;5)]</code>（&amp; 且、| 或）"],
      ["合并(上下/左右)", "<code>np.vstack((a,b))</code>&nbsp; <code>np.hstack((a,b))</code>&nbsp; <code>np.concatenate((a,b),axis=0)</code>"],
      ["分割", "<code>np.split(a,3,axis=0)</code>&nbsp; <code>np.split(a,[800],axis=0)</code> 切点&nbsp; <code>np.array_split(a,3)</code> 不整除也行"],
      ["复制", "<code>b = a.copy()</code> 深拷贝&nbsp; ⚠ <code>b = a</code> 只是别名，改 b 会改 a"],
      ["转置/铺平", "<code>a.T</code>&nbsp; <code>a.flatten()</code>&nbsp; <code>a.ravel()</code>"]
    ]
  },
  {
    title: "Pandas 读取与查看",
    head: ["用途", "写法"],
    rows: [
      ["读 CSV", "<code>pd.read_csv('f.csv', encoding='utf-8')</code>&nbsp; 乱码换 <code>encoding='gbk'</code>&nbsp; 无表头加 <code>header=None</code>"],
      ["读 Excel/JSON", "<code>pd.read_excel('f.xlsx', sheet_name='表1')</code>&nbsp; <code>pd.read_json('f.json')</code>"],
      ["快速预览", "<code>df.head()</code>&nbsp; <code>df.tail()</code>&nbsp; <code>df.sample(5)</code> 随机5行"],
      ["信息总览", "<code>df.info()</code>&nbsp; <code>df.describe()</code>&nbsp; <code>df.dtypes</code> 各列类型"],
      ["导出", "<code>df.to_csv('out.csv', index=False)</code> ⚠ 务必加 index=False&nbsp; <code>df.to_excel('out.xlsx')</code>"]
    ]
  },
  {
    title: "Pandas 选择与修改",
    head: ["用途", "写法"],
    rows: [
      ["取列", "<code>df['列']</code> Series&nbsp; <code>df[['a','b']]</code> DataFrame"],
      ["按标签取行", "<code>df.loc['行名']</code>&nbsp; <code>df.loc[['r1','r2'],['c1','c2']]</code>"],
      ["按位置取行", "<code>df.iloc[0]</code>&nbsp; <code>df.iloc[1:3, 0:2]</code>（不含终点）"],
      ["布尔筛选", "<code>df[df['成绩'] &gt; 80]</code>&nbsp; <code>df[(df.a&gt;1) &amp; (df.b&lt;3)]</code> 条件加括号"],
      ["排序", "<code>df.sort_values('列')</code>&nbsp; <code>df.sort_values('列', ascending=False)</code>"],
      ["改值/加列", "<code>df.loc['r','c']=x</code>&nbsp; <code>df['新列'] = 计算式</code>&nbsp; <code>df.loc[条件,'列']=值</code>"],
      ["批量应用", "<code>df['列'].apply(函数)</code>&nbsp; 按行 <code>df.apply(函数, axis=1)</code>"],
      ["索引重排", "<code>df.reset_index(drop=True)</code>&nbsp; <code>df.set_index('列')</code>"]
    ]
  },
  {
    title: "Pandas 缺失值",
    head: ["用途", "写法"],
    rows: [
      ["检测缺失", "<code>df.isnull()</code>&nbsp; <code>df.isnull().sum()</code> 每列缺失数"],
      ["删除", "<code>df.dropna()</code> 删含缺失行&nbsp; <code>df.dropna(axis=1)</code> 删缺失列&nbsp; <code>dropna(how='all')</code> 全空才删"],
      ["填充", "<code>df.fillna(0)</code>&nbsp; <code>df.fillna(df.mean())</code> 各列均值&nbsp; <code>fillna(method='ffill')</code> 上行填充"],
      ["插值", "<code>df.interpolate()</code> 线性插值，数值列效果好"],
      ["替换", "<code>df['列'].replace(旧,新)</code>&nbsp; <code>df.replace({'列':{旧:新}})</code>"]
    ]
  },
  {
    title: "Pandas 合并与分组",
    head: ["用途", "写法"],
    rows: [
      ["纵向拼加行", "<code>pd.concat([df1,df2], ignore_index=True)</code> ⚠ 常加 ignore_index"],
      ["横向拼加列", "<code>pd.concat([df1,df2], axis=1)</code> 行名要对齐，先 reset_index"],
      ["按键合并", "<code>df1.merge(df2, on='编号')</code>&nbsp; <code>how='inner'/'left'/'right'/'outer'</code>&nbsp; <code>left_on/right_on</code> 键名不同"],
      ["分组统计", "<code>df.groupby('类别')['值'].mean()</code>&nbsp; <code>df.groupby('类别').sum()</code>"],
      ["汇总表", "<code>df.groupby(['a','b'])['c'].agg(['sum','mean','count'])</code>"]
    ]
  },
  {
    title: "Pandas 画图 (plot)",
    head: ["用途", "写法"],
    rows: [
      ["折线图", "<code>df.plot()</code> 每列一条线（默认）"],
      ["柱状图", "<code>df.plot(kind='bar')</code>&nbsp; <code>kind='barh'</code> 横向&nbsp; <code>kind='hist'</code> 直方图"],
      ["散点图", "<code>df.plot.scatter(x='列1', y='列2')</code>"],
      ["饼图/密度", "<code>s.plot(kind='pie')</code>&nbsp; <code>df.plot(kind='kde')</code>"],
      ["美化", "<code>title='标题'</code>&nbsp; <code>figsize=(8,5)</code>&nbsp; <code>xlabel=</code>&nbsp; <code>ylabel=</code>&nbsp; <code>legend=False</code>"],
      ["matplotlib 补充", "<code>plt.show()</code>&nbsp; <code>plt.title()</code>&nbsp; <code>plt.xlabel()</code>&nbsp; <code>plt.xlim()</code>&nbsp; <code>plt.legend()</code>"],
      ["中文不乱码", "<code>plt.rcParams['font.sans-serif']=['SimHei']</code>&nbsp; <code>plt.rcParams['axes.unicode_minus']=False</code>"]
    ]
  }
];