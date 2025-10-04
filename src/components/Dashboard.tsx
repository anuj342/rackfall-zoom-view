import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw, AlertTriangle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import mineImage from "@/assets/mine-aerial.jpg";

interface Detection {
  id: number;
  x: number;
  y: number;
  risk: "critical" | "high" | "moderate" | "low";
  timestamp: string;
  size: string;
}

const mockDetections: Detection[] = [
  { id: 1, x: 45, y: 35, risk: "critical", timestamp: "2 min ago", size: "Large" },
  { id: 2, x: 62, y: 28, risk: "high", timestamp: "5 min ago", size: "Medium" },
  { id: 3, x: 38, y: 58, risk: "moderate", timestamp: "12 min ago", size: "Small" },
  { id: 4, x: 72, y: 45, risk: "low", timestamp: "18 min ago", size: "Minor" },
];

const riskColors = {
  critical: "bg-risk-critical",
  high: "bg-risk-high",
  moderate: "bg-risk-moderate",
  low: "bg-risk-low",
};

const riskLabels = {
  critical: "Critical",
  high: "High",
  moderate: "Moderate",
  low: "Low",
};

export const Dashboard = () => {
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  StrataNet AI
                </h1>
                <p className="text-sm text-muted-foreground">Rockfall Detection System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-success text-success">
                System Active
              </Badge>
              <span className="text-sm text-muted-foreground">
                Last Updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 bg-card border-border">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground">Detection Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Critical</span>
                  <Badge className="bg-risk-critical">1</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">High</span>
                  <Badge className="bg-risk-high">1</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Moderate</span>
                  <Badge className="bg-risk-moderate">1</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Low</span>
                  <Badge className="bg-risk-low">1</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card border-border">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Recent Detections
              </h3>
              <div className="space-y-3">
                {mockDetections.map((detection) => (
                  <button
                    key={detection.id}
                    onClick={() => setSelectedDetection(detection)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedDetection?.id === detection.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-mono">#{detection.id}</span>
                      <Badge className={`${riskColors[detection.risk]} text-xs`}>
                        {riskLabels[detection.risk]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{detection.timestamp}</p>
                    <p className="text-xs text-muted-foreground">Size: {detection.size}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Image Viewer */}
          <div className="lg:col-span-3">
            <Card className="p-4 bg-card border-border">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Site Monitoring - Bingham Canyon</h2>
                {selectedDetection && (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <span className="text-sm text-muted-foreground">Selected:</span>
                    <Badge className={riskColors[selectedDetection.risk]}>
                      Detection #{selectedDetection.id}
                    </Badge>
                  </div>
                )}
              </div>

              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="mb-3 flex gap-2">
                      <Button
                        onClick={() => zoomIn()}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <ZoomIn className="h-4 w-4" />
                        Zoom In
                      </Button>
                      <Button
                        onClick={() => zoomOut()}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <ZoomOut className="h-4 w-4" />
                        Zoom Out
                      </Button>
                      <Button
                        onClick={() => resetTransform()}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                      </Button>
                    </div>

                    <div className="relative border-2 border-border rounded-lg overflow-hidden bg-black/50">
                      <TransformComponent
                        wrapperStyle={{
                          width: "100%",
                          height: "600px",
                        }}
                      >
                        <div className="relative">
                          <img
                            src={mineImage}
                            alt="Mining site aerial view"
                            className="w-full h-auto"
                          />
                          {/* Detection Markers */}
                          {mockDetections.map((detection) => (
                            <button
                              key={detection.id}
                              onClick={() => setSelectedDetection(detection)}
                              className={`absolute w-8 h-8 rounded-full border-2 border-white ${
                                riskColors[detection.risk]
                              } ${
                                detection.risk === "critical" ? "animate-pulse-glow" : ""
                              } ${
                                selectedDetection?.id === detection.id
                                  ? "ring-4 ring-white"
                                  : ""
                              } transition-all hover:scale-125 cursor-pointer`}
                              style={{
                                left: `${detection.x}%`,
                                top: `${detection.y}%`,
                                transform: "translate(-50%, -50%)",
                              }}
                            >
                              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                                {detection.id}
                              </span>
                            </button>
                          ))}
                        </div>
                      </TransformComponent>
                    </div>
                  </>
                )}
              </TransformWrapper>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 <strong>Tip:</strong> Click and drag to pan • Use mouse wheel to zoom • Click markers to view detection details
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
