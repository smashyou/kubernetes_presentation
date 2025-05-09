
import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type RBACRole = 'admin' | 'editor' | 'viewer' | 'none';
type Action = 'get' | 'list' | 'create' | 'update' | 'delete' | 'exec';

interface ResourcePermission {
  name: string;
  icon: string;
  actions: {
    [key in Action]: {
      admin: boolean;
      editor: boolean;
      viewer: boolean;
    };
  };
}

const RBACDemo = () => {
  const [selectedRole, setSelectedRole] = useState<RBACRole>('none');
  const [selectedAction, setSelectedAction] = useState<Action>('get');
  const [accessResult, setAccessResult] = useState<boolean | null>(null);
  const [selectedResource, setSelectedResource] = useState<string>('pods');

  // Check access whenever role, action or resource changes
  useEffect(() => {
    if (selectedRole === 'none') {
      setAccessResult(false);
      return;
    }

    const resource = resources.find(r => r.name === selectedResource);
    if (!resource) {
      setAccessResult(false);
      return;
    }

    setAccessResult(resource.actions[selectedAction][selectedRole]);
  }, [selectedRole, selectedAction, selectedResource]);

  const resources: ResourcePermission[] = [
    {
      name: 'pods',
      icon: '🥘',
      actions: {
        get: { admin: true, editor: true, viewer: true },
        list: { admin: true, editor: true, viewer: true },
        create: { admin: true, editor: true, viewer: false },
        update: { admin: true, editor: true, viewer: false },
        delete: { admin: true, editor: false, viewer: false },
        exec: { admin: true, editor: false, viewer: false },
      },
    },
    {
      name: 'deployments',
      icon: '📋',
      actions: {
        get: { admin: true, editor: true, viewer: true },
        list: { admin: true, editor: true, viewer: true },
        create: { admin: true, editor: true, viewer: false },
        update: { admin: true, editor: true, viewer: false },
        delete: { admin: true, editor: false, viewer: false },
        exec: { admin: true, editor: false, viewer: false },
      },
    },
    {
      name: 'secrets',
      icon: '🔐',
      actions: {
        get: { admin: true, editor: false, viewer: false },
        list: { admin: true, editor: true, viewer: false },
        create: { admin: true, editor: false, viewer: false },
        update: { admin: true, editor: false, viewer: false },
        delete: { admin: true, editor: false, viewer: false },
        exec: { admin: true, editor: false, viewer: false },
      },
    },
  ];

  const resetDemo = () => {
    setSelectedRole('none');
    setSelectedAction('get');
    setSelectedResource('pods');
    setAccessResult(null);
  };

  return (
    <div className="cyber-panel">
      <h2 className="text-2xl font-orbitron mb-6 text-cyber-purple">RBAC Access Control <span className="text-sm text-cyber-blue">(Week 3)</span></h2>
      
      <div className="mb-8">
        <p className="text-cyber-blue mb-4">Role-Based Access Control (RBAC) in Kubernetes determines who can do what with which resources.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Role Selection */}
          <div>
            <h3 className="text-lg font-orbitron text-cyber-blue mb-3">Select Role</h3>
            <div className="space-y-3">
              <div 
                className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedRole === 'admin' ? 'border-cyber-pink bg-cyber-pink/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                onClick={() => setSelectedRole('admin')}
              >
                <div className="font-orbitron mb-1">Admin</div>
                <p className="text-xs text-gray-300">Full control over all resources</p>
              </div>
              
              <div 
                className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedRole === 'editor' ? 'border-cyber-purple bg-cyber-purple/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                onClick={() => setSelectedRole('editor')}
              >
                <div className="font-orbitron mb-1">Editor</div>
                <p className="text-xs text-gray-300">Can modify most resources</p>
              </div>
              
              <div 
                className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedRole === 'viewer' ? 'border-cyber-blue bg-cyber-blue/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                onClick={() => setSelectedRole('viewer')}
              >
                <div className="font-orbitron mb-1">Viewer</div>
                <p className="text-xs text-gray-300">Read-only access to most resources</p>
              </div>
            </div>
          </div>
          
          {/* Resource Selection */}
          <div>
            <h3 className="text-lg font-orbitron text-cyber-blue mb-3">Select Resource</h3>
            <div className="space-y-3">
              {resources.map(resource => (
                <div 
                  key={resource.name}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedResource === resource.name ? 'border-cyber-orange bg-cyber-orange/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                  onClick={() => setSelectedResource(resource.name)}
                >
                  <div className="font-orbitron mb-1 flex items-center">
                    <span className="mr-2">{resource.icon}</span>
                    {resource.name.charAt(0).toUpperCase() + resource.name.slice(1)}
                  </div>
                  <p className="text-xs text-gray-300">
                    {resource.name === 'pods' && 'Individual containers running in the cluster'}
                    {resource.name === 'deployments' && 'Manages replicated pods and updates'}
                    {resource.name === 'secrets' && 'Sensitive information like passwords and tokens'}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Selection */}
          <div>
            <h3 className="text-lg font-orbitron text-cyber-blue mb-3">Select Action</h3>
            <div className="grid grid-cols-2 gap-3">
              <div 
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${selectedAction === 'get' ? 'border-cyber-blue bg-cyber-blue/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                onClick={() => setSelectedAction('get')}
              >
                <div className="font-mono">GET</div>
              </div>
              
              <div 
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${selectedAction === 'list' ? 'border-cyber-blue bg-cyber-blue/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                onClick={() => setSelectedAction('list')}
              >
                <div className="font-mono">LIST</div>
              </div>
              
              <div 
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${selectedAction === 'create' ? 'border-cyber-purple bg-cyber-purple/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                onClick={() => setSelectedAction('create')}
              >
                <div className="font-mono">CREATE</div>
              </div>
              
              <div 
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${selectedAction === 'update' ? 'border-cyber-purple bg-cyber-purple/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                onClick={() => setSelectedAction('update')}
              >
                <div className="font-mono">UPDATE</div>
              </div>
              
              <div 
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${selectedAction === 'delete' ? 'border-cyber-pink bg-cyber-pink/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                onClick={() => setSelectedAction('delete')}
              >
                <div className="font-mono">DELETE</div>
              </div>
              
              <div 
                className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${selectedAction === 'exec' ? 'border-cyber-pink bg-cyber-pink/20' : 'border-gray-700 bg-black/20 hover:bg-black/40'}`}
                onClick={() => setSelectedAction('exec')}
              >
                <div className="font-mono">EXEC</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          {selectedRole !== 'none' && accessResult !== null && (
            <div className={`p-4 rounded-lg text-center transition-all ${
              accessResult ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'
            }`}>
              <div className="flex items-center justify-center text-lg font-orbitron mb-2">
                {accessResult ? (
                  <>
                    <Check size={24} className="mr-2 text-green-400" />
                    <span className="text-green-400">Access Granted</span>
                  </>
                ) : (
                  <>
                    <X size={24} className="mr-2 text-red-400" />
                    <span className="text-red-400">Access Denied</span>
                  </>
                )}
              </div>
              <p className="text-sm">
                {accessResult
                  ? `The ${selectedRole} role is authorized to ${selectedAction} ${selectedResource}.`
                  : `The ${selectedRole} role is not authorized to ${selectedAction} ${selectedResource}.`
                }
              </p>
            </div>
          )}
        </div>
        
        <div className="text-sm mb-6">
          <h3 className="text-lg font-orbitron text-cyber-blue mb-2">RBAC Components:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li><span className="text-cyber-purple">Roles</span> - Define permissions within a namespace</li>
            <li><span className="text-cyber-purple">ClusterRoles</span> - Define cluster-wide permissions</li>
            <li><span className="text-cyber-purple">RoleBindings</span> - Link users/groups to roles</li>
            <li><span className="text-cyber-purple">ClusterRoleBindings</span> - Link users/groups to cluster roles</li>
          </ul>
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

export default RBACDemo;
