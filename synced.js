//https://github.com/dhruvbird/http-sync
//https://github.com/JCMais/node-libcurl


var { Curl, CurlCode, Easy} = require('node-libcurl')

Curl.info.TEXT = 0 
Curl.info.HEADER_OUT = 2
Curl.info.HEADER_IN = 1
Curl.info.DATA_IN = 3
Curl.info.DATA_OUT = 4
Curl.info.SSL_DATA_IN = 5
Curl.info.SSL_DATA_OUT = 6
Curl.info.END = 7






const nvhead = require("nvhead")
const tltl = require("tlist")
const elel = require("elist")
const zlib = require('zlib');
const compress = require('compress');



//result:

const { Curl,CurlCode,Easy,CurlInfoDebug} = require('node-libcurl');


function req(reqParams){
    let r = initRes()
    ////
    let handle = setHandler(reqParams)
    handle = setUrlPort(reqParams,handle)
    handle = setMethod(reqParams,handle)
    handle = setReqHeader(reqParams,handle)
    handle = setReqBody(reqParams,handle)
    ////
    r,handle = rcvResHead(r,handle)
    ///////dcdBody based on r.resHead
    handle.setOpt(Curl.option.WRITEFUNCTION, function(buf, size, nmemb) {
      d.rawResBody = Buffer.concat([d.rawResBody,buf])
      return(size * nmemb)
    })
    handle.setOpt(Curl.option.VERBOSE,1)
    ////CURLINFO_HEADER_OUT https://curl.haxx.se/libcurl/c/CURLOPT_DEBUGFUNCTION.html
    ////强制指定方法
    handle.setOpt(Curl.option.DEBUGFUNCTION, function(infotypeNum,infotypeBuffer) {
       if(infotypeNum === Curl.info.HEADER_OUT) {
           d.rawReqHead = Buffer.concat([d.rawReqHead,infotypeBuffer])
       } else if(infotypeNum === Curl.info.DATA_OUT){
           d.rawReqBody = Buffer.concat([d.rawReqBody,infotypeBuffer])
       }
       return(infotypeNum)
    })
    ////SSL
    
    ////
    var ret = handle.perform()
    d.ret = Easy.strError(ret)
    d.handle = handle
    ////如果接收到的 keep-alive 为close
    ////加入handle.close()
    ////如果接收到的头部有Keep-Alive: timeout=5, max=1000
    ////这个链接最少维持5秒
    ////这个链接最多发送1000次请求
    ////d._openTime
    ////d._closeTime
    ////d._duration
    ////d._reqNums   通过这个链接已发送的请求
    return(d)
}


var url = 'https://www.baidu.com'
var url2 = 'http://www.baidu.com'
var url3 = 'http://www.baiduu.com'


// d0 = req(url)
// d1 = req(url,d0.handle)
// d2 = req(url,d1.handle)

d0 = req(url2)
d1 = req(url2,d0.handle)
d2 = req(url2,d1.handle)

//
//To send a HTTP HEAD request, you need to set this option up:
//curl_easy_setopt(ctx,CURLOPT_NOBODY ,1 );

> d2.handle.getInfo(Curl.info.PRIMARY_IP)
{ code: 0, data: '61.135.169.125' }
>
> d2.handle.getInfo(Curl.info.LOCAL_IP)
{ code: 0, data: '192.168.152.128' }
>

//
HeaderFunction
static NAN_METHOD(Send);




///

const standardHttpHeadNames = require("http-head-names.json")


const nvhead = require("nvhead").nvhd.Head


hd = nvhead.getInstance()
hd = hd.append("Accept","ldp_txt/ldp_html")
hd = hd.append("Accept","ldp_txt/ldp_html")
hd = hd.rmforce("Content-Type")
slist = hd.slist()


reqParams = {}
reqParams.method = 'GET'
parmas.url = url
parmas.headers = 
reqParams.body = ""



///

reqLine
reqHead
reqFullHead    reqLine + reqHead
reqBody

resStatusLine
resHead
resFullHead    resStatusLine + resHead
resBody

rawResHead
rawResBody
resFullHeadStr


headSlist            
headStr              
headDict             
headStr2Slist         
headDict2Slist        

reqParams

encdBody
dcdBody

