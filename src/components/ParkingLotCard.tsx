import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Zap, Accessibility, Car, Building2, TreePine } from 'lucide-react';
import { ParkingLot } from '../types/parking';

interface ParkingLotCardProps {
  lot: ParkingLot;
  onClick: () => void;
  index: number;
}

export function ParkingLotCard({ lot, onClick, index }: ParkingLotCardProps) {
  const availabilityPercentage = (lot.availableSpots / lot.totalSpots) * 100;
  
  const getAvailabilityColor = () => {
    if (availabilityPercentage > 50) return 'text-success';
    if (availabilityPercentage > 20) return 'text-warning';
    return 'text-error';
  };

  const getAvailabilityBg = () => {
    if (availabilityPercentage > 50) return 'bg-success/20';
    if (availabilityPercentage > 20) return 'bg-warning/20';
    return 'bg-error/20';
  };

  const getAvailabilityText = () => {
    if (availabilityPercentage > 50) return '空きあり';
    if (availabilityPercentage > 20) return '混雑';
    return '満車近い';
  };

  const getFacultyColor = () => {
    if (lot.name.includes('法文')) return 'from-blue-600 to-blue-800';
    if (lot.name.includes('教育')) return 'from-green-600 to-green-800';
    if (lot.name.includes('理学')) return 'from-purple-600 to-purple-800';
    if (lot.name.includes('工学')) return 'from-orange-600 to-orange-800';
    if (lot.name.includes('農学')) return 'from-lime-600 to-lime-800';
    if (lot.name.includes('医学')) return 'from-red-600 to-red-800';
    if (lot.name.includes('国際')) return 'from-cyan-600 to-cyan-800';
    return 'from-primary to-accent';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      className="bg-surface border border-border rounded-2xl overflow-hidden cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={lot.image}
          alt={lot.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
        
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r ${getFacultyColor()} text-white text-xs font-bold shadow-lg`}>
          {lot.name.replace('駐車場', '')}
        </div>
        
        <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full ${getAvailabilityBg()}`}>
          <span className={`text-xs font-bold ${getAvailabilityColor()}`}>
            {getAvailabilityText()}
          </span>
        </div>
        
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1 text-gray-300 text-xs">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{lot.address}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${getAvailabilityBg()}`}>
            <Car className={`w-4 h-4 ${getAvailabilityColor()}`} />
            <span className={`font-bold text-lg ${getAvailabilityColor()}`}>
              {lot.availableSpots}
            </span>
            <span className="text-gray-400 text-sm">/ {lot.totalSpots}</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            {lot.floors > 1 ? (
              <>
                <Building2 className="w-4 h-4" />
                <span>{lot.floors}階建</span>
              </>
            ) : (
              <>
                <TreePine className="w-4 h-4" />
                <span>平面</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {lot.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="flex items-center gap-1 px-2 py-0.5 bg-background rounded-md text-xs text-gray-400"
            >
              {amenity === 'EV充電' && <Zap className="w-3 h-3 text-success" />}
              {amenity === '車椅子対応' && <Accessibility className="w-3 h-3 text-secondary" />}
              {amenity}
            </span>
          ))}
        </div>
        
        <div className="w-full bg-background rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${availabilityPercentage}%` }}
            transition={{ duration: 1, delay: index * 0.05 }}
            className={`h-full rounded-full ${
              availabilityPercentage > 50
                ? 'bg-gradient-to-r from-success to-success/70'
                : availabilityPercentage > 20
                ? 'bg-gradient-to-r from-warning to-warning/70'
                : 'bg-gradient-to-r from-error to-error/70'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
