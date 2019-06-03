# CMS-updater

Server module for reading and updating content files. This would generally used as a dev-tool in a static build process such as with JAMStack websites. However, it is completely unopinionated, so you can use it to manage any set of content documents, even with no associated website.

Notepad content tools read local content files (generally Markdown documents) and sychronize content into a lightweight database. You can then use that data to build site feature on both the server-side and the client side. You can even build editing tools to update the content.

To use, you will first need to set up a configuration file which defines your content types and how to read them.

### To Install:

```javascript
  npm install @notepad/cms-updater --save-dev
```


### To Use

You can use the tool (synchronously) to sync local content with database and then use the data.

```javascript
  const = import updater from "@notepad/cms-updater"
  updater.sync_content() // update database from content and content files from database

  // filter, sort, fetch details, set
  let all_articles = updater.get() // returns a list of all ids
  let sorted_articles = updater.get({_sort: 'pubdate'}). // returns a list ids sorted by pubdate
  let pet_articles = updater.get({lang:'en', _sort: 'pubdate'}) // returns list limted to lang=en and sorted by pubdate
  let pet_articles_meta = updater.get({lang:'en', _sort: 'pubdate'}, 'meta') // fetch details for one or more article ids
  let pet_article = updater.get(pet_articles[0], 'all') // use an article id (or array of ids) to fetch content

  // All fields are from document graymatter except for those with underscore. These are generated or required
  // _sort, _html, _ver, _crc, _id, _type, _prefix, _permalink

  // modify source object and some metadata then save
  pet_article.source = pet_article.source.replace(/cat/g, 'dog')
  pet_article.animal = 'dog'
  updater.set(pet_article) // updates db but also updates `pet_article` with new _html, _ver, _crc etc.


  // add a new object -- will be validated against document definition
  let new_obj = {lang: 'en', animal: 'dog', pubdate='2019-10-5', src="# Let's get Started {.title}"}
  updater.set(new_obj) // adds object and returns new doucument id if none
```

### To Configure

To configure, you'll need to create an account at notepad.com. If you want to add another developer, add them inside the account and they will be sent a verification link.

Inside your project folder, initialize your project:

```> npm notepad_content init```

This will add your

```notepad.config.json5```:  (a JSON5 file)
```javascript
{
  project: 'KidCo Pet Catalog',

  // enumerate content types, file location, default sort order and url of each
  content:  {
    article: {label:'Pet Articles', path:'content/articles', _sort: 'pubdate', _url: "{pubdate}_{stub}_{lang}" }
  },

  // enumerate the fields for each content type
  fields: {
    article: {
      title:  {type: 'string', required: true, maxlength: 50, minlength: 0, default: ''},
      author: {type: 'string', required: true, default: 'unknown'},
      pubdate: {type: 'date', required: true, default: '{{today}}'},
      published: {type: 'boolean', required: true, default: false},
      status: {type: 'option', options:'draft|unapproved|approved', required: true, default: 'draft'},
      lang: {type: 'string', required: true, default: 'en'},
      tags: {type: 'set', required: false, default: ''}, // a set is comma-delimited
      category: {type: 'string', required: true, default: 'dogs'},
      stub: {type: 'string', required: true, default:"{{stub}}", hidden: true}, // default from title
      likes: {type: 'integer', required: true, default: 0, hidden: true}
    },
  }
}
```

## Tasklist

- [x] Create Readme with basic definition
- [x] Create cms-updater repository
- [x] Init NPM with scope (@notepad.com/cms-tools)
- [x] Publish initial NPM module to reserve name
- [x] Command-line interface (very simple, just 'sync')
- [x] Init -- create default config
- [ ] Init -- check for required content processor stack (like marked or markdown-it)
- [ ] Sync -- Load content
- [ ] Sync -- Validate content
- [ ] Sync -- Update databse
- [ ] Sync -- Copy assets to static
- [ ] Sync -- Optimize images on copy
- [ ] Reader -- sync
- [ ] Reader -- get
- [ ] Reader -- filter
- [ ] Reader -- sort
- [ ] Reader -- validate
- [ ] Reader -- set
- [ ] Reader -- watch
- [ ] Split out read-only reader as exported object
- [ ] Build read-only reader as min.js
- [ ] Init -- integrate login












