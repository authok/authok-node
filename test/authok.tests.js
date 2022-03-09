const { expect } = require('chai');

const authok = require('../src');
const AuthenticationClient = require('../src/auth');
const ManagementClient = require('../src/management');

describe('Authok module', () => {
  it('should expose the AuthenticationClient', () => {
    expect(authok.AuthenticationClient).to.equal(AuthenticationClient);
  });

  it('should expose the ManagementClient', () => {
    expect(authok.ManagementClient).to.equal(ManagementClient);
  });
});
