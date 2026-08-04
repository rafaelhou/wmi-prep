/* WMI 備賽計畫
   練習題渲染 + 詞彙自我測驗開關
   題目為自行編寫，非歷屆試題。 */

(function () {
  'use strict';

  var PROBLEMS = [
    {
      d: '計算',
      q: 'What is 25 × 4 × 7?',
      zh: '25 × 4 × 7 等於多少？',
      a: '700',
      s: '先算 25 × 4 = 100，再乘 7 得 700。<br><strong>技巧：</strong>看到 25 就找 4，看到 125 就找 8，先湊成整百再乘，比照順序硬算快得多。'
    },
    {
      d: '計算',
      q: 'Find the sum of all whole numbers from 1 to 20.',
      zh: '求 1 到 20 所有整數的和。',
      a: '210',
      s: '頭尾配對：1+20 = 21，2+19 = 21⋯⋯共有 10 對。<br>10 × 21 = <strong>210</strong>。'
    },
    {
      d: '幾何',
      q: 'The perimeter of a square is 36 cm. What is the length of one side?',
      zh: '一個正方形的周長是 36 公分，一邊長多少？',
      a: '9 cm',
      s: '正方形四邊等長，36 ÷ 4 = <strong>9</strong> 公分。<br><strong>注意：</strong>題目問的是 side（邊長），不是 area（面積）。'
    },
    {
      d: '幾何',
      q: 'A rectangle is 8 cm long and 5 cm wide. What is its area?',
      zh: '一個長方形長 8 公分、寬 5 公分，面積是多少？',
      a: '40 cm²',
      s: '面積 = 長 × 寬 = 8 × 5 = <strong>40</strong> 平方公分。<br>如果問的是 perimeter，答案會是 (8+5)×2 = 26 公分——<strong>這兩個字一定要分清楚</strong>。'
    },
    {
      d: '代數',
      q: 'If A + 7 = 15, what is A × 3?',
      zh: '如果 A + 7 = 15，那麼 A × 3 是多少？',
      a: '24',
      s: 'A = 15 − 7 = 8，再算 8 × 3 = <strong>24</strong>。<br><strong>這是典型的兩步題：</strong>算出 A 只是中間值，題目要的是 A × 3。很多人算到 8 就停了。'
    },
    {
      d: '代數',
      q: 'Three identical boxes weigh 27 kg in total. How much does one box weigh?',
      zh: '三個一樣的箱子總共重 27 公斤，一個箱子重多少？',
      a: '9 kg',
      s: '27 ÷ 3 = <strong>9</strong> 公斤。<br><strong>identical</strong> 是關鍵字，意思是「完全相同的」，所以可以直接平分。'
    },
    {
      d: '數論',
      q: 'What is the smallest number greater than 50 that is divisible by both 3 and 4?',
      zh: '大於 50 且同時能被 3 和 4 整除的最小數是多少？',
      a: '60',
      s: '同時能被 3 和 4 整除，就是 12 的倍數：12、24、36、48、<strong>60</strong>⋯⋯<br>48 小於 50，所以答案是 60。'
    },
    {
      d: '數論',
      q: 'How many odd numbers are there from 1 to 30?',
      zh: '1 到 30 之間有幾個奇數？',
      a: '15',
      s: '1 到 30 剛好一半是奇數：30 ÷ 2 = <strong>15</strong> 個。<br><strong>odd</strong> 是奇數、<strong>even</strong> 是偶數，這兩個字很常出現。'
    },
    {
      d: '組合',
      q: 'Tom has 3 different shirts and 4 different pants. How many different outfits can he make?',
      zh: 'Tom 有 3 件不同的上衣和 4 條不同的褲子，可以搭出幾種不同的穿法？',
      a: '12',
      s: '每件上衣都可以配 4 條褲子：3 × 4 = <strong>12</strong> 種。<br><strong>先讓孩子畫出來數一遍</strong>，數完他自己會發現可以用乘的。'
    },
    {
      d: '組合',
      q: 'Using the digits 1, 2, and 3, how many different two-digit numbers can be formed if no digit is repeated?',
      zh: '用 1、2、3 這三個數字，不重複使用，可以組成幾個不同的兩位數？',
      a: '6',
      s: '十位數有 3 種選擇，個位數剩 2 種：3 × 2 = <strong>6</strong> 個。<br>列出來是 12、13、21、23、31、32。'
    },
    {
      d: '推理',
      q: 'A, B and C stand in a line. B stands last. A does not stand first. In how many ways can they stand?',
      zh: 'A、B、C 三人排成一列。B 排最後，A 不排第一。有幾種排法？',
      a: '1',
      s: 'B already takes the last spot, so A and C fill the first two.<br>A 不能排第一 → A 只能排第二 → C 排第一。<br>只有 <strong>1</strong> 種：C、A、B。'
    },
    {
      d: '推理',
      q: 'In a race, Amy finished before Ben. Ben finished before Cody. Who finished last?',
      zh: '賽跑中，Amy 比 Ben 早到終點，Ben 比 Cody 早到。誰最後到？',
      a: 'Cody',
      s: '順序是 Amy → Ben → Cody，所以最後的是 <strong>Cody</strong>。<br><strong>finished before</strong> 是「比⋯⋯早完成」，讀反了答案就相反。'
    }
  ];

  /* ── 渲染練習題 ─────────────────────── */

  var box = document.getElementById('probs');
  if (box) {
    PROBLEMS.forEach(function (p, i) {
      var d = document.createElement('details');
      d.className = 'prob';

      var head = document.createElement('div');
      head.className = 'phead';
      head.innerHTML =
        '<span class="pnum">' + (i + 1) + '</span>' +
        '<span class="pdom">' + p.d + '</span>';

      var q = document.createElement('p');
      q.className = 'pq';
      q.textContent = p.q;

      var zh = document.createElement('p');
      zh.className = 'pzh';
      zh.textContent = p.zh;

      var sum = document.createElement('summary');
      sum.textContent = '看答案';

      var ans = document.createElement('div');
      ans.className = 'pans';
      ans.innerHTML = '<p class="pa">答案：<strong>' + p.a + '</strong></p><p class="ps">' + p.s + '</p>';

      d.appendChild(sum);
      d.appendChild(ans);

      var wrap = document.createElement('div');
      wrap.className = 'pwrap';
      wrap.appendChild(head);
      wrap.appendChild(q);
      wrap.appendChild(zh);
      wrap.appendChild(d);

      box.appendChild(wrap);
    });
  }

  /* ── 詞彙自我測驗 ───────────────────── */

  var btn = document.getElementById('quizBtn');
  var vocab = document.getElementById('vocab');
  if (btn && vocab) {
    var hidden = false;
    btn.addEventListener('click', function () {
      hidden = !hidden;
      vocab.classList.toggle('masked', hidden);
      btn.textContent = hidden ? '顯示中文' : '遮住中文，自己測驗';
      btn.setAttribute('aria-pressed', String(hidden));
    });
  }
})();
