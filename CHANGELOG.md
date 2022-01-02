# [1.0.0-beta.14](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2022-01-02)


### Bug Fixes

* **matcher:** add ignore diagnostics code for remote module ([c7a2d68](https://github.com/TomokiMiyauci/tytest/commit/c7a2d688f580488d7848404ad69fb55ef3ec5c93))

# [1.0.0-beta.13](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2022-01-02)


### Features

* **matcher:** add custom module resolver for remote module ([8ee5af0](https://github.com/TomokiMiyauci/tytest/commit/8ee5af0ab76b783a882c542bb8312216e1d91a09))

# [1.0.0-beta.12](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2022-01-02)


### Bug Fixes

* **helper:** add `resolveModuleNames` field for host options ([92a9730](https://github.com/TomokiMiyauci/tytest/commit/92a973017d0d49896589cebd1b74efc841bbd992))

# [1.0.0-beta.11](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2022-01-02)


### Bug Fixes

* **helper:** remove `moduleResolution` and add debug ([33ed285](https://github.com/TomokiMiyauci/tytest/commit/33ed285b5b3cc0ca9885ffa888fd8fc16f32e2f7))

# [1.0.0-beta.10](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2022-01-02)


### Bug Fixes

* **matcher:** add try catch block for debug ([edfcb5e](https://github.com/TomokiMiyauci/tytest/commit/edfcb5e9967c14b0e6ab4ea89a038d5303a49e53))

# [1.0.0-beta.9](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2022-01-02)


### Bug Fixes

* **helper:** change default tsconfig ([c776e56](https://github.com/TomokiMiyauci/tytest/commit/c776e56d5899f27d448c404e18b6e4b2e2339b90))

# [1.0.0-beta.8](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2022-01-01)


### Bug Fixes

* **matcher:** resolve `.ts` import path as Node.js style ([e7c526a](https://github.com/TomokiMiyauci/tytest/commit/e7c526a38fb88eb2510162cf77129a3b9b628216))

# [1.0.0-beta.7](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2022-01-01)


### Bug Fixes

* **helper:** set default `moduleResolution` field ([185953e](https://github.com/TomokiMiyauci/tytest/commit/185953e3a96c45d6bfcb2caaf68b3a21c028defd))

# [1.0.0-beta.6](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2021-12-31)


### Features

* **matcher:** includes deno namespace declareration files ([92bd611](https://github.com/TomokiMiyauci/tytest/commit/92bd6116200a6fd646986fc3d95bbfdcf8df6c11))

# [1.0.0-beta.5](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2021-12-31)


### Bug Fixes

* **matcher:** change declareation lib config to use `es2020` ([557e2f1](https://github.com/TomokiMiyauci/tytest/commit/557e2f12748168afde40322c3171bd9a4a34a1d8))

# [1.0.0-beta.4](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2021-12-31)


### Features

* **helper:** import lib d.ts via CDN with virtual file system ([14c7a89](https://github.com/TomokiMiyauci/tytest/commit/14c7a8968876e5da380daed29abb239874e263b2))

# [1.0.0-beta.3](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-12-31)


### Bug Fixes

* **matcher:** ignore declaretion lib ([d7fd601](https://github.com/TomokiMiyauci/tytest/commit/d7fd60112609380c9c0c19c8bb370765788357e1))

# [1.0.0-beta.2](https://github.com/TomokiMiyauci/tytest/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-12-30)


### Bug Fixes

* **helper:** add resolved path ([8e150b9](https://github.com/TomokiMiyauci/tytest/commit/8e150b972efee1013271684099ed8a5e337bea2c))

# 1.0.0-beta.1 (2021-12-28)


### Features

* add minimal CLI and assertions ([a3f36c1](https://github.com/TomokiMiyauci/tytest/commit/a3f36c1af3192199755cfd09ff1b7456ea46390c))
* export type assertions ([7e626a5](https://github.com/TomokiMiyauci/tytest/commit/7e626a58ad6e631c1250fbd8a0dd4d91521983ad))
* improve assertion message ([80e2b11](https://github.com/TomokiMiyauci/tytest/commit/80e2b11dcba457e0bceb9f7d172bd31f3a3bc1d8))
* **matcher:** add `expectNotAssignable` matcher ([f031b53](https://github.com/TomokiMiyauci/tytest/commit/f031b5369d48fe88e932dbc31ab23155b936c2a6))
* **matcher:** add `expectType` expecter ([dc6e46a](https://github.com/TomokiMiyauci/tytest/commit/dc6e46ab339bb2a290c8be696a10c2774bb990d0))
* **matcher:** add `isNotIdentical` matcher ([dc2d527](https://github.com/TomokiMiyauci/tytest/commit/dc2d527ef65f884daa2085870495bf9c8ac23856))
* **matcher:** use `isTypeIdenticalTo` at `isIdentical` ([3a17e13](https://github.com/TomokiMiyauci/tytest/commit/3a17e132395f20c60dc54cb2d3e46e6bcc92ee20))
