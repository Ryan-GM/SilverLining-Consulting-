document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Hide all tab contents
      tabContents.forEach(content => {
        content.style.display = 'none';
      });

      // Show the corresponding tab content
      const tabId = this.getAttribute('id');
      const contentId = tabId.replace('tab', 'content');
      const content = document.getElementById(contentId);
      content.style.display = 'block';
    });
  });

  // Event listener for the form submission
  const sessionForm = document.getElementById('session_form');
  if (sessionForm) {
      sessionForm.addEventListener('submit', async function(event) {
          event.preventDefault(); // Prevent form from submitting traditionally

          // Capture the form data
          const formData = new FormData(this);

          // Convert form data to JSON object
          const data = {
              firstName: formData.get('firstName'),
              lastName: formData.get('lastName'),
              areaCode: formData.get('areaCode'),
              telNum: formData.get('telNum'),
              email: formData.get('email'),
              contactRadios: formData.get('contactRadios'),
              feedback: formData.get('feedback'),
          };

          try {
              // Send the form data to the server
              const response = await fetch('http://localhost:3000/send-email', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
              });

              const result = await response.json();

              // Check if the response is successful
              if (response.ok) {
                console.log('Success:', result.message);
                showCustomAlert(result.message || 'Email sent successfully!');
                // Clear the form after successful submission
                document.getElementById('session_form').reset();
              } else {
                  // Show error alert
                  console.error('Error:', result.message);
                  showCustomAlert('Error: ' + result.message || 'Failed to send the email.');
              }
          } catch (error) {
            console.error('Fetch error:', error);
            showCustomAlert('Error sending the form: ' + error.message);
          }
      });
  }
});

// Custom function to display alert in a non-browser-native way
function showCustomAlert(message) {
  // Create a div to display the message
  const alertBox = document.createElement('div');
  alertBox.innerText = message;
  alertBox.className = 'custom-alert-box';
  
  // Style the alert box
  alertBox.style.position = 'fixed';
  alertBox.style.top = '20px';
  alertBox.style.left = '50%';
  alertBox.style.transform = 'translateX(-50%)';
  alertBox.style.backgroundColor = '#4caf50'; // Green color for success
  alertBox.style.color = 'white';
  alertBox.style.padding = '15px';
  alertBox.style.borderRadius = '5px';
  alertBox.style.boxShadow = '0px 4px 6px rgba(0,0,0,0.1)';
  alertBox.style.zIndex = '9999';
  
  // Append it to the body
  document.body.appendChild(alertBox);

  // Automatically remove the alert box after 3 seconds
  setTimeout(() => {
      document.body.removeChild(alertBox);
  }, 5000); // 3 seconds
}

function openTab(evt, tabName) {
  // Hide all tab content
  var i, tabContent, tabButtons;
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
  }

  // Remove active class from all tab buttons
  tabButtons = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(" active", "");
  }

  // Show the current tab and add active class to the clicked tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
