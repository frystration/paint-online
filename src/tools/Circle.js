import Tool from "./Tool";

export default class Circle extends Tool {
    constructor(canvas) {
        super(canvas)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
    }

    mouseDownHandler(e) {
        let canvasData = this.canvas.toDataURL()
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = canvasData
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;

            let r = Math.sqrt(width**2  + height**2)/2
            let x = this.startX
            let y = this.startY

            this.draw(x, y, r)
        }
    }

    draw(x, y, r) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc (x, y, r, 0,2*Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
}