"use client";
import { useRef,useState } from "react";
import { companies } from "@/lib/mock-data";
import { copy,Lang } from "@/lib/i18n";
import { ExamType } from "@/lib/types";
const LOGO="https://raw.githubusercontent.com/dhdh09080/seongdongxi/main/gsenc_logo.png";

export default function Upload(){
 const [lang,setLang]=useState<Lang>("ko"); const t=copy[lang];
 const [step,setStep]=useState(1); const [company,setCompany]=useState(companies[0].code);
 const [name,setName]=useState(""); const [birth,setBirth]=useState(""); const [type,setType]=useState<ExamType>("preplacement");
 const [file,setFile]=useState<File|null>(null); const [password,setPassword]=useState(""); const [confirmed,setConfirmed]=useState(false); const [submitted,setSubmitted]=useState(false);
 const cameraRef=useRef<HTMLInputElement>(null); const fileRef=useRef<HTMLInputElement>(null);
 const comp=companies.find(c=>c.code===company)?.name||"";
 const age=birth?new Date().getFullYear()-Number(birth.slice(0,4)):0;
 const exam=(x:ExamType)=>copy[lang][x];
 if(submitted) return <main className="mobile-shell"><section className="success-card"><div className="success-icon">✓</div><h1>{lang==="zh"?"已提交":lang==="en"?"Submitted":"제출 완료"}</h1><p>{lang==="zh"?"资料已提交给GS管理员。":lang==="en"?"Your document was sent to the GS administrator.":"GS 관리자에게 서류가 전달되었습니다."}</p><button className="primary-button large" onClick={()=>location.reload()}>{lang==="zh"?"提交其他资料":lang==="en"?"Submit another":"다른 서류 제출"}</button></section></main>;
 return <main className="mobile-shell">
  <header className="mobile-header"><img src={LOGO} alt="GS건설"/><div className="lang-switch">{(["ko","zh","en"] as Lang[]).map(l=><button key={l} className={lang===l?"active":""} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}</div></header>
  <section className="upload-panel">
   <div className="mobile-title"><h1>{t.title}</h1><p>{t.subtitle}</p></div>
   <div className="steps">{[t.step1,t.step2,t.step3].map((s,i)=><div key={s} className={step===i+1?"active":step>i+1?"done":""}><span>{step>i+1?"✓":i+1}</span><b>{s}</b></div>)}</div>
   {step===1&&<div className="form-stack roomy">
    <label>{t.company}<select value={company} onChange={e=>setCompany(e.target.value)}>{companies.map(c=><option key={c.code} value={c.code}>{c.name}</option>)}</select></label>
    <label>{t.name}<input value={name} onChange={e=>setName(e.target.value)} placeholder={lang==="zh"?"请输入姓名":lang==="en"?"Enter your name":"성함을 입력하세요"}/></label>
    <label>{t.birth}<input type="date" value={birth} onChange={e=>setBirth(e.target.value)}/></label>
    <label>{t.examType}<div className="segmented">{(["preplacement","special","general"] as ExamType[]).map(x=><button type="button" key={x} className={type===x?"active":""} onClick={()=>setType(x)}>{exam(x)}</button>)}</div></label>
    <button disabled={!name||!birth} className="primary-button large" onClick={()=>setStep(2)}>{lang==="zh"?"下一步":lang==="en"?"Next":"다음"}</button>
   </div>}
   {step===2&&<div className="form-stack roomy">
    <div className="identity-mini"><span>{comp}</span><strong>{name}</strong><small>{birth} · {exam(type)}</small></div>
    <div className="upload-zone"><div className="upload-symbol">↑</div><h2>{t.file}</h2><p>PDF · JPG · PNG</p><div className="upload-actions"><button className="primary-button" onClick={()=>cameraRef.current?.click()}>{t.camera}</button><button className="secondary-button" onClick={()=>fileRef.current?.click()}>{t.choose}</button></div>
    <input ref={cameraRef} hidden type="file" accept="image/*,.pdf" capture="environment" onChange={e=>setFile(e.target.files?.[0]||null)}/><input ref={fileRef} hidden type="file" accept="image/*,.pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/>
    {file&&<div className="file-chip"><span>📄</span><b>{file.name}</b><button onClick={()=>setFile(null)}>×</button></div>}</div>
    <label>{t.password}<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••"/></label>
    <div className="button-row"><button className="secondary-button large" onClick={()=>setStep(1)}>{lang==="zh"?"返回":lang==="en"?"Back":"이전"}</button><button disabled={!file} className="primary-button large" onClick={()=>setStep(3)}>{t.analyze}</button></div>
   </div>}
   {step===3&&<div className="form-stack roomy">
    <div className="analysis-status"><div className="analysis-ring">AI</div><div><span>{lang==="zh"?"识别完成":lang==="en"?"Analysis complete":"분석 완료"}</span><strong>96%</strong><small>{lang==="zh"?"文字识别可信度":lang==="en"?"OCR confidence":"문서 판독 신뢰도"}</small></div></div>
    <div className="result-card"><div><small>{t.name}</small><b>{name}</b></div><div><small>{t.birth}</small><b>{birth}</b></div><div><small>{t.company}</small><b>{comp}</b></div><div><small>{t.examType}</small><b>{exam(type)}</b></div><div><small>{lang==="en"?"Exam date":"건강진단일"}</small><b>2026.06.25</b></div><div><small>{lang==="en"?"Result":"결과"}</small><b>A · {lang==="en"?"Normal":"정상"}</b></div></div>
    <div className="checklist"><h3>{lang==="zh"?"自动检查":lang==="en"?"Automatic checks":"자동 확인 항목"}</h3><p>✓ {age>=63?"만 63세 이상: 6개월 유효기간 기준":"건강진단 유효기간 확인"}</p><p>✓ 결과 판독 가능</p><p>✓ R(재검) 없음</p><p>✓ {type==="general"?"일반검진: 유해인자 확인 제외":"소음 · 분진 · 자외선 확인"}</p></div>
    <label className="confirm-box"><input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)}/><span>{t.confirm}</span></label>
    <div className="button-row"><button className="secondary-button large" onClick={()=>setStep(2)}>{t.reupload}</button><button disabled={!confirmed} className="primary-button large" onClick={()=>setSubmitted(true)}>{t.submit}</button></div>
   </div>}
  </section>
 </main>
}
