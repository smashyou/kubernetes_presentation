
import { useState } from 'react';
import { Check, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const OIDCDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [accessibleResources, setAccessibleResources] = useState([false, false, false]);
  const [username, setUsername] = useState('CyberChef42');

  const performLogin = () => {
    if (authenticating) return;
    
    setAuthenticating(true);
    setAuthProgress(0);
    
    // Simulate authentication progress
    const interval = setInterval(() => {
      setAuthProgress(prev => {
        const newProgress = prev + 25;
        
        // When progress reaches 100%, complete the login
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsLoggedIn(true);
          setAuthenticating(false);
          
          // Simulate resources becoming accessible one by one
          setTimeout(() => setAccessibleResources([true, false, false]), 300);
          setTimeout(() => setAccessibleResources([true, true, false]), 700);
          setTimeout(() => setAccessibleResources([true, true, true]), 1100);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 400);
  };

  const performLogout = () => {
    setIsLoggedIn(false);
    setAccessibleResources([false, false, false]);
    setAuthProgress(0);
  };
  
  const resetDemo = () => {
    setIsLoggedIn(false);
    setAuthenticating(false);
    setAuthProgress(0);
    setAccessibleResources([false, false, false]);
  };

  return (
    <div className="cyber-panel">
      <h2 className="text-2xl font-orbitron mb-6 text-cyber-purple">OIDC Authentication <span className="text-sm text-cyber-blue">(Week 3)</span></h2>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0">
          <div className="w-20 h-20 rounded-full mx-auto mb-2 flex items-center justify-center bg-gradient-to-br from-cyber-purple to-cyber-blue">
            <User size={40} className="text-white" />
          </div>
          <p className="text-center text-cyber-blue font-mono">{username}</p>
        </div>
        
        <div className="text-center flex-grow px-6">
          <p className="text-cyber-blue mb-1">Authentication Status</p>
          <div className="text-xl font-orbitron mb-2">
            {isLoggedIn ? (
              <span className="flex justify-center items-center text-green-500">
                <Check size={24} className="mr-1" /> Authenticated
              </span>
            ) : authenticating ? (
              <span className="text-cyber-purple animate-pulse">Authenticating...</span>
            ) : (
              <span className="flex justify-center items-center text-red-500">
                <X size={24} className="mr-1" /> Not Authenticated
              </span>
            )}
          </div>
          
          {authenticating && (
            <div className="w-full max-w-xs mx-auto mb-2">
              <Progress value={authProgress} className="h-2 bg-gray-700" />
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue" 
                style={{ 
                  width: `${authProgress}%`, 
                  marginTop: '-8px' 
                }} 
              />
            </div>
          )}
          
          <Button 
            onClick={isLoggedIn ? performLogout : performLogin}
            disabled={authenticating}
            className={`${isLoggedIn 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-r from-cyber-purple to-cyber-blue hover:from-cyber-blue hover:to-cyber-purple'
            }`}
          >
            {isLoggedIn ? 'Log Out' : 'Log In with OIDC'}
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-orbitron text-cyber-blue mb-3">Resource Access</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border transition-all ${accessibleResources[0] ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-black/20'}`}>
            <div className="text-center mb-3">
              <span className="text-2xl">🥘</span>
            </div>
            <p className="text-center font-orbitron mb-1">Recipe Database</p>
            <div className="text-center">
              {accessibleResources[0] ? (
                <span className="flex items-center justify-center text-green-400 text-sm">
                  <Check size={16} className="mr-1" /> Accessible
                </span>
              ) : (
                <span className="flex items-center justify-center text-red-400 text-sm">
                  <X size={16} className="mr-1" /> Locked
                </span>
              )}
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border transition-all ${accessibleResources[1] ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-black/20'}`}>
            <div className="text-center mb-3">
              <span className="text-2xl">⚙️</span>
            </div>
            <p className="text-center font-orbitron mb-1">Kitchen Controls</p>
            <div className="text-center">
              {accessibleResources[1] ? (
                <span className="flex items-center justify-center text-green-400 text-sm">
                  <Check size={16} className="mr-1" /> Accessible
                </span>
              ) : (
                <span className="flex items-center justify-center text-red-400 text-sm">
                  <X size={16} className="mr-1" /> Locked
                </span>
              )}
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border transition-all ${accessibleResources[2] ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-black/20'}`}>
            <div className="text-center mb-3">
              <span className="text-2xl">🚀</span>
            </div>
            <p className="text-center font-orbitron mb-1">Admin Panel</p>
            <div className="text-center">
              {accessibleResources[2] ? (
                <span className="flex items-center justify-center text-green-400 text-sm">
                  <Check size={16} className="mr-1" /> Accessible
                </span>
              ) : (
                <span className="flex items-center justify-center text-red-400 text-sm">
                  <X size={16} className="mr-1" /> Locked
                </span>
              )}
            </div>
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

export default OIDCDemo;
