document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
      event.preventDefault();
      showDomainOptions();
    }
  });
  
  function showDomainOptions() {
    const domains = ['reddit.com', 'youtube.com', 'amazon.com'];
    const searchBox = document.querySelector('input[name="q"]');
    
    // Remove any existing dropdown
    let existingDropdown = document.querySelector('#domain-dropdown');
    if (existingDropdown) {
      existingDropdown.remove();
    }
  
    const dropdown = document.createElement('div');
    dropdown.id = 'domain-dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.backgroundColor = 'white';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.zIndex = '1000';
  
    domains.forEach(domain => {
      const option = document.createElement('div');
      option.textContent = domain;
      option.style.padding = '8px';
      option.style.cursor = 'pointer';
      option.addEventListener('click', () => {
        searchBox.value = `site:${domain} ${searchBox.value.replace(/site:[^ ]+ /g, '')}`;
        dropdown.remove();
        searchBox.form.submit(); // Trigger the form submission
      });
      dropdown.appendChild(option);
    });
  
    document.body.appendChild(dropdown);
    const rect = searchBox.getBoundingClientRect();
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.top = `${rect.bottom}px`;
  }