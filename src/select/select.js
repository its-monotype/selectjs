const getTemplate = (data = [], placeholder) => {
  let value = placeholder ?? 'Placeholder по умолчанию';

  const items = data.map((item) => {
    return `
      <li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>
    `;
  });

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__value-container">
      <span class="select__value" data-type="value">${value}</span>
      <span class="select__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="208 96 128 176 48 96" fill="none" stroke="#888" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg></span>
    </div>
    <div class="select__input" data-type="input"></div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `;
};

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.#render();
    this.#setup();
  }

  #render() {
    const { data, placeholder, visibleBackdrop } = this.options;
    this.$el.classList.add('select');
    visibleBackdrop && this.$el.classList.add('visible-backdrop');
    this.$el.innerHTML = getTemplate(data, placeholder);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$value = this.$el.querySelector('[data-type="value"]');
    this.selectedId && this.select(this.selectedId);
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.innerHTML = this.current.value;

    this.$el
      .querySelectorAll('[data-type="item"]')
      .forEach((item) => item.classList.remove('selected'));
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

    this.options.onSelect && this.options.onSelect(this.current);

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');
  }

  close() {
    this.$el.classList.remove('open');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = '';
  }
}
