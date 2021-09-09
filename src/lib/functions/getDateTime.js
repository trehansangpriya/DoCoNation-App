// function to convert firestore timestamp to date and time
const getDateTime = (timestamp) => {
    const jsDate = timestamp.toDate()
    const date = jsDate.toDateString()
    const hours = jsDate.getHours() > 12 ? jsDate.getHours() - 12 : jsDate.getHours()
    const minutes = jsDate.getMinutes() < 10 ? '0' + jsDate.getMinutes() : jsDate.getMinutes()
    const ampm = jsDate.getHours() >= 12 ? 'PM' : 'AM'
    const time = `${hours}:${minutes} ${ampm} (IST)`
    const inputDate = `${jsDate.toLocaleString().substring(6, 10)}-${jsDate.toLocaleString().substring(3, 5)}-${jsDate.toLocaleString().substring(0, 2)}`
    const dd = jsDate.getDate()
    const mmm = jsDate.toDateString().substring(4, 7)
    const yyyy = jsDate.getFullYear()
    const birthday = `${dd} ${mmm} ${yyyy}`
    return {
        date,
        time,
        inputDate,
        birthday
    }
}

export default getDateTime