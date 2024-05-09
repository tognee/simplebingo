function setupDialogs() {
  document.querySelectorAll('[data-dialog]').forEach(dialogButton => {
    dialogButton.addEventListener('click', () => {
      const dialog = document.querySelector(dialogButton.dataset.dialog);
      dialog.showModal();
    });
  });

  document.querySelectorAll('[data-close-dialog]').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      const dialog = closeButton.closest('dialog');
      dialog.close();
    });
  })

  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click',  (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    })
  })
}

export {
  setupDialogs
}