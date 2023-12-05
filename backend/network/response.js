exports.sucess = (req, res, message, status) => {
    let status_code = status || 200;
    let message_info = message;
    res.status(status).send({
        error: false,
        status: status_code,
        message: message_info
    })
}
exports.sucess_page = (req, res, site, status) => {
    let status_code = status || 200;
    res.status(status).sendFile(site.page, site.options)
}
exports.error = (req, res, message, status) => {
    let status_code = status || 500;
    let message_info = message;
    res.status(status).send({
        error: true,
        status: status_code,
        message: message_info
    })
}