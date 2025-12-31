export interface EventHost {
  hostName: string;
  hasVerifiedBadge: boolean;
  hostType: string;
  hostId: number;
}

export interface EventTime {
  startUtc: string;
  endUtc: string;
}

export interface EventCategory {
  category: string;
  rank: number;
}

export interface EventThumbnail {
  mediaId: number;
  rank: number;
}

export interface VirtualEvent {
  id: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  displaySubtitle: string;
  description: string;
  displayDescription: string;
  eventTime: EventTime;
  host: EventHost;
  universeId: number;
  placeId: number;
  eventStatus: "active" | "inactive" | "scheduled";
  eventVisibility: "public" | "private";
  createdUtc: string;
  updatedUtc: string;
  eventCategories: EventCategory[];
  thumbnails: EventThumbnail[];
  allThumbnailsCreated: boolean;
  tagline: string;
  featuringStatus: string;
}

export interface EventsResponse {
  nextPageCursor: string;
  previousPageCursor: string;
  data: VirtualEvent[];
}
