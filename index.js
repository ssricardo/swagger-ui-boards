console.log('Starting Swagger UI - server');

const config = require('./config-env.json')
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

const _httpErrorPages = require('http-error-pages');

var options = {
    swaggerOptions: {
      url: 'errr'
    }
  }

var deferSwaggerSetupFn = function(req, res, next) {
    let fn = swaggerUi.setup(null, options);
    fn(req, res);
    next();
}

// --------------------- Endpoints ---------------------------------
app.use('/api-docs', swaggerUi.serve);

/** Swagger page handler */
app.get('/api-docs', function(req, res, next) {
    let namespace = req.query['nm'];
    let app = req.query['app'];

    if (! (namespace && app)) {        
        let err = new Error(`It looks like you have a problem on your request.\n
        Your URL must include the query parameters: 'nm' and 'app'`);
        err.status = 400;
        next(err);
        return;
    }

    let url = 
         '/' + config['api-base'] + '/' + namespace + '/' + app;
    options.swaggerOptions.url = url;   // replaces URL accroding to params 
    next();
}, deferSwaggerSetupFn);

/** Error handler */
_httpErrorPages.express(app, {
    lang: 'en_US',
    footer: '<i>From</i> <strong>OpenAPI Board</strong>'
});

/*

// Test only
app.get('/api/manager/:nm/:app', function(req, res) {
    console.log('Reach API')
    res.contentType('application/json');
    res.json('"OK"');
});
*/

app.listen(8090);

console.log('Swagger UI Started on port: 8090');