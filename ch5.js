/* 第5章 图像与深度学习 (30分)
   来源视频：
   - BV1BT4y1Z7WS OpenCV 30分钟入门（孔工码字）
   - BV14A411C7ZE OpenCV 图像处理全套（唐宇迪，73集）
   - BV1Vx411j7kT PyTorch 神经网络（莫烦Python，35集）
   - BV1hE411t7RN PyTorch 快速入门（小土堆，33集）
   - BV1ko1NYuEkf LabelImg 标注 YOLO 数据（肆十二）
   - BV1d1W9z9E2G YOLOv8 一小时部署（具身智能入门课，5集）
   比赛环境（按规程）：opencv-python 4.12 / torch 2.0.1+cu117 / torchvision 0.15.2+cu117 / ultralytics 8.3.234 / LabelImg 1.8.6
   注：浏览器内可运行 OpenCV 基础操作（cv2 数组处理）；
       PyTorch / YOLO 训练需 GPU，以参考代码 + 实操步骤呈现 */
window.PART5 = [
{
  id:"5-1", ch:"5", no:"1", title:"图像基本操作",
  dur:"入门 30分钟 / 全1-2章", tag:"OpenCV",
  lead:"OpenCV 是任务3图像处理的起点：读图、改颜色、裁剪、调数值。浏览器里可以直接跑这些基础操作。",
  points:[
    "<b>图像在计算机里是什么</b>。一张彩色图 = 高 × 宽 × 3 的数组（BGR 三通道），每个值 0-255。灰度图是单通道。用 numpy 就能理解它。",
    "<b>读取与保存</b>。cv2.imread 读图（默认 BGR），cv2.imwrite 存图。注意是 BGR 不是 RGB，显示时要用 cv2.cvtColor 转。",
    "<b>色彩空间转换</b>。cv2.cvtColor 可以在 BGR、灰度、HSV 之间转。HSV 适合按颜色找区域（比赛常用）。",
    "<b>ROI 与裁剪</b>。图像就是数组，切片 img[y1:y2, x1:x2] 就是裁剪。",
    "<b>边界填充</b>。cv2.copyMakeBorder 给图像加边，方便卷积等操作。",
    "<b>数值计算</b>。两张图相加 cv2.add（饱和），直接 + 则溢出回绕。加权融合 cv2.addWeighted 做透明度混合。"
  ],
  demos:[
    {
      title:"图像 = numpy 数组：生成、裁剪、变换（浏览器可运行）",
      code:"# 浏览器内没有本地图片文件，先用 numpy 造一张测试图\n# 思路和 cv2.imread 读进来之后的处理完全一致\nimport cv2\nimport numpy as np\n\n# 生成一张 100x160 的彩色图（模拟读入的 BGR 图像）\nimg = np.zeros((100, 160, 3), dtype=np.uint8)\nimg[:, :, 0] = 255   # 蓝色通道全满 -> 整图蓝色\nimg[20:80, 40:120, 1] = 255  # 中间一块加绿色\n\n# 1. 灰度化（比赛常用）\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nprint(\"灰度图形状:\", gray.shape, \"通道数:\", gray.ndim)\n\n# 2. ROI 裁剪（numpy 切片）\nroi = img[20:80, 40:120]\nprint(\"裁剪区域形状:\", roi.shape)\n\n# 3. 尺寸缩放\nresized = cv2.resize(gray, (80, 50))\nprint(\"缩放后:\", resized.shape)\n\n# 4. 像素值范围统计（判断图像质量用）\nprint(\"灰度值范围:\", gray.min(), \"-\", gray.max())",
      pkgs:"opencv-python"
    }
  ],
  tip:"图像就是数组，这句话是任务3的万能钥匙。比赛里 90% 的图像操作题都能用「切片 + 通道运算 + cv2 函数」三板斧解决。"
},
{
  id:"5-2", ch:"5", no:"2", title:"阈值与滤波",
  dur:"全第3章", tag:"OpenCV",
  lead:"图像预处理三件套：阈值二值化、平滑去噪、形态学修形。深度学习模型的输入干净，准确率才会高。",
  points:[
    "<b>图像阈值</b>。cv2.threshold 把像素按阈值分成黑白两类，最常见是固定阈值 + 大津法（OTSU 自动算阈值）。",
    "<b>二值化的意义</b>。把「找轮廓」「提取文字」这类任务先简化成黑白图，后续处理稳定很多。",
    "<b>均值滤波</b>。cv2.blur 取邻域平均，去噪快但会糊。",
    "<b>高斯滤波</b>。cv2.GaussianBlur 邻域加权平均（中心权重大），去噪同时保留细节，最常用。",
    "<b>中值滤波</b>。cv2.medianBlur 取邻域中值，对椒盐噪声（黑白点）特别有效。",
    "<b>双边滤波</b>。cv2.bilateralFilter 去噪保边缘，人像磨皮同款原理，比赛很少用但要认识。"
  ],
  demos:[
    {
      title:"阈值 + 三种滤波对比（浏览器可运行）",
      code:"import cv2\nimport numpy as np\n\n# 造一张带噪点的灰度图\nimg = np.zeros((80, 120), dtype=np.uint8)\nimg[20:60, 30:90] = 180\nrng = np.random.default_rng(7)\nnoise = rng.integers(0, 256, img.shape, dtype=np.uint8)\n# 撒椒盐噪声\nimg = np.where(noise > 245, 0, np.where(noise < 10, 255, img))\n\n# 1. 固定阈值二值化（阈值 127，大于127变255）\n_, th = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)\nprint(\"二值化后取值:\", np.unique(th))\n\n# 2. OTSU 自动阈值\n_, th2 = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)\nprint(\"OTSU 自动算出的阈值:\", cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[0])\n\n# 3. 三种滤波对比\nblur  = cv2.blur(img, (5, 5))\ngauss = cv2.GaussianBlur(img, (5, 5), 0)\nmed   = cv2.medianBlur(img, 5)\n\n# 去噪效果评价：和中值图的像素差（越小越接近干净图）\nprint(\"均值滤波去噪误差:\", np.abs(blur.astype(int) - img.astype(int)).mean().round(2))\nprint(\"高斯滤波去噪误差:\", np.abs(gauss.astype(int) - img.astype(int)).mean().round(2))\nprint(\"中值滤波去噪误差:\", np.abs(med.astype(int) - img.astype(int)).mean().round(2))",
      pkgs:"opencv-python"
    }
  ],
  tip:"比赛环境里 OTSU 很常用：不需要手动试阈值，一行代码自动算。滤波首选高斯，椒盐噪点多时换中值。"
},
{
  id:"5-3", ch:"5", no:"3", title:"形态学操作",
  dur:"全第4章", tag:"OpenCV",
  lead:"形态学是「修形」工具：把二值图里的碎点去掉、把断裂连起来。腐蚀膨胀就是最核心的两个操作。",
  points:[
    "<b>腐蚀</b>。cv2.erode 内核扫过时全 255 才保留，效果是白色区域变小，去掉小白点和细线。",
    "<b>膨胀</b>。cv2.dilate 内核扫到任一 255 就保留，白色区域变大，连接断裂的笔画。",
    "<b>开运算</b>。先腐蚀后膨胀：去小白点，保留整体形状（最常用）。",
    "<b>闭运算</b>。先膨胀后腐蚀：填小洞、连断裂，形状大小基本不变。",
    "<b>梯度运算</b>。膨胀减腐蚀：提取物体边界。",
    "<b>礼帽与黑帽</b>。礼帽 = 原图减开运算，提取亮区域里的细节；黑帽 = 闭运算减原图，提取暗细节。",
    "<b>通用写法</b>。cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)，kernel = np.ones((3,3), np.uint8)。"
  ],
  demos:[
    {
      title:"腐蚀膨胀开闭运算对比（浏览器可运行）",
      code:"import cv2\nimport numpy as np\n\n# 造一张有噪点和断线的二值图\nimg = np.zeros((80, 120), dtype=np.uint8)\nimg[20:60, 30:90] = 255\nimg[55:60, 30:90] = 0   # 中间断开一条线\nimg[15:20, 30:90] = 0\nimg[20:25, 55:60] = 255  # 一个小噪点\n\nkernel = np.ones((3, 3), np.uint8)\neroded = cv2.erode(img, kernel)\ndilated = cv2.dilate(img, kernel)\nopened = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)\nclosed = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)\n\ndef ratio(m):\n    return (m > 0).sum() / m.size\n\nprint(f\"原图白色占比:  {ratio(img):.3f}\")\nprint(f\"腐蚀后占比:    {ratio(eroded):.3f}  (白色变小)\")\nprint(f\"膨胀后占比:    {ratio(dilated):.3f}  (白色变大)\")\nprint(f\"开运算后占比:  {ratio(opened):.3f}  (去噪点，线还断着)\")\nprint(f\"闭运算后占比:  {ratio(closed):.3f}  (填断线，可能留噪点)\")\n\n# 实操套路：先开运算去噪，再闭运算连断线\nclean = cv2.morphologyEx(cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel), cv2.MORPH_CLOSE, kernel)\nprint(f\"开+闭组合后:   {ratio(clean):.3f}  (干净主体)\")",
      pkgs:"opencv-python"
    }
  ],
  tip:"记住一句话：去噪点用开运算，补断裂用闭运算。比赛里先开后闭是标准套路。"
},
{
  id:"5-4", ch:"5", no:"4", title:"边缘检测",
  dur:"全第5-6章", tag:"OpenCV",
  lead:"边缘检测是轮廓提取的前置步骤。Sobel 算梯度方向，Canny 是完整流程，也是比赛最常考的组合。",
  points:[
    "<b>为什么找边缘</b>。物体边界处的像素值变化最剧烈，用梯度（导数）就能找到变化大的位置。",
    "<b>Sobel 算子</b>。cv2.Sobel 分别算水平方向和垂直方向的梯度，再用 cv2.convertScaleAbs 取绝对值。",
    "<b>梯度计算方法</b>。x 方向梯度 + y 方向梯度，cv2.addWeighted 融合成整体梯度图。",
    "<b>Scharr 与 Laplacian</b>。Scharr 是 Sobel 的增强版（更敏感）；Laplacian 算二阶导，对噪声敏感，用前要先滤波。",
    "<b>Canny 流程</b>。①高斯滤波去噪 → ②Sobel 算梯度 → ③非极大值抑制（只留梯度方向上的局部最大，细线化）→ ④双阈值（高阈值定强边缘、低阈值补弱边缘）→ ⑤滞后连接。",
    "<b>Canny 用法</b>。cv2.Canny(img, 50, 150)，两个参数是高低阈值，比例一般 2:1 到 3:1。"
  ],
  demos:[
    {
      title:"Sobel 梯度与 Canny 边缘检测（浏览器可运行）",
      code:"import cv2\nimport numpy as np\n\n# 造一张带方块的灰度图\nimg = np.zeros((100, 140), dtype=np.uint8)\ncv2.rectangle(img, (30, 20), (110, 80), 200, -1)\n\n# 1. Sobel 梯度：分别算 x、y 方向再融合\ngx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)\ngy = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)\ngx = cv2.convertScaleAbs(gx)\ngy = cv2.convertScaleAbs(gy)\ngrad = cv2.addWeighted(gx, 0.5, gy, 0.5, 0)\nprint(\"Sobel 梯度图中非零像素数:\", (grad > 0).sum(), \"(边缘处才非零)\")\n\n# 2. Canny 边缘检测\nedges = cv2.Canny(img, 50, 150)\nprint(\"Canny 边缘像素数:\", (edges > 0).sum())\n\n# 3. 对比：噪声图直接 Canny vs 先滤波再 Canny\nrng = np.random.default_rng(1)\nnoisy = cv2.add(img, rng.integers(0, 60, img.shape, dtype=np.uint8))\ne1 = cv2.Canny(noisy, 50, 150)\nsmooth = cv2.GaussianBlur(noisy, (5, 5), 0)\ne2 = cv2.Canny(smooth, 50, 150)\nprint(\"噪声图直接 Canny 边缘数:\", (e1 > 0).sum())\nprint(\"先高斯滤波再 Canny 边缘数:\", (e2 > 0).sum(), \"(更接近干净图的4条边)\")",
      pkgs:"opencv-python"
    }
  ],
  tip:"Canny 前先高斯滤波是标准动作，比赛答案里这个细节通常有分。记住参数 (50, 150) 起步，效果不好再调。"
},
{
  id:"5-5", ch:"5", no:"5", title:"轮廓检测与匹配",
  dur:"全第7章", tag:"OpenCV",
  lead:"找到边缘后，下一步是找轮廓、算特征、做匹配。这是「找物体在哪」的基础，也是项目实战题的主线。",
  points:[
    "<b>轮廓检测</b>。cv2.findContours 在二值图上找轮廓（白底黑边图注意参数），返回轮廓点集。",
    "<b>轮廓特征</b>。cv2.contourArea 面积、cv2.arcLength 周长、cv2.boundingRect 外接矩形、cv2.moments 矩（算中心点）。",
    "<b>轮廓近似</b>。cv2.approxPolyDP 用折线近似轮廓，多边形顶点数 = 判定形状的依据（三角形3、矩形4）。",
    "<b>模板匹配</b>。cv2.matchTemplate 拿小图在大图里滑动找最像的位置，返回相似度矩阵，cv2.minMaxLoc 找最高分位置。",
    "<b>图像金字塔</b>。cv2.pyrDown / pyrUp 缩放图像，多尺度处理：在大图找目标快、在小图定位置。",
    "<b>比赛实战模式</b>。「信用卡数字识别」「答题卡判卷」都是这套：预处理 → 轮廓 → 模板匹配/特征分类。"
  ],
  demos:[
    {
      title:"找轮廓 + 形状判定（浏览器可运行）",
      code:"import cv2\nimport numpy as np\n\n# 造一张包含三角、矩形、圆形的图\nimg = np.zeros((120, 180), dtype=np.uint8)\ncv2.rectangle(img, (15, 15), (55, 55), 255, -1)\npts = np.array([[110, 60], [70, 110], [150, 110]], np.int32)\ncv2.fillPoly(img, [pts], 255)\ncv2.circle(img, (110, 35), 20, 255, -1)\n\n# 找轮廓（只找外轮廓）\ncontours, _ = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)\nprint(f\"共找到 {len(contours)} 个轮廓\")\n\nfor c in contours:\n    area = cv2.contourArea(c)\n    # 轮廓近似，看顶点数\n    peri = cv2.arcLength(c, True)\n    approx = cv2.approxPolyDP(c, 0.04 * peri, True)\n    n = len(approx)\n    shape = \"三角形\" if n == 3 else (\"矩形\" if n == 4 else \"圆形/其他\")\n    x, y, w, h = cv2.boundingRect(c)\n    print(f\"{shape}: 面积={area:.0f} 顶点={n} 位置=({x},{y}) 尺寸={w}x{h}\")",
      pkgs:"opencv-python"
    }
  ],
  tip:"形状判定 = 轮廓顶点数。比赛里「识别图中是什么形状」几乎都这么做，先膨胀补全边缘再数顶点，准确率高。"
},
{
  id:"5-6", ch:"5", no:"6", title:"直方图与均衡化",
  dur:"全第8章", tag:"OpenCV",
  lead:"直方图看整体明暗分布，均衡化自动拉伸对比度。图像太暗太糊时，这是第一步急救手段。",
  points:[
    "<b>直方图</b>。统计每个灰度值有多少像素。cv2.calcHist 算，横轴亮度 0-255，纵轴像素数。",
    "<b>直方图的作用</b>。一眼看出图偏暗（像素挤在左侧）、偏亮、还是对比度不足（挤在中间）。",
    "<b>均衡化原理</b>。把像素分布拉伸到均匀，暗处变亮、亮处分层，自动提升对比度。",
    "<b>cv2.equalizeHist</b>。灰度图均衡化一行搞定。彩色图要先转 HSV，对 V 通道均衡再转回。",
    "<b>傅里叶变换（了解）</b>。把图像从空间域变频率域：低频是平滑区域，高频是边缘细节。低通滤波 = 模糊去噪，高通滤波 = 提边缘。比赛用 OpenCV 的 dft 可实现。"
  ],
  demos:[
    {
      title:"直方图均衡化效果对比（浏览器可运行）",
      code:"import cv2\nimport numpy as np\n\n# 造一张偏暗、对比度低的图\nimg = np.zeros((100, 140), dtype=np.uint8)\ncv2.rectangle(img, (30, 25), (110, 75), 120, -1)\nimg = np.clip(img * 0.8, 0, 255).astype(np.uint8)  # 整体压暗（保持 uint8）\n\n# 均衡化\neq = cv2.equalizeHist(img)\n\ndef stats(m):\n    return f\"均值={m.mean():.1f} 标准差={m.std():.1f} 范围={m.min()}-{m.max()}\"\n\nprint(\"原图:      \", stats(img))\nprint(\"均衡化后:  \", stats(eq))\nprint(\"标准差变大 => 对比度提升\")\n\n# 直方图分布对比（0-255 分成 8 个桶统计）\nhist_orig = np.histogram(img, bins=8, range=(0, 255))[0]\nhist_eq   = np.histogram(eq, bins=8, range=(0, 255))[0]\nprint(\"\\n原图像素分布(8桶):\", hist_orig.tolist())\nprint(\"均衡后像素分布(8桶):\", hist_eq.tolist(), \"  <- 更均匀\")",
      pkgs:"opencv-python"
    }
  ],
  tip:"图片整体发灰发暗，先均衡化再送模型，识别率通常能提一截。彩色图记得走 HSV 的 V 通道。"
},
{
  id:"5-7", ch:"5", no:"7", title:"PyTorch 基础与张量",
  dur:"莫烦 1-2 / 小土堆 P1-9", tag:"PyTorch",
  lead:"PyTorch 是任务3深度学习的主力框架。本课先建立核心概念：张量、自动求导、数据加载。参考代码需在比赛环境（GPU 服务器）运行。",
  points:[
    "<b>张量（Tensor）</b>。PyTorch 的数据单位，本质是多维数组，用法和 numpy 几乎一样，但能自动求导、能跑 GPU。",
    "<b>numpy 与 tensor 互转</b>。torch.from_numpy / tensor.numpy()。比赛里「numpy 数据 → 模型」全靠这个桥。",
    "<b>自动求导</b>。requires_grad=True 的变量参与运算后，loss.backward() 自动算出所有梯度，训练的核心机制。",
    "<b>数据集与加载器</b>。Dataset 类定义「一条样本长什么样」，DataLoader 批量 + 乱序喂给模型。比赛环境常用 torchvision 自带数据集（MNIST 等）。",
    "<b>Transforms</b>。数据预处理工具箱：ToTensor 转张量、Normalize 归一化、Resize 缩放。",
    "<b>环境确认</b>。torch.cuda.is_available() 返回 True 说明 GPU 可用（比赛环境为 3090）。"
  ],
  refs:[
    {
      title:"PyTorch 张量基础（比赛环境运行）",
      code:"import torch\n\n# 1. 张量创建与 numpy 互转\nimport numpy as np\na = torch.tensor([[1.0, 2.0], [3.0, 4.0]])\nb = torch.from_numpy(np.ones((2, 2)))\nprint(\"张量 a:\", a)\nprint(\"numpy 转张量 b:\", b)\nprint(\"张量转 numpy:\", a.numpy())\n\n# 2. GPU 检测\nprint(\"CUDA 可用:\", torch.cuda.is_available())\nprint(\"GPU 名称:\", torch.cuda.get_device_name(0) if torch.cuda.is_available() else \"无\")\n\n# 3. 自动求导\nx = torch.tensor([2.0], requires_grad=True)\ny = x ** 2 + 3 * x + 1   # y = x^2+3x+1\ny.backward()             # 自动求导\nprint(\"y 对 x 的梯度:\", x.grad)  # 2x+3 = 7\n\n# 4. 训练循环的最小单元\noptimizer = torch.optim.SGD([x], lr=0.1)\nloss = (x - 5.0) ** 2\nloss.backward()\noptimizer.step()         # 梯度下降一步\noptimizer.zero_grad()\nprint(\"SGD 更新一步后 x:\", x.item())"
    }
  ],
  tip:"张量操作和 numpy 几乎一样，比赛里 numpy 熟练的话半天就能上手。先确认 torch.cuda 可用，后面训练才有意义。"
},
{
  id:"5-8", ch:"5", no:"8", title:"神经网络搭建与训练",
  dur:"小土堆 P10-33", tag:"PyTorch",
  lead:"标准训练套路：定义模型（nn.Module）→ 定损失函数 → 定优化器 → 循环喂数据 → 反向传播 → 保存模型。比赛题基本就是这套模板。",
  points:[
    "<b>网络骨架 nn.Module</b>。继承 nn.Module，__init__ 里定义层，forward 里定义前向计算。任何自定义网络都长这样。",
    "<b>常用层</b>。nn.Linear 全连接、nn.Conv2d 卷积、nn.MaxPool2d 池化、nn.ReLU 激活、nn.Flatten 展平。",
    "<b>Sequential</b>。把多个层按顺序拼成一个容器，搭建小网络最快的方式。",
    "<b>损失函数与优化器</b>。nn.CrossEntropyLoss 分类、nn.MSELoss 回归；torch.optim.Adam / SGD。",
    "<b>完整训练套路</b>。for 每个 epoch：模型.train() → 数据过 forward → 算 loss → loss.backward() → optimizer.step() → optimizer.zero_grad()。验证时 model.eval() + torch.no_grad()。",
    "<b>模型保存与读取</b>。torch.save(model.state_dict(), path) 存参数，load_state_dict 读回。",
    "<b>GPU 训练</b>。model.to(\"cuda\")，数据也 .to(\"cuda\")。验证套路里要把模型和数据都切回 CPU 再取结果。"
  ],
  refs:[
    {
      title:"完整训练模板：MNIST 手写数字分类（比赛环境运行，约5分钟）",
      code:"import torch\nimport torch.nn as nn\nimport torch.optim as optim\nfrom torchvision import datasets, transforms\nfrom torch.utils.data import DataLoader\n\n# 1. 数据：MNIST 手写数字（28x28 灰度图，10 类）\ntf = transforms.Compose([transforms.ToTensor(),\n                         transforms.Normalize((0.1307,), (0.3081,))])\ntrain_ds = datasets.MNIST(\"./data\", train=True, download=True, transform=tf)\ntrain_loader = DataLoader(train_ds, batch_size=128, shuffle=True)\n\n# 2. 模型：两层全连接网络\nclass Net(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc = nn.Sequential(\n            nn.Flatten(),\n            nn.Linear(28 * 28, 256), nn.ReLU(),\n            nn.Linear(256, 10))\n    def forward(self, x):\n        return self.fc(x)\n\nmodel = Net()\nloss_fn = nn.CrossEntropyLoss()\nopt = optim.Adam(model.parameters(), lr=1e-3)\n\n# 3. 训练一个 epoch\nmodel.train()\ntotal, correct = 0, 0\nfor images, labels in train_loader:\n    opt.zero_grad()\n    out = model(images)\n    loss = loss_fn(out, labels)\n    loss.backward()\n    opt.step()\n    total += labels.size(0)\n    correct += (out.argmax(1) == labels).sum().item()\nprint(f\"训练集准确率: {correct / total:.3f}\")\n\n# 4. 保存模型\ntorch.save(model.state_dict(), \"mnist_net.pth\")\nprint(\"模型已保存为 mnist_net.pth\")"
    }
  ],
  tip:"这份模板背下来，任务3的「模型搭建训练」题直接改数据源和网络层数就能套。GPU 训练注意数据也要 .to(device)。"
},
{
  id:"5-9", ch:"5", no:"9", title:"LabelImg 数据标注",
  dur:"标注 20分钟", tag:"数据标注",
  lead:"深度学习模型要有标注数据才能训练。LabelImg 是比赛环境自带的标注工具，把「框出目标 + 打标签」变成 YOLO 能用的 txt 文件。",
  points:[
    "<b>为什么标注</b>。YOLO 训练需要每张图对应一个 txt：每行是「类别号 cx cy w h」（中心点坐标 + 宽高，归一化到 0-1）。",
    "<b>LabelImg 操作</b>。打开图片目录 → W 画框 → 输入类别名 → D 下一张 → 保存。默认存为与图片同名的 txt。",
    "<b>类别文件</b>。classes.txt 或配置里预置类别名列表，保证框出来的类别名和训练配置一致。",
    "<b>数据检查</b>。标注完抽查：有没有漏框、错框、类别名打错。错标注会直接毒害模型。",
    "<b>比赛流程</b>。比赛给你一批图片让你标注，然后用标注数据训练 YOLO——这就是任务3里「数据集构建」的完整链路。"
  ],
  steps:[
    {
      title:"LabelImg 标注流程",
      head:["步骤","操作","结果"],
      rows:[
        ["1","启动 LabelImg（比赛环境已装 1.8.6）","窗口打开"],
        ["2","打开图片目录 + 设置标注保存目录","两侧都有文件"],
        ["3","预置类别（PascalVOC 模式或 YOLO 模式 + 类别文件）","列表里有类别名"],
        ["4","W 键画框，框住目标，选类别","图上出现带标签的框"],
        ["5","Ctrl+S 保存，D 键下一张","每张图生成同名 txt"],
        ["6","抽查：确认每张图 txt 内容为「类别 归一化坐标」","无漏标错标"]
      ]
    }
  ],
  refs:[
    {
      title:"标注结果的 txt 与图片对应关系（了解格式即可）",
      code:"# 图片: cat_001.jpg （640x480）\n# 标注生成: cat_001.txt，内容示例：\n#  0 0.5234 0.4750 0.4531 0.5625\n# 含义: 类别0 | 中心x=0.5234*640 | 中心y=0.4750*480\n#      宽=0.4531*640 | 高=0.5625*480\n\n# 训练时 YOLO 需要目录结构：\n# dataset/\n#   images/train/cat_001.jpg\n#   labels/train/cat_001.txt\n#   images/val/cat_002.jpg\n#   labels/val/cat_002.txt\n#   data.yaml   <- 类别名配置\n\n# data.yaml 内容：\n#   train: dataset/images/train\n#   val: dataset/images/val\n#   nc: 1\n#   names: ['cat']"
    }
  ],
  tip:"标注题考验的是流程熟悉度不是手速。保存格式、目录结构、类别名一致这三件事不出错，分就到手。"
},
{
  id:"5-10", ch:"5", no:"10", title:"YOLOv8 目标检测实战",
  dur:"YOLOv8 5集", tag:"YOLO",
  lead:"任务3重头戏：用 ultralytics 库训练 YOLOv8 目标检测模型。环境、预测、数据、训练四步走，比赛环境全预装。",
  points:[
    "<b>环境确认</b>。比赛环境 ultralytics 8.3.234 已装。from ultralytics import YOLO 能导入即就绪。",
    "<b>模型预测</b>。YOLO(\"yolov8n.pt\").predict(图片, save=True)，输出检测框、类别、置信度。",
    "<b>数据集构建</b>。LabelImg 标完的数据按 images/labels 目录组织，配 data.yaml 声明类别。",
    "<b>模型训练</b>。model.train(data=\"data.yaml\", epochs=50, imgsz=640)，训练完 best.pt 就是产物。",
    "<b>结果验证</b>。用训练好的 best.pt 跑验证集，看 mAP 指标；跑几张新图确认检测效果。",
    "<b>与 OpenCV 衔接</b>。检测出框后，用 OpenCV 在原图上画框、裁剪 ROI 做后续处理，两个库配合是常见考法。"
  ],
  refs:[
    {
      title:"YOLOv8 完整工作流（比赛环境运行）",
      code:"from ultralytics import YOLO\n\n# ===== 1. 加载预训练模型（首次会自动下载权重）=====\nmodel = YOLO(\"yolov8n.pt\")\n\n# ===== 2. 预测（用模型跑一张图）=====\nresults = model.predict(source=\"test.jpg\", conf=0.5, save=True)\nr = results[0]\nprint(\"检测到的类别:\", r.boxes.cls.tolist())\nprint(\"置信度:\", r.boxes.conf.tolist())\nprint(\"检测框坐标(px):\", r.boxes.xyxy.tolist())\n\n# ===== 3. 训练自己的数据集 =====\n# 数据集结构（LabelImg 标注产物）：\n#   dataset/images/train/*.jpg\n#   dataset/labels/train/*.txt\n#   dataset/images/val/*.jpg\n#   dataset/labels/val/*.txt\n#   dataset/data.yaml\nmodel.train(data=\"dataset/data.yaml\", epochs=50, imgsz=640, batch=16)\n\n# ===== 4. 用训练好的模型验证 =====\nbest = YOLO(\"runs/detect/train/weights/best.pt\")\nmetrics = best.val(data=\"dataset/data.yaml\")\nprint(\"mAP50:\", metrics.box.map50)\n\n# ===== 5. 部署预测 =====\nout = best.predict(source=\"new.jpg\", save=True)\nprint(\"输出保存在 runs/detect/predict/\")"
    }
  ],
  steps:[
    {
      title:"YOLOv8 目标检测比赛流程",
      head:["步骤","操作","产物"],
      rows:[
        ["1","确认 ultralytics 导入成功","环境就绪"],
        ["2","用预训练模型跑通预测","看到检测框"],
        ["3","LabelImg 标注训练集（每类至少 50-100 张）","labels txt"],
        ["4","整理 images/labels 目录 + 写 data.yaml","数据集就绪"],
        ["5","model.train 训练","best.pt"],
        ["6","best.pt 验证 + 对新图预测","mAP 指标 + 效果图"]
      ]
    }
  ],
  tip:"时间紧张时用 yolov8n（最小最快），epochs 50 起步。比赛看完整链路（标注→训练→预测）能不能跑通，先跑通再优化指标。"
}
];
