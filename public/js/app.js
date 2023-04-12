const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

document.querySelector('#submit').addEventListener('click', async (e)=>{
    e.preventDefault()
    const address = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const response = await fetch(`http://localhost:3000/weather?address=${address}`)
    const data = await response.json()
    if(data.error)
    {
        messageOne.textContent = data.error
    }
    else
    {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecastData
    }
})

document.querySelector('#fetchLocation').addEventListener('click', (e)=>{
    e.preventDefault()
    if(!navigator.geolocation)
    {
        alert('Location service not enabled!')
    }

    navigator.geolocation.getCurrentPosition(async(position)=>{
        const longitude = position.coords.longitude
        const latitude = position.coords.latitude

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        const response = await fetch(`http://localhost:3000/location?longitude=${longitude}&latitude=${latitude}`)
        const data = await response.json()
        if(data.error)
        {
            messageOne.textContent = data.error
        }
        else
        {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
        }
    })
})
