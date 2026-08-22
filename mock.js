/* ============ 模拟考试计时器 ============
   3 小时倒计时 + 按任务分值分配时间的节奏提醒。
   时间节奏为策略建议（估算），非官方数据。
*/
window.MOCK = {
render: function(){
  const g = id => 'onclick="goto(\'' + id + '\')"';
  const btn = (id, txt) => '<button class="btn" style="background:#2563eb;border-color:#2563eb;color:#fff;margin:2px 6px 2px 0" ' + g(id) + '>' + txt + '</button>';

  const tasks = [
    {name:'任务一 数据准备',pts:5,min:15,lesson:'8-1',color:'#16a34a',
     steps:'去重 → 清洗 → 补全 → 脱敏 → 保存'},
    {name:'任务二 机器学习',pts:10,min:30,lesson:'4-5',color:'#2563eb',
     steps:'文本预处理 → TF-IDF → 划分 → 建模 → 评估'},
    {name:'任务三 深度学习',pts:30,min:50,lesson:'5-10',color:'#7c3aed',
     steps:'环境确认 → 数据格式 → YOLO训练 → 推理 → 损失曲线'},
    {name:'任务四 大模型',pts:40,min:60,lesson:'6-6',color:'#dc2626',
     steps:'Ollama检查 → Dify知识库 → 召回测试 → 工作流 → 场景测试 → 截图'},
    {name:'任务五 业务分析',pts:10,min:30,lesson:'7-2',color:'#d97706',
     steps:'痛点三步 → 方案四件套 → 工作流描述 → 报告检查'}
  ];

  const taskRows = tasks.map(t =>
    '<tr><td><b style="color:' + t.color + '">' + t.name + '</b></td>' +
    '<td style="text-align:center"><b>' + t.pts + '</b></td>' +
    '<td style="text-align:center">' + t.min + '分钟</td>' +
    '<td>' + t.steps + '</td>' +
    '<td>' + btn(t.lesson, '去练习 →') + '</td></tr>'
  ).join('');

  return '<div id="article"><div class="sec-head">' +
    '<div class="sec-ch"><span class="hh" style="background:#dc2626"></span>模拟考试</div>' +
    '<h1>模拟考试计时器</h1>' +
    '<div class="sec-meta"><span class="tag">3小时倒计时</span><span class="tag">按分值分配时间</span><span class="tag">模拟真实考场节奏</span></div></div>' +

    '<div class="card" style="background:#fef3c7;border-color:#fbbf24">' +
    '<h3 style="margin:0 0 6px;color:#92400e">⏱ 三小时分配策略（总分 100 分）</h3>' +
    '<p style="margin:0 0 8px;font-size:13.5px;color:#78350f">按分值分配时间，拿分多的任务给足时间。先跑通拿保底分，有余力再优化。</p>' +
    '<table>' +
    '<tr><th>任务</th><th>分值</th><th>建议时间</th><th>操作步骤</th><th>练习</th></tr>' +
    taskRows +
    '<tr style="background:#f0fdf4"><td><b>收卷检查</b></td><td style="text-align:center">—</td><td style="text-align:center">15分钟</td>' +
    '<td>命名核对 + 位置核对 + 文件能打开 + 清理工位</td><td>' + btn('_hand', '检查卡 →') + '</td></tr>' +
    '</table></div>' +

    '<div class="sheet-section"><h3>在线计时器</h3>' +
    '<div class="card" style="text-align:center;padding:30px 20px">' +
    '<div id="mock-timer" style="font-size:48px;font-weight:800;color:#27272a;font-variant-numeric:tabular-nums;margin-bottom:16px">03:00:00</div>' +
    '<div id="mock-phase" style="font-size:16px;color:#6b7280;margin-bottom:20px">点击开始进入模拟考试</div>' +
    '<div style="display:flex;gap:10px;justify-content:center">' +
    '<button class="btn" style="background:#16a34a;border-color:#16a34a;color:#fff;padding:10px 24px;font-size:15px" onclick="MOCK.startTimer()">▶ 开始计时</button>' +
    '<button class="btn" style="background:#dc2626;border-color:#dc2626;color:#fff;padding:10px 24px;font-size:15px" onclick="MOCK.stopTimer()">⏹ 停止</button>' +
    '<button class="btn" style="background:#6b7280;border-color:#6b7280;color:#fff;padding:10px 24px;font-size:15px" onclick="MOCK.resetTimer()">↺ 重置</button>' +
    '</div></div></div>' +

    '<div class="sheet-section"><h3>时间节奏提醒（策略建议）</h3>' +
    '<div class="card tip"><ul class="points">' +
    '<li><b>前10分钟</b>：只读题不动手（官方规则），圈出每个任务的输入输出文件和命名要求</li>' +
    '<li><b>第10-25分钟</b>：任务一数据准备，代码现成直接跑</li>' +
    '<li><b>第25-55分钟</b>：任务二机器学习，6个算法模板选一个用</li>' +
    '<li><b>第55-105分钟</b>：任务三深度学习，先让YOLO训练跑起来，等训练时做任务四</li>' +
    '<li><b>第105-165分钟</b>：任务四大模型，分值最大留足整块时间</li>' +
    '<li><b>第165-195分钟</b>：任务五业务分析，报告边写边对照模板</li>' +
    '<li><b>最后15分钟</b>：全局检查，按试卷任务清单逐项打勾</li>' +
    '</ul></div></div>' +

    '<div class="card" style="background:#16a34a0d;border-color:#16a34a33"><p style="color:#374151;font-size:14px"><b>原则：</b>先跑通拿保底分，再优化拿高分。每个任务先把最小结果跑出来、输出文件保住，有余力再调参。</p></div>' +
    '</div>';
},

timer: null,
remaining: 3 * 60 * 60,
phases: [
  {sec: 3*60*60 - 0,           msg:'📖 10分钟读题期（只看不动手）'},
  {sec: 3*60*60 - 10*60,      msg:'🧹 任务一·数据准备（15分钟）'},
  {sec: 3*60*60 - 25*60,      msg:'🤖 任务二·机器学习（30分钟）'},
  {sec: 3*60*60 - 55*60,      msg:'🧠 任务三·深度学习（50分钟）'},
  {sec: 3*60*60 - 105*60,     msg:'💬 任务四·大模型应用（60分钟）'},
  {sec: 3*60*60 - 165*60,     msg:'📝 任务五·业务分析（30分钟）'},
  {sec: 15*60,                 msg:'✅ 收卷检查（最后15分钟）'},
  {sec: 0,                     msg:'🏁 时间到！'}
],

getPhase(sec){
  for(let i=0;i<this.phases.length;i++){
    if(sec >= this.phases[i].sec) return this.phases[i].msg;
  }
  return '📖 读题期';
},

startTimer(){
  if(this.timer) return;
  const self = this;
  this.timer = setInterval(function(){
    self.remaining--;
    const h = String(Math.floor(self.remaining/3600)).padStart(2,'0');
    const m = String(Math.floor((self.remaining%3600)/60)).padStart(2,'0');
    const s = String(self.remaining%60).padStart(2,'0');
    document.getElementById('mock-timer').textContent = h+':'+m+':'+s;
    document.getElementById('mock-phase').textContent = self.getPhase(self.remaining);
    if(self.remaining <= 0){
      clearInterval(self.timer);
      self.timer = null;
      document.getElementById('mock-timer').style.color = '#dc2626';
      document.getElementById('mock-phase').textContent = '⏰ 时间到！请立即收卷。';
    }
  }, 1000);
  document.getElementById('mock-phase').textContent = this.getPhase(this.remaining);
},

stopTimer(){
  if(this.timer){ clearInterval(this.timer); this.timer = null; }
},

resetTimer(){
  this.stopTimer();
  this.remaining = 3 * 60 * 60;
  document.getElementById('mock-timer').textContent = '03:00:00';
  document.getElementById('mock-timer').style.color = '#27272a';
  document.getElementById('mock-phase').textContent = '点击开始进入模拟考试';
}
};
