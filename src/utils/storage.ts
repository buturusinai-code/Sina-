import { Product, MachineService, Formation, Order, ServiceRequest, Appointment, TrainingRegistration } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_FORMATIONS, INITIAL_ORDERS, INITIAL_SERVICE_REQUESTS, INITIAL_APPOINTMENTS, INITIAL_REGISTRATIONS } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'nutrigoma_products_v1',
  SERVICES: 'nutrigoma_services_v1',
  FORMATIONS: 'nutrigoma_formations_v1',
  ORDERS: 'nutrigoma_orders_v1',
  SERVICE_REQUESTS: 'nutrigoma_service_requests_v1',
  APPOINTMENTS: 'nutrigoma_appointments_v1',
  REGISTRATIONS: 'nutrigoma_registrations_v1',
  ADMIN_PIN: 'nutrigoma_admin_pin',
};

function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Error reading key ${key} from storage:`, e);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing key ${key} to storage:`, e);
  }
}

export const Storage = {
  getProducts(): Product[] {
    return safeGet<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },
  saveProducts(products: Product[]): void {
    safeSet(STORAGE_KEYS.PRODUCTS, products);
  },

  getServices(): MachineService[] {
    return safeGet<MachineService[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },
  saveServices(services: MachineService[]): void {
    safeSet(STORAGE_KEYS.SERVICES, services);
  },

  getFormations(): Formation[] {
    return safeGet<Formation[]>(STORAGE_KEYS.FORMATIONS, INITIAL_FORMATIONS);
  },
  saveFormations(formations: Formation[]): void {
    safeSet(STORAGE_KEYS.FORMATIONS, formations);
  },

  getOrders(): Order[] {
    return safeGet<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },
  saveOrders(orders: Order[]): void {
    safeSet(STORAGE_KEYS.ORDERS, orders);
  },
  addOrder(order: Order): void {
    const current = this.getOrders();
    this.saveOrders([order, ...current]);
  },

  getServiceRequests(): ServiceRequest[] {
    return safeGet<ServiceRequest[]>(STORAGE_KEYS.SERVICE_REQUESTS, INITIAL_SERVICE_REQUESTS);
  },
  saveServiceRequests(reqs: ServiceRequest[]): void {
    safeSet(STORAGE_KEYS.SERVICE_REQUESTS, reqs);
  },
  addServiceRequest(req: ServiceRequest): void {
    const current = this.getServiceRequests();
    this.saveServiceRequests([req, ...current]);
  },

  getAppointments(): Appointment[] {
    return safeGet<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  },
  saveAppointments(apps: Appointment[]): void {
    safeSet(STORAGE_KEYS.APPOINTMENTS, apps);
  },
  addAppointment(app: Appointment): void {
    const current = this.getAppointments();
    this.saveAppointments([app, ...current]);
  },

  getRegistrations(): TrainingRegistration[] {
    return safeGet<TrainingRegistration[]>(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS);
  },
  saveRegistrations(regs: TrainingRegistration[]): void {
    safeSet(STORAGE_KEYS.REGISTRATIONS, regs);
  },
  addRegistration(reg: TrainingRegistration): void {
    const current = this.getRegistrations();
    this.saveRegistrations([reg, ...current]);
  },

  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.FORMATIONS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.SERVICE_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
  },

  getAdminPin(): string {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || '2024';
  },
  setAdminPin(newPin: string): void {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin);
  }
};
