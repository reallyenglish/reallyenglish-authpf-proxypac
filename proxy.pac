var cache = new Array();
var isDebug = false;
var proxy = "PROXY 113.33.226.118:3128";

function isIntranetHost(host) {
    /* list of hostname authpf users are allowed to use proxy */
    if (    (dnsDomainIs(host, "cms3.reallyenglish.com")) ||
            (dnsDomainIs(host, "worship.reallyenglish.com"))) {
        cache[host] = true;
        return true;
    }
    cache[host] = false;
    return false;
}

function FindProxyForURL(url, host) {

    var lhost = host.toLowerCase();
    host = lhost;

    /* look for host in cache first */
    if ( host in cache ) {
        if (isDebug) { alert ("cache hit"); }
        if (cache[host]) {
            return proxy;
        } else {
            return "DIRECT";
        }
    } else {
        if (isDebug) { alert ("cache miss"); }
    }

    if ( isIntranetHost(host) ) {
        return proxy;
    }
    return "DIRECT";
}

