export type FeedCategory = 'demarrage' | 'croissance' | 'finition' | 'pondeuse' | 'concentre' | 'autre';

export interface Product {
  id: string;
  name: string;
  category: FeedCategory;
  description: string;
  bagWeightKg: number;
  retailPriceUsd: number;
  wholesalePriceUsd: number;
  wholesaleMinBags: number;
  inStock: boolean;
  stockQuantity: number;
  imageUrl: string;
  proteinPercent?: string;
  targetAge?: string;
  compositionSummary?: string;
  benefits: string[];
}

export interface MachineService {
  id: string;
  title: string;
  description: string;
  details: string[];
  imageUrl: string;
  badge: string;
  estimatedDelay: string;
  commonMachines: string[];
}

export interface Formation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  targetAudience: string;
  program: string[];
  priceUsd: number;
  nextSessionDate: string;
  imageUrl: string;
  certified: boolean;
  modulesCount: number;
}

export type DeliveryMethod = 
  | 'retrait_depot'
  | 'livraison_goma'
  | 'livraison_peripherie'
  | 'expedition_region';

export interface Order {
  id: string;
  createdAt: string;
  clientName: string;
  phone: string;
  productId: string;
  productName: string;
  quantity: number;
  priceType: 'detail' | 'gros';
  unitPrice: number;
  totalPrice: number;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: string;
  notes?: string;
  status: 'en_attente' | 'confirmee' | 'en_livraison' | 'livree' | 'annulee';
}

export interface ServiceRequest {
  id: string;
  createdAt: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  phone: string;
  location: string;
  machineType: string;
  problemDescription: string;
  preferredDate: string;
  urgency: 'normal' | 'urgent';
  photoNote?: string;
  status: 'en_attente' | 'confirmee' | 'en_cours' | 'terminee' | 'annulee';
}

export interface Appointment {
  id: string;
  createdAt: string;
  clientName: string;
  phone: string;
  location: string;
  serviceTopic: string;
  preferredDate: string;
  preferredTimeSlot: 'matin' | 'apres_midi' | 'journee_entiere';
  notes: string;
  status: 'en_attente_confirmation' | 'confirme_par_nutrigoma' | 'reprogramme' | 'termine';
}

export interface TrainingRegistration {
  id: string;
  createdAt: string;
  formationId: string;
  formationTitle: string;
  participantName: string;
  phone: string;
  city: string;
  sessionType: 'presentiel_goma' | 'en_ligne' | 'pratique_ferme';
  experienceLevel: 'debutant' | 'eleveur_actif' | 'technicien';
  notes?: string;
  status: 'en_attente' | 'confirmee' | 'annulee';
}
