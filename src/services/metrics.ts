export interface CourierMetrics {
  activeOrders: number
  activeCouriers: number
  updatedAt: Date
}

export async function fetchCourierMetrics(): Promise<CourierMetrics> {
  const activeCouriers = Math.max(1, Math.floor(Math.random() * 18) + 3)
  const activeOrders = Math.floor(Math.random() * 40)
  return { activeOrders, activeCouriers, updatedAt: new Date() }
}

export function trafficLevel(metrics: CourierMetrics) {
  const ratio = metrics.activeOrders / Math.max(1, metrics.activeCouriers)
  if (ratio < 0.5) return { label: 'LOW', color: '#22C55E' }
  if (ratio < 1.2) return { label: 'NORMAL', color: '#2563EB' }
  return { label: 'HIGH', color: '#EF4444' }
}