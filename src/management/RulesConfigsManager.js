const { ArgumentError } = require('rest-facade');
const AuthokRestClient = require('../AuthokRestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * The rules configs manager class provides a simple abstraction for performing CRUD operations
 * on Authok RulesConfigsManager.
 */
class RulesConfigsManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide manager options');
    }

    if (options.baseUrl === null || options.baseUrl === undefined) {
      throw new ArgumentError('Must provide a base URL for the API');
    }

    if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
      throw new ArgumentError('The provided base URL is invalid');
    }

    /**
     * Options object for the Rest Client instance.
     *
     * @type {object}
     */
    const clientOptions = {
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://docs.authok.cn/api/v1#!/RulesConfigsManager Authok RulesConfigsManager}.
     *
     * @type {external:RestClient}
     */
    const authokRestClient = new AuthokRestClient(
      `${options.baseUrl}/rules-configs/:key`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(authokRestClient, options.retry);
  }

  /**
   * Set a new rules config.
   *
   * @example
   * var params = { key: RULE_CONFIG_KEY };
   * var data =   { value: RULES_CONFIG_VALUE };
   *
   * management.rulesConfigs.set(params, data, function (err, rulesConfig) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Rules Config set.
   * });
   * @param   {object}    params        Rule Config parameters.
   * @param   {string}    params.key    Rule Config key.
   * @param   {object}    data          Rule Config Data parameters.
   * @param   {string}    data.value    Rule Config Data value.
   * @param   {Function}  [cb]    Callback function.
   * @returns  {Promise|undefined}
   */
  set(...args) {
    return this.resource.update(...args);
  }

  /**
   * Get all rules configs.
   *
   * @example
   * management.rulesConfigs.getAll(function (err, rulesConfig) {
   *   console.log(rulesConfig.length);
   * });
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Delete an existing rules config.
   *
   * @example
   * management.rulesConfigs.delete({ key: RULE_CONFIG_KEY }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Rules Config deleted.
   * });
   * @param   {object}    params        Rule Configs parameters.
   * @param   {string}    params.key    Rule Configs key.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = RulesConfigsManager;
