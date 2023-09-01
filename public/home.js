document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const imageInput = document.getElementById('image-input');
    const resultDiv = document.getElementById('result');

  
    imageInput.addEventListener('input', async (e) => {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
  
      const formData = new FormData(form);
      formData.set('image', file);
  
      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          const data = await response.json();
          //console.log(data);
          resultDiv.textContent = 'Image uploaded successfully. Image URL: ' + data.imageUrl;
          var encodedObjectName = data.imageUrl.replace(/ /g, '%20');
          console.log(encodedObjectName);
          const imageUrl = encodedObjectName;
          //console.log(`LINK TO BUCKET FROM RESPONSE: ${data.imageUrl}`)

          sessionStorage.setItem('imageUrl', imageUrl);
          

          window.location.replace('/results');
        } else {
          resultDiv.textContent = 'Image upload failed. indexscript.js';

          
        }

      } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred while uploading the image. indexscript';
      }
    });
  });