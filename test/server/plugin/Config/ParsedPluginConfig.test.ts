import { pluginKey } from "src/constants"
import {
  Config,
  ParsedPluginConfig,
  PluginConfig
} from "src/server/plugin/Config"
import { describe, expect, it } from "vitest"

describe("Config", () => {
  describe("ParsedPluginConfig", () => {
    const enabledPluginConfig = { enabled: true } as any

    const fooPluginConfig: PluginConfig = {
      "client-id": "clientId",
      "client-secret": "clientSecret",
      "domain": "gmail.com",
    }

    const barPluginConfig: PluginConfig = {
      "client-id": "clientId",
      "client-secret": "clientSecret",
      "domain": "gmail.com",
    }

    const minimalPluginConfig: PluginConfig = {
      "client-id": "clientId",
      "client-secret": "clientSecret",
      "domain": "gmail.com",
    }

    const fooConfig: Config = {
      middlewares: { [pluginKey]: enabledPluginConfig },
      auth: { [pluginKey]: fooPluginConfig },
    } as any

    const barConfig: Config = {
      middlewares: { [pluginKey]: barPluginConfig },
      auth: { [pluginKey]: enabledPluginConfig },
    } as any

    const minimalConfig: Config = {
      middlewares: { [pluginKey]: enabledPluginConfig },
      auth: { [pluginKey]: minimalPluginConfig },
    } as any

    it("from auth", () => {
      const pluginConfig = new ParsedPluginConfig(fooConfig)
      expect(pluginConfig.domain).toBe("gmail.com")
    })

    it("from middlewares", () => {
      const pluginConfig = new ParsedPluginConfig(barConfig)
      expect(pluginConfig.domain).toBe("gmail.com")
    })

    it("from auth as environment variable", () => {
      process.env.FOO_ORG = "foo-org"
      const pluginConfig = new ParsedPluginConfig(fooConfig)
      expect(pluginConfig.domain).toBe("gmail.com")
    })

    it("from middlewares as environment variable", () => {
      process.env.BAR_ORG = "bar-org"
      const pluginConfig = new ParsedPluginConfig(barConfig)
      expect(pluginConfig.domain).toBe("gmail.com")
    })

    it("parses boolean environment variables", () => {
      process.env.BAR_ORG = "false"
      const pluginConfig = new ParsedPluginConfig(barConfig)
      expect(pluginConfig.domain).toBe("gmail.com")
    })

    it("uses the documented defaults", () => {
      const pluginConfig = new ParsedPluginConfig(minimalConfig)
      expect(pluginConfig).toMatchInlineSnapshot(`
        ParsedPluginConfig {
          "clientId": "clientId",
          "clientSecret": "clientSecret",
          "config": {
            "auth": {
              "google-oauth": {
                "client-id": "clientId",
                "client-secret": "clientSecret",
                "domain": "gmail.com",
              },
            },
            "middlewares": {
              "google-oauth": {
                "enabled": true,
              },
            },
          },
          "domain": "gmail.com",
          "packages": {},
          "repositoryAccess": true,
          "url_prefix": "",
        }
      `)
    })
  })
})
