/**
 * Created by wangsy on 2017/2/14.
 */

//定义map
function Map() {
    this.container = {};
}

//将key-value放入map中
Map.prototype.put = function (key, value) {
    try {
        if (key !== null && key !== "") {
            this.container[key] = value;
        }
    } catch (e) {
        return e;
    }
};

//根据key从map中取出对应的value
Map.prototype.get = function (key) {
    try {
        return this.container[key];
    } catch (e) {
        return e;
    }
};

//判断map中是否包含指定的key
Map.prototype.containsKey = function (key) {
    try {
        for (var p in this.container) {
            if (this.p == key)
                return true;
        }
        return false;

    } catch (e) {
        return e;
    }

};

//判断map中是否包含指定的value
Map.prototype.containsValue = function (value) {
    try {

        for (var p in this.container) {
            if (this.container[p] === value)
                return true;
        }

        return false;

    } catch (e) {
        return e;
    }
};


//删除map中指定的key
Map.prototype.remove = function (key) {
    try {

        delete this.container[key];

    } catch (e) {
        return e;
    }
};

//清空map
Map.prototype.clear = function () {
    try {
        delete this.container;
        this.container = {};

    } catch (e) {
        return e;
    }
};

//判断map是否为空
Map.prototype.isEmpty = function () {
    if (this.keyArray().length === 0)
        return true;
    else
        return false;
};

//获取map的大小
Map.prototype.size = function () {

    return this.keyArray().length;
};

//返回map中的key值数组
Map.prototype.keyArray = function () {

    var keys = [];
    for (var p in this.container) {
        keys.push(p);
    }

    return keys;
};

//返回map中的value值数组
Map.prototype.valueArray = function () {

    var values = [];
    var keys = this.keyArray();
    for (var i = 0; i < keys.length; i++) {
        values.push(this.container[keys[i]]);
    }

    return values;
};

//数组去重方法
Array.prototype.unique = function () {
    this.sort(); //先排序
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== res[res.length - 1]) {
            res.push(this[i]);
        }
    }
    return res;
};
/**
 * 时间日期转换
 * @param date
 * string number date moment
 * @returns {*}
 */
function translateDateToLong(date) {
    if (typeof date == "string") {
        if (date.indexOf("-") == -1 && date.indexOf("/") == -1) {
            return null;
        } else {
            return Date.parse(date.replace(/-/g, "/"));
        }
    } else if (typeof date == "object") {
        if ((moment.isMoment(date))) {
            return new Date(date).getTime();
        } else {
            if (date instanceof Date) {
                return date.getTime();
            } else {
                return null;
            }
        }
    } else if (typeof date == "number") {
        return date;
    } else {
        return date;
    }
}

/**
 * 时间日期转换 TO 一天的开始
 * @param date
 * string number date moment
 * @returns {*}
 */
function translateDateToStartOfDayLong(date) {
    if (!date)
        return "";
    var translateDate = new Date(translateDateToLong(date));
    translateDate.setHours(0);
    translateDate.setMinutes(0);
    translateDate.setSeconds(0);
    translateDate.setMilliseconds(0);
    return translateDate.getTime();
}

/**
 * 时间日期转换 TO 一天的结束
 * @param date
 * string number date moment
 * @returns {*}
 */
function translateDateToEndOfDayLong(date) {
    if (!date)
        return "";
    var translateDate = new Date(translateDateToLong(date));
    translateDate.setHours(23);
    translateDate.setMinutes(59);
    translateDate.setSeconds(59);
    translateDate.setMilliseconds(999);
    return translateDate.getTime();
}

/**
 * 获得年份列表，从date所在的年份到当前年
 * @param date
 * string number date moment
 * @returns {*}
 */
function getYearsList(date) {
    var fromYear = Number(date.getFullYear());
    var toYear = Number(new Date().getFullYear());
    var years = [];
    for (var i = fromYear; i <= toYear; i++) {
        var year = {"key": i, "text": i};
        years.push(year);
    }
    return years;
}


/**
 * 获得年份列表，从1990年到当前年
 * @param date
 * string number date moment
 * @returns {*}
 */
function getYearsList() {
    var fromYear = 1990;
    var toYear = Number(new Date().getFullYear());
    var years = [];
    for (var i = fromYear; i <= toYear; i++) {
        var year = {"key": i.toString(), "text": i.toString()};
        years.push(year);
    }
    return years;
}

function UUID() {
    this.id = this.createUUID();
}

// When asked what this Object is, lie and return it's value
UUID.prototype.valueOf = function () {
    return this.id;
};
UUID.prototype.toString = function () {
    return this.id;
};

