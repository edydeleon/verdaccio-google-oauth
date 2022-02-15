import { GoogleAuthProvider } from 'src/server/google'
import { ParsedPluginConfig } from "src/server/plugin/Config"
import { describe, expect, it } from "vitest"

describe("GoogleAuthProvider", () => {
  describe("getLoginUrl", () => {
    it("initiates OAuth flow with the correct scopes", () => {
      function shouldIncludeRepoScope(repositoryAccess: boolean) {
        const config: Partial<ParsedPluginConfig> = { repositoryAccess }
        const provider = new GoogleAuthProvider(config as ParsedPluginConfig)
        const loginUrl = provider.getLoginUrl("callbackUrl")
        const scope = "&scope=" + encodeURIComponent("openid email profile")

        expect(loginUrl).toContain(scope)
      }

      shouldIncludeRepoScope(true)
      shouldIncludeRepoScope(false)
    })
  })
})
