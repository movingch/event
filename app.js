const DONATION_MESSAGE = "머내마을영화제는 용인시 수지구 주민들이 모여 어린이부터 시니어까지 감독, 시나리오작가, 배우, 연출이 되어서 직접 영화를 제작하고 상영합니다. 또한 동네 곳곳이 영화상영관이 되어 동네에 펼쳐지는 영화축제입니다.\n\n머내마을영화제는 손수 주민들이 만들어가는 순수 주민주도형 영화제입니다.\n\n현재 마을의 귀한 분들이 십시일반 후원에 참여해 주십니다. 여전히 이 멋진 영화제를 진행하기에 부족한 가운데 있기에 여러분의 소중한 1만원의 후원이 필요합니다. 마음이 움직이신다면 이 영화제에 후원으로 기꺼이 참여해 주시길 부탁드립니다.";

const DONATION_AMOUNT = 10000;
// 실제 후원 계좌 정보를 아래 세 값에 입력하세요.
const DONATION_BANK_NAME = "은행명 입력";
const DONATION_ACCOUNT_NUMBER = "계좌번호 입력";
const DONATION_ACCOUNT_HOLDER = "예금주 입력";
// 별도의 간편이체/결제 링크가 있다면 입력하세요. 비워두면 계좌이체 안내 화면을 표시합니다.
const DONATION_TRANSFER_URL = "https://aq.gy/f/2hekV";
const LAST_DONATION_SESSION_KEY = "munae-last-donation-id";
const STORAGE_KEY = "munaeFilmFest9.webapp.v1";
const ADMIN_SESSION_KEY = "munaeFilmFest9.admin";
const STAFF_SESSION_KEY = "munaeFilmFest9.staff";
const STAFF_PIN_MIGRATION_KEY = "munaeFilmFest9.staffPin0909.v14";
const ADMIN_PIN = "0909";
const SMS_API_ENDPOINT = "/api/send-sms";
const AUTO_SEND_SMS_ON_CONFIRMED_RESERVATION = true;

const FESTIVAL_START_DATE = "2026-09-09";
const FESTIVAL_END_DATE = "2026-09-13";
const FESTIVAL_PERIOD_LABEL = "9월 9일 ~ 9월 13일";
const OPENING_FILM_ID = "scr-opening";
const OPENING_MAIN_END_AT = "2026-09-09T23:59";
const OPENING_POSTER_SRC = "assets/face-poster.jpeg";
const OPENING_VIDEO_URL = "https://youtu.be/dM0quIEmrYA";
const OPENING_VIDEO_EMBED = "https://www.youtube.com/embed/dM0quIEmrYA?autoplay=1&mute=1&loop=1&playlist=dM0quIEmrYA&playsinline=1&controls=1&rel=0&modestbranding=1";
const OPENING_VIDEO_TITLE = "영화 얼굴 메인 예고편";
const OPENING_HEADLINE = "박정민 배우, 머내마을영화제 개막식에 오다";
const OPENING_HEADLINE_LINES = ["박정민 배우,", "머내마을영화제", "개막식에 오다"];
const EARLYBIRD_MESSAGE = "개막작 신청";
const OPENING_PROMO_COPY = "박정민배우를 만날 수 있는 개막식에 여러분을 초대합니다. 개막작 신청하셔서 이 멋진 시간을 놓치지 마세요";

const seedOpeningScreening = {
  id: OPENING_FILM_ID,
  title: "개막식 영화: 얼굴",
  venue: "동천농협강당",
  startTime: "2026-09-09T19:00",
  endTime: "2026-09-09T21:30",
  capacity: 120,
  gvHost: "박정민 배우",
  moderator: "개막식 모더레이터",
  staff: "개막식 운영팀",
  staffPhone: "010-0000-0909",
  staffPin: "0909",
  status: "신청 가능",
  notes: "박정민 배우, 머내마을영화제 개막식에 오다. 9월 9일 저녁 7시 동천농협강당에서 열리는 개막식 상영입니다. 개막식은 신청 순서와 현장 안내에 따라 운영합니다.",
  isOpening: true,
  guest: "박정민 배우",
  festivalStartDate: FESTIVAL_START_DATE,
  festivalEndDate: FESTIVAL_END_DATE,
  openingMainEndAt: OPENING_MAIN_END_AT,
  posterSrc: OPENING_POSTER_SRC,
  videoUrl: OPENING_VIDEO_URL,
  videoEmbedUrl: OPENING_VIDEO_EMBED,
  videoTitle: OPENING_VIDEO_TITLE,
  earlyBirdStart: "2026-07-14T00:00",
  earlyBirdEnd: "2026-09-08T23:59",
  generalOpenAt: "2026-09-09T00:00",
  generalEndAt: "2026-09-09T18:30",
  designatedSeatCount: 80,
  seatPrefix: "A",
  maxTicketsPerReservation: 4
};

const seedScreenings = [
  seedOpeningScreening,
  {
    id: "scr-001",
    title: "마을의 첫 장면",
    venue: "동천농협강당",
    startTime: "2026-09-09T16:00",
    endTime: "2026-09-09T17:30",
    capacity: 120,
    gvHost: "김머내 감독",
    moderator: "박진행",
    staff: "이현장",
    staffPhone: "010-0000-0001",
  staffPin: "0909",
    status: "신청 가능",
    notes: "영화제 첫날 주민 제작 상영 및 관객과의 대화"
  },
  {
    id: "scr-002",
    title: "동네를 걷는 사람들",
    venue: "커뮤니티홀",
    startTime: "2026-09-10T14:00",
    endTime: "2026-09-10T15:35",
    capacity: 55,
    gvHost: "장다큐 감독",
    moderator: "한기획",
    staff: "최스태프",
    staffPhone: "010-0000-0002",
  staffPin: "0909",
    status: "신청 가능",
    notes: "다큐멘터리 섹션"
  },
  {
    id: "scr-003",
    title: "아이들의 영화관",
    venue: "작은도서관 상영실",
    startTime: "2026-09-11T10:30",
    endTime: "2026-09-11T11:50",
    capacity: 35,
    gvHost: "",
    moderator: "",
    staff: "오어린이",
    staffPhone: "010-0000-0003",
  staffPin: "0909",
    status: "신청 가능",
    notes: "가족 관객 추천, 전체 관람가"
  },
  {
    id: "scr-004",
    title: "밤의 상영회",
    venue: "야외마당",
    startTime: "2026-09-11T19:30",
    endTime: "2026-09-11T21:10",
    capacity: 120,
    gvHost: "",
    moderator: "윤밤",
    staff: "정야외",
    staffPhone: "010-0000-0004",
  staffPin: "0909",
    status: "신청 가능",
    notes: "우천 시 커뮤니티홀로 변경"
  },
  {
    id: "scr-005",
    title: "청년 단편 모음",
    venue: "머내마을극장 2관",
    startTime: "2026-09-12T13:00",
    endTime: "2026-09-12T14:30",
    capacity: 45,
    gvHost: "단편 감독팀",
    moderator: "서청년",
    staff: "강단편",
    staffPhone: "010-0000-0005",
  staffPin: "0909",
    status: "신청 가능",
    notes: "상영 후 단체 GV"
  },
  {
    id: "scr-006",
    title: "폐막: 다시 만나는 마을",
    venue: "머내마을극장 1관",
    startTime: "2026-09-13T17:00",
    endTime: "2026-09-13T18:45",
    capacity: 80,
    gvHost: "폐막 게스트",
    moderator: "박진행",
    staff: "이현장",
    staffPhone: "010-0000-0001",
  staffPin: "0909",
    status: "신청 가능",
    notes: "폐막 인사 및 단체 사진 촬영"
  }
];

const LEGACY_DEMO_SCREENING_MIGRATION = {
  "scr-001": { title: "오프닝: 머내의 여름", venue: "머내마을극장 1관", startTime: "2026-09-05T14:00", endTime: "2026-09-05T15:40" },
  "scr-002": { title: "동네를 걷는 사람들", venue: "커뮤니티홀", startTime: "2026-09-05T16:30", endTime: "2026-09-05T18:05" },
  "scr-003": { title: "아이들의 영화관", venue: "작은도서관 상영실", startTime: "2026-09-06T10:30", endTime: "2026-09-06T11:50" },
  "scr-004": { title: "밤의 상영회", venue: "야외마당", startTime: "2026-09-06T19:30", endTime: "2026-09-06T21:10" },
  "scr-005": { title: "청년 단편 모음", venue: "머내마을극장 2관", startTime: "2026-09-07T13:00", endTime: "2026-09-07T14:30" },
  "scr-006": { title: "폐막: 다시 만나는 마을", venue: "머내마을극장 1관", startTime: "2026-09-07T17:00", endTime: "2026-09-07T18:45" }
};

const seedReservations = [
  {
    id: "rsv-1001",
    reservationNumber: "동천-001",
    screeningId: OPENING_FILM_ID,
    name: "홍길동",
    phone: "010-1234-5678",
    email: "hong@example.com",
    seats: 2,
    status: "확정",
    attended: true,
    attendedSeats: 2,
    attendedAt: "2026-09-09T19:08:00",
    ticketType: "사전신청",
    seatType: "",
    seatAssignment: "",
    donorName: "홍길동",
    smsConsent: true,
    smsStatus: "발송완료",
    smsSentAt: "2026-07-14T09:31:00",
    smsRequestId: "demo-sms-1001",
    note: "개막작 신청",
    createdAt: "2026-07-14T09:30:00"
  },
  {
    id: "rsv-1002",
    reservationNumber: "야외-001",
    screeningId: "scr-004",
    name: "김마을",
    phone: "010-2222-3333",
    email: "",
    seats: 4,
    status: "확정",
    attended: false,
    attendedSeats: 0,
    attendedAt: "",
    smsConsent: true,
    smsStatus: "발송완료",
    smsSentAt: "2026-07-14T10:11:00",
    smsRequestId: "demo-sms-1002",
    note: "가족 참석",
    createdAt: "2026-07-14T10:10:00"
  }
];