function resFullHeadStr2DictGroups(headersString) {
    const headers = headersString.split(/\r?\n|\r/g);
    const len = headers.length;
    let groups = [];
    let isStatusLine = true;
    let currHeaders = {};
    for (let i = 0; i < len; i += 1) {
        // status line
        if (isStatusLine) {
            const header = headers[i].split(' ');
            let statusLine = {
                version: header.shift() || '',
                code: parseInt(header.shift() || '0', 10),
                reason: header.join(' '),
            };
            groups.push(statusLine)
            isStatusLine = false;
            continue;
        }
        // Empty string means empty line, which means another header group
        if (headers[i] === '') {
            groups.push(currHeaders);
            currHeaders = {};
            isStatusLine = true;
            continue;
        }
        const header = headers[i].split(/:\s(.+)/);
        if (header[0].toUpperCase() === 'SET-COOKIE') {
            if (!currHeaders['Set-Cookie']) {
                currHeaders['Set-Cookie'] = [];
            }
            currHeaders['Set-Cookie'].push(header[1]);
        }
        else {
            currHeaders[header[0]] = header[1];
        }
    }
    return(groups);
}

function resFullHeadStr2resHead(headersString) {
    let headers = headersString.split(/\r?\n|\r/g);
    headers = headers.filter((header)=>(header!=""))
    const len = headers.length;
    let isStatusLine = true;
    let currHeaders = {};
    for (let i = 1; i < len; i += 1) {
        // ignore status line
        const header = headers[i].split(/:\s(.+)/);
        if (header[0].toUpperCase() === 'SET-COOKIE') {
            if (!currHeaders['Set-Cookie']) {
                currHeaders['Set-Cookie'] = [];
            }
            currHeaders['Set-Cookie'].push(header[1]);
        }
        else {
            currHeaders[header[0]] = header[1];
        }
    }
    return(currHeaders);
}

function headStr2Dict(headersString) {
    let headers = headersString.split(/\r?\n|\r/g);
    headers = headers.filter((header)=>(header!=""))
    const len = headers.length;
    let currHeaders = {};
    for (let i = 0; i < len; i += 1) {
        const header = headers[i].split(/:\s(.+)/);
        if (header[0].toUpperCase() === 'SET-COOKIE') {
            if (!currHeaders['Set-Cookie']) {
                currHeaders['Set-Cookie'] = [];
            }
            currHeaders['Set-Cookie'].push(header[1]);
        }
        else {
            currHeaders[header[0]] = header[1];
        }
    }
    return(currHeaders)
}

function splitResFullHeadStr(headersString) {
    const headers = headersString.split(/\r?\n|\r/g);
    const len = headers.length;
    let isStatusLine = true;
    let statusLine = {}
    let currHeaders = {};
    for (let i = 0; i < len; i += 1) {
        // status line
        if (isStatusLine) {
            const header = headers[i].split(' ');
            statusLine = {
                version: header.shift() || '',
                code: parseInt(header.shift() || '0', 10),
                reason: header.join(' '),
            };
            isStatusLine = false;
            continue;
        }
        const header = headers[i].split(/:\s(.+)/);
        if (header[0].toUpperCase() === 'SET-COOKIE') {
            if (!currHeaders['Set-Cookie']) {
                currHeaders['Set-Cookie'] = [];
            }
            currHeaders['Set-Cookie'].push(header[1]);
        }
        else {
            currHeaders[header[0]] = header[1];
        }
    }
    return([statusLine,currHeaders]);
}

function headStr2Slist(headStr) {
    let headers = headersString.split(/\r?\n|\r/g);
    headers = headers.filter((header)=>(header!=""))
    let len = headers.length;
    let slist = [];
    for (let i = 0; i < len; i += 1) {
        let header = headers[i].split(/:\s(.+)/);
        header = header.slice(0,2)
        slist.push(header)
    }
    return(slist)
}

function headDict2Slist(headDict) {
    let slist = [];
    for(let k in headDict) {
        if (k.toUpperCase() === 'SET-COOKIE') {
            for(let i in headDict[k]) {
                slist.push(['Set-Cookie',headDict[k][i]])
            }
        }  else {
            slist.push([k,headDict[k]])
        }
    }
    return(slist)
}

function standizeSlist(slist,standardHeadNames) {
    let ref = standardHeadNames.mapv((name)=>(name.toLowerCase()))
    for(let i in slist) {
        let name = slist[i][0]
        let index = ref.indexOf(name.toLowerCase())
        if(index>0) {
            slist[i] = [standardHeadNames[index],slist[i][1]]
        } else {
        }
    }
    return(slist)
}

function paramsHeaders2slist(headers,standardHeadNames=standardHttpHeadNames) {
    let slist;
    if(util.isString(headers)) {
        //headStr
        slist = headStr2Slist(headers)
    } else if(util.isArray(headers)) {
        //headSlist
        slist = headers
    } else {
        //headDict
        slist = headDict2Slist(headDict)
    }
    slist = standizeSlist(slist,standardHeadNames)
    return(slist)
}



