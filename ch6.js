/* 第6章 大模型应用 (40分)
   来源视频：
   - BV1GZpKz7Evw 全网最适合初学者的Ollama教程（爱玩的小卿吖，15集）
   - BV17Wh1zpEhL 大模型理论+Ollama保姆级（AI产品实战，82集）
   - BV1N634zcEgM Dify入门到精通（图灵官方视频号，26集）
   比赛环境（按规程）：Docker + Dify 1.9.2 + Ollama 0.13.1
   模型：qwen3:14b-q8_0 / deepseek-r1:14b / bge-m3 / qwen3-embedding:8b
   注：torch/ultralytics/ollama/dify 无法在浏览器内运行，
       本模块以概念卡 + 参考命令 + 实操步骤为主，参考代码须在比赛环境本地运行 */
window.PART6 = [
{
  id:"6-1", ch:"6", no:"1", title:"大模型是什么",
  dur:"理论 1-5 集", tag:"概念",
  lead:"比赛里大模型应用占 40 分，是所有任务里分值最高的。先搞清楚大模型本身是什么、能做什么，后面的 RAG、Agent、Dify 才有落脚点。",
  points:[
    "<b>大模型是什么</b>。用海量文本训练出来的神经网络，参数规模以十亿计。核心能力是从上下文里推断规律、生成自然语言，也叫大语言模型（LLM）。",
    "<b>和传统机器学习模型区别</b>。传统模型（第4章那些）每个任务要单独训练一套；大模型是「一次预训练、到处用」，微调或直接提示就能干新任务。",
    "<b>工作流程</b>。输入一句话 → 分词（token）→ 逐字预测下一个词的概率 → 反复生成，直到结束标记。它读的是「词元」，不是整句话。",
    "<b>常见分类</b>。按能力分：基础模型、指令微调模型（chat）、推理模型（deepseek-r1 这类）。按部署分：云端 API 和本地部署（Ollama）。",
    "<b>比赛用模型</b>。规程环境给了 qwen3:14b-q8_0（对话生成）和 deepseek-r1:14b（深度推理），还有 bge-m3、qwen3-embedding:8b 两个向量模型（做 RAG 用）。",
    "<b>应用形式</b>。问答、总结、抽取、改写、代码生成是基础能力；组合成 RAG 知识库、Agent 智能体、工作流，就是任务4的考点。"
  ],
  tip:"理论考试里「大模型概念」是送分题。把「预训练、微调、token、上下文窗口、幻觉」这几个词背熟，能说清区别就够了。"
},
{
  id:"6-2", ch:"6", no:"2", title:"提示工程（Prompt）",
  dur:"理论 20-29 集", tag:"提示词",
  lead:"提示工程就是「怎么把话问清楚」。同样的模型，提示词写法不同，答案质量差很多。这是比赛中几乎每题都用的技能。",
  points:[
    "<b>Prompt 组成元素</b>。角色设定（你是XXX专家）、任务描述（干什么）、输入数据（材料放哪）、输出要求（格式、长度、语气）。四件套齐全，输出才稳定。",
    "<b>少样本提示</b>。在提示里给 2-3 个输入输出示例，模型照着例子做。比口头描述规则有效得多。",
    "<b>思维链 COT</b>。要求模型「一步步思考」，复杂问题分步推理，错误率明显下降。deepseek-r1 天生就是这种模式。",
    "<b>思维树 TOT</b>。COT 的升级：不只走一条推理链，而是分岔出多条、每条评估再继续。适合需要探索的难题，比赛中一般用不上这么重的手法。",
    "<b>提示词攻击与防护</b>。考试环境里重点是「防注入」：如果任务要求模型处理用户输入，要提示它忽略输入里的指令性文字，只当数据用。",
    "<b>比赛落地</b>。Dify 里每个应用的「系统提示词」就是做这件事的地方。把提示词结构化写在系统提示里，比每次对话临时写更稳。"
  ],
  demos:[
    {
      title:"提示词模板化的 Python 示例（浏览器可运行）",
      code:"# 提示词本质就是「模板 + 填入内容」\n# 比赛里用 Dify 图形界面配，逻辑和这个一样\nrole = \"你是省级职业院校技能大赛的评分专家\"\ntask = \"请根据评分标准，给下面的作品写评语\"\nmaterial = \"作品说明：一个基于RAG的学校知识库问答系统，准确率92%\\n\"\nfmt = \"输出要求：200字以内，先给总分，再给两条改进建议\\n\"\n\nprompt = role + \"\\n\" + task + \"\\n\" + material + \"\\n\" + fmt\nprint(prompt)\nprint(\"\\n---- 注意四个部分的分工 ----\")\nprint(\"角色定立场，任务定目标，材料给依据，格式定输出\")"
    }
  ],
  tip:"比赛现场没时间调模型，时间都花在调提示词上。准备 3 套自己的通用模板（问答、总结、数据分析），考试时直接套。"
},
{
  id:"6-3", ch:"6", no:"3", title:"RAG 知识库原理",
  dur:"理论 30-47 集", tag:"RAG",
  lead:"RAG（检索增强生成）是任务4「搭建 RAG 知识库」的考点，也是大模型应用里最常考的组合拳。核心思路一句话：先检索资料，再让模型按资料回答。",
  points:[
    "<b>为什么需要 RAG</b>。模型训练数据有截止时间，也不知道你的内部资料。知识库把「模型不知道的知识」提前检索出来喂给它，回答就有依据、能溯源。",
    "<b>RAG 工作流程</b>。①文档加载和分割 → ②向量化（embedding 模型把文本变成向量）→ ③存进向量数据库 → ④用户提问也向量化 → ⑤算相似度检索最相关的几段 → ⑥拼进提示词让模型回答。",
    "<b>Embedding 模型</b>。比赛环境给了 bge-m3 和 qwen3-embedding:8b。它们把「一句话」变成「几百维的向量数组」，意思相近的句子向量也相近。",
    "<b>相似度计算</b>。最常用余弦相似度：两个向量夹角的余弦，越接近 1 越相似。比分段、算向量、查相似，这三步就是 RAG 的核心。",
    "<b>文档分割策略</b>。按固定长度切最省事但容易切碎语义；按段落、按标题切效果好。Dify 里可以直接配分割器。",
    "<b>向量数据库</b>。Dify 自带（基于 Qdrant 等），比赛不用自己装。知道「存向量 + 快速检索」的原理即可。",
    "<b>RAG 的坑</b>。检索不相关 → 答非所问；文档被切碎 → 语义断裂。提高准确率的常见手段：调分割大小、换 embedding 模型、加 Reranker 重排（把粗召回结果再精排）。"
  ],
  demos:[
    {
      title:"手写迷你 RAG：向量化 + 余弦相似度检索（纯 Python 可运行）",
      code:"# 用「词频向量」代替 embedding，演示 RAG 检索的完整思路\n# 真实比赛用 bge-m3 向量模型 + 向量数据库，逻辑完全相同\nimport math\n\ndocs = [\n    \"赛项规程规定比赛环境使用 Anaconda 管理 Python 包\",\n    \"Dify 知识库支持上传 PDF、Word、TXT 文档\",\n    \"Ollama 可以本地部署开源大模型，如 qwen3 和 deepseek-r1\",\n    \"数据准备任务考察 numpy 和 pandas 的数据处理能力\",\n]\n\ndef tokenize(t):\n    return [w for w in t.replace(\"，\", \" \").replace(\"。\", \" \").split()]\n\ndef vec_of(tokens, vocab):\n    return [tokens.count(w) for w in vocab]\n\nvocab = []\nfor d in docs:\n    for w in tokenize(d):\n        if w not in vocab:\n            vocab.append(w)\n\ndef cosine(a, b):\n    up = sum(x * y for x, y in zip(a, b))\n    na = math.sqrt(sum(x * x for x in a))\n    nb = math.sqrt(sum(y * y for y in b))\n    return up / (na * nb + 1e-9)\n\ndoc_vecs = [vec_of(tokenize(d), vocab) for d in docs]\n\nquery = \"知识库能传什么格式的文件\"\nqv = vec_of(tokenize(query), vocab)\nscores = [(cosine(qv, dv), i) for i, dv in enumerate(doc_vecs)]\nscores.sort(reverse=True)\n\nprint(\"检索排序（相似度从高到低）：\")\nfor s, i in scores:\n    print(f\"{s:.3f}  {docs[i]}\")\nprint(\"\\n取 top1 拼进提示词，模型就能按检索结果回答\")"
    }
  ],
  tip:"RAG 是这个模块的得分主战场。建议比赛前把「文档上传 → 分段 → 向量化 → 检索 → 回答」在 Dify 里完整走一遍，20 分钟就能过一遍全流程。"
},
{
  id:"6-4", ch:"6", no:"4", title:"Ollama 部署与命令",
  dur:"Ollama 1-8 集", tag:"本地大模型",
  lead:"Ollama 是比赛环境里跑本地大模型的标准工具，模型都是比赛环境预装好的，你要做的是会查、会调、会启动服务。",
  points:[
    "<b>Ollama 是什么</b>。一个本地大模型运行工具：下载模型、启动服务、提供 API 一条龙。比赛环境版本 0.13.1，用 Docker 装。",
    "<b>核心流程</b>。启动服务 → 查看已装模型 → 命令行对话测试 → 通过 API 给 Dify 或其他程序调用。",
    "<b>模型查看</b>。ollama list 列出本机模型和大小，比赛环境的 qwen3:14b-q8_0、deepseek-r1:14b 都在这查得到。",
    "<b>API 调用</b>。服务默认跑在 11434 端口，POST /api/chat 就能对话。Dify 填这个地址就能连上本地模型。",
    "<b>自定义模型</b>。Modelfile 可以改系统提示词、温度等参数，生成自己的模型，比赛很少用但要知道存在。"
  ],
  refs:[
    {
      title:"Ollama 常用命令（在比赛环境命令行运行）",
      code:"# 查看服务状态与模型列表\nollama list\n\n# 查看某个模型的详细信息（参数量、量化等级）\nollama show qwen3:14b-q8_0\n\n# 命令行直接对话（测试模型是否正常）\nollama run qwen3:14b-q8_0\n\n# 拉取模型（比赛环境已预装，一般不需要）\nollama pull deepseek-r1:14b\n\n# 服务默认监听 11434 端口\n# 测试 API 是否可访问\ncurl http://localhost:11434/api/tags\n\n# 用 API 对话（程序里就是这样调用本地模型的）\ncurl http://localhost:11434/api/chat -d '{\"model\":\"qwen3:14b-q8_0\",\"messages\":[{\"role\":\"user\",\"content\":\"你好\"}]}'\n\n# 停止服务 / 查看日志（Windows 下 Docker 容器管理）\ndocker ps\ndocker logs <ollama容器名>"
    }
  ],
  steps:[
    {
      title:"Ollama 快速上手流程",
      head:["步骤","操作","确认结果"],
      rows:[
        ["1","docker ps 确认 Ollama 容器在运行","列表里有 ollama 容器"],
        ["2","ollama list 查看已装模型","能看到 qwen3 和 deepseek-r1"],
        ["3","ollama run qwen3:14b-q8_0 输入一句对话","模型正常回复"],
        ["4","浏览器访问 localhost:11434 或用 curl 测 API","返回 JSON 说明服务可用"],
        ["5","记下 API 地址 http://localhost:11434","后面 Dify 配置模型要填"]
      ]
    }
  ],
  tip:"Ollama 的分值不高但它是底座。模型起不来，后面 RAG、Dify 全白搭。考前务必把「查列表、跑对话、测 API」三步练熟。"
},
{
  id:"6-5", ch:"6", no:"5", title:"大模型工程师进阶技能",
  dur:"Ollama 9-15 集", tag:"RAG+Agent",
  lead:"把 Ollama 和知识库、智能体组合起来，就是任务4「大模型应用」的完整形态。这课把视频里的进阶技能整理成可操作清单。",
  points:[
    "<b>向量模型怎么用</b>。Ollama 里跑 bge-m3、qwen3-embedding:8b 这类 embedding 模型，把文档切成块向量化。ollama list 里同样能看到它们。",
    "<b>本地 RAG 数据流</b>。文档 → 分块 → 向量模型转向量 → 存向量库（Dify 内置）→ 检索 → 大模型回答。全程本地，不联网。",
    "<b>Agent（智能体）</b>。给大模型配上「工具」和「记忆」，让它能自己规划、调用工具、完成多步任务。低代码平台（Dify）里就是拖节点。",
    "<b>ReAct 模式</b>。推理（Reason）+ 行动（Action）循环：模型想一步、做一步（调工具）、看结果、再想。这是 Agent 最常见的实现思路。",
    "<b>工具与记忆</b>。工具 = 模型能调用的函数（查数据库、算公式、搜知识库）；记忆 = 多轮对话的上下文和历史信息。",
    "<b>比赛取向</b>。任务4分两块：RAG 知识库（搭库 + 问答）+ 智能体（低代码配置）。用 Dify 图形界面完成，代码方式（LangChain）比赛环境未预装，仅作理解。"
  ],
  refs:[
    {
      title:"用 Python 调用 Ollama 的 embedding 做检索（比赛环境运行）",
      code:"# 比赛环境已装 requests，Ollama 服务默认在 11434 端口\n# 把知识库文档向量化，用 bge-m3 模型\nimport requests\n\nOLLAMA = \"http://localhost:11434\"\nEMB = \"bge-m3\"\n\ndocs = [\n    \"赛项规程规定比赛环境使用 Anaconda 管理 Python 包\",\n    \"Dify 知识库支持上传 PDF、Word、TXT 文档\",\n]\n\n# 1. 文档向量化\ndef embed(texts):\n    r = requests.post(OLLAMA + \"/api/embed\", json={\"model\": EMB, \"input\": texts})\n    return r.json()[\"embeddings\"]\n\ndoc_vecs = embed(docs)\n\n# 2. 提问也向量化，计算相似度\nquery_vec = embed([\"知识库支持哪些文档格式\"])[0]\nscores = [(sum(a * b for a, b in zip(qv, dv)), i) for i, dv in enumerate(doc_vecs)]\nbest = max(scores)[1]\nprint(\"最相关的文档：\", docs[best])\n\n# 3. 检索结果拼进提示词，再让大模型回答\nq = embed([\"qwen3:14b-q8_0\"])  # 占位，下面才是真正的对话调用\nr = requests.post(OLLAMA + \"/api/chat\", json={\n    \"model\": \"qwen3:14b-q8_0\",\n    \"messages\": [{\"role\": \"user\", \"content\": \"根据资料回答：知识库支持哪些文档格式？\"}]\n})\nprint(r.json()[\"message\"][\"content\"])"
    }
  ],
  tip:"这一段视频集数多但考点集中：向量模型名、RAG 数据流、Agent 概念。记住「检索 + 生成」两段式，得分点就在这两个环节。"
},
{
  id:"6-6", ch:"6", no:"6", title:"Dify 部署与知识库",
  dur:"Dify 01-06 集", tag:"Dify",
  lead:"Dify 是任务4的主战场：低代码搭知识库、做问答应用、配工作流都在这里面完成。比赛环境用 Docker 装好了 1.9.2 版本，你要熟悉它的操作界面。",
  points:[
    "<b>Dify 是什么</b>。开源的大模型应用开发平台：图形界面搭应用，不用写代码。比赛任务4「智能体低代码开发」就是考它。",
    "<b>部署方式</b>。Docker 一键起（docker compose），比赛环境已就绪。浏览器访问本机端口进控制台。",
    "<b>核心模块</b>。应用（聊天助手 / Agent / 工作流）、知识库、模型接入、编排画布。创建应用 → 选模型 → 配提示词 → 发布，四步出成品。",
    "<b>知识库流程</b>。创建知识库 → 上传文档（PDF/Word/TXT）→ 设置分段 → 自动向量化（连本地 embedding 模型）→ 完成。之后应用里勾选「引用知识库」即可。",
    "<b>接入 Ollama 模型</b>。在 Dify 的模型设置里填 Ollama API 地址和模型名，本地大模型就变成 Dify 的底座了。"
  ],
  refs:[
    {
      title:"Dify 常用操作清单（界面操作，非代码）",
      code:"# Dify 控制台：应用 → 知识库 → 工作流 三个入口\n# 1. 接入本地模型\n#    设置 → 模型供应商 → Ollama\n#    API 地址: http://localhost:11434\n#    模型名:   qwen3:14b-q8_0 / deepseek-r1:14b / bge-m3\n\n# 2. 建知识库\n#    知识库 → 创建知识库 → 上传文档\n#    分段设置：按段落分割，每段 500-1000 字符\n#    索引方式：高质量（用 embedding 向量化）\n#    确认「检索测试」能命中相关段落\n\n# 3. 搭问答应用\n#    应用 → 创建应用 → 聊天助手\n#    系统提示词里写角色 + 任务 + 输出要求\n#    右上角勾选知识库，打开检索增强\n\n# 4. 发布\n#    右上角「发布」→ 得到可对话的 URL"
    }
  ],
  steps:[
    {
      title:"Dify 知识库问答应用搭建流程",
      head:["步骤","操作","确认结果"],
      rows:[
        ["1","确认 Dify 已启动（浏览器打开控制台）","能登录控制台"],
        ["2","设置里接入 Ollama 模型（对话 + 向量各一个）","测试模型连接成功"],
        ["3","上传文档建知识库，设置分段","文档显示已索引"],
        ["4","点「召回测试」输入一个问题","能检索到相关段落"],
        ["5","创建聊天助手应用，勾选知识库","应用能引用资料回答"],
        ["6","发布应用","生成可访问的链接"]
      ]
    }
  ],
  tip:"建知识库是任务4的固定动作。考前把「建库 → 向量化 → 检索测试」这串流程走两遍，比赛里不慌。注意向量模型要选对（bge-m3 或 qwen3-embedding:8b）。"
},
{
  id:"6-7", ch:"6", no:"7", title:"Dify 工作流与智能体",
  dur:"Dify 04/07-10 集", tag:"工作流",
  lead:"工作流是 Dify 的进阶玩法：把「问题分类 → 知识库检索 → 模型回答 → 结果加工」串成流程图。任务4里的智能体题基本就是拖流程图。",
  points:[
    "<b>工作流是什么</b>。可视化的节点编排：开始 → 各处理节点 → 结束。每个节点做一件事（提问、检索、生成、判断、输出），连线决定数据流向。",
    "<b>ChatFlow 与 Workflow 区别</b>。ChatFlow 带对话记忆，适合聊天应用；Workflow 无记忆，适合批处理任务（传文件出结果）。",
    "<b>常用节点</b>。开始/结束、LLM（大模型）、知识库检索、条件判断（IF/ELSE）、变量赋值、HTTP 请求、代码节点（写 Python）。",
    "<b>整合 Ollama</b>。工作流里的 LLM 节点同样可以选本地模型，提示词按节点单独配。",
    "<b>典型比赛形态</b>。「知识库检索 + LLM 回答」双节点是基础盘；加条件判断（比如资料不足时走兜底回答）就是加分项。",
    "<b>MCP 与插件</b>。新版 Dify 支持插件和 MCP 服务，能扩展工具能力。比赛范围以规程为准，掌握基础节点编排就够用。"
  ],
  steps:[
    {
      title:"知识库问答工作流（推荐结构）",
      head:["节点","作用","要点"],
      rows:[
        ["开始","接收用户问题","定义输入变量"],
        ["知识库检索","召回相关文档","选择库 + 设置 topK（3-5 条）"],
        ["LLM","按资料生成回答","系统提示词里写明引用规则"],
        ["条件判断（可选）","检索结果为空时走兜底","提高稳定性"],
        ["结束","返回回答","可附上引用来源"]
      ]
    }
  ],
  tip:"工作流题的分值通常在「结构设计」：节点顺序对不对、提示词写没写清楚。考前在 Dify 里照上面结构搭一个，截图记下每个节点的配置项。"
},
{
  id:"6-8", ch:"6", no:"8", title:"大模型应用考前冲刺",
  dur:"任务4 全流程", tag:"综合",
  lead:"把第6章串成一条 60 分钟的考前演练线。按顺序走完，任务4 的 40 分心里就有底了。",
  points:[
    "<b>第一关 模型就绪（10分钟）</b>。docker ps 看容器、ollama list 看模型、curl 测 API。三连确认后，本地大模型这条线就是通的。",
    "<b>第二关 知识库（20分钟）</b>。Dify 建库 → 传文档 → 分段 → 向量化 → 召回测试。重点：embedding 模型名、分段大小、topK 设置。",
    "<b>第三关 问答应用（15分钟）</b>。聊天助手 + 系统提示词 + 勾选知识库。跑 5 个问题验证回答质量，差的调整提示词。",
    "<b>第四关 工作流（15分钟）</b>。把问答应用升级成「检索 → 回答 → 判断」三步工作流，配上兜底分支。",
    "<b>临场提醒</b>。操作题评分看过程和结果：截图、导出 DSL、保留运行记录，都是得分的凭证。答完先自查功能再交。"
  ],
  refs:[
    {
      title:"考前自检清单（对照打勾）",
      code:"□ docker ps 能看到 Dify 和 Ollama 容器\n□ ollama list 有 qwen3:14b-q8_0、deepseek-r1:14b\n□ ollama list 有 bge-m3 或 qwen3-embedding:8b\n□ curl localhost:11434/api/tags 返回 JSON\n□ Dify 模型设置里 Ollama 连接测试通过\n□ 知识库里至少建好一个库并完成向量化\n□ 问答应用能引用知识库回答\n□ 工作流跑通「检索 → 回答 → 兜底」\n□ 知道每个模型是干嘛的（对话 / 推理 / 向量）\n\n# 全部打勾，任务4的 40 分基本到手"
    }
  ],
  tip:"最后叮嘱：操作题不看花活看完成度。把基础盘做稳（模型能调、知识库能答、工作流能跑），分数就到手了。"
}
];
