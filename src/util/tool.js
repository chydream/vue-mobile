export function getCookiesObj (cookies) {
    var arr = cookies.split(";")
    var obj = {}
    for(var i=0;i<arr.length;i++){
        var newArr = arr[i].split("=")
        obj[newArr[0].trim()]=newArr[1]
    }
    return obj
} 