function slistGetAcceptEncodings(sl) {
    /*
        Accept-Encoding 是支持列表
        而 Content-Encoding 的顺序是压缩算法依次执行
        // Multiple, in the order in which they were applied
        Content-Encoding: gzip, identity
        Content-Encoding: deflate, gzip
    */
    let tl = nvhead.nvhd.sl2tl(sl)
    tl = new tltl.Tlist(...tl)
    tl = tl.getAllK("Accept-Encoding")
    let l = Array.from(tl.map((t)=>t[1]))
    l = l.uniqualize()
    ////这里要加入q的处理
    return(l.join(","))
}

function slistSetAutoDecompress(slist,handle) {
    //CURLOPT_HTTP_CONTENT_DECODING - enable/disable HTTP content decoding
    //Libcurl has no default content decoding but requires you to use CURLOPT_ACCEPT_ENCODING for that
    //// 对返回的response开启 解压缩功能
    handle.setOpt(Curl.option.HTTP_CONTENT_DECODING,1)
    ////request 发送 时候携带 AcceptEncodings
    //// 对返回的response 自动解压缩
    let AcceptEncodings = slistGetAcceptEncodings(slist)
    if(AcceptEncodings.length > 0) {
        handle.setOpt(Curl.option.ACCEPT_ENCODING,AcceptEncodings)
    } else {
        //automatic decompressing when receiving data
        handle.setOpt(Curl.option.ACCEPT_ENCODING,"gzip,deflate,br")
    }
    //
    return(handle)
}


function slistGetTransferEncoding(sl) {
    let tl = nvhead.nvhd.sl2tl(sl)
    tl = new tltl.Tlist(...tl)
    tl = tl.getAllK("Transfer-Encoding")
    let l = Array.from(tl.map((t)=>t[1]))
    l = l.uniqualize()
    return(l[0].toLowerCase())
}

function slistSetAutoTransferDecoding(slist,handle) {
    /*
        Content-Encoding 和 Transfer-Encoding 二者经常会结合来用，
        其实就是针对进行了内容编码（压缩）的内容再进行传输编码（分块）
        Transfer-Encoding: chunked
        CURLOPT_TRANSFER_ENCODING
        it can respond with the HTTP response sent using a compressed Transfer-Encoding 
        that will be automatically uncompressed by libcurl on reception.
        a Transfer-Encoding is strictly meant to be for the transfer 
        and thus MUST be decoded before the data arrives in the client
        
        CURLOPT_HTTP_TRANSFER_DECODING - enable/disable HTTP transfer decoding
        libcurl does chunked transfer decoding by default unless this option is set to zero. 
        
        res :  Transfer-Decoding -> content-Decoding -> content-Type
        
        For example,
        
            Transfer-Encoding: gzip, chunked
        
          indicates that the payload body has been compressed using the gzip
          coding and then chunked using the chunked coding while forming the
          message body.
    */
        handle.setOpt(Curl.option.HTTP_TRANSFER_DECODING,1)
    //// enable auto HTTP transfer decoding
    return(handle)
}


function slistGetTransferEncoding(sl) {
    let tl = nvhead.nvhd.sl2tl(sl)
    tl = new tltl.Tlist(...tl)
    tl = tl.getAllK("TE")
    let l = Array.from(tl.map((t)=>t[1]))
    l = l.uniqualize()
    return(l[0])
}



function setTE(slist,handle) {
    let TE = slistGetTransferEncoding(slist)
    if(TE.toLowerCase() === "chunked" || TE.toLowerCase() === undefined) {
        //Adds a request for compressed Transfer Encoding in the outgoing HTTP request
        handle.setOpt(Curl.option.TRANSFER_ENCODING,1)
    } else {
        handle.setOpt(Curl.option.TRANSFER_ENCODING,0)
    }
    //
    return(handle)
}



function setReqHeader(reqParams,handle) {
    /*
        headers : slist, str, dict
        If you add a header with no content as in 'Accept:' (no data on the right side of the colon), 
        the internally used header will get disabled.
        实现设置头部 空值为删除
        handle.setOpt(Curl.option.HTTPHEADER,["Accept: ldp_txt/ldp_html","Accept: ldp_txt/ldp_html","Content-Type: "])
        
        You can also opt to just include the Accept-Encoding: header in your request with CURLOPT_HTTPHEADER 
        but then there will be no automatic decompressing when receiving data. 
        
        sl = ["Accept: ldp_txt/ldp_html","Accept: ldp_txt/ldp_html","Content-Type: "]
        
    */
    headers = reqParams.headers
    let slist = paramsHeaders2slist(headers)
    handle.setOpt(Curl.option.HTTPHEADER,slist)
    //// 自动解压
    handle = slistSetAutoDecompress(slist,handle)
    //// 自动解chunked, 移到response里去
    handle = slistSetAutoTransferDecoding(slist,handle)
    //// 发送TE请求,期望Server 发回chunked
    handle = slistSetTE(slist,handle)
    return(handle)
}

