


class KeyStoneCorners extends HTMLElement {
  connectedCallback(){
    this.style.position = 'absolute'
    const upper_left_corner = document.createElement('keystone-corner')
    upper_left_corner.style.left = '0px'
    upper_left_corner.style.top = '0px'
    const upper_right_corner = document.createElement('keystone-corner')
    upper_right_corner.style.right = '0px'
    upper_right_corner.style.top = '0px'
    const lower_left_corner = document.createElement('keystone-corner')
    lower_left_corner.style.left = '0px'
    lower_left_corner.style.bottom = '0px'
    const lower_right_corner = document.createElement('keystone-corner')
    lower_right_corner.style.right = '0px'
    lower_right_corner.style.bottom = '0px'
    this.appendChild(upper_left_corner)
    this.appendChild(upper_right_corner)
    this.appendChild(lower_left_corner)
    this.appendChild(lower_right_corner)

    this.upper_left = { x: this.offsetLeft, y: this.offsetTop }
    this.upper_right = { x: this.offsetLeft + this.offsetWidth, y: this.offsetTop }
    this.lower_left = { x: this.offsetLeft, y: this.offsetTop + this.offsetHeight }
    this.lower_right = { x: this.offsetLeft + this.offsetWidth, y: this.offsetTop + this.offsetHeight }

    upper_left_corner.addEventListener('set-corner', (e) => {

      this.upper_left = e.detail
      this.setMatrix()
    })

    upper_right_corner.addEventListener('set-corner', (e) => {
      this.upper_right = e.detail
      this.setMatrix()
    })

    lower_left_corner.addEventListener('set-corner', (e) => {
      this.lower_left = e.detail
      this.setMatrix()
    })
    lower_right_corner.addEventListener('set-corner', (e) => {
      this.lower_right = e.detail
      this.setMatrix()
    })
  }

  setMatrix(){
    console.log(this)
    this.style.transform = `matrix3d(
      1,0.5,0.5,0,
      0,1,0,0,
      0,0,1,0
      0,0,0,0
    )`


  }

}

customElements.define('keystone-corners', KeyStoneCorners)





class KeystoneCorner extends HTMLElement {
  connectedCallback(){
    this.innerHTML = '+'
    this.style.border = '1px solid white'
    this.style.width = '40px'
    this.style.height = '40px'
    this.style.borderRadius = '50%'
    this.style.position = 'absolute'
    this.style.textAlign = 'center'
    this.style.fontSize = '24px'
    this.x = 0
    this.y = 0


    this.setAttribute('draggable', true)
    this.addEventListener('dragend', (e) => {
      this.style.left = e.clientX + 'px'
      this.style.top = e.clientY + 'px'
      const end_drag_event = new CustomEvent('set-corner', {detail: {x:e.clientX, y:e.clientY}})
      this.dispatchEvent(end_drag_event)
    })
  }

}

customElements.define('keystone-corner', KeystoneCorner)

