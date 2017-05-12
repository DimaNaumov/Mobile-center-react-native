export var Storage = (function () {
    var store = {};

	class StorageInner {
        constructor() {
            this.set = this.set.bind(this);
            this.get = this.get.bind(this);
        }

        set(itemName, newVal) {
            store[itemName] = newVal;
            console.log(store);
        }
        
        get(itemName) {
            return store[itemName];
        }
    }
    
    return new StorageInner;
})();