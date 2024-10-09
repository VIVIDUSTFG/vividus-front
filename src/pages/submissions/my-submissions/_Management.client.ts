import { Modal } from 'flowbite';

document.body.addEventListener('htmx:afterSwap', function (event) {
  if (event.target.id === 'view-modal') {
    const $targetEl = document.getElementById('submission-modal');

    if ($targetEl) {
      const modal = new Modal($targetEl);
      modal.show();

      document.querySelectorAll('.modal-close-button').forEach((button) => {
        button.addEventListener('click', function () {
          modal.hide();
          document.getElementById('view-modal').innerHTML = '';
        });
      });
    }
  }
});

document.body.addEventListener('htmx:responseError', function (event) {
  const targetElement = document.querySelector('#view-modal');

  htmx.ajax('GET', `/submissions/my-submissions/api/error-modal?status-text=${event.detail.xhr.statusText}`, {
    target: targetElement,
    swap: 'innerHTML',
  });

  targetElement?.addEventListener(
    'htmx:afterSwap',
    function () {
      const $targetEl = document.getElementById('submission-modal');
      const modal = new Modal($targetEl);
      modal.show();

      document.querySelectorAll('.modal-close-button').forEach((button) => {
        button.addEventListener('click', function () {
          modal.hide();
          document.getElementById('view-modal').innerHTML = '';
        });
      });
    },
    { once: true }
  );
});
