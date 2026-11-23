import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle, ArrowRight, BarChart3, BookOpen, Bot, CheckCircle2,
  Circle, ExternalLink, FileSearch, Loader2, Mail, Menu, Play, Quote,
  Search, ShieldCheck, Sparkles, X
} from "lucide-react";

const sources = [
  { id: 1, title: "Generative AI in Higher Education: Evidence and Practice", type: "Research report", excerpt: "Students value speed and accessibility, but frequently struggle to verify generated claims and references.", support: 96 },
  { id: 2, title: "Designing Trustworthy Retrieval-Augmented Systems", type: "Technical paper", excerpt: "Inline citations and source-level confidence indicators can improve verification behavior when provenance is visible.", support: 91 },
  { id: 3, title: "University Student Research Workflow Interviews", type: "User research", excerpt: "Participants moved repeatedly between AI chat, academic databases, notes, and citation tools.", support: 88 },
];

const answers = [
  { text: "Students mainly use generative AI to accelerate early-stage discovery and summarisation", cite: 1 },
  { text: "but trust declines when answers do not show traceable evidence", cite: 2 },
  { text: "A high-value product opportunity is therefore a single research workspace that links every claim to its source and turns verified findings into structured notes", cite: 3 },
];

const metrics = [["Citation accuracy", "92%", "+18 pts"], ["Task completion", "84%", "+26 pts"], ["Median research time", "6.8 min", "-41%"]];

function Button({ children, className = "", secondary = false, ...props }) {
  return <button className={`button ${secondary ? "button-secondary" : ""} ${className}`} {...props}>{children}</button>;
}
function Badge({ children, dark = false }) { return <span className={`badge ${dark ? "badge-dark" : ""}`}>{children}</span>; }

function Nav({ onDemo }) {
  const [open, setOpen] = useState(false);
  return <header className="nav"><div className="container nav-inner">
    <a href="#top" className="brand"><span className="brand-icon"><FileSearch size={18}/></span><span><b>SourceLens</b><small>AI Research Agent</small></span></a>
    <nav className="desktop-nav"><a href="#problem">Problem</a><a href="#solution">Solution</a><a href="#process">Process</a><a href="#results">Results</a><Button onClick={onDemo}>Try the prototype</Button></nav>
    <button className="icon-button mobile-only" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  </div>{open && <div className="mobile-menu"><a href="#problem">Problem</a><a href="#solution">Solution</a><a href="#process">Process</a><a href="#results">Results</a><Button onClick={onDemo}>Try prototype</Button></div>}</header>;
}

function Prototype({ close }) {
  const [query, setQuery] = useState("How can universities help students verify AI-generated research?");
  const [phase, setPhase] = useState("idle");
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(1);
  const steps = ["Understanding the research question", "Searching 18 verified documents", "Comparing evidence and contradictions", "Writing an answer with citations"];
  const run = async () => {
    if (!query.trim() || phase === "running") return;
    setPhase("running"); setStep(0);
    for (let i=0;i<steps.length;i++) { setStep(i); await new Promise(r => setTimeout(r, 650)); }
    setPhase("done");
  };
  return <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <motion.div className="prototype" initial={{y:24,scale:.98}} animate={{y:0,scale:1}}>
      <div className="prototype-head"><div className="brand"><span className="brand-icon"><Bot size={18}/></span><span><b>SourceLens Workspace</b><small>Evidence-first research mode</small></span></div><button className="icon-button" onClick={close}><X size={19}/></button></div>
      <div className="prototype-grid"><section className="prototype-main"><Badge><ShieldCheck size={13}/> Verified-source mode</Badge><h2>Ask a research question.</h2><p className="muted">The agent plans the task, reviews evidence, and cites every important claim.</p>
        <div className="search-box"><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}/><Button onClick={run} disabled={phase==="running"}>{phase==="running"?<Loader2 className="spin"/>:<Search size={17}/>} Research</Button></div>
        {phase==="idle" && <div className="starter-grid">{["Compare three sources","Find conflicting evidence","Create verified notes"].map((x,i)=><button key={x} onClick={()=>setQuery(["Compare the strongest evidence on AI literacy interventions","What evidence conflicts on student use of generative AI?","Create verified notes about trustworthy AI research tools"][i])}><Sparkles size={15}/>{x}</button>)}</div>}
        {phase==="running" && <div className="trace"><div className="trace-top"><b>Agent execution trace</b><span>{Math.round(((step+1)/steps.length)*100)}%</span></div><div className="progress"><span style={{width:`${((step+1)/steps.length)*100}%`}}/></div>{steps.map((s,i)=><div className="trace-row" key={s}>{i<step?<CheckCircle2 className="success" size={17}/>:i===step?<Loader2 className="spin success" size={17}/>:<Circle size={17}/>}<span>{s}</span></div>)}</div>}
        {phase==="done" && <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="answer"><div className="section-row"><h3>Evidence-backed answer</h3><Badge>3 claims · 3 sources</Badge></div><div className="answer-card">{answers.map((a,i)=><React.Fragment key={a.cite}>{a.text}<button className="citation" onClick={()=>setSelected(a.cite)}>{a.cite}</button>{i<answers.length-1?". ":"."}</React.Fragment>)}<div className="warning"><b><AlertTriangle size={16}/> Limit to consider</b><p>The available evidence focuses on higher education and should not automatically be generalised to younger students.</p></div></div><div className="answer-actions"><Button secondary><BookOpen size={15}/>Save as research note</Button><Button secondary><Quote size={15}/>Export APA references</Button></div></motion.div>}
      </section><aside className="evidence"><div className="section-row"><b>Evidence panel</b><small>18 reviewed</small></div>{sources.map(s=><button key={s.id} onClick={()=>setSelected(s.id)} className={`source ${selected===s.id?"active":""}`}><div className="section-row"><span className="source-id">{s.id}</span><small>{s.support}% support</small></div><b>{s.title}</b><em>{s.type}</em>{selected===s.id&&<p>“{s.excerpt}”</p>}</button>)}</aside></div>
    </motion.div></motion.div>;
}

