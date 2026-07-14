const DONATION_URL = "https://aq.gy/f/2hekV";
const DONATION_MESSAGE = "우리 동네 주민들이 직접 감독, 기획, 제작, 상영 이 모든 것들을 해 나가는 순수 주민주도영화제입니다. 마을 이웃들의 참여와 도움으로 이 영화제는 만들어지고 있습니다. 이 귀한 일에 작은 후원의 손길을 보태주세요.";
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
const EARLYBIRD_MESSAGE = "후원자님들만을 위한 사전예약";
const OPENING_PROMO_COPY = "박정민배우를 가장 가까이서 만날 수 있는 특별한 혜택을 후원자님들께 드립니다. 마을 주민들이 한땀한땀 만들어가는 이 영화제에 여러분의 손길을 보태주십시오. 후원자님들을 위해 좌석을 준비했습니다. 후원자님들만을 위한 사전예약입니다.";

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
  notes: "박정민 배우, 머내마을영화제 개막식에 오다. 9월 9일 저녁 7시 동천농협강당에서 열리는 개막식 상영입니다. 후원자 사전예약은 지정좌석, 일반석은 자유석으로 운영합니다.",
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
    screeningId: OPENING_FILM_ID,
    name: "홍길동",
    phone: "010-1234-5678",
    email: "hong@example.com",
    seats: 2,
    status: "확정",
    attended: true,
    attendedSeats: 2,
    attendedAt: "2026-09-09T19:08:00",
    ticketType: "얼리버드",
    seatType: "지정좌석",
    seatAssignment: "A-001, A-002",
    donorName: "홍길동",
    smsConsent: true,
    smsStatus: "발송완료",
    smsSentAt: "2026-07-14T09:31:00",
    smsRequestId: "demo-sms-1001",
    note: "개막작 얼리버드 후원자 사전예약",
    createdAt: "2026-07-14T09:30:00"
  },
  {
    id: "rsv-1002",
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
    if (!screening?.notes || screening.notes === "박정민 배우 참석 예정. 후원자 사전예약은 지정좌석, 일반 관객은 자유석으로 운영합니다.") merged.notes = seedOpeningScreening.notes;

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

function normalizeReservation(reservation = {}) {
  const { donationTier, donationAmount, donationCustomAmount, ...base } = reservation;
  const seats = Math.max(1, Number(base.seats || 1));
  const attended = base.attended === true;
  const attendedSeats = attended ? Math.max(1, Math.min(Number(base.attendedSeats || seats), seats)) : 0;
  const ticketType = base.ticketType || "일반";
  const seatType = base.seatType || (ticketType === "얼리버드" ? "지정좌석" : "자유석");
  return {
    ...base,
    seats,
    status: base.status || "확정",
    attended,
    attendedSeats,
    attendedAt: attended ? (base.attendedAt || base.updatedAt || base.createdAt || new Date().toISOString()) : "",
    ticketType,
    seatType,
    seatAssignment: base.seatAssignment || (seatType === "자유석" ? "자유석" : ""),
    donorName: base.donorName || "",
    smsConsent: base.smsConsent !== false,
    smsStatus: base.smsStatus || "미발송",
    smsSentAt: base.smsSentAt || "",
    smsError: base.smsError || "",
    smsRequestId: base.smsRequestId || ""
  };
}

function normalizeState(data) {
  let screenings = Array.isArray(data.screenings) ? data.screenings.map(normalizeScreening) : cloneData(seedScreenings).map(normalizeScreening);
  if (!screenings.some((screening) => screening.isOpening === true)) {
    screenings = [normalizeScreening(seedOpeningScreening), ...screenings];
  }
  return {
    screenings,
    reservations: Array.isArray(data.reservations) ? data.reservations.map(normalizeReservation) : [],
    sponsorClicks: Number(data.sponsorClicks || 0),
    lastUpdated: data.lastUpdated || new Date().toISOString()
  };
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
    sponsorClicks: 0,
    lastUpdated: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

function persist() {
  state.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  const confirmed = confirmedSeats(screeningId);
  if (!confirmed) return 0;
  return Math.round((actualAttendees(screeningId) / confirmed) * 100);
}

function remainingSeats(screening) {
  return Number(screening.capacity || 0) - confirmedSeats(screening.id);
}

function occupancyRate(screening) {
  const capacity = Number(screening.capacity || 0);
  if (!capacity) return 0;
  return Math.round((confirmedSeats(screening.id) / capacity) * 100);
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
    return { phase: "before", label: "후원자 사전예약 준비중", className: "warn", allowBooking: false, ticketType: "", message: `${formatDateTime(screening.earlyBirdStart)}부터 ${EARLYBIRD_MESSAGE}이 열립니다.` };
  }
  if (!earlyEnd || now <= earlyEnd) {
    return { phase: "earlybird", label: "후원자 사전예약 진행중", className: "ok", allowBooking: true, ticketType: "얼리버드", seatType: "지정좌석", message: `${EARLYBIRD_MESSAGE}입니다. 확정 시 지정좌석이 자동 배정됩니다.` };
  }
  if (generalOpen && now < generalOpen) {
    return { phase: "between", label: "일반석 오픈 전", className: "warn", allowBooking: false, ticketType: "", message: `${formatDateTime(screening.generalOpenAt)}부터 일반석 자유석 신청이 열립니다.` };
  }
  if (generalEnd && now > generalEnd) {
    return { phase: "closed", label: "신청 마감", className: "danger", allowBooking: false, ticketType: "", message: `${formatDateTime(screening.generalEndAt || screening.startTime)}에 개막식 티켓팅이 마감되었습니다.` };
  }
  return { phase: "general", label: "일반석 오픈", className: "blue", allowBooking: true, ticketType: "일반", seatType: "자유석", message: "후원자 사전예약 기간이 끝나 일반석 자유석 신청이 가능합니다." };
}

function openingReservations(screeningId = getOpeningScreening()?.id, type = "") {
  return getReservations(screeningId).filter((reservation) => !type || reservation.ticketType === type);
}

function openingDesignatedCapacity(screening = getOpeningScreening()) {
  return Math.max(0, Math.min(Number(screening?.designatedSeatCount || 0), Number(screening?.capacity || 0)));
}

function usedDesignatedSeats(screeningId = getOpeningScreening()?.id) {
  const used = new Set();
  openingReservations(screeningId, "얼리버드")
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
  const earlybird = reservations.filter((r) => r.ticketType === "얼리버드");
  const general = reservations.filter((r) => r.ticketType !== "얼리버드");
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

function reservationTicketLabel(reservation, screening) {
  if (!isOpeningScreening(screening)) return "일반 신청";
  if (reservation.ticketType === "얼리버드") return "후원자 지정좌석";
  return "일반석";
}

function reservationSeatLabel(reservation, screening) {
  if (!isOpeningScreening(screening)) return "-";
  if (reservation.status === "대기") return "대기";
  return reservation.seatAssignment || reservation.seatType || "자유석";
}

function getTotals() {
  const activeReservations = state.reservations.filter((r) => r.status !== "취소");
  const confirmed = state.reservations.filter((r) => r.status === "확정");
  const waitlist = state.reservations.filter((r) => r.status === "대기");
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
    occupancy: totalCapacity ? Math.round((totalConfirmedSeats / totalCapacity) * 100) : 0,
    attendance: totalConfirmedSeats ? Math.round((totalActualAttendees / totalConfirmedSeats) * 100) : 0
  };
}

function appHeader() {
  return `
    <header class="header">
      <a class="logo" href="#/">
        <div class="logo-mark">M9</div>
        <div>
          <div class="logo-title">제9회 머내마을영화제</div>
          <div class="logo-sub">마을이 함께 만드는 주민주도영화제</div>
        </div>
      </a>
      <nav class="nav" aria-label="주요 메뉴">
        <a href="#/opening">개막식 티켓팅</a>
        <a href="#/apply">영화 신청</a>
        <button type="button" data-action="donate">후원하기</button>
        <a href="#/staff" class="staff-link">스태프</a>
        <a href="#/admin" class="primary-link">관리자</a>
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
  const popular = sortedScreenings().filter((screening) => !isOpeningScreening(screening)).slice(0, 3);
  return `
    <section class="hero">
      <div class="hero-grid">
        <div>
          <div class="eyebrow">순수 주민주도영화제 · ${esc(festivalPeriodLabel())}</div>
          <h1>마을 주민이 직접 만드는 영화제에 함께해주세요.</h1>
          <p>${esc(DONATION_MESSAGE)}</p>
          <div class="cta-row">
            <a class="btn btn-light" href="#/apply">영화 신청하기</a>
            <button class="btn btn-primary" type="button" data-action="donate">후원하기</button>
          </div>
        </div>
        <aside class="hero-card donation-card" aria-label="후원 안내">
          <div class="icon-badge">💛</div>
          <h2>이 귀한 일에 작은 후원의 손길을 보태주세요.</h2>
          <p>후원금은 상영 준비, 공간 운영, 장비, 홍보물, 주민 창작자와 스태프의 활동을 이어가는 데 소중히 사용됩니다.</p>
          <button class="btn btn-light" type="button" data-action="donate">후원하기</button>
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

function renderOpeningHome(opening) {
  const phase = openingPhaseInfo(opening);
  const stats = openingStats(opening);
  const poster = openingPosterSrc(opening);
  const videoUrl = openingVideoUrl(opening);
  const regularPreview = sortedScreenings().filter((screening) => !isOpeningScreening(screening)).slice(0, 3);
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
          <button class="btn btn-light" type="button" data-action="book" data-id="${esc(opening.id)}" ${phase.allowBooking ? "" : "disabled"}>${phase.allowBooking ? "얼리버드·개막식 예매" : phase.label}</button>
          <button class="btn btn-primary" type="button" data-action="donate">후원하기</button>
        </div>
        <p class="opening-home-note">${esc(EARLYBIRD_MESSAGE)} · 지정좌석 잔여 ${stats.designatedRemaining}석 · 전체 잔여 ${stats.remainingTotal}석</p>
      </div>
      <figure class="opening-poster-hero">
        <img src="${esc(poster)}" alt="개막식 영화 얼굴 포스터" loading="eager" />
        <figcaption>개막식 영화 &lt;얼굴&gt; · 박정민 배우 참석</figcaption>
      </figure>
    </section>

    <section class="opening-media-grid" id="opening-video">
      <article class="card opening-media-card">
        <div class="section-title compact-title">
          <div>
            <h2>개막식 소개영상</h2>
            <p>소개영상은 메인 페이지 안에서 음소거 상태로 자동 반복재생됩니다.</p>
          </div>
          <a class="chip-link" href="${esc(videoUrl)}" target="_blank" rel="noopener noreferrer">유튜브에서 보기</a>
        </div>
        ${renderVideoPlayer(opening, "개막식 소개영상")}
      </article>
      <article class="card opening-ticket-card">
        <div class="icon-badge">🎟️</div>
        <h2>후원자 사전예약</h2>
        <p>${esc(phase.message || EARLYBIRD_MESSAGE + "입니다.")}</p>
        <p class="opening-card-copy">후원자명과 연락처를 기록해 운영진이 후원 내역과 대조합니다.</p>
        <div class="opening-mini-grid">
          <div><span>정원</span><strong>${Number(opening.capacity || 0)}명</strong></div>
          <div><span>확정</span><strong>${confirmedSeats(opening.id)}명</strong></div>
          <div><span>지정좌석 잔여</span><strong>${stats.designatedRemaining}석</strong></div>
          <div><span>대기</span><strong>${waitlistSeats(opening.id)}명</strong></div>
        </div>
        <button class="btn btn-dark full-width" type="button" data-action="book" data-id="${esc(opening.id)}" ${phase.allowBooking ? "" : "disabled"}>${phase.allowBooking ? "개막식 예매 신청" : phase.label}</button>
      </article>
    </section>

    <section class="section">
      <div class="section-title">
        <div>
          <h2>영화관람신청하기</h2>
          <p>개막식 이후에도 9월 13일까지 마을 곳곳에서 상영이 이어집니다.</p>
        </div>
        <a class="chip-link" href="#/apply">전체 보기</a>
      </div>
      <div class="screening-grid">
        ${regularPreview.map(screeningCard).join("")}
      </div>
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
        <p>개막식 영화 &lt;얼굴&gt; · 9월 9일 저녁 7시 동천농협강당 · 박정민 배우 참석. 후원자 사전예약은 지정좌석으로, 일반석 오픈 후 신청자는 자유석으로 운영됩니다. 지정좌석 잔여 ${stats.designatedRemaining}석 · 전체 잔여 ${stats.remainingTotal}석</p>
      </div>
      <div class="cta-row">
        <a class="btn btn-dark" href="#/opening">개막작 티켓팅 보기</a>
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
        <h1 class="opening-title-stack opening-title-detail">${openingHeadlineMarkup()}<span class="opening-title-sub">개막식 영화 &lt;얼굴&gt; · 후원자 사전예약</span></h1>
        <p><strong>${esc(formatDateTime(opening.startTime))} · ${esc(opening.venue)}</strong><br>${esc(OPENING_PROMO_COPY)}</p>
        <div class="cta-row">
          <button class="btn btn-light" type="button" data-action="book" data-id="${esc(opening.id)}" ${phase.allowBooking ? "" : "disabled"}>${phase.allowBooking ? "개막작 신청하기" : phase.label}</button>
          <button class="btn btn-primary" type="button" data-action="donate">후원하기</button>
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
      <article class="card opening-media-card">
        <div class="section-title compact-title">
          <div>
            <h2>소개영상</h2>
            <p>소개영상은 화면 안에서 음소거 상태로 자동 반복재생됩니다. 보이지 않으면 유튜브에서 보기 버튼을 눌러주세요.</p>
          </div>
          <a class="chip-link" href="${esc(videoUrl)}" target="_blank" rel="noopener noreferrer">유튜브에서 보기</a>
        </div>
        ${renderVideoPlayer(opening, "개막식 소개영상")}
      </article>
    </section>

    <section class="opening-flow-grid">
      <article class="card opening-flow-card active">
        <div class="icon-badge">①</div>
        <h2>후원자 사전예약</h2>
        <p>기간: ${esc(earlybirdPeriod)}</p>
        <p>${esc(EARLYBIRD_MESSAGE)}입니다. 신청이 확정되면 지정좌석이 자동 배정됩니다.</p>
      </article>
      <article class="card opening-flow-card">
        <div class="icon-badge">②</div>
        <h2>일반석 오픈</h2>
        <p>기간: ${esc(generalPeriod)}</p>
        <p>일반석은 지정좌석 없이 현장 자유석으로 배정됩니다.</p>
      </article>
      <article class="card opening-flow-card">
        <div class="icon-badge">③</div>
        <h2>좌석 운영</h2>
        <p>후원자 지정좌석 ${stats.assignedSeatCount}/${stats.designatedCapacity}석 배정</p>
        <p>일반석 자유석 기준 ${stats.generalSeats}명 신청 중입니다.</p>
      </article>
    </section>

    <section class="card">
      <div class="section-title">
        <div>
          <h2>개막작 신청 현황</h2>
          <p>얼리버드와 일반석 신청을 구분해 보여줍니다. 실제 운영 일정과 좌석 수는 관리자 대시보드에서 수정할 수 있습니다.</p>
        </div>
        <a class="btn btn-outline" href="#/admin/opening">관리자 설정</a>
      </div>
      <div class="opening-summary-grid">
        <div class="metric-card"><div class="metric-label">얼리버드 신청</div><div class="metric-value">${stats.earlybirdSeats}</div><div class="metric-note">지정좌석 배정 대상</div></div>
        <div class="metric-card"><div class="metric-label">일반석 신청</div><div class="metric-value">${stats.generalSeats}</div><div class="metric-note">자유석 운영</div></div>
        <div class="metric-card"><div class="metric-label">지정좌석 잔여</div><div class="metric-value">${stats.designatedRemaining}</div><div class="metric-note">총 ${stats.designatedCapacity}석</div></div>
        <div class="metric-card"><div class="metric-label">실제 참석</div><div class="metric-value">${actualAttendees(opening.id)}</div><div class="metric-note">현장 참석 확인 기준</div></div>
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
      <button class="btn btn-outline" type="button" data-action="donate">후원하기</button>
    </section>

    ${openingInlineCard()}

    <section class="donation-strip" aria-label="후원 안내">
      <div>
        <strong>마을 이웃들의 참여와 도움으로 이 영화제는 만들어지고 있습니다.</strong>
        <p>영화를 신청하신 뒤, 주민들이 직접 감독·기획·제작·상영하는 이 귀한 일에 작은 후원의 손길도 보태주세요.</p>
      </div>
      <button class="btn btn-primary" type="button" data-action="donate">후원 함께하기</button>
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

function staffScreenings() {
  const session = getStaffSession();
  if (!session) return [];
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

function renderStaff(preselectedId = "") {
  const session = getStaffSession();
  if (!session) return renderStaffLogin(preselectedId);
  const screenings = staffScreenings();
  if (!screenings.length) {
    sessionStorage.removeItem(STAFF_SESSION_KEY);
    return renderStaffLogin(preselectedId);
  }
  const reservations = state.reservations
    .filter((reservation) => session.screeningIds.includes(reservation.screeningId))
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ko"));
  const totalSeats = reservations.filter((r) => r.status !== "취소").reduce((sum, r) => sum + Number(r.seats || 0), 0);
  const attendedSeats = reservations.filter((r) => r.attended).reduce((sum, r) => sum + Number(r.attendedSeats || 0), 0);
  const canceledSeats = reservations.filter((r) => r.status === "취소").reduce((sum, r) => sum + Number(r.seats || 0), 0);
  const venueStats = groupByVenue();
  return `
    <section class="section-title staff-portal-title">
      <div>
        <div class="eyebrow">상영관 담당자 전용</div>
        <h1>${esc(session.venue || screenings[0].venue)} 신청자 관리</h1>
        <p>${esc(session.staffName)} 담당자가 자신의 상영관 신청자를 추가·수정·삭제하고 참석 현황을 관리합니다.</p>
      </div>
      <div class="cta-row">
        <button class="btn btn-primary" type="button" data-action="staff-add-reservation">신청자 추가</button>
        <button class="btn btn-outline" type="button" data-action="print">명단 인쇄</button>
        <button class="btn btn-danger" type="button" data-action="staff-logout">로그아웃</button>
      </div>
    </section>
    <section class="card staff-password-card screen-only">
      <div><h2>스태프 비밀번호 변경</h2><p>현재 담당 상영관의 모든 회차에 같은 새 비밀번호가 적용됩니다.</p></div>
      <form id="staffPinChangeForm" class="staff-pin-form">
        <label class="label" for="currentStaffPin">현재 비밀번호</label><input class="input" id="currentStaffPin" name="currentPin" type="password" inputmode="numeric" required />
        <label class="label" for="newStaffPin">새 비밀번호</label><input class="input" id="newStaffPin" name="newPin" type="password" inputmode="numeric" minlength="4" required />
        <label class="label" for="confirmStaffPin">새 비밀번호 확인</label><input class="input" id="confirmStaffPin" name="confirmPin" type="password" inputmode="numeric" minlength="4" required />
        <button class="btn btn-dark" type="submit">비밀번호 변경</button>
      </form>
    </section>
    <section class="stats-grid staff-stats">
      <div class="stat-card"><span>담당 상영관</span><strong>${esc(session.venue || screenings[0].venue)}</strong><small>${screenings.length}회차</small></div>
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
          <div class="staff-capacity"><strong>${confirmedSeats(screening.id)} / ${Number(screening.capacity || 0)}명</strong><span>확정 신청</span></div>
        </div>
        ${reservationTable(reservations.filter((reservation) => reservation.screeningId === screening.id), { staffMode: true })}
      </section>
    `).join("")}
  `;
}

function venueStatsTable(rows) {
  if (!rows.length) return `<div class="empty">통계 데이터가 없습니다.</div>`;
  const totals = rows.reduce((a, r) => ({ capacity:a.capacity+r.capacity, applications:a.applications+r.applications, applicants:a.applicants+r.applicants, confirmed:a.confirmed+r.confirmed, attended:a.attended+r.attended, canceledApplications:a.canceledApplications+r.canceledApplications, canceledSeats:a.canceledSeats+r.canceledSeats, waitlist:a.waitlist+r.waitlist }), {capacity:0,applications:0,applicants:0,confirmed:0,attended:0,canceledApplications:0,canceledSeats:0,waitlist:0});
  return `<div class="table-wrap"><table class="venue-stats-table"><thead><tr><th>상영관</th><th>회차</th><th>정원</th><th>신청 건/인원</th><th>확정</th><th>참석</th><th>취소 건/인원</th><th>대기</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td><strong>${esc(r.name)}</strong></td><td>${r.screenings}</td><td>${r.capacity}</td><td>${r.applications}건 / ${r.applicants}명</td><td>${r.confirmed}명</td><td>${r.attended}명</td><td>${r.canceledApplications}건 / ${r.canceledSeats}명</td><td>${r.waitlist}명</td></tr>`).join("")}
    <tr class="total-row"><td><strong>전체 합계</strong></td><td>${rows.reduce((n,r)=>n+r.screenings,0)}</td><td>${totals.capacity}</td><td>${totals.applications}건 / ${totals.applicants}명</td><td>${totals.confirmed}명</td><td>${totals.attended}명</td><td>${totals.canceledApplications}건 / ${totals.canceledSeats}명</td><td>${totals.waitlist}명</td></tr>
  </tbody></table></div>`;
}

function renderStaffLogin(preselectedId = "") {
  const options = sortedScreenings().map((screening) => `<option value="${esc(screening.id)}" ${screening.id === preselectedId ? "selected" : ""}>${esc(screening.venue)} · ${esc(screening.title)} · ${esc(screening.staff || "담당 미정")}</option>`).join("");
  return `
    <section class="admin-login staff-login">
      <div class="login-card">
        <div class="eyebrow">상영관 담당자 전용</div>
        <h1>신청자 확인</h1>
        <p>담당 회차를 선택하고 관리자가 부여한 스태프 비밀번호를 입력하세요. 로그인한 회차의 신청자 명단만 확인할 수 있습니다.</p>
        <form id="staffLoginForm">
          <label class="label" for="staffScreeningId">담당 상영 회차</label>
          <select class="select" id="staffScreeningId" name="screeningId" required>
            <option value="">회차를 선택하세요</option>${options}
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
  const screening = state.screenings.find((item) => item.id === data.screeningId);
  if (!screening || !screening.staffPin) return toast("이 회차에는 아직 스태프 비밀번호가 설정되지 않았습니다.");
  if (String(data.pin || "") !== String(screening.staffPin)) return toast("스태프 비밀번호가 맞지 않습니다.");
  const venueScreenings = state.screenings.filter((item) => item.venue === screening.venue && String(item.staffPin || "") === String(screening.staffPin || ""));
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
  const screening = state.screenings.find((item) => item.id === session.screeningIds[0]);
  if (!screening) return toast("담당 상영관을 찾을 수 없습니다.");
  if (String(data.currentPin || "") !== String(screening.staffPin || "")) return toast("현재 비밀번호가 맞지 않습니다.");
  const newPin = String(data.newPin || "").trim();
  if (newPin.length < 4) return toast("새 비밀번호는 4자리 이상으로 입력하세요.");
  if (newPin !== String(data.confirmPin || "").trim()) return toast("새 비밀번호 확인이 일치하지 않습니다.");
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
  const active = ["overview", "opening", "screenings", "reservations", "stats", "backup"].includes(tab) ? tab : "overview";
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
        ${adminTabLink("overview", "운영 요약", active)}
        ${adminTabLink("opening", "개막작 티켓팅", active)}
        ${adminTabLink("screenings", "상영관·영화 관리", active)}
        ${adminTabLink("reservations", "신청자 명단", active)}
        ${adminTabLink("stats", "상세 통계", active)}
        ${adminTabLink("backup", "백업·초기화", active)}
      </aside>
      <div class="admin-panel">
        ${active === "overview" ? adminOverview() : ""}
        ${active === "opening" ? adminOpening() : ""}
        ${active === "screenings" ? adminScreenings() : ""}
        ${active === "reservations" ? adminReservations() : ""}
        ${active === "stats" ? adminStats() : ""}
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
        <p>시제품 확인용 PIN은 <strong>0909</strong>입니다. 실제 배포 시에는 계정 로그인과 권한 관리를 서버에서 처리해야 합니다.</p>
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
  return `<a class="admin-tab ${tab === active ? "active" : ""}" href="#/admin/${tab}">${label}</a>`;
}

function adminOverview() {
  const totals = getTotals();
  const risky = sortedScreenings().filter((s) => statusInfo(s).className !== "ok");
  return `
    <section class="metric-grid">
      <div class="metric-card"><div class="metric-label">총 신청 건수</div><div class="metric-value">${totals.totalApplicationCount}</div><div class="metric-note">신청 인원 ${totals.totalAppliedSeats}명</div></div>
      <div class="metric-card"><div class="metric-label">확정 신청 인원</div><div class="metric-value">${totals.totalConfirmedSeats}</div><div class="metric-note">확정 ${totals.totalConfirmedApplicationCount}건 · 신청률 ${totals.occupancy}%</div></div>
      <div class="metric-card"><div class="metric-label">실제 참석 인원</div><div class="metric-value">${totals.totalActualAttendees}</div><div class="metric-note">참석 처리 ${totals.totalAttendedApplicationCount}건 · 참석률 ${totals.attendance}%</div></div>
      <div class="metric-card"><div class="metric-label">대기 인원</div><div class="metric-value">${totals.totalWaitlistSeats}</div><div class="metric-note">초과 수요 확인</div></div>
      <div class="metric-card"><div class="metric-label">후원 클릭</div><div class="metric-value">${state.sponsorClicks || 0}</div><div class="metric-note">이 브라우저 기준</div></div>
    </section>

    <section class="card">
      <div class="section-title"><div><h2>상영관별 통계</h2><p>상영관을 기준으로 신청, 확정, 참석, 취소, 대기를 집계합니다. 후원하기 클릭 ${Number(state.sponsorClicks || 0)}회.</p></div></div>
      ${venueStatsTable(groupByVenue())}
    </section>

    <section class="card">
      <div class="section-title">
        <div>
          <h2>영화별 신청·참석 현황</h2>
          <p>마감 임박, 정원 도달, 대기 발생 영화와 실제 참석 인원을 함께 확인하세요.</p>
        </div>
        <button class="btn btn-outline" type="button" data-action="export-stats">통계 CSV</button>
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
            <th>신청 건/인원</th>
            <th>실제 참석</th>
            <th>대기</th>
            <th>GV·모더레이터</th>
            <th>담당</th>
            ${options.manage ? "<th>관리</th>" : "<th>명단</th>"}
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
                <td><strong>${esc(screening.title)}</strong>${isOpening ? `<br><span class="help">얼리버드 ${openStats.earlybirdSeats}명 · 일반 ${openStats.generalSeats}명 · 지정잔여 ${openStats.designatedRemaining}석</span>` : ""}</td>
                <td><strong>${esc(screening.venue)}</strong></td>
                <td><span class="badge ${info.className}">${esc(info.text)}</span>${isOpening ? `<br><span class="badge ${phase.className}">${esc(phase.label)}</span>` : ""}</td>
                <td>${esc(formatDateTime(screening.startTime))}</td>
                <td>${Number(screening.capacity || 0)}명</td>
                <td>${applicationCount(screening.id)}건 / ${appliedSeats(screening.id)}명<br><span class="help">확정 ${applicationCount(screening.id, "확정")}건 · ${confirmedSeats(screening.id)}명</span></td>
                <td>${attendedApplicationCount(screening.id)}건 / ${actualAttendees(screening.id)}명<br><span class="help">확정 대비 ${attendanceRate(screening.id)}%</span></td>
                <td>${waitlistSeats(screening.id)}명</td>
                <td>${esc(screening.gvHost || "-")}<br><span class="help">${esc(screening.moderator || "-")}</span></td>
                <td>${esc(screening.staff || "-")}<br><span class="help">${esc(screening.staffPhone || "-")}</span></td>
                <td>
                  <div class="row-actions">
                    ${options.manage ? `
                      <button class="btn btn-outline btn-small" type="button" data-action="edit-screening" data-id="${esc(screening.id)}">수정</button>
                      <button class="btn btn-danger btn-small" type="button" data-action="delete-screening" data-id="${esc(screening.id)}">삭제</button>
                    ` : `
                      <button class="btn btn-outline btn-small" type="button" data-action="view-roster" data-id="${esc(screening.id)}">명단·참석</button>
                    `}
                  </div>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
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
          <p>개막식 “얼굴”, 박정민 배우 참석, 메인 화면 노출 종료일, 포스터·소개영상, 후원자 사전예약 기간, 일반석 오픈 기간, 지정좌석 수를 관리합니다.</p>
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
            <label class="label" for="earlyBirdStart">후원자 사전예약 시작</label>
            <input class="input" id="earlyBirdStart" name="earlyBirdStart" type="datetime-local" value="${esc(toLocalInputValue(opening.earlyBirdStart))}" />
          </div>
          <div>
            <label class="label" for="earlyBirdEnd">후원자 사전예약 종료</label>
            <input class="input" id="earlyBirdEnd" name="earlyBirdEnd" type="datetime-local" value="${esc(toLocalInputValue(opening.earlyBirdEnd))}" />
          </div>
          <div>
            <label class="label" for="generalOpenAt">일반석 오픈 시작</label>
            <input class="input" id="generalOpenAt" name="generalOpenAt" type="datetime-local" value="${esc(toLocalInputValue(opening.generalOpenAt))}" />
          </div>
          <div>
            <label class="label" for="generalEndAt">일반석 오픈 종료</label>
            <input class="input" id="generalEndAt" name="generalEndAt" type="datetime-local" value="${esc(toLocalInputValue(opening.generalEndAt || opening.startTime))}" />
          </div>
          <div>
            <label class="label" for="designatedSeatCount">후원자 지정좌석 수</label>
            <input class="input" id="designatedSeatCount" name="designatedSeatCount" type="number" min="0" value="${esc(opening.designatedSeatCount)}" />
          </div>
          <div>
            <label class="label" for="seatPrefix">지정좌석 접두어</label>
            <input class="input" id="seatPrefix" name="seatPrefix" value="${esc(opening.seatPrefix || "A")}" placeholder="예: A, R" />
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
          <button class="btn btn-outline" type="button" data-action="export-reservations">신청자 CSV</button>
        </div>
      </form>
    </section>

    <section class="metric-grid opening-metrics">
      <div class="metric-card"><div class="metric-label">현재 단계</div><div class="metric-value text-value">${esc(phase.label)}</div><div class="metric-note">${esc(phase.message || "")}</div></div>
      <div class="metric-card"><div class="metric-label">후원자 지정좌석</div><div class="metric-value">${stats.assignedSeatCount}</div><div class="metric-note">총 ${stats.designatedCapacity}석 · 잔여 ${stats.designatedRemaining}석</div></div>
      <div class="metric-card"><div class="metric-label">일반석 자유석</div><div class="metric-value">${stats.generalSeats}</div><div class="metric-note">자유석 기준 신청 인원</div></div>
      <div class="metric-card"><div class="metric-label">대기 인원</div><div class="metric-value">${waitlistSeats(opening.id)}</div><div class="metric-note">확정 전 대기 좌석</div></div>
    </section>


    <section class="card">
      <div class="section-title">
        <div>
          <h2>개막작 신청자 현황</h2>
          <p>후원자 사전예약은 지정좌석, 일반석은 자유석으로 표시됩니다.</p>
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
          <h2>${editing ? "상영 회차 수정" : "상영 회차 추가"}</h2>
          <p>시간, 영화제목, GV담당자, 모더레이터, 담당스태프, 연락처, 기타 사항을 언제든지 바꿀 수 있습니다.</p>
        </div>
        ${editing ? `<button class="btn btn-outline" type="button" data-action="cancel-edit">새 회차 추가로 전환</button>` : ""}
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
          <button class="btn btn-dark" type="submit">${editing ? "수정 저장" : "상영 회차 추가"}</button>
          <button class="btn btn-outline" type="button" data-action="export-screenings">상영 회차 CSV</button>
        </div>
      </form>
    </section>

    <section class="card">
      <div class="section-title">
        <div><h2>등록된 상영 회차</h2><p>삭제 시 해당 회차 신청 정보도 함께 정리할지 확인합니다.</p></div>
      </div>
      ${screeningTable(sortedScreenings(), { manage: true })}
    </section>
  `;
}

function adminReservations() {
  const options = sortedScreenings().map((s) => `<option value="${esc(s.id)}">${esc(s.venue)} · ${esc(s.title)}</option>`).join("");
  return `
    <section class="card">
      <div class="section-title">
        <div>
          <h2>신청자 명단</h2>
          <p>상영관을 기준으로 신청자 명단을 확인하고, 현장 참석과 신청 정보를 관리할 수 있습니다.</p>
        </div>
        <div class="cta-row">
          <button class="btn btn-dark" type="button" data-action="print">인쇄용 명단</button>
          <button class="btn btn-outline" type="button" data-action="export-reservations">신청자 CSV</button>
        </div>
      </div>
      <section class="filters reservation-filters" aria-label="신청자 필터">
        <input class="input" id="reservationSearch" type="search" placeholder="이름, 연락처, 영화, 메모 검색" />
        <select class="select" id="reservationScreeningFilter"><option value="">전체 회차</option>${options}</select>
        <select class="select" id="reservationStatusFilter"><option value="">전체 상태</option><option>확정</option><option>대기</option><option>취소</option></select>
        <select class="select" id="reservationAttendanceFilter"><option value="">전체 참석여부</option><option value="attended">참석</option><option value="not-attended">미참석</option></select>
        <select class="select" id="reservationTicketFilter"><option value="">전체 티켓구분</option><option value="얼리버드">얼리버드</option><option value="일반">일반석</option><option value="normal">일반상영</option></select>
        <button class="btn btn-outline" type="button" data-action="clear-reservation-filter">필터 초기화</button>
      </section>
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
  return `
    <div class="table-wrap reservation-table-wrap">
      <table class="reservation-table">
        <thead>
          <tr>
            <th>상영관</th><th>영화 / 시간</th><th>상태</th><th>참석</th><th>신청자</th><th>예약번호</th><th>티켓/좌석</th><th>인원</th><th>신청일</th><th>메모</th><th class="screen-only">관리</th>
          </tr>
        </thead>
        <tbody>
          ${sortedReservations.map((reservation) => {
            const screening = state.screenings.find((s) => s.id === reservation.screeningId);
            const attended = reservation.attended === true;
            return `
              <tr class="${attended ? "attended-row" : ""}">
                <td><strong>${esc(screening?.venue || "삭제된 상영관")}</strong></td>
                <td>${screening ? `<strong>${esc(screening.title)}</strong><br><span class="help">${esc(formatDateTime(screening.startTime))}</span>` : "삭제된 회차"}</td>
                <td><span class="badge ${reservationStatusClass(reservation)}">${esc(reservation.status)}</span></td>
                <td class="attendance-cell">
                  <span class="badge ${attended ? "ok" : "warn"} screen-only">${attended ? `참석 ${Number(reservation.attendedSeats || reservation.seats || 0)}명` : "미참석"}</span>
                  <button class="btn ${attended ? "btn-outline" : "btn-dark"} btn-small screen-only" type="button" data-action="set-attendance" data-id="${esc(reservation.id)}" data-attended="${attended ? "false" : "true"}" ${reservation.status === "취소" ? "disabled" : ""}>${attended ? "참석 취소" : "참석 확인"}</button>
                  <div class="print-only print-check"><span class="check-box">${attended ? "✓" : ""}</span></div>
                </td>
                <td><strong>${esc(reservation.name)}</strong><br><span class="help">${esc(reservation.phone || "-")} ${reservation.email ? `· ${esc(reservation.email)}` : ""}</span></td>
                <td><strong>${esc(reservation.id)}</strong><br><span class="help">${esc(reservation.ticketType || "일반")}</span></td>
                <td class="ticket-seat-cell"><strong>${esc(reservationTicketLabel(reservation, screening))}</strong><br><span class="help">${esc(reservationSeatLabel(reservation, screening))}</span>${reservation.donorName ? `<br><span class="help">후원자 ${esc(reservation.donorName)}</span>` : ""}</td>
                <td>${Number(reservation.seats || 0)}명</td>
                <td>${esc(formatDateTime(reservation.createdAt))}</td>
                <td class="table-note">${esc(reservation.note || "-")}</td>
                <td class="screen-only">
                  <div class="row-actions">
                    <button class="btn btn-outline btn-small" type="button" data-action="set-reservation-status" data-id="${esc(reservation.id)}" data-status="확정">확정</button>
                    <button class="btn btn-outline btn-small" type="button" data-action="set-reservation-status" data-id="${esc(reservation.id)}" data-status="대기">대기</button>
                    <button class="btn btn-outline btn-small" type="button" data-action="set-reservation-status" data-id="${esc(reservation.id)}" data-status="취소">취소</button>
                    <button class="btn btn-outline btn-small" type="button" data-action="staff-edit-reservation" data-id="${esc(reservation.id)}">수정</button>
                    <button class="btn btn-danger btn-small" type="button" data-action="delete-reservation" data-id="${esc(reservation.id)}">삭제</button>
                  </div>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}


function adminStats() {
  const byVenue = groupByVenue();
  const byDate = groupByDate();
  const screenings = sortedScreenings();
  const maxSeats = Math.max(1, ...screenings.map((s) => Math.max(confirmedSeats(s.id), actualAttendees(s.id))));
  return `
    <section class="grid-2">
      <div class="card">
        <div class="section-title"><div><h2>영화별 신청·참석률</h2><p>확정 신청 인원과 실제 참석 인원을 함께 봅니다.</p></div></div>
        <div class="chart-list">
          ${screenings.map((s) => `
            <div class="chart-row">
              <div class="chart-name">${esc(s.title)}<br><span class="help">${esc(s.venue)}</span></div>
              <div class="chart-track"><span style="width:${Math.min((confirmedSeats(s.id) / maxSeats) * 100, 100)}%"></span></div>
              <div class="chart-value">신청 ${confirmedSeats(s.id)}명<br><span class="help">참석 ${actualAttendees(s.id)}명</span></div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="card">
        <div class="section-title"><div><h2>상영관별 통계</h2><p>상영관별 정원 대비 확정 신청 인원과 실제 참석 인원입니다.</p></div></div>
        ${statsTable(byVenue, ["상영관", "회차", "정원", "확정 신청", "실제 참석", "대기", "신청률", "참석률"])}
      </div>
    </section>
    <section class="card">
      <div class="section-title"><div><h2>날짜별 통계</h2><p>일자별 운영 규모와 좌석 수요를 봅니다.</p></div></div>
      ${statsTable(byDate, ["날짜", "회차", "정원", "확정 신청", "실제 참석", "대기", "신청률", "참석률"])}
    </section>
    ${getOpeningScreening() ? `
    <section class="card">
      <div class="section-title"><div><h2>개막작 세부 통계</h2><p>후원자 지정좌석과 일반 자유석, 실제 참석 현황입니다.</p></div></div>
      <div class="opening-summary-grid">
        <div class="metric-card"><div class="metric-label">후원자 사전예약 확정</div><div class="metric-value">${openingStats(getOpeningScreening()).earlybirdSeats}</div><div class="metric-note">지정좌석 잔여 ${openingStats(getOpeningScreening()).designatedRemaining}석</div></div>
        <div class="metric-card"><div class="metric-label">일반석 확정</div><div class="metric-value">${openingStats(getOpeningScreening()).generalSeats}</div><div class="metric-note">자유석 운영</div></div>
        <div class="metric-card"><div class="metric-label">실제 참석</div><div class="metric-value">${actualAttendees(getOpeningScreening().id)}</div><div class="metric-note">현장 참석 확인 기준</div></div>
      </div>
    </section>` : ""}

    <section class="card">
      <div class="section-title">
        <div><h2>운영용 통계 내보내기</h2><p>보고서 작성, 공유, 현장 체크인 명단 준비에 활용하세요.</p></div>
      </div>
      <div class="cta-row">
        <button class="btn btn-dark" type="button" data-action="export-stats">통계 CSV 다운로드</button>
        <button class="btn btn-outline" type="button" data-action="export-reservations">신청자 CSV 다운로드</button>
        <button class="btn btn-outline" type="button" data-action="export-json">전체 JSON 백업</button>
      </div>
    </section>
  `;
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
    current.confirmed += confirmedSeats(screening.id);
    current.attended += actualAttendees(screening.id);
    current.canceledApplications += venueReservations.filter((r) => r.status === "취소").length;
    current.canceledSeats += venueReservations.filter((r) => r.status === "취소").reduce((sum, r) => sum + Number(r.seats || 0), 0);
    current.waitlist += waitlistSeats(screening.id);
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
    current.confirmed += confirmedSeats(screening.id);
    current.attended += actualAttendees(screening.id);
    current.waitlist += waitlistSeats(screening.id);
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
    <div class="table-wrap">
      <table>
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
          <h3>백업 다운로드</h3>
          <p>상영 회차, 신청자, 참석 체크, 후원 클릭 수를 하나의 JSON 파일로 저장합니다.</p>
          <div class="form-actions"><button class="btn btn-dark" type="button" data-action="export-json">전체 JSON 백업</button></div>
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
        <div class="badges"><span class="badge ok">얼리버드</span><span class="badge warn">후원자 사전예약</span><span class="badge blue">지정좌석</span></div>
        <h3>${esc(EARLYBIRD_MESSAGE)}입니다.</h3>
        <p>후원자명을 남기고 신청하면 확정 시 지정좌석이 자동 배정됩니다. 지정좌석 잔여 ${stats.designatedRemaining}석 / 총 ${stats.designatedCapacity}석</p>
      </div>
    `;
  }
  return `
    <div class="opening-booking-intro general">
      <div class="badges"><span class="badge blue">일반석</span><span class="badge">자유석</span></div>
      <h3>일반석 신청이 열렸습니다.</h3>
      <p>후원자 사전예약 기간이 종료되어 자유석으로 접수됩니다. 현장에서 예약번호와 신청자 이름을 알려주세요.</p>
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
        ${isEarlybird ? `
          <div>
            <label class="label" for="donorName">후원자명/입금자명 <span class="required">*</span></label>
            <input class="input" id="donorName" name="donorName" required placeholder="후원 확인용 이름" />
          </div>
          <div class="full">
            <div class="pre-donation-callout">
              <div>
                <strong>지금 후원하시겠습니까?</strong>
                <span>후원하기를 먼저 열어 후원하신 뒤, 같은 이름을 후원자명/입금자명에 적어주세요.</span>
              </div>
              <button class="btn btn-primary" type="button" data-action="donate">후원하기</button>
            </div>
          </div>
        ` : `
          <div class="full">
            <div class="free-seat-note"><strong>좌석 구분</strong><span>일반석은 자유석으로 운영됩니다.</span></div>
          </div>
        `}
        <div class="full">
          <label class="label" for="guestNote">요청 사항</label>
          <textarea class="textarea" id="guestNote" name="note" placeholder="접근성 지원, 동행자 정보, 기타 요청사항"></textarea>
        </div>
      </div>
      <p class="help">${isEarlybird ? "후원자 지정좌석 신청은 후원자명과 연락처를 기록합니다. 실제 후원 확인은 운영진이 후원 계좌 내역과 대조해 진행하세요." : "일반석은 지정좌석 없이 자유석으로 접수됩니다."}</p>
      <div class="donation-mini">
        <strong>개막작 후원은 영화제 운영에 큰 힘이 됩니다.</strong>
        <span>주민들이 직접 감독·기획·제작·상영하는 순수 주민주도영화제를 함께 만들어주세요.</span>
      </div>
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
    ["reservationSearch", "reservationScreeningFilter", "reservationStatusFilter", "reservationAttendanceFilter", "reservationTicketFilter"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateReservationTable);
      document.getElementById(id)?.addEventListener("change", updateReservationTable);
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
  const status = document.getElementById("reservationStatusFilter")?.value || "";
  const attendance = document.getElementById("reservationAttendanceFilter")?.value || "";
  const ticket = document.getElementById("reservationTicketFilter")?.value || "";
  const container = document.getElementById("reservationTable");
  if (!container) return;
  const filtered = [...state.reservations]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .filter((reservation) => {
      const screening = state.screenings.find((s) => s.id === reservation.screeningId);
      const text = `${reservation.id} ${reservation.name} ${reservation.phone} ${reservation.email} ${reservation.note} ${reservation.donorName || ""} ${reservation.seatAssignment || ""} ${screening?.title || ""} ${screening?.venue || ""}`.toLowerCase();
      const matchAttendance = !attendance || (attendance === "attended" ? reservation.attended === true : reservation.attended !== true);
      const ticketType = isOpeningScreening(screening) ? reservation.ticketType : "normal";
      const matchTicket = !ticket || ticketType === ticket;
      return (!search || text.includes(search)) && (!screeningId || reservation.screeningId === screeningId) && (!status || reservation.status === status) && matchAttendance && matchTicket;
    });
  container.innerHTML = reservationTable(filtered);
}

function handleDonate() {
  state.sponsorClicks = Number(state.sponsorClicks || 0) + 1;
  persist();
  window.open(DONATION_URL, "_blank", "noopener,noreferrer");
  toast("후원하기 페이지를 새 창으로 열었습니다.");
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

function reservationSmsSeatOnly(reservation, screening) {
  if (isOpeningScreening(screening)) {
    const label = reservationSeatLabel(reservation, screening);
    return label || (reservation.ticketType === "얼리버드" ? "지정좌석" : "자유석");
  }
  return "자유석";
}

function reservationSmsSeatAndPeople(reservation, screening) {
  return `${reservationSmsSeatOnly(reservation, screening)} / ${Math.max(1, Number(reservation.seats || 1))}명`;
}

function reservationConfirmationMessage(reservation, screening, status) {
  const statusLabel = status || reservation.status || "확정";
  const movieTitle = cleanMovieTitle(screening?.title);
  const venue = screening?.venue || "상영관 미정";
  const time = formatSmsDateTime(screening?.startTime);
  const statusText = statusLabel === "확정" ? "예약이 완료되었습니다." : "대기 신청으로 접수되었습니다.";
  return [
    `${reservation.name} 님 ${statusText}`,
    `예약번호: ${reservation.id}`,
    `영화명: ${movieTitle}`,
    `좌석/인원: ${reservationSmsSeatAndPeople(reservation, screening)}`,
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
    reservationId: reservation.id,
    name: String(reservation.name || "").trim(),
    phone: normalizePhoneForSms(reservation.phone),
    movieTitle: cleanMovieTitle(screening?.title),
    seatAndPeople: reservationSmsSeatAndPeople(reservation, screening),
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
  const seatNotice = openingReservation ? reservationSeatLabel(reservation, screening) : "";
  const confirmationMessage = reservationConfirmationMessage(reservation, screening, status);
  const title = openingReservation
    ? (isConfirmed ? "개막작 신청이 확정되었습니다." : "개막작 대기 신청으로 접수되었습니다.")
    : (isConfirmed ? "신청이 확정되었습니다." : "대기 신청으로 접수되었습니다.");
  const description = openingReservation
    ? (isConfirmed
      ? `${reservation.ticketType === "얼리버드" ? "후원자 지정좌석" : "일반석 자유석"}으로 접수되었습니다. 상영 당일 현장에서 예약번호와 신청자 이름을 알려주세요.`
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
          <strong>${esc(reservation.id)}</strong>
        </div>
        ${openingReservation ? `<div class="reservation-number-box seat-result-box"><span>${esc(reservationTicketLabel(reservation, screening))}</span><strong>${esc(seatNotice)}</strong></div>` : ""}
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
        <div class="sms-auto-box">
          <div>
            <h3>문자 자동발송</h3>
            <p>${isConfirmed ? "예약 확인 문자를 입력하신 연락처로 발송합니다." : "대기 신청은 운영진이 확정 처리한 뒤 문자 발송 버튼으로 안내할 수 있습니다."}</p>
            <span class="badge ${smsStatusClass(reservation)}" data-sms-status-for="${esc(reservation.id)}">${esc(smsStatusText(reservation))}</span>
          </div>
          <button class="btn btn-outline btn-small" type="button" data-result="send-sms-again" ${isConfirmed ? "" : "disabled"}>문자 다시 발송</button>
        </div>
        <div class="donation-box">
          <h3>후원을 지금 진행하시려면 클릭</h3>
          <p>후원 페이지로 이동하려면 <strong>후원하기</strong>, 신청만 마치려면 <strong>확인</strong>을 눌러주세요.</p>
        </div>
        <div class="form-actions result-actions">
          <button class="btn btn-primary" type="button" data-result="donate">후원하기</button>
          <button class="btn btn-outline" type="button" data-result="confirm">확인</button>
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
    if (result === "send-sms-again") {
      sendReservationSms(reservation, screening, { manual: true });
      return;
    }
    modal.remove();
    if (result === "donate") {
      handleDonate();
    } else {
      toast("신청이 완료되었습니다.");
    }
  });
  document.body.appendChild(modal);
  setTimeout(() => modal.querySelector('[data-result="donate"]')?.focus(), 0);
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
  let ticketType = isEarlybird ? "얼리버드" : "일반";
  let seatType = isEarlybird ? "지정좌석" : "자유석";
  let seatAssignment = seatType === "자유석" ? "자유석" : "";
  let donorName = "";
  let status = "대기";

  if (isEarlybird) {
    donorName = String(data.donorName || "").trim();
    if (!donorName) return toast("후원자명/입금자명을 입력해주세요.");
    const assignedSeats = assignDesignatedSeats(screening, seats);
    if (assignedSeats.length === seats && seats <= Math.max(remainingSeats(screening), 0)) {
      status = "확정";
      seatAssignment = assignedSeats.join(", ");
    } else {
      status = "대기";
      seatAssignment = "지정좌석 대기";
    }
  } else {
    status = seats <= Math.max(remainingSeats(screening), 0) ? "확정" : "대기";
    seatAssignment = status === "확정" ? "자유석" : "자유석 대기";
  }

  const reservation = normalizeReservation({
    id: uid("rsv"),
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
  const message = status === "확정" ? `개막작 신청이 확정되었습니다. 예약번호: ${reservation.id}` : `개막작 대기 신청으로 접수되었습니다. 예약번호: ${reservation.id}`;
  toast(message);
  showReservationComplete(reservation, status);
  autoSendReservationSms(reservation, screening, status);
}

function submitOpeningSettings(form) {
  const data = formDataObject(form);
  const opening = getOpeningScreening();
  const capacity = Math.max(1, Number(data.capacity || 1));
  const designatedSeatCount = Math.max(0, Math.min(Number(data.designatedSeatCount || 0), capacity));
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
    seatPrefix: String(data.seatPrefix || "A").trim() || "A",
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
  const status = seats <= Math.max(remainingSeats(screening), 0) ? "확정" : "대기";
  const reservation = normalizeReservation({
    id: uid("rsv"),
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
  const message = status === "확정" ? `신청이 확정되었습니다. 예약번호: ${reservation.id}` : `대기 신청으로 접수되었습니다. 예약번호: ${reservation.id}`;
  toast(message);
  showReservationComplete(reservation, status);
  autoSendReservationSms(reservation, screening, status);
}

function submitAdminLogin(form) {
  const pin = new FormData(form).get("pin");
  if (pin === ADMIN_PIN) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    toast("관리자 대시보드에 로그인했습니다.");
    render();
  } else {
    toast("PIN이 맞지 않습니다.");
  }
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
    if (status === "확정") {
      if (reservation.ticketType === "얼리버드") {
        const needsSeat = !reservation.seatAssignment || reservation.seatAssignment.includes("대기") || reservation.seatAssignment === "지정좌석";
        if (needsSeat) {
          const assignedSeats = assignDesignatedSeats(screening, Number(reservation.seats || 1));
          if (assignedSeats.length < Number(reservation.seats || 1)) {
            return toast("남은 후원자 지정좌석이 부족해 확정 처리할 수 없습니다.");
          }
          reservation.seatAssignment = assignedSeats.join(", ");
        }
        reservation.seatType = "지정좌석";
      } else if (reservation.ticketType === "일반") {
        reservation.seatType = "자유석";
        reservation.seatAssignment = "자유석";
      }
    }
    if (status === "대기") {
      if (reservation.ticketType === "얼리버드") {
        reservation.seatType = "지정좌석 대기";
        reservation.seatAssignment = "지정좌석 대기";
      } else if (reservation.ticketType === "일반") {
        reservation.seatType = "자유석 대기";
        reservation.seatAssignment = "자유석 대기";
      }
    }
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
  if (reservation.status === "취소" && attended) return toast("취소된 신청은 참석 처리할 수 없습니다.");

  if (attended === true) {
    const requestedSeats = Math.max(1, Number(reservation.seats || 1));
    const input = prompt(`${reservation.name}님의 실제 참석 인원을 입력하세요.`, String(reservation.attendedSeats || requestedSeats));
    if (input === null) return;
    const attendedSeats = Number(input);
    if (!Number.isFinite(attendedSeats) || attendedSeats < 0) {
      return toast("실제 참석 인원을 0 이상의 숫자로 입력해주세요.");
    }
    if (attendedSeats > requestedSeats) {
      return toast(`신청 인원 ${requestedSeats}명을 초과할 수 없습니다.`);
    }
    reservation.attended = attendedSeats > 0;
    reservation.attendedSeats = attendedSeats;
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
  const status = prompt("상태를 입력하세요: 확정 / 대기 / 취소", "확정") || "확정";
  const note = prompt("메모를 입력하세요.", "") || "";
  state.reservations.push(normalizeReservation({ id: uid("rsv"), screeningId: screening.id, name:name.trim(), phone:phone.trim(), email:"", seats, status:["확정","대기","취소"].includes(status)?status:"확정", attended:false, attendedSeats:0, note:note.trim(), createdAt:new Date().toISOString() }));
  persist(); render(); toast("신청자를 추가했습니다.");
}

function staffEditReservation(id) {
  const r = state.reservations.find(x => x.id === id);
  if (!r || !canManageReservation(r)) return toast("이 신청자를 관리할 권한이 없습니다.");
  const name = prompt("신청자 이름", r.name); if (name === null || !name.trim()) return;
  const phone = prompt("연락처", r.phone || ""); if (phone === null) return;
  const seats = Number(prompt("신청 인원", String(r.seats || 1))); if (!Number.isFinite(seats) || seats < 1) return toast("신청 인원을 확인하세요.");
  const note = prompt("메모", r.note || ""); if (note === null) return;
  r.name=name.trim(); r.phone=phone.trim(); r.seats=Math.floor(seats); r.note=note.trim();
  if (r.attendedSeats > r.seats) r.attendedSeats = r.seats;
  persist(); render(); toast("신청자 정보를 수정했습니다.");
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

function exportReservations() {
  const rows = [["예약번호", "상태", "신청구분", "좌석구분", "좌석번호", "후원자명/입금자명", "참석여부", "참석처리일", "영화", "상영관", "상영시간", "신청자", "연락처", "이메일", "문자수신동의", "문자상태", "문자발송일", "문자요청ID", "신청인원", "실제참석인원", "신청일", "메모"]];
  state.reservations.forEach((reservation) => {
    const screening = state.screenings.find((s) => s.id === reservation.screeningId);
    rows.push([
      reservation.id,
      reservation.status,
      reservationTicketLabel(reservation, screening),
      reservation.seatType || "",
      reservation.seatAssignment || "",
      reservation.donorName || "",
      reservation.attended === true ? "참석" : "미참석",
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
  downloadFile(`munae9_reservations_${todayFile()}.csv`, "\ufeff" + rows.map((row) => row.map(csvEscape).join(",")).join("\n"), "text/csv;charset=utf-8");
}

function exportScreenings() {
  const rows = [["회차ID", "영화", "상영관", "시작", "종료", "정원", "신청건수", "신청인원", "확정신청건수", "확정신청인원", "얼리버드지정좌석", "일반자유석", "참석확인건수", "실제참석인원", "대기인원", "신청률", "참석률", "상태", "개막작여부", "티켓팅단계", "GV", "모더레이터", "담당스태프", "연락처", "기타"]];
  sortedScreenings().forEach((s) => {
    const stats = isOpeningScreening(s) ? openingStats(s) : null;
    const phase = isOpeningScreening(s) ? openingPhaseInfo(s) : null;
    rows.push([s.id, s.title, s.venue, s.startTime, s.endTime, s.capacity, applicationCount(s.id), appliedSeats(s.id), applicationCount(s.id, "확정"), confirmedSeats(s.id), stats ? stats.earlybirdSeats : 0, stats ? stats.generalSeats : 0, attendedApplicationCount(s.id), actualAttendees(s.id), waitlistSeats(s.id), `${occupancyRate(s)}%`, `${attendanceRate(s.id)}%`, s.status, isOpeningScreening(s) ? "개막작" : "", phase ? phase.label : "", s.gvHost, s.moderator, s.staff, s.staffPhone, s.notes]);
  });
  downloadFile(`munae9_screenings_${todayFile()}.csv`, "\ufeff" + rows.map((row) => row.map(csvEscape).join(",")).join("\n"), "text/csv;charset=utf-8");
}

function exportStats() {
  const rows = [["영화", "상영관", "상영시간", "정원", "신청건수", "신청인원", "확정신청인원", "얼리버드지정좌석", "일반자유석", "실제참석인원", "대기", "남은좌석", "신청률", "참석률", "정원상태", "티켓팅단계"]];
  sortedScreenings().forEach((s) => {
    const stats = isOpeningScreening(s) ? openingStats(s) : null;
    const phase = isOpeningScreening(s) ? openingPhaseInfo(s) : null;
    rows.push([s.title, s.venue, s.startTime, s.capacity, applicationCount(s.id), appliedSeats(s.id), confirmedSeats(s.id), stats ? stats.earlybirdSeats : 0, stats ? stats.generalSeats : 0, actualAttendees(s.id), waitlistSeats(s.id), remainingSeats(s), `${occupancyRate(s)}%`, `${attendanceRate(s.id)}%`, statusInfo(s).text, phase ? phase.label : ""]);
  });
  rows.push([]);
  rows.push(["상영관별 통계"]);
  rows.push(["상영관", "회차", "정원", "확정신청", "실제참석", "대기", "신청률", "참석률"]);
  groupByVenue().forEach((row) => rows.push([row.name, row.screenings, row.capacity, row.confirmed, row.attended, row.waitlist, `${row.rate}%`, `${row.attendanceRate}%`]));
  rows.push([]);
  rows.push(["날짜별 통계"]);
  rows.push(["날짜", "회차", "정원", "확정신청", "실제참석", "대기", "신청률", "참석률"]);
  groupByDate().forEach((row) => rows.push([row.name, row.screenings, row.capacity, row.confirmed, row.attended, row.waitlist, `${row.rate}%`, `${row.attendanceRate}%`]));
  downloadFile(`munae9_stats_${todayFile()}.csv`, "\ufeff" + rows.map((row) => row.map(csvEscape).join(",")).join("\n"), "text/csv;charset=utf-8");
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
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const id = button.dataset.id;
  if (action === "donate") handleDonate();
  if (action === "play-video") playYoutubeVideo(button);
  if (action === "book") openBooking(id);
  if (action === "close-modal") closeModals();
  if (action === "view-roster") openRoster(id);
  if (action === "admin-logout") { sessionStorage.removeItem(ADMIN_SESSION_KEY); selectedScreeningId = null; render(); toast("로그아웃했습니다."); }
  if (action === "staff-add-reservation") staffAddReservation();
  if (action === "staff-edit-reservation") staffEditReservation(id);
  if (action === "staff-logout") { sessionStorage.removeItem(STAFF_SESSION_KEY); window.location.hash = "#/staff"; render(); toast("스태프 관리 화면에서 로그아웃했습니다."); }
  if (action === "print") window.print();
  if (action === "edit-screening") { selectedScreeningId = id; window.location.hash = "#/admin/screenings"; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  if (action === "cancel-edit") { selectedScreeningId = null; render(); }
  if (action === "delete-screening") deleteScreening(id);
  if (action === "set-reservation-status") setReservationStatus(id, button.dataset.status);
  if (action === "set-attendance") setAttendance(id, button.dataset.attended === "true");
  if (action === "copy-confirmation") copyReservationConfirmation(id);
  if (action === "send-sms") sendReservationSmsById(id);
  if (action === "delete-reservation") deleteReservation(id);
  if (action === "clear-reservation-filter") {
    ["reservationSearch", "reservationScreeningFilter", "reservationStatusFilter", "reservationAttendanceFilter", "reservationTicketFilter"].forEach((fieldId) => {
      const el = document.getElementById(fieldId);
      if (el) el.value = "";
    });
    updateReservationTable();
  }
  if (action === "export-reservations") exportReservations();
  if (action === "export-screenings") exportScreenings();
  if (action === "export-stats") exportStats();
  if (action === "export-json") exportJson();
  if (action === "reset-demo") {
    if (!confirm("데모 데이터로 초기화할까요? 현재 입력된 정보가 사라집니다.")) return;
    state = normalizeState({ screenings: cloneData(seedScreenings), reservations: cloneData(seedReservations), sponsorClicks: 0, lastUpdated: new Date().toISOString() });
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
  if (form.id === "adminLoginForm") submitAdminLogin(form);
  if (form.id === "staffLoginForm") submitStaffLogin(form);
  if (form.id === "staffPinChangeForm") submitStaffPinChange(form);
  if (form.id === "openingForm") submitOpeningSettings(form);
  if (form.id === "screeningForm") submitScreening(form);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModals();
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (!hash.startsWith("admin/screenings")) selectedScreeningId = null;
  render();
});

render();
