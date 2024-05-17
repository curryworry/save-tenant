// Fetch country data from the countries.json file
fetch('countries.json')
  .then(response => response.json())
  .then(data => {
    const countries = data.countries;

    // Get the user's country using the IP-based geolocation API
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(geoData => {
        const userCountry = geoData.country_name;
        const locationMessage = document.getElementById('location-message');
        const confirmLocationButton = document.getElementById('confirm-location');
        const changeLocationButton = document.getElementById('change-location');
        const countrySelect = document.getElementById('country-select');
        const optionsContainer = document.getElementById('options-container');
        const postExperienceButton = document.getElementById('post-experience');
        const browseExperiencesButton = document.getElementById('browse-experiences');

        // Function to populate the country select options
        function populateCountrySelect() {
          countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.text = country;
            countrySelect.add(option);
          });
        }

        // Display the detected country and show the confirm/change buttons
        locationMessage.textContent = `We have detected that you're in ${userCountry}. Is this correct?`;
        confirmLocationButton.style.display = 'inline-block';
        changeLocationButton.style.display = 'inline-block';

        // Event listener for the confirm location button
        confirmLocationButton.addEventListener('click', () => {
          // Show the options container
          optionsContainer.style.display = 'block';
        });

        // Event listener for the change location button
        changeLocationButton.addEventListener('click', () => {
          populateCountrySelect();
          countrySelect.style.display = 'block';
          confirmLocationButton.style.display = 'none';
          changeLocationButton.style.display = 'none';
        });

        // Event listener for the country select
        countrySelect.addEventListener('change', () => {
          const selectedCountry = countrySelect.value;
          console.log(`Selected country: ${selectedCountry}`);
          // Show the options container
          optionsContainer.style.display = 'block';
        });

        // Event listener for the "Post an Experience" button
        postExperienceButton.addEventListener('click', () => {
          // Show the post experience form
          const postExperienceForm = document.getElementById('post-experience-form');
          postExperienceForm.style.display = 'block';

          // Add event listener for rating stars
          const stars = document.querySelectorAll('#rating-stars .star');
          const ratingInput = document.getElementById('rating');

          stars.forEach((star, index) => {
            star.addEventListener('click', () => {
              ratingInput.value = index + 1;
              updateRatingStars(index + 1);
            });

            star.addEventListener('mouseover', () => {
              updateRatingStars(index + 1);
            });

            star.addEventListener('mouseout', () => {
              updateRatingStars(ratingInput.value);
            });
          });

          // Function to update the rating star styles
          function updateRatingStars(rating) {
            stars.forEach((star, index) => {
              if (index < rating) {
                star.classList.add('active');
              } else {
                star.classList.remove('active');
              }
            });
          }

          // Add event listener for form submission
          const experienceForm = document.getElementById('experience-form');
          experienceForm.addEventListener('submit', (event) => {
            console.log('submitted');
          });
        }); // Missing closing parenthesis added here
      })
      .catch(error => {
        console.error('Error fetching location:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching country data:', error);
  });