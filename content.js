document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        event.preventDefault();
        showDomainOptions();
    }
});

function showDomainOptions() {
    const searchBox = document.querySelector('textarea[name="q"]');
    removeExistingDropdown();
    const dropdown = createDropdown();
    const customDomainInput = createCustomDomainInput(dropdown);
    dropdown.appendChild(customDomainInput);
    loadDomains(dropdown);
    positionDropdown(dropdown, searchBox);
    document.body.appendChild(dropdown);
}

function removeExistingDropdown() {
    let existingDropdown = document.querySelector('#domain-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }
}

function createDropdown() {
    const dropdown = document.createElement('div');
    dropdown.id = 'domain-dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.zIndex = '1000';
    return dropdown;
}

function createCustomDomainInput(dropdown) {
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
                addDomainOption(dropdown, customDomain);
                saveDomain(customDomain);
                customDomainInput.value = '';
            }
        }
    });
    return customDomainInput;
}

function loadDomains(dropdown) {
    chrome.storage.local.get({ domains: null }, function(result) {
        let domains = result.domains;
        if (!domains) {
            domains = ['reddit.com', 'youtube.com', 'amazon.com', 'stackoverflow.com'];
            chrome.storage.local.set({ domains: domains });
        }
        domains.forEach(domain => {
            addDomainOption(dropdown, domain);
        });
    });
}

function addDomainOption(dropdown, domain) {
    const option = document.createElement('div');
    option.style.display = 'flex';
    option.style.alignItems = 'center';
    option.style.padding = '10px';
    option.style.cursor = 'pointer';
    option.style.backgroundColor = '#2e2e2e';
    option.style.borderBottom = '1px solid #444';
    option.style.whiteSpace = 'normal';
    option.style.color = 'white';

    const domainText = document.createElement('span');
    domainText.textContent = domain;
    domainText.style.flexGrow = '1';

    const removeButton = createRemoveButton(domain, option);

    option.appendChild(domainText);
    option.appendChild(removeButton);
    addOptionEventListeners(option, domain);
    dropdown.appendChild(option);
}

function createRemoveButton(domain, option) {
    const removeButton = document.createElement('span');
    removeButton.className = 'ExCKkf z1asCe rzyADb';
    removeButton.innerHTML = '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
    removeButton.style.cursor = 'pointer';
    removeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        removeDomain(domain);
        option.remove();
    });
    return removeButton;
}

function addOptionEventListeners(option, domain) {
    option.addEventListener('mouseover', () => {
        option.style.backgroundColor = '#444';
    });
    option.addEventListener('mouseout', () => {
        option.style.backgroundColor = '#2e2e2e';
    });
    option.addEventListener('click', () => {
        const searchBox = document.querySelector('textarea[name="q"]');
        searchBox.value = `site:${domain} ${searchBox.value.replace(/site:[^ ]+ /g, '')}`;
        document.querySelector('#domain-dropdown').remove();
        searchBox.form.submit();
    });
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

function positionDropdown(dropdown, searchBox) {
    const rect = searchBox.getBoundingClientRect();
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