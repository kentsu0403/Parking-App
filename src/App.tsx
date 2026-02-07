import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Stats } from './components/Stats';
import { ParkingLotList } from './components/ParkingLotList';
import { ParkingSpotGrid } from './components/ParkingSpotGrid';
import { useParkingStore } from './store/parkingStore';

function App() {
  const { selectedLot } = useParkingStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <SearchBar />
        <Stats />
        <ParkingLotList />
      </main>

      <AnimatePresence>
        {selectedLot && <ParkingSpotGrid />}
      </AnimatePresence>
    </div>
  );
}

export default App;
