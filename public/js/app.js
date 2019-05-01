console.log('client side JS loaded')

const form = document.querySelector('form')
const searchInput = document.querySelector('input')
const successResponse = document.getElementById('success')
const failureResponse = document.getElementById('failure')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    successResponse.innerHTML = 'loading...'
    failureResponse.innerHTML = ''
    fetch(`http://localhost:3000/weather?address=${searchInput.value}`).then((response) => {
        response.json().then(data => {
            if (data.error) {
                successResponse.innerHTML = data.error
            } else {
                successResponse.innerHTML = data.forecast
                failureResponse.innerHTML = data.location
            }
        })
    })
})