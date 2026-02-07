export interface ParkingSpot {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'occupied' | 'reserved' | 'disabled';
  type: 'regular' | 'compact' | 'handicap' | 'ev';
  floor: number;
}

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  floors: number;
  spots: ParkingSpot[];
  pricePerHour: number;
  distance: number;
  rating: number;
  amenities: string[];
  image: string;
}

export interface FilterOptions {
  type: 'all' | 'regular' | 'compact' | 'handicap' | 'ev';
  floor: number | 'all';
  onlyAvailable: boolean;
}