//
// INSTANCE SPECIFIC METHODS
//
UUID.prototype.createUUID = function () {
    //
    // Loose interpretation of the specification DCE 1.1: Remote Procedure Call
    // since JavaScript doesn't allow access to internal systems, the last 48 bits
    // of the node section is made up using a series of random numbers (6 octets long).
    //
    var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
    var dc = new Date();
    var t = dc.getTime() - dg.getTime();
    var tl = UUID.getIntegerBits(t, 0, 31);
    var tm = UUID.getIntegerBits(t, 32, 47);
    var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security version is 2
    var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
    var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
    // since detection of anything about the machine/browser is far to buggy,
    // include some more random numbers here
    // if NIC or an IP can be obtained reliably, that should be put in
    // here instead.
    var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
        UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
        UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
        UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
        UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number is two octets long
    return tl + tm + thv + csar + csl + n;
};

//Pull out only certain bits from a very large integer, used to get the time
//code information for the first part of a UUID. Will return zero's if there
//aren't enough bits to shift where it needs to.
UUID.getIntegerBits = function (val, start, end) {
    var base16 = UUID.returnBase(val, 16);
    var quadArray = [];
    var quadString = '';
    var i = 0;
    for (i = 0; i < base16.length; i++) {
        quadArray.push(base16.substring(i, i + 1));
    }
    for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
        if (!quadArray[i] || quadArray[i] === '') quadString += '0';
        else quadString += quadArray[i];
    }
    return quadString;
};

//Replaced from the original function to leverage the built in methods in
//JavaScript. Thanks to Robert Kieffer for pointing this one out
UUID.returnBase = function (number, base) {
    return (number).toString(base).toUpperCase();
};

//pick a random number within a range of numbers
//int b rand(int a); where 0 <= b <= a
UUID.rand = function (max) {
    return Math.floor(Math.random() * (max + 1));
};
function formatTree(nodes) {
    var dictModel = {
        region: [],
        province: [],
        city: [],
        county: []
    };

    var dictModelId = {
        region: [],
        province: [],
        city: [],
        county: []
    };
    var selectRegionId = [];

    var selectRegionTexts = [];

    for (var i = 0; i < nodes.length; i++) {
        dictModelId[nodes[i].original.description].push(nodes[i].id);
    }
    o:for (var j = 0; j < nodes.length; j++) {
        var v = nodes[j];
        var parent = v.parent;
        if (!v.children || v.children.length === 0) {
            for (var noChildIndex in dictModelId) {
                var noChildDictArray = dictModelId[noChildIndex];
                if (noChildDictArray.indexOf(parent) != -1) {
                    continue o;
                }
            }
            selectRegionId.push(v.id);
            selectRegionTexts.push(v.original.text);
            dictModel[v.original.description].push(v.original.key);

        } else {
            for (var index in dictModelId) {
                var dictArray = dictModelId[index];
                if (dictArray.indexOf(parent) != -1) {
                    continue o;
                }
            }
            selectRegionId.push(v.id);
            selectRegionTexts.push(v.original.text);
            dictModel[v.original.description].push(v.original.key);

        }
    }
    return {codes: dictModel, names: selectRegionTexts, ids: selectRegionId};
}

function formatFloat(number, count) {
    if (number === "") {
        return "";
    }
    number = number + "";
    if (number.indexOf(".") == -1) {
        number += ".";
        for (var i = 0; i < count; i++) {
            number += "0";
        }
        return number;
    } else {
        var array = number.split("");
        array.length = array.indexOf(".") + count + 2;
        for (var j = array.length - 1, length = array.length - 1; j >= 0; j--) {
            if (j == length && parseInt(array[j]) < 5) {
                array.length = array.length - 1;
                break;
            }

            if (j == length && parseInt(array[j]) >= 5) {
                array.length = array.length - 1;
                continue;
            }

            if (array[j] === undefined) {
                if (count + 2 > number.length - array.indexOf(".")) {
                    break;
                } else {
                    array[j] = "0";
                    continue;
                }
            }

            if (array[j] === ".") {
                continue;
            }

            if (parseInt(array[j]) + 1 > 9 && j !== 0) {
                array[j] = "0";
                continue;
            }

            if (parseInt(array[j]) + 1 < 10) {
                array[j] = parseInt(array[j]) + 1;
                break;
            }

            array[j] = parseInt(array[j]) + 1;
        }

        return array.join("");
    }
}

//计算日期间隔天数
Date.prototype.getDateDiff = function (timeTo) {
    timeTo = new Date(timeTo);
    timeTo.setHours(0);
    timeTo.setMinutes(0);
    timeTo.setSeconds(0);
    timeTo.setMilliseconds(0);
    timeTo = timeTo.getTime();
    var timeFrom = this;
    timeFrom.setHours(0);
    timeFrom.setMinutes(0);
    timeFrom.setSeconds(0);
    timeFrom.setMilliseconds(0);
    timeFrom = timeFrom.getTime();
    return parseInt(Math.abs(timeFrom - timeTo) / (1000 * 60 * 60 * 24));
};