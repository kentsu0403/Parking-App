import { motion } from 'framer-motion';
import { Car, Zap, Accessibility, X } from 'lucide-react';
import { useParkingStore } from '../store/parkingStore';
import { ParkingSpot } from '../types/parking';
import { useState } from 'react';

export function ParkingSpotGrid() {
  const { selectedLot, setSelectedLot, filters, setFilters, selectedSpot, setSelectedSpot, reserveSpot } = useParkingStore();
  const [currentFloor, setCurrentFloor] = useState(1);

  if (!selectedLot) return null;

  const filteredSpots = selectedLot.spots.filter((spot) => {
    if (spot.floor !== currentFloor) return false;
    if (filters.type !== 'all' && spot.type !== filters.type) return false;
    if (filters.onlyAvailable && spot.status !== 'available') return false;
    return true;
  });

  const groupedSpots = filteredSpots.reduce((acc, spot) => {
    if (!acc[spot.row]) acc[spot.row] = [];
    acc[spot.row].push(spot);
    return acc;
  }, {} as Record<string, ParkingSpot[]>);

  const getSpotColor = (spot: ParkingSpot) => {
    if (spot.status === 'occupied') return 'bg-error/30 border-error/50';
    if (spot.status === 'reserved') return 'bg-warning/30 border-warning/50';
    if (spot.status === 'available') {
      if (spot.type === 'ev') return 'bg-success/30 border-success/50 hover:bg-success/50';
      if (spot.type === 'handicap') return 'bg-secondary/30 border-secondary/50 hover:bg-secondary/50';
      return 'bg-primary/30 border-primary/50 hover:bg-primary/50';
    }
    return 'bg-gray-500/30 border-gray-500/50';
  };

  const getSpotIcon = (spot: ParkingSpot) => {
    if (spot.type === 'ev') return <Zap className="w-4 h-4" />;
    if (spot.type === 'handicap') return <Accessibility className="w-4 h-4" />;
    return <Car className="w-4 h-4" />;
  };

  const handleReserve = () => {
    if (selectedSpot && selectedLot) {
      reserveSpot(selectedLot.id, selectedSpot.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto"
    >
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{selectedLot.name}</h2>
            <p className="text-gray-400">{selectedLot.address}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedLot(null)}
            className="p-2 bg-surface border border-border rounded-xl hover:border-error transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between bg-surface border border-border rounded-xl p-4">
          <div className="flex gap-2">
            {Array.from({ length: selectedLot.floors }, (_, i) => i + 1).map((floor) => (
              <motion.button
                key={floor}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentFloor(floor)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentFloor === floor
                    ? 'bg-primary text-white'
                    : 'bg-background text-gray-400 hover:text-white'
                }`}
              >
                {floor}F
              </motion.button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/30 border border-primary/50" />
              <span className="text-gray-400">空き</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-error/30 border border-error/50" />
              <span className="text-gray-400">使用中</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning/30 border border-warning/50" />
              <span className="text-gray-400">予約済み</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-success" />
              <span className="text-gray-400">EV充電</span>
            </div>
            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-secondary" />
              <span className="text-gray-400">車椅子対応</span>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
          <div className="text-center text-gray-400 text-sm border-b border-border pb-4">
            ← 入口 / 出口 →
          </div>

          {Object.entries(groupedSpots).map(([row, spots]) => (
            <div key={row} className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="w-8 text-center font-bold text-primary">{row}</span>
                <div className="flex-1 flex flex-wrap gap-2">
                  {spots.map((spot) => (
                    <motion.button
                      key={spot.id}
                      whileHover={{ scale: spot.status === 'available' ? 1.1 : 1 }}
                      whileTap={{ scale: spot.status === 'available' ? 0.95 : 1 }}
                      onClick={() => spot.status === 'available' && setSelectedSpot(spot)}
                      disabled={spot.status !== 'available'}
                      className={`w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${getSpotColor(spot)} ${
                        selectedSpot?.id === spot.id ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''
                      } ${spot.status !== 'available' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                    >
                      {getSpotIcon(spot)}
                      <span className="text-xs mt-0.5">{spot.number}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {Object.keys(groupedSpots).length === 0 && (
            <div className="text-center py-12 text-gray-400">
              この条件に合う駐車スペースがありません
            </div>
          )}
        </div>

        {selectedSpot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">
                  {selectedSpot.row}-{selectedSpot.number} を選択中
                </p>
                <p className="text-gray-400 text-sm">
                  {selectedSpot.type === 'ev' && 'EV充電対応 • '}
                  {selectedSpot.type === 'handicap' && '車椅子対応 • '}
                  {selectedSpot.type === 'compact' && '軽自動車専用 • '}
                  {currentFloor}階
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSpot(null)}
                  className="px-6 py-3 bg-background border border-border rounded-xl hover:border-gray-500 transition-colors"
                >
                  キャンセル
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReserve}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg shadow-primary/30"
                >
                  予約する
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
