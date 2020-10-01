// Gallery container
const galleryContainer = document.getElementById('gallery');

// Set empty pictures array for filling through fetch
const pictures = [];

// Scroll up button
const upButton = document.getElementById('up-button');
upButton.addEventListener('click', () => scrollToTop());

// Logo
document.querySelector('h1').addEventListener('click', () => scrollToTop());

fetch('https://picsum.photos/v2/list?limit=100')
    .then(response => response.json())
    .then(data => {

        // Add pictures from api to pictures array
        Object.keys(data).forEach(key => {
            pictures.push({
                url: data[key].download_url,
                author: data[key].author
            })
        });

        // Sort pictures by author name
        pictures.sort(function (a, b) {
            return (a.author.toUpperCase() < b.author.toUpperCase())
                ? -1 : (a.author.toUpperCase() > b.author.toUpperCase()) ? 1 : 0;
        });

        // Set start and end index for picture loading
        let startingIndex = 0;
        let endingIndex = 10;

        showPictures(startingIndex, endingIndex);

        document.addEventListener("scroll", () => {

            if ((window.scrollY) > 200) {
                upButton.classList.remove('d-none');
            } else {
                upButton.classList.add('d-none');
            }

            if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && endingIndex < pictures.length) {

                    startingIndex = endingIndex;
                    endingIndex += 4;

                    showPictures(startingIndex, endingIndex);
            }
        })

    })
    .catch(error => console.log(error.message));

/**
 * Load more pictures.
 *
 * @param startingIndex
 * @param endingIndex
 */
function showPictures(startingIndex, endingIndex) {
    for (let x = startingIndex; x < endingIndex; x++) {
        showPicture(pictures[x]);
    }
}

/**
 * Scroll to window top.
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

/**
 *  Create elements and append styles
 *  for single picture display.
 *
 * @param picture object
 */
function showPicture(picture) {

    // Create html elements
    let imageContainer = document.createElement('div');
    let image = document.createElement('img');
    let author = document.createElement('small');

    // Append and style image container element
    galleryContainer.appendChild(imageContainer);
    imageContainer.classList.add(
        'col-12',
        'col-md-6',
        'd-flex',
        'flex-wrap',
        'align-items-center',
        'justify-content-center',
        'p-0',
        'border',
        'border-white',
        'bg-dark',
        'image-container'
    );

    // Append and style image element
    imageContainer.appendChild(image);
    image.src = picture.url;
    image.alt = picture.author + ' nuotrauka';
    image.classList.add(
        'img-fluid',
        'mh-100',
        'mw-100'
    );

    // Append and style author name (image title) element
    imageContainer.appendChild(author);
    author.innerText = picture.author + ' nuotrauka';
    author.classList.add(
        'text-light',
        'position-absolute',
        'image-title'
    );
}