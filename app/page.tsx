"use client";
import { useRouter } from "next/navigation";

const LOGO="https://raw.githubusercontent.com/dhdh09080/seongdongxi/main/gsenc_logo.png";

export default function Home(){
  const router=useRouter();
  return <main className="landing-shell"><section className="landing-card">
    <img className="brand-logo" src={LOGO} alt="GS건설"/>
    <div className="eyebrow">HEALTH DOCUMENT HUB</div>
    <h1>건강진단 서류를<br/>한 번에 수집하고 정리합니다.</h1>
    <p className="lead">배치전·특수·일반 건강진단 서류 업로드부터 확인, 업체별 관리, 엑셀 다운로드까지 하나의 흐름으로.</p>
    <div className="entry-grid">
      <button className="entry-card primary" onClick={()=>router.push("/setup")}><span className="entry-icon">⌁</span><strong>처음 현장 설정</strong><small>현장코드 · 관리자 계정 · 검토 기준 설정</small></button>
      <button className="entry-card" onClick={()=>router.push("/admin")}><span className="entry-icon">↗</span><strong>GS 관리자 로그인</strong><small>업로드 현황 · 검토 · 엑셀 다운로드</small></button>
      <button className="entry-card worker" onClick={()=>router.push("/upload")}><span className="entry-icon">＋</span><strong>건강진단 서류 업로드</strong><small>근로자 · 협력사 관리자용 / 로그인 없음</small></button>
    </div>
    <p className="prototype-note">Prototype · 실제 개인정보/건강정보 저장 전 보안·보존정책·권한체계 검토 필요</p>
  </section></main>
}
