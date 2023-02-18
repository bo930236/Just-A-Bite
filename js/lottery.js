const apiUrl =
  'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errorMessage = '系統不穩定，請再試一次'

function getPrize(cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', apiUrl, true)
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      let data
      try {
        data = JSON.parse(xhr.response)
      } catch (error) {
        cb(errorMessage)
        return
      }
      if (!data.prize) {
        cb(errorMessage)
        return
      }
      cb(null, data)
    }
  }
  xhr.onerror = function() {
    cb(errorMessage)
  }
  xhr.send()
}

function showPrize(className, title) {
  const prizes = {
    FIRST: {
      className: 'first-prize',
      title: '恭喜你中頭獎了！日本東京來回雙人遊！'
    },
    SECOND: {
      className: 'second-prize',
      title: '二獎！90 吋電視一台！'
    },
    THIRD: {
      className: 'third-prize',
      title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
    },
    NONE: {
      className: 'none-prize',
      title: '銘謝惠顧'
    }
  }
  document
    .querySelector('.section-lottery')
    .classList.add(prizes[className].className)
  document.querySelector('.lottery-result_title').innerText =
    prizes[className].title
  document.querySelector('.lottery-info').classList.add('hide')
  document.querySelector('.lottery-result').classList.remove('hide')
}

function resetPage() {
  window.location.reload()
}

document.querySelector('.lottery-info_btn').addEventListener('click', () => {
  getPrize((err, data) => {
    if (err) {
      alert(err)
      return
    }
    showPrize(data.prize)
  })
})

document.querySelector('.lottery-result_btn').addEventListener('click', () => {
  resetPage()
})
