const DONATION_MESSAGE = "머내마을영화제는 마을 사람들의 품앗이로 함께 준비하고 함께 즐기던 전통적인 마을축제의 정신을 영화로 이어가는 주민 참여형 영화제입니다.\n\n주민들은 기획, 운영, 프로그래머, 공연, 연출, 스탭 등 영화제의 모든 과정에서 활약하고 있습니다.\n\n이러한 우리들의 이야기는 한 편의 영화이자 새로운 마을의 문화를 만들어가는 과정입니다.\n\n함께 영화를 만들고, 함께 영화를 보며, 함께 이야기를 나누는 경험은 사람과 사람을 연결하는 매개가 되고, 서로의 삶과 이야기를 나누는 공통의 언어가 됩니다.\n\n어느덧 10주년을 바라보는 머내마을영화제는 이러한 연대의 힘을 바탕으로 삭막한 아파트촌에서 마을의 다정함을 발견하게 되었습니다.\n\n머내마을영화제의 가장 중요한 가치는 ‘함께 만드는 사람들’입니다. 우리 동네 사람들, 바로 여러분의 단단한 지지가 필요합니다.\n\n작은 후원의 손길은 함께하는 가치를 만들어내고 또다시 10년을 꿈꾸는 열린 발걸음을 내딛는 힘이 됩니다.\n\n머내마을영화제를 지속해 갈 수 있도록 머내엔영화의 회원이 되어주세요. 여러분의 후원을 기다립니다.";

const DONATION_AMOUNT = 10000;
const DONATION_BANK_NAME = "신협";
const DONATION_ACCOUNT_NUMBER = "131-022-582247";
const DONATION_ACCOUNT_HOLDER = "머내엔영화";
// 별도의 간편이체/결제 링크가 있다면 입력하세요. 비워두면 계좌이체 안내 화면을 표시합니다.
const DONATION_TRANSFER_URL = "https://aq.gy/f/2hekV";
const LAST_DONATION_SESSION_KEY = "munae-last-donation-id";
const STORAGE_KEY = "munaeFilmFest9.webapp.v1";
const ADMIN_SESSION_KEY = "munaeFilmFest9.admin";
const STAFF_SESSION_KEY = "munaeFilmFest9.staff";
const ADMIN_AUTH_API_ENDPOINT = "/api/admin-auth";
const SMS_API_ENDPOINT = "/api/send-sms";
const CANCELED_SMS_BLOCK_MESSAGE = "취소건의 대해서는 예약문자발송이 안됩니다";
const SUPABASE_STATE_API_ENDPOINT = "/api/supabase-state";
const RESERVATION_MANAGE_API_ENDPOINT = "/api/reservation-manage";
const AUTO_SEND_SMS_ON_CONFIRMED_RESERVATION = true;
const PRIVACY_CONSENT_VERSION = "2026-07-19-v1";
const PRIVACY_CONSENT_TITLE = "개인정보 수집·이용 및 초상권 사용에 대한 동의서";
const PRIVACY_CONSENT_TEXT = "머내마을영화제에서는 상영작 경과보고와 홍보물 제작에 관련하여 「개인정보보호법」 제15조(개인정보의 수집·이용)에 따라 개인정보를 수집·이용하고 초상권 사용을 관리합니다. 개인정보 및 초상권의 보유 및 이용 기간은 3년입니다. 개인정보 수집·이용 및 초상권 사용에 대한 동의를 거부할 권리가 있으나, 동의를 거부할 경우 제9회 머내마을영화제 참여에 제한을 받을 수 있습니다.";

