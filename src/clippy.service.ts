import clippy from 'clippyjs'
import { distinctUntilChanged, map } from 'rxjs'
import { Injectable } from '@angular/core'
import { Logger, LogService, ConfigService, HotkeysService } from 'tabby-core'

const CDN = 'https://rawcdn.githack.com/pi0/clippyjs/d88943d529410114c9cea7f01e05de40254cd914'

@Injectable({ providedIn: 'root'})
export class ClippyService {
    private visible = true
    private agent: any
    private logger: Logger

    constructor (
        private config: ConfigService,
        log: LogService,
        hotkeys: HotkeysService,
    ) {
        this.logger = log.create('clippy')

        this.loadAgent()
        this.config.changed$.pipe(
            map(() => this.config.store.clippyPlugin.agent),
            distinctUntilChanged(),
        ).subscribe(() => this.loadAgent())

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = `${CDN}/assets/clippy.css`
        document.querySelector('head').appendChild(link)
        setInterval(() => {
            this.agent?.animate()
        }, 10000)

        hotkeys.hotkey$.subscribe(h => {
            if (h === 'toggle-clippy') {
                this.toggle()
            }
        })
    }

    async loadAgent () {
        const type = this.config.store.clippyPlugin.agent
        this.logger.info(`Loading agent: ${type}`)
        await this.hide()
        clippy.load(type, agent => {
            this.agent = agent
            this.visible = true
            agent.show()
            this.speak('Hello!')
        }, undefined, `${CDN}/assets/agents/`)
    }

    show () {
        if (!this.agent) {
            return
        }
        this.agent.show()
        this.visible = true
        this.logger.info('Shown clippy')
    }

    async hide () {
        if (!this.agent) {
            return
        }
        await new Promise(r => this.agent.hide(false, r))
        this.visible = false
        this.logger.info('Hidden clippy')
    }

    async toggle () {
        if (this.visible) {
            await this.hide()
        } else {
            await this.show()
        }
    }

    speak (what: string) {
        this.logger.info(`Speaking: ${what}`)
        this.agent?.speak(what)
    }
}
