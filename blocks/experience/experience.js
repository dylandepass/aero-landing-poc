
import { isPlatformSupported, isDesktop } from '../../scripts/scripts.js';

/**
 * decorates the experience block
 * @param {Element} block The experience block element
 */
export default async function decorate(block) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const title = block.querySelector('#experience-title');
  title.innerHTML = params.title ?? 'Untitled';

  title.parentNode.classList.add('experience-title-container');

  const createdBy = block.querySelector('#created-by');
  createdBy.innerHTML = `Created by: ${params.user ?? 'Unknown'}`;

  const aeroIcon = document.createElement('img');
  aeroIcon.classList.add('aero-icon');
  aeroIcon.src = '/media_1cde345258ec2322aa4689fa9d44fa0fe0f0f646c.png';

  if (isPlatformSupported()) {
    console.log('Platform is supported');
    block.insertBefore(aeroIcon, block.firstChild);

    const launchCTAContainer = document.createElement('div');
    launchCTAContainer.classList.add('launch-cta');

    const launchCTALabel = document.createElement('div');
    launchCTALabel.innerHTML = 'Already have Adobe Aero?';
    launchCTAContainer.append(launchCTALabel);

    const launchCTA = document.createElement('button');
    launchCTA.classList.add('cta-button');
    launchCTA.classList.add('quiet');
    launchCTA.innerHTML = 'Open in Adobe Aero';
    launchCTAContainer.append(launchCTA);

    block.append(launchCTAContainer);
  } else {
    if (isDesktop()) {
      const unsupportedNoticeContainer = document.createElement('div');
      unsupportedNoticeContainer.classList.add('unsupported-notice');
      unsupportedNoticeContainer.innerHTML = 'This augmented reality experience requires an iPhone, iPad, or supported Android device.';

      const learnCTA = document.createElement('button');
      learnCTA.classList.add('cta-button');
      learnCTA.classList.add('large');
      learnCTA.innerHTML = 'Learn More';
      unsupportedNoticeContainer.append(learnCTA);

      block.prepend(unsupportedNoticeContainer);

      const qrCode = document.createElement('div');
      qrCode.classList.add('qr-code-container');

      const qrCodeImg = document.createElement('img');
      qrCodeImg.src = `/${params.qr}`;

      const qrLabel = document.createElement('div');
      qrLabel.classList.add('qr-label');
      qrLabel.innerHTML = 'Scan to view';

      qrCode.appendChild(qrCodeImg);
      qrCode.appendChild(qrLabel);
      createdBy.after(qrCode);

      block.appendChild(aeroIcon);
    }
  }

}
