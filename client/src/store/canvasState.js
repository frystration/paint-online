import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null
    socket = null
    sessionId = null
    undoList = []
    redoList = []
    username = ""

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    setSocket(socket) {
        this.socket = socket
    }

    setSessionId(id) {
        this.sessionId = id
    }

    setUsername(username) {
        this.username = username
    }

    pushToUndo(data) {
        this.undoList.push(data)

    }

    pushToRedo(data) {
        this.redoList.push(data)
    }

    undo() {
        let ctx = this.canvas.getContext('2d')
        if (this.undoList.length > 0) {
            this.socket.send(JSON.stringify({
                method: "draw",
                id: this.sessionId,
                figure: {
                    type: "undo"
                }
            }))
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    undoWS() {
        let ctx = this.canvas.getContext('2d')
        let dataUrl = this.undoList.pop()
        this.pushToRedo(this.canvas.toDataURL())
        let img = new Image()
        img.src = dataUrl
        img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }
    }


    // undo() {
    //     let ctx = this.canvas.getContext('2d')
    //     if (this.undoList.length > 0) {
    //         let dataUrl = this.undoList.pop()
    //         this.sendToRedo(this.canvas.toDataURL())
    //         let img = new Image()
    //         img.src = dataUrl
    //         img.onload = () => {
    //             ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    //             ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    //         }
    //
    //         this.socket.send(JSON.stringify({
    //             method: "draw",
    //             id: this.sessionId,
    //             figure: {
    //                 type: "undo",
    //                 data: dataUrl
    //             }
    //         }))
    //     } else {
    //         ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    //     }
    //
    // }

    undoSt() {

    }

    sendToUndo(data) {
        this.socket.send(JSON.stringify({
            method: "draw",
            id: this.sessionId,
            figure: {
                type: "pushToUndo",
                data: data
            }
        }))
    }

    redo() {
        let ctx = this.canvas.getContext('2d')
        if (this.redoList.length > 0) {
            this.socket.send(JSON.stringify({
                method: "draw",
                id: this.sessionId,
                figure: {
                    type: "redo"
                }
            }))
        }
    }

    redoWS() {
        let ctx = this.canvas.getContext('2d')
        let dataUrl = this.redoList.pop()
        this.pushToUndo(this.canvas.toDataURL())
        let img = new Image()
        img.src = dataUrl
        img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }
    }
}

export default new CanvasState()