const FESTIVAL_START_DATE = "2026-09-09";
const FESTIVAL_END_DATE = "2026-09-13";
const FESTIVAL_PERIOD_LABEL = "9월 9일 ~ 9월 13일";
const SCREENING_AGE_RATINGS = ["15세이상", "12세이상", "전체관람가"];
const SCREENING_CATEGORY_COLOR_ASSIGNMENTS = new Map();
const OPENING_FILM_ID = "scr-opening";
const OPENING_MAIN_LEGACY_END_AT = "2026-09-09T23:59";
const OPENING_MAIN_END_AT = "2026-07-17T23:59";
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
  category: "개막작",
  title: "개막식 영화: 얼굴",
  venue: "동천농협강당",
  startTime: "2026-09-09T19:00",
  endTime: "2026-09-09T21:30",
  runtimeMinutes: 150,
  ageRating: "15세이상",
  director: "조세영",
  capacity: 120,
  gvHost: "박정민 배우",
  moderator: "개막식 모더레이터",
  staff: "개막식 운영팀",
  staffPhone: "",
  staffPin: "",
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
    category: "마을영화",
    title: "마을의 첫 장면",
    venue: "동천농협강당",
    startTime: "2026-09-09T16:00",
    endTime: "2026-09-09T17:30",
    runtimeMinutes: 90,
    ageRating: "전체관람가",
    director: "김머내",
    capacity: 120,
    gvHost: "김머내 감독",
    moderator: "박진행",
    staff: "이현장",
    staffPhone: "",
  staffPin: "",
    status: "신청 가능",
    notes: "영화제 첫날 주민 제작 상영 및 관객과의 대화"
  },
  {
    id: "scr-002",
    category: "다큐멘터리",
    title: "동네를 걷는 사람들",
    venue: "커뮤니티홀",
    startTime: "2026-09-10T14:00",
    endTime: "2026-09-10T15:35",
    runtimeMinutes: 95,
    ageRating: "12세이상",
    director: "장다큐",
    capacity: 55,
    gvHost: "장다큐 감독",
    moderator: "한기획",
    staff: "최스태프",
    staffPhone: "",
  staffPin: "",
    status: "신청 가능",
    notes: "다큐멘터리 섹션"
  },
  {
    id: "scr-003",
    category: "어린이",
    title: "아이들의 영화관",
    venue: "작은도서관 상영실",
    startTime: "2026-09-11T10:30",
    endTime: "2026-09-11T11:50",
    runtimeMinutes: 80,
    ageRating: "전체관람가",
    director: "오어린이",
    capacity: 35,
    gvHost: "",
    moderator: "",
    staff: "오어린이",
    staffPhone: "",
  staffPin: "",
    status: "신청 가능",
    notes: "가족 관객 추천, 전체 관람가"
  },
  {
    id: "scr-004",
    category: "야외상영",
    title: "밤의 상영회",
    venue: "야외마당",
    startTime: "2026-09-11T19:30",
    endTime: "2026-09-11T21:10",
    runtimeMinutes: 100,
    ageRating: "12세이상",
    director: "윤밤",
    capacity: 120,
    gvHost: "",
    moderator: "윤밤",
    staff: "정야외",
    staffPhone: "",
  staffPin: "",
    status: "신청 가능",
    notes: "우천 시 커뮤니티홀로 변경"
  },
  {
    id: "scr-005",
    category: "단편",
    title: "청년 단편 모음",
    venue: "머내마을극장 2관",
    startTime: "2026-09-12T13:00",
    endTime: "2026-09-12T14:30",
    runtimeMinutes: 90,
    ageRating: "15세이상",
    director: "단편 감독팀",
    capacity: 45,
    gvHost: "단편 감독팀",
    moderator: "서청년",
    staff: "강단편",
    staffPhone: "",
  staffPin: "",
    status: "신청 가능",
    notes: "상영 후 단체 GV"
  },
  {
    id: "scr-006",
    category: "폐막작",
    title: "폐막: 다시 만나는 마을",
    venue: "머내마을극장 1관",
    startTime: "2026-09-13T17:00",
    endTime: "2026-09-13T18:45",
    runtimeMinutes: 105,
    ageRating: "전체관람가",
    director: "이현장",
    capacity: 80,
    gvHost: "폐막 게스트",
    moderator: "박진행",
    staff: "이현장",
    staffPhone: "",
  staffPin: "",
    status: "신청 가능",
    notes: "폐막 인사 및 단체 사진 촬영"
  }
];

