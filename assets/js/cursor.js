

function cursor() {
  var timeout

  function fancyCursor(e) {

    let halfCursorSize = 24
    let scaleMin = 0.5
    let scaleMax = 1
    let finalX = e.pageX - halfCursorSize
    let finalY = e.pageY - halfCursorSize
    
    document.querySelector('.cursor').classList.add('cursor--detail')
    document.querySelector('.cursor').style.transform = 'translate('+finalX+'px,'+finalY+'px) scale('+scaleMin+')'
    
    if(timeout !== undefined) {
      window.clearTimeout(timeout)
    }
    
    timeout = window.setTimeout(function() {
      document.querySelector('.cursor').classList.remove('cursor--detail')
      document.querySelector('.cursor').style.transform = 'translate('+finalX+'px,'+finalY+'px) scale('+scaleMax+')'
    }, 250)
    document.querySelector('.cursor').style.opacity = '1'
  }
  
  function cursorLoader() {
    if(document.querySelector('.cursor__wrapper')) {
      document.querySelector('.cursor__wrapper').addEventListener('mousemove',fancyCursor)
      document.querySelector('.cursor__wrapper').addEventListener('mouseleave',() => {
        document.querySelector('.cursor').style.opacity = '0'
      },false)
      window.addEventListener('scroll', function (e) {
        document.querySelector('.cursor').style.opacity = '0'
      })
    }
  }

  window.addEventListener('load', function() {
    cursorLoader()
  })
}

export default cursor;