let state = loadState();
if (localStorage.getItem(STAFF_PIN_MIGRATION_KEY) !== "done") {
  state.screenings = state.screenings.map((screening) => ({ ...screening, staffPin: "0909" }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(STAFF_PIN_MIGRATION_KEY, "done");
}
let selectedScreeningId = null;
let reservationSmsSelectMode = false;
let selectedReservationSmsIds = new Set();
let selectedReservationActionId = null;

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeScreening(screening) {
  const isOpening = screening?.isOpening === true || screening?.id === OPENING_FILM_ID || String(screening?.title || "").includes("얼굴");
  if (isOpening) {
    const merged = { ...seedOpeningScreening, ...screening, isOpening: true };

    // v6 migration: 기존 시제품의 개막작 임시 일정/장소가 저장되어 있으면 실제 개막식 정보로 자동 보정합니다.
    if (!screening?.title || screening.title === "개막작: 얼굴") merged.title = seedOpeningScreening.title;
    if (!screening?.venue || screening.venue === "개막식 상영관") merged.venue = seedOpeningScreening.venue;
    if (!screening?.startTime || screening.startTime === "2026-09-05T19:00") merged.startTime = seedOpeningScreening.startTime;
    if (!screening?.endTime || screening.endTime === "2026-09-05T21:10") merged.endTime = seedOpeningScreening.endTime;
    if (!screening?.earlyBirdStart || screening.earlyBirdStart === "2026-07-13T09:00") merged.earlyBirdStart = seedOpeningScreening.earlyBirdStart;
    if (!screening?.earlyBirdEnd || screening.earlyBirdEnd === "2026-08-20T23:59") merged.earlyBirdEnd = seedOpeningScreening.earlyBirdEnd;
    if (!screening?.generalOpenAt || screening.generalOpenAt === "2026-08-21T10:00") merged.generalOpenAt = seedOpeningScreening.generalOpenAt;
    if (!screening?.generalEndAt) merged.generalEndAt = seedOpeningScreening.generalEndAt;
    if (!screening?.notes || screening.notes === "박정민 배우 참석 예정. 개막식은 현장 안내에 따라 운영합니다.") merged.notes = seedOpeningScreening.notes;

    merged.id = merged.id || OPENING_FILM_ID;
    merged.guest = merged.guest || seedOpeningScreening.guest;
    merged.festivalStartDate = merged.festivalStartDate || FESTIVAL_START_DATE;
    merged.festivalEndDate = merged.festivalEndDate || FESTIVAL_END_DATE;
    merged.openingMainEndAt = merged.openingMainEndAt || OPENING_MAIN_END_AT;
    merged.posterSrc = merged.posterSrc || OPENING_POSTER_SRC;
    merged.videoUrl = merged.videoUrl || OPENING_VIDEO_URL;
    merged.videoEmbedUrl = youtubeEmbedUrl(merged.videoUrl || merged.videoEmbedUrl || OPENING_VIDEO_URL) || OPENING_VIDEO_EMBED;
    if (!screening?.videoTitle || screening.videoTitle === "영화 얼굴 소개영상") merged.videoTitle = OPENING_VIDEO_TITLE;
    merged.designatedSeatCount = Math.max(0, Number(merged.designatedSeatCount || seedOpeningScreening.designatedSeatCount));
    merged.maxTicketsPerReservation = Math.max(1, Number(merged.maxTicketsPerReservation || seedOpeningScreening.maxTicketsPerReservation));
    merged.seatPrefix = String(merged.seatPrefix || seedOpeningScreening.seatPrefix || "A").trim() || "A";
    merged.staffPin = String(merged.staffPin || seedOpeningScreening.staffPin || "").trim();
    return merged;
  }
  const legacy = LEGACY_DEMO_SCREENING_MIGRATION[screening?.id];
  const seed = seedScreenings.find((item) => item.id === screening?.id && item.isOpening !== true);
  if (legacy && seed) {
    const migrated = { ...screening, isOpening: false };
    if (!screening.title || screening.title === legacy.title) migrated.title = seed.title;
    if (!screening.venue || screening.venue === legacy.venue) migrated.venue = seed.venue;
    if (!screening.startTime || screening.startTime === legacy.startTime) migrated.startTime = seed.startTime;
    if (!screening.endTime || screening.endTime === legacy.endTime) migrated.endTime = seed.endTime;
    if (!screening.notes || screening.notes === legacy.notes) migrated.notes = seed.notes;
    migrated.staffPin = String(migrated.staffPin || seed?.staffPin || "").trim();
    return migrated;
  }
  return { ...screening, staffPin: String(screening?.staffPin || seed?.staffPin || "").trim(), isOpening: false };
}

function cleanReservationNote(note = "") {
  return String(note || "")
    .replace(/개막작\s*얼리버드\s*후원자\s*사전예약/gi, "")
    .replace(/개막작\s*얼리버드/gi, "")
    .replace(/얼리버드\s*후원자\s*사전예약/gi, "")
    .replace(/후원자\s*사전예약/gi, "")
    .replace(/얼리버드/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeReservation(reservation = {}) {
  const { donationTier, donationAmount, donationCustomAmount, ...base } = reservation;
  const seats = Math.max(1, Number(base.seats || 1));
  const attended = base.attended === true;
  const attendedSeats = attended ? Math.max(1, Number(base.attendedSeats || seats)) : 0;
  const legacyTicketType = ["얼", "리", "버", "드"].join("");
  const rawTicketType = base.ticketType || "일반";
  const ticketType = rawTicketType === legacyTicketType ? "사전신청" : rawTicketType;
  const seatType = "";
  return {
    ...base,
    reservationNumber: base.reservationNumber || "",
    seats,
    status: base.status || "확정",
    attended,
    attendedSeats,
    attendedAt: attended ? (base.attendedAt || base.updatedAt || base.createdAt || new Date().toISOString()) : "",
    ticketType,
    seatType,
    seatAssignment: "",
    donorName: base.donorName || "",
    smsConsent: base.smsConsent !== false,
    smsStatus: base.smsStatus || "미발송",
    smsSentAt: base.smsSentAt || "",
    smsError: base.smsError || "",
    smsRequestId: base.smsRequestId || "",
    note: cleanReservationNote(base.note)
  };
}

function normalizeState(data) {
  let screenings = Array.isArray(data.screenings) ? data.screenings.map(normalizeScreening) : cloneData(seedScreenings).map(normalizeScreening);
  if (!screenings.some((screening) => screening.isOpening === true)) {
    screenings = [normalizeScreening(seedOpeningScreening), ...screenings];
  }
  return applyVenueReservationNumbering({
    screenings,
    reservations: Array.isArray(data.reservations) ? data.reservations.map(normalizeReservation) : [],
    donations: Array.isArray(data.donations) ? data.donations : [],
    sponsorClicks: Number(data.sponsorClicks || 0),
    adminPin: String(data.adminPin || ADMIN_PIN),
    masterStaffPin: String(data.masterStaffPin || "0909"),
    masterStaffPresent: Boolean(data.masterStaffPresent),
    lastUpdated: data.lastUpdated || new Date().toISOString()
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.screenings) && Array.isArray(saved.reservations)) {
      const normalized = normalizeState(saved);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    }
  } catch (error) {
    console.warn("저장된 데이터를 읽을 수 없습니다.", error);
  }
  const fresh = normalizeState({
    screenings: cloneData(seedScreenings),
    reservations: cloneData(seedReservations),
    donations: [],
    sponsorClicks: 0,
    lastUpdated: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

function persist(options = {}) {
  applyVenueReservationNumbering(state);
  state.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (options.autoSync !== false) queueGoogleDriveAutoSync("data-change");
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDateTime(value) {
  if (!value) return "미정";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}


function formatSmsDateTime(value) {
  if (!value) return "미정";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours < 12 ? "오전" : "오후";
  const hour12 = String(hours % 12 || 12).padStart(2, "0");
  return `${month}월 ${day}일 (${weekday}) ${ampm} ${hour12}:${minutes}`;
}

function cleanMovieTitle(title) {
  return String(title || "상영작")
    .replace(/^개막식\s*영화\s*[:：]\s*/i, "")
    .replace(/^개막작\s*[:：]\s*/i, "")
    .trim() || "상영작";
}

function normalizePhoneForSms(phone) {
  const digits = String(phone || "").replace(/[^0-9]/g, "");
  if (digits.startsWith("82")) return `0${digits.slice(2)}`;
  return digits;
}

function formatDateOnly(value) {
  if (!value) return "미정";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", { month: "2-digit", day: "2-digit", weekday: "short" }).format(date);
}

function toLocalInputValue(value) {
  if (!value) return "";
  return value.slice(0, 16);
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function getReservations(screeningId, options = {}) {
  return state.reservations.filter((reservation) => {
    const sameScreening = !screeningId || reservation.screeningId === screeningId;
    const includeCanceled = options.includeCanceled === true;
    return sameScreening && (includeCanceled || reservation.status !== "취소");
  });
}

function confirmedSeats(screeningId) {
  return getReservations(screeningId).filter((r) => r.status === "확정").reduce((sum, r) => sum + Number(r.seats || 0), 0);
}

function waitlistSeats(screeningId) {
  return getReservations(screeningId).filter((r) => r.status === "대기").reduce((sum, r) => sum + Number(r.seats || 0), 0);
}

function canceledSeats(screeningId) {
  return getReservations(screeningId, { includeCanceled: true }).filter((r) => r.status === "취소" || r.attended === false).reduce((sum, r) => sum + Number(r.seats || 0), 0);
}

function canceledApplicationCount(screeningId = "") {
  return getReservations(screeningId, { includeCanceled: true }).filter((r) => r.status === "취소" || r.attended === false).length;
}

function appliedSeats(screeningId) {
  return getReservations(screeningId).reduce((sum, r) => sum + Number(r.seats || 0), 0);
}

function applicationCount(screeningId, status = "") {
  return getReservations(screeningId).filter((reservation) => !status || reservation.status === status).length;
}

function attendedApplicationCount(screeningId = "") {
  return getReservations(screeningId).filter((reservation) => reservation.attended === true).length;
}

function actualAttendees(screeningId) {
  return getReservations(screeningId).filter((r) => r.attended === true).reduce((sum, r) => sum + Number(r.attendedSeats || r.seats || 0), 0);
}

function attendanceRate(screeningId) {
  const applied = appliedSeats(screeningId);
  if (!applied) return 0;
  return Math.round((actualAttendees(screeningId) / applied) * 100);
}

function remainingSeats(screening) {
  return Number(screening.capacity || 0) - confirmedSeats(screening.id);
}

function occupancyRate(screening) {
  const capacity = Number(screening.capacity || 0);
  if (!capacity) return 0;
  return Math.round((appliedSeats(screening.id) / capacity) * 100);
}

function statusInfo(screening) {
  const capacity = Number(screening.capacity || 0);
  const confirmed = confirmedSeats(screening.id);
  const waitlist = waitlistSeats(screening.id);
  const remaining = capacity - confirmed;
  if (!capacity) return { text: "정원 미입력", className: "warn" };
  if (confirmed > capacity) return { text: `초과 ${confirmed - capacity}명`, className: "danger" };
  if (waitlist > 0) return { text: `대기 ${waitlist}명`, className: "danger" };
  if (remaining <= 0) return { text: "정원도달", className: "danger" };
  if (remaining <= Math.ceil(capacity * 0.15)) return { text: `마감임박 ${remaining}명`, className: "warn" };
  return { text: `여유 ${remaining}명`, className: "ok" };
}

function reservationStatusClass(reservation) {
  if (reservation.status === "확정") return "ok";
  if (reservation.status === "대기") return "warn";
  return "danger";
}

function sortedScreenings() {
  return [...state.screenings].sort((a, b) => String(a.startTime).localeCompare(String(b.startTime)) || a.title.localeCompare(b.title));
}

function uniqueValues(key) {
  return [...new Set(state.screenings.map((item) => item[key]).filter(Boolean))].sort();
}

function isOpeningScreening(screening) {
  return screening?.isOpening === true || screening?.id === OPENING_FILM_ID || String(screening?.title || "").includes("얼굴");
}

function getOpeningScreening() {
  let opening = state.screenings.find((screening) => screening.isOpening === true) || state.screenings.find((screening) => screening.id === OPENING_FILM_ID);
  if (!opening) {
    opening = normalizeScreening(seedOpeningScreening);
    state.screenings.unshift(opening);
    persist();
  }
  return opening;
}

function toDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function youtubeIdFromUrl(url) {
  const raw = String(url || "").trim();
  if (!raw) return "";
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{6,})/,
    /[?&]v=([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/,
    /youtube-nocookie\.com\/embed\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/
  ];
  for (const pattern of patterns) {
    const match = raw.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

function runtimeHttpOrigin() {
  try {
    const origin = window.location.origin;
    const protocol = window.location.protocol;
    return origin && origin !== "null" && (protocol === "http:" || protocol === "https:") ? origin : "";
  } catch (error) {
    return "";
  }
}

function runtimeHttpHref() {
  try {
    const href = window.location.href;
    const protocol = window.location.protocol;
    return href && (protocol === "http:" || protocol === "https:") ? href : "";
  } catch (error) {
    return "";
  }
}

function youtubeEmbedParams(id) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    playsinline: "1",
    controls: "1",
    rel: "0",
    modestbranding: "1"
  });
  // YouTube 오류 153 방지를 위해 실제 배포 주소가 있으면 origin/widget_referrer를 붙이고,
  // 로컬 파일로 미리 볼 때도 식별값이 완전히 비지 않도록 임시 origin을 넣습니다.
  const origin = runtimeHttpOrigin() || "https://munae-filmfest.local";
  params.set("origin", origin);
  params.set("enablejsapi", "1");
  const href = runtimeHttpHref() || `${origin}/`;
  params.set("widget_referrer", href);
  return params;
}

function youtubeEmbedUrl(url, host = "www.youtube.com") {
  const raw = String(url || "").trim();
  if (!raw) return "";
  const id = youtubeIdFromUrl(raw);
  if (!id) return raw;
  return `https://${host}/embed/${id}?${youtubeEmbedParams(id).toString()}`;
}

function youtubeEmbedAutoplayUrl(url) {
  return youtubeEmbedUrl(url, "www.youtube.com");
}

function youtubeNoCookieEmbedUrl(url) {
  return youtubeEmbedUrl(url, "www.youtube-nocookie.com");
}

function youtubeThumbnailUrl(url) {
  const id = youtubeIdFromUrl(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}

function openingHeadlineMarkup() {
  return `
    <span class="headline-line">박정민 배우,</span>
    <span class="headline-line headline-accent">머내마을영화제</span>
    <span class="headline-line">개막식에 오다</span>
  `;
}

function renderVideoPlayer(screening, label = "개막식 소개영상") {
  const videoUrl = openingVideoUrl(screening);
  const primaryEmbed = youtubeEmbedAutoplayUrl(videoUrl || openingVideoEmbed(screening)) || OPENING_VIDEO_EMBED;
  const noCookieEmbed = youtubeNoCookieEmbedUrl(videoUrl || openingVideoEmbed(screening)) || primaryEmbed;
  return `
    <div class="video-frame video-frame-autoplay" data-video-wrapper data-primary-src="${esc(primaryEmbed)}" data-alt-src="${esc(noCookieEmbed)}">
      <iframe
        width="1496"
        height="672"
        src="${esc(primaryEmbed)}"
        title="[얼굴] 메인 예고편"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        loading="eager"></iframe>
    </div>
    <p class="video-fallback">영상은 메인 페이지 안에서 음소거 상태로 자동 반복재생됩니다. 화면에서 보이지 않으면 <a href="${esc(videoUrl)}" target="_blank" rel="noopener">유튜브에서 보기</a>로 확인할 수 있습니다.</p>
  `;
}

function renderOpeningPosterVideo(screening, poster) {
  const videoUrl = openingVideoUrl(screening);
  const primaryEmbed = youtubeEmbedAutoplayUrl(videoUrl || openingVideoEmbed(screening)) || OPENING_VIDEO_EMBED;
  const noCookieEmbed = youtubeNoCookieEmbedUrl(videoUrl || openingVideoEmbed(screening)) || primaryEmbed;
  return `
    <figure class="opening-poster-video" aria-label="개막식 영화 얼굴 포스터 안 소개영상">
      <img class="opening-poster-video-bg" src="${esc(poster)}" alt="개막식 영화 얼굴 포스터" loading="eager" />
      <div class="opening-poster-video-shade" aria-hidden="true"></div>
      <div class="opening-poster-video-player" data-video-wrapper data-primary-src="${esc(primaryEmbed)}" data-alt-src="${esc(noCookieEmbed)}">
        <iframe
          width="1496"
          height="672"
          src="${esc(primaryEmbed)}"
          title="[얼굴] 메인 예고편"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          loading="eager"></iframe>
      </div>
      <figcaption>개막식 영화 &lt;얼굴&gt; · 박정민 배우 참석</figcaption>
    </figure>
  `;
}

function openingPosterSrc(screening = getOpeningScreening()) {
  return screening?.posterSrc || OPENING_POSTER_SRC;
}

function openingVideoEmbed(screening = getOpeningScreening()) {
  return youtubeEmbedUrl(screening?.videoUrl || screening?.videoEmbedUrl || OPENING_VIDEO_URL) || OPENING_VIDEO_EMBED;
}

function openingVideoUrl(screening = getOpeningScreening()) {
  const raw = screening?.videoUrl || OPENING_VIDEO_URL;
  const id = youtubeIdFromUrl(raw);
  return id ? `https://youtu.be/${id}` : raw;
}

function festivalPeriodLabel(screening = getOpeningScreening()) {
  const start = screening?.festivalStartDate || FESTIVAL_START_DATE;
  const end = screening?.festivalEndDate || FESTIVAL_END_DATE;
  if (start === FESTIVAL_START_DATE && end === FESTIVAL_END_DATE) return FESTIVAL_PERIOD_LABEL;
  const pretty = (value) => {
    const date = toDate(value);
    if (!date) return value || "미정";
    return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(date);
  };
  return `${pretty(start)} ~ ${pretty(end)}`;
}

function shouldShowOpeningMainHero(screening = getOpeningScreening()) {
  const end = toDate(screening?.openingMainEndAt || OPENING_MAIN_END_AT);
  if (!end) return true;
  return new Date() <= end;
}

function formatCurrency(value) {
  const amount = Number(value || 0);
  if (!amount) return "";
  return new Intl.NumberFormat("ko-KR").format(amount) + "원";
}

function openingPhaseInfo(screening = getOpeningScreening()) {
  if (!screening) return { phase: "none", label: "개막작 미등록", className: "danger", allowBooking: false, ticketType: "" };
  if (screening.status === "마감") return { phase: "closed", label: "신청 마감", className: "danger", allowBooking: false, ticketType: "", message: "개막작 신청이 마감되었습니다." };
  const now = new Date();
  const earlyStart = toDate(screening.earlyBirdStart);
  const earlyEnd = toDate(screening.earlyBirdEnd);
  const generalOpen = toDate(screening.generalOpenAt || screening.earlyBirdEnd);
  const generalEnd = toDate(screening.generalEndAt || screening.startTime);
  if (screening.status === "준비중" || (earlyStart && now < earlyStart)) {
    return { phase: "before", label: "개막작 신청 준비중", className: "warn", allowBooking: false, ticketType: "", message: `${formatDateTime(screening.earlyBirdStart)}부터 ${EARLYBIRD_MESSAGE}이 열립니다.` };
  }
  if (!earlyEnd || now <= earlyEnd) {
    return { phase: "earlybird", label: "개막작 신청 진행중", className: "ok", allowBooking: true, ticketType: "사전신청", seatType: "", message: `${EARLYBIRD_MESSAGE}입니다.` };
  }
  if (generalOpen && now < generalOpen) {
    return { phase: "between", label: "일반 신청 전", className: "warn", allowBooking: false, ticketType: "", message: `${formatDateTime(screening.generalOpenAt)}부터 일반 신청이 열립니다.` };
  }
  if (generalEnd && now > generalEnd) {
    return { phase: "closed", label: "신청 마감", className: "danger", allowBooking: false, ticketType: "", message: `${formatDateTime(screening.generalEndAt || screening.startTime)}에 개막작 신청이 마감되었습니다.` };
  }
  return { phase: "general", label: "일반 신청", className: "blue", allowBooking: true, ticketType: "일반", seatType: "", message: "개막작 신청 기간이 끝나 일반 신청이 가능합니다." };
}

function openingReservations(screeningId = getOpeningScreening()?.id, type = "") {
  return getReservations(screeningId).filter((reservation) => !type || reservation.ticketType === type);
}

function openingDesignatedCapacity(screening = getOpeningScreening()) {
  return Math.max(0, Math.min(Number(screening?.designatedSeatCount || 0), Number(screening?.capacity || 0)));
}

function usedDesignatedSeats(screeningId = getOpeningScreening()?.id) {
  const used = new Set();
  openingReservations(screeningId, "사전신청")
    .filter((reservation) => reservation.status === "확정")
    .forEach((reservation) => {
      String(reservation.seatAssignment || "")
        .split(",")
        .map((seat) => seat.trim())
        .filter(Boolean)
        .forEach((seat) => used.add(seat));
    });
  return used;
}

function availableDesignatedSeats(screening = getOpeningScreening()) {
  const used = usedDesignatedSeats(screening.id);
  const prefix = String(screening.seatPrefix || "A").trim() || "A";
  const capacity = openingDesignatedCapacity(screening);
  const seats = [];
  for (let index = 1; index <= capacity; index += 1) {
    const seat = `${prefix}-${String(index).padStart(3, "0")}`;
    if (!used.has(seat)) seats.push(seat);
  }
  return seats;
}

function assignDesignatedSeats(screening, count) {
  const seats = availableDesignatedSeats(screening);
  if (seats.length < count) return [];
  return seats.slice(0, count);
}

function openingStats(screening = getOpeningScreening()) {
  const reservations = getReservations(screening.id);
  const earlybird = reservations.filter((r) => r.ticketType === "사전신청");
  const general = reservations.filter((r) => r.ticketType !== "사전신청");
  const earlybirdConfirmed = earlybird.filter((r) => r.status === "확정");
  const generalConfirmed = general.filter((r) => r.status === "확정");
  const earlybirdSeats = earlybirdConfirmed.reduce((sum, r) => sum + Number(r.seats || 0), 0);
  const generalSeats = generalConfirmed.reduce((sum, r) => sum + Number(r.seats || 0), 0);
  const designatedCapacity = openingDesignatedCapacity(screening);
  const assignedSeatCount = usedDesignatedSeats(screening.id).size;
  return {
    reservations,
    earlybird,
    general,
    earlybirdSeats,
    generalSeats,
    designatedCapacity,
    assignedSeatCount,
    designatedRemaining: Math.max(designatedCapacity - assignedSeatCount, 0),
    freeSeatCapacity: Math.max(Number(screening.capacity || 0) - designatedCapacity, 0),
    remainingTotal: Math.max(Number(screening.capacity || 0) - confirmedSeats(screening.id), 0)
  };
}

function venueReservationPrefix(venue) {
  const cleaned = String(venue || "상영관").trim().replace(/^[^0-9A-Za-z가-힣]+/, "");
  const chars = Array.from(cleaned).filter((char) => /[0-9A-Za-z가-힣]/.test(char));
  return chars.slice(0, 2).join("") || "상영";
}

function applyVenueReservationNumbering(targetState) {
  if (!targetState || !Array.isArray(targetState.screenings) || !Array.isArray(targetState.reservations)) return targetState;
  const screeningById = new Map(targetState.screenings.map((screening) => [screening.id, screening]));
  const counters = new Map();
  const sorted = [...targetState.reservations].sort((a, b) => {
    const venueA = String(screeningById.get(a.screeningId)?.venue || "상영관");
    const venueB = String(screeningById.get(b.screeningId)?.venue || "상영관");
    return venueA.localeCompare(venueB, "ko") || String(a.createdAt || "").localeCompare(String(b.createdAt || "")) || String(a.id || "").localeCompare(String(b.id || ""));
  });
  sorted.forEach((reservation) => {
    const screening = screeningById.get(reservation.screeningId);
    const venueKey = String(screening?.venue || "상영관").trim();
    const next = (counters.get(venueKey) || 0) + 1;
    counters.set(venueKey, next);
    reservation.reservationNumber = `${venueReservationPrefix(venueKey)}-${String(next).padStart(3, "0")}`;
    if (screening && isOpeningScreening(screening)) {
      reservation.seatType = "";
      reservation.seatAssignment = "";
    }
  });
  return targetState;
}

function nextVenueReservationNumber(screening) {
  const prefix = venueReservationPrefix(screening?.venue);
  const used = state.reservations
    .filter((reservation) => {
      const itemScreening = state.screenings.find((item) => item.id === reservation.screeningId);
      return itemScreening?.venue === screening?.venue;
    })
    .map((reservation) => Number(String(reservation.reservationNumber || "").match(/-(\d+)$/)?.[1] || 0));
  const next = Math.max(0, ...used) + 1;
  return `${prefix}-${String(next).padStart(3, "0")}`;
}

function reservationDisplayNumber(reservation, screening = null) {
  if (reservation?.reservationNumber) return reservation.reservationNumber;
  const targetScreening = screening || state.screenings.find((item) => item.id === reservation?.screeningId);
  return `${venueReservationPrefix(targetScreening?.venue)}-${String(Math.max(1, state.reservations.filter((item) => item.screeningId === reservation?.screeningId && String(item.createdAt || "") <= String(reservation?.createdAt || "")).length)).padStart(3, "0")}`;
}

function reservationTicketLabel(reservation, screening) {
  if (!isOpeningScreening(screening)) return "일반 신청";
  return reservation.ticketType === "사전신청" ? "개막작 신청" : "일반 신청";
}

function reservationSeatLabel() {
  return "";
}

function getTotals() {
  const activeReservations = state.reservations.filter((r) => r.status !== "취소");
  const confirmed = activeReservations;
  const waitlist = state.reservations.filter((r) => r.status === "취소" || r.attended === false);
  const attended = activeReservations.filter((r) => r.attended === true);
  const totalCapacity = state.screenings.reduce((sum, s) => sum + Number(s.capacity || 0), 0);
  const totalConfirmedSeats = confirmed.reduce((sum, r) => sum + Number(r.seats || 0), 0);
  const totalAppliedSeats = activeReservations.reduce((sum, r) => sum + Number(r.seats || 0), 0);
  const totalWaitlistSeats = waitlist.reduce((sum, r) => sum + Number(r.seats || 0), 0);
  const totalActualAttendees = attended.reduce((sum, r) => sum + Number(r.attendedSeats || r.seats || 0), 0);
  const totalApplicationCount = activeReservations.length;
  const totalConfirmedApplicationCount = confirmed.length;
  const totalAttendedApplicationCount = attended.length;
  const fullCount = state.screenings.filter((s) => confirmedSeats(s.id) >= Number(s.capacity || 0) && Number(s.capacity || 0) > 0).length;
  const overOrWaitlistCount = state.screenings.filter((s) => confirmedSeats(s.id) > Number(s.capacity || 0) || waitlistSeats(s.id) > 0).length;
  return {
    activeReservations,
    confirmed,
    waitlist,
    attended,
    totalCapacity,
    totalConfirmedSeats,
    totalAppliedSeats,
    totalWaitlistSeats,
    totalActualAttendees,
    totalApplicationCount,
    totalConfirmedApplicationCount,
    totalAttendedApplicationCount,
    fullCount,
    overOrWaitlistCount,
    occupancy: totalCapacity ? Math.round((totalAppliedSeats / totalCapacity) * 100) : 0,
    attendance: totalAppliedSeats ? Math.round((totalActualAttendees / totalAppliedSeats) * 100) : 0
  };
}

function appHeader() {
  return `
    <header class="header">
      <a class="logo" href="#/">
        <div class="logo-mark"><img src="assets/munae-horse-logo.png" alt="머내마을영화제 말 캐릭터 로고"></div>
        <div>
          <div class="logo-title">제9회 머내마을영화제</div>
          <div class="logo-sub">마을이 함께 만드는 주민주도영화제</div>
        </div>
      </a>
      <nav class="nav" aria-label="주요 메뉴">
        <a href="https://www.meonaeff.com/" target="_blank" rel="noopener noreferrer" class="festival-home-link">머내마을영화제 홈페이지</a>
        <a href="#/apply">영화 신청</a>
        <a href="#/donate">후원하기</a>
        <a href="#/staff" class="staff-link utility-link">STAFF</a>
        <a href="#/admin" class="primary-link admin-link utility-link">ADMIN</a>
      </nav>
    </header>
  `;
}

function render() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [route = "", sub = ""] = hash.split("/");
  const app = document.getElementById("app");
  let view = "";
  if (!route) view = renderHome();
  else if (route === "opening") view = renderOpeningTicketing();
  else if (route === "apply") view = renderApply();
  else if (route === "donate" && sub === "transfer") view = renderDonationTransferPage();
  else if (route === "donate") view = renderDonationPage();
  else if (route === "staff") view = renderStaff(sub || "");
  else if (route === "admin") view = renderAdmin(sub || "overview");
  else view = renderNotFound();
  app.innerHTML = `<main class="app-shell">${appHeader()}${view}</main>${bookingModalShell()}`;
  hydrateRoute(route, sub);
}

function renderHome() {
  const opening = getOpeningScreening();
  if (shouldShowOpeningMainHero(opening)) return renderOpeningHome(opening);
  return renderGeneralHome();
}

function renderGeneralHome() {
  const popular = sortedScreenings().filter((screening) => !isOpeningScreening(screening));
  return `
    <section class="hero">
      <div class="hero-grid">
        <div>
          <div class="eyebrow">순수 주민주도영화제 · ${esc(festivalPeriodLabel())}</div>
          <h1>마을 주민이 직접 만드는 영화제에 함께해주세요.</h1>
          <p>${esc(DONATION_MESSAGE)}</p>
          <div class="cta-row">
            <a class="btn btn-light" href="#/apply">영화 신청하기</a>
            <a class="btn btn-primary" href="#/donate">후원하기</a>
          </div>
        </div>
        <aside class="hero-card donation-card" aria-label="후원 안내">
          <div class="icon-badge">💛</div>
          <h2>이 귀한 일에 작은 후원의 손길을 보태주세요.</h2>
          <p>후원금은 상영 준비, 공간 운영, 장비, 홍보물, 주민 창작자와 스태프의 활동을 이어가는 데 소중히 사용됩니다.</p>
          <a class="btn btn-light" href="#/donate">후원하기</a>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="section-title">
        <div>
          <h2>영화관람신청하기</h2>
          <p>보고 싶은 영화를 선택하고 참석 인원과 연락처를 남겨주세요.</p>
        </div>
        <a class="chip-link" href="#/apply">전체 보기</a>
      </div>
      <div class="screening-grid">
        ${popular.map(screeningCard).join("")}
      </div>
    </section>
  `;
}


function festivalDdayLabel(opening = getOpeningScreening()) {
  const target = toDate(opening?.festivalStartDate || FESTIVAL_START_DATE);
  if (!target) return "D-DAY";
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const targetStart = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diff = Math.ceil((targetStart - todayStart) / 86400000);
  if (diff > 0) return `D-${diff}`;
  if (diff < 0) return `D+${Math.abs(diff)}`;
  return "D-DAY";
}

function festivalProgressRows() {
  return sortedScreenings().map((screening) => {
    const applicants = appliedSeats(screening.id);
    const capacity = Number(screening.capacity || 0);
    const label = `${screening.title}${screening.venue ? ` · ${screening.venue}` : ""}`;
    return { screening, label, applicants, capacity };
  });
}

function renderFestivalProgressWidget() {
  const opening = getOpeningScreening();
  const screenings = sortedScreenings();
  const rows = festivalProgressRows();
  const totalApplicants = rows.reduce((sum, row) => sum + row.applicants, 0);
  const totalApplications = getReservations("", { includeCanceled: false }).length;
  const totalCapacity = screenings.reduce((sum, screening) => sum + Number(screening.capacity || 0), 0);
  const maxApplicants = Math.max(1, ...rows.map((row) => row.applicants));
  const visibleRows = rows.slice().sort((a, b) => b.applicants - a.applicants || a.label.localeCompare(b.label)).slice(0, 8);
  const overallRate = totalCapacity ? Math.min(100, Math.round((totalApplicants / totalCapacity) * 100)) : 0;
  const chartMarkup = visibleRows.map((row) => {
    const width = Math.max(4, Math.round((row.applicants / maxApplicants) * 100));
    const rate = row.capacity ? Math.round((row.applicants / row.capacity) * 100) : 0;
    return `
      <div class="festival-progress-row">
        <div class="festival-progress-name">${esc(row.label)}</div>
        <div class="festival-progress-track"><span style="width:${width}%"></span></div>
        <div class="festival-progress-count"><strong>${row.applicants}</strong><small>${row.capacity ? `/${row.capacity}명 · ${rate}%` : "명"}</small></div>
      </div>
    `;
  }).join("");
  return `
    <article class="card festival-progress-card" aria-label="영화제 진행 상황">
      <div class="festival-progress-split">
        <section class="festival-progress-donation-panel" aria-label="후원 안내 요약">
          <div class="donation-panel-kicker">주민주도영화제 후원</div>
          <h3>주민이 직접 만드는 영화제를 함께 지켜주세요.</h3>
          <p>머내마을영화제는 우리 동네 주민들이 직접 감독, 기획, 제작, 상영까지 함께 만들어가는 순수 주민주도영화제입니다.</p>
          <p>후원은 상영 준비, 공간 운영, 장비와 홍보물 제작, 주민 창작자와 스태프의 활동을 이어가는 힘이 됩니다.</p>
          <p>이 귀한 일에 작은 후원의 손길을 보태주세요.</p>
          <a class="btn btn-primary donation-panel-btn" href="#/donate">후원하기</a>
        </section>

        <section class="festival-progress-chart-panel" aria-label="영화제 진행 상황과 상영관 영화별 신청 현황">
          <div class="chart-panel-heading progress-heading-right">
            <div>
              <h2>영화제 진행 상황</h2>
              <strong>상영관 영화별 신청 현황</strong>
            </div>
            <span class="d-day-badge">${esc(festivalDdayLabel(opening))}</span>
          </div>
          <div class="festival-progress-chart" aria-label="영화별 신청자 수 그래프">
            ${chartMarkup}
          </div>
        </section>
      </div>
    </article>
  `;
}

function renderOpeningHome(opening) {
  const phase = openingPhaseInfo(opening);
  const stats = openingStats(opening);
  const poster = openingPosterSrc(opening);
  const regularPreview = sortedScreenings().filter((screening) => !isOpeningScreening(screening));
  const openingDateLine = `${formatDateTime(opening.startTime)} · ${opening.venue}`;
  return `
    <section class="opening-home-hero">
      <div class="opening-home-copy">
        <div class="badges">
          <span class="badge danger">개막식</span>
          <span class="badge blue">영화제 ${esc(festivalPeriodLabel(opening))}</span>
          <span class="badge ${phase.className}">${esc(phase.label)}</span>
        </div>
        <h1 class="opening-title-stack">${openingHeadlineMarkup()}</h1>
        <p class="opening-home-lead">개막식 영화 &lt;얼굴&gt;<br>${esc(openingDateLine)} · ${esc(opening.guest || "박정민 배우")} 참석</p>
        <p>${esc(OPENING_PROMO_COPY)}</p>
        <div class="opening-home-facts" aria-label="개막식 핵심 정보">
          <div><span>개막식</span><strong>9월 9일 저녁 7시</strong></div>
          <div><span>장소</span><strong>동천농협강당</strong></div>
          <div><span>참석</span><strong>박정민 배우</strong></div>
          <div><span>상영작</span><strong>얼굴</strong></div>
        </div>
        <div class="cta-row">
          <button class="btn btn-light" type="button" data-action="book" data-id="${esc(opening.id)}" ${phase.allowBooking ? "" : "disabled"}>${phase.allowBooking ? "개막작 신청" : phase.label}</button>
          <a class="btn btn-primary" href="#/donate">후원하기</a>
        </div>
        <p class="opening-home-note">${esc(EARLYBIRD_MESSAGE)} · 전체 잔여 ${stats.remainingTotal}석</p>
      </div>
      ${renderOpeningPosterVideo(opening, poster)}
    </section>

    <section class="section">
      <div class="section-title">
        <div>
          <h2>전체 영화관람 신청하기</h2>
          <p>개막식 이후에도 9월 13일까지 마을 곳곳에서 상영이 이어집니다.</p>
        </div>
        <a class="chip-link" href="#/apply">전체 보기</a>
      </div>
      <div class="screening-grid">
        ${regularPreview.map(screeningCard).join("")}
      </div>
    </section>

    <section class="opening-progress-section">
      ${renderFestivalProgressWidget()}
    </section>
  `;
}

function openingInlineCard() {
  const opening = getOpeningScreening();
  const phase = openingPhaseInfo(opening);
  const stats = openingStats(opening);
  return `
    <section class="opening-inline-card">
      <div>
        <div class="badges">
          <span class="badge danger">개막작</span>
          <span class="badge warn">박정민 배우 참석</span>
          <span class="badge ${phase.className}">${esc(phase.label)}</span>
        </div>
        <h2>박정민 배우, 머내마을영화제 개막식에 오다</h2>
        <p>개막식 영화 &lt;얼굴&gt; · 9월 9일 저녁 7시 동천농협강당 · 박정민 배우 참석. 개막식은 현장 안내에 따라 운영됩니다. 전체 잔여 ${stats.remainingTotal}석</p>
      </div>
      <div class="cta-row">
        <a class="btn btn-dark" href="#/opening">개막작 신청 보기</a>
        <button class="btn btn-outline" type="button" data-action="book" data-id="${esc(opening.id)}" ${phase.allowBooking ? "" : "disabled"}>${phase.allowBooking ? "바로 신청" : phase.label}</button>
      </div>
    </section>
  `;
}

function renderOpeningTicketing() {
  const opening = getOpeningScreening();
  const phase = openingPhaseInfo(opening);
  const stats = openingStats(opening);
  const confirmed = confirmedSeats(opening.id);
  const remaining = Math.max(remainingSeats(opening), 0);
  const earlybirdPeriod = `${formatDateTime(opening.earlyBirdStart)} ~ ${formatDateTime(opening.earlyBirdEnd)}`;
  const generalPeriod = `${formatDateTime(opening.generalOpenAt)} ~ ${formatDateTime(opening.generalEndAt || opening.startTime)}`;
  const poster = openingPosterSrc(opening);
  const videoUrl = openingVideoUrl(opening);
  return `
    <section class="opening-hero">
      <div class="opening-hero-main">
        <div class="badges">
          <span class="badge blue">제9회 머내마을영화제 개막작</span>
          <span class="badge ${phase.className}">${esc(phase.label)}</span>
          <span class="badge warn">${esc(opening.guest || "박정민 배우")} 참석</span>
        </div>
        <h1 class="opening-title-stack opening-title-detail">${openingHeadlineMarkup()}<span class="opening-title-sub">개막식 영화 &lt;얼굴&gt; · 개막작 신청</span></h1>
        <p><strong>${esc(formatDateTime(opening.startTime))} · ${esc(opening.venue)}</strong><br>${esc(OPENING_PROMO_COPY)}</p>
        <div class="cta-row">
          <button class="btn btn-light" type="button" data-action="book" data-id="${esc(opening.id)}" ${phase.allowBooking ? "" : "disabled"}>${phase.allowBooking ? "개막작 신청" : phase.label}</button>
        </div>
      </div>
      <aside class="opening-status-card">
        <h2>현재 티켓팅 상태</h2>
        <div class="opening-status-big ${phase.className}">${esc(phase.label)}</div>
        <p>${esc(phase.message || "개막작 티켓팅 상태를 확인하세요.")}</p>
        <div class="opening-mini-grid">
          <div><span>정원</span><strong>${Number(opening.capacity || 0)}명</strong></div>
          <div><span>확정</span><strong>${confirmed}명</strong></div>
          <div><span>남은 좌석</span><strong>${remaining}명</strong></div>
          <div><span>대기</span><strong>${waitlistSeats(opening.id)}명</strong></div>
        </div>
      </aside>
    </section>

    <section class="opening-media-grid opening-detail-media">
      <figure class="opening-poster-card card">
        <img src="${esc(poster)}" alt="개막식 영화 얼굴 포스터" loading="lazy" />
        <figcaption>개막식 영화 &lt;얼굴&gt;</figcaption>
      </figure>
      <article class="card opening-media-card opening-video-only" aria-label="개막식 소개영상">
        ${renderVideoPlayer(opening, "개막식 소개영상")}
      </article>
    </section>

    <section class="opening-flow-grid">
      <article class="card opening-flow-card active">
        <div class="icon-badge">①</div>
        <h2>개막작 신청</h2>
        <p>기간: ${esc(earlybirdPeriod)}</p>
        <p>${esc(EARLYBIRD_MESSAGE)}입니다. 신청 순서에 따라 접수됩니다.</p>
      </article>
      <article class="card opening-flow-card">
        <div class="icon-badge">②</div>
        <h2>일반 신청</h2>
        <p>기간: ${esc(generalPeriod)}</p>
        <p>모든 신청자는 현장 안내에 따라 입장합니다.</p>
      </article>
      <article class="card opening-flow-card">
        <div class="icon-badge">③</div>
        <h2>입장 운영</h2>
        <p>개막작 신청 ${stats.earlybirdSeats}명 접수</p>
        <p>일반 신청 ${stats.generalSeats}명 접수</p>
      </article>
    </section>

    <section class="card">
      <div class="section-title">
        <div>
          <h2>개막작 신청 현황</h2>
          <p>개막작 신청과 일반 신청을 구분해 보여줍니다. 실제 운영 일정과 정원은 관리자 대시보드에서 수정할 수 있습니다.</p>
        </div>
        <a class="btn btn-outline" href="#/admin/opening">관리자 설정</a>
      </div>
      <div class="opening-summary-grid">
        <div class="metric-card"><div class="metric-label">개막작 신청</div><div class="metric-value">${stats.earlybirdSeats}</div><div class="metric-note">신청 인원</div></div>
        <div class="metric-card"><div class="metric-label">일반 신청</div><div class="metric-value">${stats.generalSeats}</div><div class="metric-note">신청 인원</div></div>
        <div class="metric-card"><div class="metric-label">전체 잔여</div><div class="metric-value">${stats.remainingTotal}</div><div class="metric-note">총 ${Number(opening.capacity || 0)}명</div></div>
        <div class="metric-card"><div class="metric-label">실제 참석</div><div class="metric-value">${actualAttendees(opening.id)}</div><div class="metric-note">현장 참석 확인 기준</div></div>
      </div>
    </section>
  `;
}

function renderDonationPage() {
  return `
    <section class="donation-page-hero">
      <div class="eyebrow">주민이 함께 만드는 영화제</div>
      <h1>머내마을영화제 후원하기</h1>
      <div class="donation-story">${esc(DONATION_MESSAGE).replaceAll("\n", "<br>")}</div>
    </section>
    <section class="card donation-form-card">
      <div class="section-title compact-title">
        <div>
          <h2>1만원 후원 참여</h2>
          <p>아래 내용을 남겨주시면 후원 참여 감사 문자를 보내드립니다.</p>
        </div>
      </div>
      <form id="donationForm" class="form-grid donation-form">
        <div class="form-field">
          <label class="label" for="donorDisplayName">후원자 이름 <span class="required">*</span></label>
          <input class="input" id="donorDisplayName" name="donorName" required maxlength="30" autocomplete="name" placeholder="후원자 이름" />
        </div>
        <div class="form-field">
          <label class="label" for="depositorName">입금자 이름 <span class="required">*</span></label>
          <input class="input" id="depositorName" name="depositorName" required maxlength="30" placeholder="통장에 표시될 입금자 이름" />
        </div>
        <div class="form-field full-span">
          <label class="label" for="donorPhone">연락처 <span class="required">*</span></label>
          <input class="input" id="donorPhone" name="phone" required inputmode="tel" autocomplete="tel" placeholder="010-0000-0000" />
        </div>
        <div class="donation-agreement full-span">
          <strong>후원 안내</strong>
          <span>후원하기를 누르면 후원 정보가 저장되고 감사 문자 발송 후 계좌이체 화면으로 이동합니다. 실제 입금 확인은 운영진이 입금자 이름으로 확인합니다.</span>
        </div>
        <div class="form-actions full-span">
          <button class="btn btn-primary" type="submit">후원하겠습니다</button>
        </div>
      </form>
      <div id="donationResult" class="donation-result" hidden></div>
    </section>
  `;
}

async function submitDonation(form) {
  const data = formDataObject(form);
  const donorName = String(data.donorName || "").trim();
  const depositorName = String(data.depositorName || "").trim();
  const phone = normalizePhoneForSms(data.phone);
  if (!donorName || !depositorName) return toast("후원자 이름과 입금자 이름을 입력해주세요.");
  if (!/^01[0-9]{8,9}$/.test(phone)) return toast("연락처를 정확히 입력해주세요.");
  const transferWindow = DONATION_TRANSFER_URL ? window.open("about:blank", "_blank") : null;
  if (transferWindow) {
    transferWindow.opener = null;
    transferWindow.document.title = "계좌이체 화면을 준비하고 있습니다";
    transferWindow.document.body.innerHTML = '<p style="font-family:sans-serif;padding:24px">후원 정보를 저장하고 감사 문자를 발송한 뒤 계좌이체 화면으로 연결합니다.</p>';
  }
  const openTransferPage = () => {
    if (!DONATION_TRANSFER_URL) {
      window.location.hash = "#/donate/transfer";
      return;
    }
    if (transferWindow && !transferWindow.closed) transferWindow.location.replace(DONATION_TRANSFER_URL);
    else window.open(DONATION_TRANSFER_URL, "_blank", "noopener,noreferrer");
  };
  const donation = {
    id: uid("don"), donorName, depositorName, phone, amount: DONATION_AMOUNT,
    createdAt: new Date().toISOString(), smsStatus: "발송중", smsError: ""
  };
  state.donations = Array.isArray(state.donations) ? state.donations : [];
  state.donations.push(donation);
  state.sponsorClicks = Number(state.sponsorClicks || 0) + 1;
  persist();
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) { submitButton.disabled = true; submitButton.textContent = "감사 문자 발송 중..."; }
  try {
    const response = await fetch(SMS_API_ENDPOINT, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "donation", phone, donorName, depositorName, amount: DONATION_AMOUNT })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) throw new Error(result.error || `HTTP ${response.status}`);
    donation.smsStatus = "발송완료";
    donation.smsRequestId = result.requestId || "";
    donation.smsSentAt = new Date().toISOString();
    persist();
    sessionStorage.setItem(LAST_DONATION_SESSION_KEY, donation.id);
    toast("감사 문자를 발송했습니다. 이체 안내 화면으로 이동합니다.");
    openTransferPage();
  } catch (error) {
    donation.smsStatus = "발송실패";
    donation.smsError = String(error?.message || error).slice(0, 100);
    persist();
    sessionStorage.setItem(LAST_DONATION_SESSION_KEY, donation.id);
    toast("후원 참여는 저장되었지만 감사 문자 발송에 실패했습니다. 이체 안내 화면으로 이동합니다.");
    window.setTimeout(() => {
      openTransferPage();
    }, 700);
  }
}

function renderDonationTransferPage() {
  const donationId = sessionStorage.getItem(LAST_DONATION_SESSION_KEY);
  const donation = (state.donations || []).find((item) => item.id === donationId) || [...(state.donations || [])].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))[0];
  const donorName = donation?.donorName || "후원자";
  const depositorName = donation?.depositorName || "입금자";
  const accountReady = ![DONATION_BANK_NAME, DONATION_ACCOUNT_NUMBER, DONATION_ACCOUNT_HOLDER].some((value) => String(value).includes("입력"));
  return `
    <section class="donation-page-hero transfer-hero">
      <div class="eyebrow">후원 신청 완료</div>
      <h1>${esc(donorName)} 후원자님, 감사합니다.</h1>
      <p>감사 문자 발송을 요청했습니다. 아래 내용을 확인한 뒤 후원금 1만원을 이체해 주세요.</p>
    </section>
    <section class="card donation-transfer-card">
      <div class="transfer-summary">
        <div><span>이체 금액</span><strong>${DONATION_AMOUNT.toLocaleString("ko-KR")}원</strong></div>
        <div><span>입금자 이름</span><strong>${esc(depositorName)}</strong></div>
      </div>
      <div class="bank-account-box ${accountReady ? "" : "is-placeholder"}">
        <div><span>은행</span><strong>${esc(DONATION_BANK_NAME)}</strong></div>
        <div><span>계좌번호</span><strong>${esc(DONATION_ACCOUNT_NUMBER)}</strong></div>
        <div><span>예금주</span><strong>${esc(DONATION_ACCOUNT_HOLDER)}</strong></div>
      </div>
      ${accountReady ? `
        <div class="form-actions transfer-actions">
          <button class="btn btn-primary" type="button" data-action="copy-donation-account">계좌번호 복사</button>
          <button class="btn btn-outline" type="button" data-action="copy-donation-details" data-depositor="${esc(depositorName)}">이체정보 전체 복사</button>
        </div>` : `
        <div class="notice notice-warn">운영 계좌 정보가 아직 코드에 입력되지 않았습니다. <code>app.js</code> 상단의 후원 계좌 정보를 입력한 뒤 배포해 주세요.</div>`}
      <div class="transfer-help">
        <strong>이체하실 때</strong>
        <p>입금자 이름을 <b>${esc(depositorName)}</b>으로 입력해 주세요. 운영진이 입금자 이름으로 후원 완료를 확인합니다.</p>
      </div>
      <div class="form-actions">
        <a class="btn btn-outline" href="#/">메인으로 돌아가기</a>
      </div>
    </section>
  `;
}


function renderApply() {
  const venues = uniqueValues("venue");
  const dates = [...new Set(state.screenings.map((s) => formatDateOnly(s.startTime)))];
  return `
    <section class="section-title">
      <div>
        <h1>영화 신청하기</h1>
        <p>보고 싶은 영화와 상영관을 선택한 뒤 참석 인원과 연락처를 남겨주세요. 정원이 찬 회차는 대기 신청으로 접수됩니다.</p>
      </div>
      <a class="btn btn-outline" href="#/donate">후원하기</a>
    </section>

    ${openingInlineCard()}

    <section class="donation-strip" aria-label="후원 안내">
      <div>
        <strong>마을 이웃들의 참여와 도움으로 이 영화제는 만들어지고 있습니다.</strong>
        <p>영화를 신청하신 뒤, 주민들이 직접 감독·기획·제작·상영하는 이 귀한 일에 작은 후원의 손길도 보태주세요.</p>
      </div>
      <a class="btn btn-primary" href="#/donate">후원 함께하기</a>
    </section>

    <section class="filters" aria-label="상영작 필터">
      <input class="input" id="searchInput" type="search" placeholder="영화 제목, 상영관, 담당자 검색" />
      <select class="select" id="venueFilter">
        <option value="">전체 상영관</option>
        ${venues.map((venue) => `<option value="${esc(venue)}">${esc(venue)}</option>`).join("")}
      </select>
      <select class="select" id="dateFilter">
        <option value="">전체 날짜</option>
        ${dates.map((date) => `<option value="${esc(date)}">${esc(date)}</option>`).join("")}
      </select>
      <select class="select" id="seatFilter">
        <option value="">전체 상태</option>
        <option value="available">신청 가능</option>
        <option value="almost">마감 임박</option>
        <option value="full">정원 도달·대기</option>
      </select>
    </section>

    <section id="screeningList" class="screening-grid" aria-live="polite"></section>
  `;
}

function screeningCard(screening) {
  const info = statusInfo(screening);
  const isOpening = isOpeningScreening(screening);
  const phase = isOpening ? openingPhaseInfo(screening) : null;
  return `
    <article class="screening-card compact-screening-card ${isOpening ? "opening-card" : ""}" data-screening-card="${esc(screening.id)}">
      <div class="screening-top">
        <div class="badges compact-badges">
          ${isOpening ? `<span class="badge warn">개막작</span><span class="badge ${phase.className}">${esc(phase.label)}</span>` : `<span class="badge blue">${esc(screening.status || "신청 가능")}</span>`}
          <span class="badge ${info.className}">${esc(info.text)}</span>
        </div>
        <h3 class="screening-title">${esc(screening.title)}</h3>
        <p class="screening-meta">${esc(formatDateTime(screening.startTime))}<br>${esc(screening.venue)}</p>
      </div>
      <div class="screening-body compact-screening-body">
        <div class="screening-card-actions compact-actions">
          <button class="btn btn-dark compact-book-btn" type="button" data-action="book" data-id="${esc(screening.id)}" ${isOpening && !phase.allowBooking ? "disabled" : ""}>${isOpening ? (phase.allowBooking ? "관람신청" : phase.label) : "관람신청"}</button>
          <a class="btn btn-outline compact-staff-btn" href="#/staff/${esc(screening.id)}">담당스태프</a>
        </div>
      </div>
    </article>
  `;
}


function getStaffSession() {
  try {
    return JSON.parse(sessionStorage.getItem(STAFF_SESSION_KEY) || "null");
  } catch (_) {
    return null;
  }
}

function readStaffSession() {
  return getStaffSession();
}

function staffScreenings() {
  const session = getStaffSession();
  if (!session) return [];
  if (session.isMaster === true) return sortedScreenings();
  return sortedScreenings()
    .filter((screening) => session.screeningIds.includes(screening.id))
    .sort((a, b) => String(a.venue || "").localeCompare(String(b.venue || ""), "ko") || String(a.startTime || "").localeCompare(String(b.startTime || "")));
}

function canStaffManageScreening(screeningId) {
  if (isAdminAuthed()) return true;
  return staffScreenings().some((screening) => screening.id === screeningId);
}

function canManageReservation(reservation) {
  return Boolean(reservation && canStaffManageScreening(reservation.screeningId));
}

function reservationAttendanceIndex(reservation) {
  if (reservation?.attended === true) return `<span class="badge status-index ok">참석</span>`;
  return `<span class="badge status-index danger">취소</span>`;
}

function renderStaff(preselectedId = "") {
  const session = getStaffSession();
  if (!session) return renderStaffLogin(preselectedId);
  const screenings = staffScreenings();
  if (!screenings.length) {
    sessionStorage.removeItem(STAFF_SESSION_KEY);
    return renderStaffLogin(preselectedId);
  }
  const reservations = state.reservations
    .filter((reservation) => session.isMaster === true || session.screeningIds.includes(reservation.screeningId))
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ko"));
  const totalSeats = reservations.filter((r) => r.status !== "취소").reduce((sum, r) => sum + Number(r.seats || 0), 0);
  const attendedSeats = reservations.filter((r) => r.attended).reduce((sum, r) => sum + Number(r.attendedSeats || 0), 0);
  const canceledSeats = reservations.filter((r) => r.status === "취소").reduce((sum, r) => sum + Number(r.seats || 0), 0);
  const venueStats = groupByVenue();
  return `
    <section class="section-title staff-portal-title">
      <div>
        <div class="eyebrow">상영관 담당자 전용</div>
        <h1>${session.isMaster === true ? "전체영화 신청자 관리" : `${esc(session.venue || screenings[0].venue)} 신청자 관리`}</h1>
        <p>${session.isMaster === true ? "마스타스탭이 모든 영화 신청자를 추가·수정·삭제하고 참석 현황을 관리합니다." : `${esc(session.staffName)} 담당자가 자신의 상영관 신청자를 추가·수정·삭제하고 참석 현황을 관리합니다.`}</p>
      </div>
      <div class="cta-row">
        <button class="btn btn-primary" type="button" data-action="staff-add-reservation">신청자 추가</button>
        <button class="btn btn-outline" type="button" data-action="print">명단 인쇄</button>
        <button class="btn btn-danger" type="button" data-action="staff-logout">로그아웃</button>
      </div>
    </section>
    <section class="card staff-password-card screen-only">
      <div><h2>스태프 비밀번호 변경</h2><p>${session.isMaster === true ? "마스타스탭 전체영화 비밀번호가 변경됩니다." : "현재 담당 상영관의 모든 회차에 같은 새 비밀번호가 적용됩니다."}</p></div>
      <form id="staffPinChangeForm" class="staff-pin-form">
        <label class="label" for="currentStaffPin">현재 비밀번호</label><input class="input" id="currentStaffPin" name="currentPin" type="password" inputmode="numeric" required />
        <label class="label" for="newStaffPin">새 비밀번호</label><input class="input" id="newStaffPin" name="newPin" type="password" inputmode="numeric" minlength="4" required />
        <label class="label" for="confirmStaffPin">새 비밀번호 확인</label><input class="input" id="confirmStaffPin" name="confirmPin" type="password" inputmode="numeric" minlength="4" required />
        <button class="btn btn-dark" type="submit">비밀번호 변경</button>
      </form>
    </section>
    <section class="stats-grid staff-stats">
      <div class="stat-card"><span>${session.isMaster === true ? "담당 범위" : "담당 상영관"}</span><strong>${session.isMaster === true ? "전체영화" : esc(session.venue || screenings[0].venue)}</strong><small>${screenings.length}회차</small></div>
      <div class="stat-card"><span>신청 인원</span><strong>${totalSeats}</strong><small>취소 제외</small></div>
      <div class="stat-card"><span>참석자</span><strong>${attendedSeats}</strong><small>실제 참석</small></div>
      <div class="stat-card"><span>취소 인원</span><strong>${canceledSeats}</strong><small>취소 처리</small></div>
      <div class="stat-card"><span>후원하기 클릭</span><strong>${Number(state.sponsorClicks || 0)}</strong><small>전체 누적</small></div>
    </section>
    <section class="card">
      <div class="section-title"><div><h2>전체 상영관 통계</h2><p>모든 담당 스태프가 함께 확인할 수 있는 전체 현황입니다.</p></div></div>
      ${venueStatsTable(venueStats)}
    </section>
    ${screenings.map((screening) => `
      <section class="card staff-screening-card">
        <div class="section-title">
          <div><div class="badges"><span class="badge blue">${esc(screening.venue)}</span><span class="badge ${statusInfo(screening).className}">${esc(statusInfo(screening).text)}</span></div><h2>${esc(screening.title)}</h2><p>${esc(formatDateTime(screening.startTime))} · 담당 ${esc(screening.staff || session.staffName)}</p></div>
          <div class="staff-capacity"><strong>${appliedSeats(screening.id)} / ${Number(screening.capacity || 0)}명</strong><span>신청</span></div>
        </div>
        ${reservationTable(reservations.filter((reservation) => reservation.screeningId === screening.id), { staffMode: true })}
      </section>
    `).join("")}
  `;
}

function venueStatsTable(rows) {
  if (!rows.length) return `<div class="empty">통계 데이터가 없습니다.</div>`;
  const totals = rows.reduce((a, r) => ({
    capacity: a.capacity + r.capacity,
    applications: a.applications + r.applications,
    applicants: a.applicants + r.applicants,
    attended: a.attended + r.attended,
    canceledApplications: a.canceledApplications + r.canceledApplications,
    canceledSeats: a.canceledSeats + r.canceledSeats
  }), { capacity:0, applications:0, applicants:0, attended:0, canceledApplications:0, canceledSeats:0 });
  const totalScreenings = rows.reduce((n, r) => n + r.screenings, 0);
  const totalRate = totals.capacity ? Math.round((totals.applicants / totals.capacity) * 100) : 0;
  const totalAttendanceRate = totals.applicants ? Math.round((totals.attended / totals.applicants) * 100) : 0;
  return `<div class="table-wrap"><table class="venue-stats-table"><thead><tr><th>상영관</th><th>회차</th><th>정원</th><th>신청</th><th>참석</th><th>취소</th><th>신청률</th><th>참석률</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td><strong>${esc(r.name)}</strong></td><td>${r.screenings}</td><td>${r.capacity}</td><td>${r.applications}건 / ${r.applicants}명</td><td>${r.attended}명</td><td>${r.canceledApplications}건 / ${r.canceledSeats}명</td><td>${r.rate}%</td><td>${r.attendanceRate}%</td></tr>`).join("")}
    <tr class="total-row"><td><strong>전체 합계</strong></td><td>${totalScreenings}</td><td>${totals.capacity}</td><td>${totals.applications}건 / ${totals.applicants}명</td><td>${totals.attended}명</td><td>${totals.canceledApplications}건 / ${totals.canceledSeats}명</td><td>${totalRate}%</td><td>${totalAttendanceRate}%</td></tr>
  </tbody></table></div>`;
}

function renderStaffLogin(preselectedId = "") {
  const options = sortedScreenings().map((screening) => `<option value="${esc(screening.id)}" ${screening.id === preselectedId ? "selected" : ""}>${esc(screening.venue)} · ${esc(screening.title)} · ${esc(screening.staff || "담당 미정")}</option>`).join("");
  return `
    <section class="admin-login staff-login">
      <div class="login-card">
        <div class="eyebrow">상영관 담당자 전용</div>
        <h1>신청자 확인</h1>
        <p>담당 상영 영화를 선택하고 스탭 비밀번호를 입력하세요. 임시 스탭 비밀번호는 <strong>0909</strong>입니다.</p>
        <form id="staffLoginForm">
          <label class="label" for="staffScreeningId">담당 상영 영화</label>
          <select class="select" id="staffScreeningId" name="screeningId" required>
            <option value="">상영관 영화를 선택하세요</option>
            <option value="__all__" ${preselectedId === "__all__" ? "selected" : ""}>전체영화 · 마스타스탭</option>${options}
          </select>
          <label class="label" for="staffPin">스태프 비밀번호</label>
          <input class="input" id="staffPin" name="pin" type="password" inputmode="numeric" autocomplete="current-password" required />
          <div class="form-actions">
            <button class="btn btn-dark" type="submit">신청자 명단 열기</button>
            <a class="btn btn-outline" href="#/apply">영화 신청 화면</a>
          </div>
        </form>
      </div>
    </section>
  `;
}

function submitStaffLogin(form) {
  const data = formDataObject(form);
  if (data.screeningId === "__all__") {
    if (String(data.pin || "") !== String(state.masterStaffPin || "0909")) return toast("마스타스탭 비밀번호가 맞지 않습니다.");
    state.masterStaffPresent = true;
    persist();
    sessionStorage.setItem(STAFF_SESSION_KEY, JSON.stringify({
      staffName: "마스타스탭",
      venue: "전체영화",
      screeningIds: state.screenings.map((item) => item.id),
      isMaster: true,
      loggedInAt: new Date().toISOString()
    }));
    window.location.hash = "#/staff";
    render();
    toast("마스타스탭 전체영화 신청자 관리 화면을 열었습니다.");
    return;
  }
  const screening = state.screenings.find((item) => item.id === data.screeningId);
  if (!screening || !screening.staffPin) return toast("이 회차에는 아직 스태프 비밀번호가 설정되지 않았습니다.");
  if (String(data.pin || "") !== String(screening.staffPin)) return toast("스태프 비밀번호가 맞지 않습니다.");
  const venueScreenings = state.screenings.filter((item) => item.venue === screening.venue && String(item.staffPin || "") === String(screening.staffPin || ""));
  venueScreenings.forEach((item) => { item.staffPresent = true; });
  persist();
  sessionStorage.setItem(STAFF_SESSION_KEY, JSON.stringify({
    staffName: screening.staff || "담당 스태프",
    venue: screening.venue,
    screeningIds: venueScreenings.map((item) => item.id),
    loggedInAt: new Date().toISOString()
  }));
  window.location.hash = "#/staff";
  render();
  toast(`${screening.staff || "담당 스태프"}님 신청자 관리 화면을 열었습니다.`);
}

function submitStaffPinChange(form) {
  const session = getStaffSession();
  if (!session || !session.screeningIds?.length) return toast("스태프 로그인이 필요합니다.");
  const data = formDataObject(form);
  const newPin = String(data.newPin || "").trim();
  if (newPin.length < 4) return toast("새 비밀번호는 4자리 이상으로 입력하세요.");
  if (newPin !== String(data.confirmPin || "").trim()) return toast("새 비밀번호 확인이 일치하지 않습니다.");
  if (session.isMaster === true) {
    if (String(data.currentPin || "") !== String(state.masterStaffPin || "0909")) return toast("현재 비밀번호가 맞지 않습니다.");
    state.masterStaffPin = newPin;
    persist();
    form.reset();
    toast("마스타스탭 비밀번호를 변경했습니다.");
    return;
  }
  const screening = state.screenings.find((item) => item.id === session.screeningIds[0]);
  if (!screening) return toast("담당 상영관을 찾을 수 없습니다.");
  if (String(data.currentPin || "") !== String(screening.staffPin || "")) return toast("현재 비밀번호가 맞지 않습니다.");
  state.screenings.forEach((item) => {
    if (session.screeningIds.includes(item.id)) item.staffPin = newPin;
  });
  persist();
  form.reset();
  toast("스태프 비밀번호를 변경했습니다.");
}

function renderNotFound() {
  return `
    <section class="card">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>QR 첫 화면으로 돌아가 다시 선택해주세요.</p>
      <div class="form-actions"><a class="btn btn-dark" href="#/">첫 화면으로</a></div>
    </section>
  `;
}

function isAdminAuthed() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function renderAdmin(tab) {
  if (!isAdminAuthed()) return renderAdminLogin();
  const active = ["overview", "opening", "screenings", "reservations", "stats", "staff", "backup"].includes(tab) ? tab : "overview";
  return `
    <section class="section-title">
      <div>
        <h1>관리자 대시보드</h1>
        <p>상영관 관리, 신청자 명단, 정원 초과 여부, 실제 참석 현황, 통계와 백업을 관리합니다.</p>
      </div>
      <div class="cta-row">
        <button class="btn btn-outline" type="button" data-action="print">인쇄</button>
        <button class="btn btn-danger" type="button" data-action="admin-logout">로그아웃</button>
      </div>
    </section>
    <section class="admin-layout">
      <aside class="admin-sidebar" aria-label="관리자 메뉴">
        ${adminTabLink("overview", "운영요약", active)}
        ${adminTabLink("reservations", "신청자명단", active)}
        ${adminTabLink("stats", "상세통계", active)}
        ${adminTabLink("staff", "STAFF 관리", active)}
        ${adminTabLink("opening", "개막작관리", active)}
        ${adminTabLink("screenings", "상영관, 영화 관리", active)}
        ${adminTabLink("backup", "백업·연동", active)}
      </aside>
      <div class="admin-panel">
        ${active === "overview" ? adminOverview() : ""}
        ${active === "opening" ? adminOpening() : ""}
        ${active === "screenings" ? adminScreenings() : ""}
        ${active === "reservations" ? adminReservations() : ""}
        ${active === "stats" ? adminStats() : ""}
        ${active === "staff" ? adminStaffManagement() : ""}
        ${active === "backup" ? adminBackup() : ""}
      </div>
    </section>
  `;
}

function renderAdminLogin() {
  return `
    <section class="admin-login">
      <div class="login-card">
        <div class="eyebrow" style="background:rgba(179,63,47,.1);color:var(--brand-dark);">운영자 전용</div>
        <h1>관리자 로그인</h1>
        <p>임시 비밀번호는 <strong>0909</strong>입니다. 앱 제작이 완료되면 변경될 예정입니다. 스탭 비번도 <strong>0909</strong>입니다.</p>
        <form id="adminLoginForm">
          <label class="label" for="adminPin">관리자 PIN</label>
          <input class="input" id="adminPin" name="pin" type="password" inputmode="numeric" autocomplete="current-password" required />
          <div class="form-actions">
            <button class="btn btn-dark" type="submit">대시보드 열기</button>
            <a class="btn btn-outline" href="#/">첫 화면</a>
          </div>
        </form>
      </div>
    </section>
  `;
}

function adminTabLink(tab, label, active) {
  return `<button class="admin-tab ${tab === active ? "active" : ""}" type="button" data-action="admin-tab" data-tab="${esc(tab)}">${label}</button>`;
}

function adminOverview() {
  const totals = getTotals();
  const risky = sortedScreenings().filter((s) => statusInfo(s).className !== "ok");
  return `
    <section class="metric-grid">
      <div class="metric-card"><div class="metric-label">총 신청 건수</div><div class="metric-value">${totals.totalApplicationCount}</div><div class="metric-note">신청 인원 ${totals.totalAppliedSeats}명</div></div>
      <div class="metric-card"><div class="metric-label">신청 인원</div><div class="metric-value">${totals.totalAppliedSeats}</div><div class="metric-note">신청 ${totals.totalApplicationCount}건 · 신청률 ${totals.occupancy}%</div></div>
      <div class="metric-card"><div class="metric-label">참석 인원</div><div class="metric-value">${totals.totalActualAttendees}</div><div class="metric-note">참석 처리 ${totals.totalAttendedApplicationCount}건 · 참석률 ${totals.attendance}%</div></div>
      <div class="metric-card"><div class="metric-label">취소 인원</div><div class="metric-value">${totals.totalWaitlistSeats}</div><div class="metric-note">취소 또는 미참석 처리</div></div>
      <div class="metric-card"><div class="metric-label">후원 클릭</div><div class="metric-value">${state.sponsorClicks || 0}</div><div class="metric-note">이 브라우저 기준</div></div>
    </section>

    <section class="card">
      <div class="section-title"><div><h2>상영관별 통계</h2><p>상영관을 기준으로 신청, 참석, 취소를 집계합니다. 후원하기 클릭 ${Number(state.sponsorClicks || 0)}회.</p></div></div>
      ${venueStatsTable(groupByVenue())}
    </section>

    <section class="card">
      <div class="section-title">
        <div>
          <h2>영화별 신청·참석 현황</h2>
          <p>영화별 신청, 참석, 취소 인원을 함께 확인하세요.</p>
        </div>
        <button class="btn btn-outline" type="button" data-action="export-stats">통계 엑셀저장</button>
      </div>
      ${screeningTable(sortedScreenings(), { compact: false })}
    </section>

    <section class="grid-2">
      <div class="card">
        <h3>주의가 필요한 회차</h3>
        ${risky.length ? `<div class="roster-list">${risky.map((s) => `<div class="roster-item"><strong>${esc(s.title)}</strong><span>${esc(s.venue)} · ${esc(formatDateTime(s.startTime))} · ${esc(statusInfo(s).text)}</span></div>`).join("")}</div>` : `<div class="empty">현재 정원 위험 회차가 없습니다.</div>`}
      </div>
      <div class="card">
        <h3>운영 메모</h3>
        <p>현장에서는 신청자 명단을 인쇄해 참석 여부를 체크하고, 운영 종료 후 각 회차의 명단·참석 화면 또는 신청자 명단에서 참석 확인 버튼을 눌러 실제 참석 통계를 정리하세요.</p>
      </div>
    </section>
  `;
}

function screeningTable(screenings, options = {}) {
  if (!screenings.length) return `<div class="empty">등록된 영화가 없습니다.</div>`;
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>영화</th>
            <th>상영관</th>
            <th>상태</th>
            <th>시간</th>
            <th>정원</th>
            <th>신청</th>
            <th>참석</th>
            <th>취소</th>
            <th>GV·모더레이터</th>
            <th>담당</th>
            ${options.manage ? "<th>관리</th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${screenings.map((screening) => {
            const info = statusInfo(screening);
            const isOpening = isOpeningScreening(screening);
            const openStats = isOpening ? openingStats(screening) : null;
            const phase = isOpening ? openingPhaseInfo(screening) : null;
            return `
              <tr>
                <td>${options.manage ? `<strong>${esc(screening.title)}</strong>` : `<button class="roster-link" type="button" data-action="view-roster" data-id="${esc(screening.id)}"><strong>${esc(screening.title)}</strong></button>`}${isOpening ? `<br><span class="help">개막작 신청 ${openStats.earlybirdSeats}명 · 일반 ${openStats.generalSeats}명 · 지정잔여 ${openStats.designatedRemaining}석</span>` : ""}</td>
                <td>${options.manage ? `<strong>${esc(screening.venue)}</strong>` : `<button class="roster-link" type="button" data-action="view-roster" data-id="${esc(screening.id)}"><strong>${esc(screening.venue)}</strong></button>`}</td>
                <td><span class="badge ${info.className}">${esc(info.text)}</span>${isOpening ? `<br><span class="badge ${phase.className}">${esc(phase.label)}</span>` : ""}</td>
                <td>${esc(formatDateTime(screening.startTime))}</td>
                <td>${Number(screening.capacity || 0)}명</td>
                <td>${applicationCount(screening.id)}건 / ${appliedSeats(screening.id)}명</td>
                <td>${attendedApplicationCount(screening.id)}건 / ${actualAttendees(screening.id)}명<br><span class="help">신청 대비 ${attendanceRate(screening.id)}%</span></td>
                <td>${canceledApplicationCount(screening.id)}건 / ${canceledSeats(screening.id)}명</td>
                <td>${esc(screening.gvHost || "-")}<br><span class="help">${esc(screening.moderator || "-")}</span></td>
                <td>${esc(screening.staff || "-")}<br><span class="help">${esc(screening.staffPhone || "-")}</span></td>
                ${options.manage ? `<td><div class="row-actions"><button class="btn btn-outline btn-small" type="button" data-action="edit-screening" data-id="${esc(screening.id)}">수정</button><button class="btn btn-danger btn-small" type="button" data-action="delete-screening" data-id="${esc(screening.id)}">삭제</button></div></td>` : ""}
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}