// 로컬 화면에서 동시간대 카드 배치를 검토하기 위한 표시 전용 상영작입니다.
// 실제 신청 데이터나 원격 백업에는 저장되지 않습니다.
const SAME_TIME_LAYOUT_PREVIEW_SCREENING = {
  id: "layout-preview-20260909-1600",
  category: "마을영화",
  title: "같은 시간, 다른 이야기",
  venue: "커뮤니티홀",
  startTime: "2026-09-09T17:00",
  endTime: "2026-09-09T18:20",
  runtimeMinutes: 80,
  ageRating: "전체관람가",
  director: "정마을",
  capacity: 60,
  gvHost: "정마을 감독",
  moderator: "김진행",
  staff: "배치 테스트",
  staffPhone: "",
  staffPin: "",
  status: "신청 가능",
  notes: "동시간대 상영작 나열 방법을 확인하기 위한 로컬 테스트 카드",
  layoutPreview: true
};

// 강제 예약 그룹의 박스 배치와 1회 예약 안내를 로컬에서 확인하기 위한 표시 전용 회차입니다.
const FORCED_GROUP_LAYOUT_PREVIEW_SCREENINGS = Array.from({ length: 6 }, (_, index) => {
  const hour = 10 + index;
  const hourText = String(hour).padStart(2, "0");
  return {
    id: `forced-group-preview-${hourText}00`,
    category: "특별상영",
    bookingGroup: "과달카날 레퀴엠 연속상영",
    title: "과달카날 레퀴엠",
    venue: "연속상영관",
    startTime: `2026-09-12T${hourText}:00`,
    endTime: `2026-09-12T${hourText}:55`,
    runtimeMinutes: 55,
    ageRating: "12세이상",
    director: "감독명",
    capacity: 40,
    gvHost: "",
    moderator: "",
    staff: "배치 테스트",
    staffPhone: "",
    staffPin: "",
    status: "신청 가능",
    notes: "강제 예약 그룹 미리보기",
    layoutPreview: true
  };
});

