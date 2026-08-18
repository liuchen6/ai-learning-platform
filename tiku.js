/* 理论题库刷题模块（938 题：单选 557 / 多选 182 / 判断 199）
   数据源：JSZ2026032 理论题库 PDF 提取
   功能：模式过滤（全部/单选/多选/判断/错题重刷）+ 抽题 + 即时判分 + 错题记录 */
window.TIKU = (() => {
  const Q = window.QBANK || [];
  const WRONG_KEY = "tiku_wrong";
  const DONE_KEY = "tiku_done";

  const getWrong = () => { try { return JSON.parse(localStorage.getItem(WRONG_KEY) || "[]"); } catch(e){ return []; } };
  const setWrong = a => localStorage.setItem(WRONG_KEY, JSON.stringify(a.slice(0, 500)));
  const getDone = () => { try { return JSON.parse(localStorage.getItem(DONE_KEY) || "[]"); } catch(e){ return []; } };
  const setDone = a => localStorage.setItem(DONE_KEY, JSON.stringify(a.slice(-1000)));

  const qType = q => (q.type === "bool") ? "judge" : (q.answer.length > 1 ? "multi" : "single");
  const qTag = q => {
    const t = { single: "单选", multi: "多选", judge: "判断" }[qType(q)];
    const d = q.diff || "中";
    const c = { 易: "#16a34a", 中: "#d97706", 难: "#dc2626" }[d] || "#6b7280";
    return '<span style="font-size:11px;padding:1px 8px;border-radius:999px;border:1px solid ' + c + '66;color:' + c + ';margin-right:8px">' + t + ' · ' + d + '</span>';
  };

  function modePool(mode){
    if(mode === "wrong"){
      const wrong = getWrong();
      return Q.filter(q => wrong.includes(q.id));
    }
    if(mode === "single") return Q.filter(q => q.type === "single" && q.answer.length === 1);
    if(mode === "multi") return Q.filter(q => q.type === "single" && q.answer.length > 1);
    if(mode === "bool") return Q.filter(q => q.type === "bool");
    return Q.slice();
  }

  function shuffle(a){
    const b = a.slice();
    for(let i = b.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }

  let batch = [];        // 当前批次题目
  let answers = {};      // 已提交答案 id -> 字符数组（后端判定用）
  let rightCount = 0;

  function setupHTML(){
    const wrong = getWrong();
    const modeBtn = (m, label, desc) =>
      '<button class="tk-btn" data-mode="' + m + '" onclick="TIKU.start(\'' + m + '\')"><b>' + label + '</b><small>' + desc + '</small></button>';
    return '<div id="article">' +
      '<div class="sec-head">' +
        '<div class="sec-ch"><span class="hh" style="background:#6b7280"></span>理论题库</div>' +
        '<h1>理论刷题 · ' + Q.length + ' 题</h1>' +
        '<div class="sec-meta"><span class="tag">单选 ' + Q.filter(q => q.answer.length === 1 && q.type !== "bool").length + '</span>' +
        '<span class="tag">多选 ' + Q.filter(q => q.answer.length > 1 && q.type !== "bool").length + '</span>' +
        '<span class="tag">判断 ' + Q.filter(q => q.type === "bool").length + '</span>' +
        '<span class="tag">易 ' + Q.filter(q => q.diff === "易").length + ' / 中 ' + Q.filter(q => q.diff === "中").length + ' / 难 ' + Q.filter(q => q.diff === "难").length + '</span>' +
        '<span class="tag" style="color:var(--red)">错题 ' + wrong.length + '</span></div>' +
      '</div>' +
      '<div class="card"><h3><span class="ic blue">📖</span>选择练习模式</h3>' +
        '<div class="tk-grid">' +
          modeBtn("all", "全部 938 题", "真实考场混排，含多选与判断") +
          modeBtn("single", "单选专项 557", "一题一答，打基础") +
          modeBtn("multi", "多选专项 182", "比赛丢分重灾区，注意选项组合") +
          modeBtn("bool", "判断专项 199", "对错两选项，快速过") +
          modeBtn("wrong", "错题重刷 " + wrong.length, "只出做错的题，练到清零") +
        '</div>' +
        '<p class="tk-note">抽题方式：开卷前热身一次抽 20~50 题，答完看正确率；错题会被记录下来，随时回来重刷。</p>' +
      '</div>' +
    '</div>';
  }

  function start(mode){
    const pool = modePool(mode);
    if(mode === "wrong" && !pool.length){
      alert("错题本是空的，先去其他模式刷题吧。");
      return;
    }
    if(!pool.length){ alert("题库还没有数据。"); return; }
    batch = shuffle(pool).slice(0, 20);
    answers = {}; rightCount = 0;
    const btnRun = (q, i) =>
      '<button class="btn run tk-submit" onclick="TIKU.submit(' + i + ')">提交本题</button>';
    const html = '<div id="tk-top">' +
      '<button class="btn" onclick="goto(\'_tiku\')">← 返回模式选择</button>' +
      '<span class="tk-progress" id="tkProgress">0/' + batch.length + '</span></div>';
    document.getElementById("main").innerHTML = html + batch.map((q, i) => {
      const sel = qType(q);
      let opts = '';
      if(sel === "judge"){
        opts = '<div class="tk-judge">' +
          '<button class="opt" onclick="TIKU.pickJudge(' + i + ',1)">✔ 正确</button>' +
          '<button class="opt" onclick="TIKU.pickJudge(' + i + ',0)">✘ 错误</button></div>';
      } else {
        opts = q.options.map((o, j) => {
          const letter = o.split(".")[0].trim();
          const text = o.replace(/^[A-D]\.\s*/, "");
          return '<button class="opt tk-opt" data-i="' + i + '" data-letter="' + letter + '" onclick="TIKU.pick(' + i + ',\'' + letter + '\')">' + letter + '. ' + text + '</button>';
        }).join("") + '<div class="tk-subrow">' + btnRun(q, i) + '</div>';
        if(sel === "multi") opts += '<div class="tk-hint">⚠ 本题为多选：可点多个选项后提交</div>';
      }
      return '<div class="quiz-item" data-q="' + i + '">' +
        '<div class="quiz-q"><span class="qn">' + (i + 1) + '</span>' + qTag(q) + esc(q.text) + '</div>' + opts +
      '</div>';
    }).join("") +
    '<div class="card tk-result" id="tkResult" style="display:none"></div>' +
    '<button class="btn run tk-finish" style="margin-top:16px;display:none" onclick="TIKU.finish()">查看成绩</button>';
  }

  function pick(qi, letter){
    const item = document.querySelectorAll(".quiz-item")[qi];
    const btns = item.querySelectorAll(".tk-opt");
    const btn = Array.from(btns).find(b => b.dataset.letter === letter);
    const isMulti = qType(batch[qi]) === "multi";
    if(isMulti){
      btn.classList.toggle("tk-on");
    } else {
      btns.forEach(b => b.classList.remove("tk-on"));
      btn.classList.add("tk-on");
    }
  }

  function pickJudge(qi, val){
    const item = document.querySelectorAll(".quiz-item")[qi];
    item.querySelectorAll(".opt").forEach(b => b.classList.remove("chosen", "correct", "wrong"));
    const btn = item.querySelectorAll(".opt")[val];
    btn.classList.add("chosen");
    submit(qi);
  }

  function submit(qi){
    const q = batch[qi];
    const item = document.querySelectorAll(".quiz-item")[qi];
    const sel = qType(q);
    let chosen = [];
    if(sel === "judge"){
      const o = item.querySelectorAll(".opt")[0];
      if(o.classList.contains("chosen")) chosen = ["Y"];
      else {
        const o2 = item.querySelectorAll(".opt")[1];
        if(o2.classList.contains("chosen")) chosen = ["N"];
        else return;
      }
    } else {
      item.querySelectorAll(".tk-opt.tk-on").forEach(b => chosen.push(b.dataset.letter));
      if(!chosen.length) return;
      if(sel === "single" && chosen.length !== 1) return;
    }
    const expect = q.answer.split("").sort().join("");
    const got = chosen.slice().sort().join("");
    const ok = expect === got;
    if(ok) rightCount++;
    else setWrong(Array.from(new Set(getWrong().concat([q.id]))));
    const done = Array.from(new Set(getDone().concat([q.id])));
    setDone(done);
    answers[q.id] = got;
    if(!ok) {
      const wrong = item.querySelectorAll(".tk-opt.tk-on, .chosen");
      wrong.forEach(b => b.classList.add("wrong"));
      if(sel === "judge"){
        item.querySelectorAll(".opt")[q.answer === "Y" ? 0 : 1].classList.add("correct");
      } else {
        const rightBtn = item.querySelectorAll(".tk-opt");
        const expectArr = q.answer.split("");
        rightBtn.forEach(b => {
          if(expectArr.includes(b.dataset.letter)) b.classList.add("correct");
        });
      }
    } else {
      item.querySelectorAll(".tk-opt.tk-on, .chosen").forEach(b => b.classList.add("correct"));
    }
    item.querySelectorAll(".opt").forEach(b => b.disabled = true);
    const sub = item.querySelector(".tk-submit");
    if(sub){ sub.disabled = true; sub.textContent = ok ? "✔ 答对" : "✘ 答错"; }
    const prog = document.getElementById("tkProgress");
    if(prog){
      const answered = Object.keys(answers).length;
      prog.textContent = answered + "/" + batch.length;
      const fin = document.querySelector(".tk-finish");
      if(fin && answered >= batch.length){ fin.style.display = "inline-block"; }
    }
  }

  function finish(){
    const all = batch.length;
    const wrongCount = all - rightCount;
    const wrongIds = batch.filter(q => !answers[q.id] || answers[q.id] !== q.answer.split("").sort().join("")).map(q => q.id);
    const btn = document.getElementById("tkResult");
    btn.style.display = "block";
    btn.innerHTML =
      '<h3><span class="ic green">🏁</span>本批成绩 · ' + rightCount + '/' + all + '（' + Math.round(rightCount / all * 100) + '%）</h3>' +
      '<p style="color:var(--dim);margin-bottom:10px">错题已自动存入错题本。做错的题回对应章节补知识，再回来重刷。</p>' +
      (wrongIds.length
        ? '<div class="tk-wrong-list"><b>本批错题：</b>' + wrongIds.map((id, i) =>
            '<button class="btn" style="margin:3px" onclick="TIKU.showOne(' + id + ')">第 ' + (batch.findIndex(q => q.id === id) + 1) + ' 题</button>'
          ).join("") + '</div>'
        : '<p style="color:var(--green)"><b>全对，可以放心了。</b></p>');
    document.querySelector(".tk-finish").style.display = "none";
  }

  function showOne(id){
    const q = Q.find(x => x.id === id);
    if(!q) return;
    document.getElementById("tkResult").outerHTML = "";
    const idx = batch.findIndex(x => x.id === id);
    const item = document.querySelectorAll(".quiz-item")[idx] ||
      (function(){
        const div = document.createElement("div");
        div.className = "quiz-item";
        div.innerHTML = '<div class="quiz-q"><span class="qn">?</span>' + qTag(q) + esc(q.text) + '</div>';
        document.getElementById("main").appendChild(div);
        return div;
      })();
    const sel = qType(q);
    if(sel === "judge"){
      item.innerHTML = '<div class="quiz-q"><span class="qn">?</span>' + qTag(q) + esc(q.text) + '</div>' +
        '<div class="tk-ans">正确答案：' + (q.answer === "Y" ? "✔ 正确" : "✘ 错误") + '</div>';
    } else {
      const letters = q.answer.split("");
      item.innerHTML = '<div class="quiz-q"><span class="qn">?</span>' + qTag(q) + esc(q.text) + '</div>' +
        q.options.map(o => {
          const letter = o.split(".")[0].trim();
          const text = o.replace(/^[A-D]\.\s*/, "");
          return '<div class="opt chosen correct" style="cursor:default">' + letter + '. ' + text + '</div>';
        }).join("") +
        '<div class="tk-ans">正确答案：' + q.answer.split("").join("、") + '</div>';
    }
    window.scrollTo(0, document.getElementById("main").scrollHeight);
  }

  function render(){
    const w = window;
    w.tikuStart = start;
    return setupHTML();
  }

  return { render, start, pick, pickJudge, submit, finish, showOne };
})();