function adminStaffManagement() {
  const rows = sortedScreenings();
  const activeSession = readStaffSession();
  const activeIds = new Set(activeSession?.screeningIds || []);
  const masterPresent = Boolean(state.masterStaffPresent) || activeSession?.isMaster === true;
  if (!rows.length) return `<section class="card"><div class="empty">등록된 상영 영화가 없습니다.</div></section>`;
  return `
    <section class="card staff-admin-card">
      <div class="section-title">
        <div>
          <h2>STAFF 목록</h2>
          <p>영화별 담당 STAFF 접속 상태와 비밀번호를 관리합니다. STAFF가 비밀번호를 입력하고 들어오면 자동으로 있음으로 표시됩니다.</p>
        </div>
      </div>
      <div class="table-wrap staff-admin-table-wrap">
        <table class="staff-admin-table">
          <thead>
            <tr>
              <th>영화이름</th>
              <th>STAFF</th>
              <th>비번관리</th>
            </tr>
          </thead>
          <tbody>
            <tr class="master-staff-row">
              <td><strong>전체영화</strong><br><span class="help">마스타스탭 · 모든 영화 신청자 목록 관리</span></td>
              <td><span class="badge ${masterPresent ? "ok" : "muted"}">STAFF ${masterPresent ? "있음" : "없음"}</span><br><span class="help">마스타스탭</span></td>
              <td>
                <div class="staff-pin-admin-row">
                  <input class="input" type="text" value="${esc(state.masterStaffPin || "0909")}" data-master-staff-pin-input placeholder="마스타스탭 비밀번호" />
                  <button class="btn btn-outline btn-small" type="button" data-action="save-master-staff-pin">저장</button>
                  <button class="btn btn-outline btn-small" type="button" data-action="clear-master-staff-present">없음</button>
                </div>
              </td>
            </tr>
            ${rows.map((screening) => {
              const isPresent = Boolean(screening.staffPresent) || activeIds.has(screening.id);
              return `
                <tr>
                  <td><strong>${esc(screening.title)}</strong><br><span class="help">${esc(screening.venue)} · ${esc(formatDateTime(screening.startTime))}</span></td>
                  <td><span class="badge ${isPresent ? "ok" : "muted"}">STAFF ${isPresent ? "있음" : "없음"}</span>${screening.staff ? `<br><span class="help">${esc(screening.staff)}</span>` : ""}</td>
                  <td>
                    <div class="staff-pin-admin-row">
                      <input class="input" type="text" value="${esc(screening.staffPin || "")}" data-staff-pin-input="${esc(screening.id)}" placeholder="비밀번호" />
                      <button class="btn btn-outline btn-small" type="button" data-action="save-staff-pin" data-id="${esc(screening.id)}">저장</button>
                      <button class="btn btn-outline btn-small" type="button" data-action="clear-staff-present" data-id="${esc(screening.id)}">없음</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function saveMasterStaffPin() {
  const input = document.querySelector("[data-master-staff-pin-input]");
  const pin = String(input?.value || "").trim();
  if (!pin) return toast("마스타스탭 비밀번호를 입력하세요.");
  state.masterStaffPin = pin;
  persist();
  render();
  toast("마스타스탭 비밀번호를 저장했습니다.");
}

function clearMasterStaffPresent() {
  state.masterStaffPresent = false;
  const session = readStaffSession();
  if (session?.isMaster === true) sessionStorage.removeItem(STAFF_SESSION_KEY);
  persist();
  render();
  toast("마스타스탭 상태를 없음으로 변경했습니다.");
}

function saveStaffPin(screeningId) {
  const screening = state.screenings.find((item) => item.id === screeningId);
  if (!screening) return toast("상영 영화를 찾을 수 없습니다.");
  const input = document.querySelector(`[data-staff-pin-input="${CSS.escape(screeningId)}"]`);
  const pin = String(input?.value || "").trim();
  if (!pin) return toast("비밀번호를 입력하세요.");
  screening.staffPin = pin;
  persist();
  render();
  toast("STAFF 비밀번호를 저장했습니다.");
}

function clearStaffPresent(screeningId) {
  const screening = state.screenings.find((item) => item.id === screeningId);
  if (!screening) return toast("상영 영화를 찾을 수 없습니다.");
  screening.staffPresent = false;
  const session = readStaffSession();
  if (session?.screeningIds?.includes(screeningId)) sessionStorage.removeItem(STAFF_SESSION_KEY);
  persist();
  render();
  toast("STAFF 상태를 없음으로 변경했습니다.");
}

function adminOpening() {
  const opening = getOpeningScreening();
  const phase = openingPhaseInfo(opening);
  const stats = openingStats(opening);
  const reservations = getReservations(opening.id, { includeCanceled: true }).sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
  return `
    <section class="card opening-admin-card">
      <div class="section-title">
        <div>
          <h2>개막식·개막작 티켓팅 설정</h2>
          <p>개막식 “얼굴”, 박정민 배우 참석, 메인 화면 노출 종료일, 포스터·소개영상, 개막작 신청 기간과 일반 신청 기간을 관리합니다.</p>
        </div>
        <a class="btn btn-outline" href="#/opening">관객 화면 보기</a>
      </div>
      <form id="openingForm">
        <div class="form-grid">
          <div>
            <label class="label" for="openingTitle">개막작 제목 <span class="required">*</span></label>
            <input class="input" id="openingTitle" name="title" value="${esc(opening.title)}" required />
          </div>
          <div>
            <label class="label" for="openingGuest">참석 게스트</label>
            <input class="input" id="openingGuest" name="guest" value="${esc(opening.guest || "박정민 배우")}" />
          </div>
          <div>
            <label class="label" for="festivalStartDate">영화제 시작일</label>
            <input class="input" id="festivalStartDate" name="festivalStartDate" type="date" value="${esc(opening.festivalStartDate || FESTIVAL_START_DATE)}" />
          </div>
          <div>
            <label class="label" for="festivalEndDate">영화제 종료일</label>
            <input class="input" id="festivalEndDate" name="festivalEndDate" type="date" value="${esc(opening.festivalEndDate || FESTIVAL_END_DATE)}" />
          </div>
          <div>
            <label class="label" for="openingMainEndAt">메인 개막식 노출 종료</label>
            <input class="input" id="openingMainEndAt" name="openingMainEndAt" type="datetime-local" value="${esc(toLocalInputValue(opening.openingMainEndAt || OPENING_MAIN_END_AT))}" />
          </div>
          <div>
            <label class="label" for="videoUrl">소개영상 URL</label>
            <input class="input" id="videoUrl" name="videoUrl" value="${esc(opening.videoUrl || OPENING_VIDEO_URL)}" placeholder="https://youtu.be/..." />
          </div>
          <div class="full">
            <label class="label" for="posterSrc">포스터 이미지 경로</label>
            <input class="input" id="posterSrc" name="posterSrc" value="${esc(opening.posterSrc || OPENING_POSTER_SRC)}" placeholder="assets/face-poster.jpeg" />
            <p class="help">ZIP 안의 포스터 파일은 기본값 <code>assets/face-poster.jpeg</code>로 포함되어 있습니다.</p>
          </div>
          <div>
            <label class="label" for="openingVenue">상영관 <span class="required">*</span></label>
            <input class="input" id="openingVenue" name="venue" value="${esc(opening.venue)}" required />
          </div>
          <div>
            <label class="label" for="openingCapacity">총 정원 <span class="required">*</span></label>
            <input class="input" id="openingCapacity" name="capacity" type="number" min="1" value="${esc(opening.capacity)}" required />
          </div>
          <div>
            <label class="label" for="openingStart">상영 시작 <span class="required">*</span></label>
            <input class="input" id="openingStart" name="startTime" type="datetime-local" value="${esc(toLocalInputValue(opening.startTime))}" required />
          </div>
          <div>
            <label class="label" for="openingEnd">상영 종료</label>
            <input class="input" id="openingEnd" name="endTime" type="datetime-local" value="${esc(toLocalInputValue(opening.endTime))}" />
          </div>
          <div>
            <label class="label" for="earlyBirdStart">개막작 신청 시작</label>
            <input class="input" id="earlyBirdStart" name="earlyBirdStart" type="datetime-local" value="${esc(toLocalInputValue(opening.earlyBirdStart))}" />
          </div>
          <div>
            <label class="label" for="earlyBirdEnd">개막작 신청 종료</label>
            <input class="input" id="earlyBirdEnd" name="earlyBirdEnd" type="datetime-local" value="${esc(toLocalInputValue(opening.earlyBirdEnd))}" />
          </div>
          <div>
            <label class="label" for="generalOpenAt">일반 신청 시작</label>
            <input class="input" id="generalOpenAt" name="generalOpenAt" type="datetime-local" value="${esc(toLocalInputValue(opening.generalOpenAt))}" />
          </div>
          <div>
            <label class="label" for="generalEndAt">일반 신청 종료</label>
            <input class="input" id="generalEndAt" name="generalEndAt" type="datetime-local" value="${esc(toLocalInputValue(opening.generalEndAt || opening.startTime))}" />
          </div>
          <div>
            <label class="label" for="maxTicketsPerReservation">1회 신청 최대 인원</label>
            <input class="input" id="maxTicketsPerReservation" name="maxTicketsPerReservation" type="number" min="1" max="20" value="${esc(opening.maxTicketsPerReservation || 4)}" />
          </div>
          <div>
            <label class="label" for="openingStatus">신청 상태</label>
            <select class="select" id="openingStatus" name="status">
              ${["신청 가능", "준비중", "마감", "현장 접수"].map((status) => `<option ${status === (opening.status || "신청 가능") ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="label" for="openingGv">GV/소개 담당</label>
            <input class="input" id="openingGv" name="gvHost" value="${esc(opening.gvHost || "")}" />
          </div>
          <div>
            <label class="label" for="openingModerator">모더레이터</label>
            <input class="input" id="openingModerator" name="moderator" value="${esc(opening.moderator || "")}" />
          </div>
          <div>
            <label class="label" for="openingStaff">담당 스태프</label>
            <input class="input" id="openingStaff" name="staff" value="${esc(opening.staff || "")}" />
          </div>
          <div>
            <label class="label" for="openingPhone">담당 연락처</label>
            <input class="input" id="openingPhone" name="staffPhone" value="${esc(opening.staffPhone || "")}" />
          </div>
          <div>
            <label class="label" for="openingStaffPin">스태프 비밀번호</label>
            <input class="input" id="openingStaffPin" name="staffPin" type="password" inputmode="numeric" value="${esc(opening.staffPin || "")}" placeholder="담당자에게 별도 전달" />
            <span class="help">신청자 관리 화면 로그인용입니다.</span>
          </div>
          <div class="full">
            <label class="label" for="openingNotes">개막작 안내/운영 메모</label>
            <textarea class="textarea" id="openingNotes" name="notes">${esc(opening.notes || "")}</textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-dark" type="submit">개막작 설정 저장</button>
          <button class="btn btn-outline" type="button" data-action="view-roster" data-id="${esc(opening.id)}">개막작 명단·참석</button>
          <button class="btn btn-outline" type="button" data-action="export-reservations">신청자 엑셀저장</button>
        </div>
      </form>
    </section>

    <section class="metric-grid opening-metrics">
      <div class="metric-card"><div class="metric-label">현재 단계</div><div class="metric-value text-value">${esc(phase.label)}</div><div class="metric-note">${esc(phase.message || "")}</div></div>
      <div class="metric-card"><div class="metric-label">개막작 신청</div><div class="metric-value">${stats.earlybirdSeats}</div><div class="metric-note">신청 인원</div></div>
      <div class="metric-card"><div class="metric-label">일반 신청</div><div class="metric-value">${stats.generalSeats}</div><div class="metric-note">신청 인원</div></div>
      <div class="metric-card"><div class="metric-label">취소 인원</div><div class="metric-value">${canceledSeats(opening.id)}</div><div class="metric-note">취소 또는 미참석 처리</div></div>
    </section>


    <section class="card">
      <div class="section-title">
        <div>
          <h2>개막작 신청자 현황</h2>
          <p>개막작 신청과 일반 신청 현황을 표시합니다.</p>
        </div>
        <button class="btn btn-dark" type="button" data-action="print">인쇄용 명단</button>
      </div>
      ${reservations.length ? reservationTable(reservations) : `<div class="empty">아직 개막작 신청자가 없습니다.</div>`}
    </section>
  `;
}

function adminScreenings() {
  const editing = selectedScreeningId ? state.screenings.find((s) => s.id === selectedScreeningId) : null;
  return `
    <section class="card">
      <div class="section-title">
        <div>
          <h2>${editing ? "영화·상영관 수정" : "영화·상영관 추가"}</h2>
          <p>시간, 영화제목, GV담당자, 모더레이터, 담당스태프, 연락처, 기타 사항을 언제든지 바꿀 수 있습니다.</p>
        </div>
        ${editing ? `<button class="btn btn-outline" type="button" data-action="cancel-edit">신규 영화·상영관 추가로 전환</button>` : ""}
      </div>
      <form id="screeningForm" data-editing="${editing ? esc(editing.id) : ""}">
        <div class="form-grid">
          <div>
            <label class="label" for="screeningTitle">영화 제목 <span class="required">*</span></label>
            <input class="input" id="screeningTitle" name="title" value="${esc(editing?.title || "")}" required />
          </div>
          <div>
            <label class="label" for="screeningVenue">상영관 <span class="required">*</span></label>
            <input class="input" id="screeningVenue" name="venue" value="${esc(editing?.venue || "")}" required />
          </div>
          <div>
            <label class="label" for="screeningStart">상영 시작 <span class="required">*</span></label>
            <input class="input" id="screeningStart" name="startTime" type="datetime-local" value="${esc(toLocalInputValue(editing?.startTime || ""))}" required />
          </div>
          <div>
            <label class="label" for="screeningEnd">상영 종료</label>
            <input class="input" id="screeningEnd" name="endTime" type="datetime-local" value="${esc(toLocalInputValue(editing?.endTime || ""))}" />
          </div>
          <div>
            <label class="label" for="screeningCapacity">정원 <span class="required">*</span></label>
            <input class="input" id="screeningCapacity" name="capacity" type="number" min="1" value="${esc(editing?.capacity || "")}" required />
          </div>
          <div>
            <label class="label" for="screeningStatus">신청 상태</label>
            <select class="select" id="screeningStatus" name="status">
              ${["신청 가능", "준비중", "마감", "현장 접수"].map((status) => `<option ${status === (editing?.status || "신청 가능") ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="label" for="screeningGv">GV 담당자</label>
            <input class="input" id="screeningGv" name="gvHost" value="${esc(editing?.gvHost || "")}" />
          </div>
          <div>
            <label class="label" for="screeningModerator">모더레이터</label>
            <input class="input" id="screeningModerator" name="moderator" value="${esc(editing?.moderator || "")}" />
          </div>
          <div>
            <label class="label" for="screeningStaff">담당 스태프</label>
            <input class="input" id="screeningStaff" name="staff" value="${esc(editing?.staff || "")}" />
          </div>
          <div>
            <label class="label" for="screeningPhone">담당 연락처</label>
            <input class="input" id="screeningPhone" name="staffPhone" value="${esc(editing?.staffPhone || "")}" />
          </div>
          <div>
            <label class="label" for="screeningStaffPin">스태프 비밀번호</label>
            <input class="input" id="screeningStaffPin" name="staffPin" type="password" inputmode="numeric" value="${esc(editing?.staffPin || "")}" placeholder="예: 1001" />
            <span class="help">담당 스태프가 신청자 명단을 열 때 사용합니다.</span>
          </div>
          <div class="full">
            <label class="label" for="screeningNotes">기타 사항</label>
            <textarea class="textarea" id="screeningNotes" name="notes">${esc(editing?.notes || "")}</textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-dark" type="submit">${editing ? "수정 저장" : "영화·상영관 추가"}</button>
          <button class="btn btn-outline" type="button" data-action="export-screenings">영화·상영관 엑셀저장</button>
        </div>
      </form>
    </section>

    <section class="card">
      <div class="section-title">
        <div><h2>등록된 영화·상영관</h2><p>삭제 시 해당 영화의 신청 정보도 함께 정리할지 확인합니다.</p></div>
      </div>
      ${screeningTable(sortedScreenings(), { manage: true })}
    </section>
  `;
}

function adminReservations() {
  const options = sortedScreenings().map((screening) => `<option value="${esc(screening.id)}">${esc(screening.venue)} · ${esc(screening.title)}</option>`).join("");
  const dateOptions = uniqueValues("startTime")
    .map((value) => String(value || "").slice(0, 10))
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort()
    .map((date) => `<option value="${esc(date)}">${esc(formatDateOnly(date))}</option>`)
    .join("");
  return `
    <section class="card">
      <div class="section-title">
        <div>
          <h2>신청자 명단</h2>
          <p>상영관을 기준으로 신청자 명단을 확인하고, 현장 참석과 신청 정보를 관리할 수 있습니다.</p>
        </div>
        <div class="cta-row">
          <button class="btn btn-primary" type="button" data-action="toggle-bulk-sms">문자전송하기</button>
          <button class="btn btn-dark" type="button" data-action="print">인쇄용 명단</button>
          <button class="btn btn-outline" type="button" data-action="export-reservations">신청자 엑셀저장</button>
        </div>
      </div>
      <section class="filters reservation-filters" aria-label="신청자 필터">
        <input class="input" id="reservationSearch" type="search" placeholder="이름, 연락처, 영화, 메모 검색" />
        <select class="select" id="reservationScreeningFilter"><option value="">영화선택 필터</option>${options}</select>
        <select class="select" id="reservationAttendanceFilter"><option value="">전체 참석여부</option><option value="attended">참석</option><option value="canceled">취소</option></select>
        <select class="select" id="reservationDatePreset"><option value="">전체 날짜</option>${dateOptions}</select>
        <input class="input" id="reservationDateFilter" type="date" aria-label="날짜 직접 선택" />
        <button class="btn btn-outline" type="button" data-action="clear-reservation-filter">필터 초기화</button>
      </section>
      ${reservationSmsSelectMode ? `
        <section class="bulk-sms-panel" aria-label="예약 문자 일괄 발송">
          <div>
            <strong>문자를 보낼 신청자를 체크하세요.</strong>
            <p>체크 후 예약 완료 문자를 다시 보내거나, 별도 안내문자를 작성해 발송할 수 있습니다.</p>
          </div>
          <div class="bulk-sms-actions">
            <button class="btn btn-outline btn-small" type="button" data-action="select-visible-reservations">현재 목록 전체선택</button>
            <button class="btn btn-outline btn-small" type="button" data-action="deselect-visible-reservations">현재 목록 전체해제</button>
            <button class="btn btn-outline btn-small" type="button" data-action="clear-bulk-sms-selection">전체해제</button>
            <button class="btn btn-dark btn-small" type="button" data-action="bulk-reservation-sms">예약관련문자 보내기</button>
            <button class="btn btn-primary btn-small" type="button" data-action="open-bulk-notice-sms">별도안내문자 보내기</button>
          </div>
          <span class="help" id="bulkSmsSelectedCount">선택 0명</span>
        </section>
      ` : ""}
      <div class="print-only print-heading">
        <h2>오프라인 참석 체크 명단</h2>
        <p>현장에서는 참석 칸에 표시하고, 운영 종료 후 화면에서 실제 참석 인원을 입력하세요.</p>
      </div>
      <div id="reservationTable"></div>
    </section>
  `;
}

function reservationTable(reservations, options = {}) {
  if (!reservations.length) return `<div class="empty">조건에 맞는 신청자가 없습니다.</div>`;
  const sortedReservations = [...reservations].sort((a, b) => {
    const sa = state.screenings.find((s) => s.id === a.screeningId) || {};
    const sb = state.screenings.find((s) => s.id === b.screeningId) || {};
    return String(sa.venue || "").localeCompare(String(sb.venue || ""), "ko")
      || String(sa.startTime || "").localeCompare(String(sb.startTime || ""))
      || String(a.name || "").localeCompare(String(b.name || ""), "ko")
      || String(a.createdAt || "").localeCompare(String(b.createdAt || ""));
  });
  const colSpan = options.smsSelectMode ? 10 : 9;
  return `
    <div class="table-wrap reservation-table-wrap">
      <table class="reservation-table ${options.smsSelectMode ? "reservation-table-sms" : ""}">
        <thead>
          <tr>
            ${options.smsSelectMode ? `<th class="screen-only sms-check-col"><input type="checkbox" data-action="toggle-visible-reservation-checks" aria-label="현재 목록 전체 선택" /></th>` : ""}<th>상영관</th><th>영화 / 시간</th><th>신청자</th><th>예약번호</th><th>티켓/좌석</th><th>인원</th><th>신청일</th><th>메모</th><th class="screen-only">관리</th>
          </tr>
        </thead>
        <tbody>
          ${sortedReservations.map((reservation) => {
            const screening = state.screenings.find((s) => s.id === reservation.screeningId);
            const attended = reservation.attended === true;
            const selected = selectedReservationActionId === reservation.id;
            return `
              <tr class="reservation-click-row ${attended ? "attended-row" : ""} ${selected ? "is-selected" : ""}" data-reservation-row="${esc(reservation.id)}" tabindex="0" title="클릭하면 상세 관리 버튼이 열립니다.">
                ${options.smsSelectMode ? `<td class="screen-only sms-check-col"><input type="checkbox" class="reservation-sms-check" data-reservation-check="${esc(reservation.id)}" ${selectedReservationSmsIds.has(reservation.id) ? "checked" : ""} aria-label="${esc(reservation.name)} 문자 발송 선택" /></td>` : ""}
                <td><strong>${esc(screening?.venue || "삭제된 상영관")}</strong></td>
                <td>${screening ? `<strong>${esc(screening.title)}</strong><br><span class="help">${esc(formatDateTime(screening.startTime))}</span>` : "삭제된 회차"}</td>
                <td class="applicant-cell">
                  <div class="applicant-name-line"><strong>${esc(reservation.name)}</strong>${reservationAttendanceIndex(reservation)}</div>
                  <span class="help applicant-phone">${esc(reservation.phone || "-")}</span>
                  ${reservation.email ? `<span class="help applicant-email">${esc(reservation.email)}</span>` : ""}
                  <span class="print-only print-attendance-text">${attended ? `참석 ${Number(reservation.attendedSeats || reservation.seats || 0)}명` : ""}</span>
                </td>
                <td><strong>${esc(reservationDisplayNumber(reservation, screening))}</strong><br><span class="help">${esc(reservationTicketLabel(reservation, screening))}</span></td>
                <td class="ticket-seat-cell"><strong>${esc(reservationTicketLabel(reservation, screening))}</strong><br><span class="help">${esc(reservationSeatLabel(reservation, screening))}</span>${reservation.donorName ? `<br><span class="help">후원자 ${esc(reservation.donorName)}</span>` : ""}</td>
                <td>${Number(reservation.seats || 0)}명</td>
                <td>${esc(formatDateTime(reservation.createdAt))}</td>
                <td class="table-note">${esc(reservation.note || "-")}</td>
                <td class="screen-only">
                  <div class="row-actions reservation-manage-compact">
                    <button class="btn btn-outline btn-small attendance-manage ${attended ? "is-attended" : ""}" type="button" data-action="set-attendance" data-id="${esc(reservation.id)}" data-attended="true" title="참석 인원 입력">참석</button>
                    <button class="btn btn-outline btn-small" type="button" data-action="set-attendance" data-id="${esc(reservation.id)}" data-attended="false">취소</button>
                  </div>
                </td>
              </tr>
              ${selected ? `
                <tr class="reservation-action-row screen-only">
                  <td colspan="${colSpan}">
                    <div class="reservation-action-panel">
                      <div>
                        <strong>${esc(reservation.name)} 님 관리</strong>
                        <p class="help">목록을 클릭하면 이 관리창이 열립니다. 참석 확인, 취소, 정보 수정, 삭제, 문자전송을 바로 처리할 수 있습니다.</p>
                      </div>
                      <div class="row-actions reservation-action-buttons">
                        <button class="btn btn-outline btn-small attendance-manage ${attended ? "is-attended" : ""}" type="button" data-action="set-attendance" data-id="${esc(reservation.id)}" data-attended="true">참석</button>
                        <button class="btn btn-outline btn-small" type="button" data-action="set-attendance" data-id="${esc(reservation.id)}" data-attended="false">취소</button>
                        <button class="btn btn-outline btn-small" type="button" data-action="staff-edit-reservation" data-id="${esc(reservation.id)}">수정</button>
                        <button class="btn btn-danger btn-small" type="button" data-action="delete-reservation" data-id="${esc(reservation.id)}">삭제</button>
                        <button class="btn btn-dark btn-small" type="button" data-action="send-sms" data-id="${esc(reservation.id)}">예약문자</button>
                        <button class="btn btn-primary btn-small" type="button" data-action="open-single-notice-sms" data-id="${esc(reservation.id)}">별도안내문자</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ` : ""}
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}


function adminStats() {
  const byMovie = groupByMovie();
  const byVenue = groupByVenue();
  const byDate = groupByDate();
  return `
    <section class="grid-2">
      <div class="card">
        <div class="section-title"><div><h2>영화별 통계</h2><p>영화를 기준으로 신청, 참석, 취소와 신청률을 집계합니다.</p></div></div>
        ${statsTable(byMovie, ["영화", "회차", "정원", "신청", "참석", "취소", "신청률", "참석률"])}
      </div>
      <div class="card">
        <div class="section-title"><div><h2>상영관별 통계</h2><p>상영관별 정원 대비 신청, 참석, 취소 인원입니다.</p></div></div>
        ${statsTable(byVenue, ["상영관", "회차", "정원", "신청", "참석", "취소", "신청률", "참석률"])}
      </div>
    </section>
    <section class="card">
      <div class="section-title"><div><h2>날짜별 통계</h2><p>일자별 운영 규모와 신청 현황을 봅니다.</p></div></div>
      ${statsTable(byDate, ["날짜", "회차", "정원", "신청", "참석", "취소", "신청률", "참석률"])}
    </section>
    ${getOpeningScreening() ? `
    <section class="card">
      <div class="section-title"><div><h2>개막작 세부 통계</h2><p>개막작 신청과 일반 신청, 참석 현황입니다.</p></div></div>
      <div class="opening-summary-grid">
        <div class="metric-card"><div class="metric-label">개막작 신청</div><div class="metric-value">${openingStats(getOpeningScreening()).earlybirdSeats}</div><div class="metric-note">신청 인원</div></div>
        <div class="metric-card"><div class="metric-label">일반 신청</div><div class="metric-value">${openingStats(getOpeningScreening()).generalSeats}</div><div class="metric-note">신청 인원</div></div>
        <div class="metric-card"><div class="metric-label">참석</div><div class="metric-value">${actualAttendees(getOpeningScreening().id)}</div><div class="metric-note">현장 참석 확인 기준</div></div>
      </div>
    </section>` : ""}

    <section class="card">
      <div class="section-title">
        <div><h2>운영용 통계 내보내기</h2><p>보고서 작성, 공유, 현장 체크인 명단 준비에 활용하세요.</p></div>
      </div>
      <div class="cta-row export-action-row">
        <button class="btn btn-dark" type="button" data-action="export-stats">통계 엑셀저장</button>
        <button class="btn btn-outline" type="button" data-action="export-reservations">신청자 엑셀저장</button>
      </div>
    </section>
  `;
}

function groupByMovie() {
  const map = new Map();
  state.screenings.forEach((screening) => {
    const key = screening.title || "제목 미정";
    const movieReservations = state.reservations.filter((r) => r.screeningId === screening.id);
    const current = map.get(key) || { name: key, screenings: 0, capacity: 0, confirmed: 0, attended: 0, waitlist: 0 };
    current.screenings += 1;
    current.capacity += Number(screening.capacity || 0);
    current.confirmed += movieReservations.filter((r) => r.status !== "취소").reduce((sum, r) => sum + Number(r.seats || 0), 0);
    current.attended += movieReservations.filter((r) => r.attended === true).reduce((sum, r) => sum + Number(r.attendedSeats || r.seats || 0), 0);
    current.waitlist += movieReservations.filter((r) => r.status === "취소" || r.attended === false).reduce((sum, r) => sum + Number(r.seats || 0), 0);
    map.set(key, current);
  });
  return [...map.values()].map((item) => ({
    ...item,
    rate: item.capacity ? Math.round((item.confirmed / item.capacity) * 100) : 0,
    attendanceRate: item.confirmed ? Math.round((item.attended / item.confirmed) * 100) : 0
  })).sort((a, b) => String(a.name).localeCompare(String(b.name), "ko"));
}

function groupByVenue() {
  const map = new Map();
  state.screenings.forEach((screening) => {
    const key = screening.venue || "미정";
    const venueReservations = state.reservations.filter((r) => r.screeningId === screening.id);
    const current = map.get(key) || { name: key, screenings: 0, capacity: 0, applications: 0, applicants: 0, confirmed: 0, attended: 0, canceledApplications: 0, canceledSeats: 0, waitlist: 0 };
    current.screenings += 1;
    current.capacity += Number(screening.capacity || 0);
    current.applications += venueReservations.filter((r) => r.status !== "취소").length;
    current.applicants += venueReservations.filter((r) => r.status !== "취소").reduce((sum, r) => sum + Number(r.seats || 0), 0);
    current.confirmed += appliedSeats(screening.id);
    current.attended += actualAttendees(screening.id);
    current.canceledApplications += venueReservations.filter((r) => r.status === "취소" || r.attended === false).length;
    current.canceledSeats += venueReservations.filter((r) => r.status === "취소" || r.attended === false).reduce((sum, r) => sum + Number(r.seats || 0), 0);
    current.waitlist += canceledSeats(screening.id);
    map.set(key, current);
  });
  return [...map.values()].map((item) => ({
    ...item,
    rate: item.capacity ? Math.round((item.confirmed / item.capacity) * 100) : 0,
    attendanceRate: item.confirmed ? Math.round((item.attended / item.confirmed) * 100) : 0
  })).sort((a, b) => String(a.name).localeCompare(String(b.name), "ko"));
}

function groupByDate() {
  const map = new Map();
  state.screenings.forEach((screening) => {
    const key = formatDateOnly(screening.startTime);
    const current = map.get(key) || { name: key, screenings: 0, capacity: 0, confirmed: 0, attended: 0, waitlist: 0 };
    current.screenings += 1;
    current.capacity += Number(screening.capacity || 0);
    current.confirmed += appliedSeats(screening.id);
    current.attended += actualAttendees(screening.id);
    current.waitlist += canceledSeats(screening.id);
    map.set(key, current);
  });
  return [...map.values()].map((item) => ({
    ...item,
    rate: item.capacity ? Math.round((item.confirmed / item.capacity) * 100) : 0,
    attendanceRate: item.confirmed ? Math.round((item.attended / item.confirmed) * 100) : 0
  }));
}

function statsTable(rows, headers) {
  if (!rows.length) return `<div class="empty">통계 데이터가 없습니다.</div>`;
  return `
    <div class="table-wrap stats-table-wrap">
      <table class="stats-table">
        <thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td><strong>${esc(row.name)}</strong></td>
              <td>${row.screenings}</td>
              <td>${row.capacity}</td>
              <td>${row.confirmed}</td>
              <td>${row.attended}</td>
              <td>${row.waitlist}</td>
              <td>${row.rate}%</td>
              <td>${row.attendanceRate}%</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function adminBackup() {
  return `
    <section class="card">
      <div class="section-title">
        <div>
          <h2>데이터 백업·복원</h2>
          <p>이 시제품은 브라우저 localStorage에 데이터를 저장합니다. 운영 전후로 JSON 백업을 내려받아 보관하세요.</p>
        </div>
      </div>
      <div class="grid-2">
        <div class="card compact">
          <h3>총관리자 비밀번호</h3>
          <p>ADMIN 로그인에 사용하는 총관리자 비밀번호를 변경할 수 있습니다.</p>
          <form id="adminPinChangeForm" class="inline-admin-pin-form">
            <label class="label" for="adminNewPin">새 총관리자 비밀번호</label>
            <div class="form-actions admin-pin-actions">
              <input class="input" id="adminNewPin" name="adminPin" type="password" inputmode="numeric" autocomplete="new-password" value="${esc(state.adminPin || ADMIN_PIN)}" placeholder="새 비밀번호" required />
              <button class="btn btn-dark" type="submit">비밀번호 저장</button>
            </div>
            <span class="help">저장 후 다음 ADMIN 로그인부터 변경된 비밀번호가 적용됩니다.</span>
          </form>
        </div>
        <div class="card compact">
          <h3>구글드라이브 자동저장</h3>
          <p>구글드라이브 연동 URL을 설정하면 자동저장이 바로 켜집니다. 데이터 변경 시 자동 저장하고, 관리자 화면이 열려 있으면 1분마다 한 번 더 저장합니다.</p>
          <div class="drive-sync-status">
            <span class="badge ${isGoogleDriveAutoSyncEnabled() ? "badge-ok" : ""}">${isGoogleDriveAutoSyncEnabled() ? "자동저장 ON" : "연동 URL 필요"}</span>
            <span class="muted">마지막 저장: ${esc(formatDriveLastSyncTime())}</span>
          </div>
          <div class="form-actions">
            <button class="btn btn-dark" type="button" data-action="export-stats">통계 엑셀저장</button>
            <button class="btn btn-outline" type="button" data-action="export-reservations">신청자 엑셀저장</button>
            <button class="btn btn-primary" type="button" data-action="drive-sync-settings">구글드라이브 연동</button>
          </div>
          <span class="help">구글드라이브 연동은 URL 설정 즉시 자동저장이 켜지고, 데이터 변경 시와 관리자 화면 1분 주기로 자동 저장됩니다. 수동 저장은 엑셀저장만 사용합니다.</span>
        </div>
        <div class="card compact">
          <h3>백업 다운로드</h3>
          <p>상영 회차, 신청자, 참석 체크, 후원 클릭 수를 하나의 JSON 파일로 저장합니다.</p>
          <div class="form-actions"><button class="btn btn-dark" type="button" data-action="export-json">전체 JSON 백업</button><button class="btn btn-outline" type="button" data-action="reset-drive-webhook">구글드라이브 연동 URL 초기화</button></div>
        </div>
        <div class="card compact">
          <h3>백업 복원</h3>
          <p>이 앱에서 내려받은 JSON 파일을 다시 불러옵니다.</p>
          <div class="form-actions"><input class="input" type="file" id="importJson" accept="application/json" /></div>
        </div>
      </div>
    </section>
    <section class="card">
      <h2>초기화</h2>
      <p>데모 데이터로 되돌리거나 모든 신청 정보를 비울 수 있습니다. 실제 운영 중에는 신중하게 사용하세요.</p>
      <div class="form-actions">
        <button class="btn btn-outline" type="button" data-action="reset-demo">데모 데이터로 초기화</button>
        <button class="btn btn-danger" type="button" data-action="clear-reservations">신청 정보만 비우기</button>
      </div>
    </section>
  `;
}

function bookingModalShell() {
  return `
    <div class="modal-backdrop" id="bookingModal" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="modal">
        <div class="modal-header">
          <h3 id="bookingTitle">영화 신청</h3>
          <button class="close-btn" type="button" data-action="close-modal" aria-label="닫기">×</button>
        </div>
        <div class="modal-body" id="bookingBody"></div>
      </div>
    </div>
    <div class="modal-backdrop" id="rosterModal" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="modal">
        <div class="modal-header">
          <h3 id="rosterTitle">신청자 명단</h3>
          <button class="close-btn" type="button" data-action="close-modal" aria-label="닫기">×</button>
        </div>
        <div class="modal-body" id="rosterBody"></div>
      </div>
    </div>
  `;
}

function openingBookingIntro(screening, phase, stats) {
  if (phase.phase === "earlybird") {
    return `
      <div class="opening-booking-intro earlybird">
        <div class="badges"><span class="badge ok">개막작 신청</span></div>
        <h3>${esc(EARLYBIRD_MESSAGE)}입니다.</h3>
        <p>후원 여부와 관계없이 신청할 수 있으며, 현장 안내에 따라 입장합니다. 전체 잔여 ${stats.remainingTotal}명</p>
      </div>
    `;
  }
  return `
    <div class="opening-booking-intro general">
      <div class="badges"><span class="badge blue">일반 신청</span></div>
      <h3>일반 신청이 열렸습니다.</h3>
      <p>신청이 접수됩니다. 현장에서 예약번호와 신청자 이름을 알려주세요.</p>
    </div>
  `;
}

function openOpeningBooking(screening) {
  const phase = openingPhaseInfo(screening);
  const stats = openingStats(screening);
  if (!phase.allowBooking) {
    toast(phase.message || "현재 개막작 신청 기간이 아닙니다.");
    return;
  }
  if (remainingSeats(screening) <= 0 && waitlistSeats(screening.id) > 0) {
    toast("현재 정원이 가득 차 대기 신청으로 접수될 수 있습니다.");
  }
  const maxTickets = Math.max(1, Number(screening.maxTicketsPerReservation || 4));
  const isEarlybird = phase.phase === "earlybird";
  const modal = document.getElementById("bookingModal");
  const body = document.getElementById("bookingBody");
  document.getElementById("bookingTitle").textContent = "개막식 영화 <얼굴> 신청";
  body.innerHTML = `
    <div class="card compact" style="margin-bottom:16px;">
      <div class="badges">
        <span class="badge blue">${esc(screening.venue)}</span>
        <span class="badge ${phase.className}">${esc(phase.label)}</span>
        <span class="badge warn">${esc(screening.guest || "박정민 배우")} 참석</span>
      </div>
      <p><strong>${esc(formatDateTime(screening.startTime))}</strong></p>
      <p class="help">정원 ${Number(screening.capacity || 0)}명 · 확정 ${confirmedSeats(screening.id)}명 · 남은 좌석 ${Math.max(remainingSeats(screening), 0)}명 · 대기 ${waitlistSeats(screening.id)}명</p>
    </div>
    ${openingBookingIntro(screening, phase, stats)}
    <form id="bookingForm" data-id="${esc(screening.id)}" data-opening="true" data-ticket-type="${esc(phase.ticketType)}">
      <div class="form-grid">
        <div>
          <label class="label" for="guestName">신청자 이름 <span class="required">*</span></label>
          <input class="input" id="guestName" name="name" autocomplete="name" required />
        </div>
        <div>
          <label class="label" for="guestPhone">연락처 <span class="required">*</span></label>
          <input class="input" id="guestPhone" name="phone" inputmode="tel" autocomplete="tel" required placeholder="010-0000-0000" />
        </div>
        <label class="checkbox-line sms-consent-line full">
          <input type="checkbox" name="smsConsent" checked />
          <span>예약 확정 시 입력한 연락처로 예약 확인 문자를 받겠습니다.</span>
        </label>
        <div>
          <label class="label" for="guestEmail">이메일</label>
          <input class="input" id="guestEmail" name="email" type="email" autocomplete="email" placeholder="선택 입력" />
        </div>
        <div>
          <label class="label" for="guestSeats">신청 인원 <span class="required">*</span></label>
          <input class="input" id="guestSeats" name="seats" type="number" min="1" max="${maxTickets}" value="1" required />
        </div>
        <div class="full">
          <label class="label" for="guestNote">요청 사항</label>
          <textarea class="textarea" id="guestNote" name="note" placeholder="접근성 지원, 동행자 정보, 기타 요청사항"></textarea>
        </div>
      </div>
      <p class="help">개막식 신청은 현장 안내에 따라 입장합니다.</p>
      <div class="form-actions">
        <button class="btn btn-dark" type="submit">개막작 신청 완료</button>
        <button class="btn btn-outline" type="button" data-action="close-modal">취소</button>
      </div>
    </form>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => document.getElementById("guestName")?.focus(), 0);
}

function openBooking(screeningId) {
  const screening = state.screenings.find((s) => s.id === screeningId);
  if (!screening) return toast("상영 정보를 찾을 수 없습니다.");
  if (screening.status === "마감") return toast("이 회차는 현재 신청이 마감되었습니다.");
  if (isOpeningScreening(screening)) return openOpeningBooking(screening);
  const remaining = remainingSeats(screening);
  const modal = document.getElementById("bookingModal");
  const body = document.getElementById("bookingBody");
  document.getElementById("bookingTitle").textContent = screening.title;
  body.innerHTML = `
    <div class="card compact" style="margin-bottom:16px;">
      <div class="badges">
        <span class="badge blue">${esc(screening.venue)}</span>
        <span class="badge ${statusInfo(screening).className}">${esc(statusInfo(screening).text)}</span>
      </div>
      <p><strong>${esc(formatDateTime(screening.startTime))}</strong></p>
      <p class="help">정원 ${Number(screening.capacity || 0)}명 · 확정 ${confirmedSeats(screening.id)}명 · 남은 좌석 ${Math.max(remaining, 0)}명 · 대기 ${waitlistSeats(screening.id)}명</p>
    </div>
    <form id="bookingForm" data-id="${esc(screening.id)}">
      <div class="form-grid">
        <div>
          <label class="label" for="guestName">신청자 이름 <span class="required">*</span></label>
          <input class="input" id="guestName" name="name" autocomplete="name" required />
        </div>
        <div>
          <label class="label" for="guestPhone">연락처 <span class="required">*</span></label>
          <input class="input" id="guestPhone" name="phone" inputmode="tel" autocomplete="tel" required placeholder="010-0000-0000" />
        </div>
        <label class="checkbox-line sms-consent-line full">
          <input type="checkbox" name="smsConsent" checked />
          <span>예약 확정 시 입력한 연락처로 예약 확인 문자를 받겠습니다.</span>
        </label>
        <div>
          <label class="label" for="guestEmail">이메일</label>
          <input class="input" id="guestEmail" name="email" type="email" autocomplete="email" placeholder="선택 입력" />
        </div>
        <div>
          <label class="label" for="guestSeats">참석 인원 <span class="required">*</span></label>
          <input class="input" id="guestSeats" name="seats" type="number" min="1" max="20" value="1" required />
        </div>
        <div class="full">
          <label class="label" for="guestNote">요청 사항</label>
          <textarea class="textarea" id="guestNote" name="note" placeholder="접근성 지원, 단체 참석, 기타 요청사항"></textarea>
        </div>
      </div>
      <p class="help">남은 좌석보다 많이 신청하면 대기 신청으로 접수됩니다. 운영진이 연락처로 확정 여부를 안내할 수 있습니다.</p>
      <div class="donation-mini">
        <strong>신청 후 후원도 함께해 주세요.</strong>
        <span>주민들이 직접 만드는 영화제가 계속 이어질 수 있도록 작은 후원의 손길을 보태주세요.</span>
      </div>
      <div class="form-actions">
        <button class="btn btn-dark" type="submit">신청 완료</button>
        <button class="btn btn-outline" type="button" data-action="close-modal">취소</button>
      </div>
    </form>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => document.getElementById("guestName")?.focus(), 0);
}

function openRoster(screeningId) {
  const screening = state.screenings.find((s) => s.id === screeningId);
  if (!screening) return toast("상영 정보를 찾을 수 없습니다.");
  const reservations = getReservations(screeningId, { includeCanceled: true }).sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
  const modal = document.getElementById("rosterModal");
  const body = document.getElementById("rosterBody");
  document.getElementById("rosterTitle").textContent = `${screening.title} 신청자`;
  body.innerHTML = `
    <div class="card compact" style="margin-bottom:16px;">
      <p><strong>${esc(screening.venue)} · ${esc(formatDateTime(screening.startTime))}</strong></p>
      <p class="help">정원 ${Number(screening.capacity || 0)}명 · 신청 ${applicationCount(screening.id)}건/${appliedSeats(screening.id)}명 · 실제 참석 ${attendedApplicationCount(screening.id)}건/${actualAttendees(screening.id)}명 · 대기 ${waitlistSeats(screening.id)}명</p>
    </div>
    ${reservations.length ? reservationTable(reservations) : `<div class="empty">아직 신청자가 없습니다.</div>`}
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModals() {
  document.querySelectorAll(".modal-backdrop").forEach((modal) => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
}

function hydrateRoute(route, sub) {
  if (route === "apply") {
    updateScreeningList();
    ["searchInput", "venueFilter", "dateFilter", "seatFilter"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateScreeningList);
      document.getElementById(id)?.addEventListener("change", updateScreeningList);
    });
  }
  if (route === "admin" && sub === "reservations" && isAdminAuthed()) {
    updateReservationTable();
    ["reservationSearch", "reservationScreeningFilter", "reservationAttendanceFilter", "reservationDatePreset", "reservationDateFilter"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateReservationTable);
      document.getElementById(id)?.addEventListener("change", updateReservationTable);
    });
    document.getElementById("reservationDatePreset")?.addEventListener("change", () => {
      const direct = document.getElementById("reservationDateFilter");
      if (direct) direct.value = "";
      updateReservationTable();
    });
    document.getElementById("reservationDateFilter")?.addEventListener("change", () => {
      const preset = document.getElementById("reservationDatePreset");
      if (preset) preset.value = "";
      updateReservationTable();
    });
  }
  if (route === "admin" && sub === "backup" && isAdminAuthed()) {
    document.getElementById("importJson")?.addEventListener("change", importJsonBackup);
  }
}

function updateScreeningList() {
  const search = document.getElementById("searchInput")?.value.trim().toLowerCase() || "";
  const venue = document.getElementById("venueFilter")?.value || "";
  const date = document.getElementById("dateFilter")?.value || "";
  const seat = document.getElementById("seatFilter")?.value || "";
  const list = document.getElementById("screeningList");
  if (!list) return;
  const filtered = sortedScreenings().filter((screening) => {
    const text = `${screening.title} ${screening.venue} ${screening.gvHost} ${screening.moderator} ${screening.staff}`.toLowerCase();
    const info = statusInfo(screening);
    const matchSearch = !search || text.includes(search);
    const matchVenue = !venue || screening.venue === venue;
    const matchDate = !date || formatDateOnly(screening.startTime) === date;
    let matchSeat = true;
    if (seat === "available") matchSeat = info.className === "ok";
    if (seat === "almost") matchSeat = info.className === "warn";
    if (seat === "full") matchSeat = info.className === "danger";
    return matchSearch && matchVenue && matchDate && matchSeat;
  });
  list.innerHTML = filtered.length ? filtered.map(screeningCard).join("") : `<div class="empty" style="grid-column:1/-1;">조건에 맞는 상영작이 없습니다.</div>`;
}

function updateReservationTable() {
  const search = document.getElementById("reservationSearch")?.value.trim().toLowerCase() || "";
  const screeningId = document.getElementById("reservationScreeningFilter")?.value || "";
  const attendance = document.getElementById("reservationAttendanceFilter")?.value || "";
  const presetDate = document.getElementById("reservationDatePreset")?.value || "";
  const customDate = document.getElementById("reservationDateFilter")?.value || "";
  const date = customDate || presetDate;
  const container = document.getElementById("reservationTable");
  if (!container) return;
  const filtered = [...state.reservations]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .filter((reservation) => {
      const screening = state.screenings.find((s) => s.id === reservation.screeningId);
      const text = `${reservation.id} ${reservation.name} ${reservation.phone} ${reservation.email} ${reservation.note} ${reservation.donorName || ""} ${screening?.title || ""} ${screening?.venue || ""}`.toLowerCase();
      const matchAttendance = !attendance || (attendance === "attended" ? reservation.attended === true : reservation.attended !== true);
      const matchDate = !date || String(screening?.startTime || "").slice(0, 10) === date;
      return (!search || text.includes(search)) && (!screeningId || reservation.screeningId === screeningId) && matchAttendance && matchDate;
    });
  container.innerHTML = reservationTable(filtered, { smsSelectMode: reservationSmsSelectMode });
  updateBulkSmsSelectedCount();
}

function updateBulkSmsSelectedCount() {
  const el = document.getElementById("bulkSmsSelectedCount");
  if (el) el.textContent = `선택 ${selectedReservationSmsIds.size}명`;
}

function refreshReservationView() {
  if (document.getElementById("reservationTable")) updateReservationTable();
  else render();
}

function setSelectedReservationAction(id) {
  selectedReservationActionId = id || null;
  refreshReservationView();
}

function visibleReservationIdsForSms() {
  return Array.from(document.querySelectorAll("[data-reservation-check]")).map((checkbox) => checkbox.dataset.reservationCheck).filter(Boolean);
}

function getSelectedReservationsForSms() {
  return [...selectedReservationSmsIds]
    .map((id) => state.reservations.find((reservation) => reservation.id === id))
    .filter(Boolean);
}

function setBulkSmsMode(enabled) {
  reservationSmsSelectMode = enabled;
  if (!enabled) selectedReservationSmsIds = new Set();
  render();
  if (enabled) toast("문자 발송할 신청자를 체크하세요.");
}

function selectVisibleReservationsForSms() {
  visibleReservationIdsForSms().forEach((id) => selectedReservationSmsIds.add(id));
  updateReservationTable();
  toast("현재 보이는 신청자를 선택했습니다.");
}

function deselectVisibleReservationsForSms() {
  visibleReservationIdsForSms().forEach((id) => selectedReservationSmsIds.delete(id));
  updateReservationTable();
  toast("현재 보이는 신청자의 문자 선택을 해제했습니다.");
}

function clearBulkSmsSelection() {
  selectedReservationSmsIds = new Set();
  updateReservationTable();
  toast("문자 발송 선택을 해제했습니다.");
}

async function bulkSendReservationSms() {
  const reservations = getSelectedReservationsForSms();
  if (!reservations.length) return toast("문자를 보낼 신청자를 체크해 주세요.");
  if (!confirm(`선택한 ${reservations.length}명에게 예약 관련 문자를 다시 보낼까요?`)) return;
  let success = 0;
  for (const reservation of reservations) {
    const screening = state.screenings.find((item) => item.id === reservation.screeningId);
    if (await sendReservationSms(reservation, screening, { manual: true })) success += 1;
  }
  toast(`예약 관련 문자 발송 요청 완료: ${success}/${reservations.length}명`);
}

function openNoticeSmsModalForReservations(reservations) {
  if (!reservations.length) return toast("별도 안내문자를 보낼 신청자를 선택해 주세요.");
  const modal = document.getElementById("bookingModal");
  const body = document.getElementById("bookingBody");
  if (!modal || !body) return;
  document.getElementById("bookingTitle").textContent = "별도 안내문자 보내기";
  body.innerHTML = `
    <form id="bulkSmsNoticeForm" class="form-stack">
      <p class="help">선택한 ${reservations.length}명에게 같은 안내문자를 보냅니다. 예약번호가 필요한 경우 본문에 직접 입력해 주세요.</p>
      <label class="label" for="bulkSmsNoticeMessage">안내문자 내용</label>
      <textarea class="textarea" id="bulkSmsNoticeMessage" name="message" rows="8" placeholder="예: 오늘 상영은 예정대로 진행됩니다. 상영 10분 전까지 도착해 주세요." required></textarea>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">선택자에게 문자발송하기</button>
        <button class="btn btn-outline" type="button" data-action="close-modal">닫기</button>
      </div>
    </form>
  `;
  selectedReservationSmsIds = new Set(reservations.map((reservation) => reservation.id));
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function openBulkNoticeSmsModal() {
  const reservations = getSelectedReservationsForSms();
  if (!reservations.length) return toast("별도 안내문자를 보낼 신청자를 체크해 주세요.");
  openNoticeSmsModalForReservations(reservations);
}

function openSingleNoticeSmsModal(id) {
  const reservation = state.reservations.find((item) => item.id === id);
  if (!reservation) return toast("신청자를 찾을 수 없습니다.");
  openNoticeSmsModalForReservations([reservation]);
}


async function sendNoticeSms(reservation, message) {
  const phone = normalizePhoneForSms(reservation.phone);
  if (!phone || phone.length < 10) return false;
  if (window.location.protocol !== "http:" && window.location.protocol !== "https:") {
    toast("배포 주소에서 열어야 네이버 SENS 문자가 발송됩니다.");
    return false;
  }
  const screening = state.screenings.find((item) => item.id === reservation.screeningId);
  try {
    const response = await fetch(SMS_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "notice",
        phone,
        name: reservation.name,
        reservationNumber: reservationDisplayNumber(reservation, screening),
        movieTitle: cleanMovieTitle(screening?.title),
        message
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) throw new Error(result.error || `HTTP ${response.status}`);
    reservation.noticeSmsStatus = "발송완료";
    reservation.noticeSmsSentAt = new Date().toISOString();
    return true;
  } catch (error) {
    reservation.noticeSmsStatus = "발송실패";
    reservation.noticeSmsError = String(error?.message || error).slice(0, 80);
    return false;
  }
}

async function submitBulkNoticeSms(form) {
  const message = String(new FormData(form).get("message") || "").trim();
  if (!message) return toast("보낼 안내문자를 입력해 주세요.");
  const reservations = getSelectedReservationsForSms();
  if (!reservations.length) return toast("문자를 보낼 신청자가 선택되지 않았습니다.");
  if (!confirm(`선택한 ${reservations.length}명에게 별도 안내문자를 보낼까요?`)) return;
  const submit = form.querySelector('button[type="submit"]');
  if (submit) { submit.disabled = true; submit.textContent = "발송 중..."; }
  let success = 0;
  for (const reservation of reservations) {
    if (await sendNoticeSms(reservation, message)) success += 1;
  }
  persist();
  closeModals();
  updateReservationTable();
  toast(`별도 안내문자 발송 요청 완료: ${success}/${reservations.length}명`);
}

function handleDonate() {
  state.sponsorClicks = Number(state.sponsorClicks || 0) + 1;
  persist();
  window.location.hash = "#/donate";
}

function toast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => el.classList.remove("show"), 3200);
}

