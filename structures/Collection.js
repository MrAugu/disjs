class Collection extends Map {
    filter (fn) {
      const output = new Collection();
  
      this.forEach((element, selector) => {
        if (fn(element) === true) output.set(selector, element);
      });
  
      return output;
    }
  
    clone () {
      return this;
    }
  
    first (count = 1) {
      if (isNaN(count) || count < 1) count = 1;
      var index = 0;
      var output = [];
  
      this.forEach(element => {
        if (index < count) {
          output.push(element);
        }
        index++;
      });
  
      if (count < 2) return output[0];
      return output;
    }
  
    firstKey (count = 1) {
      if (isNaN(count) || count < 1) count = 1;
      var index = 0;
      var output = [];
  
      this.forEach((element, key) => {
        if (index < count) {
          output.push(key);
        }
        index++;
      });
  
      if (count < 2) return output[0];
      return output;
    }
  
    array () {
      var array = [];
  
      this.forEach(element => array.push(element));
  
      return array;
    }
  
    last (count = 1) {
      if (isNaN(count) || count < 1) count = 1;
      if (count > this.size) count = this.size;
      var index = count;
      var output = [];
      const array = this.array();
  
      for (var i = count; i > 0; i--) {
        output.push(array[array.length - i]);
      }
  
      if (count < 2) return output[0];
      return output;
    }
  
    lastKey (count = 1) {
      if (isNaN(count) || count < 1) count = 1;
      if (count > this.size) count = this.size;
      var index = count;
      var output = [];
      const array = this.keyArray();
  
      for (var i = count; i > 0; i--) {
        output.push(array[array.length - i]);
      }
  
      if (count < 2) return output[0];
      return output;
    }
  
    deleteAll () {
      this.forEach((element, selector) => {
        this.delete(selector);
      });
  
      return true;
    }
  
    every (fn) {
      var output = true;
  
      this.forEach(element => {
        if (output === true && fn(element)) {
          output = true;
        } else if (output === true) {
          output = false;
        }
      });
  
      return output;
    }
  
    equals (collection) {
      if (this.size  !== collection.size) return false;
      var output = true;
  
      var thisCollection = [];
      var otherCollection = [];
  
      this.forEach((element, selector) => thisCollection.push([selector, element]));
      collection.forEach((element, selector) => otherCollection.push([selector, element]));
  
      return JSON.stringify(thisCollection) == JSON.stringify(otherCollection);
    }
  
    keyArray () {
      var array = [];
  
      this.forEach((element, key) => array.push(key));
  
      return array;
    }
  
    map (fn) {
      var array = [];
  
      this.forEach(element => array.push(fn(element)));
  
      return array;
    }
  
    partition (fn) {
      var passed = new Collection();
      var failed = new Collection();
  
      this.forEach((element, selector) => {
        if (fn(element)) {
          passed.set(selector, element);
        } else {
          failed.set(selector, element);
        }
      });
  
      return [passed, failed];
    }
  
    random (count = 1) {
      if (isNaN(count) || count < 1) count = 1;
  
      var array = [];
      var collectionArray = this.array();
  
      for (var i = 0; i < count; i++) {
          array.push(collectionArray[Math.floor(Math.random() * collectionArray.length)]);
      }
  
      if (count < 2) return array[0];
      return array;
    }
  
    randomKey (count = 1) {
      if (isNaN(count) || count < 1) count = 1;
  
      var array = [];
      var collectionArray = this.keyArray();
  
      for (var i = 0; i < count; i++) {
          array.push(collectionArray[Math.floor(Math.random() * collectionArray.length)]);
      }
  
      if (count < 2) return array[0];
      return array;
    }
  
    some (fn) {
      var output = false;
  
      this.forEach(element => {
        if (output === false && fn(element)) {
          output = true;
        }
      });
  
      return output;
    }
  
    find (fn) {
      const collection = this.filter(fn);
      return collection.first();
    }
  }
  
  module.exports = Collection;