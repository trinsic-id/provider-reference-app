async function refreshOrganizations() {
    tableBody.innerHTML = '';
    showSpinner();
    let response = await axios.get('/api/organizations');
    let tenants = response.data;
    hideSpinner();
    for (let tenant of tenants) {
        let accessToken = await getAccessToken(tenant.tenantId);
        addOrgRow(tenant.imageUrl, tenant.name, tenant.network.networkName, accessToken, tenant.tenantId);
    }
}

function getNetworkId() {
    let networkName = orgNetwork.value;
    return networkName.toLowerCase().replace(' ', '-');
}

async function createOrganization() {
    let networkId = getNetworkId();
    const organization = {
        name: orgName.value,
        imageUrl: null,
        networkId: networkId,
        endorserType: 'Shared'
    }
    showSpinner();
    await axios.post('/api/organizations', organization);
    await refreshOrganizations();
}

async function removeOrganization(organizationId) {
    showSpinner();
    await axios.delete('/api/organizations/' + organizationId);
    await refreshOrganizations();
}

function addOrgRow(imageUrl, name, network, accessToken, orgId) {
    let newRow = document.createElement("TR");
    newRow.innerHTML = `
                        <tr>
                            <th scope="row"><img class="org-image" src="${imageUrl}" alt="Organization Image"/></th>
                            <td>${name}</td>
                            <td>${network}</td>                            
                            <td class="large-col">
                                <span onClick="copyToClipboard('${accessToken}')" class="clickable-text">` + getTokenText(accessToken) + ` <i class="fa fa-copy"></i></span>
                            </td>
                            <td class="small-col">
                                <button type="button" class="btn btn-secondary table-button" onclick="refreshToken('${orgId}')"><i class="fa fa-refresh"></i></button>
                            </td>
                            <td class="small-col">
                                <button type="button" class="btn btn-danger table-button" onclick="removeOrganization('${orgId}')"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>
                       `
    tableBody.appendChild(newRow);
}

async function getAccessToken(organizationId) {
    let response = await axios.get('/api/organizations/' + organizationId);
    return response.data.accessToken;
}

function getTokenText(accessToken) {
    return "******" + accessToken.substr(accessToken.length - 4);
}

async function refreshToken(organizationId) {
    showSpinner();
    let response = await axios.patch('/api/organizations/' + organizationId);
    await refreshOrganizations();
    return response.data.accessToken;
}

function copyToClipboard(text) {
    const listener = function(ev) {
        ev.preventDefault();
        ev.clipboardData.setData('text/plain', text);
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);

    // Add the "show" class to DIV
    snackbar.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

function hideSpinner() {
    spinner.style.display = 'none';
}

function showSpinner() {
    spinner.style.display = 'block';
}
