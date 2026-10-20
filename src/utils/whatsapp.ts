export const NUTRIGOMA_PHONE = '+250 796 342 024';
export const NUTRIGOMA_PHONE_DIGITS = '250796342024';
export const NUTRIGOMA_OWNER = 'Sinaï Buturu';
export const NUTRIGOMA_TITLE = 'Propriétaire & Technicien Supérieur';

/**
 * Builds a direct WhatsApp chat URL with encoded text message
 */
export function buildWhatsAppUrl(message: string, phone: string = NUTRIGOMA_PHONE_DIGITS): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Generates formatted WhatsApp message for feed order
 */
export function formatProductOrderMessage(data: {
  orderId: string;
  clientName: string;
  phone: string;
  productName: string;
  quantity: number;
  bagWeightKg: number;
  priceType: 'detail' | 'gros';
  unitPrice: number;
  totalPrice: number;
  deliveryMethod: string;
  deliveryAddress: string;
  notes?: string;
}): string {
  const deliveryLabels: Record<string, string> = {
    retrait_depot: '🏪 Retrait direct au Dépôt NUTRIGOMA (Goma)',
    livraison_goma: '🚚 Livraison à domicile / à la ferme (Goma)',
    livraison_peripherie: '🚚 Livraison périphérie (Sake, Masisi, Rutshuru, Nyiragongo)',
    expedition_region: '📦 Expédition provinciale / régionale (Bukavu, Butembo, Rwanda)',
  };

  const deliveryStr = deliveryLabels[data.deliveryMethod] || data.deliveryMethod;

  return `*COMMANDE D'ALIMENTS — NUTRIGOMA BUSINESS*
Bonjour Technicien Supérieur Sinaï Buturu,

Je souhaite passer une commande d'aliments pour volailles :

📌 *Réf. Commande :* #${data.orderId.slice(-6).toUpperCase()}
👤 *Nom du Client :* ${data.clientName}
📱 *Téléphone :* ${data.phone}
🐔 *Produit :* ${data.productName} (${data.bagWeightKg} kg / sac)
🔢 *Quantité :* ${data.quantity} sac(s)
🏷️ *Tarif appliqué :* ${data.priceType === 'gros' ? 'Prix de Gros' : 'Prix de Détail'} ($${data.unitPrice}/sac)
💰 *Montant Total :* $${data.totalPrice} USD
📍 *Mode de livraison :* ${deliveryStr}
🏠 *Adresse / Repère :* ${data.deliveryAddress}
${data.notes ? `📝 *Précisions :* ${data.notes}\n` : ''}
Merci de me confirmer la disponibilité du stock et les modalités de livraison.`;
}

/**
 * Generates WhatsApp message to inquire about price or negotiate wholesale
 */
export function formatPriceInquiryMessage(data: {
  productName: string;
  clientName?: string;
  estimatedQuantity?: string;
  question?: string;
}): string {
  return `*DEMANDE DE PRIX & DEVIS — NUTRIGOMA BUSINESS*
Bonjour Technicien Supérieur Sinaï Buturu,

Je vous contacte concernant l'aliment pour volailles suivant :
🐔 *Produit :* ${data.productName}
${data.clientName ? `👤 *Client :* ${data.clientName}\n` : ''}${data.estimatedQuantity ? `📦 *Quantité envisagée :* ${data.estimatedQuantity}\n` : ''}
Je souhaiterais connaître le tarif actuel (détail et gros), les remises sur quantité et la disponibilité en stock au dépôt de Goma.

${data.question ? `Question supplémentaire : ${data.question}\n` : ''}Merci d'avance pour votre réponse !`;
}

/**
 * Generates formatted WhatsApp message for machine service request
 */
export function formatServiceRequestMessage(data: {
  requestId: string;
  serviceTitle: string;
  clientName: string;
  phone: string;
  location: string;
  machineType: string;
  problemDescription: string;
  preferredDate: string;
  urgency: 'normal' | 'urgent';
  photoNote?: string;
}): string {
  return `*DEMANDE D'INTERVENTION TECHNIQUE — NUTRIGOMA BUSINESS*
Bonjour Sinaï Buturu,

J'ai besoin de vos services techniques pour ma machine de provenderie :

📌 *Réf. Demande :* #${data.requestId.slice(-6).toUpperCase()}
⚙️ *Service sollicité :* ${data.serviceTitle}
👤 *Nom du Client :* ${data.clientName}
📱 *Téléphone :* ${data.phone}
📍 *Localisation (Ferme / Usine) :* ${data.location}
🏭 *Type de machine :* ${data.machineType}
🚨 *Degré d'urgence :* ${data.urgency === 'urgent' ? '🔴 URGENT (Arrêt de production)' : '🟢 Normal / Planifié'}
📅 *Date souhaitée pour l'intervention :* ${data.preferredDate}

🔧 *Description de la panne / du besoin :*
${data.problemDescription}

${data.photoNote ? `📷 *Photos/Vidéos :* ${data.photoNote}\n(Je joins également les photos de la machine dans cette conversation)\n` : '(Je joins les photos/vidéos de la machine ci-dessous)\n'}
Merci de me contacter pour valider le diagnostic et convenir de votre passage.`;
}

