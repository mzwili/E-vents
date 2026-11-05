// Application service boundary. Replace this in-memory starter with a module-owned repository.
const services = [
  { id: 'svc_catering_01', name: 'The Gathered Table', category: 'CATERING', startingPriceZar: 420, pricingUnit: 'PER_GUEST' },
  { id: 'svc_decor_01', name: 'The Ceremony Edit', category: 'DECOR', startingPriceZar: 8500, pricingUnit: 'FIXED' },
  { id: 'svc_package_01', name: 'The Golden Hour', category: 'PACKAGE', startingPriceZar: 24900, pricingUnit: 'FIXED' }
]
export async function listServices() { return { data: services } }
