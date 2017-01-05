# double-done

[![Build Status](https://travis-ci.org/iccicci/double-done.png)]
(https://travis-ci.org/iccicci/double-done)
[![Code Climate](https://codeclimate.com/github/iccicci/double-done/badges/gpa.svg)]
(https://codeclimate.com/github/iccicci/double-done)
[![Test Coverage](https://codeclimate.com/github/iccicci/double-done/badges/coverage.svg)]
(https://codeclimate.com/github/iccicci/double-done/coverage)
[![Donate](http://img.shields.io/bitcoin/donate.png?color=blue)](https://www.coinbase.com/cicci)

[![NPM version](https://badge.fury.io/js/double-done.svg)](https://www.npmjs.com/package/double-done)
[![dependency status](https://david-dm.org/iccicci/double-done.svg)]
(https://david-dm.org/iccicci/double-done)
[![dev dependency status](https://david-dm.org/iccicci/double-done/dev-status.svg)]
(https://david-dm.org/iccicci/double-done?type=dev)

## Table of contents

* [Preface](#preface)
* [ABSTRACT](#abstract)
  * [Single Done desing pattern](#single-done-desing-pattern)
  * [Hard Double Done desing pattern](#hard-double-done-desing-pattern)
  * [Soft Double Done desing pattern](#soft-double-done-desing-pattern)
* [API definition](api-definition)

## Preface

I have always liked __JavaScript__, but when I deeply understood its power, I have fallen in love with it!

One of the greatest aspect of __JavaScript__ is that, thanks to its other strenght points, it helps saving the _most
expensive_ resource of the whole software life cycle: __developers time__.

## ABSTRACT

### Single Done desing pattern

From now on: __SD__

In my experience I found that so often I have to write an _async function_ which has to call some other async functions
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

After written some functions I found that continuously repeated block

```javascript
  if(err)
    return done(err);
```

was just a time waster, both when writing and reading the code.

### Hard Double Done desing pattern

From now on: __HDD__

An environment where async functions accept two __done__ functions, one called in case of error and one called in case
of success could help saving that time. My same async function would appear so:

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

I immediately realized that changing __myAsyncFunctionSD__ in __myAsyncFunctionHDD__ would be a breaking change. More
than this I had to considerate that not always calling an HDD async function is more confortable than calling a SD
async function (i.e.: when we have to do something both in cases of error or success).

_For these two reasons I decided to write this package which may help us writing DD async funciotns_.

A __DD async funciotn__ should be documentete as follows:

```
 # myAsyncFunctionDD(param1, done[, doneOk])
```

in case of error, __done__ will be called with the error as first parameter; in case of success if the caller have not
passed a __doneOk__ function (as in SD design pattern) __done__ function will be called with __null__ as first
parameter followed by other parameters which are the _myAsyncFunctionDD_ result, otherwise __doneOk__ function will be
called passing to it _only_ the parameters which are the _myAsyncFunctionDD_ result.

Back to: [top](#) - [Table of contents](#table-of-contents)

## API definition

```javascript
require('doble-done');
```

Returns the __double-done__ utility _function_.

### dd(done, doneOk)

Returns the __doneOk function__ which must be called in case of success regardless if the caller passed it or not.

```javascript
function myAsyncFunctionDD(param1, done, doneOk) {
  doneOk = dd(done, doneOk);
```

From now on __done__ and __doneOk__ are the functions to call respectively in case of error or success.

### doneOk.dd(callbackOk)

Lets us to call an SD async function writing only the __callbackOk__ function, if the called async function gets an
error, __doneOk.dd__ makes it calling the original __done__ function.

```javascript
function myAsyncFunctionDD(param1, done, doneOk) {
  doneOk = dd(done, doneOk);

  otherAsyncFunction1SD(doneOk.dd(function(param2) {
    // if otherAsyncFunction1SD gets an error, done will be called
    // otherwise this function is executed 
  }));
```

Back to: [top](#) - [Table of contents](#table-of-contents)

## Licence

[MIT Licence](https://github.com/iccicci/double-done/blob/master/LICENSE)

## Bugs

Do not hesitate to report any bug or consideration [@github](https://github.com/iccicci/double-done/issues).

## ChangeLog

* 2016-12-30 - v0.0.0
  * First idea
