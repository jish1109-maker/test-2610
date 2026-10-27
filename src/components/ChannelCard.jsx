import { pct, won } from '../calc.js';

const BAR_MAX = 90; // 막대는 할인율 0~90%

export default function ChannelCard({ channel, result, discount }) {
  const loss = result.profit < 0;
  const be = result.breakEvenPct;
  const pos = (v) => `${(Math.min(BAR_MAX, Math.max(0, v)) / BAR_MAX) * 100}%`;

  let beText;
  if (be === null || be <= 0) beText = '할인하지 않아도 손해';
  else beText = `할인율 ${pct(be)} 넘으면 손해`;

  return (
    <article className={`card${loss ? ' loss' : ''}`}>
      <h2>{channel.name}</h2>

      <dl className="rows">
        <div>
          <dt>행사가</dt>
          <dd>{won(result.price)}</dd>
        </div>
        <div>
          <dt>판매수수료 ({channel.salesFee}%)</dt>
          <dd>− {won(result.salesFee)}</dd>
        </div>
        <div>
          <dt>결제수수료 ({channel.payFee}%)</dt>
          <dd>− {won(result.payFee)}</dd>
        </div>
        <div>
          <dt>원가</dt>
          <dd>− {won(result.cost)}</dd>
        </div>
        <div>
          <dt>배송비</dt>
          <dd>− {won(result.shipping)}</dd>
        </div>
      </dl>

      <div className="profit">
        <span>한 개당 남는 돈</span>
        <strong>{won(result.profit)}</strong>
        {loss && <em className="badge">손해</em>}
      </div>
      <p className="margin">마진율 {pct(result.marginPct)}</p>

      <div className="breakeven">
        <p>{beText}</p>
        <div className="bar" aria-hidden="true">
          {be !== null && be > 0 && <div className="zone" style={{ left: pos(be) }} />}
          {be !== null && be > 0 && be < BAR_MAX && <div className="line" style={{ left: pos(be) }} />}
          <div className="now" style={{ left: pos(discount) }} />
        </div>
        <div className="scale" aria-hidden="true">
          <span>0%</span>
          <span>지금 {pct(discount)}</span>
          <span>{BAR_MAX}%</span>
        </div>
      </div>
    </article>
  );
}
