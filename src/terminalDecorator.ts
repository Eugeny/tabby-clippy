import { Injectable } from '@angular/core'
import { bufferTime } from 'rxjs'
import { TerminalDecorator, BaseTerminalTabComponent, BaseSession } from 'tabby-terminal'
import { ClippyService } from './clippy.service'

@Injectable()
export class ClippyDecorator extends TerminalDecorator {
    constructor (
        private clippy: ClippyService,
    ) {
        super()
    }

    attach (tab: BaseTerminalTabComponent): void {
        tab.input$.pipe(bufferTime(3000)).subscribe((buffers: Buffer[])  => {
            if (Buffer.concat(buffers).toString().includes('ls\r')) {
                this.clippy.speak('It looks like you\'re using the "ls" command. Did you know that you can use it to list files?')
            }
        })
        tab.sessionChanged$.subscribe(session => {
            if (session) {
                this.attachToSession(session)
            }
        })
        if (tab.session) {
            this.attachToSession(tab.session)
        }
    }

    private attachToSession (session: BaseSession) {
        session.output$.subscribe(data => {
            if (data.includes('command not found')) {
                this.clippy.speak('It looks like you\'ve typed in an incorrect command. Consider typing in a correct command instead.')
            }
        })
    }
}