function smsStatusLabel(reservation) {
  if (reservation?.smsConsent === false) return "문자 미동의";
  const status = reservation?.smsStatus || "미발송";
  if (status === "발송완료") return "문자 발송완료";
  if (status === "발송중") return "문자 발송중";
  if (status === "발송실패") return "문자 실패";
  if (status === "배포 후 발송 대기") return "문자 배포대기";
  return "문자 미발송";
}

function smsStatusClass(reservation) {
  const status = reservation?.smsStatus || "미발송";
  if (reservation?.smsConsent === false) return "neutral";
  if (status === "발송완료") return "ok";
  if (status === "발송중") return "blue";
  if (status === "발송실패") return "danger";
  if (status === "배포 후 발송 대기") return "warn";
  return "neutral";
}

function reservationSmsPeople(reservation) {
  return `${Math.max(1, Number(reservation.seats || 1))}명`;
}

function reservationSmsSeatPeople(reservation, screening) {
  return `${reservationSeatLabel(reservation, screening)} / ${reservationSmsPeople(reservation)}`;
}

function reservationConfirmationMessage(reservation, screening, status) {
  const statusLabel = status || reservation.status || "확정";
  const movieTitle = cleanMovieTitle(screening?.title);
  const venue = screening?.venue || "상영관 미정";
  const time = formatSmsDateTime(screening?.startTime);
  const statusText = statusLabel === "확정" ? "예약이 완료되었습니다." : "대기 신청으로 접수되었습니다.";
  return [
    `${reservation.name} 님 ${statusText}`,
    `예약번호: ${reservationDisplayNumber(reservation, screening)}`,
    `영화명: ${movieTitle}`,
    `좌석/인원: ${reservationSmsSeatPeople(reservation, screening)}`,
    `일시: ${time}`,
    `장소: ${venue}`,
    "상영 당일 현장에서 예약번호와 신청자 이름을 알려주세요."
  ].join("\n");
}

