import { Select } from './select';

let _;

beforeEach(() => {
  document.body.innerHTML = `
      <div id="select"></div>
  `;
  _ = new Select('#select', {
    data: [{ id: '1', value: 'Test' }],
  });
});

describe('Select: open', () => {
  test('should be defined as function', () => {
    expect(_.open).toBeDefined();
    expect(typeof _.open).toBe('function');
  });

  test('should return undefined', () => {
    expect(_.open()).toBeUndefined();
  });

  test('should add class "open" to $el class list', () => {
    _.open();
    expect(_.$el.classList).toContain('open');
  });
});

describe('Select: close', () => {
  test('should be defined as function', () => {
    expect(_.close).toBeDefined();
    expect(typeof _.close).toBe('function');
  });

  test('should return undefined', () => {
    expect(_.close()).toBeUndefined();
  });

  test('should remove class "open" from $el class list', () => {
    _.close();
    expect(_.$el.classList).not.toContain('open');
  });
});

describe('Select: destroy', () => {
  test('should be defined as function', () => {
    expect(_.destroy).toBeDefined();
    expect(typeof _.destroy).toBe('function');
  });

  test('should return undefined', () => {
    expect(_.close()).toBeUndefined();
  });

  test('should remove $el innerHTML', () => {
    _.destroy();
    expect(_.$el.innerHTML === '').toBe(true);
  });
});

describe('Select: toggle', () => {
  test('should be defined as function', () => {
    expect(_.toggle).toBeDefined();
    expect(typeof _.toggle).toBe('function');
  });

  test('should return undefined', () => {
    expect(_.toggle()).toBeUndefined();
  });

  test('should call close if isOpen and open if isClose', () => {
    const openSpy = jest.spyOn(Select.prototype, 'open');
    const closeSpy = jest.spyOn(Select.prototype, 'close');
    _.toggle();
    if (_.isOpen) {
      expect(openSpy).toHaveBeenCalled();
    } else {
      expect(closeSpy).toHaveBeenCalled();
    }
  });
});

describe('Select: select', () => {
  test('should be defined as function', () => {
    expect(_.select).toBeDefined();
    expect(typeof _.select).toBe('function');
  });

  test('should return undefined', () => {
    expect(_.select(_.options.data[0].id)).toBeUndefined();
  });

  test('should call close', () => {
    const id = _.options.data[0].id;
    const closeSpy = jest.spyOn(Select.prototype, 'close');
    _.select(id);
    expect(closeSpy).toHaveBeenCalled();
  });

  test('should set to selectedId, id witch we passed from params', () => {
    const id = _.options.data[0].id;
    _.select(id);
    expect(_.selectedId).toBe(id);
  });

  test('should set to $value innerHTML value of item with id witch we passed to params', () => {
    const { id, value } = _.options.data[0];
    _.select(id);
    expect(_.$value.innerHTML).toBe(value);
  });
});
