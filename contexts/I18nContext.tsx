"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "en" | "id";

// @note translation strings
const translations = {
  en: {
    // @note navbar
    navTitle: "Fish It Event",
    navWhy: "Why?",
    navSource: "Source",

    // @note event list
    eventsTitle: "Upcoming Fish It Events",
    eventsLastUpdated: "Last updated",
    eventsRefresh: "Refresh",
    eventsLoading: "Loading events...",
    eventsError: "Failed to load events",
    eventsRetry: "Retry",
    eventsEmpty: "No events found",
    eventsNote: "Note",

    // @note event card
    eventStatusActive: "Active",
    eventStatusUpcoming: "Upcoming",
    eventStatusEnded: "Ended",
    eventHostedBy: "Hosted by",
    eventStart: "Start",
    eventEnd: "End",
    eventStartsIn: "Event starts in",
    eventEndsIn: "Event ends in",
    eventEnded: "This event has ended",
    eventLoading: "Loading...",

    // @note time units
    timeDay: "d",
    timeHour: "h",
    timeMinute: "m",
    timeSecond: "s",

    // @note disclaimer
    disclaimerTitle: "Event times may vary",
    disclaimerText: "The scheduled start time might not be exact. Events could be delayed by 30 minutes or more at the discretion of Fish It developers. Please check back closer to the event time for updates.",
    disclaimerDiscord: "For real-time updates, join the",
    disclaimerDiscordServer: "Fish It Discord Server",

    // @note timezone
    timezoneLabel: "Timezone",
    timezoneLocal: "Local Time",

    // @note why page
    whyTitle: "Why I Made This",
    whyProblem: "The Problem",
    whyProblemText: "Many Fish It players don't know or get confused about when events are held in their local time. Events are announced in UTC or server time, which makes it difficult for players from different timezones to know exactly when to join.",
    whySolution: "The Solution",
    whySolutionText: "I created this website to help players easily see when Fish It events start in their own timezone. Now you can plan ahead and login before the event starts so you don't miss out on any rewards!",
    whyFeatures: "Features",
    whyFeature1: "Real-time countdown timers for all events",
    whyFeature2: "Automatic timezone detection and conversion",
    whyFeature3: "Clean and simple interface",
    whyBugs: "Found a Bug?",
    whyBugsText: "If you find any bugs or have suggestions, please report them to me on Discord:",
    whyContactDiscord: "Contact on Discord",
    whyBackHome: "Back to Events",
  },
  id: {
    // @note navbar
    navTitle: "Fish It Event",
    navWhy: "Kenapa?",
    navSource: "Source",

    // @note event list
    eventsTitle: "Event Fish It Yang Akan Datang",
    eventsLastUpdated: "Terakhir diperbarui",
    eventsRefresh: "Refresh",
    eventsLoading: "Memuat event...",
    eventsError: "Gagal memuat event",
    eventsRetry: "Coba Lagi",
    eventsEmpty: "Tidak ada event",
    eventsNote: "Catatan",

    // @note event card
    eventStatusActive: "Aktif",
    eventStatusUpcoming: "Akan Datang",
    eventStatusEnded: "Berakhir",
    eventHostedBy: "Hosted by",
    eventStart: "Mulai",
    eventEnd: "Selesai",
    eventStartsIn: "Event dimulai dalam",
    eventEndsIn: "Event berakhir dalam",
    eventEnded: "Event ini telah berakhir",
    eventLoading: "Memuat...",

    // @note time units
    timeDay: "h",
    timeHour: "j",
    timeMinute: "m",
    timeSecond: "d",

    // @note disclaimer
    disclaimerTitle: "Waktu event dapat berubah",
    disclaimerText: "Waktu mulai yang dijadwalkan mungkin tidak tepat. Event bisa tertunda 30 menit atau lebih atas kebijakan developer Fish It. Silakan periksa kembali mendekati waktu event untuk pembaruan. Mulainya waktu yang dijadwalkan kemungkinan bisa berubah. Event bisa tertunda 30 menit atau lebih tergantung kepada developer Fish It itu sendiri.",
    disclaimerDiscord: "Untuk info terbaru, join ke",
    disclaimerDiscordServer: "Discord Server Fish It",

    // @note timezone
    timezoneLabel: "Zona Waktu",
    timezoneLocal: "Waktu Lokal",

    // @note why page
    whyTitle: "Kenapa Aku Buat Ini",
    whyProblem: "Masalahnya",
    whyProblemText: "Banyak player Fish It yang gak tau atau malah bingung kapam mulainya event di waktu local ( Indonesia ). Event biasanya di umumin di UTC atau waktu server, nah itu bisa menyulitkan player karena zona waktunya beda, jadi mereka ga tau atau malah bingung kapan harus bergabung. apalagi ANOMALI GHOSPIN BATU hadeh.",
    whySolution: "Solusinya",
    whySolutionText: "Gw buat website ini buat bantu player yang bingung kapan eventya di mulai di waktu ( Indonesia ). Dan kalo gw buat website ini jadi player bisa tau kapan join dan biar ga ketinggalan event.",
    whyFeatures: "Fitur",
    whyFeature1: "Penghitung waktu mundur real-time untuk semua event",
    whyFeature2: "Deteksi dan convert zona waktu otomatis",
    whyFeature3: "Tampilan yang clean dan simple",
    whyBugs: "Menemukan Bug?",
    whyBugsText: "Kalo lu dapet bug atau ada saran, tolong kasi tau gw ya wok di Discord:",
    whyContactDiscord: "Contact gw di Discord",
    whyBackHome: "Kembali ke Event",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

// @note indonesian timezone identifiers
const INDONESIAN_TIMEZONES = [
  "Asia/Jakarta",
  "Asia/Pontianak", 
  "Asia/Makassar",
  "Asia/Jayapura",
];

// @note detect locale based on user's timezone
function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  
  try {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (INDONESIAN_TIMEZONES.includes(userTimezone)) {
      return "id";
    }
  } catch {
    // @note fallback if timezone detection fails
  }
  
  return "en";
}

// @note I18nProvider manages global language state
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // @note auto-detect locale on mount
    const detected = detectLocale();
    setLocale(detected);
  }, []);

  // @note translation function
  const t = (key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// @note hook to access i18n context
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