function reservationSmsMessage(reservation, screening) {
  return reservationConfirmationMessage(reservation, screening, "확정");
}

function reservationSmsPayload(reservation, screening) {
  return {
    reservationId: reservationDisplayNumber(reservation, screening),
    reservationNumber: reservationDisplayNumber(reservation, screening),
    name: String(reservation.name || "").trim(),
    phone: normalizePhoneForSms(reservation.phone),
    movieTitle: cleanMovieTitle(screening?.title),
    people: reservationSmsPeople(reservation),
    seatPeople: reservationSmsSeatPeople(reservation, screening),
    dateTime: formatSmsDateTime(screening?.startTime),
    venue: screening?.venue || "상영관 미정"
  };
}

function smsStatusText(reservation) {
  if (reservation?.smsConsent === false) return "수신 미동의";
  if (reservation?.smsStatus === "발송완료") return `발송완료${reservation.smsSentAt ? ` · ${formatDateTime(reservation.smsSentAt)}` : ""}`;
  if (reservation?.smsStatus === "발송중") return "발송중";
  if (reservation?.smsStatus === "배포 후 발송 대기") return "배포 후 발송 대기";
  if (reservation?.smsStatus === "발송실패") return `발송실패${reservation.smsError ? ` · ${reservation.smsError}` : ""}`;
  return reservation?.smsStatus || "미발송";
}

