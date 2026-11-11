import * as c from './content'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ToolStrip } from './components/ToolStrip'
import { Outcomes } from './components/Outcomes'
import { HowItWorks } from './components/HowItWorks'
import { GateLog } from './components/GateLog'
import { Exposure } from './components/Exposure'
import { Policies } from './components/Policies'
import { Compare } from './components/Compare'
import { Delivery } from './components/Delivery'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-zk-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Nav links={c.nav} />
      <main id="main">
        <Hero agents={c.agents} scenarios={c.scenarios} />
        <ToolStrip items={c.tools} />
        <Outcomes items={c.outcomes} />
        <HowItWorks steps={c.steps} />
        <GateLog feed={c.gateFeed} stopped={c.stopped} />
        <Exposure />
        <Policies />
        <Compare alternatives={c.alternatives} rows={c.compareRows} />
        <Delivery content={c.delivery} />
        <Faq items={c.faqs} />
        <FinalCta />
      </main>
      <Footer content={c.footer} />
    </>
  )
}
