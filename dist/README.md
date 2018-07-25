![Hero](https://i.imgur.com/ymnsyVQ.gif)

<p align="center">
 🐝 This repo name is fully encapsulated.
</p>

<p align="center">
<a href="https://travis-ci.org/ken113/javlibrary-api"><img src="https://img.shields.io/travis/ken113/javlibrary-api/master.svg?style=flat-square"></a>
<a href="https://david-dm.org/ken113/javlibrary-api"><img src="https://david-dm.org/trazyn/ieaseMusic/status.svg?style=flat-square"></a>
<a href="https://david-dm.org/ken113/javlibrary-api?type=dev"><img src="https://david-dm.org/trazyn/ieaseMusic/dev-status.svg?style=flat-square"></a>
</p>

> This is a universal wrapper/scraper for the [javlibrary.com](http://javlibrary.com/) that runs on Nodejs.

 - [Installation](#installation)
 - [Usage](#usage)
 - [Sample](#sample)
 - [Session](#session)

## Installation
```
npm i ken113/javlibrary-api
```

## Usage
The first thing is bypass Cloudflare's anti-bot page, all the content access need with [session](#session).

```javascript
import jav from 'javlibrary-api';

jav.config(
    {
        headers: {
            'User-Agent': 'required'
            'Cookie': 'required'
        }
    }
);

(
    async() => {
        var res = await jav.getVideoDetail('javliida3q');
        console.log(res);
    }
)();
```

## Sample
There are a lot of [samples](https://github.com/ken113/javlibrary-api/tree/master/sample) 🤗 If you're trying to figure out how to use an API, look there first!
```
npm run sample -- ./sample/search.js
```

## Session
Run the command generate a session file:
```
npm run session
```
There has a example how to keep a fresh session:
```python
import time
import cfscrape
import schedule


def job():
    tokens, user_agent = cfscrape.get_cookie_string('http://www.javlibrary.com/') # noqa
    with open('../session.txt', 'w') as file:
        file.write('{}+{} \r\n'.format(tokens, user_agent))


job()
schedule.every(30).minutes.do(job)

while 1:
    schedule.run_pending()
    time.sleep(1)
```

Use the session file:
```javascript
var jav = require('../index');
var fs = require('fs');
var path = require('path');

module.exports = () => {
    var session = fs.readFileSync(path.resolve(__dirname, '../session.txt'), { encoding: 'utf-8' });

    var [cookie, userAgent] = session.split('+');

    jav.config(
        {
            headers: {
                'User-Agent': userAgent.trim(),
                'Cookie': cookie.trim()
            }
        }
    );

    return jav;
};
```

# API Reference
## Functions

<dl>
<dt><a href="#getBestRated">getBestRated(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the best rated items</p>
</dd>
<dt><a href="#getBestReviews">getBestReviews(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the best review items</p>
</dd>
<dt><a href="#getMostFavStars">getMostFavStars()</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the most favorited items</p>
</dd>
<dt><a href="#getMostWanted">getMostWanted(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the most wanted items</p>
</dd>
<dt><a href="#getNewComments">getNewComments(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the newest commented items</p>
</dd>
<dt><a href="#getNewEntries">getNewEntries(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the newest entries items</p>
</dd>
<dt><a href="#getNewReleases">getNewReleases(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the newest released items</p>
</dd>
<dt><a href="#getPopularVideo">getPopularVideo()</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the most popular items</p>
</dd>
<dt><a href="#getVideoComments">getVideoComments(id)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the comments by item id</p>
</dd>
<dt><a href="#getVideoDetail">getVideoDetail(id)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the detail by item id</p>
</dd>
<dt><a href="#getVideoReviews">getVideoReviews(id)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the reviews by item id</p>
</dd>
<dt><a href="#listByDirector">listByDirector(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get items by director id</p>
</dd>
<dt><a href="#listByLabel">listByLabel(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get items by label id</p>
</dd>
<dt><a href="#listByMaker">listByMaker(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get items by maker id</p>
</dd>
<dt><a href="#listByStar">listByStar(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get items by star id</p>
</dd>
<dt><a href="#listByTag">listByTag(options)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get items by tag id</p>
</dd>
<dt><a href="#search">search(keywords)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get the detail by item id</p>
</dd>
</dl>

<a name="getBestRated"></a>

## getBestRated(options) ⇒ <code>object</code> \| <code>undefined</code>
Get the best rated items

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.order | <code>number</code> | 0 is order by DESC, 1 is order by ASC. |
| options.page | <code>number</code> | The page index. |

<a name="getBestReviews"></a>

## getBestReviews(options) ⇒ <code>object</code> \| <code>undefined</code>
Get the best review items

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.order | <code>number</code> | 0 is order by DESC, 1 is order by ASC. |

<a name="getMostFavStars"></a>

## getMostFavStars() ⇒ <code>object</code> \| <code>undefined</code>
Get the most favorited items

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  
<a name="getMostWanted"></a>

## getMostWanted(options) ⇒ <code>object</code> \| <code>undefined</code>
Get the most wanted items

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.order | <code>number</code> | 0 is order by DESC, 1 is order by ASC. |
| options.page | <code>number</code> | The page index. |

<a name="getNewComments"></a>

## getNewComments(options) ⇒ <code>object</code> \| <code>undefined</code>
Get the newest commented items

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.page | <code>number</code> | The page index. |

<a name="getNewEntries"></a>

## getNewEntries(options) ⇒ <code>object</code> \| <code>undefined</code>
Get the newest entries items

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.page | <code>number</code> | The page index. |
| options.order | <code>number</code> | 0 is order by DESC, 1 is order by ASC. |

<a name="getNewReleases"></a>

## getNewReleases(options) ⇒ <code>object</code> \| <code>undefined</code>
Get the newest released items

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.page | <code>number</code> | The page index. |
| options.order | <code>number</code> | 0 is order by DESC, 1 is order by ASC. |

<a name="getPopularVideo"></a>

## getPopularVideo() ⇒ <code>object</code> \| <code>undefined</code>
Get the most popular items

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  
<a name="getVideoComments"></a>

## getVideoComments(id) ⇒ <code>object</code> \| <code>undefined</code>
Get the comments by item id

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the item |

<a name="getVideoDetail"></a>

## getVideoDetail(id) ⇒ <code>object</code> \| <code>undefined</code>
Get the detail by item id

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the item |

<a name="getVideoReviews"></a>

## getVideoReviews(id) ⇒ <code>object</code> \| <code>undefined</code>
Get the reviews by item id

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the item |

<a name="listByDirector"></a>

## listByDirector(options) ⇒ <code>object</code> \| <code>undefined</code>
Get items by director id

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.id | <code>number</code> | The director id. |
| options.page | <code>number</code> | The page index. |

<a name="listByLabel"></a>

## listByLabel(options) ⇒ <code>object</code> \| <code>undefined</code>
Get items by label id

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.id | <code>number</code> | The label id. |
| options.page | <code>number</code> | The page index. |

<a name="listByMaker"></a>

## listByMaker(options) ⇒ <code>object</code> \| <code>undefined</code>
Get items by maker id

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.id | <code>number</code> | The maker id. |
| options.page | <code>number</code> | The page index. |

<a name="listByStar"></a>

## listByStar(options) ⇒ <code>object</code> \| <code>undefined</code>
Get items by star id

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.id | <code>number</code> | The star id. |
| options.page | <code>number</code> | The page index. |

<a name="listByTag"></a>

## listByTag(options) ⇒ <code>object</code> \| <code>undefined</code>
Get items by tag id

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The pagination info. |
| options.id | <code>number</code> | The tag id. |
| options.page | <code>number</code> | The page index. |

<a name="search"></a>

## search(keywords) ⇒ <code>object</code> \| <code>undefined</code>
Get the detail by item id

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - A object the if successful. If failure not returned.  

| Param | Type | Description |
| --- | --- | --- |
| keywords | <code>string</code> | Number plate. |

