var _cl = require('./build/Release/node_libcurl.node');

var { Curl, CurlCode, Easy } = require('node-libcurl');

curl = new Curl();

//curllib.run

curl.setOpt('URL', 'www.baidu.com');
curl.setOpt('FOLLOWLOCATION', true);

curl.on('end', function (statusCode, data, headers) {
  console.info(statusCode);
  console.info(headers);
  console.info('---');
  console.info(data);
  console.info('---');
  console.info(this.getInfo( 'TOTAL_TIME'));
  
  this.close();
});

curl.on('error', curl.close.bind(curl));
curl.perform();




NAN_METHOD(Easy::Perform) {
  Nan::HandleScope scope;

  Easy* obj = Nan::ObjectWrap::Unwrap<Easy>(info.This());

  if (!obj->isOpen) {
    Nan::ThrowError("Curl handle is closed.");
    return;
  }

  SETLOCALE_WRAPPER(CURLcode code = curl_easy_perform(obj->ch););

  v8::Local<v8::Integer> ret = Nan::New<v8::Integer>(static_cast<int32_t>(code));

  info.GetReturnValue().Set(ret);
}
