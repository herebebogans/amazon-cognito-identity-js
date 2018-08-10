'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */

/** @class */
var CognitoUserSession = function () {
  /**
   * Constructs a new CognitoUserSession object
   * @param {CognitoIdToken} IdToken The session's Id token.
   * @param {CognitoRefreshToken=} RefreshToken The session's refresh token.
   * @param {CognitoAccessToken} AccessToken The session's access token.
   * @param {int} ClockDrift The saved computer's clock drift or undefined to force calculation.
   */
  function CognitoUserSession() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        IdToken = _ref.IdToken,
        RefreshToken = _ref.RefreshToken,
        AccessToken = _ref.AccessToken,
        ClockDrift = _ref.ClockDrift;

    _classCallCheck(this, CognitoUserSession);

    if (AccessToken == null || IdToken == null) {
      throw new Error('Id token and Access Token must be present.');
    }

    this.idToken = IdToken;
    this.refreshToken = RefreshToken;
    this.accessToken = AccessToken;
    this.clockDrift = ClockDrift === undefined ? this.calculateClockDrift() : ClockDrift;
  }

  /**
   * @returns {CognitoIdToken} the session's Id token
   */


  _createClass(CognitoUserSession, [{
    key: 'getIdToken',
    value: function getIdToken() {
      return this.idToken;
    }

    /**
     * @returns {CognitoRefreshToken} the session's refresh token
     */

  }, {
    key: 'getRefreshToken',
    value: function getRefreshToken() {
      return this.refreshToken;
    }

    /**
     * @returns {CognitoAccessToken} the session's access token
     */

  }, {
    key: 'getAccessToken',
    value: function getAccessToken() {
      return this.accessToken;
    }

    /**
     * @returns {int} the session's clock drift
     */

  }, {
    key: 'getClockDrift',
    value: function getClockDrift() {
      return this.clockDrift;
    }

    /**
     * @returns {int} the computer's clock drift
     */

  }, {
    key: 'calculateClockDrift',
    value: function calculateClockDrift() {
      var now = Math.floor(new Date() / 1000);
      var iat = Math.min(this.accessToken.getIssuedAt(), this.idToken.getIssuedAt());

      return now - iat;
    }

    /**
     * Checks to see if the session is still valid based on session expiry information found
     * in tokens and the current time (adjusted with clock drift)
     * @returns {boolean} if the session is still valid
     */

  }, {
    key: 'isValid',
    value: function isValid() {
      var now = Math.floor(new Date() / 1000);
      var adjusted = now - this.clockDrift;

      return adjusted < this.accessToken.getExpiration() && adjusted < this.idToken.getExpiration();
    }
  }]);

  return CognitoUserSession;
}();

exports.default = CognitoUserSession;