function updateReservationSmsState(reservation, patch) {
  Object.assign(reservation, patch);
  persist();
  const escapedId = window.CSS && CSS.escape ? CSS.escape(reservation.id) : String(reservation.id).replaceAll('"', '\\"');
  const statusEl = document.querySelector(`[data-sms-status-for="${escapedId}"]`);
  if (statusEl) statusEl.textContent = smsStatusText(reservation);
  updateReservationTable();
}

async function sendReservationSms(reservationOrId, screening = null, options = {}) {
  const manual = options.manual === true;
  const reservation = typeof reservationOrId === "string"
    ? state.reservations.find((item) => item.id === reservationOrId)
    : reservationOrId;
  if (!reservation) {
    if (manual) toast("예약 정보를 찾을 수 없습니다.");
    return false;
  }
  const targetScreening = screening || state.screenings.find((item) => item.id === reservation.screeningId);
  if (reservation.status !== "확정") {
    if (manual) toast("확정된 예약만 예약 완료 문자를 발송할 수 있습니다.");
    return false;
  }
  if (reservation.smsConsent === false && !manual) return false;
  const payload = reservationSmsPayload(reservation, targetScreening);
  if (!payload.phone || payload.phone.length < 10) {
    updateReservationSmsState(reservation, { smsStatus: "발송실패", smsError: "연락처 확인 필요" });
    if (manual) toast("연락처가 올바르지 않아 문자를 보낼 수 없습니다.");
    return false;
  }
  const protocol = window.location.protocol;
  if (protocol !== "http:" && protocol !== "https:") {
    updateReservationSmsState(reservation, { smsStatus: "배포 후 발송 대기", smsError: "로컬 파일에서는 SENS API 호출 불가" });
    if (manual) toast("배포 주소에서 열어야 네이버 SENS 문자가 발송됩니다.");
    return false;
  }
  updateReservationSmsState(reservation, { smsStatus: "발송중", smsError: "" });
  try {
    const response = await fetch(SMS_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) {
      throw new Error(result.error || `HTTP ${response.status}`);
    }
    updateReservationSmsState(reservation, {
      smsStatus: "발송완료",
      smsSentAt: new Date().toISOString(),
      smsRequestId: result.requestId || "",
      smsError: ""
    });
    toast("예약 확인 문자를 발송했습니다.");
    return true;
  } catch (error) {
    updateReservationSmsState(reservation, {
      smsStatus: "발송실패",
      smsError: String(error?.message || error).slice(0, 80)
    });
    if (manual) toast("문자 발송에 실패했습니다. SENS 설정을 확인해주세요.");
    else toast("예약은 완료되었지만 문자 자동발송 설정을 확인해야 합니다.");
    return false;
  }
}

function sendReservationSmsById(id) {
  sendReservationSms(id, null, { manual: true }).then(() => render());
}

function autoSendReservationSms(reservation, screening, status) {
  if (!AUTO_SEND_SMS_ON_CONFIRMED_RESERVATION) return;
  if (status !== "확정" || reservation.smsConsent === false) return;
  window.setTimeout(() => sendReservationSms(reservation, screening, { manual: false }), 250);
}

function formatMessageHtml(message) {
  return esc(message).replaceAll("\n", "<br>");
}

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    toast("확인 메시지를 복사했습니다. 카톡·문자·메일에 붙여넣을 수 있습니다.");
  } catch (error) {
    toast("복사에 실패했습니다. 예약번호를 직접 복사해주세요.");
  }
}