/**
 * Generates formatted WhatsApp message for appointment booking with Sinaï Buturu
 */
export function formatAppointmentMessage(data: {
  appointmentId: string;
  clientName: string;
  phone: string;
  location: string;
  serviceTopic: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
}): string {
  const slotLabels: Record<string, string> = {
    matin: 'Matinée (08h00 - 12h00)',
    apres_midi: 'Après-midi (13h00 - 17h00)',
    journee_entiere: 'Journée entière / Intervention complète',
  };

  const slotStr = slotLabels[data.preferredTimeSlot] || data.preferredTimeSlot;

  return `*DEMANDE DE RENDEZ-VOUS — NUTRIGOMA BUSINESS*
Bonjour Technicien Supérieur Sinaï Buturu,

Je souhaite convenir d'un rendez-vous technique personnalisé :

📌 *Réf. RDV :* #${data.appointmentId.slice(-6).toUpperCase()}
👤 *Client :* ${data.clientName}
📱 *Téléphone :* ${data.phone}
📍 *Lieu :* ${data.location}
🎯 *Objet du rendez-vous :* ${data.serviceTopic}
📅 *Date souhaitée :* ${data.preferredDate}
⏰ *Créneau préféré :* ${slotStr}
${data.notes ? `📝 *Détails :* ${data.notes}\n` : ''}
⚠️ _Note : Je comprends que la date finale sera confirmée par l'entreprise NUTRIGOMA BUSINESS selon votre planning de terrain._

Merci de me confirmer votre disponibilité !`;
}

/**
 * Generates formatted WhatsApp message for Academy training registration
 */
export function formatTrainingRegistrationMessage(data: {
  registrationId: string;
  formationTitle: string;
  participantName: string;
  phone: string;
  city: string;
  sessionType: string;
  experienceLevel: string;
  notes?: string;
}): string {
  const sessionLabels: Record<string, string> = {
    presentiel_goma: '🏫 Présentiel à Goma (Atelier pratique)',
    en_ligne: '💻 En ligne (Visioconférence & supports)',
    pratique_ferme: '🚜 Immersion pratique en ferme / provenderie',
  };

  const expLabels: Record<string, string> = {
    debutant: '🌱 Débutant (Projet d\'élevage / provenderie)',
    eleveur_actif: '🐔 Éleveur en activité',
    technicien: '⚙️ Technicien / Opérateur de provenderie',
  };

  return `*INSCRIPTION FORMATION — NUTRIGOMA ACADEMY*
Bonjour Sinaï Buturu,

Je souhaite m'inscrire à la formation suivante :

📌 *Réf. Inscription :* #${data.registrationId.slice(-6).toUpperCase()}
🎓 *Formation :* ${data.formationTitle}
👤 *Nom du Participant :* ${data.participantName}
📱 *Téléphone / WhatsApp :* ${data.phone}
📍 *Ville / Localité :* ${data.city}
📚 *Format choisi :* ${sessionLabels[data.sessionType] || data.sessionType}
📊 *Profil :* ${expLabels[data.experienceLevel] || data.experienceLevel}
${data.notes ? `📝 *Attentes particulières :* ${data.notes}\n` : ''}
Merci de m'envoyer les modalités de paiement, les dates de la prochaine cohorte et les supports de cours.`;
}

/**
 * Generates formatted WhatsApp message for training information inquiry
 */
export function formatTrainingInfoMessage(formationTitle: string, clientName?: string): string {
  return `*RENSEIGNEMENTS FORMATION — NUTRIGOMA ACADEMY*
Bonjour Sinaï Buturu,

Je souhaite obtenir plus d'informations sur la formation :
🎓 *${formationTitle}*
${clientName ? `👤 Mon nom : ${clientName}\n` : ''}
Pourriez-vous me transmettre :
1. Le programme détaillé des modules
2. La date de la prochaine session
3. Les conditions d'admission et le coût
4. Les attestations délivrées par NUTRIGOMA BUSINESS

Merci beaucoup !`;
}
