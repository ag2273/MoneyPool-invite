'use strict';

(function () {
  var config = window.MONEYPOOL_CONFIG || {};
  var APP_SCHEME = 'moneypool';

  var code = (new URLSearchParams(window.location.search).get('code') || '')
    .trim()
    .toUpperCase();

  var loading = document.getElementById('loading');
  var invite = document.getElementById('invite');
  var problem = document.getElementById('problem');
  var problemText = document.getElementById('problem-text');
  var poolName = document.getElementById('pool-name');
  var inviteCode = document.getElementById('invite-code');
  var openApp = document.getElementById('open-app');

  // textContent only: the pool name is organizer-supplied data.
  function showProblem(message) {
    loading.hidden = true;
    invite.hidden = true;
    problemText.textContent = message;
    problem.hidden = false;
  }

  function showInvite(row) {
    poolName.textContent = row.pool_name;
    inviteCode.textContent = code;
    openApp.setAttribute(
      'href',
      APP_SCHEME + '://join?code=' + encodeURIComponent(code),
    );
    loading.hidden = true;
    problem.hidden = true;
    invite.hidden = false;
  }

  async function load() {
    if (!code || !config.supabaseUrl || !config.anonKey) {
      showProblem('افتح رابط الدعوة كاملاً، فهو يحتوي على رمز الدعوة.');
      return;
    }

    try {
      var response = await fetch(config.supabaseUrl + '/rest/v1/rpc/invite_preview', {
        method: 'POST',
        headers: {
          apikey: config.anonKey,
          Authorization: 'Bearer ' + config.anonKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invite_code: code }),
      });

      if (!response.ok) {
        showProblem('تعذّر التحقق من الدعوة. حاول مرة أخرى.');
        return;
      }

      var rows = await response.json();
      if (!Array.isArray(rows) || rows.length === 0) {
        showProblem('رمز الدعوة غير صحيح أو مستخدم من قبل.');
        return;
      }

      showInvite(rows[0]);
    } catch {
      showProblem('تعذّر التحقق من الدعوة. تحقّق من اتصالك بالإنترنت.');
    }
  }

  void load();
})();
