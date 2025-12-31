'use client';

import type { VirtualEvent } from '@/types/event';
import { useTimeSync } from '@/hooks/useTimeSync';
import { useThumbnail } from '@/hooks/useThumbnail';
import { useTimezone } from '@/contexts/TimezoneContext';
import { useI18n, type TranslationKey } from '@/contexts/I18nContext';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { MdVerified } from 'react-icons/md';

interface EventCardProps {
  event: VirtualEvent;
}

// @note returns status badge color based on event state
function getStatusColor(isExpired: boolean, isStarted: boolean): string {
  if (isExpired) return 'bg-red-500/20 text-red-400 border-red-500/30';
  if (!isStarted)
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  return 'bg-green-500/20 text-green-400 border-green-500/30';
}

// @note returns translation key for status text
function getStatusKey(isExpired: boolean, isStarted: boolean): TranslationKey {
  if (isExpired) return 'eventStatusEnded';
  if (!isStarted) return 'eventStatusUpcoming';
  return 'eventStatusActive';
}

// @note EventCard displays a single event with countdown timer
export function EventCard({ event }: EventCardProps) {
  const { getTimeUntil, isExpired, isStarted } = useTimeSync();
  const { formatDate } = useTimezone();
  const { t } = useI18n();
  const thumbnailUrl = useThumbnail(event.thumbnails[0]?.mediaId);

  const eventExpired = isExpired(event.eventTime.endUtc);
  const eventStarted = isStarted(event.eventTime.startUtc);

  const timeRemaining = eventExpired
    ? null
    : eventStarted
    ? getTimeUntil(event.eventTime.endUtc)
    : getTimeUntil(event.eventTime.startUtc);

  return (
    <Card className="overflow-hidden border-white/10 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300 hover:border-white/20 py-0">
      {/* @note landscape layout on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row">
        {/* @note thumbnail section */}
        <div className="relative w-full md:w-80 h-48 md:h-auto md:min-h-[200px] flex-shrink-0 overflow-hidden bg-zinc-800">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={event.displayTitle}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              {t('eventLoading')}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-900/80 via-transparent to-transparent" />

          {/* @note badges on thumbnail */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge
              variant="outline"
              className={getStatusColor(eventExpired, eventStarted)}
            >
              {t(getStatusKey(eventExpired, eventStarted))}
            </Badge>
          </div>
        </div>

        {/* @note content section */}
        <div className="flex-1 p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            {/* @note title and subtitle */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-foreground">
                  {event.displayTitle}
                </h3>
                {event.eventCategories.map(cat => (
                  <Badge
                    key={cat.category}
                    variant="outline"
                    className="bg-primary/20 text-primary border-primary/30 text-xs"
                  >
                    {cat.category}
                  </Badge>
                ))}
              </div>
              {event.displaySubtitle && (
                <p className="text-muted-foreground mt-1">
                  {event.displaySubtitle}
                </p>
              )}
            </div>

            {/* @note description */}
            {event.displayDescription && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.displayDescription}
              </p>
            )}

            {/* @note host info */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Users className="h-4 w-4" />
              <span>{t('eventHostedBy')} {event.host.hostName}</span>
              {event.host.hasVerifiedBadge && (
                <MdVerified className="h-5 w-5 text-blue-400" />
              )}
            </div>
          </div>

          {/* @note time info section */}
          <div className="space-y-3">
            {/* @note start/end times */}
            <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50">
                <span className="text-zinc-500 font-medium">{t('eventStart')}:</span>
                <span className="text-foreground">
                  {formatDate(event.eventTime.startUtc)}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50">
                <span className="text-zinc-500 font-medium">{t('eventEnd')}:</span>
                <span className="text-foreground">
                  {formatDate(event.eventTime.endUtc)}
                </span>
              </div>
            </div>

            {/* @note countdown timer */}
            {timeRemaining && (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/70 border border-white/5">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">
                    {eventStarted ? t('eventEndsIn') : t('eventStartsIn')}
                  </p>
                  <div className="flex items-baseline gap-1">
                    {timeRemaining.days > 0 && (
                      <>
                        <span className="text-2xl font-bold text-foreground">
                          {timeRemaining.days}
                        </span>
                        <span className="text-sm text-muted-foreground mr-2">
                          {t('timeDay')}
                        </span>
                      </>
                    )}
                    <span className="text-2xl font-bold text-foreground">
                      {timeRemaining.hours}
                    </span>
                    <span className="text-sm text-muted-foreground mr-2">
                      {t('timeHour')}
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      {timeRemaining.minutes}
                    </span>
                    <span className="text-sm text-muted-foreground mr-2">
                      {t('timeMinute')}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {timeRemaining.seconds}
                    </span>
                    <span className="text-sm text-muted-foreground">{t('timeSecond')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* @note ended state */}
            {eventExpired && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-sm text-red-400 font-medium">
                  {t('eventEnded')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
