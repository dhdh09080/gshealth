"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const LOGO="https://raw.githubusercontent.com/dhdh09080/seongdongxi/main/gsenc_logo.png";

export default function Setup(){
  const router=useRouter();
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [verified,setVerified]=useState(false);
  const [error,setError]=useState("");
  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!email.toLowerCase().endsWith("@gsenc.com")) return setError("GS 관리자 이메일은 @gsenc.com 계정만 사용할 수 있습니다.");
    if(!verified) return setError("휴대폰 인증을 완료해 주세요.");
    const form=new FormData(e.currentTarget);
    localStorage.setItem("gshealth-site",JSON.stringify(Object.fromEntries(form.entries())));
    router.push("/admin");
  }
  return <main className="page-shell">
    <header className="topbar"><img src={LOGO} alt="GS건설"/><span>현장 초기 설정</span></header>
    <section className="narrow-panel">
      <div className="step-kicker">처음 한 번만 설정합니다</div>
      <h1>현장과 관리자 계정을 등록해 주세요.</h1>
      <p className="lead small">나중에 관리자 설정에서 현장명, 검토 기준, 협력사 정보를 수정할 수 있습니다.</p>
      <form className="form-stack" onSubmit={submit}>
        <div className="form-grid two"><label>현장 코드<input name="siteCode" defaultValue="070120" required/></label><label>현장 이름<input name="siteName" defaultValue="성동자이리버뷰(서울)" required/></label></div>
        <div className="form-grid two"><label>관리자 이름<input name="adminName" placeholder="이름" required/></label><label>관리자 이메일<input name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@gsenc.com" required/></label></div>
        <label>비밀번호<input name="password" type="password" minLength={8} placeholder="8자 이상" required/></label>
        <label>휴대폰 번호<div className="inline-input"><input name="phone" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="010-0000-0000" required/><button type="button" className="secondary-button" onClick={()=>phone.replace(/\D/g,"").length>=10&&setVerified(true)}>{verified?"인증완료":"휴대폰 인증"}</button></div></label>
        <button type="button" className="pmx-button" disabled>PMX 협력사 불러오기 <span>준비중</span></button>
        <p className="hint">추후 PMX API 연결 시 협력사 코드·이름을 자동 동기화하고, 관리자 화면에서 언제든 업데이트하도록 연결합니다.</p>
        {error&&<div className="alert error">{error}</div>}
        <button className="primary-button large" type="submit">현장 설정 완료</button>
      </form>
    </section>
  </main>
}
