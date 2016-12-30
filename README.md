# MAD SEED

Easy boilerplate to config front-end web with ANGULAR 2 FINAL RELEASE. 

We also use gulp, ts, postcss, stylus, , webpack and more

## INSTALL

```
npm install
```

## CREATE AND RUN DEVELOP MODE

```
gulp dev
```

#### ADD OPTIONAL ANGULAR LIBRARIES

```
npm install @angular/router@3.1.0 --save
npm install @angular/forms@2.1.0 --save
npm install @angular/http@2.1.0 --save

npm install @angular/upgrade@2.0.2 --save
npm install angular-in-memory-web-api@0.1.5 --save
```

#### FILE STRUCTURE

```
|_scr 
    |_ app       
    |_ styles     
    |_ views  
    |_ img       
    |_ fonts
    |_ media
```

## CREATE AND RUN DISTRIBUTION MODE

```
gulp dist
```

## UTILITIES

Testing on the best source map of webpack

http://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/

```
devtool: 'source-map'                   //5.76s
devtool: 'eval-source-map'              //5.00s
devtool: 'cheap-module-eval-source-map' //4.70s
devtool : 'cheap-eval-source-map'       //4.32s
devtool : 'eval'                        //4.22s
```

BECOME MADNESS!

