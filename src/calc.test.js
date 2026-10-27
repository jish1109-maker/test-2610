import { describe, expect, it } from 'vitest';
import { CHANNELS, PRODUCTS } from './data.js';
import { calcChannel } from './calc.js';

const set2 = PRODUCTS.find((p) => p.id === 'azh-set2');
const ch = (id) => CHANNELS.find((c) => c.id === id);

describe('샴푸 2입 세트 · 20% 손계산 대조', () => {
  it('네이버: 46,400 − 2,552 − 1,716.8 − 19,600 − 3,000 = 19,531.2', () => {
    const r = calcChannel(set2, ch('naver'), 20);
    expect(r.price).toBeCloseTo(46400, 6);
    expect(r.salesFee).toBeCloseTo(2552, 6);
    expect(r.payFee).toBeCloseTo(1716.8, 6);
    expect(r.profit).toBeCloseTo(19531.2, 6);
    expect(Math.round(r.profit)).toBe(19531);
    expect(r.marginPct.toFixed(1)).toBe('42.1');
  });

  it.each([
    ['coupang', 18789, '40.5'],
    ['gonggu', 14520, '31.3'],
    ['oliveyoung', 8488, '18.3'],
  ])('%s', (id, profit, margin) => {
    const r = calcChannel(set2, ch(id), 20);
    expect(Math.round(r.profit)).toBe(profit);
    expect(r.marginPct.toFixed(1)).toBe(margin);
  });
});

describe('손익분기 할인율', () => {
  it.each([
    ['naver', '57.1'],
    ['coupang', '56.3'],
    ['gonggu', '51.3'],
    ['oliveyoung', '41.8'],
  ])('%s', (id, expected) => {
    expect(calcChannel(set2, ch(id), 0).breakEvenPct.toFixed(1)).toBe(expected);
  });

  it('올리브영 45%는 손해', () => {
    expect(calcChannel(set2, ch('oliveyoung'), 45).profit).toBeLessThan(0);
  });
});
