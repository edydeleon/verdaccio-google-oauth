import { Verdaccio } from "src/server/plugin/Verdaccio"
import {
  createRealVerdaccioAuth,
  createTestConfig,
  freezeTimeDuringTests,
  testOAuthToken,
  testUser
} from "test/utils"
import { describe, expect, it } from "vitest"

describe("Verdaccio", () => {
  describe("issueNpmToken", () => {
    freezeTimeDuringTests()

    it("correctly issues a token", async () => {
      const config = createTestConfig()
      const auth = createRealVerdaccioAuth(config)
      const verdaccio = new Verdaccio(config).setAuth(auth)

      const token = await verdaccio.issueNpmToken(testOAuthToken, testUser)
      expect(token).toMatchInlineSnapshot(
        `"QQj9+h4vAdScdEhfulw1y8cJwSsnCYy7b365h2a729Y="`,
      )
    })

    it("respects the api security config", async () => {
      const config = createTestConfig({
        security: { api: { jwt: { sign: { expiresIn: "1d" } } } },
      })
      const auth = createRealVerdaccioAuth(config)
      const verdaccio = new Verdaccio(config).setAuth(auth)

      const token = await verdaccio.issueNpmToken(testOAuthToken, testUser)
      expect(token).toMatchInlineSnapshot(
        `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsX2dyb3VwcyI6WyJnb29nbGUiLCJnaXRodWIvb3duZXIvVEVTVF9PUkciLCJnaXRodWIvb3duZXIvVEVTVF9PUkcvdGVhbS9URVNUX1RFQU0iLCJnaXRodWIvb3duZXIvVEVTVF9PUkcvcmVwby9URVNUX1JFUE8iLCJnb29nbGUiLCJnaXRodWIvVEVTVF9MRUdBQ1lfT1JHIiwiZ2l0aHViL1RFU1RfTEVHQUNZX09SRy9URVNUX0xFR0FDWV9URUFNIiwiZ2l0aHViL293bmVyL2Fub3RoZXJfb3JnIiwiZ2l0aHViL293bmVyL2Fub3RoZXJfb3JnL3RlYW0vYW5vdGhlcl90ZWFtIiwiZ2l0aHViL293bmVyL2Fub3RoZXJfb3JnL3JlcG8vYW5vdGhlcl9yZXBvIiwiZ2l0aHViL2Fub3RoZXJfbGVnYWN5X29yZyIsImdpdGh1Yi9hbm90aGVyX2xlZ2FjeV9vcmcvYW5vdGhlcl9sZWdhY3lfdGVhbSJdLCJuYW1lIjoidGVzdC11c2VybmFtZSIsImdyb3VwcyI6WyIkYWxsIiwiQGFsbCIsIiRhdXRoZW50aWNhdGVkIiwiQGF1dGhlbnRpY2F0ZWQiLCJnb29nbGUiLCJnaXRodWIvb3duZXIvVEVTVF9PUkciLCJnaXRodWIvb3duZXIvVEVTVF9PUkcvdGVhbS9URVNUX1RFQU0iLCJnaXRodWIvb3duZXIvVEVTVF9PUkcvcmVwby9URVNUX1JFUE8iLCJnb29nbGUiLCJnaXRodWIvVEVTVF9MRUdBQ1lfT1JHIiwiZ2l0aHViL1RFU1RfTEVHQUNZX09SRy9URVNUX0xFR0FDWV9URUFNIiwiZ2l0aHViL293bmVyL2Fub3RoZXJfb3JnIiwiZ2l0aHViL293bmVyL2Fub3RoZXJfb3JnL3RlYW0vYW5vdGhlcl90ZWFtIiwiZ2l0aHViL293bmVyL2Fub3RoZXJfb3JnL3JlcG8vYW5vdGhlcl9yZXBvIiwiZ2l0aHViL2Fub3RoZXJfbGVnYWN5X29yZyIsImdpdGh1Yi9hbm90aGVyX2xlZ2FjeV9vcmcvYW5vdGhlcl9sZWdhY3lfdGVhbSIsImdvb2dsZSIsImdpdGh1Yi9vd25lci9URVNUX09SRyIsImdpdGh1Yi9vd25lci9URVNUX09SRy90ZWFtL1RFU1RfVEVBTSIsImdpdGh1Yi9vd25lci9URVNUX09SRy9yZXBvL1RFU1RfUkVQTyIsImdvb2dsZSIsImdpdGh1Yi9URVNUX0xFR0FDWV9PUkciLCJnaXRodWIvVEVTVF9MRUdBQ1lfT1JHL1RFU1RfTEVHQUNZX1RFQU0iLCJnaXRodWIvb3duZXIvYW5vdGhlcl9vcmciLCJnaXRodWIvb3duZXIvYW5vdGhlcl9vcmcvdGVhbS9hbm90aGVyX3RlYW0iLCJnaXRodWIvb3duZXIvYW5vdGhlcl9vcmcvcmVwby9hbm90aGVyX3JlcG8iLCJnaXRodWIvYW5vdGhlcl9sZWdhY3lfb3JnIiwiZ2l0aHViL2Fub3RoZXJfbGVnYWN5X29yZy9hbm90aGVyX2xlZ2FjeV90ZWFtIl0sImlhdCI6MCwibmJmIjowLCJleHAiOjg2NDAwfQ.Md3Ti7KiEKo7EUTgaNsb3JheDn_mREUf_f-XdvZ1o-U"`,
      )
    })
  })
})
