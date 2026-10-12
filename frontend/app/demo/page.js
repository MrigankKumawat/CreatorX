"use client";
import { useState } from "react";
import Link from "next/link";
import { CREATORS, SAMPLE_BRIEF, SAMPLE_CAMPAIGN } from "@/lib/demoData";

const STEPS = ["Describe", "Review brief", "Creator matches"];

export default function DemoPage() {
  const [brief, setBrief] = useState(SAMPLE_BRIEF);
  const [campaign, setCampaign] = useState(SAMPLE_CAMPAIGN);
  const [step, setStep] = useState(0);

  function analyze() {
    const text = brief.toLowerCase();
    const next = { ...SAMPLE_CAMPAIGN };
    if (text.includes("coffee") || text.includes("food") || text.includes("snack")) {
      next.category = "Food & beverage";
      next.product = "New food or beverage launch";
      next.keywords = "food, reviews, student life, lifestyle";
      next.goals = "Build launch awareness and encourage first try";
    } else if (text.includes("fitness") || text.includes("sports") || text.includes("workout")) {
      next.category = "Fitness & wellness";
      next.product = "Fitness and wellness launch";
      next.keywords = "fitness, wellness, routines, student life";
      next.goals = "Build awareness and inspire product trial";
    }
    const city = brief.match(/\b(Pune|Mumbai|Delhi|Bengaluru|Bangalore|Jaipur)\b/i);
    if (city) next.location = `${city[0][0].toUpperCase()}${city[0].slice(1)}, India`;
    const budget = brief.match(/₹\s?[\d,]+|\b(?:rs\.?|inr)\s?[\d,]+/i);
    if (budget) next.budget = `${budget[0].replace(/\s/g, "")} total`;
    if (/youtube/i.test(brief)) next.platform = "YouTube";
    else if (/instagram/i.test(brief)) next.platform = "Instagram";
    setCampaign(next);
    setStep(1);
  }

  const update = (key) => (event) => setCampaign((current) => ({ ...current, [key]: event.target.value }));
  function restart() { setBrief(SAMPLE_BRIEF); setCampaign(SAMPLE_CAMPAIGN); setStep(0); }

  return (
    <main className="demo-page">
      <div className="demo-topline">
        <div><span className="demo-kicker">CREATORX · HACKATHON PREVIEW</span><h1>From campaign idea to creator shortlist.</h1></div>
        <span className="demo-mode"><i /> Offline demo mode</span>
      </div>
      <p className="demo-intro">Explore the brand workflow with prepared local examples. This demo runs without an account, backend, model, or internet connection.</p>

      <nav className="demo-steps" aria-label="Demo progress">
        {STEPS.map((label, index) => <div key={label} className={`demo-step ${step === index ? "active" : ""} ${step > index ? "done" : ""}`}><span>{step > index ? "✓" : `0${index + 1}`}</span>{label}</div>)}
      </nav>

      {step === 0 && <section className="demo-workspace">
        <div className="demo-brief-card">
          <div className="demo-card-heading"><span className="demo-icon">✳</span><div><p className="eyebrow">STEP 01 · CAMPAIGN BRIEF</p><h2>What are you launching?</h2></div></div>
          <p className="muted">Write a few lines about your product, audience, location, and budget.</p>
          <label className="demo-label" htmlFor="campaign-brief">Campaign description</label>
          <textarea id="campaign-brief" className="demo-textarea" rows={5} value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="Describe your campaign idea…" />
          <div className="demo-form-foot"><span className="hint">Try the sample brief or write your own.</span><button className="btn" onClick={analyze} disabled={!brief.trim()}>Analyze campaign <span aria-hidden="true">→</span></button></div>
        </div>
        <aside className="demo-aside"><div className="demo-aside-art"><div className="art-sun"/><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><span className="art-star">✳</span><span className="art-caption">GOOD BRIEFS<br/>MAKE GOOD<br/>MATCHES.</span></div><p className="eyebrow">THE CREATORX APPROACH</p><h3>Better context.<br/>More meaningful matches.</h3><p className="muted">CreatorX looks beyond follower counts to consider audience, niche, engagement, and location.</p><Link className="demo-text-link" href="/">Back to CreatorX home ↗</Link></aside>
      </section>}

      {step === 1 && <section className="demo-review">
        <div className="demo-section-head"><div><p className="eyebrow">STEP 02 · CAMPAIGN UNDERSTANDING</p><h2>Here’s the shape of your campaign.</h2><p className="muted">Review or edit these illustrative extracted fields before seeing the creator shortlist.</p></div><span className="demo-tag">✳ Prepared demo result</span></div>
        <div className="demo-fields">
          <label>Category<input value={campaign.category} onChange={update("category")} /></label>
          <label>Product<input value={campaign.product} onChange={update("product")} /></label>
          <label>Target audience<input value={campaign.audience} onChange={update("audience")} /></label>
          <label>Location<input value={campaign.location} onChange={update("location")} /></label>
          <label>Total campaign budget<input value={campaign.budget} onChange={update("budget")} /><span className="hint">Total campaign amount; not a per-creator rate.</span></label>
          <label>Preferred platform<input value={campaign.platform} onChange={update("platform")} /></label>
          <label className="field-wide">Campaign goals<input value={campaign.goals} onChange={update("goals")} /></label>
          <label className="field-wide">Relevant keywords<input value={campaign.keywords} onChange={update("keywords")} /></label>
        </div>
        <div className="demo-actions"><button className="btn btn-ghost" onClick={() => setStep(0)}>← Edit brief</button><button className="btn" onClick={() => setStep(2)}>See creator matches <span aria-hidden="true">→</span></button></div>
      </section>}

      {step === 2 && <section className="demo-results">
        <div className="demo-section-head"><div><p className="eyebrow">STEP 03 · CREATOR SHORTLIST</p><h2>Creators for your campaign.</h2><p className="muted">A sample shortlist based on the audience, niche, and location in your brief.</p></div><span className="demo-tag">✳ Illustrative scores</span></div>
        <div className="demo-campaign-strip"><span className="strip-mark">✳</span><div><strong>{campaign.product}</strong><span>{campaign.audience} · {campaign.location} · {campaign.budget}</span></div><button className="demo-text-link" onClick={() => setStep(1)}>Edit brief</button></div>
        <div className="demo-match-list">{CREATORS.map((creator, index) => <article className="demo-creator" key={creator.id}>
          <div className="creator-avatar-wrap"><div className={`creator-avatar avatar-${creator.color}`}>{creator.initials}</div><span className="creator-rank">0{index + 1}</span></div>
          <div className="creator-content"><div className="creator-heading"><div><h3>{creator.name}</h3><p className="muted">@{creator.handle} <span className="dot-sep">·</span> {creator.niche}</p></div><div className="creator-score"><strong>{creator.score}%</strong><span>demo match</span></div></div>
            <div className="creator-meta"><span>◎ {creator.city}</span><span>♙ {creator.followers} followers</span><span>↗ {creator.engagement} engagement</span><span>₹ {creator.price}</span></div>
            <p className="audience-line"><strong>Audience</strong> {creator.audience}</p>
            <details className="demo-explanation"><summary>Why this creator might fit <span>＋</span></summary><div className="explanation-body"><p>{creator.why}</p><div className="explanation-columns"><div><strong className="strength-label">Strengths</strong><ul>{creator.strengths.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong className="gap-label">Potential mismatch</strong><ul>{creator.gaps.map((item) => <li key={item}>{item}</li>)}</ul></div></div></div></details>
          </div>
        </article>)}</div>
        <div className="demo-actions"><button className="btn btn-ghost" onClick={() => setStep(1)}>← Back to campaign</button><button className="btn" onClick={restart}>Start over <span aria-hidden="true">↻</span></button></div>
        <p className="demo-disclaimer">All profiles, audience figures, scores, and explanations on this page are prepared illustrative examples. No live AI inference or creator data is used.</p>
      </section>}
    </main>
  );
}