// 4편 그룹의 남는 두 칸에 뒤따르는 단독 상영작이 채워지는지 확인하는 표시 전용 자료입니다.
const PACKED_GROUP_LAYOUT_PREVIEW_SCREENINGS = [
  ...FORCED_GROUP_LAYOUT_PREVIEW_SCREENINGS.slice(0, 4).map((screening, index) => ({
    ...screening,
    id: `packed-group-preview-${index + 1}`,
    bookingGroup: "",
    title: ["그룹 영화 하나", "그룹 영화 둘", "그룹 영화 셋", "그룹 영화 넷"][index],
    startTime: `2026-09-14T${["14:00", "14:20", "14:40", "15:00"][index]}`,
    endTime: `2026-09-14T${["14:55", "15:15", "15:35", "15:55"][index]}`,
    notes: "자동 시간 그룹 빈칸 채우기 미리보기"
  })),
  {
    ...SAME_TIME_LAYOUT_PREVIEW_SCREENING,
    id: "packed-group-filler-1",
    title: "빈자리로 이동한 영화 하나",
    startTime: "2026-09-14T17:00",
    endTime: "2026-09-14T18:20"
  },
  {
    ...SAME_TIME_LAYOUT_PREVIEW_SCREENING,
    id: "packed-group-filler-2",
    title: "빈자리로 이동한 영화 둘",
    startTime: "2026-09-14T19:00",
    endTime: "2026-09-14T20:20"
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
    phone: "",
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
    phone: "",
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


const DEMO_RESERVATION_IDS = new Set(seedReservations.map((item) => item.id));

function isDemoReservation(reservation = {}) {
  if (DEMO_RESERVATION_IDS.has(reservation.id)) return true;
  const demo = seedReservations.find((item) => item.id === reservation.id || item.reservationNumber === reservation.reservationNumber);
  if (!demo) return false;
  return String(reservation.name || "") === String(demo.name || "") && String(reservation.phone || "") === String(demo.phone || "");
}

function removeDemoReservations(reservations = []) {
  return Array.isArray(reservations) ? reservations.filter((reservation) => !isDemoReservation(reservation)) : [];
}

let state = loadState();
let selectedScreeningId = null;
let draggedScheduleCardId = "";
let draggedScheduleBlockId = "";
let reservationSmsSelectMode = false;
let selectedReservationSmsIds = new Set();
let selectedReservationActionId = null;
let reservationSmsHistoryOpen = false;
const RESERVATION_MANAGE_SESSION_KEY = "munaeFilmFest9.reservationManageSession";
let reservationManageChallenge = "";
let reservationManagePhone = "";
let reservationManageSession = sessionStorage.getItem(RESERVATION_MANAGE_SESSION_KEY) || "";
let reservationManageItems = [];
let reservationManageLoading = false;
let reservationManageMessage = "";

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function screeningRuntimeMinutes(screening = {}, fallback = {}) {
  const explicit = Number(screening.runtimeMinutes || fallback.runtimeMinutes || 0);
  if (explicit > 0) return Math.round(explicit);
  const start = new Date(screening.startTime || fallback.startTime || "");
  const end = new Date(screening.endTime || fallback.endTime || "");
  const calculated = Math.round((end.getTime() - start.getTime()) / 60000);
  return Number.isFinite(calculated) && calculated > 0 ? calculated : 60;
}

function screeningEndTimeFromRuntime(startTime, runtimeMinutes) {
  const start = new Date(startTime || "");
  if (Number.isNaN(start.getTime())) return "";
  const end = new Date(start.getTime() + Math.max(1, Number(runtimeMinutes || 60)) * 60000);
  const pad = (value) => String(value).padStart(2, "0");
  return `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}`;
}

function finalizeScreeningMetadata(screening = {}, fallback = {}) {
  const runtimeMinutes = screeningRuntimeMinutes(screening, fallback);
  const startTime = String(screening.startTime || fallback.startTime || "");
  const title = String(screening.title || fallback.title || "").trim();
  const bookingGroupDisabled = screening.bookingGroupDisabled === true || fallback.bookingGroupDisabled === true;
  const bookingGroup = bookingGroupDisabled ? "" : (String(screening.bookingGroup || fallback.bookingGroup || "").trim()
    || (title.includes("과달카날 레퀴엠") ? "과달카날 레퀴엠 연속상영" : ""));
  const ageRating = SCREENING_AGE_RATINGS.includes(screening.ageRating)
    ? screening.ageRating
    : (SCREENING_AGE_RATINGS.includes(fallback.ageRating) ? fallback.ageRating : "전체관람가");
  const rawScheduleOrder = screening.scheduleOrder ?? fallback.scheduleOrder;
  const scheduleOrder = rawScheduleOrder === "" || rawScheduleOrder == null || !Number.isFinite(Number(rawScheduleOrder))
    ? null
    : Math.max(0, Number(rawScheduleOrder));
  const scheduleRowValue = screening.scheduleRow ?? fallback.scheduleRow;
  const scheduleColumnValue = screening.scheduleColumn ?? fallback.scheduleColumn;
  const scheduleRow = scheduleRowValue !== "" && scheduleRowValue != null && Number.isFinite(Number(scheduleRowValue))
    ? Math.max(1, Math.round(Number(scheduleRowValue)))
    : null;
  const scheduleColumn = scheduleColumnValue !== "" && scheduleColumnValue != null && Number.isFinite(Number(scheduleColumnValue))
    ? Math.max(1, Math.min(3, Math.round(Number(scheduleColumnValue))))
    : null;
  const scheduleGroupOrientation = ["horizontal", "vertical"].includes(screening.scheduleGroupOrientation)
    ? screening.scheduleGroupOrientation
    : (["horizontal", "vertical"].includes(fallback.scheduleGroupOrientation) ? fallback.scheduleGroupOrientation : "horizontal");
  return {
    ...screening,
    category: String(screening.category || fallback.category || (screening.isOpening ? "개막작" : "기타")).trim() || "기타",
    runtimeMinutes,
    ageRating,
    director: String(screening.director || fallback.director || "").trim(),
    bookingGroup,
    bookingGroupDisabled,
    scheduleOrder,
    scheduleRow,
    scheduleColumn,
    scheduleGroupOrientation,
    startTime,
    endTime: screeningEndTimeFromRuntime(startTime, runtimeMinutes)
  };
}

function screeningCategoryColorIndex(category = "") {
  const text = String(category || "기타").trim() || "기타";
  if (!SCREENING_CATEGORY_COLOR_ASSIGNMENTS.has(text)) {
    SCREENING_CATEGORY_COLOR_ASSIGNMENTS.set(text, (SCREENING_CATEGORY_COLOR_ASSIGNMENTS.size % 6) + 1);
  }
  return SCREENING_CATEGORY_COLOR_ASSIGNMENTS.get(text);
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
    // v85: 모바일/새 기기에서도 개막작 광고 노출 종료 설정이 동일하게 적용되도록
    // 이전 기본값(행사 당일까지 노출)을 가진 저장 데이터는 현재 기본 종료일로 자동 보정합니다.
    const openingEndRaw = String(merged.openingMainEndAt || "").trim();
    if (!openingEndRaw || openingEndRaw === OPENING_MAIN_LEGACY_END_AT) merged.openingMainEndAt = OPENING_MAIN_END_AT;
    merged.posterSrc = merged.posterSrc || OPENING_POSTER_SRC;
    merged.videoUrl = merged.videoUrl || OPENING_VIDEO_URL;
    merged.videoEmbedUrl = youtubeEmbedUrl(merged.videoUrl || merged.videoEmbedUrl || OPENING_VIDEO_URL) || OPENING_VIDEO_EMBED;
    if (!screening?.videoTitle || screening.videoTitle === "영화 얼굴 소개영상") merged.videoTitle = OPENING_VIDEO_TITLE;
    merged.designatedSeatCount = Math.max(0, Number(merged.designatedSeatCount || seedOpeningScreening.designatedSeatCount));
    merged.maxTicketsPerReservation = Math.max(1, Number(merged.maxTicketsPerReservation || seedOpeningScreening.maxTicketsPerReservation));
    merged.seatPrefix = String(merged.seatPrefix || seedOpeningScreening.seatPrefix || "A").trim() || "A";
    merged.staffPin = String(merged.staffPin || seedOpeningScreening.staffPin || "").trim();
    return finalizeScreeningMetadata(merged, seedOpeningScreening);
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
    return finalizeScreeningMetadata(migrated, seed);
  }
  return finalizeScreeningMetadata({ ...screening, staffPin: String(screening?.staffPin || seed?.staffPin || "").trim(), isOpening: false }, seed);
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
  const rawAttendanceStatus = String(base.attendanceStatus || "").trim();
  const normalizedAttendanceStatus = attended
    ? "참석"
    : (rawAttendanceStatus === "미참석" ? "미참석" : "신청");
  const normalizedStatus = ["확정", "대기", "취소"].includes(String(base.status || "")) ? String(base.status) : "확정";
  return {
    ...base,
    reservationNumber: base.reservationNumber || "",
    seats,
    status: normalizedStatus,
    attended,
    attendedSeats,
    attendanceStatus: normalizedAttendanceStatus,
    attendedAt: attended ? (base.attendedAt || base.updatedAt || base.createdAt || new Date().toISOString()) : "",
    canceledAt: base.canceledAt || "",
    canceledBy: base.canceledBy || "",
    cancelReason: base.cancelReason || "",
    ticketType,
    seatType,
    seatAssignment: "",
    donorName: base.donorName || "",
    privacyConsent: base.privacyConsent === true,
    privacyConsentAt: base.privacyConsentAt || "",
    privacyConsentVersion: base.privacyConsentVersion || "",
    smsConsent: base.smsConsent !== false,
    smsStatus: base.smsStatus || "미발송",
    smsSentAt: base.smsSentAt || "",
    smsError: base.smsError || "",
    smsRequestId: base.smsRequestId || "",
    smsHistory: Array.isArray(base.smsHistory) ? base.smsHistory.map((entry, index) => ({
      id: String(entry?.id || `sms-history-${index + 1}`),
      type: entry?.type === "notice" ? "notice" : "reservation",
      status: String(entry?.status || "발송완료"),
      sentAt: entry?.sentAt || entry?.createdAt || "",
      message: String(entry?.message || ""),
      requestId: String(entry?.requestId || ""),
      error: String(entry?.error || "")
    })) : [],
    note: cleanReservationNote(base.note)
  };
}

function normalizeGeneralAdmins(data = {}) {
  const source = Array.isArray(data.generalAdmins) ? data.generalAdmins : [];
  const normalized = source.map((admin, index) => ({
    id: String(admin?.id || `admin-${index + 1}`),
    name: String(admin?.name || "").trim(),
    password: String(admin?.password || admin?.pin || "").trim(),
    createdAt: admin?.createdAt || "",
    updatedAt: admin?.updatedAt || ""
  })).filter((admin) => admin.name && admin.password);
  if (normalized.length) return normalized;
  return [{
    id: "admin-default",
    name: "일반관리자",
    password: String(data.adminPin || ""),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }];
}

function reservationAttendanceState(reservation = {}) {
  const status = String(reservation.attendanceStatus || "").trim();
  if (reservation.attended === true || status === "참석") return "참석";
  if (status === "미참석") return "미참석";
  return "신청";
}

function isUnattendedReservation(reservation = {}) {
  return reservation.status !== "취소" && reservationAttendanceState(reservation) === "미참석";
}

function isCanceledReservation(reservation = {}) {
  return String(reservation.status || "") === "취소";
}


function defaultSurveySettings() {
  return {
    enabled: false,
    autoSmsEnabled: false,
    sendDelayMinutes: 5,
    responseDeadlineDays: 7,
    preventDuplicate: true,
    surveyTitle: "만족도조사",
    surveyIntro: "{이름} 님, 〈{영화명}〉 관람은 어떠셨나요?",
    privacyNotice: "응답 내용은 영화제 운영 개선과 결과 정리를 위해 사용되며 관리자만 확인할 수 있습니다. 개인정보와 설문 응답은 신청 시 안내한 보유기간에 따라 관리됩니다.",
    completionTitle: "응답해 주셔서 감사합니다.",
    completionMessage: "소중한 의견은 다음 영화제를 준비하는 데 사용하겠습니다.",
    smsTemplate: "[머내마을영화제]\n{이름} 님, 〈{영화명}〉 관람은 어떠셨나요?\n만족도조사에 참여해 주세요.\n{설문링크}"
  };
}

function defaultSurveyQuestions() {
  return [
    { id: "q-overall", enabled: true, order: 1, type: "rating", title: "관람하신 영화에 얼마나 만족하셨나요?", choices: "", required: true },
    { id: "q-venue", enabled: true, order: 2, type: "rating", title: "상영 장소와 환경은 만족스러웠나요?", choices: "", required: true },
    { id: "q-guide", enabled: true, order: 3, type: "rating", title: "영화제 진행과 안내는 만족스러웠나요?", choices: "", required: true },
    { id: "q-return", enabled: true, order: 4, type: "single", title: "다음에도 머내마을영화제에 참여하고 싶으신가요?", choices: "예, 아니오, 잘 모르겠음", required: true },
    { id: "q-good", enabled: true, order: 5, type: "text", title: "가장 좋았던 점은 무엇인가요?", choices: "", required: false },
    { id: "q-improve", enabled: true, order: 6, type: "text", title: "개선되었으면 하는 점은 무엇인가요?", choices: "", required: false }
  ];
}

function normalizeSurveySettings(settings = {}) {
  const defaults = defaultSurveySettings();
  return {
    ...defaults,
    ...settings,
    enabled: settings.enabled === true,
    autoSmsEnabled: settings.autoSmsEnabled === true,
    sendDelayMinutes: Math.max(1, Number(settings.sendDelayMinutes || defaults.sendDelayMinutes)),
    responseDeadlineDays: Math.max(1, Number(settings.responseDeadlineDays || defaults.responseDeadlineDays)),
    preventDuplicate: settings.preventDuplicate !== false,
    surveyTitle: String(settings.surveyTitle || defaults.surveyTitle).trim(),
    surveyIntro: String(settings.surveyIntro || defaults.surveyIntro).trim(),
    privacyNotice: String(settings.privacyNotice || defaults.privacyNotice).trim(),
    completionTitle: String(settings.completionTitle || defaults.completionTitle).trim(),
    completionMessage: String(settings.completionMessage || defaults.completionMessage).trim(),
    smsTemplate: String(settings.smsTemplate || defaults.smsTemplate)
  };
}

function normalizeSurveyQuestions(questions) {
  const source = Array.isArray(questions) && questions.length ? questions : defaultSurveyQuestions();
  return source.map((q, index) => ({
    id: String(q.id || `q-${Date.now()}-${index}`),
    enabled: q.enabled !== false,
    order: Math.max(1, Number(q.order || index + 1)),
    type: ["rating", "single", "multiple", "text"].includes(q.type) ? q.type : "text",
    title: String(q.title || "").trim() || `문항 ${index + 1}`,
    choices: String(q.choices || ""),
    required: q.required === true
  })).sort((a, b) => a.order - b.order);
}

function normalizeSurveyScreenings(value = {}) {
  const result = {};
  Object.keys(value || {}).forEach((key) => {
    const item = value[key] || {};
    result[key] = { enabled: item.enabled !== false, autoSmsEnabled: item.autoSmsEnabled === true };
  });
  return result;
}

function surveyScreeningConfig(screeningId) {
  return state.surveyScreenings?.[screeningId] || { enabled: true, autoSmsEnabled: false };
}

function surveyTypeLabel(type) {
  return { rating: "별점 5점", single: "단일선택", multiple: "복수선택", text: "주관식" }[type] || type;
}

function surveySettingLabel(value) {
  return value ? "ON" : "OFF";
}

function surveySummaryStats() {
  const responses = realSurveyResponses();
  const dispatches = realSurveyDispatches();
  const sent = dispatches.filter(isSuccessfulSurveyDispatch).length;
  const ratingQuestion = (state.surveyQuestions || defaultSurveyQuestions()).find((q) => q.enabled !== false && q.type === "rating");
  const overall = responses.map((item) => Number(item.overallRating || item.answers?.[ratingQuestion?.id || "q-overall"] || 0)).filter((n) => n > 0);
  const avg = overall.length ? (overall.reduce((sum, n) => sum + n, 0) / overall.length).toFixed(1) : "-";
  return { responses: responses.length, dispatches: dispatches.length, sent, average: avg };
}

function surveyToken() {
  if (window.crypto?.getRandomValues) {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function surveyPublicBaseUrl() {
  const origin = window.location.origin && window.location.origin !== "null" ? window.location.origin : "https://cine-event.vercel.app";
  return `${origin}/survey.html`;
}

function encodeSurveyWebhookUrl() {
  try { return btoa(unescape(encodeURIComponent(getDriveWebhookUrl() || ""))); } catch (error) { return ""; }
}

function surveyLinkForDispatch(dispatch) {
  const params = new URLSearchParams({ t: dispatch.token || "" });
  const encodedWebhook = encodeSurveyWebhookUrl();
  if (encodedWebhook) params.set("w", encodedWebhook);
  return `${surveyPublicBaseUrl()}?${params.toString()}`;
}

function findSurveyDispatchByReservation(reservationId) {
  return (state.surveyDispatches || []).find((item) => item.reservationId === reservationId);
}

function ensureSurveyDispatch(reservation, screening) {
  let dispatch = findSurveyDispatchByReservation(reservation.id);
  if (dispatch) return dispatch;
  dispatch = {
    id: `sd-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    reservationId: reservation.id,
    screeningId: screening?.id || "",
    reservationNumber: reservationDisplayNumber(reservation, screening),
    token: surveyToken(),
    name: reservation.name || "",
    phone: reservation.phone || "",
    movieTi