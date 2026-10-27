import { useState } from 'react';
import { CHANNELS, DEFAULT_DISCOUNT, DEFAULT_PRODUCT_ID, PRODUCTS } from './data.js';
import { calcChannel } from './calc.js';
import Controls from './components/Controls.jsx';
import ChannelCard from './components/ChannelCard.jsx';
import Formula from './components/Formula.jsx';

export default function App() {
  const [productId, setProductId] = useState(DEFAULT_PRODUCT_ID);
  const [discount, setDiscount] = useState(DEFAULT_DISCOUNT);

  const product = PRODUCTS.find((p) => p.id === productId);
  const results = CHANNELS.map((channel) => ({
    channel,
    result: calcChannel(product, channel, discount),
  }));

  return (
    <main className="page">
      <header>
        <h1>행사가 · 손익 시뮬레이터</h1>
        <p className="sub">채널별로 한 개 팔면 얼마 남는지 봅니다. 교육용 가상 데이터입니다.</p>
      </header>

      <Controls
        product={product}
        onProduct={setProductId}
        discount={discount}
        onDiscount={setDiscount}
      />

      <section className="cards" aria-label="채널별 결과">
        {results.map(({ channel, result }) => (
          <ChannelCard key={channel.id} channel={channel} result={result} discount={discount} />
        ))}
      </section>

      <Formula product={product} discount={discount} results={results} />

      <section className="notes">
        <h2>[확인 필요]</h2>
        <ul>
          <li>배송비 3,000원을 네 채널 모두에서 뺍니다(올리브영 · 공구 포함). [확인 필요]</li>
          <li>금액은 부가세를 따로 빼지 않습니다. [확인 필요]</li>
          <li>수수료는 정가가 아니라 행사가에 매깁니다. [확인 필요]</li>
        </ul>
      </section>
    </main>
  );
}
