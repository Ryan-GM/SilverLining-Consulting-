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
  });

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
  
  