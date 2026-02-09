async function fetchData(){
    try{
        let art_id;
        try{
            art_id = document.getElementById("art_id").value;
        }
        catch(error){
            console.log("No input provided")
        }
        if (!art_id){
            art_id = Math.floor(Math.random() * 10000)
        }
        data = await checkFetch(art_id)
        for (const keys in data.data){
            if (data.data[keys] == null || data.data[keys] == undefined){
                data.data[keys] = "Unknown"
            }
        }
        // Find image url and display image
        const image_id = String(data.data.image_id)
        const image_url = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`
        const image_element = document.getElementById("art_image")
        image_element.src = image_url
        image_element.style.display = "block"
        // Find title, artist, and description and display
        const title = String(data.data.title)
        const title_element = document.getElementById("art_title")
        title_element.innerHTML = title
        const artist = String(data.data.artist_title)
        const artist_element = document.getElementById("artist_name")
        artist_element.innerHTML = artist
        const description = String(data.data.description)
        const description_element = document.getElementById("art_description")
        description_element.innerHTML = description
    }
    catch(error){
        console.error(error)
    }
}

function checkInput(){
    art_id = document.getElementById("art_id").value;
    if (isNaN(art_id)){
        alert("Please enter a valid number")
    }
    else if (art_id <1000 || art_id > 123199){
        alert("Please enter a valid birthday")
    }
    else {
        fetchData()
    }
}

async function checkFetch(art_id){
    let response = await fetch(`https://api.artic.edu/api/v1/artworks/${art_id}`)
        if(!response.ok){
            while (!response.ok){
                art_id = Math.floor(Math.random() * 10000)
                response = await fetch(`https://api.artic.edu/api/v1/artworks/${art_id}`)
            }
        }
        let data = await response.json()
    return data
}

