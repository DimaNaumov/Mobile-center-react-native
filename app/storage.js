export let Storage = (function () {
    let store = {
        user: {
                name: '',
                photoUrl: ''    
              }
    };

	class StorageInner {
        constructor() {
            this.set = this.set.bind(this);
            this.get = this.get.bind(this);
        }

        set(itemName, newVal) {
            console.log('Past local store', store);
            store[itemName] = newVal;
            console.log('New local store', store);
        }
        
        get(itemName) {
            return store[itemName];
        }
    }
    
    return new StorageInner;
})();