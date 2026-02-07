import { useParkingStore } from '../store/parkingStore';
import { ParkingLotCard } from './ParkingLotCard';
import { motion } from 'framer-motion';
import { Building, GraduationCap } from 'lucide-react';

export function ParkingLotList() {
  const { parkingLots, searchQuery, setSelectedLot } = useParkingStore();

  const filteredLots = parkingLots.filter((lot) =>
    lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lot.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 学部別にグループ化
  const facultyLots = filteredLots.filter(lot => 
    lot.name.includes('学部') || lot.name.includes('医学')
  );
  const facilityLots = filteredLots.filter(lot => 
    !lot.name.includes('学部') && !lot.name.includes('医学')
  );

  return (
    <div className="space-y-8">
      {/* 学部駐車場 */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">学部別駐車場</h2>
            <p className="text-sm text-gray-400">{facultyLots.length}箇所</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facultyLots.map((lot, index) => (
            <ParkingLotCard
              key={lot.id}
              lot={lot}
              index={index}
              onClick={() => setSelectedLot(lot)}
            />
          ))}
        </div>
      </div>

      {/* 施設駐車場 */}
      {facilityLots.length > 0 && (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">施設駐車場</h2>
              <p className="text-sm text-gray-400">{facilityLots.length}箇所</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilityLots.map((lot, index) => (
              <ParkingLotCard
                key={lot.id}
                lot={lot}
                index={index + facultyLots.length}
                onClick={() => setSelectedLot(lot)}
              />
            ))}
          </div>
        </div>
      )}

      {filteredLots.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400">駐車場が見つかりませんでした</p>
        </motion.div>
      )}
    </div>
  );
}
