
import { isPlatformSupported, isDesktop, createCTAButton, fetchPlaceholders } from '../../scripts/scripts.js';

/**
 * decorates the experience block
 * @param {Element} block The experience block element
 */
export default async function decorate(block) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const placeholders = await fetchPlaceholders();

  const title = block.querySelector('#experience-title');
  document.title = title.innerHTML = params.title ?? 'Untitled';

  title.parentNode.classList.add('experience-title-container');

  const createdBy = block.querySelector('#created-by');
  createdBy.innerHTML = `${placeholders['created-by']}: ${params.user ?? 'Unknown'}`;

  const aeroIcon = document.createElement('img');
  aeroIcon.classList.add('aero-icon');
  aeroIcon.src = '/media_1cde345258ec2322aa4689fa9d44fa0fe0f0f646c.png';

  if (isPlatformSupported()) {
    block.insertBefore(aeroIcon, block.firstChild);

    const launchCTAContainer = document.createElement('div');
    launchCTAContainer.classList.add('launch-cta');

    const launchCTALabel = document.createElement('div');
    launchCTALabel.innerHTML = placeholders['already-have-aero'];
    launchCTAContainer.append(launchCTALabel);

    const launchButton = createCTAButton(placeholders['open-in-aero'], false, true);
    launchCTAContainer.append(launchButton);

    block.append(launchCTAContainer);
  } else {
    if (isDesktop()) {
      const unsupportedNoticeContainer = document.createElement('div');
      unsupportedNoticeContainer.classList.add('unsupported-notice');
      unsupportedNoticeContainer.innerHTML = placeholders['unsupported-notice'];

      const learnCTA = createCTAButton(placeholders['learn-more'], true, false);
      unsupportedNoticeContainer.append(learnCTA);

      block.prepend(unsupportedNoticeContainer);

      const qrCode = document.createElement('div');
      qrCode.classList.add('qr-code-container');

      const qrCodeImg = document.createElement('img');
      qrCodeImg.src = `/${params.qr}`;

      const qrLabel = document.createElement('div');
      qrLabel.classList.add('qr-label');
      qrLabel.innerHTML = placeholders['scan-to-view'];

      qrCode.appendChild(qrCodeImg);
      qrCode.appendChild(qrLabel);
      createdBy.after(qrCode);

      block.appendChild(aeroIcon);
    }
  }

}
