import React, { useState, useEffect } from 'react';
import { 
  Product, 
  MachineService, 
  Formation, 
  Order, 
  ServiceRequest, 
  Appointment, 
  TrainingRegistration 
} from './types';
import { Storage } from './utils/storage';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductsSection } from './components/ProductsSection';
import { ServicesSection } from './components/ServicesSection';
import { AcademySection } from './components/AcademySection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { OrderModal } from './components/OrderModal';
import { PriceQuoteModal } from './components/PriceQuoteModal';
import { ServiceRequestModal } from './components/ServiceRequestModal';
import { AppointmentModal } from './components/AppointmentModal';
import { TrainingRegistrationModal } from './components/TrainingRegistrationModal';
import { FloatingActionBar } from './components/FloatingActionBar';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Data State loaded from Storage
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<MachineService[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [registrations, setRegistrations] = useState<TrainingRegistration[]>([]);

  // Modals State
  const [orderModalProduct, setOrderModalProduct] = useState<Product | null>(null);
  const [priceQuoteProduct, setPriceQuoteProduct] = useState<Product | null>(null);
  const [selectedService, setSelectedService] = useState<MachineService | null>(null);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointmentTopic, setAppointmentTopic] = useState<string>('Diagnostic et entretien de machine à granulés');
  
  const [trainingModalFormation, setTrainingModalFormation] = useState<Formation | null>(null);
  const [trainingModalMode, setTrainingModalMode] = useState<'register' | 'info'>('register');

  // Initial load
  useEffect(() => {
    setProducts(Storage.getProducts());
    setServices(Storage.getServices());
    setFormations(Storage.getFormations());
    setOrders(Storage.getOrders());
    setServiceRequests(Storage.getServiceRequests());
    setAppointments(Storage.getAppointments());
    setRegistrations(Storage.getRegistrations());
  }, []);

  // Handlers for placing orders & submitting forms
  const handleOrderPlaced = (newOrder: Order) => {
    Storage.addOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleServiceRequested = (newReq: ServiceRequest) => {
    Storage.addServiceRequest(newReq);
    setServiceRequests((prev) => [newReq, ...prev]);
  };

  const handleAppointmentBooked = (newApp: Appointment) => {
    Storage.addAppointment(newApp);
    setAppointments((prev) => [newApp, ...prev]);
  };

  const handleTrainingRegistered = (newReg: TrainingRegistration) => {
    Storage.addRegistration(newReg);
    setRegistrations((prev) => [newReg, ...prev]);
  };

  // Quick navigation handlers
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAppointmentModal = (topic?: string) => {
    if (topic) {
      setAppointmentTopic(topic);
    } else {
      setAppointmentTopic('Consultation technique avec Sinaï Buturu');
    }
    setAppointmentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-amber-300 selection:text-black">
      
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={() => handleNavigate('admin')}
        ordersCount={orders.filter(o => o.status === 'en_attente').length}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'accueil' && (
          <div>
            <HeroSection
              onNavigate={handleNavigate}
              onBookAppointment={() => handleOpenAppointmentModal()}
            />
            <ProductsSection
              products={products}
              onOrderProduct={(prod) => setOrderModalProduct(prod)}
              onInquirePrice={(prod) => setPriceQuoteProduct(prod)}
              onBackToHome={() => handleNavigate('accueil')}
            />
            <ServicesSection
              services={services}
              onRequestService={(srv) => setSelectedService(srv)}
              onBookAppointment={(title) => handleOpenAppointmentModal(title)}
              onBackToHome={() => handleNavigate('accueil')}
            />
            <AcademySection
              formations={formations}
              onRegisterFormation={(form) => {
                setTrainingModalFormation(form);
                setTrainingModalMode('register');
              }}
              onAskInformation={(form) => {
                setTrainingModalFormation(form);
                setTrainingModalMode('info');
              }}
              onBackToHome={() => handleNavigate('accueil')}
            />
            <ContactSection
              onBackToHome={() => handleNavigate('accueil')}
              onBookAppointment={() => handleOpenAppointmentModal()}
            />
          </div>
        )}

        {activeTab === 'aliments' && (
          <ProductsSection
            products={products}
            onOrderProduct={(prod) => setOrderModalProduct(prod)}
            onInquirePrice={(prod) => setPriceQuoteProduct(prod)}
            onBackToHome={() => handleNavigate('accueil')}
          />
        )}

        {activeTab === 'services' && (
          <ServicesSection
            services={services}
            onRequestService={(srv) => setSelectedService(srv)}
            onBookAppointment={(title) => handleOpenAppointmentModal(title)}
            onBackToHome={() => handleNavigate('accueil')}
          />
        )}

        {activeTab === 'formations' && (
          <AcademySection
            formations={formations}
            onRegisterFormation={(form) => {
              setTrainingModalFormation(form);
              setTrainingModalMode('register');
            }}
            onAskInformation={(form) => {
              setTrainingModalFormation(form);
              setTrainingModalMode('info');
            }}
            onBackToHome={() => handleNavigate('accueil')}
          />
        )}

        {activeTab === 'contact' && (
          <ContactSection
            onBackToHome={() => handleNavigate('accueil')}
            onBookAppointment={() => handleOpenAppointmentModal()}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            products={products}
            setProducts={setProducts}
            services={services}
            formations={formations}
            orders={orders}
            setOrders={setOrders}
            serviceRequests={serviceRequests}
            setServiceRequests={setServiceRequests}
            appointments={appointments}
            setAppointments={setAppointments}
            registrations={registrations}
            setRegistrations={setRegistrations}
            onBackToHome={() => handleNavigate('accueil')}
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => handleNavigate('admin')}
      />

      {/* Floating Action Bar on Mobile / Android */}
      <FloatingActionBar
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Modals */}
      
      {/* 1. Modal: Commander cet aliment */}
      <OrderModal
        product={orderModalProduct}
        isOpen={!!orderModalProduct}
        onClose={() => setOrderModalProduct(null)}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* 2. Modal: Demander le prix */}
      <PriceQuoteModal
        product={priceQuoteProduct}
        isOpen={!!priceQuoteProduct}
        onClose={() => setPriceQuoteProduct(null)}
      />

      {/* 3. Modal: Demander ce service machine */}
      <ServiceRequestModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onRequestSubmitted={handleServiceRequested}
      />

      {/* 4. Modal: Prendre rendez-vous avec Sinaï Buturu */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        serviceTopic={appointmentTopic}
        onAppointmentBooked={handleAppointmentBooked}
      />

      {/* 5. Modal: NUTRIGOMA ACADEMY (Inscription & Information) */}
      <TrainingRegistrationModal
        formation={trainingModalFormation}
        mode={trainingModalMode}
        isOpen={!!trainingModalFormation}
        onClose={() => setTrainingModalFormation(null)}
        onRegistered={handleTrainingRegistered}
      />

    </div>
  );
}
