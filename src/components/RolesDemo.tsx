
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Role = 'head-chef' | 'sous-chef' | 'line-cook' | 'none';
type Resource = 'pantry' | 'special-ingredients' | 'main-stove' | 'expediting';

interface ResourceAccess {
  name: Resource;
  label: string;
  icon: string;
  headChef: boolean;
  sousChef: boolean;
  lineCook: boolean;
}

const RolesDemo = () => {
  const [currentRole, setCurrentRole] = useState<Role>('none');

  const resources: ResourceAccess[] = [
    { 
      name: 'pantry', 
      label: 'Main Pantry', 
      icon: '🍲', 
      headChef: true, 
      sousChef: true, 
      lineCook: true 
    },
    { 
      name: 'special-ingredients', 
      label: 'Special Ingredients', 
      icon: '🌶️', 
      headChef: true, 
      sousChef: true, 
      lineCook: false 
    },
    { 
      name: 'main-stove', 
      label: 'Main Stove Control', 
      icon: '🔥', 
      headChef: true, 
      sousChef: false, 
      lineCook: false 
    },
    { 
      name: 'expediting', 
      label: 'Order Expediting', 
      icon: '📋', 
      headChef: true, 
      sousChef: false, 
      lineCook: false 
    },
  ];

  const setRole = (role: Role) => {
    setCurrentRole(role);
  };

  const resetDemo = () => {
    setCurrentRole('none');
  };

  const hasAccess = (resource: ResourceAccess) => {
    if (currentRole === 'head-chef') return resource.headChef;
    if (currentRole === 'sous-chef') return resource.sousChef;
    if (currentRole === 'line-cook') return resource.lineCook;
    return false;
  };

  return (
    <div className="cyber-panel">
      <h2 className="text-2xl font-orbitron mb-6 text-cyber-purple">Manager and Developer Roles <span className="text-sm text-cyber-blue">(Week 3)</span></h2>
      
      <div className="mb-8">
        <p className="text-cyber-blue mb-4">In the Cosmic Kitchen, different roles have different access levels:</p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <div className={`p-4 rounded-lg border transition-all ${currentRole === 'head-chef' ? 'border-cyber-blue bg-cyber-blue/20 shadow-[0_0_10px_rgba(30,174,219,0.5)]' : 'border-gray-700 bg-black/20'}`}>
            <div className="text-xl font-orbitron text-cyber-blue mb-1">Head Chef</div>
            <p className="text-sm text-gray-300 mb-2">Complete access to all kitchen areas</p>
            <Button 
              onClick={() => setRole('head-chef')}
              className={`w-full ${currentRole === 'head-chef' ? 'bg-cyber-blue' : 'bg-gray-700 hover:bg-cyber-blue/60'}`}
            >
              Assign Role
            </Button>
          </div>
          
          <div className={`p-4 rounded-lg border transition-all ${currentRole === 'sous-chef' ? 'border-cyber-purple bg-cyber-purple/20 shadow-[0_0_10px_rgba(155,135,245,0.5)]' : 'border-gray-700 bg-black/20'}`}>
            <div className="text-xl font-orbitron text-cyber-purple mb-1">Sous Chef</div>
            <p className="text-sm text-gray-300 mb-2">Limited access to special areas</p>
            <Button 
              onClick={() => setRole('sous-chef')}
              className={`w-full ${currentRole === 'sous-chef' ? 'bg-cyber-purple' : 'bg-gray-700 hover:bg-cyber-purple/60'}`}
            >
              Assign Role
            </Button>
          </div>
          
          <div className={`p-4 rounded-lg border transition-all ${currentRole === 'line-cook' ? 'border-cyber-pink bg-cyber-pink/20 shadow-[0_0_10px_rgba(217,70,239,0.5)]' : 'border-gray-700 bg-black/20'}`}>
            <div className="text-xl font-orbitron text-cyber-pink mb-1">Line Cook</div>
            <p className="text-sm text-gray-300 mb-2">Basic access to common areas only</p>
            <Button 
              onClick={() => setRole('line-cook')}
              className={`w-full ${currentRole === 'line-cook' ? 'bg-cyber-pink' : 'bg-gray-700 hover:bg-cyber-pink/60'}`}
            >
              Assign Role
            </Button>
          </div>
        </div>
        
        <div className="mt-6 mb-4">
          <h3 className="text-xl font-orbitron text-cyber-blue mb-3">Current Role: {currentRole === 'none' ? 'No Role Assigned' : (
            <span className={`
              ${currentRole === 'head-chef' ? 'text-cyber-blue' : ''}
              ${currentRole === 'sous-chef' ? 'text-cyber-purple' : ''}
              ${currentRole === 'line-cook' ? 'text-cyber-pink' : ''}
            `}>
              {currentRole === 'head-chef' ? 'Head Chef' : ''}
              {currentRole === 'sous-chef' ? 'Sous Chef' : ''}
              {currentRole === 'line-cook' ? 'Line Cook' : ''}
            </span>
          )}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resources.map(resource => (
              <div 
                key={resource.name}
                className={`p-4 rounded-lg border flex items-center justify-between transition-all ${
                  hasAccess(resource) 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-red-500 bg-red-500/10'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{resource.icon}</span>
                  <span>{resource.label}</span>
                </div>
                <div>
                  {hasAccess(resource) ? (
                    <span className="flex items-center text-green-400">
                      <Check className="mr-1" size={18} />
                      Access Granted
                    </span>
                  ) : (
                    <span className="flex items-center text-red-400">
                      <X className="mr-1" size={18} />
                      Access Denied
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={resetDemo}
          variant="outline"
          className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default RolesDemo;
