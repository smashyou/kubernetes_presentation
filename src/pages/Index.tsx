
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClusterAutoscalingDemo from '@/components/ClusterAutoscalingDemo';
import HPADemo from '@/components/HPADemo';
import RolesDemo from '@/components/RolesDemo';
import OIDCDemo from '@/components/OIDCDemo';
import IRSADemo from '@/components/IRSADemo';
import RBACDemo from '@/components/RBACDemo';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div id="demos-section" className="grid grid-cols-1 gap-12">
          <section id="week2" className="mb-12">
            <h2 className="cyber-title text-3xl font-orbitron mb-8 text-center">Week 2: Autoscaling</h2>
            
            <div className="space-y-12">
              <ClusterAutoscalingDemo />
              <HPADemo />
            </div>
          </section>
          
          <section id="week3" className="mb-12">
            <h2 className="cyber-title text-3xl font-orbitron mb-8 text-center">Week 3: Access Control</h2>
            
            <div className="space-y-12">
              <RolesDemo />
              <OIDCDemo />
              <IRSADemo />
              <RBACDemo />
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
