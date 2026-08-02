const crypto = require("crypto");

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ""));
  const b = Buffer.from(String(right || ""));
  return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { ok: false, error: "Method not allowed" });
  }

  const expectedPin = String(process.env.MASTER_ADMIN_PIN || "").trim();
  if (!expectedPin) {
    return sendJson(res, 503, { ok: false, error: "관리자 로그인이 설정되지 않았습니다." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const role = String(body.role || "").trim();
  const pin = String(body.pin || "").trim();
  if (role !== "master" || !safeEqual(pin, expectedPin)) {
    return sendJson(res, 401, { ok: false, error: "인증 정보가 맞지 않습니다." });
  }

  return sendJson(res, 200, { ok: true, role: "master" });
};
