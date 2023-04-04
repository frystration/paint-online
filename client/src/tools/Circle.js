import Tool from "./Tool";

export default class Circle extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: "draw",
            id: this.id,
            figure: {
                type: "circle",
                x: this.x,
                y: this.y,
                r: this.r,
                color: this.ctx.fillStyle,
                strokeColor: this.ctx.strokeStyle,
                strokeWidth: this.ctx.lineWidth
            }
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;

            this.r = Math.sqrt(width**2  + height**2)/2
            this.x = (this.startX + currentX)/2
            this.y = (this.startY + currentY)/2

            this.draw(this.x, this.y, this.r)
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

    static staticDraw(ctx, x, y, r, color, strokeColor, strokeWidth) {
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc (x, y, r, 0,2*Math.PI)
        ctx.fill()
        ctx.stroke()
    }
}