function copyReservationConfirmation(reservationId) {
  const reservation = state.reservations.find((r) => r.id === reservationId);
  if (!reservation) return toast("예약 정보를 찾을 수 없습니다.");
  const screening = state.screenings.find((s) => s.id === reservation.screeningId);
  copyTextToClipboard(reservationConfirmationMessage(reservation, screening, reservation.status));
}
function openSmsConfirmation(message, reservation) {
  const phone = String(reservation?.phone || "").replace(/[^0-9+]/g, "");
  window.location.href = `sms:${encodeURIComponent(phone)}?&body=${encodeURIComponent(message)}`;
  toast("문자 앱에 예약 확인 문구를 넣었습니다. 전송 버튼을 눌러 보관하세요.");
}

function openEmailConfirmation(message, reservation) {
  const email = String(reservation?.email || "").trim();
  const subject = "제9회 머내마을영화제 예약 확인";
  window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  toast(email ? "메일 앱에 예약 확인 문구를 넣었습니다." : "이메일 주소가 없어 받는 사람을 직접 입력해야 합니다.");
}

async function shareConfirmationMessage(message) {
  if (navigator.share) {
    try {
      await navigator.share({ title: "제9회 머내마을영화제 예약 확인", text: message });
      toast("예약 확인 정보를 공유했습니다.");
      return;
    } catch (error) {
      if (error && error.name === "AbortError") return;
    }
  }
  await copyTextToClipboard(message);
}

function showReservationComplete(reservation, status) {
  document.getElementById("reservationCompleteModal")?.remove();
  const isConfirmed = status === "확정";
  const screening = state.screenings.find((s) => s.id === reservation.screeningId);
  const openingReservation = isOpeningScreening(screening);
  const confirmationMessage = reservationConfirmationMessage(reservation, screening, status);
  const title = openingReservation
    ? (isConfirmed ? "개막작 신청이 확정되었습니다." : "개막작 대기 신청으로 접수되었습니다.")
    : (isConfirmed ? "신청이 확정되었습니다." : "대기 신청으로 접수되었습니다.");
  const description = openingReservation
    ? (isConfirmed
      ? `개막식 신청이 접수되었습니다. 상영 당일 현장에서 예약번호와 신청자 이름을 알려주세요.`
      : "좌석이 부족해 대기 신청으로 접수되었습니다. 운영진이 연락처로 확정 여부를 안내할 수 있습니다.")
    : (isConfirmed
      ? "상영 당일 현장에서 예약번호와 신청자 이름을 알려주세요."
      : "정원이 부족해 대기 신청으로 접수되었습니다. 운영진이 연락처로 확정 여부를 안내할 수 있습니다.");
  const modal = document.createElement("div");
  modal.className = "modal-backdrop open reservation-complete-modal";
  modal.id = "reservationCompleteModal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "false");
  modal.innerHTML = `
    <div class="modal reservation-result-modal">
      <div class="modal-header">
        <h3>신청 완료</h3>
        <button class="close-btn" type="button" data-result="confirm" aria-label="닫기">×</button>
      </div>
      <div class="modal-body">
        <div class="support-complete">
          <div class="icon-badge">✓</div>
          <div>
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
        </div>
        <div class="reservation-number-box">
          <span>예약번호</span>
          <strong>${esc(reservationDisplayNumber(reservation, screening))}</strong>
        </div>
        <div class="confirmation-message-box">
          <div class="confirmation-message-head">
            <strong>카톡·문자·메일 확인 메시지</strong>
            <button class="btn btn-outline btn-small" type="button" data-result="copy-confirmation">예약정보 복사</button>
          </div>
          <p>${formatMessageHtml(confirmationMessage)}</p>
          <div class="confirmation-message-actions">
            <button class="btn btn-outline btn-small" type="button" data-result="share-confirmation">카톡·공유</button>
            <button class="btn btn-outline btn-small" type="button" data-result="sms-confirmation">문자로 보내기</button>
            <button class="btn btn-outline btn-small" type="button" data-result="email-confirmation">메일로 보내기</button>
          </div>
        </div>
        <div class="form-actions result-actions">
          <button class="btn btn-primary" type="button" data-result="confirm">확인</button>
        </div>
      </div>
    </div>
  `;
  modal.addEventListener("click", (event) => {
    if (event.target === modal) return;
    const button = event.target.closest("[data-result]");
    if (!button) return;
    const result = button.dataset.result;
    if (result === "copy-confirmation") {
      copyTextToClipboard(confirmationMessage);
      return;
    }
    if (result === "share-confirmation") {
      shareConfirmationMessage(confirmationMessage);
      return;
    }
    if (result === "sms-confirmation") {
      openSmsConfirmation(confirmationMessage, reservation);
      return;
    }
    if (result === "email-confirmation") {
      openEmailConfirmation(confirmationMessage, reservation);
      return;
    }
    modal.remove();
    toast("신청이 완료되었습니다.");
  });
  document.body.appendChild(modal);
  setTimeout(() => modal.querySelector('[data-result="confirm"]')?.focus(), 0);
}

function formDataObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function submitOpeningBooking(form, screening, data) {
  const phase = openingPhaseInfo(screening);
  if (!phase.allowBooking) return toast(phase.message || "현재 개막작 신청 기간이 아닙니다.");
  const seats = Math.max(1, Number(data.seats || 1));
  const maxTickets = Math.max(1, Number(screening.maxTicketsPerReservation || 4));
  if (seats > maxTickets) return toast(`개막작은 1회 최대 ${maxTickets}명까지 신청할 수 있습니다.`);

  const isEarlybird = phase.phase === "earlybird";
  const ticketType = isEarlybird ? "사전신청" : "일반";
  const seatType = "";
  const seatAssignment = "";
  const donorName = "";
  const status = "확정";

  const reservation = normalizeReservation({
    id: uid("rsv"),
    reservationNumber: nextVenueReservationNumber(screening),
    screeningId: screening.id,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    seats,
    status,
    attended: false,
    attendedSeats: 0,
    attendedAt: "",
    ticketType,
    seatType,
    seatAssignment,
    donorName,
    smsConsent: data.smsConsent === "on",
    smsStatus: "미발송",
    smsSentAt: "",
    smsRequestId: "",
    smsError: "",
    note: data.note.trim(),
    createdAt: new Date().toISOString()
  });
  state.reservations.push(reservation);
  persist();
  closeModals();
  render();
  const message = status === "확정" ? `개막작 신청이 확정되었습니다. 예약번호: ${reservationDisplayNumber(reservation, screening)}` : `개막작 대기 신청으로 접수되었습니다. 예약번호: ${reservationDisplayNumber(reservation, screening)}`;
  toast(message);
  showReservationComplete(reservation, status);
  autoSendReservationSms(reservation, screening, status);
}

function submitOpeningSettings(form) {
  const data = formDataObject(form);
  const opening = getOpeningScreening();
  const capacity = Math.max(1, Number(data.capacity || 1));
  const designatedSeatCount = 0;
  const payload = normalizeScreening({
    ...opening,
    title: data.title.trim(),
    venue: data.venue.trim(),
    startTime: data.startTime,
    endTime: data.endTime,
    capacity,
    gvHost: data.gvHost.trim(),
    moderator: data.moderator.trim(),
    staff: data.staff.trim(),
    staffPhone: data.staffPhone.trim(),
    staffPin: String(data.staffPin || opening.staffPin || "").trim(),
    status: data.status,
    notes: data.notes.trim(),
    isOpening: true,
    guest: data.guest.trim() || "박정민 배우",
    festivalStartDate: data.festivalStartDate || FESTIVAL_START_DATE,
    festivalEndDate: data.festivalEndDate || FESTIVAL_END_DATE,
    openingMainEndAt: data.openingMainEndAt || OPENING_MAIN_END_AT,
    posterSrc: String(data.posterSrc || OPENING_POSTER_SRC).trim() || OPENING_POSTER_SRC,
    videoUrl: String(data.videoUrl || OPENING_VIDEO_URL).trim() || OPENING_VIDEO_URL,
    videoEmbedUrl: youtubeEmbedUrl(data.videoUrl || OPENING_VIDEO_URL),
    videoTitle: opening.videoTitle || OPENING_VIDEO_TITLE,
    earlyBirdStart: data.earlyBirdStart,
    earlyBirdEnd: data.earlyBirdEnd,
    generalOpenAt: data.generalOpenAt || data.earlyBirdEnd,
    generalEndAt: data.generalEndAt || data.startTime,
    designatedSeatCount,
    seatPrefix: "",
    maxTicketsPerReservation: Math.max(1, Number(data.maxTicketsPerReservation || 4))
  });
  state.screenings = state.screenings.map((screening) => screening.id === opening.id ? payload : screening);
  if (!state.screenings.some((screening) => screening.id === opening.id)) state.screenings.unshift(payload);
  persist();
  render();
  toast("개막작 티켓팅 설정을 저장했습니다.");
}

function submitBooking(form) {
  const data = formDataObject(form);
  const screening = state.screenings.find((s) => s.id === form.dataset.id);
  if (!screening) return toast("상영 정보를 찾을 수 없습니다.");
  if (form.dataset.opening === "true" || isOpeningScreening(screening)) return submitOpeningBooking(form, screening, data);
  const seats = Math.max(1, Number(data.seats || 1));
  const status = "확정";
  const reservation = normalizeReservation({
    id: uid("rsv"),
    reservationNumber: nextVenueReservationNumber(screening),
    screeningId: screening.id,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    seats,
    status,
    attended: false,
    attendedSeats: 0,
    attendedAt: "",
    smsConsent: data.smsConsent === "on",
    smsStatus: "미발송",
    smsSentAt: "",
    smsRequestId: "",
    smsError: "",
    note: data.note.trim(),
    createdAt: new Date().toISOString()
  });
  state.reservations.push(reservation);
  persist();
  closeModals();
  render();
  const message = status === "확정" ? `신청이 확정되었습니다. 예약번호: ${reservationDisplayNumber(reservation, screening)}` : `대기 신청으로 접수되었습니다. 예약번호: ${reservationDisplayNumber(reservation, screening)}`;
  toast(message);
  showReservationComplete(reservation, status);
  autoSendReservationSms(reservation, screening, status);
}

function submitAdminLogin(form) {
  const pin = new FormData(form).get("pin");
  if (pin === String(state.adminPin || ADMIN_PIN)) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    toast("관리자 대시보드에 로그인했습니다.");
    render();
  } else {
    toast("PIN이 맞지 않습니다.");
  }
}

function submitAdminPinChange(form) {
  const pin = String(new FormData(form).get("adminPin") || "").trim();
  if (!pin) return toast("새 총관리자 비밀번호를 입력해 주세요.");
  state.adminPin = pin;
  persist();
  form.reset();
  const field = document.getElementById("adminNewPin");
  if (field) field.value = pin;
  toast("총관리자 비밀번호를 저장했습니다.");
}

function submitScreening(form) {
  const data = formDataObject(form);
  const payload = {
    title: data.title.trim(),
    venue: data.venue.trim(),
    startTime: data.startTime,
    endTime: data.endTime,
    capacity: Math.max(1, Number(data.capacity || 1)),
    gvHost: data.gvHost.trim(),
    moderator: data.moderator.trim(),
    staff: data.staff.trim(),
    staffPhone: data.staffPhone.trim(),
    staffPin: String(data.staffPin || "").trim(),
    status: data.status,
    notes: data.notes.trim()
  };
  const editingId = form.dataset.editing;
  if (editingId) {
    state.screenings = state.screenings.map((screening) => screening.id === editingId ? { ...screening, ...payload } : screening);
    selectedScreeningId = null;
    toast("상영 회차를 수정했습니다.");
  } else {
    state.screenings.push({ id: uid("scr"), ...payload });
    toast("상영 회차를 추가했습니다.");
  }
  persist();
  render();
}

function deleteScreening(id) {
  const screening = state.screenings.find((s) => s.id === id);
  if (!screening) return;
  const count = state.reservations.filter((r) => r.screeningId === id).length;
  const message = count ? `“${screening.title}” 회차와 신청 ${count}건을 함께 삭제할까요?` : `“${screening.title}” 회차를 삭제할까요?`;
  if (!confirm(message)) return;
  state.screenings = state.screenings.filter((s) => s.id !== id);
  state.reservations = state.reservations.filter((r) => r.screeningId !== id);
  if (selectedScreeningId === id) selectedScreeningId = null;
  persist();
  render();
  toast("상영 회차를 삭제했습니다.");
}

function setReservationStatus(id, status) {
  const reservation = state.reservations.find((r) => r.id === id);
  if (!reservation) return;
  if (!canManageReservation(reservation)) return toast("이 신청자를 관리할 권한이 없습니다.");
  const screening = state.screenings.find((s) => s.id === reservation.screeningId);
  const previousStatus = reservation.status;

  if (isOpeningScreening(screening)) {
    reservation.seatType = "";
    reservation.seatAssignment = "";
  }

  reservation.status = status;
  if (status === "취소") {
    reservation.attended = false;
    reservation.attendedSeats = 0;
    reservation.attendedAt = "";
  }
  persist();
  render();
  toast(`신청 상태를 ${status}(으)로 변경했습니다.`);
  if (status === "확정" && previousStatus !== "확정") autoSendReservationSms(reservation, screening, status);
}

function setAttendance(id, attended) {
  const reservation = state.reservations.find((r) => r.id === id);
  if (!reservation) return;
  if (!canManageReservation(reservation)) return toast("이 신청자를 관리할 권한이 없습니다.");
  if (attended === true) {
    const requestedSeats = Math.max(1, Number(reservation.seats || 1));
    const input = prompt(`${reservation.name}님의 실제 참석 인원을 입력하세요.`, String(reservation.attendedSeats || requestedSeats));
    if (input === null) return;
    const attendedSeats = Number(input);
    if (!Number.isFinite(attendedSeats) || attendedSeats < 0) {
      return toast("실제 참석 인원을 0 이상의 숫자로 입력해주세요.");
    }
    reservation.status = "확정";
    reservation.attended = attendedSeats > 0;
    reservation.attendedSeats = attendedSeats;
    reservation.seats = Math.floor(attendedSeats);
    reservation.attendedAt = reservation.attended ? new Date().toISOString() : "";
  } else {
    reservation.attended = false;
    reservation.attendedSeats = 0;
    reservation.attendedAt = "";
  }

  persist();
  const rosterOpen = document.getElementById("rosterModal")?.classList.contains("open");
  const screeningId = reservation.screeningId;
  render();
  if (rosterOpen) openRoster(screeningId);
  toast(reservation.attended ? `실제 참석 ${reservation.attendedSeats}명으로 기록했습니다.` : "미참석으로 되돌렸습니다.");
}

function staffAddReservation() {
  const screenings = staffScreenings();
  if (!screenings.length) return toast("스태프 로그인이 필요합니다.");
  const choices = screenings.map((s, i) => `${i + 1}. ${s.venue} · ${s.title} · ${formatDateTime(s.startTime)}`).join("\n");
  const selected = prompt(`신청자를 추가할 회차 번호를 입력하세요.\n${choices}`, "1");
  if (selected === null) return;
  const screening = screenings[Number(selected) - 1];
  if (!screening) return toast("올바른 회차 번호를 입력하세요.");
  const name = prompt("신청자 이름을 입력하세요.", ""); if (!name?.trim()) return;
  const phone = prompt("연락처를 입력하세요.", "") || "";
  const seats = Math.max(1, Number(prompt("신청 인원을 입력하세요.", "1") || 1));
  const note = prompt("메모를 입력하세요.", "") || "";
  state.reservations.push(normalizeReservation({ id: uid("rsv"), reservationNumber: nextVenueReservationNumber(screening), screeningId: screening.id, name:name.trim(), phone:phone.trim(), email:"", seats, status:"확정", attended:false, attendedSeats:0, note:note.trim(), createdAt:new Date().toISOString() }));
  persist(); render(); toast("신청자를 추가했습니다.");
}

