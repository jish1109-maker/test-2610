// 출처: 05_매출손익_일일보고/채널_수수료표.xlsx, 원가표.xlsx, 행사가_시뮬_조건.txt
// 교육용 가상 데이터입니다.

// 수수료율은 % 단위 (5.5 = 5.5%)
export const CHANNELS = [
  { id: 'naver', name: '네이버', salesFee: 5.5, payFee: 3.7 },
  { id: 'coupang', name: '쿠팡', salesFee: 10.8, payFee: 0 },
  { id: 'gonggu', name: '공구(인플루언서)', salesFee: 20, payFee: 0 },
  { id: 'oliveyoung', name: '올리브영', salesFee: 33, payFee: 0 },
];

// 금액은 원 단위
export const PRODUCTS = [
  { id: 'azh-500', name: 'AZH 리밸런싱 샴푸 500ml', option: '단품', listPrice: 32000, cost: 9800, shipping: 3000 },
  { id: 'azh-set2', name: 'AZH 리밸런싱 샴푸 2입 세트', option: '세트', listPrice: 58000, cost: 19600, shipping: 3000 },
  { id: 'laveni-50', name: '라베니 데일리 선크림 50ml', option: '단품', listPrice: 24000, cost: 6900, shipping: 3000 },
  { id: 'laveni-1plus1', name: '라베니 선크림 1+1', option: '세트', listPrice: 36000, cost: 13800, shipping: 3000 },
  { id: 'boom-pink', name: '붐앤잽 찹찹핑크레이저', option: '단품', listPrice: 19900, cost: 5200, shipping: 3000 },
  { id: 'boom-set', name: '붐앤잽 레이저+리필 세트', option: '세트', listPrice: 29900, cost: 8900, shipping: 3000 },
];

export const DISCOUNT_PRESETS = [10, 15, 20, 25, 30];

export const DEFAULT_PRODUCT_ID = 'azh-set2';
export const DEFAULT_DISCOUNT = 20;
