/**
 * Decorative "channels orbit" animation shown on the right of the hero.
 * Pure CSS animation (no JS); icons are self-hosted under
 * /assets/images/orbit/social. Hidden below 1400px (see page.tsx) since the
 * hero collapses to a single column there.
 */
export default function HeroOrbit() {
  return (
    <div className="orbit" aria-hidden="true">
      <ul className="orbit-wrap">
        <li className="orbit-center">
          <img
            className="orbit-center__icon"
            src="/assets/images/apple-icon.png"
            alt=""
            width={64}
            height={64}
          />
        </li>
        <li>
          <ul className="orbit-ring-1">
            <li><i className="orbit-icon ch-facebook" /></li>
            <li><i className="orbit-icon ch-instagram" /></li>
            <li><i className="orbit-icon ch-whatsapp" /></li>
            <li><i className="orbit-icon ch-messenger" /></li>
            <li><i className="orbit-icon ch-telegram" /></li>
            <li><i className="orbit-icon ch-zalo" /></li>
          </ul>
        </li>
        <li>
          <ul className="orbit-ring-2">
            <li><i className="orbit-icon ch-line" /></li>
            <li><i className="orbit-icon ch-wechat" /></li>
            <li><i className="orbit-icon ch-tiktok" /></li>
          </ul>
        </li>
        <li>
          <ul className="orbit-ring-3">
            <li><i className="orbit-icon ch-website" /></li>
            <li><i className="orbit-icon ch-chotot" /></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
