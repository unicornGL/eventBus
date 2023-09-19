/**
 * Publish/Subscribe Pattern (Pub/Sub) Implementation using an eventBus.
 * This allows decoupling between publishers and subscribers.
 *
 * Publishers -> eventBus <-> Subscribers
 * - Publishers can "publish" events.
 * - Subscribers can "subscribe" to specific events.
 * - The eventBus manages the communication between publishers and subscribers.
 */

type EventCallback = (data: any) => void

interface EventBus {
  events: Record<string, Ref<EventCallback[]>>
  subscribe(event: string, callback: EventCallback): void
  publish(event: string, data?: any): void
}

const eventBus: EventBus = {
  events: {},

  /**
   * Subscribe to an event.
   * @param event - The name of the event to subscribe to.
   * @param callback - The callback function to execute when the event is published.
   */
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = ref([] as EventCallback[])
    }
    this.events[event].value.push(callback)
  },

  /**
   * Publish an event with data.
   * @param event - The name of the event to publish.
   * @param data - (Optional) The data to pass to subscribers.
   */
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].value.forEach((callback) => {
        callback(data)
      })
    } else {
      console.warn(`No subscribers for event: ${event}`)
    }
  }
}

export default eventBus
