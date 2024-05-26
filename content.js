document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        event.preventDefault();
        showDomainOptions();
    }
});

function showDomainOptions() {
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
    customDomainInput.placeholder = 'Add custom domain then hit Enter ⏎';
    customDomainInput.style.width = 'calc(100% - 20px)';
    customDomainInput.style.margin = '10px';
    customDomainInput.style.padding = '5px';

    customDomainInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const customDomain = customDomainInput.value.trim();
            if (customDomain) {
                addDomainOption(customDomain);
                saveDomain(customDomain);
                customDomainInput.value = '';
            }
        }
    });

    dropdown.appendChild(customDomainInput);

    // Load domains from local storage
    chrome.storage.local.get({ domains: null }, function(result) {
        let domains = result.domains;
        if (!domains) {
            // Set initial domains if not present
            domains = ['reddit.com', 'youtube.com', 'amazon.com', 'stackoverflow.com'];
            chrome.storage.local.set({ domains: domains });
        }
        domains.forEach(domain => {
            addDomainOption(domain);
        });
    });

    function addDomainOption(domain) {
        const option = document.createElement('div');
        option.style.display = 'flex';
        option.style.alignItems = 'center';
        option.style.padding = '10px'; // Adjusted padding for better text wrapping
        option.style.cursor = 'pointer';
        option.style.backgroundColor = '#2e2e2e';
        option.style.borderBottom = '1px solid #444'; // Separator line color
        option.style.whiteSpace = 'normal'; // Allow text to wrap

        const domainText = document.createElement('span');
        domainText.textContent = domain;
        domainText.style.flexGrow = '1';

        const removeButton = document.createElement('span');
        removeButton.className = 'ExCKkf z1asCe rzyADb';
        removeButton.innerHTML = '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
        removeButton.style.cursor = 'pointer';
        removeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            removeDomain(domain);
            option.remove();
        });

        option.appendChild(domainText);
        option.appendChild(removeButton);

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

    function saveDomain(domain) {
        chrome.storage.local.get({ domains: [] }, function(result) {
            const domains = result.domains;
            if (!domains.includes(domain)) {
                domains.push(domain);
                chrome.storage.local.set({ domains: domains });
            }
        });
    }

    function removeDomain(domain) {
        chrome.storage.local.get({ domains: [] }, function(result) {
            let domains = result.domains;
            domains = domains.filter(d => d !== domain);
            chrome.storage.local.set({ domains: domains });
        });
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