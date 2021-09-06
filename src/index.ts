import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import TabbyCoreModule, { ConfigProvider, HotkeyProvider, TabContextMenuItemProvider } from 'tabby-core'
import { TerminalDecorator } from 'tabby-terminal'
import { SettingsTabProvider } from 'tabby-settings'

import { ClippyConfigProvider } from './configProvider'
import { ClippySettingsTabProvider } from './settingsTabProvider'
import { ClippySettingsTabComponent } from './settingsTab.component'
import { ClippyDecorator } from './terminalDecorator'
import { ClippyHotkeyProvider } from './hotkeyProvider'
import { ClippyContextMenuProvider } from './contextMenu'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabbyCoreModule,
    ],
    providers: [
        { provide: TabContextMenuItemProvider, useClass: ClippyContextMenuProvider, multi: true },
        { provide: HotkeyProvider, useClass: ClippyHotkeyProvider, multi: true },
        { provide: ConfigProvider, useClass: ClippyConfigProvider, multi: true },
        { provide: SettingsTabProvider, useClass: ClippySettingsTabProvider, multi: true },
        { provide: TerminalDecorator, useClass: ClippyDecorator, multi: true },
    ],
    entryComponents: [
        ClippySettingsTabComponent,
    ],
    declarations: [
        ClippySettingsTabComponent,
    ],
})
export default class ClippyModule { }
