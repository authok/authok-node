# authok-node

[![Build Status][circleci-image]][circleci-url]
[![NPM version][npm-image]][npm-url]
[![Coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauthok%2Fauthok-node.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauthok%2Fauthok-node?ref=badge_shield)

Node.js 客户端SDK [Authok](https://authok.cn).

## 安装

```bash
npm install authok
```

## 文档

在这里查看文档 [page](https://authok.github.io/authok-node/).

更多可参考我们的 [官方文档](https://docs.authok.cn).

## Node 版本支持

当下 SDK 在 8, 10, 12, 14, 16 等 Node 版本做过测试.

## Authentication API Client

用于访问 Authok 的 [认证API](https://docs.authok.cn/api/authentication).

**AuthenticationClient** 构造函数接受一个可选的 _optional_ client ID, 如果指定，则所有需要 client_id 的端点都会默认使用这个 client ID.

```js
var AuthenticationClient = require('authok').AuthenticationClient;

var authok = new AuthenticationClient({
  domain: '{YOUR_ACCOUNT}.authok.cn',
  clientId: '{OPTIONAL_CLIENT_ID}',
});
```

## Management API Client

The Authok Management API is meant to be used by back-end servers or trusted parties performing administrative tasks. Generally speaking, anything that can be done through the Authok dashboard (and more) can also be done through this API.

Initialize your client class with an API v1 token and a domain.

```js
var ManagementClient = require('authok').ManagementClient;

var management = new ManagementClient({
  token: '{YOUR_API_TOKEN}',
  domain: '{YOUR_ACCOUNT}.authok.com',
});
```

> Note: When using at browser you should use `telemetry: false`.

To obtain **automatically** a Management API token via the ManagementClient, you can specify the parameters `clientId`, `clientSecret` (use a Non Interactive Client) and optionally `scope`.
Behind the scenes the Client Credentials Grant is used to obtain the `access_token` and is by default cached for the duration of the returned `expires_in` value.

```js
var ManagementClient = require('authok').ManagementClient;
var authok = new ManagementClient({
  domain: '{YOUR_ACCOUNT}.authok.com',
  clientId: '{YOUR_NON_INTERACTIVE_CLIENT_ID}',
  clientSecret: '{YOUR_NON_INTERACTIVE_CLIENT_SECRET}',
  scope: 'read:users update:users',
});
```

> Make sure your ClientId is allowed to request tokens from Management API in [Authok Dashboard](https://manage.authok.com/#/apis)

To obtain a Management API token from your node backend, you can use Client Credentials Grant using your registered Authok Non Interactive Clients

```js
var AuthenticationClient = require('authok').AuthenticationClient;

var authok = new AuthenticationClient({
  domain: '{YOUR_ACCOUNT}.authok.com',
  clientId: '{CLIENT_ID}',
  clientSecret: '{CLIENT_SECRET}',
});

authok.clientCredentialsGrant(
  {
    audience: 'https://{YOUR_ACCOUNT}.authok.com/api/v1/',
    scope: '{MANAGEMENT_API_SCOPES}',
  },
  function (err, response) {
    if (err) {
      // Handle error.
    }
    console.log(response.access_token);
  }
);
```

Also you can request a token when the user authenticates using any of our client side SDKs, e.g. [authok.js](https://github.com/authok/authok.js).

## Promises and callbacks

Be aware that all methods can be used with promises or callbacks. However, when a callback is provided no promise will be returned.

```js
// Using callbacks.
management.getUsers(function (err, users) {
  if (err) {
    // handle error.
  }
  console.log(users);
});

// Using promises.
management
  .getUsers()
  .then(function (users) {
    console.log(users);
  })
  .catch(function (err) {
    // Handle error.
  });
```

## Typescript

The types for this library are currently maintained by the community at [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/authok). The team is planning taking ownership of this library as discussed in https://github.com/authok/authok-node/issues/572. After the team has taken ownership we will remove this net from the Readme.

## Troubleshooting

### Getting `Error: Can't resolve 'superagent-proxy'` when bundling with Webpack

We have a dependency on `rest-facade` which `require`s but doesn't include `superagent-proxy`. This SDK doesn't support proxies, so this dependency is not required. To workaround this you can add the following to your `webpack.config.js`:

```
resolve: {
  alias: {
    'superagent-proxy': false
  }
}
```

Or install `superagent-proxy` yourself.


## What is Authok?

Authok helps you to:

- Add authentication with [multiple authentication sources](https://docs.authok.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
- Add authentication through more traditional **[username/password databases](https://docs.authok.com/mysql-connection-tutorial)**.
- Add support for **[linking different user accounts](https://docs.authok.com/link-accounts)** with the same user.
- Support for generating signed [Json Web Tokens](https://docs.authok.com/jwt) to call your APIs and **flow the user identity** securely.
- Analytics of how, when and where users are logging in.
- Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.authok.com/rules).

## Create a free Authok Account

1.  Go to [Authok](https://authok.com) and click "Try Authok for Free".
2.  Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://authok.com/whitehat) details the procedure for disclosing security issues.

## Author

[Authok](https://authok.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

<!-- Vaaaaarrrrsss -->

[npm-image]: https://img.shields.io/npm/v/authok.svg?style=flat-square
[npm-url]: https://npmjs.org/package/authok
[circleci-image]: https://img.shields.io/circleci/project/github/authok/authok-node.svg?branch=master&style=flat-square
[circleci-url]: https://circleci.com/gh/authok/authok-node
[codecov-image]: https://img.shields.io/codecov/c/github/authok/authok-node.svg?style=flat-square
[codecov-url]: https://codecov.io/github/authok/authok-node?branch=master
[license-image]: https://img.shields.io/npm/l/authok.svg?style=flat-square
[license-url]: #license
[downloads-image]: https://img.shields.io/npm/dm/authok.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/authok

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauthok%2Fauthok-node.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauthok%2Fauthok-node?ref=badge_large)
