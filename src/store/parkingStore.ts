import { create } from 'zustand';
import { ParkingLot, ParkingSpot, FilterOptions } from '../types/parking';

interface ParkingState {
  parkingLots: ParkingLot[];
  selectedLot: ParkingLot | null;
  selectedSpot: ParkingSpot | null;
  filters: FilterOptions;
  searchQuery: string;
  setSelectedLot: (lot: ParkingLot | null) => void;
  setSelectedSpot: (spot: ParkingSpot | null) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setSearchQuery: (query: string) => void;
  toggleSpotStatus: (lotId: string, spotId: string) => void;
  reserveSpot: (lotId: string, spotId: string) => void;
}

const generateSpots = (floors: number, spotsPerFloor: number, occupancyRate: number = 0.4): ParkingSpot[] => {
  const spots: ParkingSpot[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  for (let floor = 1; floor <= floors; floor++) {
    for (let row = 0; row < rows.length; row++) {
      for (let num = 1; num <= Math.ceil(spotsPerFloor / rows.length); num++) {
        const random = Math.random();
        let status: ParkingSpot['status'] = 'available';
        if (random > (1 - occupancyRate)) status = 'occupied';
        else if (random > (1 - occupancyRate - 0.1)) status = 'reserved';
        
        let type: ParkingSpot['type'] = 'regular';
        if (row === 0 && num <= 2) type = 'handicap';
        else if (row === rows.length - 1 && num <= 2) type = 'ev';
        else if (Math.random() > 0.8) type = 'compact';
        
        spots.push({
          id: `${floor}-${rows[row]}-${num}`,
          row: rows[row],
          number: num,
          status,
          type,
          floor,
        });
      }
    }
  }
  return spots;
};

const calculateAvailableSpots = (spots: ParkingSpot[]): number => {
  return spots.filter(spot => spot.status === 'available').length;
};

const createParkingLot = (
  id: string,
  name: string,
  address: string,
  totalSpots: number,
  floors: number,
  occupancyRate: number,
  amenities: string[],
  image: string
): ParkingLot => {
  const spots = generateSpots(floors, Math.ceil(totalSpots / floors), occupancyRate);
  return {
    id,
    name,
    address,
    totalSpots,
    availableSpots: calculateAvailableSpots(spots),
    floors,
    spots,
    pricePerHour: 0,
    distance: 0,
    rating: 4.5,
    amenities,
    image,
  };
};

const initialParkingLots: ParkingLot[] = [
  createParkingLot(
    '1',
    '法文学部駐車場',
    '琉球大学 法文学部棟前',
    120,
    1,
    0.65,
    ['車椅子対応', '屋外駐車場'],
    'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  createParkingLot(
    '2',
    '教育学部駐車場',
    '琉球大学 教育学部棟横',
    100,
    1,
    0.55,
    ['車椅子対応', '屋外駐車場'],
    'https://images.pexels.com/photos/1004410/pexels-photo-1004410.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  createParkingLot(
    '3',
    '理学部駐車場',
    '琉球大学 理学部棟北側',
    80,
    1,
    0.70,
    ['車椅子対応', '屋外駐車場', 'EV充電'],
    'https://images.pexels.com/photos/1004413/pexels-photo-1004413.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  createParkingLot(
    '4',
    '工学部駐車場',
    '琉球大学 工学部1号館前',
    150,
    1,
    0.45,
    ['車椅子対応', '屋外駐車場', 'EV充電', '24時間利用可'],
    'https://images.pexels.com/photos/1004414/pexels-photo-1004414.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  createParkingLot(
    '5',
    '農学部駐車場',
    '琉球大学 農学部棟西側',
    90,
    1,
    0.50,
    ['車椅子対応', '屋外駐車場'],
    'https://images.pexels.com/photos/1486785/pexels-photo-1486785.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  createParkingLot(
    '6',
    '医学部駐車場',
    '琉球大学 医学部附属病院横',
    200,
    2,
    0.75,
    ['車椅子対応', '立体駐車場', 'EV充電', '24時間利用可'],
    'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  createParkingLot(
    '7',
    '共通教育棟駐車場',
    '琉球大学 共通教育棟南側',
    180,
    1,
    0.60,
    ['車椅子対応', '屋外駐車場', '大型車可'],
    'https://images.pexels.com/photos/1004416/pexels-photo-1004416.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  createParkingLot(
    '8',
    '附属図書館駐車場',
    '琉球大学 附属図書館前',
    60,
    1,
    0.80,
    ['車椅子対応', '屋外駐車場'],
    'https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-159862.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  createParkingLot(
    '9',
    '大学会館駐車場',
    '琉球大学 大学会館横',
    70,
    1,
    0.55,
    ['車椅子対応', '屋外駐車場', '来客用'],
    'https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  createParkingLot(
    '10',
    '国際地域創造学部駐車場',
    '琉球大学 国際地域創造学部棟前',
    85,
    1,
    0.40,
    ['車椅子対応', '屋外駐車場', 'EV充電'],
    'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
];

export const useParkingStore = create<ParkingState>((set) => ({
  parkingLots: initialParkingLots,
  selectedLot: null,
  selectedSpot: null,
  filters: {
    type: 'all',
    floor: 'all',
    onlyAvailable: false,
  },
  searchQuery: '',
  setSelectedLot: (lot) => set({ selectedLot: lot, selectedSpot: null }),
  setSelectedSpot: (spot) => set({ selectedSpot: spot }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleSpotStatus: (lotId, spotId) =>
    set((state) => ({
      parkingLots: state.parkingLots.map((lot) =>
        lot.id === lotId
          ? {
              ...lot,
              spots: lot.spots.map((spot) =>
                spot.id === spotId
                  ? {
                      ...spot,
                      status: spot.status === 'available' ? 'occupied' : 'available',
                    }
                  : spot
              ),
              availableSpots:
                lot.availableSpots +
                (lot.spots.find((s) => s.id === spotId)?.status === 'available' ? -1 : 1),
            }
          : lot
      ),
      selectedLot: state.selectedLot?.id === lotId
        ? {
            ...state.selectedLot,
            spots: state.selectedLot.spots.map((spot) =>
              spot.id === spotId
                ? {
                    ...spot,
                    status: spot.status === 'available' ? 'occupied' : 'available',
                  }
                : spot
            ),
          }
        : state.selectedLot,
    })),
  reserveSpot: (lotId, spotId) =>
    set((state) => ({
      parkingLots: state.parkingLots.map((lot) =>
        lot.id === lotId
          ? {
              ...lot,
              spots: lot.spots.map((spot) =>
                spot.id === spotId && spot.status === 'available'
                  ? { ...spot, status: 'reserved' }
                  : spot
              ),
              availableSpots: lot.availableSpots - 1,
            }
          : lot
      ),
      selectedLot: state.selectedLot?.id === lotId
        ? {
            ...state.selectedLot,
            spots: state.selectedLot.spots.map((spot) =>
              spot.id === spotId && spot.status === 'available'
                ? { ...spot, status: 'reserved' }
                : spot
            ),
            availableSpots: state.selectedLot.availableSpots - 1,
          }
        : state.selectedLot,
      selectedSpot: null,
    })),
}));
