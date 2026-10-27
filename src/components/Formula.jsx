import { pct, won } from '../calc.js';

const n = (v) => Math.round(v).toLocaleString('ko-KR');

export default function Formula({ product, discount, results }) {
  const price = product.listPrice * (1 - discount / 100);

  return (
    <section className="formula">
      <h2>④ 계산식</h2>
      <ul className="rules">
        <li>행사가 = 정가 × (1 − 할인율)</li>
        <li>남는 돈 = 행사가 − 판매수수료 − 결제수수료 − 원가 − 배송비</li>
        <li>수수료 = 행사가 × 수수료율 · 마진율 = 남는 돈 ÷ 행사가</li>
        <li>손해 선(할인율) = 1 − (원가 + 배송비) ÷ (정가 × (1 − 판매수수료율 − 결제수수료율))</li>
      </ul>

      <p className="calc">
        행사가 = {n(product.listPrice)} × (1 − {discount / 100}) = <b>{won(price)}</b>
      </p>
      {results.map(({ channel, result }) => (
        <p key={channel.id} className={`calc${result.profit < 0 ? ' neg' : ''}`}>
          <span className="who">{channel.name}</span>
          {n(result.price)} − {n(result.salesFee)} − {n(result.payFee)} − {n(result.cost)} −{' '}
          {n(result.shipping)} = <b>{won(result.profit)}</b> (마진율 {pct(result.marginPct)})
        </p>
      ))}
      <p className="hint">계산은 소수까지 그대로 하고, 화면에는 원 단위로 반올림해 보여 줍니다.</p>
    </section>
  );
}
