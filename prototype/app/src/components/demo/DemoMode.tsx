import { useState } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FallEvent } from '@/types';

interface DemoModeProps {
  onSimulateFall: () => void;
  isMonitoring: boolean;
  onToggleMonitoring: () => void;
  fallHistory: FallEvent[];
}

export function DemoMode({
  onSimulateFall,
  isMonitoring,
  onToggleMonitoring,
  fallHistory,
}: DemoModeProps) {
  const [showDemoPanel, setShowDemoPanel] = useState(true);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40">
      {/* Demo Toggle Button */}
      <button
        onClick={() => setShowDemoPanel((prev) => !prev)}
        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1A202C] text-white px-4 py-2 rounded-t-xl text-sm font-medium flex items-center gap-2"
      >
        <Activity className="w-4 h-4" />
        Hackathon Demo Mode
        <span className="text-xs bg-[#FF6B00] px-2 py-0.5 rounded-full">
          {showDemoPanel ? 'Hide' : 'Show'}
        </span>
      </button>

      {/* Demo Panel */}
      {showDemoPanel && (
        <div className="bg-[#1A202C] rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Demo Controls</h3>
                <p className="text-gray-400 text-sm">
                  Simulate fall detection for presentation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Events:</span>
              <span className="bg-[#0056D2] text-white px-3 py-1 rounded-full text-sm font-bold">
                {fallHistory.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Start/Stop Monitoring */}
            <Button
              onClick={onToggleMonitoring}
              variant="outline"
              className={`h-14 rounded-xl border-2 flex flex-col items-center justify-center gap-1 ${
                isMonitoring
                  ? 'border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10'
                  : 'border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10'
              }`}
            >
              {isMonitoring ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span className="text-xs">Stop</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span className="text-xs">Start</span>
                </>
              )}
            </Button>

            {/* Simulate Fall */}
            <Button
              onClick={onSimulateFall}
              disabled={!isMonitoring}
              className="h-14 rounded-xl bg-[#FF6B00] hover:bg-[#E66000] text-white flex flex-col items-center justify-center gap-1 disabled:opacity-50"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs">Simulate Fall</span>
            </Button>

            {/* Reset */}
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="h-14 rounded-xl border-2 border-gray-600 text-gray-400 hover:bg-gray-800 flex flex-col items-center justify-center gap-1"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="text-xs">Reset</span>
            </Button>
          </div>

          {/* Demo Script */}
          <div className="mt-4 p-3 bg-gray-800 rounded-xl">
            <p className="text-gray-400 text-xs mb-2 font-semibold">
              Workflow:
            </p>
            <ol className="text-gray-300 text-xs space-y-1 list-decimal list-inside">
              <li>Start monitoring - show "Monitoring Active" pulse</li>
              <li>Click "Simulate Fall" - demonstrate alert countdown</li>
              <li>Show "I'm OK" cancellation or alert sent</li>
              <li>Switch to Dashboard - show fall history & skeleton replay</li>
              <li>Highlight privacy: "100% on-device, no video uploaded"</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
