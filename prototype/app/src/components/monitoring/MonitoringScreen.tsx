import { useState, useEffect, useCallback } from 'react';
import {
  Shield,
  Video,
  VideoOff,
  Settings,
  Phone,
  Power,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CaregiverInfo } from '@/types';

interface MonitoringScreenProps {
  isMonitoring: boolean;
  caregiver: CaregiverInfo;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  cameraError: string | null;
  onStartMonitoring: () => void;
  onStopMonitoring: () => void;
  onTriggerEmergency: () => void;
  onOpenSettings: () => void;
  onSwitchToDashboard: () => void;
}

export function MonitoringScreen({
  isMonitoring,
  caregiver,
  videoRef,
  canvasRef,
  cameraError,
  onStartMonitoring,
  onStopMonitoring,
  onTriggerEmergency,
  onOpenSettings,
  onSwitchToDashboard,
}: MonitoringScreenProps) {
  const [showCamera, setShowCamera] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleCamera = useCallback(() => {
    setShowCamera((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-sg-gradient flex flex-col">
      {/* Header */}
      <div className="pt-safe px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0056D2] flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-[#1A202C]">
              Smart<span className="text-[#0056D2]">Guard</span>
            </span>
            <p className="text-xs text-[#718096]">
              {currentTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToDashboard}
            className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#E8ECF0] transition-colors"
          >
            <Eye className="w-5 h-5 text-[#718096]" />
          </button>
          <button
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#E8ECF0] transition-colors"
          >
            <Settings className="w-5 h-5 text-[#718096]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 flex flex-col">
        {/* Status Card */}
        <div className="sg-card p-6 mb-6">
          {isMonitoring ? (
            <div className="text-center">
              {/* Active Monitoring Indicator */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                {/* Pulse rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-[#10B981]/20 animate-ping" />
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ animationDelay: '0.5s' }}
                >
                  <div className="w-24 h-24 rounded-full bg-[#10B981]/20 animate-ping" />
                </div>

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#10B981] flex items-center justify-center shadow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#10B981] mb-1">
                Monitoring Active
              </h2>
              <p className="text-[#718096]">
                AI is watching for falls
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-6 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1A202C]">99%</p>
                  <p className="text-xs text-[#718096]">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1A202C]">&lt;2%</p>
                  <p className="text-xs text-[#718096]">Battery/hr</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1A202C]">&lt;5s</p>
                  <p className="text-xs text-[#718096]">Alert time</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              {/* Inactive Indicator */}
              <div className="w-24 h-24 rounded-full bg-[#F5F7FA] flex items-center justify-center mx-auto mb-4">
                <VideoOff className="w-10 h-10 text-[#718096]" />
              </div>

              <h2 className="text-2xl font-bold text-[#718096] mb-1">
                Not Monitoring
              </h2>
              <p className="text-[#A0AEC0]">
                Start to enable fall detection
              </p>
            </div>
          )}
        </div>

        {/* Camera Preview (Collapsible) */}
        <div className="sg-card overflow-hidden mb-6">
          <button
            onClick={toggleCamera}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F5F7FA] transition-colors"
          >
            <div className="flex items-center gap-3">
              {showCamera ? (
                <Video className="w-5 h-5 text-[#0056D2]" />
              ) : (
                <VideoOff className="w-5 h-5 text-[#718096]" />
              )}
              <span className="font-medium text-[#1A202C]">
                {showCamera ? 'Hide Camera Preview' : 'Show Camera Preview'}
              </span>
            </div>
            {showCamera ? (
              <EyeOff className="w-5 h-5 text-[#718096]" />
            ) : (
              <Eye className="w-5 h-5 text-[#718096]" />
            )}
          </button>

          {showCamera && (
            <div className="relative bg-black">
              {cameraError ? (
                <div className="p-8 text-center">
                  <VideoOff className="w-12 h-12 text-[#718096] mx-auto mb-3" />
                  <p className="text-[#718096]">{cameraError}</p>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-48 object-cover"
                    playsInline
                    muted
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-48 object-cover"
                  />
                  {!isMonitoring && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <p className="text-white font-medium">
                        Start monitoring to activate AI
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Caregiver Info */}
        <div className="sg-card p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0056D2]/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-[#0056D2]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#718096]">Emergency Contact</p>
              <p className="font-semibold text-[#1A202C] text-lg">
                {caregiver.name || 'Not set'}
              </p>
              <p className="text-sm text-[#718096]">
                {caregiver.phoneNumber || 'No phone number'}
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="flex justify-center mb-6">
          <div className="sg-privacy-badge">
            <Shield className="w-4 h-4" />
            <span>Processing on Device. No Video Uploaded.</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 pb-safe space-y-3">
        {isMonitoring ? (
          <Button
            onClick={onStopMonitoring}
            variant="outline"
            className="w-full h-14 rounded-full border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10 font-semibold text-lg flex items-center justify-center gap-2"
          >
            <Power className="w-5 h-5" />
            Stop Monitoring
          </Button>
        ) : (
          <Button
            onClick={onStartMonitoring}
            className="w-full sg-button-primary flex items-center justify-center gap-2"
          >
            <Video className="w-5 h-5" />
            Start Monitoring
          </Button>
        )}

        <Button
          onClick={onTriggerEmergency}
          variant="outline"
          className="w-full h-14 rounded-full border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10 font-semibold text-lg flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" />
          HELP ME
        </Button>
      </div>
    </div>
  );
}
