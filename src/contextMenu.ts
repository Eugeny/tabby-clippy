import { Injectable } from '@angular/core'
import { MenuItemOptions } from 'tabby-core'
import { BaseTerminalTabComponent, TerminalContextMenuItemProvider } from 'tabby-terminal'
import { ClippyService } from './clippy.service'

@Injectable()
export class ClippyContextMenuProvider extends TerminalContextMenuItemProvider {
    weight = 10

    constructor (
        private clippy: ClippyService,
    ) {
        super()
    }

    async getItems (tab: BaseTerminalTabComponent): Promise<MenuItemOptions[]> {
        return [
            {
                label: 'Toggle Clippy',
                click: () => {
                    this.clippy.speak(`Bye bye ${tab.title}!`)
                    this.clippy.toggle()
                },
            },
        ]
    }
}
