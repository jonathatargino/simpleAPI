function bodyParser(request, response, callback) {
  let body = '';

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      body = JSON.parse(body);
      request.body = body;
      callback(request,response)
    })
}

module.exports = bodyParser;