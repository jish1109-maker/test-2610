import { DISCOUNT_PRESETS, PRODUCTS } from '../data.js';
import { won } from '../calc.js';

export default function Controls({ product, onProduct, discount, onDiscount }) {
  function handleInput(e) {
    const v = parseFloat(e.target.value);
    if (Number.isNaN(v)) return;
    onDiscount(Math.min(90, Math.max(0, v)));
  }

  return (
    <section className="controls">
      <div className="field">
        <label htmlFor="product">① 상품</label>
        <select id="product" value={product.id} onChange={(e) => onProduct(e.target.value)}>
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.option})
            </option>
          ))}
        </select>
        <p className="facts">
          정가 <b>{won(product.listPrice)}</b> · 원가 <b>{won(product.cost)}</b> · 배송비{' '}
          <b>{won(product.shipping)}</b>
        </p>
      </div>

      <div className="field">
        <span className="label">할인율</span>
        <div className="presets" role="group" aria-label="할인율 고르기">
          {DISCOUNT_PRESETS.map((d) => (
            <button
              key={d}
              type="button"
              className={d === discount ? 'on' : ''}
              aria-pressed={d === discount}
              onClick={() => onDiscount(d)}
            >
              {d}%
            </button>
          ))}
        </div>
        <label className="custom">
          직접 입력
          <input
            type="number"
            inputMode="decimal"
            min="0"
            max="90"
            step="0.1"
            value={discount}
            onChange={handleInput}
          />
          %
        </label>
      </div>
    </section>
  );
}
