'use strict';

const Common = {
    PROXY_URL : 'https://cors-anywhere.herokuapp.com/',
    BASE_URL : 'https://mobile.nwstbus.com.hk/api6/',
    getCallbackForMobileApi : function (/** Function */ handler) {
        return function (/** string */ data) {
            handler(
                data.split('<br>').filter(
                    function (/** String */ line) {
                        return line !== '';
                    }
                ).map(
                    function (/** String */ line) {
                        return line.split('||');
                    }
                )
            );
        };
    },
    getSyscode : function () {
        const timestamp = Math.round(Date.now() / 1000);
        const timestamp_string = String(timestamp);
        const random = Math.floor(Math.random() * 1000);
        let random_string = String(random);
        while (random_string.length < 4) {
            random_string = '0' + random_string;
        }
        const source_string = timestamp_string.substr(0, timestamp_string.length - 6) + random_string;
        return source_string + md5(source_string + 'firstbusmwymwy');
    },
    callApi : function (/** String */ file, /** Object */ query, /** Function */ callback) {
        $.get(
            Common.PROXY_URL + Common.BASE_URL + 'getnextbus2.php'
            , Object.assign(
                {
                    syscode : Common.getSyscode(),
                    l : 1,
                }
                , query
            )
            , Common.getCallbackForMobileApi(callback)
        );
    }
};