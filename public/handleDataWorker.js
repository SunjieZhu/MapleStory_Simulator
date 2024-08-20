self.addEventListener("message", e => {
    postMessage(e.data)
})
