'use strict';

const documents = [{
  recipient: 'user1',
  uploadedBy: 'admin1',
  name: 'NDA',
  description: 'Read this, bitch',
  type: 'Contract',
  document: 'https://res.cloudinary.com/drtjvxqyi/image/upload/v1539441337/samplecontract.pdf'
},
{
  recipient: 'user2',
  uploadedBy: 'admin1',
  name: 'Supplier Agreement',
  description: 'We hate contracts, too',
  type: 'Contract',
  document: 'https://res.cloudinary.com/drtjvxqyi/image/upload/v1539442512/agreement.pdf'
},
{
  recipient: 'majo',
  uploadedBy: 'admin2',
  name: 'Presentation on life',
  description: 'Because we can',
  type: 'Presentation',
  document: 'https://res.cloudinary.com/drtjvxqyi/image/upload/v1539441408/Productlifecycle.pdf'
},
{
  recipient: 'majo1',
  uploadedBy: 'admin3',
  name: 'Proposal',
  description: 'Life is good',
  type: 'Contract',
  document: 'https://res.cloudinary.com/drtjvxqyi/image/upload/v1539441337/samplecontract.pdf'
}];

module.exports = documents;
