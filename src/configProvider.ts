import { ConfigProvider } from 'tabby-core'

/** @hidden */
export class ClippyConfigProvider extends ConfigProvider {
    defaults = {
        clippyPlugin: {
            agent: 'Clippy',
        },
        hotkeys: {
            'toggle-clippy': [],
        },
    }
}
