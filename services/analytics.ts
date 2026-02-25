
// Analytics Service for Bin Jabhan Honey
// This service handles tracking user behavior to improve sales and marketing.

export type AnalyticsEvent = 
  | { type: 'page_view'; path: string; title: string }
  | { type: 'add_to_cart'; productId: string; name: string; price: number }
  | { type: 'remove_from_cart'; productId: string }
  | { type: 'begin_checkout'; cartTotal: number; itemCount: number }
  | { type: 'purchase'; orderId: string; total: number; items: any[] }
  | { type: 'search'; query: string }
  | { type: 'contact_click'; method: string };

class AnalyticsService {
  private isEnabled: boolean = true;

  constructor() {
    // In a real app, you've initialize Google Analytics, Mixpanel, etc. here.
    console.log('Analytics Service Initialized');
  }

  track(event: AnalyticsEvent) {
    if (!this.isEnabled) return;

    // Log to console for development/demo purposes
    console.log(`[Analytics] ${event.type}:`, event);

    // Example: Sending to a real endpoint (if configured)
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) }).catch(() => {});
    
    // Example: Google Analytics 4 (if gtag is present)
    // if (typeof window !== 'undefined' && (window as any).gtag) {
    //   (window as any).gtag('event', event.type, event);
    // }
  }

  setUserId(userId: string) {
    console.log(`[Analytics] User ID set: ${userId}`);
  }
}

export const analytics = new AnalyticsService();
