/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    if (n === undefined) {
        return array[array.length - 1];
    } else if (n > array.length) {
        return array;
    } else {
        return array.slice(array.length - n, array.length);
      }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            iterator(collection[i], i, collection);
        }
    } else {
        for (var j in collection) {
            iterator(collection[j], j, collection);
        }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var passers = [];
    _.each(collection, function (value, index, collection) {
        if (test(value,index,collection)) {
            passers.push(value);
        }
    });
    return passers;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
     return _.filter(collection, function (value, index, list) {
         return test(value, index, list) === false
       });
   };


    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  

  // Produce a duplicate-free version of the array.
  _.uniq = function (array) {
    var samers = [];
    var seen = [];
    var current = samers[0];
    _.each(array, function (value) {
        if (value != current && seen.indexOf(value) < 0){
          seen.push(value);
            samers.push(value);
            current = value;
        }
    });
    return samers;
};


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var results = [];
    _.each(array, function (value, index, collection) {
        results.push(iterator(value, index, collection));
    });
    return results;
  };


  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
   _.invoke = function (collection, functionOrKey, args) {
     if (typeof functionOrKey == 'function') {
         return _.map(collection, function (value) {
             return functionOrKey.apply(value, args);
         });
     } else {
         return _.map(collection, function (value) {
             return value[functionOrKey].apply(value, args);
         });
     }
 };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, initialValue){
  var previousValue;
  var hasInitialValue = arguments.length > 2;
  _.each(collection, function(item,index,collection){
    previousValue = initialValue || 0;
    initialValue = iterator(previousValue, item);
  });
  return initialValue;
};
        
  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if(!iterator){
      iterator = _.identity;
    }
     var result =  _.reduce(collection,function(status,item){
      return ((status) ? iterator(item) : false);
    },true);
   return (result) ? true : false;
  };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

_.some = function(collection, iterator){
if (!iterator){
  iterator = function(e){return e;};
}
  return !_.every(collection, function(element){
    return !iterator(element);
  });
};
    // TIP: There's a very clever way to re-use every() here.

  //_.some = function(collection, iterator) {
  //  if (iterator === undefined) {
    //  iterator = _.identity;
    //}
    //var status = false;
   //_.each(collection, function(item, index, collection){
   //  if (iterator(item)){
   //   status = true;
   // }
   // });
  //return status;
//};
  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
   _.extend = function(obj){
    for (var i = 0; i <arguments.length; i++){
     for (var key in arguments[i]){
      obj[key] = arguments[i][key];
     }
    }
  return obj;
  };
  

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
   _.defaults = function (obj) {
     var newProps = Array.prototype.slice.call(arguments, 1);
     _.each(newProps, function (objects) {
         for (var key in objects) {
             if (obj[key] === undefined) {
                 obj[key] = objects[key];
             }
         }
     });
     return obj;
 };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};
    

    return function(){
      var arg = arguments[0]
      if (!results.hasOwnProperty(arg)){
        var answer = func.apply(this, arguments);
        results[arg] = answer;
        return answer;
    }
      return results[arg]
      };
    };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function(){
      func.apply(this, args);}, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(arr) {
    var DuplicatedArr = arr.slice();
    var resultArr = [];
    var limit = DuplicatedArr.length-1;
    var sortingNumber;

    while (limit >= 0){
      sortingNumber = Math.floor(Math.random() * limit);
        resultArr.push(DuplicatedArr[sortingNumber]);
        DuplicatedArr.splice(sortingNumber, 1)
        limit--;
   }
      return resultArr;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
