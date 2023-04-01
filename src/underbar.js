(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  // I - array and value representing how many elements from the back to retrieve
  // O - sliced array from n
  // C - ??
  // E - If n is undefined, return just the last element
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    }
    if (n === 0) {
      return [];
    }

    if (n >= array.length) {
      return array;
    }
    // return the other elements
    // [1, 2, 3]   slice (2)
    return array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  // Input could be an object OR an array (case for each)
  // Output is nothing (doesn't return anything just does work)
  // E - checking for arrays or object (otherwise nothing happens)

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
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
  // input is an array
  // output is an array of only elements that pass the test

  // we'll need to build a new array to return
  // we'll need to iterate over the input array in search of test passing elements
  _.filter = function(collection, test) {
    var result = [];
    for (var i = 0; i < collection.length; i++) {
      // grab element in the array
      // compare it to the test - what is the test? It's an iterator. What values do we want
      // that iterator to eventually have access to?
      // if the iterator is called on the value, index, and entire array - if this passes true
      // then push into our result
      if (test(collection[i], i, collection) === true) {
        result.push(collection[i]);
      }
    }
    return result;
  };

  // Return all elements of an array that don't pass a truth test.

  // Input is an array and a test fn (to see truthy/falsey output)
  // Output is an array of elements that didn't pass the truth test

  // kind of the opposite of filter, but in using filter what can we make as the opposite?

  _.reject = function(collection, test) {
    return _.filter(collection, function(value, i, array) {
      return !test(value, i, array);
    });
  };

  // Produce a duplicate-free version of the array.
  // We will need to check if an iterator was provided
  // If it was, we'll have to apply it to our array
  // if not, then:
  // iteratre over the array
  // somehow know if we've seen an element before - should we store in an obj?
  // if we do store them in an object, we can just push an array of either the keys or the values to get a single item

  // _.each: iterate through the array and see if the current element exists in memory (cache)
  // if it does exist in memory, then skip over it (go to next value)
  // If we don't have it, add to our cache as a key, then we can have the index where we found it as a value.
  // after we've checked all the values and stored the unique numbers with their index,
  // push the keys into the array

  _.uniq = function(array, isSorted, iterator) {
    var result = [];
    var cache = {};
    _.each(array, function(value, index, arr) {
      if (iterator) {
        iterator(value, index, arr);
      }
      if (!cache[value]) {
        cache[value] = index;
      }
    });
    console.log('input array was ', array);
    console.log('current cache is ', cache);
    for (var key in cache) {
      result.push(JSON.parse(key));
    }
    return result;
  };


  // Return the results of applying an iterator to each element.

  // Return value is an array

  // Check if the collection is an array
  // use a for loop to iterate over it
  // create a new array and push the call to iterator into that new array
  // but if it's an object, then you repeat that project of calling iterator and pushing that into results
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(element, i, collection) {
      result.push(iterator(element, i, collection));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // I: collection that takes in an array or object; function that modifies or wants to do action on it; optional starting accumulator value
    // O: single value be it a result of the iterator function
    // C: can't mutate the original array;
    // E: no starting value (accumulator) => iterator invoked at second element;

    // strategies: take input collection and reduce it to single value that is result of an accumulation of each element that has been invoke with a user defined iterator function
    // explanation: first two inputs are what we do work on and accumulator should be what result is => two parameters: one applies effect on another and accumulator keeps track of the result.

    var backupAccumulator = arguments[1];
    accumulator = accumulator || collection[0];
    _.each(collection, function(value, i) {
      if (iterator === undefined) {
        iterator = backupAccumulator;
      }
      if (accumulator === undefined && i === 0) {
        i++;
        //console.log('current collection: ' + collection);
        //console.log('current accumulator: ' + accumulator);
      }
      accumulator = iterator(accumulator, collection[i]);
    });

    return accumulator;
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
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
  };


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
  _.extend = function(obj) {
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
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

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
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
  _.shuffle = function(array) {
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

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

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
