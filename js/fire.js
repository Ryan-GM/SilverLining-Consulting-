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
  