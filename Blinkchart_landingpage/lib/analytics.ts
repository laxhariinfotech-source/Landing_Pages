type TrackEventInput = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export function trackEvent({
  action,
  category,
  label,
  value
}: TrackEventInput): void {
  if (typeof window === "undefined") {
    console.warn("trackEvent: window is undefined");
    return;
  }

  type FbqLike = (command: string, eventName: string, payload?: Record<string, unknown>) => void;
  const fbq = (window as Window & { fbq?: FbqLike }).fbq;

  // Queue event in dataLayer even if gtag isn't ready yet
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  type EventData = {
    event_category?: string;
    event_label?: string;
    value?: number;
  };

  const eventData: EventData = {};

  if (category) {
    eventData.event_category = category;
  }

  if (label) {
    eventData.event_label = label;
  }

  if (typeof value === "number") {
    eventData.value = value;
  }

  // Push directly to dataLayer to ensure event is captured
  const dataLayerArray = window.dataLayer as unknown as Array<Record<string, unknown>>;
  dataLayerArray.push({
    event: action,
    ...eventData,
  });

  // Also call gtag if available
  if (typeof window.gtag === "function") {
    window.gtag("event", action, eventData);
  }

  // Mirror app events to Meta Pixel when consent-enabled loader initialized.
  if (typeof fbq === "function") {
    fbq("trackCustom", action, eventData);
  }

  console.log("Event tracked:", { action, ...eventData });
}
