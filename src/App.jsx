import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Ambulance, Shield, Flame, Truck, Activity } from "lucide-react";

import SOSButton from "./components/SOSButton";
import StatusBar from "./components/StatusBar";
import EmergencyModal from "./components/EmergencyModal";

const quickServices = [
  { icon: Ambulance, label: "Ambulance", color: "hsl(200, 90%, 55%)" },
  { icon: Shield, label: "Police", color: "hsl(210, 90%, 60%)" },
];

const otherServices = [
  { icon: Flame, label: "Fire", color: "hsl(190, 85%, 50%)" },
  { icon: Truck, label: "Tow", color: "hsl(220, 80%, 65%)" },
];

export default function App() {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [location, setLocation] = useState(null);

  // 📍 Get user location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          alert("Location permission denied");
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <StatusBar />

      <div className="px-4 mt-4">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 text-sm text-center"
        >
          Hold the button for 3 seconds to activate emergency
        </motion.p>
      </div>

      {/* SOS Button */}
      <div className="flex items-center justify-center mt-12 mb-12">
        <SOSButton onActivate={() => setEmergencyActive(true)} />
      </div>

      {/* Quick Services */}
      <div className="px-4">
        <h2 className="font-semibold text-sm text-gray-400 mb-3 uppercase tracking-wider">
          Quick Call
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickServices.map((service, i) => (
            <motion.button
              key={service.label}
              onClick={() => {
                if (service.label === "Ambulance") {
                  window.location.href = "tel:108";
                }
                if (service.label === "Police") {
                  window.location.href = "tel:100";
                }
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${service.color}20`,
                  color: service.color,
                }}
              >
                <service.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{service.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Other Services */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-sm text-gray-400 mb-3 uppercase tracking-wider">
          Other Services
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {otherServices.map((service, i) => (
            <motion.button
              key={service.label}
              onClick={() => {
                if (service.label === "Fire") {
                  window.location.href = "tel:101";
                }
                if (service.label === "Tow") {
                  alert("Tow service not connected yet");
                }
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${service.color}20`,
                  color: service.color,
                }}
              >
                <service.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{service.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Status + Location */}
      <div className="px-4 mt-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="font-semibold text-sm">System Status</span>
          </div>

          <p className="text-sm">All systems operational</p>

          {location && (
            <p className="text-xs mt-2 text-gray-300">
              📍 Lat: {location.lat.toFixed(4)} | Lng:{" "}
              {location.lng.toFixed(4)}
            </p>
          )}
        </div>
      </div>

      <EmergencyModal
        isOpen={emergencyActive}
        onClose={() => setEmergencyActive(false)}
      />
    </div>
  );
}