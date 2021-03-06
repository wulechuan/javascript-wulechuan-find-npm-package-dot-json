<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/dist/default.css">

# NPM Package

<dl>
<dt>Package Name</dt>
<dd>

[@wulechuan/find-package-dot-json](https://www.npmjs.com/package/@wulechuan/find-package-dot-json)

</dd>
<dt>Author</dt>
<dd><p>南昌吴乐川</p></dd>
</dl>


# Introduction

Searches folder tree **upwards** to try to locate the nearest npm project **root** folder.
If succeeds, returns both the found path and the parsed `package.json` as an object.


# Usage

```javascript
function ensureCWDToBeNPMProjectRootAndReturnPackageJSON(options) {


    /** **********************************************
     *   Utilizing `@wulechuan/find-package-dot-json`
     ** ********************************************** */
    const result = require('@wulechuan/find-package-dot-json')({
        /**
         * Optional.
         * Default to process.cwd()
        */
        searchingStartPath:    '<a path to start with>',
        
        /** 
         * Optional.
         * A non-string value or an empty string
         * means any npm project root folder counts,
         * ignoring the name of the npm project.
         */
        desiredNPMProjectName: '<your fancy npm project name here>',
    });
    /** ********************************************** */



    // If it fails to find one, let's throw an error here.
    if (! result) {
        throw ReferenceError('Fail to locate npm project root.');
    }


    // If the program was not thrown, now we are safe to move on.
    const {
        npmProjectRootPath,
    } = result;



    // Let's make some use of the found path.
    process.chdir(npmProjectRootPath);
    console.log(`[${
        chalk.gray(moment().format('HH:mm:ss'))
    }] Working directory changed to\n${' '.repeat('[HH:mm:ss] '.length)}${
        chalk.green(process.cwd())
    }\n\n\n`);



    // Return the result for outside world to make use of it.
    return result;
}
```


# API

## Argument

At present, there is only one argument that is accepted.
And even that argument is optional.

Let's call the argument `options`.

### `options`, aka `arguments[0]`

| _Spec_       | _Def_  |
| ------------ | ------ |
| **Type**     | object |
| **Optional** | yes    |

```javascript
{
    searchingStartPath:    '<a path to start with>',
    desiredNPMProjectName: '<your fancy npm project name here>',
}
```


#### `options.searchingStartPath`

| _Spec_            | _Def_                                       |
| ----------------- | ------------------------------------------- |
| **Type**          | string                                      |
| **Allowed Value** | any valid path, either absolute or relative |
| **Default Value** | `process.cwd()`                             |
| **Optional**      | yes                                         |

The path of the searching starting folder.

> Since the tool simply does some basic path operations
> to detect a `package.json` file,
> theoretically a path to a **file** instead of a **folder**
> as the starting point also works.


#### `options.desiredNPMProjectName`

| _Spec_            | _Def_                                                            |
| ----------------- | ---------------------------------------------------------------- |
| **Type**          | multiple                                                         |
| **Allowed Value** | string that obeys npm naming rules \| non-string \| empty string |
| **Default Value** | an empty string                                                  |
| **Optional**      | yes                                                              |

The desired npm project name.

*   If it takes a non-string value or an empty string,
    then the first matched `package.json` of **any** npm project counts.

*   If its value is a non-empty-string,
    then the string will be check by a Regular Expression
    to make sure the string to be a valid npm project name.

    -   If the value is considered to be an invalid npm project name,
        this tool will throw an error;

    -   If the value seems to be a valid one,
        then only the first met `package.json` with the matched
        `name` property counts.

    > See https://docs.npmjs.com/files/package.json#name


## Return Value

| _Spec_             | _Def_                         |
| ------------------ | ----------------------------- |
| **Type**           | object                        |
| **Possible Value** | an object literal or a `null` |

*   If the tool fails to find a matched result,
    `null` is returned.

*   If the desired npm project is located successfully,
    an object literal is returned, which looks like:

    ```javascript
    {
        npmProjectRootPath: 'a string',
        packageJSON:        'an object',
    }
    ```
