
export function setCookie(cookieName, cookieValue, expire = null) {


    let data = `${cookieName} = ${cookieValue}; path=/`
    if (expire !== null) {
        data += `; expires=${expire}`
    }
    document.cookie = data
}

export function getCookie(cookieName) {
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    let value = null

    ca.forEach((item) => {
        const data = item.split('=')
        if (data[0].trim() === `${cookieName}`) {
            value = data[1]
        }
    })
    return value
}

export function deleteCookie(cookieName) {
    setCookie(cookieName, '', "Thu, 01 Jan 1970 00:00:01 GMT")
}

export function clearCookies() {
    deleteCookie("access_token")
    deleteCookie("access_token")
}