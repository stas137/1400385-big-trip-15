export default class Store {
  constructor(storeKey, storage, storeKeyDestinations, storageDestinations, storeKeyOffers, storageOffers) {
    this._storeKey = storeKey;
    this._storage = storage;

    this._storeKeyDestinations = storeKeyDestinations;
    this._storageDestinations = storageDestinations;

    this._storeKeyOffers = storeKeyOffers;
    this._storageOffers = storageOffers;
  }

  getDestinations() {
    try {
      return JSON.parse(this._storageDestinations.getItem(this._storeKeyDestinations) || {});
    } catch (err) {
      return {};
    }
  }

  setDestinations(items) {
    this._storageDestinations.setItem(
      this._storeKeyDestinations,
      JSON.stringify(items),
    );
  }

  getOffers() {
    try {
      return JSON.parse(this._storageOffers.getItem(this._storeKeyOffers) || {});
    } catch (err) {
      return {};
    }
  }

  setOffers(items) {
    this._storageOffers.setItem(
      this._storeKeyOffers,
      JSON.stringify(items),
    );
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey) || {});
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
      this._storeKey,
      JSON.stringify(items),
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(Object.assign(
        {},
        store,
        {
          [key]: value,
        },
      )),
    );
  }

  removeItem(key) {
    const store = this._storage.getItems();

    delete store[key];

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(store),
    );
  }
}
