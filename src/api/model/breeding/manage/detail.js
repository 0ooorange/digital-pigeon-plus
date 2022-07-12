import http from '@/utils/request'
/* 养殖明细 */
export const getBreedingDetail = (data) => http.post('/digitalPigeon/breed/breedingdetail/pigeon-cage-state/getBreedingDetail?' + data)
