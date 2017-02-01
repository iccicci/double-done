# double-done

[![Build Status](https://travis-ci.org/iccicci/double-done.png)](https://travis-ci.org/iccicci/double-done)
[![Code Climate](https://codeclimate.com/github/iccicci/double-done/badges/gpa.svg)](https://codeclimate.com/github/iccicci/double-done)
[![Test Coverage](https://codeclimate.com/github/iccicci/double-done/badges/coverage.svg)](https://codeclimate.com/github/iccicci/double-done/coverage)
[![Donate](http://img.shields.io/bitcoin/donate.png?color=blue)](https://www.coinbase.com/cicci)

[![NPM version](https://badge.fury.io/js/double-done.svg)](https://www.npmjs.com/package/double-done)
[![bitHound Dependencies](https://www.bithound.io/github/iccicci/double-done/badges/dependencies.svg)](https://www.bithound.io/github/iccicci/double-done/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/iccicci/double-done/badges/devDependencies.svg)](https://www.bithound.io/github/iccicci/double-done/master/dependencies/npm)

## Table of contents

* [Preface](#preface)
* [ABSTRACT](#abstract)
  * [Single Done desing pattern](#single-done-desing-pattern)
  * [Hard Double Done desing pattern](#hard-double-done-desing-pattern)
  * [Soft Double Done desing pattern](#soft-double-done-desing-pattern)
* [API definition](#api-definition)

## Preface

I always liked __JavaScript__, but when I deeply understood its power, I felt in love with it!

One of the greatest aspect of __JavaScript__ is that it helps saving the _most
expensive_ resource of the whole software life cycle: __developers time__.

## ABSTRACT

### Single Done desing pattern

From now on: __SD__

In my experience often happens that I have to write an _async function_ which has to call some other async functions
to achieve its ojective. Many of the functions I wrote look like:

```javascript
function myAsyncFunctionSD(param1, done) {
  otherAsyncFunction1(function(err, param2) {
    if(err)
      return done(err);

    otherAsyncFunction2(param1, param2, function(err, param3) {
      if(err)
        return done(err);

      otherAsyncFunction3(param1, param3, function(err, param4) {
        if(err)
          return done(err);

        done(null, param2, param4);
      });
    });
  });
}
```

What I think is that the continuously repeated block

```javascript
  if(err)
    return done(err);
```

is just a time waster, both when writing and reading the code.

### Hard Double Done desing pattern

From now on: __HDD__

An environment where async functions accept two __done__ functions, one called in case of error and one called in case
of success could help saving that time. My same async function would look like:

```javascript
function myAsyncFunctionHDD(param1, doneErr, doneOk) {
  otherAsyncFunction1HDD(doneErr, function(param2) {
    otherAsyncFunction2HDD(param1, param2, doneErr, function(param3) {
      otherAsyncFunction3HDD(param1, param3, doneErr, function(param4) {
        doneOk(param2, param4);
      });
    });
  });
}
```

### Soft Double Done desing pattern

or simply: Double Done design pattern

From now on: __SDD__ or simply: __DD__

I immediately realized that changing __myAsyncFunctionSD__ in __myAsyncFunctionHDD__ would be a breaking change. Beside
this I had to consider that calling an HDD async function is not always more comfortable than calling a SD
async function (i.e.: when we have to do something both in cases of error or success).

_For these two reasons I decided to write this package which may helps writing DD async functions_.

A __DD async funciotn__ should be documented as follows:

```
 # myAsyncFunctionDD(param1, done[, doneOk])
```

in case of error, __done__ will be called with the error as first parameter; in case of success, if the caller have not
passed a __doneOk__ function, (as in SD design pattern) __done__ function will be called with __null__ as first
parameter followed by other parameters (which are the _myAsyncFunctionDD_ result), otherwise __doneOk__ function will
be called passing to it _only_ the parameters which are the _myAsyncFunctionDD_ result.

Back to: [top](#) - [Table of contents](#table-of-contents)

### Installation

With [npm](https://www.npmjs.com/package/double-done):
```sh
npm install double-done
```

## API definition

```javascript
require('double-done');
```

Returns the __double-done__ utility _function_.

### dd(done, doneOk)

Returns the __doneOk function__ which must be called in case of success regardless if the caller passed it or not.

```javascript
var dd = require('double-done');

function myAsyncFunctionDD(param1, done, doneOk) {
  doneOk = dd(done, doneOk);
```

From now on __done__ and __doneOk__ are the functions to be called respectively in case of error or success.

### doneOk.dd(callbackOk)

This function lets us call an SD async function writing only the __callbackOk__ function, if the called async function
gets an error, __doneOk.dd__ makes it calling the original __done__ function.

```javascript
function myAsyncFunctionDD(param1, done, doneOk) {
  doneOk = dd(done, doneOk);

  otherAsyncFunction1SD(doneOk.dd(function(param2) {
    // if otherAsyncFunction1SD gets an error, done will be called
    // otherwise this function is executed 
  }));
```

### doneOk.try(throwing, callbackOk)

This utility function helps to write more compact code in another common case: when we need to call a function which
may _throw_ an exception, in an async function. Following two code snippets have exactly the same effect.

```javascript
function myAsyncFunction(param1, done, doneOk) {
  doneOk = dd(done, doneOk);

  var ret;

  try { ret = throwingFunction(param1); }
  catch(e) { return process.nextTick(done.bind(null, e)); }

  doneOk(somethingElse(ret));
}
```

```javascript
function myAsyncFunction(param1, done, doneOk) {
  doneOk = dd(done, doneOk);

  doneOk.try(throwingFunction.bind(null, param1), function(ret) {
    doneOk(somethingElse(ret));
  });
}
```

Back to: [top](#) - [Table of contents](#table-of-contents)

### Compatibility

The package it tested under [several Node.js versions](https://travis-ci.org/iccicci/double-done).

__Required: Node.js 0.10__

### Licence

[MIT Licence](https://github.com/iccicci/double-done/blob/master/LICENSE)

### Bugs

Do not hesitate to report any bug or consideration [@github](https://github.com/iccicci/double-done/issues).

### ChangeLog

* 2017-02-01 - v0.1.1
  * Enabled __node.js__ v0.10
* 2017-01-19 - v0.1.0
  * Fixed documentation
* 2017-01-18 - v0.0.5
  * Added doneOk.try
* 2017-01-17 - v0.0.4
  * Dependencies update
* 2017-01-09 - v0.0.3
  * README review and optimization
* 2017-01-05 - v0.0.2
  * Cosmetics
* 2017-01-05 - v0.0.1
  * First release
* 2016-12-30 - v0.0.0
  * First idea
