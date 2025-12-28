import { AlertTriangle, ThermometerSun, Wind, Info, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: "warning" | "info" | "caution";
  icon: "heat" | "air" | "fatigue";
  title: string;
  message: string;
}

const iconMap = {
  heat: ThermometerSun,
  air: Wind,
  fatigue: AlertTriangle,
};

const typeStyles = {
  warning: "border-warning/30 bg-warning/5",
  info: "border-info/30 bg-info/5",
  caution: "border-destructive/30 bg-destructive/5",
};

const iconStyles = {
  warning: "bg-warning/20 text-warning",
  info: "bg-info/20 text-info",
  caution: "bg-destructive/20 text-destructive",
};

const AlertPanel = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      icon: "heat",
      title: "Heat Advisory Active",
      message: "Outdoor training not recommended. Consider indoor alternatives or reduce intensity by 30%.",
    },
    {
      id: "2",
      type: "info",
      icon: "fatigue",
      title: "Elevated Fatigue Detected",
      message: "Your 7-day training load is above baseline. Today's plan has been adjusted for recovery.",
    },
  ]);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Active Alerts
        </h3>
      </div>

      {alerts.map((alert, index) => {
        const Icon = iconMap[alert.icon];
        return (
          <div
            key={alert.id}
            className={`glass-card rounded-xl p-4 border ${typeStyles[alert.type]} fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${iconStyles[alert.type]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{alert.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {alert.message}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => dismissAlert(alert.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlertPanel;
