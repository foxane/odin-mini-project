const genericDropdown = function (btnClass, itemClass) {
  const dropdownBtn = document.querySelector(`.${btnClass}`);
  const dropdownItems = document.querySelector(`.${itemClass}`);
  if (
    dropdownBtn instanceof HTMLElement &&
    dropdownItems instanceof HTMLElement
  ) {
    dropdownBtn.addEventListener('click', () => {
      dropdownItems.classList.toggle('hidden');
    });
  }
};

export default genericDropdown;
