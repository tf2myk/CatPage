

let matches = [];
let galleryContainer;
let contentSelector;

document.addEventListener('DOMContentLoaded', () => 
{

    contentSelector = document.querySelector('select#view-selector');
    const galleryContainer = document.getElementById('gallery-container');
    // Listen for change event on the selector
    contentSelector.addEventListener('change', () => {
      const selectedOption = contentSelector.value;
      appendChildrenToContainer(selectedOption, galleryContainer);
    });
   
    //Grabbing the item from shared storage for the fetch
    const searched = sessionStorage.getItem('imageUrl');
    if(searched)
    {
        //imgElement = document.querySelector('.layout-container');

        const imgElement = document.querySelector('img#compare');
        //console.log(imgElement);
        imgElement.src = searched;
    }
    else
    {
        console.log("searched is not in local storage");
    }

    // Logic for Searrching
    const dataFromLocalStorage = sessionStorage.getItem('imageUrl');

          fetch('/api/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: dataFromLocalStorage }),
          })
          .then(response => response.json())
          .then(data => {
            //console.log('Received JSON data:', data);
            //console.log(data);
            matches = data.visual_matches;
            console.log(data.visual_matches.length);
            let arraysize = data.visual_matches.length;
            let counter = 0;
            const galleryContainer = document.getElementById('gallery-container');
            for(let i = 0; i < arraysize; i++ )
            {
            
                //console.log(data.visual_matches[i].thumbnail);

                link = data.visual_matches[i].link;

                if (counter > 10)
                {
                  break;
                }
                //else if(link.includes('https://www.ecotradegroup.com/'))
                else if(link.includes('http'))
                {
                  const galleryItem = document.createElement('div');
                  galleryItem.className = 'gallery-item';

                  const thumbnailImage = document.createElement('img');
                  thumbnailImage.src = data.visual_matches[i].thumbnail;
                  thumbnailImage.alt = data.visual_matches[i].title;

                  const link = document.createElement('a');
                  link.href = data.visual_matches[i].link;
                  link.textContent = 'Visit';

                  galleryItem.appendChild(thumbnailImage);
                  galleryItem.appendChild(link);

                  galleryContainer.appendChild(galleryItem);

                  counter += 1;
                }

                

                

            }
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});



function appendChildrenToContainer(optionValue, contentContainer) 
{
  // Clear the container
  let picker = "";
  contentContainer.innerHTML = '';
  console.log(optionValue);
  if(optionValue == "None")
  {
    picker = "None";
  }

  if(optionValue == "Ecotrade")
  {
    picker = "ecotrade";
  }

  // Loop and append children based on the optionValue
  let counter = 0;

  for(let i = 0; i < matches.length; i++ )
  {


                link = matches[i].link;

                if (counter > 10)
                {
                  break;
                }
                else if(link.includes('ecotrade') && picker == "ecotrade")
                {
                  const galleryItem = document.createElement('div');
                  galleryItem.className = 'gallery-item';

                  const thumbnailImage = document.createElement('img');
                  thumbnailImage.src = matches[i].thumbnail;
                  thumbnailImage.alt = matches[i].title;

                  const link = document.createElement('a');
                  link.href = matches[i].link;
                  link.textContent = 'Visit';

                  galleryItem.appendChild(thumbnailImage);
                  galleryItem.appendChild(link);

                  contentContainer.appendChild(galleryItem);

                  counter += 1;
                }
                else if(picker == "None")
                {
                  const galleryItem = document.createElement('div');
                  galleryItem.className = 'gallery-item';

                  const thumbnailImage = document.createElement('img');
                  thumbnailImage.src = matches[i].thumbnail;
                  thumbnailImage.alt = matches[i].title;

                  const link = document.createElement('a');
                  link.href = matches[i].link;
                  link.textContent = 'Visit';

                  galleryItem.appendChild(thumbnailImage);
                  galleryItem.appendChild(link);

                  contentContainer.appendChild(galleryItem);

                  counter += 1;
                  
                }
                else
                {
                  console.log("No Selection");
                }

  }
  
}







