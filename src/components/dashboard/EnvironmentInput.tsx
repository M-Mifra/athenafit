import { useState, useEffect } from "react";
import { Wind, Thermometer, AlertTriangle, Lock, Calendar, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface EnvironmentData {
  aqi: number;
  temperature_celsius: number;
  is_heatwave: boolean;
  lockdown_status: "none" | "partial" | "full";
  has_local_event: boolean;
}

interface EnvironmentInputProps {
  onSubmit: (data: EnvironmentData) => void;
  loading?: boolean;
  data?: EnvironmentData;
  setData?: React.Dispatch<React.SetStateAction<EnvironmentData>>;
}

const EnvironmentInput = ({ onSubmit, loading, data, setData }: EnvironmentInputProps) => {
  const [localAqi, setLocalAqi] = useState(data?.aqi ?? 50);
  const [localTemperature, setLocalTemperature] = useState(data?.temperature_celsius ?? 22);
  const [localIsHeatwave, setLocalIsHeatwave] = useState(data?.is_heatwave ?? false);
  const [localLockdownStatus, setLocalLockdownStatus] = useState<"none" | "partial" | "full">(data?.lockdown_status ?? "none");
  const [localHasLocalEvent, setLocalHasLocalEvent] = useState(data?.has_local_event ?? false);

  useEffect(() => {
    if (setData) {
      setData({
        aqi: localAqi,
        temperature_celsius: localTemperature,
        is_heatwave: localIsHeatwave,
        lockdown_status: localLockdownStatus,
        has_local_event: localHasLocalEvent,
      });
    }
  }, [localAqi, localTemperature, localIsHeatwave, localLockdownStatus, localHasLocalEvent, setData]);

  const getAqiColor = (value: number) => {
    if (value <= 50) return "text-green-500";
    if (value <= 100) return "text-yellow-500";
    if (value <= 150) return "text-orange-500";
    if (value <= 200) return "text-red-500";
    return "text-purple-500";
  };

  const getAqiLabel = (value: number) => {
    if (value <= 50) return "Good";
    if (value <= 100) return "Moderate";
    if (value <= 150) return "Unhealthy (Sensitive)";
    if (value <= 200) return "Unhealthy";
    if (value <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const getTempColor = (value: number) => {
    if (value < 10) return "text-blue-400";
    if (value < 25) return "text-green-500";
    if (value < 35) return "text-yellow-500";
    if (value < 40) return "text-orange-500";
    return "text-red-500";
  };

  const handleSubmit = () => {
    onSubmit({
      aqi: localAqi,
      temperature_celsius: localTemperature,
      is_heatwave: localIsHeatwave,
      lockdown_status: localLockdownStatus,
      has_local_event: localHasLocalEvent,
    });
  };

  return (
    <div className="editorial-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
          <Wind className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-medium">Environment & Policy</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">External Conditions</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Wind className="h-4 w-4 text-muted-foreground" />
              Air Quality Index (AQI)
            </Label>
            <span className={`font-mono text-lg font-bold ${getAqiColor(localAqi)}`}>
              {localAqi}
            </span>
          </div>
          <Slider
            value={[localAqi]}
            onValueChange={(v) => setLocalAqi(v[0])}
            max={500}
            min={0}
            step={5}
            className="cursor-pointer"
          />
          <p className={`text-xs ${getAqiColor(localAqi)}`}>{getAqiLabel(localAqi)}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              Temperature
            </Label>
            <span className={`font-mono text-lg font-bold ${getTempColor(localTemperature)}`}>
              {localTemperature}°C
            </span>
          </div>
          <Slider
            value={[localTemperature]}
            onValueChange={(v) => setLocalTemperature(v[0])}
            max={50}
            min={-10}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-3 border-t border-border/50">
          <Label className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Heatwave Alert
          </Label>
          <Switch
            checked={localIsHeatwave}
            onCheckedChange={setLocalIsHeatwave}
          />
        </div>

        <div className="space-y-3 py-3 border-t border-border/50">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            Movement Restrictions
          </Label>
          <Select value={localLockdownStatus} onValueChange={(v: "none" | "partial" | "full") => setLocalLockdownStatus(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select restriction level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Restrictions</SelectItem>
              <SelectItem value="partial">Partial Lockdown</SelectItem>
              <SelectItem value="full">Full Lockdown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-border/50">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Local Event (crowd/safety concern)
          </Label>
          <Switch
            checked={localHasLocalEvent}
            onCheckedChange={setLocalHasLocalEvent}
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Apply Environment Constraints
            <ChevronRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};

export default EnvironmentInput;
