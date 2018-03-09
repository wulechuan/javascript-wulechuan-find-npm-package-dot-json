# NPM Page

[@wulechuan/find-package-dot-json](https://www.npmjs.com/package/@wulechuan/find-package-dot-json)

<br/>
<br/>
<br/>
<br/>

# Introduction

Search folder tree **upwards** and locate the nearest npm project **root** folder, returning the parsed `package.json` as an object.

<br/>
<br/>

# Usage

```javascript
function ensureCWDToBeNPMProjectRootAndReturnPackageJSON(options) {


    /* ********************************************* */

    const result = require('@wulechuan/find-package-dot-json')({
        searchingStartPath:    '<a path to start with>',             // optional
        desiredNPMProjectName: '<your fancy npm project name here>', // optional
    });

    /* ********************************************* */



    // If fail to find one, throw an error
    if (! result) {
        throw ReferenceError('Fail to locate npm project root.');
    }


    // If not thrown, now we are safe to move on.
    const {
        npmProjectRootPath,
    } = result;


    process.chdir(npmProjectRootPath);


    // By the way, the line below simulates a gulp log.
    console.log(`[${
        chalk.gray(moment().format('HH:mm:ss'))
    }] Working directory changed to\n${' '.repeat('[HH:mm:ss] '.length)}${
        chalk.green(process.cwd())
    }\n\n\n`);


    return result;
}
```


<br/>
<br/>
<br/>
<br/>

# API

## arguments

```javascript
{
    searchingStartPath:    '<a path to start with>',             // optional
    desiredNPMProjectName: '<your fancy npm project name here>', // optional
}
```

<br/>
<br/>

## return value

```javascript
{
    npmProjectRootPath: 'a string',
    packageJSON: 'an object',
}
```

<br/>
<br/>
<br/>
<br/>
