const http = require('http');
const {URL} = require('url')

const bodyParser = require('./helpers/bodyParser');
const routes = require('./routes');

const server = http.createServer((request,response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)

  console.log(`Request method: ${request.method} / Request endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean);

  if(splitEndpoint.length > 1){
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];

    console.log(pathname, id)
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ))

  if(route){
    request.params = { id };
    request.query = Object.fromEntries(parsedUrl.searchParams);
    
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, {'Content-Type': 'application/json'});
      response.end((JSON.stringify(body)));
    };

    if(['POST','PUT', 'PATCH'].includes(request.method)){
      bodyParser(request,response, () => route.handler(request,response));
    } else {
      route.handler(request,response);
    }

  } else {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
})

server.listen(3000, () => console.log("server is listening to localhost:3000"));