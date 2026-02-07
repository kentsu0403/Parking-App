import { motion } from 'framer-motion';
import { Car, MapPin, Sparkles, GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-r from-background via-surface to-background border-b border-border"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/2 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/30">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1"
              >
                <Car className="w-4 h-4 text-primary" />
              </motion.div>
            </motion.div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-primary to-secondary bg-clip-text text-transparent">
                琉大パーキング
              </h1>
              <p className="text-sm text-gray-400">琉球大学 駐車場空き検索システム</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-sm">沖縄県中頭郡西原町</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
