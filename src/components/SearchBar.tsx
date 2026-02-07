import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useParkingStore } from '../store/parkingStore';
import { useState } from 'react';

export function SearchBar() {
  const { searchQuery, setSearchQuery, filters, setFilters } = useParkingStore();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="駐車場を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-xl border transition-all ${
            showFilters
              ? 'bg-primary border-primary text-white'
              : 'bg-surface border-border text-gray-400 hover:border-primary'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-surface border border-border rounded-xl p-4 space-y-4"
        >
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">タイプ</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ type: e.target.value as any })}
                className="bg-background border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
              >
                <option value="all">すべて</option>
                <option value="regular">普通車</option>
                <option value="compact">軽自動車</option>
                <option value="handicap">車椅子対応</option>
                <option value="ev">EV充電</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="onlyAvailable"
                checked={filters.onlyAvailable}
                onChange={(e) => setFilters({ onlyAvailable: e.target.checked })}
                className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary"
              />
              <label htmlFor="onlyAvailable" className="text-sm text-gray-400">
                空きのみ表示
              </label>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
