export const trackPageView = (page) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'TU-ID-DE-ANALYTICS', {
      page_path: page,
    });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};