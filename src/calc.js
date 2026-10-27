// 계산은 소수 그대로 하고, 화면에 보일 때만 반올림한다.

export function calcChannel(product, channel, discountPct) {
  const price = product.listPrice * (1 - discountPct / 100);
  const salesFee = price * (channel.salesFee / 100);
  const payFee = price * (channel.payFee / 100);
  const profit = price - salesFee - payFee - product.cost - product.shipping;
  const marginPct = price > 0 ? (profit / price) * 100 : null;
  return {
    price,
    salesFee,
    payFee,
    cost: product.cost,
    shipping: product.shipping,
    profit,
    marginPct,
    breakEvenPct: breakEvenDiscount(product, channel),
  };
}

// 이 할인율보다 크게 할인하면 손해 (%)
export function breakEvenDiscount(product, channel) {
  const keepRate = 1 - (channel.salesFee + channel.payFee) / 100;
  if (keepRate <= 0) return null;
  return (1 - (product.cost + product.shipping) / (product.listPrice * keepRate)) * 100;
}

export function won(n) {
  return `${Math.round(n).toLocaleString('ko-KR')}원`;
}

export function pct(n) {
  return n === null ? '-' : `${n.toFixed(1)}%`;
}
