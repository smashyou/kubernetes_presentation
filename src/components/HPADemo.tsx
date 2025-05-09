
import { useState, useEffect } from 'react';
import { Check, X, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const HPADemo = () => {
  // HPA configuration
  const [minPods, setMinPods] = useState(1);
  const [maxPods, setMaxPods] = useState(10);
  const [targetCpuUtilization, setTargetCpuUtilization] = useState(70);
  
  // Current state
  const [podCount, setPodCount] = useState(3);
  const [cpuUsage, setCpuUsage] = useState(50);
  const [isHpaEnabled, setIsHpaEnabled] = useState(false);
  const [scaleTimer, setScaleTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Effect to handle pod scaling based on CPU usage when HPA is enabled
  useEffect(() => {
    if (isHpaEnabled) {
      // Clear any existing timer
      if (scaleTimer) {
        clearTimeout(scaleTimer);
      }
      
      // Set a new timer for scaling decision
      const timer = setTimeout(() => {
        if (cpuUsage > targetCpuUtilization && podCount < maxPods) {
          // Scale up immediately when above target
          setPodCount(prev => Math.min(prev + 1, maxPods));
        } else if (cpuUsage < targetCpuUtilization * 0.5 && podCount > minPods) {
          // Scale down when below 50% of target (with a delay to prevent thrashing)
          setPodCount(prev => Math.max(prev - 1, minPods));
        }
      }, cpuUsage > targetCpuUtilization ? 1000 : 2500); // Quicker scale up, slower scale down
      
      setScaleTimer(timer);
    }
    
    return () => {
      if (scaleTimer) {
        clearTimeout(scaleTimer);
      }
    };
  }, [cpuUsage, isHpaEnabled, targetCpuUtilization, podCount, maxPods, minPods]);
  
  const increaseUsage = () => {
    if (cpuUsage < 100) {
      const newUsage = Math.min(cpuUsage + 10, 100);
      setCpuUsage(newUsage);
    }
  };

  const decreaseUsage = () => {
    if (cpuUsage > 0) {
      const newUsage = Math.max(cpuUsage - 10, 0);
      setCpuUsage(newUsage);
    }
  };

  const toggleHpa = () => {
    setIsHpaEnabled(!isHpaEnabled);
  };
  
  const updateMinPods = (value: string) => {
    const min = Math.max(1, parseInt(value) || 1);
    setMinPods(min);
    // Ensure current pods are at least the minimum
    if (podCount < min && isHpaEnabled) {
      setPodCount(min);
    }
  };
  
  const updateMaxPods = (value: string) => {
    const max = Math.min(20, parseInt(value) || 10);
    setMaxPods(max);
    // Ensure current pods don't exceed maximum
    if (podCount > max && isHpaEnabled) {
      setPodCount(max);
    }
  };
  
  const updateTargetCpu = (value: string) => {
    const target = Math.min(Math.max(parseInt(value) || 70, 10), 99);
    setTargetCpuUtilization(target);
  };

  const resetDemo = () => {
    if (scaleTimer) {
      clearTimeout(scaleTimer);
      setScaleTimer(null);
    }
    setMinPods(1);
    setMaxPods(10);
    setTargetCpuUtilization(70);
    setPodCount(3);
    setCpuUsage(50);
    setIsHpaEnabled(false);
  };

  // Get color based on CPU usage
  const getCpuColor = () => {
    if (cpuUsage < 50) return 'text-green-400';
    if (cpuUsage < 80) return 'text-yellow-400';
    return 'text-red-500';
  };

  // Get progress color based on CPU usage
  const getProgressColor = () => {
    if (cpuUsage < 50) return 'bg-gradient-to-r from-green-400 to-green-500';
    if (cpuUsage < 80) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  return (
    <div className="cyber-panel">
      <h2 className="text-2xl font-orbitron mb-6 text-cyber-purple">Horizontal Pod Autoscaler <span className="text-sm text-cyber-blue">(Week 2)</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <Label className="text-cyber-blue mb-1">HPA Configuration</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="minPods" className="text-xs">Min Pods</Label>
                <Input
                  id="minPods"
                  type="number"
                  min="1"
                  max={maxPods}
                  value={minPods}
                  onChange={(e) => updateMinPods(e.target.value)}
                  className="bg-black/30 border-cyber-blue"
                />
              </div>
              <div>
                <Label htmlFor="targetCpu" className="text-xs">Target CPU %</Label>
                <Input
                  id="targetCpu"
                  type="number"
                  min="10"
                  max="99"
                  value={targetCpuUtilization}
                  onChange={(e) => updateTargetCpu(e.target.value)}
                  className="bg-black/30 border-cyber-blue"
                />
              </div>
              <div>
                <Label htmlFor="maxPods" className="text-xs">Max Pods</Label>
                <Input
                  id="maxPods"
                  type="number"
                  min={minPods}
                  max="20"
                  value={maxPods}
                  onChange={(e) => updateMaxPods(e.target.value)}
                  className="bg-black/30 border-cyber-blue"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-cyber-blue mb-1">Current Pod Count</p>
            <div className="text-4xl font-orbitron text-cyber-pink">{podCount}</div>
          </div>
          
          <div className="text-center">
            <p className="text-cyber-blue mb-1">HPA Status</p>
            <div className="text-xl font-orbitron">
              {isHpaEnabled ? (
                <span className="flex items-center justify-center text-green-500"><Check size={24} className="mr-1" /> Active</span>
              ) : (
                <span className="flex items-center justify-center text-red-500"><X size={24} className="mr-1" /> Inactive</span>
              )}
            </div>
          </div>
          
          <div>
            <Label className="text-cyber-blue mb-1">CPU Usage</Label>
            <div className={`text-4xl font-orbitron mb-1 ${getCpuColor()}`}>{cpuUsage}%</div>
            <Progress 
              value={cpuUsage} 
              className="h-3 bg-gray-700"
            />
            <div 
              className={`h-3 rounded-full ${getProgressColor()}`} 
              style={{ 
                width: `${cpuUsage}%`, 
                marginTop: '-12px' 
              }} 
            />
            {isHpaEnabled && (
              <div className="mt-2 text-xs">
                <div className="flex justify-between text-cyber-blue">
                  <span>Min: {minPods}</span>
                  <span>Target CPU: {targetCpuUtilization}%</span>
                  <span>Max: {maxPods}</span>
                </div>
                <div className="relative h-2 bg-black/30 rounded-full mt-1">
                  {/* Target CPU utilization marker */}
                  <div 
                    className="absolute h-4 w-1 bg-cyber-blue -top-1" 
                    style={{ left: `${targetCpuUtilization}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex flex-wrap justify-center mb-4 gap-3">
            {Array.from({ length: podCount }).map((_, index) => (
              <div 
                key={index} 
                className="h-14 w-14 bg-gradient-to-br from-cyber-pink to-cyber-purple rounded-md flex items-center justify-center animate-scale-in shadow-[0_0_5px_rgba(217,70,239,0.5)] hover:shadow-[0_0_10px_rgba(217,70,239,0.8)] transition-all"
              >
                <div className="text-xs text-center text-white font-mono">
                  Pod {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-center mb-4 text-gray-400">
            {isHpaEnabled 
              ? cpuUsage > targetCpuUtilization 
                ? "HPA is scaling up pods to handle increased load" 
                : cpuUsage < targetCpuUtilization * 0.5 
                  ? "HPA is scaling down pods due to decreased load" 
                  : "CPU usage is within target range, maintaining current pod count"
              : "Enable HPA to automatically scale pods based on CPU usage"}
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Button 
          onClick={increaseUsage} 
          disabled={cpuUsage >= 100}
          className="bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-cyber-blue hover:to-cyber-purple flex gap-2"
        >
          <ArrowUp size={18} />
          Increase CPU Usage
        </Button>
        
        <Button 
          onClick={decreaseUsage} 
          disabled={cpuUsage <= 0}
          className="bg-gradient-to-r from-cyber-pink to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue flex gap-2"
        >
          <ArrowDown size={18} />
          Decrease CPU Usage
        </Button>
        
        <Button 
          onClick={toggleHpa} 
          className={`${isHpaEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isHpaEnabled ? 'Disable' : 'Enable'} HPA
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

export default HPADemo;
