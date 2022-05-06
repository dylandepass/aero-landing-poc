
import { isPlatformSupported, isDesktop, createCTAButton, fetchPlaceholders, getUrlParams, createOptimizedPicture } from '../../scripts/scripts.js';

/**
 * decorates the experience block
 * @param {Element} block The experience block element
 */
export default async function decorate(block) {
  const params = getUrlParams();
  const placeholders = await fetchPlaceholders();

  const title = block.querySelector('#experience-title');
  document.title = title.textContent = params.title ?? 'Untitled';

  title.parentNode.classList.add('experience-title-container');

  const createdBy = block.querySelector('#created-by');
  createdBy.textContent = `${placeholders['created-by']}: ${params.user ?? 'Unknown'}`;

  const previewImage = createOptimizedPicture(params.preview, 'experience preview', true, ['experience-preview']);
  document.body.querySelector('main').prepend(previewImage);

  const aeroIcon = createOptimizedPicture('/media_1cde345258ec2322aa4689fa9d44fa0fe0f0f646c.png', 'aero icon', false, 'aero-icon');

  if (isPlatformSupported()) {
    block.insertBefore(aeroIcon, block.firstChild);

    const launchCTAContainer = document.createElement('div');
    launchCTAContainer.classList.add('launch-cta');

    const launchCTALabel = document.createElement('div');
    launchCTALabel.textContent = placeholders['already-have-aero'];
    launchCTAContainer.append(launchCTALabel);

    const launchButton = createCTAButton(placeholders['open-in-aero'], false, true);
    launchCTAContainer.append(launchButton);

    block.append(launchCTAContainer);
  } else {
    if (isDesktop()) {
      const unsupportedNoticeContainer = document.createElement('div');
      unsupportedNoticeContainer.classList.add('unsupported-notice');
      unsupportedNoticeContainer.textContent = placeholders['unsupported-notice'];

      const learnCTA = createCTAButton(placeholders['learn-more'], true, true);
      unsupportedNoticeContainer.append(learnCTA);

      block.prepend(unsupportedNoticeContainer);

      const qrCode = document.createElement('div');
      qrCode.classList.add('qr-code-container');

      const qrCodeImg = createOptimizedPicture(`/${params.qr}`, 'qr code', false, 'aero-icon');

      const qrLabel = document.createElement('div');
      qrLabel.classList.add('qr-label');
      qrLabel.textContent = placeholders['scan-to-view'];

      qrCode.appendChild(qrCodeImg);
      qrCode.appendChild(qrLabel);
      createdBy.after(qrCode);

      block.appendChild(aeroIcon);
    }
  }

}
