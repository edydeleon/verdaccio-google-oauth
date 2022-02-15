import { pluginKey } from "src/constants"
import { AuthCore } from "src/server/plugin/AuthCore"
import { Config } from "src/server/plugin/Config"
import {
  createTestAuthCore,
  createTestPluginConfig,
  testLoginOrgGroup, testUsername,
  unrelatedOrgGroup
} from "test/utils"
import { beforeEach, describe, expect, it } from "vitest"

describe("AuthCore", () => {
  describe("authenticate", () => {
    let core: AuthCore

    const configWithMandatoryDomain: Partial<Config> = {
      auth: {
        [pluginKey]: createTestPluginConfig({ domain: "gmail.com" }),
      },
    }

    const configWithoutMandatoryLoginOrg: Partial<Config> = {
      auth: {
        [pluginKey]: createTestPluginConfig({ domain: "gmail.com" }),
      },
    }

    function expectAccessGranted(groups: string[]) {
      const result = core.authenticate(testUsername, groups)
      return expect(result).toBe(true)
    }

    function expectAccessDenied(groups: string[]) {
      const result = core.authenticate(testUsername, groups)
      return expect(result).toBe(false)
    }

    describe("with mandatory login org", () => {
      beforeEach(() => {
        core = createTestAuthCore(configWithMandatoryDomain)
      })

      it("should grant login access", () => {
        expectAccessGranted([testLoginOrgGroup])
        expectAccessGranted([unrelatedOrgGroup, testLoginOrgGroup])
      })

      it("should deny login access", () => {
        expectAccessDenied([])
        expectAccessDenied([unrelatedOrgGroup])
      })
    })

    describe("without mandatory login org", () => {
      beforeEach(() => {
        core = createTestAuthCore(configWithoutMandatoryLoginOrg)
      })

      it("should grant login access", () => {
        expectAccessGranted([testLoginOrgGroup])
        expectAccessGranted([unrelatedOrgGroup, testLoginOrgGroup])
      })

      it("should deny login access", () => {
        expectAccessDenied([])
      })
    })
  })
})