function App() {
  const [demo,setDemo]=useState(false);
  return <div id="top"><Nav onDemo={()=>setDemo(true)}/><main>
    <section className="hero"><div className="container hero-grid"><div><Badge>AI Product Case Study · 2026</Badge><h1>Research answers are easy. <span>Trust is harder.</span></h1><p>SourceLens is an evidence-first AI agent that helps university students research faster without losing the ability to verify every important claim.</p><div className="hero-actions"><Button onClick={()=>setDemo(true)}><Play size={16}/>Try interactive prototype</Button><a className="button button-secondary" href="#process">View product process <ArrowRight size={16}/></a></div><div className="meta"><div><b>Role</b><span>AI Product Manager</span></div><div><b>Duration</b><span>4 weeks</span></div><div><b>Tools</b><span>Figma · RAG · Python</span></div></div></div>
      <motion.div className="preview-wrap" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}><div className="preview"><div className="browser"><i/><i/><i/><small>sourcelens.ai/workspace</small></div><div className="preview-body"><Badge>Verified-source mode</Badge><h3>How can students verify AI-generated research?</h3>{["Search trusted sources","Compare supporting evidence","Generate cited answer"].map(x=><div className="preview-row" key={x}><CheckCircle2 size={17}/>{x}<small>Done</small></div>)}<div className="preview-answer">Visible citations connect each generated claim to its original evidence. <sup>2</sup></div></div></div></motion.div>
    </div></section>
    <section id="problem" className="dark-section"><div className="container"><p className="eyebrow">01 · The problem</p><div className="two-col"><h2>Students save time with AI, then lose it checking whether the answer is real.</h2><div><p>The research workflow is fragmented across AI chat, academic databases, notes and citation managers. Generated answers often hide their evidence, while fabricated or weak references are difficult to notice.</p><div className="stat-grid">{[["8/10","need source checking"],["4 apps","per research task"],["#1","pain: trust"]].map(x=><div><b>{x[0]}</b><span>{x[1]}</span></div>)}</div><small>Illustrative prototype research metrics. Replace with validated study results before publication.</small></div></div></div></section>
    <section id="solution" className="section"><div className="container"><p className="eyebrow green">02 · Product solution</p><h2>An agent designed around evidence, not just fluent answers.</h2><div className="card-grid">{[[Search,"Plan & retrieve","The agent converts a broad question into sub-tasks and searches approved sources."],[ShieldCheck,"Verify every claim","Each conclusion is linked to its supporting passage and confidence indicator."],[BookOpen,"Turn evidence into work","Students save verified findings as notes and export APA references."]].map(([Icon,t,d],i)=><article className="feature-card"><span className="feature-icon"><Icon/></span><small>0{i+1}</small><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <section id="process" className="section white"><div className="container"><p className="eyebrow green">03 · Product process</p><h2>From user problem to measurable MVP.</h2><div className="process-grid">{[["5 interviews","Mapped student research journeys"],["3 competitors","Compared ChatGPT, Perplexity and Elicit"],["40 questions","Proposed golden evaluation dataset"],["3 decisions","RAG, claim-level citations and human review"]].map(x=><article><b>{x[0]}</b><p>{x[1]}</p></article>)}</div></div></section>
    <section id="results" className="section"><div className="container two-col"><div><p className="eyebrow green">04 · Validation</p><h2>The MVP is evaluated on trust and task success.</h2><p>Success is measured by whether users finish research tasks faster while still verifying the evidence.</p><Button onClick={()=>setDemo(true)}>Open the prototype <ExternalLink size={15}/></Button></div><div className="dashboard"><div className="dashboard-title"><BarChart3/>Prototype test dashboard</div>{metrics.map(m=><div className="metric"><span>{m[0]}</span><b>{m[1]}</b><Badge dark>{m[2]}</Badge></div>)}<small>Demonstration values only. Replace with validated test results before publication.</small></div></div></section>
    <section className="cta section"><div className="container cta-box"><div><h2>Designed by Yinuo Xie</h2><p>Information Management background with experience in user research, LLM data quality and AI product design.</p></div><div className="hero-actions"><Button onClick={()=>setDemo(true)}>Try the product</Button><a className="button button-secondary" href="mailto:your-email@example.com"><Mail size={15}/>Contact me</a></div></div></section>
  </main><footer><div className="container"><span>© 2026 Yinuo Xie · AI Product Portfolio</span><span>Problem · Decisions · Prototype · Evaluation</span></div></footer><AnimatePresence>{demo&&<Prototype close={()=>setDemo(false)}/>}</AnimatePresence></div>;
}
export default App;
