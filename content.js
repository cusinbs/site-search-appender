document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        event.preventDefault();
        showDomainOptions();
    }
});

function showDomainOptions() {
    const domains = ['reddit.com', 'youtube.com', 'amazon.com', 'stackoverflow.com'];
    const searchBox = document.querySelector('textarea[name="q"]');
    
    // Remove any existing dropdown
    let existingDropdown = document.querySelector('#domain-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    const dropdown = document.createElement('div');
    dropdown.id = 'domain-dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.zIndex = '1000';

    // Add input field for custom domain
    const customDomainInput = document.createElement('input');
    customDomainInput.type = 'text';
    customDomainInput.placeholder = 'Add custom domain + Enter ⏎';
    customDomainInput.style.width = 'calc(100% - 20px)';
    customDomainInput.style.margin = '10px';
    customDomainInput.style.padding = '5px';

    customDomainInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const customDomain = customDomainInput.value.trim();
            if (customDomain) {
                addDomainOption(customDomain);
                customDomainInput.value = '';
            }
        }
    });

    dropdown.appendChild(customDomainInput);

    domains.forEach(domain => {
        addDomainOption(domain);
    });

    function addDomainOption(domain) {
        const option = document.createElement('div');
        option.textContent = domain;
        option.style.padding = '10px'; // Adjusted padding for better text wrapping
        option.style.cursor = 'pointer';
        option.style.backgroundColor = '#2e2e2e';
        option.style.borderBottom = '1px solid #444'; // Separator line color
        option.style.whiteSpace = 'normal'; // Allow text to wrap
    
        option.addEventListener('mouseover', () => {
            option.style.backgroundColor = '#444'; // Highlight color on hover
        });
    
        option.addEventListener('mouseout', () => {
            option.style.backgroundColor = '#2e2e2e'; // Reset color on mouse out
        });
        option.addEventListener('click', () => {
            searchBox.value = `site:${domain} ${searchBox.value.replace(/site:[^ ]+ /g, '')}`;
            dropdown.remove();
            searchBox.form.submit(); // Trigger the form submission
        });
    
        dropdown.appendChild(option);
    }

    document.body.appendChild(dropdown);
    const rect = searchBox.getBoundingClientRect();
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.top = `${rect.bottom}px`;
    dropdown.style.width = `${rect.width}px`;
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.top = `${rect.bottom}px`;
    dropdown.style.width = `${rect.width}px`;
    dropdown.style.height = `${rect.height}px`;
    dropdown.style.fontFamily = window.getComputedStyle(searchBox).fontFamily;
    dropdown.style.fontSize = window.getComputedStyle(searchBox).fontSize;
    dropdown.style.color = window.getComputedStyle(searchBox).color;
    dropdown.style.backgroundColor = window.getComputedStyle(searchBox).backgroundColor;
}

document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('input[name="q"]');
    searchBox.style.position = 'relative';
});