function setHandler(reqParams) {
    let handle = reqParams.handle
    if(handle === undefined){
        handle = new Easy()
    }
    return(handle)
}

function setUrlPort(reqParams,handle) {
    /////设置URL 与 端口
    handle.setOpt(Curl.option.URL, reqParams.url)
    if(reqParams.port === undefined) {
        
    } else {
        handle.setOpt(Curl.option.PORT,reqParams.port)
    }
    return(handle)
}

function setMethod(reqParams,handle) {
    if(reqParams.method === undefined) {
        handle.setOpt(Curl.option.CUSTOMREQUEST,"GET")
    } else {
        handle.setOpt(Curl.option.CUSTOMREQUEST,reqParams.method.toUpperCase())
    }
    return(handle)
}





function contentDcd(contentEncoding,dataBuf) {
    /*
        "gzip","compress","deflate","br","identity"
    */
    contentEncoding = contentEncoding.toLowerCase()
    let content = ""
    if(contentEncoding === "gzip") {
        content = zlib.gunzipSync(dataBuf)
    } else if(contentEncoding === "compress") {
        content = dataBuf.toString()
        content = compress.decode(content)
    } else if(contentEncoding === "deflate") {
        content = zlib.inflateSync(dataBuf)
    } else if(contentEncoding === "br") {
        content = zlib.brotliDecompressSync(dataBuf)
    } else {
        content = content
    }
    content = content.toString()
    return(content)
}


function contentEncd(contentEncoding,s) {
    /*
        "gzip","compress","deflate","br","identity"
        const char *data = "data to send";
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
        Set CURLOPT_ACCEPT_ENCODING to NULL to explicitly disable it, 
        which makes libcurl not send an Accept-Encoding: header and 
        not decompress received contents automatically.
        enable all supported built-in compressions
        curl_easy_setopt(curl, CURLOPT_ACCEPT_ENCODING, "");
        CURLOPT_ACCEPT_ENCODING - enables automatic decompression of HTTP downloads 
    */
    contentEncoding = contentEncoding.toLowerCase()
    let content = ""
    if(contentEncoding === "gzip") {
        content = zlib.gzipSync(s)
    } else if(contentEncoding === "compress") {
        content = compress.encode(s)
    } else if(contentEncoding === "deflate") {
        content = zlib.deflateSync(s)
    } else if(contentEncoding === "br") {
        content = zlib.brotliCompressSync(s)
    } else {
        content = content
    }
    content = content.toString()
    return(content)
}


function reqContentEncd(slist,body) {
    contentEncoding = slistGetContentEncoding(slist)
    if(contentEncoding === undefined) {
        
    } else {
        body = contentEncd(contentEncoding,body)
    }
    return(body)
}


function rawReqBody2Str(body,reqParams) {
    headers = reqParams.headers
    let slist = paramsHeaders2slist(headers)
    ////根据contentType 执行转换
    
    ////如果有压缩执行压缩
    body = reqContentEncd(slist,body)
    //// 默认trnasferEncoding 将会被自动执行
    ////
    return(body)
}




function slistGetContentEncoding(sl) {
    let tl = nvhead.nvhd.sl2tl(sl)
    tl = new tltl.Tlist(...tl)
    tl = tl.getAllK("Content-Encoding")
    let l = Array.from(tl.map((t)=>t[1]))
    l = l.uniqualize()
    return(l[0])
}






function setReqBody(reqParams,handle) {
    ////POSTFIELDS 只是用来决定有没有BODY,与方法无关
    //handle.setOpt(Curl.option.POSTFIELDS,"the post body")
    //空字符串会有content-length 和 content-type
    //handle.setOpt(Curl.option.POSTFIELDS,"")
    /////不做任何设置则什么也没有
    /////POSTFIELDS 具体格式与request content-type有关
    ///// 需要辅助函数变为字符串
    let body = reqParams.body
    if(body === undefined) {
    } else {
        body = rawReqBody2Str(body,reqParams)
        handle.setOpt(Curl.option.POSTFIELDS,body)
    }
    return(handle)
}



function initRes() {
    var r = {}
    r.rawResHead = Buffer.alloc(0)
    r.rawResBody = Buffer.alloc(0)
    r.rawReqHead = Buffer.alloc(0)
    r.rawReqBody = Buffer.alloc(0)
    return(r)
}

function rcvResHead(r,handle) {
    handle.setOpt(Curl.option.HEADERFUNCTION, function(buf, size, nmemb) {
      r.rawResHead = Buffer.concat([r.rawResHead,buf])
      return(size * nmemb)
    })
    r.resFullHeadStr = r.rawResHead.toString()
    [r.resStatusLine,r.resHead] = splitResFullHeadStr(r.resFullHeadStr)
    delete(r.resFullHeadStr)
    return([r,handle])
}
