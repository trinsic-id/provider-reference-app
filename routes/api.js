const express = require('express');
const router = express.Router();

const { ProviderServiceClient, ProviderCredentials } = require('@trinsic/service-clients');
require('dotenv').config();


const client = new ProviderServiceClient(
    new ProviderCredentials(process.env.PROVIDER_TOKEN),
    { noRetryPolicy: true });

router.post('/organizations', async function (req, res) {
  let params = {
    tenantParameters: {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      networkId: req.body.networkId,
      endorserType: req.body.endorserType
    }
  }
  await client.createTenant(params);
  res.sendStatus(200);
});

router.delete('/organizations/:organizationId', async function (req, res) {
  let tenantId = req.params.organizationId;
  await client.deleteTenant(tenantId);
  res.sendStatus(200);
});

router.get('/organizations/:organizationId', async function (req, res) {
  let result = await client.getTenantKeys(req.params.organizationId);
  res.status(200).send(result);
});

router.get('/organizations', async function (req, res) {
  let tenants = await client.listTenants();
  res.status(200).send(tenants);
});

router.patch('/organizations/:organizationId', async function (req, res) {
  let result = await client.changeTenantKeys(req.params.organizationId);
  res.status(200).send(result);
});

module.exports = router;
