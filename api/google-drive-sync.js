function json(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, message: 'POST only' });
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    const body = raw ? JSON.parse(raw) : {};
    const webhookUrl = String(body.webhookUrl || '').trim();
    const payload = body.payload || body;

    if (!webhookUrl || !/^https:\/\/script\.google\.com\/macros\/s\//.test(webhookUrl)) {
      return json(res, 400, { ok: false, message: '유효한 Apps Script /exec URL이 아닙니다.' });
    }

    if (body.action === 'read' || payload.action === 'read') {
      const readUrl = new URL(webhookUrl);
      readUrl.searchParams.set('action', 'exportData');
      readUrl.searchParams.set('t', String(Date.now()));
      const upstream = await fetch(readUrl.toString(), { method: 'GET', redirect: 'follow', cache: 'no-store' });
      const text = await upstream.text();
      let upstreamJson = null;
      try { upstreamJson = JSON.parse(text); } catch (error) {}
      if (!upstream.ok || !upstreamJson?.ok) {
        return json(res, 502, {
          ok: false,
          message: 'Apps Script 데이터 불러오기에 실패했습니다.',
          status: upstream.status,
          responseText: text.slice(0, 500)
        });
      }
      return json(res, 200, {
        ok: true,
        message: '구글시트 데이터 불러오기 완료',
        data: upstreamJson.data || upstreamJson
      });
    }

    const applicantsCount = Array.isArray(payload.applicants) ? payload.applicants.length : 0;
    const statsCount = Array.isArray(payload.stats) ? payload.stats.length : 0;
    const screeningsCount = Array.isArray(payload.screenings) ? payload.screenings.length : 0;

    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    const text = await upstream.text();
    let upstreamJson = null;
    try { upstreamJson = JSON.parse(text); } catch (error) {}

    if (!upstream.ok) {
      return json(res, 502, {
        ok: false,
        message: 'Apps Script 저장 요청이 실패했습니다.',
        status: upstream.status,
        responseText: text.slice(0, 500),
        counts: { applicantsCount, statsCount, screeningsCount }
      });
    }

    return json(res, 200, {
      ok: true,
      message: '구글시트 저장 요청 완료',
      counts: { applicantsCount, statsCount, screeningsCount },
      appsScript: upstreamJson || text.slice(0, 500)
    });
  } catch (error) {
    return json(res, 500, { ok: false, message: error && error.message ? error.message : String(error) });
  }
};
