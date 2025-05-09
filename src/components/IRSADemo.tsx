
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IRSADemo = () => {
  const [isIrsaEnabled, setIsIrsaEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  
  const toggleIrsa = () => {
    setIsIrsaEnabled(!isIrsaEnabled);
    
    if (!isIrsaEnabled) {
      // When enabling IRSA, simulate the connection process
      setTimeout(() => setIsConnected(true), 500);
      setTimeout(() => {
        setIsTransferring(true);
        setTimeout(() => {
          setIsTransferring(false);
          setAccessGranted(true);
        }, 1500);
      }, 800);
    } else {
      // When disabling IRSA, reset the states
      setIsConnected(false);
      setIsTransferring(false);
      setAccessGranted(false);
    }
  };
  
  const resetDemo = () => {
    setIsIrsaEnabled(false);
    setIsConnected(false);
    setIsTransferring(false);
    setAccessGranted(false);
  };
  
  return (
    <div className="cyber-panel">
      <h2 className="text-2xl font-orbitron mb-6 text-cyber-purple">IAM Roles for Service Accounts <span className="text-sm text-cyber-blue">(Week 3)</span></h2>
      
      <div className="mb-8">
        <p className="text-cyber-blue mb-4">
          IRSA allows Kubernetes service accounts to authenticate to AWS services without storing credentials in pods.
        </p>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-full max-w-md h-40 mb-6">
            {/* Pod */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-24 w-24 rounded-md flex items-center justify-center transition-all duration-500 ${
              isIrsaEnabled ? 'bg-gradient-to-r from-cyber-purple to-cyber-blue shadow-[0_0_15px_rgba(155,135,245,0.5)]' : 'bg-gray-700'
            }`}>
              <div className="text-sm text-center text-white">
                <div className="text-xs mb-1">Pod</div>
                <div className="font-mono text-xs">recipe-api</div>
              </div>
            </div>
            
            {/* Connection Line */}
            <div className={`absolute top-1/2 left-24 right-24 h-1 -translate-y-1/2 transition-all duration-700 ${
              isConnected ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple' : 'bg-gray-700'
            }`}>
              {/* Data Packet */}
              {isTransferring && (
                <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-cyber-pink rounded-full animate-pulse shadow-[0_0_8px_rgba(217,70,239,0.8)]" style={{
                  left: '40%',
                  animation: 'moveRight 1.5s linear forwards'
                }}></div>
              )}
            </div>
            
            {/* S3 Bucket */}
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 h-24 w-24 rounded-md flex items-center justify-center transition-all duration-500 ${
              accessGranted ? 'bg-gradient-to-r from-cyber-orange to-cyber-pink shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-gray-700'
            }`}>
              <div className="text-sm text-center text-white">
                <div className="text-xs mb-1">S3 Bucket</div>
                <div className="font-mono text-xs">recipe-data</div>
              </div>
            </div>
            
            {/* Status */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-full text-sm transition-all duration-300 ${
              accessGranted ? 'bg-green-500/20 text-green-400' : (isTransferring ? 'bg-cyber-blue/20 text-cyber-blue animate-pulse' : 'bg-gray-700 text-gray-400')
            }`}>
              {accessGranted ? 'Access Granted' : (isTransferring ? 'Authenticating...' : 'No Connection')}
            </div>
          </div>
        </div>
        
        <div className="bg-black/30 p-4 rounded-md mb-6 font-mono text-sm">
          <div className="mb-1 text-cyber-blue"># Annotations on the Service Account</div>
          <div className={`${isIrsaEnabled ? 'text-white' : 'text-gray-500'}`}>
            eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/recipe-api-role
          </div>
        </div>
        
        <div className="text-sm mb-6">
          <h3 className="text-lg font-orbitron text-cyber-blue mb-2">How It Works:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li className={isIrsaEnabled ? '' : 'text-gray-500'}>Pod uses a service account with IRSA annotations</li>
            <li className={isConnected ? '' : 'text-gray-500'}>EKS injects AWS credentials provider into the pod</li>
            <li className={isTransferring ? '' : 'text-gray-500'}>Pod exchanges token for temporary AWS credentials</li>
            <li className={accessGranted ? '' : 'text-gray-500'}>Pod accesses AWS services with temporary credentials</li>
          </ol>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={toggleIrsa} 
          className={`${isIrsaEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isIrsaEnabled ? 'Disable' : 'Enable'} IRSA
        </Button>
        
        <Button 
          onClick={resetDemo}
          variant="outline"
          className="ml-auto border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default IRSADemo;