function staffEditReservation(id) {
  const r = state.reservations.find((x) => x.id === id);
  if (!r || !canManageReservation(r)) return toast("이 신청자를 관리할 권한이 없습니다.");
  const screening = state.screenings.find((s) => s.id === r.screeningId);
  const modal = document.getElementById("bookingModal");
  const body = document.getElementById("bookingBody");
  document.getElementById("bookingTitle").textContent = "신청자 정보 수정";
  const screeningOptions = sortedScreenings().map((s) => `<option value="${esc(s.id)}" ${s.id === r.screeningId ? "selected" : ""}>${esc(s.venue)} · ${esc(s.title)} · ${esc(formatDateTime(s.startTime))}</option>`).join("");
  body.innerHTML = `
    <form id="reservationEditForm" data-id="${esc(r.id)}">
      <div class="form-grid">
        <div class="full">
          <label class="label" for="editScreeningId">영화 / 상영관 / 시간</label>
          <select class="select" id="editScreeningId" name="screeningId">${screeningOptions}</select>
        </div>
        <div>
          <label class="label" for="editName">신청자 이름</label>
          <input class="input" id="editName" name="name" value="${esc(r.name || "")}" required />
        </div>
        <div>
          <label class="label" for="editPhone">연락처</label>
          <input class="input" id="editPhone" name="phone" value="${esc(r.phone || "")}" />
        </div>
        <div>
          <label class="label" for="editEmail">이메일</label>
          <input class="input" id="editEmail" name="email" type="email" value="${esc(r.email || "")}" />
        </div>
        <div>
          <label class="label" for="editReservationNumber">예약번호</label>
          <input class="input" id="editReservationNumber" name="reservationNumber" value="${esc(reservationDisplayNumber(r, screening))}" />
        </div>
        <div>
          <label class="label" for="editTicketType">티켓 구분</label>
          <select class="select" id="editTicketType" name="ticketType">
            <option value="사전신청" ${r.ticketType === "사전신청" ? "selected" : ""}>개막작 신청</option>
            <option value="일반" ${r.ticketType === "일반" ? "selected" : ""}>일반 신청</option>
            <option value="" ${!r.ticketType ? "selected" : ""}>일반상영</option>
          </select>
        </div>
        <div>
          <label class="label" for="editSeatAssignment">좌석</label>
          <input class="input" id="editSeatAssignment" name="seatAssignment" value="${esc(r.seatAssignment || "")}" placeholder="예: A-001 또는 자유석" />
        </div>
        <div>
          <label class="label" for="editSeats">인원</label>
          <input class="input" id="editSeats" name="seats" type="number" min="0" value="${Number(r.seats || 0)}" />
        </div>
        <div>
          <label class="label" for="editAttendedSeats">실제 참석 인원</label>
          <input class="input" id="editAttendedSeats" name="attendedSeats" type="number" min="0" value="${Number(r.attendedSeats || 0)}" />
        </div>
        <div>
          <label class="label" for="editStatus">상태</label>
          <select class="select" id="editStatus" name="status">
            <option ${r.status === "확정" ? "selected" : ""}>확정</option>
            <option ${r.status === "대기" ? "selected" : ""}>대기</option>
            <option ${r.status === "취소" ? "selected" : ""}>취소</option>
          </select>
        </div>
        <div>
          <label class="label" for="editDonorName">후원자명/입금자명</label>
          <input class="input" id="editDonorName" name="donorName" value="${esc(r.donorName || "")}" />
        </div>
        <label class="checkbox-line sms-consent-line full">
          <input type="checkbox" name="smsConsent" ${r.smsConsent === false ? "" : "checked"} />
          <span>예약 확인 문자 수신 동의</span>
        </label>
        <div class="full">
          <label class="label" for="editNote">메모</label>
          <textarea class="textarea" id="editNote" name="note">${esc(r.note || "")}</textarea>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-dark" type="submit">수정 저장</button>
        <button class="btn btn-outline" type="button" data-action="close-modal">닫기</button>
      </div>
    </form>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => document.getElementById("editName")?.focus(), 0);
}

function submitReservationEdit(form) {
  const id = form.dataset.id;
  const r = state.reservations.find((x) => x.id === id);
  if (!r || !canManageReservation(r)) return toast("이 신청자를 관리할 권한이 없습니다.");
  const data = formDataObject(form);
  const seats = Math.max(0, Math.floor(Number(data.seats || 0)));
  const attendedSeats = Math.max(0, Math.floor(Number(data.attendedSeats || 0)));
  r.screeningId = data.screeningId || r.screeningId;
  r.name = String(data.name || "").trim();
  r.phone = String(data.phone || "").trim();
  r.email = String(data.email || "").trim();
  r.reservationNumber = String(data.reservationNumber || "").trim();
  r.ticketType = String(data.ticketType || "").trim();
  r.seatAssignment = String(data.seatAssignment || "").trim();
  r.seatType = r.seatAssignment ? "지정좌석" : "";
  r.seats = seats;
  r.attendedSeats = attendedSeats;
  r.attended = attendedSeats > 0;
  r.attendedAt = r.attended ? (r.attendedAt || new Date().toISOString()) : "";
  r.status = ["확정", "대기", "취소"].includes(data.status) ? data.status : "확정";
  r.donorName = String(data.donorName || "").trim();
  r.smsConsent = data.smsConsent === "on";
  r.note = String(data.note || "").trim();
  persist();
  closeModals();
  const rosterOpen = document.getElementById("rosterModal")?.classList.contains("open");
  const screeningId = r.screeningId;
  render();
  if (rosterOpen) openRoster(screeningId);
  toast("신청자 모든 항목을 수정했습니다.");
}

function deleteReservation(id) {
  const reservation = state.reservations.find((r) => r.id === id);
  if (!reservation) return;
  if (!canManageReservation(reservation)) return toast("이 신청자를 삭제할 권한이 없습니다.");
  if (!confirm(`${reservation.name}님의 신청을 삭제할까요?`)) return;
  state.reservations = state.reservations.filter((r) => r.id !== id);
  persist();
  render();
  toast("신청 정보를 삭제했습니다.");
}

function csvEscape(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function downloadFile(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}


function rowsToCsv(rows) {
  return "\ufeff" + rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

function buildReservationRows() {
  const rows = [["예약번호", "상태", "신청구분", "후원자명/입금자명", "참석여부", "참석처리일", "영화", "상영관", "상영시간", "신청자", "연락처", "이메일", "문자수신동의", "문자상태", "문자발송일", "문자요청ID", "신청인원", "실제참석인원", "신청일", "메모"]];
  state.reservations.forEach((reservation) => {
    const screening = state.screenings.find((s) => s.id === reservation.screeningId);
    rows.push([
      reservationDisplayNumber(reservation, screening),
      reservation.status,
      reservationTicketLabel(reservation, screening),
      reservation.donorName || "",
      reservation.attended === true ? "참석" : "취소",
      reservation.attendedAt || "",
      screening?.title || "삭제된 회차",
      screening?.venue || "",
      screening?.startTime || "",
      reservation.name,
      reservation.phone,
      reservation.email,
      reservation.smsConsent === false ? "미동의" : "동의",
      reservation.smsStatus || "미발송",
      reservation.smsSentAt || "",
      reservation.smsRequestId || "",
      reservation.seats,
      reservation.attended ? Number(reservation.attendedSeats || reservation.seats || 0) : 0,
      reservation.createdAt,
      reservation.note
    ]);
  });
  return rows;
}

function buildScreeningRows() {
  const rows = [["회차ID", "영화", "상영관", "시작", "종료", "정원", "신청건수", "신청인원", "개막작신청인원", "일반신청인원", "참석확인건수", "참석인원", "취소건수", "취소인원", "신청률", "참석률", "상태", "개막작여부", "티켓팅단계", "GV", "모더레이터", "담당스태프", "연락처", "기타"]];
  sortedScreenings().forEach((s) => {
    const stats = isOpeningScreening(s) ? openingStats(s) : null;
    const phase = isOpeningScreening(s) ? openingPhaseInfo(s) : null;
    rows.push([s.id, s.title, s.venue, s.startTime, s.endTime, s.capacity, applicationCount(s.id), appliedSeats(s.id), stats ? stats.earlybirdSeats : 0, stats ? stats.generalSeats : 0, attendedApplicationCount(s.id), actualAttendees(s.id), canceledApplicationCount(s.id), canceledSeats(s.id), `${occupancyRate(s)}%`, `${attendanceRate(s.id)}%`, s.status, isOpeningScreening(s) ? "개막작" : "", phase ? phase.label : "", s.gvHost, s.moderator, s.staff, s.staffPhone, s.notes]);
  });
  return rows;
}

function buildStatsRows() {
  const rows = [["영화", "상영관", "상영시간", "정원", "신청건수", "신청인원", "개막작신청인원", "일반신청인원", "참석인원", "취소건수", "취소인원", "남은좌석", "신청률", "참석률", "정원상태", "티켓팅단계"]];
  sortedScreenings().forEach((s) => {
    const stats = isOpeningScreening(s) ? openingStats(s) : null;
    const phase = isOpeningScreening(s) ? openingPhaseInfo(s) : null;
    rows.push([s.title, s.venue, s.startTime, s.capacity, applicationCount(s.id), appliedSeats(s.id), stats ? stats.earlybirdSeats : 0, stats ? stats.generalSeats : 0, actualAttendees(s.id), canceledApplicationCount(s.id), canceledSeats(s.id), remainingSeats(s), `${occupancyRate(s)}%`, `${attendanceRate(s.id)}%`, statusInfo(s).text, phase ? phase.label : ""]);
  });
  rows.push([]);
  rows.push(["상영관별 통계"]);
  rows.push(["상영관", "회차", "정원", "신청", "참석", "취소", "신청률", "참석률"]);
  groupByVenue().forEach((row) => rows.push([row.name, row.screenings, row.capacity, row.confirmed, row.attended, row.waitlist, `${row.rate}%`, `${row.attendanceRate}%`]));
  rows.push([]);
  rows.push(["날짜별 통계"]);
  rows.push(["날짜", "회차", "정원", "신청", "참석", "취소", "신청률", "참석률"]);
  groupByDate().forEach((row) => rows.push([row.name, row.screenings, row.capacity, row.confirmed, row.attended, row.waitlist, `${row.rate}%`, `${row.attendanceRate}%`]));
  return rows;
}

function exportReservations() {
  downloadFile(`munae9_reservations_${todayFile()}.csv`, rowsToCsv(buildReservationRows()), "text/csv;charset=utf-8");
}

function exportScreenings() {
  downloadFile(`munae9_screenings_${todayFile()}.csv`, rowsToCsv(buildScreeningRows()), "text/csv;charset=utf-8");
}

function exportStats() {
  downloadFile(`munae9_stats_${todayFile()}.csv`, rowsToCsv(buildStatsRows()), "text/csv;charset=utf-8");
}

function tableRowsToObjects(rows) {
  if (!Array.isArray(rows) || rows.length < 2) return [];
  const headers = rows[0].map((header) => String(header || "").trim());
  return rows.slice(1)
    .filter((row) => Array.isArray(row) && row.some((cell) => String(cell ?? "").trim() !== ""))
    .map((row) => headers.reduce((obj, header, index) => {
      if (header) obj[header] = row[index] ?? "";
      return obj;
    }, {}));
}

function buildDriveApplicants() {
  return state.reservations.map((reservation) => {
    const screening = state.screenings.find((s) => s.id === reservation.screeningId);
    return {
      movieTitle: screening?.title || "삭제된 회차",
      venue: screening?.venue || "",
      screeningDate: formatDatePart(screening?.startTime || ""),
      screeningTime: formatTimePart(screening?.startTime || ""),
      reservationNumber: reservationDisplayNumber(reservation, screening),
      name: reservation.name || "",
      phone: reservation.phone || "",
      email: reservation.email || "",
      seat: reservationSeatLabel(reservation, screening),
      count: Number(reservation.seats || 0),
      attendedCount: reservation.attended ? Number(reservation.attendedSeats || reservation.seats || 0) : 0,
      attendanceStatus: reservation.attended === true ? "참석" : "취소",
      ticketType: reservationTicketLabel(reservation, screening),
      donorName: reservation.donorName || "",
      smsConsent: reservation.smsConsent === false ? "미동의" : "동의",
      smsStatus: reservation.smsStatus || "미발송",
      smsSentAt: reservation.smsSentAt || "",
      createdAt: reservation.createdAt || "",
      memo: reservation.note || ""
    };
  });
}

function buildDriveStats() {
  return sortedScreenings().map((s) => {
    const stats = isOpeningScreening(s) ? openingStats(s) : null;
    const phase = isOpeningScreening(s) ? openingPhaseInfo(s) : null;
    return {
      movieTitle: s.title || "",
      venue: s.venue || "",
      screeningTime: s.startTime || "",
      capacity: Number(s.capacity || 0),
      applicationCount: applicationCount(s.id),
      applicantCount: appliedSeats(s.id),
      openingApplicantCount: stats ? stats.earlybirdSeats : 0,
      generalApplicantCount: stats ? stats.generalSeats : 0,
      attendedCount: actualAttendees(s.id),
      canceledCount: canceledApplicationCount(s.id),
      canceledSeats: canceledSeats(s.id),
      remainingSeats: remainingSeats(s),
      applicationRate: `${occupancyRate(s)}%`,
      attendanceRate: `${attendanceRate(s.id)}%`,
      status: statusInfo(s).text,
      ticketingPhase: phase ? phase.label : ""
    };
  });
}

function buildDriveScreenings() {
  return sortedScreenings().map((s) => {
    const stats = isOpeningScreening(s) ? openingStats(s) : null;
    const phase = isOpeningScreening(s) ? openingPhaseInfo(s) : null;
    return {
      movieTitle: s.title || "",
      venue: s.venue || "",
      screeningId: s.id || "",
      startTime: s.startTime || "",
      endTime: s.endTime || "",
      capacity: Number(s.capacity || 0),
      applicationCount: applicationCount(s.id),
      applicantCount: appliedSeats(s.id),
      openingApplicantCount: stats ? stats.earlybirdSeats : 0,
      generalApplicantCount: stats ? stats.generalSeats : 0,
      attendedCount: actualAttendees(s.id),
      canceledCount: canceledApplicationCount(s.id),
      canceledSeats: canceledSeats(s.id),
      applicationRate: `${occupancyRate(s)}%`,
      attendanceRate: `${attendanceRate(s.id)}%`,
      status: s.status || "",
      opening: isOpeningScreening(s) ? "개막작" : "",
      ticketingPhase: phase ? phase.label : "",
      gvHost: s.gvHost || "",
      moderator: s.moderator || "",
      staff: s.staff || "",
      staffPhone: s.staffPhone || "",
      notes: s.notes || ""
    };
  });
}

function buildGoogleDrivePayload(mode = "auto") {
  const reservationRows = buildReservationRows();
  const statsRows = buildStatsRows();
  const screeningRows = buildScreeningRows();
  return {
    festival: "제9회 머내마을영화제",
    mode,
    generatedAt: new Date().toISOString(),
    applicants: buildDriveApplicants(),
    stats: buildDriveStats(),
    screenings: buildDriveScreenings(),
    rows: {
      applicants: reservationRows,
      stats: statsRows,
      screenings: screeningRows
    },
    csv: {
      applicants: rowsToCsv(reservationRows).replace(/^\ufeff/, ""),
      stats: rowsToCsv(statsRows).replace(/^\ufeff/, ""),
      screenings: rowsToCsv(screeningRows).replace(/^\ufeff/, "")
    }
  };
}

const DRIVE_WEBHOOK_STORAGE_KEY = "munae9DriveWebhookUrl";
const DRIVE_AUTO_SYNC_STORAGE_KEY = "munae9DriveAutoSyncEnabled";
const DRIVE_LAST_SYNC_STORAGE_KEY = "munae9DriveLastSyncAt";
let driveAutoSyncTimer = null;

function getDriveWebhookUrl() {
  return localStorage.getItem(DRIVE_WEBHOOK_STORAGE_KEY) || "";
}

function setDriveWebhookUrl(url) {
  if (url) localStorage.setItem(DRIVE_WEBHOOK_STORAGE_KEY, url);
}

function isGoogleDriveAutoSyncEnabled() {
  return localStorage.getItem(DRIVE_AUTO_SYNC_STORAGE_KEY) === "true";
}

function setGoogleDriveAutoSyncEnabled(enabled) {
  localStorage.setItem(DRIVE_AUTO_SYNC_STORAGE_KEY, enabled ? "true" : "false");
}

function formatDriveLastSyncTime() {
  const value = localStorage.getItem(DRIVE_LAST_SYNC_STORAGE_KEY);
  if (!value) return "아직 없음";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
}

function setDriveLastSyncNow() {
  localStorage.setItem(DRIVE_LAST_SYNC_STORAGE_KEY, new Date().toISOString());
}

function promptDriveWebhookUrl() {
  const current = getDriveWebhookUrl();
  const url = prompt("구글 Apps Script 웹앱 URL을 입력해 주세요.\n/exec 로 끝나는 주소를 넣으면 구글드라이브 자동저장이 바로 켜집니다.", current);
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  setDriveWebhookUrl(trimmed);
  setGoogleDriveAutoSyncEnabled(true);
  return trimmed;
}


function encodeGoogleDrivePayload(payload) {
  return `payload=${encodeURIComponent(JSON.stringify(payload))}`;
}

async function postGoogleDrivePayload(url, payload) {
  // Apps Script 웹앱은 브라우저 CORS 응답을 제대로 돌려주지 않으므로 no-cors로 보냅니다.
  // application/x-www-form-urlencoded 형식으로 보내면 e.parameter.payload와 e.postData.contents 양쪽에서 안정적으로 읽을 수 있습니다.
  return fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: encodeGoogleDrivePayload(payload)
  });
}

async function syncRowsToGoogleDrive(type, options = {}) {
  const labels = {
    reservations: "신청자현황",
    stats: "통계",
    screenings: "영화상영관"
  };
  const rowsByType = {
    reservations: buildReservationRows,
    stats: buildStatsRows,
    screenings: buildScreeningRows
  };
  const builder = rowsByType[type];
  if (!builder) {
    if (!options.silent) toast("구글드라이브 저장 항목을 찾을 수 없습니다.");
    return false;
  }
  let url = getDriveWebhookUrl();
  if (!url && options.prompt !== false) url = promptDriveWebhookUrl();
  if (!url) {
    if (!options.silent) toast("구글드라이브 연동 URL을 먼저 설정해 주세요.");
    return false;
  }
  const rows = builder();
  const payload = {
    festival: "제9회 머내마을영화제",
    type,
    title: labels[type] || type,
    filename: `munae9_${type}_${todayFile()}.csv`,
    generatedAt: new Date().toISOString(),
    rows,
    csv: rowsToCsv(rows).replace(/^\ufeff/, "")
  };
  try {
    await postGoogleDrivePayload(url, payload);
    if (!options.silent) toast(`${labels[type]}을 구글드라이브 저장 요청으로 보냈습니다.`);
    return true;
  } catch (error) {
    console.error(error);
    if (!options.silent) toast("구글드라이브 저장 요청에 실패했습니다. Apps Script URL을 확인해 주세요.");
    return false;
  }
}

async function syncGoogleDriveCore(options = {}) {
  const silent = options.silent === true;
  const prompt = options.prompt !== false;
  const url = getDriveWebhookUrl() || (prompt ? promptDriveWebhookUrl() : "");
  if (!url) {
    if (!silent) toast("구글드라이브 연동 URL을 먼저 설정해 주세요.");
    return false;
  }
  const payload = buildGoogleDrivePayload(options.reason || "auto");
  try {
    await postGoogleDrivePayload(url, payload);
    setDriveLastSyncNow();
    if (!silent) {
      toast("신청자현황, 통계, 상영관영화를 구글시트 저장 요청으로 보냈습니다.");
      window.setTimeout(render, 0);
    }
    return true;
  } catch (error) {
    console.error(error);
    if (!silent) toast("구글드라이브 저장 요청에 실패했습니다. Apps Script URL을 확인해 주세요.");
    return false;
  }
}

function queueGoogleDriveAutoSync(reason = "data-change") {
  if (!isGoogleDriveAutoSyncEnabled()) return;
  if (!getDriveWebhookUrl()) return;
  window.clearTimeout(driveAutoSyncTimer);
  driveAutoSyncTimer = window.setTimeout(() => {
    syncGoogleDriveCore({ silent: true, prompt: false, reason });
  }, 2500);
}

function openGoogleDriveSyncSetup() {
  const existing = getDriveWebhookUrl();
  const message = [
    "구글드라이브 연동은 Google Apps Script 웹앱 URL을 연결하는 기능입니다.",
    "",
    "1. 구글시트에서 Apps Script를 만들고 웹앱으로 배포합니다.",
    "2. 배포 후 /exec 로 끝나는 웹앱 URL을 복사합니다.",
    "3. 여기에서 URL을 붙여넣으면 자동저장이 바로 켜집니다.",
    "",
    "연동 후에는 신청, 수정, 삭제, 참석, 취소 같은 데이터 변경 시 자동 저장되고, 관리자 화면이 열려 있으면 1분마다 한 번 더 저장됩니다.",
    "",
    existing ? "현재 URL이 설정되어 있습니다. 변경하려면 새 URL을 입력하세요." : "아직 URL이 없습니다. 웹앱 URL을 입력하세요."
  ].join("\n");
  const url = prompt(message, existing);
  if (url === null) return;
  const trimmed = url.trim();
  if (!trimmed) return toast("구글드라이브 연동 URL이 입력되지 않았습니다.");
  setDriveWebhookUrl(trimmed);
  setGoogleDriveAutoSyncEnabled(true);
  toast("구글드라이브 연동 URL을 저장했고 자동저장을 켰습니다.");
  syncGoogleDriveCore({ silent: false, prompt: false });
  render();
}

function toggleGoogleDriveAutoSync() {
  const next = !isGoogleDriveAutoSyncEnabled();
  if (next && !getDriveWebhookUrl()) {
    const url = promptDriveWebhookUrl();
    if (!url) return;
  }
  setGoogleDriveAutoSyncEnabled(next);
  toast(next ? "구글드라이브 자동저장을 켰습니다." : "구글드라이브 자동저장을 껐습니다.");
  if (next) syncGoogleDriveCore({ silent: false, prompt: false });
  render();
}

function resetGoogleDriveWebhookUrl() {
  localStorage.removeItem(DRIVE_WEBHOOK_STORAGE_KEY);
  localStorage.removeItem(DRIVE_LAST_SYNC_STORAGE_KEY);
  setGoogleDriveAutoSyncEnabled(false);
  toast("구글드라이브 연동 URL을 초기화했습니다. 자동저장도 꺼졌습니다.");
  render();
}

function exportJson() {
  downloadFile(`munae9_backup_${todayFile()}.json`, JSON.stringify(state, null, 2), "application/json;charset=utf-8");
}

function importJsonBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed.screenings) || !Array.isArray(parsed.reservations)) throw new Error("필수 배열 누락");
      state = normalizeState({
        screenings: parsed.screenings,
        reservations: parsed.reservations,
        sponsorClicks: Number(parsed.sponsorClicks || 0),
        lastUpdated: new Date().toISOString()
      });
      persist();
      toast("백업 파일을 복원했습니다.");
      render();
    } catch (error) {
      toast("백업 파일 형식이 올바르지 않습니다.");
    }
  };
  reader.readAsText(file);
}

function playYoutubeVideo(button) {
  const embed = button.dataset.embed || OPENING_VIDEO_EMBED;
  const url = button.dataset.url || OPENING_VIDEO_URL;
  const wrapper = button.closest("[data-video-wrapper]");
  if (!wrapper) return;

  const canInlinePlay = ["http:", "https:"].includes(window.location.protocol) && window.location.origin !== "null";
  if (!canInlinePlay) {
    window.open(url, "_blank", "noopener");
    toast("로컬 파일에서는 유튜브 임베드가 차단될 수 있어 새 창으로 열었습니다. 웹에 배포하면 이 자리에서 재생됩니다.");
    return;
  }

  const joiner = embed.includes("?") ? "&" : "?";
  const src = `${embed}${joiner}autoplay=1&mute=1`;
  wrapper.innerHTML = `<iframe src="${esc(src)}" title="${esc(OPENING_VIDEO_TITLE)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
}

function todayFile() {
  return new Date().toISOString().slice(0, 10).replaceAll("-", "");
}

document.addEventListener("click", (event) => {
  const row = event.target.closest("[data-reservation-row]");
  if (row && !event.target.closest("button, input, select, textarea, a, label")) {
    setSelectedReservationAction(row.dataset.reservationRow);
    return;
  }
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const id = button.dataset.id;
  if (action === "donate") handleDonate();
  if (action === "copy-donation-account") {
    copyTextToClipboard(DONATION_ACCOUNT_NUMBER);
    toast("계좌번호를 복사했습니다.");
  }
  if (action === "copy-donation-details") {
    const depositor = button.dataset.depositor || "";
    copyTextToClipboard(`${DONATION_BANK_NAME} ${DONATION_ACCOUNT_NUMBER} (${DONATION_ACCOUNT_HOLDER})\n후원금: ${DONATION_AMOUNT.toLocaleString("ko-KR")}원\n입금자명: ${depositor}`);
    toast("이체정보를 복사했습니다.");
  }
  if (action === "admin-tab") {
    event.preventDefault();
    const tab = button.dataset.tab || "overview";
    const nextHash = `#/admin/${tab}`;
    if (window.location.hash === nextHash) render();
    else window.location.hash = nextHash;
    return;
  }
  if (action === "play-video") playYoutubeVideo(button);
  if (action === "book") openBooking(id);
  if (action === "close-modal") closeModals();
  if (action === "view-roster") openRoster(id);
  if (action === "admin-logout") { sessionStorage.removeItem(ADMIN_SESSION_KEY); selectedScreeningId = null; render(); toast("로그아웃했습니다."); }
  if (action === "staff-add-reservation") staffAddReservation();
  if (action === "staff-edit-reservation") staffEditReservation(id);
  if (action === "staff-logout") {
    const session = readStaffSession();
    if (session?.isMaster === true) {
      state.masterStaffPresent = false;
      persist();
    } else if (session?.screeningIds?.length) {
      state.screenings.forEach((item) => { if (session.screeningIds.includes(item.id)) item.staffPresent = false; });
      persist();
    }
    sessionStorage.removeItem(STAFF_SESSION_KEY);
    window.location.hash = "#/staff";
    render();
    toast("스태프 관리 화면에서 로그아웃했습니다.");
  }
  if (action === "toggle-bulk-sms") setBulkSmsMode(!reservationSmsSelectMode);
  if (action === "select-visible-reservations") selectVisibleReservationsForSms();
  if (action === "deselect-visible-reservations") deselectVisibleReservationsForSms();
  if (action === "clear-bulk-sms-selection") clearBulkSmsSelection();
  if (action === "bulk-reservation-sms") bulkSendReservationSms();
  if (action === "open-bulk-notice-sms") openBulkNoticeSmsModal();
  if (action === "toggle-visible-reservation-checks") {
    const checked = button.checked === true;
    visibleReservationIdsForSms().forEach((reservationId) => checked ? selectedReservationSmsIds.add(reservationId) : selectedReservationSmsIds.delete(reservationId));
    updateReservationTable();
  }
  if (action === "print") window.print();
  if (action === "edit-screening") { selectedScreeningId = id; window.location.hash = "#/admin/screenings"; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  if (action === "cancel-edit") { selectedScreeningId = null; render(); }
  if (action === "delete-screening") deleteScreening(id);
  if (action === "save-master-staff-pin") saveMasterStaffPin();
  if (action === "clear-master-staff-present") clearMasterStaffPresent();
  if (action === "save-staff-pin") saveStaffPin(id);
  if (action === "clear-staff-present") clearStaffPresent(id);
  if (action === "set-reservation-status") setReservationStatus(id, button.dataset.status);
  if (action === "set-attendance") setAttendance(id, button.dataset.attended === "true");
  if (action === "copy-confirmation") copyReservationConfirmation(id);
  if (action === "send-sms") sendReservationSmsById(id);
  if (action === "open-single-notice-sms") openSingleNoticeSmsModal(id);
  if (action === "delete-reservation") deleteReservation(id);
  if (action === "clear-reservation-filter") {
    ["reservationSearch", "reservationScreeningFilter", "reservationAttendanceFilter", "reservationDatePreset", "reservationDateFilter"].forEach((fieldId) => {
      const el = document.getElementById(fieldId);
      if (el) el.value = "";
    });
    updateReservationTable();
  }
  if (action === "export-reservations") exportReservations();
  if (action === "export-screenings") exportScreenings();
  if (action === "export-stats") exportStats();
  if (action === "sync-drive-reservations") syncGoogleDriveCore({ silent: false, prompt: true, reason: "manual-reservations" });
  if (action === "sync-drive-stats") syncGoogleDriveCore({ silent: false, prompt: true, reason: "manual-stats" });
  if (action === "sync-drive-screenings") syncGoogleDriveCore({ silent: false, prompt: true, reason: "manual-screenings" });
  if (action === "sync-drive-all") syncGoogleDriveCore({ silent: false, prompt: true, reason: "manual-all" });
  if (action === "drive-sync-settings") openGoogleDriveSyncSetup();
  if (action === "set-drive-webhook") { const url = promptDriveWebhookUrl(); if (url) syncGoogleDriveCore({ silent: false, prompt: false }); render(); }
  if (action === "toggle-drive-autosync") toggleGoogleDriveAutoSync();
  if (action === "reset-drive-webhook") resetGoogleDriveWebhookUrl();
  if (action === "export-json") exportJson();
  if (action === "reset-demo") {
    if (!confirm("데모 데이터로 초기화할까요? 현재 입력된 정보가 사라집니다.")) return;
    state = normalizeState({ screenings: cloneData(seedScreenings), reservations: cloneData(seedReservations), donations: [], sponsorClicks: 0, adminPin: String(state.adminPin || ADMIN_PIN), masterStaffPin: "0909", masterStaffPresent: false, lastUpdated: new Date().toISOString() });
    selectedScreeningId = null;
    persist();
    render();
    toast("데모 데이터로 초기화했습니다.");
  }
  if (action === "clear-reservations") {
    if (!confirm("모든 신청 정보를 비울까요? 상영 회차는 유지됩니다.")) return;
    state.reservations = [];
    persist();
    render();
    toast("신청 정보를 비웠습니다.");
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id === "bookingForm") submitBooking(form);
  if (form.id === "donationForm") submitDonation(form);
  if (form.id === "adminLoginForm") submitAdminLogin(form);
  if (form.id === "adminPinChangeForm") submitAdminPinChange(form);
  if (form.id === "staffLoginForm") submitStaffLogin(form);
  if (form.id === "staffPinChangeForm") submitStaffPinChange(form);
  if (form.id === "bulkSmsNoticeForm") submitBulkNoticeSms(form);
  if (form.id === "openingForm") submitOpeningSettings(form);
  if (form.id === "screeningForm") submitScreening(form);
  if (form.id === "reservationEditForm") submitReservationEdit(form);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModals();
  if ((event.key === "Enter" || event.key === " ") && event.target?.matches?.("[data-reservation-row]")) {
    event.preventDefault();
    setSelectedReservationAction(event.target.dataset.reservationRow);
  }
});


document.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-reservation-check]");
  if (!checkbox) return;
  const id = checkbox.dataset.reservationCheck;
  if (!id) return;
  if (checkbox.checked) selectedReservationSmsIds.add(id);
  else selectedReservationSmsIds.delete(id);
  updateBulkSmsSelectedCount();
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (!hash.startsWith("admin/screenings")) selectedScreeningId = null;
  render();
});

render();


window.setInterval(() => {
  if (!isAdminAuthed()) return;
  if (!isGoogleDriveAutoSyncEnabled()) return;
  if (!getDriveWebhookUrl()) return;
  syncGoogleDriveCore({ silent: true, prompt: false, reason: "interval" });
}, 60000);
