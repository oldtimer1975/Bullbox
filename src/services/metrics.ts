/**
 * Metrics Service
 * Provides mock courier metrics data
 */

export interface CourierMetrics {
  activeOrders: number;
  activeCouriers: number;
  lastUpdated: Date;
}

export type TrafficLevel = 'LOW' | 'NORMAL' | 'HIGH';

/**
 * Calculate traffic level based on orders per courier ratio
 */
export function trafficLevel(orders: number, couriers: number): TrafficLevel {
  if (couriers === 0) return 'HIGH';
  
  const ratio = orders / couriers;
  
  if (ratio < 2) return 'LOW';
  if (ratio < 4) return 'NORMAL';
  return 'HIGH';
}

/**
 * Fetch courier metrics (mocked with random data)
 * In a real app, this would call a backend API
 */
export async function fetchCourierMetrics(): Promise<CourierMetrics> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate random metrics
  const activeOrders = Math.floor(Math.random() * 20) + 5; // 5-24
  const activeCouriers = Math.floor(Math.random() * 10) + 3; // 3-12
  
  return {
    activeOrders,
    activeCouriers,
    lastUpdated: new Date(),
  };
}
