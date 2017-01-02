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

* [ABSTRACT](#abstract)
  * [Single Done desing pattern](#single-done-desing-pattern)
  * [Hard Double Done desing pattern](#hard-double-done-desing-pattern)
  * [Soft Double Done desing pattern](#soft-double-done-desing-pattern)

## ABSTRACT

I have always liked __JavaScript__, but when I deeply understood its power, I have fallen in love with it!

One of the greatest aspect of __JavaScript__ is that, thanks to its other strenght points, it helps saving the _most
expensive_ resource of the whole software life cycle: __developers time__.

### Single Done desing pattern

From now on: __SD__

In my experience I found that so often I have to write an _async function_ which has to call some other async functions
to achieve its ojective. Many of the functions I wrote look like:

```javascript
function myAsyncFunction(param1, done) {
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

### Hard Double Done desing pattern

From now on: __HDD__

### Soft Double Done desing pattern

or simply: Double Done design pattern

From now on: __SDD__ or simply: __DD__

Back to: [top](#) - [Table of contents](#table-of-contents) - [ABSTRACT](#abstract)
