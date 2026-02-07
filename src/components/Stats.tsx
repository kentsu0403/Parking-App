import { motion } from 'framer-motion';
import { Car, MapPin, Clock, TrendingUp } from 'lucide-react';
import { useParkingStore } from '../store/parkingStore';

export function Stats() {
  const { parkingLots } = useParkingStore();

  const totalSpots = parkingLots.reduce((acc, lot) => acc + lot.totalSpots, 0);
  const totalAvailable = parkingLots.reduce((acc, lot) => acc + lot.availableSpots, 0);
  const avgPrice = Math.round(
    parkingLots.reduce((acc, lot) => acc + lot.pricePerHour, 0) / parkingLots.length
  );

  const stats = [
    {
      icon: Car,
      label: '総駐車スペース',
      value: totalSpots.toLocaleString(),
      color: 'from-primary to-primary/50',
    },
    {
      icon: MapPin,
      label: '空きスペース',
      value: totalAvailable.toLocaleString(),
      color: 'from-success to-success/50',
    },
    {
      icon: Clock,
      label: '平均料金',
      value: `¥${avgPrice}/h`,
      color: 'from-secondary to-secondary/50',
    },
    {
      icon: TrendingUp,
      label: '空き率',
      value: `${Math.round((totalAvailable / totalSpots) * 100)}%`,
      color: 'from-accent to-accent/50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="bg-surface border border-border rounded-xl p-4 relative overflow-hidden group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
          
          <div className="relative">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
