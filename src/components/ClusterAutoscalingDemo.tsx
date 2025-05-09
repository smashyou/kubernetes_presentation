
import { useState } from 'react';
import { Check, X, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const ClusterAutoscalingDemo = () => {
  // Cluster settings
  const [minNodes, setMinNodes] = useState(2);
  const [maxNodes, setMaxNodes] = useState(10);
  const [desiredNodes, setDesiredNodes] = useState(3);
  
  // Current state
  const [nodeCount, setNodeCount] = useState(3);
  const [isAutoScaling, setIsAutoScaling] = useState(false);
  const [podResourceRequests, setPodResourceRequests] = useState(40);
  const [totalResourceCapacity, setTotalResourceCapacity] = useState(100);
  
  // Calculate the percentage of cluster resources in use
  const resourceUtilization = Math.round((podResourceRequests / (nodeCount * 100 * 0.8)) * 100);
  
  const increaseLoad = () => {
    // Increase pod resource requests
    const newRequests = Math.min(podResourceRequests + 30, 1000);
    setPodResourceRequests(newRequests);
    
    // If autoscaling is enabled, automatically adjust nodes based on resource requirements
    if (isAutoScaling) {
      // Each node can handle about 80% of its capacity (100 units) effectively
      const requiredNodes = Math.ceil(newRequests / (100 * 0.8));
      const newNodeCount = Math.min(Math.max(requiredNodes, minNodes), maxNodes);
      setNodeCount(newNodeCount);
      setDesiredNodes(newNodeCount);
    }
  };

  const decreaseLoad = () => {
    // Decrease pod resource requests
    const newRequests = Math.max(podResourceRequests - 30, minNodes * 30);
    setPodResourceRequests(newRequests);
    
    // If autoscaling is enabled, automatically adjust nodes based on resource requirements
    if (isAutoScaling) {
      // Reduce nodes if we have excess capacity, but respect the minimum
      const requiredNodes = Math.ceil(newRequests / (100 * 0.8));
      // Add some delay to simulate cooldown period before scaling down
      setTimeout(() => {
        const newNodeCount = Math.min(Math.max(requiredNodes, minNodes), maxNodes);
        setNodeCount(newNodeCount);
        setDesiredNodes(newNodeCount);
      }, 1500);
    }
  };

  const toggleAutoscaling = () => {
    setIsAutoScaling(!isAutoScaling);
  };

  const updateMinNodes = (value: string) => {
    const min = Math.max(1, parseInt(value) || 1);
    setMinNodes(min);
    // Ensure desired and current nodes are at least the minimum
    if (desiredNodes < min) {
      setDesiredNodes(min);
    }
    if (nodeCount < min && isAutoScaling) {
      setNodeCount(min);
    }
  };

  const updateMaxNodes = (value: string) => {
    const max = Math.min(20, parseInt(value) || 10);
    setMaxNodes(max);
    // Ensure desired and current nodes don't exceed maximum
    if (desiredNodes > max) {
      setDesiredNodes(max);
    }
    if (nodeCount > max && isAutoScaling) {
      setNodeCount(max);
    }
  };

  const updateDesiredNodes = (value: string) => {
    const desired = parseInt(value) || 3;
    const newDesired = Math.min(Math.max(desired, minNodes), maxNodes);
    setDesiredNodes(newDesired);
    // If autoscaling is disabled, immediately set the node count
    if (!isAutoScaling) {
      setNodeCount(newDesired);
    }
  };

  const resetDemo = () => {
    setMinNodes(2);
    setMaxNodes(10);
    setDesiredNodes(3);
    setNodeCount(3);
    setIsAutoScaling(false);
    setPodResourceRequests(40);
  };

  // Get color based on resource utilization
  const getUtilizationColor = () => {
    if (resourceUtilization < 50) return 'text-green-400';
    if (resourceUtilization < 80) return 'text-yellow-400';
    return 'text-red-500';
  };

  return (
    <div className="cyber-panel">
      <h2 className="text-2xl font-orbitron mb-6 text-cyber-purple">Cluster Autoscaling <span className="text-sm text-cyber-blue">(Week 2)</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <Label className="text-cyber-blue mb-1">Autoscaler Configuration</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="minNodes" className="text-xs">Min Nodes</Label>
                <Input
                  id="minNodes"
                  type="number"
                  min="1"
                  max={maxNodes}
                  value={minNodes}
                  onChange={(e) => updateMinNodes(e.target.value)}
                  className="bg-black/30 border-cyber-blue"
                />
              </div>
              <div>
                <Label htmlFor="desiredNodes" className="text-xs">Desired</Label>
                <Input
                  id="desiredNodes"
                  type="number"
                  min={minNodes}
                  max={maxNodes}
                  value={desiredNodes}
                  onChange={(e) => updateDesiredNodes(e.target.value)}
                  className="bg-black/30 border-cyber-blue"
                  disabled={isAutoScaling}
                />
              </div>
              <div>
                <Label htmlFor="maxNodes" className="text-xs">Max Nodes</Label>
                <Input
                  id="maxNodes"
                  type="number"
                  min={minNodes}
                  max="20"
                  value={maxNodes}
                  onChange={(e) => updateMaxNodes(e.target.value)}
                  className="bg-black/30 border-cyber-blue"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-cyber-blue mb-1">Current Node Count</p>
            <div className="text-4xl font-orbitron text-cyber-pink">{nodeCount}</div>
          </div>
          
          <div className="text-center">
            <p className="text-cyber-blue mb-1">Autoscaling Status</p>
            <div className="text-xl font-orbitron">
              {isAutoScaling ? (
                <span className="flex items-center justify-center text-green-500"><Check size={24} className="mr-1" /> Enabled</span>
              ) : (
                <span className="flex items-center justify-center text-red-500"><X size={24} className="mr-1" /> Disabled</span>
              )}
            </div>
          </div>
          
          <div>
            <Label className="text-cyber-blue mb-1">Cluster Resource Utilization</Label>
            <div className={`text-xl font-orbitron mb-1 ${getUtilizationColor()}`}>{resourceUtilization}%</div>
            <Progress 
              value={resourceUtilization} 
              className="h-3 bg-gray-700"
            />
            <div 
              className={`h-3 rounded-full ${
                resourceUtilization < 50 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                resourceUtilization < 80 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                'bg-gradient-to-r from-red-400 to-red-600'
              }`} 
              style={{ 
                width: `${resourceUtilization}%`, 
                marginTop: '-12px' 
              }} 
            />
            <p className="text-xs text-gray-400 mt-1">
              Pod Requests: {podResourceRequests} units / Capacity: {nodeCount * 100} units
            </p>
          </div>
        </div>
        
        <div>
          <div className="flex flex-wrap justify-center mb-4 gap-4">
            {Array.from({ length: nodeCount }).map((_, index) => (
              <div 
                key={index} 
                className="h-16 w-16 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-md flex items-center justify-center animate-scale-in shadow-lg hover:shadow-[0_0_15px_rgba(155,135,245,0.7)] transition-all"
              >
                <div className="text-xs text-center text-white font-mono">
                  Node {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-center mb-4 text-gray-400">
            {isAutoScaling 
              ? "Cluster Autoscaler is monitoring resource requests and adjusting node count automatically"
              : "Set desired nodes manually or enable autoscaling to adjust dynamically based on resource needs"}
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Button 
          onClick={increaseLoad} 
          className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-pink flex gap-2"
        >
          <ArrowUp size={18} />
          Increase Load (Pod Requests)
        </Button>
        
        <Button 
          onClick={decreaseLoad} 
          disabled={podResourceRequests <= minNodes * 30}
          className="bg-gradient-to-r from-cyber-purple to-cyber-blue hover:from-cyber-pink hover:to-cyber-purple flex gap-2"
        >
          <ArrowDown size={18} />
          Decrease Load (Pod Requests)
        </Button>
        
        <Button 
          onClick={toggleAutoscaling} 
          className={`${isAutoScaling ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isAutoScaling ? 'Disable' : 'Enable'} Autoscaling
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

export default ClusterAutoscalingDemo;
